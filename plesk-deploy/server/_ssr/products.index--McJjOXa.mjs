import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as ProductCard, a as fetchCategories, f as fetchProducts } from "./queries--zSvVXVj.mjs";
import { b as Route$6 } from "./router-ooRAjpbC.mjs";
import "../_libs/sonner.mjs";
import { s as Search } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./types-CpJ-x2HY.mjs";
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
function ProductsPage() {
  const {
    category
  } = Route$6.useSearch();
  const navigate = Route$6.useNavigate();
  const [search, setSearch] = reactExports.useState("");
  const {
    data: categories = []
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories
  });
  const {
    data: products = [],
    isLoading
  } = useQuery({
    queryKey: ["products", {
      category,
      search
    }],
    queryFn: () => fetchProducts({
      category,
      search
    })
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-festive text-cream py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-gold mb-3", children: "Exclusive · Eco-Friendly Collection" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl", children: category ? categories.find((c) => c.slug === category)?.name ?? "Shop" : "Shop the Exclusive Collection" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/80 max-w-2xl mx-auto mt-4 text-sm md:text-base", children: "Just two things, done beautifully — hand-carved makhars and authentic Vedic pooja kits. Limited-edition, eco-friendly, and made with devotion." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "search", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search products…", className: "w-full pl-11 pr-4 py-2.5 rounded-full bg-card border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
            search: {}
          }), className: `px-4 py-2 rounded-full text-sm transition-smooth ${!category ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"}`, children: "All" }),
          categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
            search: {
              category: c.slug
            }
          }), className: `px-4 py-2 rounded-full text-sm transition-smooth ${category === c.slug ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"}`, children: c.name }, c.id))
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: Array.from({
        length: 8
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] rounded-2xl bg-secondary animate-pulse" }, i)) }) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-20", children: "No products found." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
    ] })
  ] });
}
export {
  ProductsPage as component
};
