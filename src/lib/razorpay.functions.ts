import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import Razorpay from "razorpay";
import crypto from "crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

async function logPayment(row: {
  event: string;
  razorpay_order_id?: string | null;
  razorpay_payment_id?: string | null;
  amount?: number | null;
  customer_name?: string | null;
  customer_phone?: string | null;
  customer_email?: string | null;
  receipt?: string | null;
  error_message?: string | null;
  notes?: Record<string, unknown> | null;
}) {
  try {
    await supabaseAdmin.from("payment_logs").insert({
      currency: "INR",
      ...row,
      notes: (row.notes ?? {}) as any,
    });
  } catch (e) {
    console.error("payment_logs insert failed", e);
  }
}

const orderInput = z.object({
  amount: z.number().int().min(100),
  receipt: z.string().min(1).max(40).optional(),
  notes: z.record(z.string(), z.string()).optional(),
});

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .inputValidator((input) => orderInput.parse(input))
  .handler(async ({ data }) => {
    const key_id = process.env.RAZORPAY_KEY_ID!;
    const key_secret = process.env.RAZORPAY_KEY_SECRET!;
    if (!key_id || !key_secret) throw new Error("Razorpay keys not configured");

    const rzp = new Razorpay({ key_id, key_secret });
    try {
      const order = await rzp.orders.create({
        amount: data.amount,
        currency: "INR",
        receipt: data.receipt ?? `rcpt_${Date.now()}`,
        notes: data.notes,
      });

      await logPayment({
        event: "order_created",
        razorpay_order_id: order.id,
        amount: Number(order.amount) / 100,
        receipt: order.receipt ?? null,
        customer_name: data.notes?.customer ?? null,
        customer_phone: data.notes?.phone ?? null,
        notes: data.notes ?? {},
      });

      return {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: key_id,
      };
    } catch (err: any) {
      await logPayment({
        event: "order_failed",
        amount: data.amount / 100,
        receipt: data.receipt ?? null,
        customer_name: data.notes?.customer ?? null,
        customer_phone: data.notes?.phone ?? null,
        error_message: err?.message || "Failed to create Razorpay order",
        notes: data.notes ?? {},
      });
      throw err;
    }
  });

const verifyInput = z.object({
  razorpay_order_id: z.string().min(1).max(100),
  razorpay_payment_id: z.string().min(1).max(100),
  razorpay_signature: z.string().min(1).max(256),
  order: z.object({
    user_id: z.string().uuid().nullable().optional(),
    full_name: z.string().min(1).max(200),
    email: z.string().email().max(200),
    phone: z.string().min(1).max(20),
    address_line: z.string().min(1).max(500),
    city: z.string().min(1).max(100),
    state: z.string().min(1).max(100),
    pincode: z.string().min(1).max(10),
    subtotal: z.number().nonnegative(),
    shipping: z.number().nonnegative(),
    total: z.number().nonnegative(),
    items: z.array(z.object({
      product_id: z.string().uuid().nullable().optional(),
      product_name: z.string().min(1).max(300),
      product_image: z.string().max(1000).nullable().optional(),
      unit_price: z.number().nonnegative(),
      quantity: z.number().int().min(1),
    })).min(1),
  }),
});

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .inputValidator((input) => verifyInput.parse(input))
  .handler(async ({ data }) => {
    const key_secret = process.env.RAZORPAY_KEY_SECRET!;
    const expected = crypto
      .createHmac("sha256", key_secret)
      .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
      .digest("hex");

    const valid =
      expected.length === data.razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(expected),
        Buffer.from(data.razorpay_signature),
      );

    if (!valid) {
      await logPayment({
        event: "verification_failed",
        razorpay_order_id: data.razorpay_order_id,
        razorpay_payment_id: data.razorpay_payment_id,
        error_message: "Signature mismatch",
      });
      return { valid: false as const };
    }

    const o = data.order;
    let orderId: string | null = null;
    try {
      const { data: inserted, error: insErr } = await supabaseAdmin
        .from("orders")
        .insert({
          user_id: o.user_id ?? null,
          full_name: o.full_name,
          email: o.email,
          phone: o.phone,
          address_line: o.address_line,
          city: o.city,
          state: o.state,
          pincode: o.pincode,
          subtotal: o.subtotal,
          shipping: o.shipping,
          total: o.total,
          status: "paid" as any,
          razorpay_order_id: data.razorpay_order_id,
          razorpay_payment_id: data.razorpay_payment_id,
          razorpay_signature: data.razorpay_signature,
        })
        .select("id")
        .single();
      if (insErr || !inserted) throw insErr || new Error("order insert failed");
      orderId = inserted.id;

      const items = o.items.map((it) => ({
        order_id: orderId!,
        product_id: it.product_id ?? null,
        product_name: it.product_name,
        product_image: it.product_image ?? null,
        unit_price: it.unit_price,
        quantity: it.quantity,
      }));
      const { error: itErr } = await supabaseAdmin.from("order_items").insert(items);
      if (itErr) throw itErr;

      // Decrement stock for each product (best-effort)
      for (const it of o.items) {
        if (!it.product_id) continue;
        const { data: p } = await supabaseAdmin
          .from("products")
          .select("stock")
          .eq("id", it.product_id)
          .single();
        if (p) {
          const next = Math.max(0, (p.stock ?? 0) - it.quantity);
          await supabaseAdmin
            .from("products")
            .update({ stock: next })
            .eq("id", it.product_id);
        }
      }
    } catch (err: any) {
      await logPayment({
        event: "order_persist_failed",
        razorpay_order_id: data.razorpay_order_id,
        razorpay_payment_id: data.razorpay_payment_id,
        customer_name: o.full_name,
        customer_phone: o.phone,
        customer_email: o.email,
        amount: o.total,
        error_message: err?.message || "Failed to persist order after payment",
      });
      // Payment is valid even if persistence failed — surface but do not mark invalid
      return { valid: true as const, orderId: null, persistError: err?.message || "persist failed" };
    }

    await logPayment({
      event: "payment_success",
      razorpay_order_id: data.razorpay_order_id,
      razorpay_payment_id: data.razorpay_payment_id,
      customer_name: o.full_name,
      customer_phone: o.phone,
      customer_email: o.email,
      amount: o.total,
    });

    return { valid: true as const, orderId };
  });

const failInput = z.object({
  razorpay_order_id: z.string().max(100).optional(),
  razorpay_payment_id: z.string().max(100).optional(),
  error_code: z.string().max(100).optional(),
  error_description: z.string().max(500).optional(),
  customer_name: z.string().max(200).optional(),
  customer_phone: z.string().max(20).optional(),
  customer_email: z.string().max(200).optional(),
  amount: z.number().optional(),
});

export const logPaymentFailure = createServerFn({ method: "POST" })
  .inputValidator((input) => failInput.parse(input))
  .handler(async ({ data }) => {
    await logPayment({
      event: "payment_failed",
      razorpay_order_id: data.razorpay_order_id ?? null,
      razorpay_payment_id: data.razorpay_payment_id ?? null,
      amount: data.amount ?? null,
      customer_name: data.customer_name ?? null,
      customer_phone: data.customer_phone ?? null,
      customer_email: data.customer_email ?? null,
      error_message:
        [data.error_code, data.error_description].filter(Boolean).join(" — ") ||
        "Payment failed",
    });
    return { ok: true };
  });
