import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as FloatingPetals } from "./FloatingPetals-4wkyN4zs.mjs";
import { R as Route$g } from "./router-ooRAjpbC.mjs";
import "../_libs/sonner.mjs";
import { C as CircleCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
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
import "../_libs/zod.mjs";
function Success() {
  const {
    orderId
  } = Route$g.useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative container mx-auto px-4 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingPetals, { count: 20 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-lg mx-auto text-center bg-card border border-border rounded-3xl p-10 shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 mx-auto rounded-full bg-emerald-700/10 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-emerald-700" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl text-primary mb-3", children: "गणपती बाप्पा मोरया!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2", children: "Your order has been received with devotion." }),
      orderId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
        "Order ID: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: orderId })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-4", children: "We'll send a confirmation email shortly with shipping details." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "inline-flex mt-8 items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow font-semibold transition-smooth", children: "Continue Shopping" })
    ] })
  ] });
}
export {
  Success as component
};
