import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useCart, formatINR } from "@/lib/cart";
import { toast } from "sonner";
import { Lock, ShieldCheck, Loader2, Truck, MapPin } from "lucide-react";
import { createRazorpayOrder, verifyRazorpayPayment, logPaymentFailure } from "@/lib/razorpay.functions";
import { calculateShipping } from "@/lib/shipping.functions";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — VedaKits" }] }),
  component: Checkout,
});

declare global {
  interface Window {
    Razorpay?: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const createOrder = useServerFn(createRazorpayOrder);
  const verifyPayment = useServerFn(verifyRazorpayPayment);
  const logFailure = useServerFn(logPaymentFailure);
  const calcShipping = useServerFn(calculateShipping);

  const [processing, setProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<{
    shipping: number;
    distanceKm: number;
    place: string;
    state: string;
  } | null>(null);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState<string | null>(null);

  const shipping = shippingInfo?.shipping ?? 0;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst + shipping;

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const lastPin = useRef<string>("");
  const isTestProductOnly = items.length === 1 && items[0].slug === "test-product-1";

  useEffect(() => {
    if (isTestProductOnly) {
      setShippingInfo({ shipping: 0, distanceKm: 0, place: "", state: "" });
      setShippingError(null);
      setShippingLoading(false);
      lastPin.current = form.pincode.trim();
      return;
    }
    const pin = form.pincode.trim();
    if (!/^\d{6}$/.test(pin)) {
      setShippingInfo(null);
      setShippingError(null);
      lastPin.current = "";
      return;
    }
    if (pin === lastPin.current) return;
    lastPin.current = pin;
    setShippingLoading(true);
    setShippingError(null);
    calcShipping({ data: { pincode: pin, subtotal } })
      .then((res) => {
        if (res.ok) {
          setShippingInfo({
            shipping: res.shipping,
            distanceKm: res.distanceKm,
            place: res.place,
            state: res.state,
          });
          setForm((f) => ({
            ...f,
            city: f.city || res.place,
            state: f.state || res.state,
          }));
        } else {
          setShippingInfo(null);
          setShippingError(res.error);
        }
      })
      .catch(() => setShippingError("Could not calculate shipping"))
      .finally(() => setShippingLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.pincode]);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) { toast.error("Your cart is empty"); return; }
    if (!shippingInfo) { toast.error("Enter a valid pincode to calculate shipping"); return; }
    if (shippingLoading) { toast.message("Calculating shipping…"); return; }

    setProcessing(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        toast.error("Failed to load payment gateway. Check your connection.");
        setProcessing(false);
        return;
      }

      const order = await createOrder({
        data: {
          amount: Math.round(total * 100),
          receipt: `vvm_${Date.now().toString().slice(-10)}`,
          notes: {
            customer: form.full_name,
            phone: form.phone,
            city: form.city,
          },
        },
      });

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "VedaKits",
        description: `Order of ${items.length} item${items.length > 1 ? "s" : ""}`,
        prefill: {
          name: form.full_name,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          address: `${form.address_line}, ${form.city}, ${form.state} - ${form.pincode}`,
        },
        theme: { color: "#7E1F26" },
        handler: async (response: any) => {
          try {
            const result = await verifyPayment({
              data: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order: {
                  full_name: form.full_name,
                  email: form.email,
                  phone: form.phone,
                  address_line: form.address_line,
                  city: form.city,
                  state: form.state,
                  pincode: form.pincode,
                  subtotal,
                  shipping,
                  total,
                  items: items.map((i) => ({
                    product_id: i.id,
                    product_name: i.name,
                    product_image: i.image,
                    unit_price: i.price,
                    quantity: i.quantity,
                  })),
                },
              },
            });
            if (!result.valid) {
              toast.error("Payment verification failed. Contact support.");
              setProcessing(false);
              return;
            }
            clear();
            toast.success("Payment successful");
            navigate({ to: "/order-success", search: { orderId: response.razorpay_payment_id } });
          } catch {
            toast.error("Could not verify payment. Contact support.");
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            toast.message("Payment cancelled");
          },
        },
      });

      rzp.on("payment.failed", (resp: any) => {
        toast.error(resp?.error?.description || "Payment failed");
        logFailure({
          data: {
            razorpay_order_id: resp?.error?.metadata?.order_id,
            razorpay_payment_id: resp?.error?.metadata?.payment_id,
            error_code: resp?.error?.code,
            error_description: resp?.error?.description,
            customer_name: form.full_name,
            customer_phone: form.phone,
            customer_email: form.email,
            amount: total,
          },
        }).catch(() => {});
        setProcessing(false);
      });

      rzp.open();
    } catch (err: any) {
      toast.error(err?.message || "Could not start payment");
      setProcessing(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="font-display text-4xl md:text-5xl text-primary mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_400px] gap-10">
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-soft">
          <h2 className="font-display text-xl mb-6">Shipping Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name" required value={form.full_name} onChange={update("full_name")} className="sm:col-span-2" />
            <Field label="Email" type="email" required value={form.email} onChange={update("email")} />
            <Field label="Mobile Number" required value={form.phone} onChange={update("phone")} />
            <Field label="Full Address" required value={form.address_line} onChange={update("address_line")} className="sm:col-span-2" />
            <Field label="City" required value={form.city} onChange={update("city")} />
            <Field label="State" required value={form.state} onChange={update("state")} />
            <Field label="Pincode" required value={form.pincode} onChange={update("pincode")} />
          </div>
        </div>

        <aside className="bg-card rounded-2xl border border-border p-6 shadow-soft h-fit sticky top-28">
          <h2 className="font-display text-xl mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-60 overflow-auto pr-1">
            {items.map((i) => (
              <div key={i.id} className="flex gap-3 text-sm">
                <img src={i.image} alt={i.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="line-clamp-1 font-medium">{i.name}</div>
                  <div className="text-muted-foreground text-xs">Qty {i.quantity}</div>
                </div>
                <div>{formatINR(i.price * i.quantity)}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-border my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">GST (5%)</span><span>{formatINR(gst)}</span></div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-muted-foreground inline-flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Shipping</span>
              <span className="text-right">
                {shippingLoading ? (
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><Loader2 className="w-3 h-3 animate-spin" /> Calculating…</span>
                ) : shippingError ? (
                  <span className="text-destructive text-xs">{shippingError}</span>
                ) : shippingInfo ? (
                  <span>{formatINR(shippingInfo.shipping)}</span>
                ) : (
                  <span className="text-muted-foreground text-xs">Enter pincode</span>
                )}
              </span>
            </div>
            {shippingInfo && (
              <div className="text-[11px] text-muted-foreground flex items-start gap-1 pl-0.5">
                <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                <span>
                  ~{shippingInfo.distanceKm} km from Lower Parel, Mumbai
                  {shippingInfo.place ? ` → ${shippingInfo.place}, ${shippingInfo.state}` : ""}
                </span>
              </div>
            )}
          </div>
          <div className="border-t border-border my-4" />
          <div className="flex justify-between font-display text-xl">
            <span>Total</span><span className="text-primary">{formatINR(total)}</span>
          </div>

          <button
            type="submit"
            disabled={items.length === 0 || processing || !shippingInfo || shippingLoading}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow font-semibold transition-smooth shadow-soft disabled:opacity-60"
          >
            {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            {processing ? "Processing…" : shippingInfo ? `Pay ${formatINR(total)}` : "Enter pincode to continue"}
          </button>
          <p className="text-[11px] text-muted-foreground mt-3 text-center inline-flex items-center justify-center gap-1 w-full">
            <ShieldCheck className="w-3 h-3" /> Secured by Razorpay (UPI · Cards · Netbanking · Wallets)
          </p>
        </aside>
      </form>
    </section>
  );
}

function Field({
  label, className = "", ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      <input
        {...rest}
        className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}
