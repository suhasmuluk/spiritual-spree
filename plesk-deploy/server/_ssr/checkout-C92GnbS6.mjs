import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { l as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { u as useCart, f as formatINR } from "./router-ooRAjpbC.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./index.mjs";
import "../_libs/seroval.mjs";
import { T as Truck, f as LoaderCircle, e as MapPin, g as Lock, h as ShieldCheck } from "../_libs/lucide-react.mjs";
import { o as objectType, n as numberType, s as stringType, r as recordType, a as arrayType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./client-DJ82In3R.mjs";
import "../_libs/supabase__supabase-js.mjs";
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
import "node:stream/promises";
import "node:https";
import "node:http2";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const orderInput = objectType({
  amount: numberType().int().min(100),
  receipt: stringType().min(1).max(40).optional(),
  notes: recordType(stringType(), stringType()).optional()
});
const createRazorpayOrder = createServerFn({
  method: "POST"
}).inputValidator((input) => orderInput.parse(input)).handler(createSsrRpc("a6f1a7df2dd032270b33ae7f01da2576971e1b7652c3d182f28f0f762ce126d4"));
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
const verifyRazorpayPayment = createServerFn({
  method: "POST"
}).inputValidator((input) => verifyInput.parse(input)).handler(createSsrRpc("5e2c6a85ce8b9f3a92cd9b0a9b4d8f015d9ec2fa0b30eb31f8605ecef9f67199"));
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
const logPaymentFailure = createServerFn({
  method: "POST"
}).inputValidator((input) => failInput.parse(input)).handler(createSsrRpc("34f16eb07e6f32e162b25bb5273f373be9baf59ba8fcf4a6aebee4a1ade51de0"));
const calculateShipping = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  pincode: stringType().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  subtotal: numberType().min(0).optional()
})).handler(createSsrRpc("87fa976c53e2ed770ba0a10b119bddda639806f28586797d6826bfe67748b182"));
function loadRazorpayScript() {
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
  const {
    items,
    subtotal,
    clear
  } = useCart();
  const navigate = useNavigate();
  const createOrder = useServerFn(createRazorpayOrder);
  const verifyPayment = useServerFn(verifyRazorpayPayment);
  const logFailure = useServerFn(logPaymentFailure);
  const calcShipping = useServerFn(calculateShipping);
  const [processing, setProcessing] = reactExports.useState(false);
  const [shippingInfo, setShippingInfo] = reactExports.useState(null);
  const [shippingLoading, setShippingLoading] = reactExports.useState(false);
  const [shippingError, setShippingError] = reactExports.useState(null);
  const shipping = shippingInfo?.shipping ?? 0;
  const total = subtotal + shipping;
  const [form, setForm] = reactExports.useState({
    full_name: "",
    email: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    pincode: ""
  });
  reactExports.useEffect(() => {
    loadRazorpayScript();
  }, []);
  const lastPin = reactExports.useRef("");
  reactExports.useEffect(() => {
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
    calcShipping({
      data: {
        pincode: pin,
        subtotal
      }
    }).then((res) => {
      if (res.ok) {
        setShippingInfo({
          shipping: res.shipping,
          distanceKm: res.distanceKm,
          place: res.place,
          state: res.state
        });
        setForm((f) => ({
          ...f,
          city: f.city || res.place,
          state: f.state || res.state
        }));
      } else {
        setShippingInfo(null);
        setShippingError(res.error);
      }
    }).catch(() => setShippingError("Could not calculate shipping")).finally(() => setShippingLoading(false));
  }, [form.pincode]);
  const update = (k) => (e) => setForm((f) => ({
    ...f,
    [k]: e.target.value
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!shippingInfo) {
      toast.error("Enter a valid pincode to calculate shipping");
      return;
    }
    if (shippingLoading) {
      toast.message("Calculating shipping…");
      return;
    }
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
            city: form.city
          }
        }
      });
      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Varad Vinayak Morya",
        description: `Order of ${items.length} item${items.length > 1 ? "s" : ""}`,
        prefill: {
          name: form.full_name,
          email: form.email,
          contact: form.phone
        },
        notes: {
          address: `${form.address_line}, ${form.city}, ${form.state} - ${form.pincode}`
        },
        theme: {
          color: "#7E1F26"
        },
        handler: async (response) => {
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
                    quantity: i.quantity
                  }))
                }
              }
            });
            if (!result.valid) {
              toast.error("Payment verification failed. Contact support.");
              setProcessing(false);
              return;
            }
            clear();
            toast.success("Payment successful");
            navigate({
              to: "/order-success",
              search: {
                orderId: response.razorpay_payment_id
              }
            });
          } catch {
            toast.error("Could not verify payment. Contact support.");
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
            toast.message("Payment cancelled");
          }
        }
      });
      rzp.on("payment.failed", (resp) => {
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
            amount: total
          }
        }).catch(() => {
        });
        setProcessing(false);
      });
      rzp.open();
    } catch (err) {
      toast.error(err?.message || "Could not start payment");
      setProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl text-primary mb-8", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid lg:grid-cols-[1fr_400px] gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-6 md:p-8 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl mb-6", children: "Shipping Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full Name", required: true, value: form.full_name, onChange: update("full_name"), className: "sm:col-span-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", type: "email", required: true, value: form.email, onChange: update("email") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Mobile Number", required: true, value: form.phone, onChange: update("phone") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full Address", required: true, value: form.address_line, onChange: update("address_line"), className: "sm:col-span-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "City", required: true, value: form.city, onChange: update("city") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "State", required: true, value: form.state, onChange: update("state") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Pincode", required: true, value: form.pincode, onChange: update("pincode") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "bg-card rounded-2xl border border-border p-6 shadow-soft h-fit sticky top-28", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl mb-4", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-60 overflow-auto pr-1", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: i.image, alt: i.name, className: "w-12 h-12 rounded-lg object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "line-clamp-1 font-medium", children: i.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground text-xs", children: [
              "Qty ",
              i.quantity
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: formatINR(i.price * i.quantity) })
        ] }, i.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border my-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(subtotal) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5" }),
              " Shipping"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: shippingLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
              " Calculating…"
            ] }) : shippingError ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive text-xs", children: shippingError }) : shippingInfo ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(shippingInfo.shipping) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Enter pincode" }) })
          ] }),
          shippingInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground flex items-start gap-1 pl-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "~",
              shippingInfo.distanceKm,
              " km from Lower Parel, Mumbai",
              shippingInfo.place ? ` → ${shippingInfo.place}, ${shippingInfo.state}` : ""
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border my-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display text-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatINR(total) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: items.length === 0 || processing || !shippingInfo || shippingLoading, className: "mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow font-semibold transition-smooth shadow-soft disabled:opacity-60", children: [
          processing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
          processing ? "Processing…" : shippingInfo ? `Pay ${formatINR(total)}` : "Enter pincode to continue"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-3 text-center inline-flex items-center justify-center gap-1 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3" }),
          " Secured by Razorpay (UPI · Cards · Netbanking · Wallets)"
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  className = "",
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `block ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs uppercase tracking-wider text-muted-foreground mb-1.5", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...rest, className: "w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" })
  ] });
}
export {
  Checkout as component
};
