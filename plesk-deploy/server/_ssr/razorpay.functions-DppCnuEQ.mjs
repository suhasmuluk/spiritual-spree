import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { R as Razorpay } from "../_libs/razorpay.mjs";
import require$$1 from "crypto";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, r as recordType, s as stringType, n as numberType, a as arrayType } from "../_libs/zod.mjs";
import "../_libs/axios.mjs";
import "http2";
import "zlib";
import "../_libs/form-data.mjs";
import "http";
import "https";
import "url";
import "fs";
import "../_libs/combined-stream.mjs";
import "util";
import "stream";
import "../_libs/delayed-stream.mjs";
import "path";
import "../_libs/mime-types.mjs";
import "../_libs/mime-db.mjs";
import "../_libs/asynckit.mjs";
import "../_libs/es-set-tostringtag.mjs";
import "../_libs/get-intrinsic.mjs";
import "../_libs/es-object-atoms.mjs";
import "../_libs/es-errors.mjs";
import "../_libs/math-intrinsics.mjs";
import "../_libs/gopd.mjs";
import "../_libs/es-define-property.mjs";
import "../_libs/has-symbols.mjs";
import "../_libs/get-proto.mjs";
import "../_libs/dunder-proto.mjs";
import "../_libs/call-bind-apply-helpers.mjs";
import "../_libs/function-bind.mjs";
import "../_libs/hasown.mjs";
import "../_libs/has-tostringtag.mjs";
import "../_libs/https-proxy-agent.mjs";
import "net";
import "tls";
import "assert";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/agent-base.mjs";
import "events";
import "../_libs/follow-redirects.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "../_libs/isbot.mjs";
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
async function logPayment(row) {
  try {
    await supabaseAdmin.from("payment_logs").insert({
      currency: "INR",
      ...row,
      notes: row.notes ?? {}
    });
  } catch (e) {
    console.error("payment_logs insert failed", e);
  }
}
const orderInput = objectType({
  amount: numberType().int().min(100),
  receipt: stringType().min(1).max(40).optional(),
  notes: recordType(stringType(), stringType()).optional()
});
const createRazorpayOrder_createServerFn_handler = createServerRpc({
  id: "a6f1a7df2dd032270b33ae7f01da2576971e1b7652c3d182f28f0f762ce126d4",
  name: "createRazorpayOrder",
  filename: "src/lib/razorpay.functions.ts"
}, (opts) => createRazorpayOrder.__executeServer(opts));
const createRazorpayOrder = createServerFn({
  method: "POST"
}).inputValidator((input) => orderInput.parse(input)).handler(createRazorpayOrder_createServerFn_handler, async ({
  data
}) => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) throw new Error("Razorpay keys not configured");
  const rzp = new Razorpay({
    key_id,
    key_secret
  });
  try {
    const order = await rzp.orders.create({
      amount: data.amount,
      currency: "INR",
      receipt: data.receipt ?? `rcpt_${Date.now()}`,
      notes: data.notes
    });
    await logPayment({
      event: "order_created",
      razorpay_order_id: order.id,
      amount: Number(order.amount) / 100,
      receipt: order.receipt ?? null,
      customer_name: data.notes?.customer ?? null,
      customer_phone: data.notes?.phone ?? null,
      notes: data.notes ?? {}
    });
    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: key_id
    };
  } catch (err) {
    await logPayment({
      event: "order_failed",
      amount: data.amount / 100,
      receipt: data.receipt ?? null,
      customer_name: data.notes?.customer ?? null,
      customer_phone: data.notes?.phone ?? null,
      error_message: err?.message || "Failed to create Razorpay order",
      notes: data.notes ?? {}
    });
    throw err;
  }
});
const verifyInput = objectType({
  razorpay_order_id: stringType().min(1).max(100),
  razorpay_payment_id: stringType().min(1).max(100),
  razorpay_signature: stringType().min(1).max(256),
  order: objectType({
    user_id: stringType().uuid().nullable().optional(),
    full_name: stringType().min(1).max(200),
    email: stringType().email().max(200),
    phone: stringType().min(1).max(20),
    address_line: stringType().min(1).max(500),
    city: stringType().min(1).max(100),
    state: stringType().min(1).max(100),
    pincode: stringType().min(1).max(10),
    subtotal: numberType().nonnegative(),
    shipping: numberType().nonnegative(),
    total: numberType().nonnegative(),
    items: arrayType(objectType({
      product_id: stringType().uuid().nullable().optional(),
      product_name: stringType().min(1).max(300),
      product_image: stringType().max(1e3).nullable().optional(),
      unit_price: numberType().nonnegative(),
      quantity: numberType().int().min(1)
    })).min(1)
  })
});
const verifyRazorpayPayment_createServerFn_handler = createServerRpc({
  id: "5e2c6a85ce8b9f3a92cd9b0a9b4d8f015d9ec2fa0b30eb31f8605ecef9f67199",
  name: "verifyRazorpayPayment",
  filename: "src/lib/razorpay.functions.ts"
}, (opts) => verifyRazorpayPayment.__executeServer(opts));
const verifyRazorpayPayment = createServerFn({
  method: "POST"
}).inputValidator((input) => verifyInput.parse(input)).handler(verifyRazorpayPayment_createServerFn_handler, async ({
  data
}) => {
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  const expected = require$$1.createHmac("sha256", key_secret).update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`).digest("hex");
  const valid = expected.length === data.razorpay_signature.length && require$$1.timingSafeEqual(Buffer.from(expected), Buffer.from(data.razorpay_signature));
  if (!valid) {
    await logPayment({
      event: "verification_failed",
      razorpay_order_id: data.razorpay_order_id,
      razorpay_payment_id: data.razorpay_payment_id,
      error_message: "Signature mismatch"
    });
    return {
      valid: false
    };
  }
  const o = data.order;
  let orderId = null;
  try {
    const {
      data: inserted,
      error: insErr
    } = await supabaseAdmin.from("orders").insert({
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
      status: "paid",
      razorpay_order_id: data.razorpay_order_id,
      razorpay_payment_id: data.razorpay_payment_id,
      razorpay_signature: data.razorpay_signature
    }).select("id").single();
    if (insErr || !inserted) throw insErr || new Error("order insert failed");
    orderId = inserted.id;
    const items = o.items.map((it) => ({
      order_id: orderId,
      product_id: it.product_id ?? null,
      product_name: it.product_name,
      product_image: it.product_image ?? null,
      unit_price: it.unit_price,
      quantity: it.quantity
    }));
    const {
      error: itErr
    } = await supabaseAdmin.from("order_items").insert(items);
    if (itErr) throw itErr;
    for (const it of o.items) {
      if (!it.product_id) continue;
      const {
        data: p
      } = await supabaseAdmin.from("products").select("stock").eq("id", it.product_id).single();
      if (p) {
        const next = Math.max(0, (p.stock ?? 0) - it.quantity);
        await supabaseAdmin.from("products").update({
          stock: next
        }).eq("id", it.product_id);
      }
    }
  } catch (err) {
    await logPayment({
      event: "order_persist_failed",
      razorpay_order_id: data.razorpay_order_id,
      razorpay_payment_id: data.razorpay_payment_id,
      customer_name: o.full_name,
      customer_phone: o.phone,
      customer_email: o.email,
      amount: o.total,
      error_message: err?.message || "Failed to persist order after payment"
    });
    return {
      valid: true,
      orderId: null,
      persistError: err?.message || "persist failed"
    };
  }
  await logPayment({
    event: "payment_success",
    razorpay_order_id: data.razorpay_order_id,
    razorpay_payment_id: data.razorpay_payment_id,
    customer_name: o.full_name,
    customer_phone: o.phone,
    customer_email: o.email,
    amount: o.total
  });
  return {
    valid: true,
    orderId
  };
});
const failInput = objectType({
  razorpay_order_id: stringType().max(100).optional(),
  razorpay_payment_id: stringType().max(100).optional(),
  error_code: stringType().max(100).optional(),
  error_description: stringType().max(500).optional(),
  customer_name: stringType().max(200).optional(),
  customer_phone: stringType().max(20).optional(),
  customer_email: stringType().max(200).optional(),
  amount: numberType().optional()
});
const logPaymentFailure_createServerFn_handler = createServerRpc({
  id: "34f16eb07e6f32e162b25bb5273f373be9baf59ba8fcf4a6aebee4a1ade51de0",
  name: "logPaymentFailure",
  filename: "src/lib/razorpay.functions.ts"
}, (opts) => logPaymentFailure.__executeServer(opts));
const logPaymentFailure = createServerFn({
  method: "POST"
}).inputValidator((input) => failInput.parse(input)).handler(logPaymentFailure_createServerFn_handler, async ({
  data
}) => {
  await logPayment({
    event: "payment_failed",
    razorpay_order_id: data.razorpay_order_id ?? null,
    razorpay_payment_id: data.razorpay_payment_id ?? null,
    amount: data.amount ?? null,
    customer_name: data.customer_name ?? null,
    customer_phone: data.customer_phone ?? null,
    customer_email: data.customer_email ?? null,
    error_message: [data.error_code, data.error_description].filter(Boolean).join(" — ") || "Payment failed"
  });
  return {
    ok: true
  };
});
export {
  createRazorpayOrder_createServerFn_handler,
  logPaymentFailure_createServerFn_handler,
  verifyRazorpayPayment_createServerFn_handler
};
