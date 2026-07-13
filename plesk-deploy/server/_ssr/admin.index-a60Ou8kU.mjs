import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DJ82In3R.mjs";
import { o as Package, i as ShoppingBag, p as Tags, t as IndianRupee } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function AdminOverview() {
  const {
    data
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [p, o, c, rev] = await Promise.all([supabase.from("products").select("*", {
        count: "exact",
        head: true
      }), supabase.from("orders").select("*", {
        count: "exact",
        head: true
      }), supabase.from("categories").select("*", {
        count: "exact",
        head: true
      }), supabase.from("orders").select("total").eq("status", "delivered")]);
      const revenue = (rev.data ?? []).reduce((s, r) => s + Number(r.total || 0), 0);
      return {
        products: p.count ?? 0,
        orders: o.count ?? 0,
        categories: c.count ?? 0,
        revenue
      };
    }
  });
  const stats = [{
    label: "Products",
    value: data?.products ?? "—",
    icon: Package
  }, {
    label: "Orders",
    value: data?.orders ?? "—",
    icon: ShoppingBag
  }, {
    label: "Categories",
    value: data?.categories ?? "—",
    icon: Tags
  }, {
    label: "Revenue (delivered)",
    value: data ? `₹${data.revenue.toLocaleString("en-IN")}` : "—",
    icon: IndianRupee
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-primary mb-1", children: "Overview" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Quick snapshot of your store." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-5 bg-secondary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-6 h-6 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-2xl font-display text-primary", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wider mt-1", children: s.label })
    ] }, s.label)) })
  ] });
}
export {
  AdminOverview as component
};
