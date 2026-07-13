import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, d as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { a as useAuth } from "./router-ooRAjpbC.mjs";
import { s as supabase } from "./client-DJ82In3R.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { h as ShieldCheck, m as LogOut, n as LayoutDashboard, o as Package, i as ShoppingBag, R as Receipt, p as Tags } from "../_libs/lucide-react.mjs";
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
import "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function AdminLayout() {
  const {
    user,
    isAdmin,
    loading,
    signOut,
    refreshRole
  } = useAuth();
  const nav = useNavigate();
  const path = useRouterState({
    select: (s) => s.location.pathname
  });
  reactExports.useEffect(() => {
    if (!loading && !user) nav({
      to: "/auth"
    });
  }, [loading, user, nav]);
  const claimAdmin = async () => {
    const {
      data,
      error
    } = await supabase.rpc("claim_first_admin");
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data === true) {
      toast.success("You are now admin.");
      await refreshRole();
    } else toast.error("An admin already exists. Ask them to grant you access.");
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] flex items-center justify-center text-muted-foreground", children: "Loading…" });
  if (!user) return null;
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] flex items-center justify-center px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center bg-background border border-border rounded-2xl p-8 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-12 h-12 mx-auto text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl text-primary mt-4", children: "Admin access required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
        "You're signed in as ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: user.email }),
        ", but you don't have admin rights."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: claimAdmin, className: "mt-6 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary-glow transition-smooth", children: "Claim admin (first user only)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
        await signOut();
        nav({
          to: "/auth"
        });
      }, className: "mt-3 block mx-auto text-sm text-muted-foreground hover:text-primary", children: "Sign out" })
    ] }) });
  }
  const links = [{
    to: "/admin",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true
  }, {
    to: "/admin/products",
    label: "Products",
    icon: Package
  }, {
    to: "/admin/orders",
    label: "Orders",
    icon: ShoppingBag
  }, {
    to: "/admin/payment-logs",
    label: "Payment Logs",
    icon: Receipt
  }, {
    to: "/admin/categories",
    label: "Categories",
    icon: Tags
  }];
  const handleSignOut = async () => {
    await signOut();
    nav({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-primary", children: "Admin Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: user.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSignOut, className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-background text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
        " Sign out"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[220px_1fr] gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "bg-background border border-border rounded-xl p-3 h-fit", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex md:flex-col gap-1 overflow-x-auto", children: links.map((l) => {
        const active = l.exact ? path === l.to : path.startsWith(l.to);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: l.to, className: `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-secondary"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(l.icon, { className: "w-4 h-4" }),
          " ",
          l.label
        ] }, l.to);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background border border-border rounded-xl p-6 min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] }) });
}
export {
  AdminLayout as component
};
