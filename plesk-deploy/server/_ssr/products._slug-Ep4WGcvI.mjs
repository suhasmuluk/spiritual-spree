import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as ProductCard, b as fetchProductBySlug, f as fetchProducts } from "./queries--zSvVXVj.mjs";
import { r as resolveImage } from "./types-CpJ-x2HY.mjs";
import { c as Route$4, u as useCart, f as formatINR } from "./router-ooRAjpbC.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { q as Leaf, u as Check, j as Minus, k as Plus, S as ShoppingCart, T as Truck } from "../_libs/lucide-react.mjs";
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
function ProductDetail() {
  const {
    slug
  } = Route$4.useParams();
  const navigate = useNavigate();
  const {
    add
  } = useCart();
  const [qty, setQty] = reactExports.useState(1);
  const {
    data: product,
    isLoading
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug)
  });
  const {
    data: related = []
  } = useQuery({
    queryKey: ["products", "related"],
    queryFn: () => fetchProducts({
      featured: true
    })
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 text-center text-muted-foreground", children: "Loading…" });
  if (!product) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 text-center", children: "Product not found." });
  const img = resolveImage(product.image_url);
  const handleAdd = () => {
    add({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: img
    }, qty);
    toast.success(`${product.name} added to cart`);
  };
  const handleBuy = () => {
    handleAdd();
    navigate({
      to: "/checkout"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "text-sm text-muted-foreground mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-primary", children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "hover:text-primary", children: "Shop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: product.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden bg-secondary aspect-square shadow-elegant", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: product.name, className: "w-full h-full object-cover", width: 800, height: 800 }),
          product.eco_friendly && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-700 text-white text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-3.5 h-3.5" }),
            " Eco-friendly"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-gold mb-2", children: "Exclusive · Eco-Friendly · Handcrafted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl text-primary mb-4", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-display text-foreground mb-5", children: formatINR(product.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-6", children: product.description }),
          product.highlights.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-8", children: product.highlights.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-emerald-700 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: h })
          ] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center bg-secondary rounded-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty((q) => Math.max(1, q - 1)), className: "w-10 h-10 flex items-center justify-center hover:text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-center font-medium", children: qty }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty((q) => Math.min(product.stock || 1, q + 1)), disabled: qty >= product.stock, className: "w-10 h-10 flex items-center justify-center hover:text-primary disabled:opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }) })
            ] }),
            product.stock > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-medium ${product.stock <= 5 ? "text-amber-600" : "text-emerald-700"}`, children: product.stock <= 5 ? `Only ${product.stock} left in stock` : `${product.stock} in stock` }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-destructive", children: "Out of stock" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleAdd, disabled: product.stock <= 0, className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-secondary text-foreground border border-border hover:bg-muted font-medium transition-smooth disabled:opacity-50 disabled:cursor-not-allowed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
              " Add to Cart"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleBuy, disabled: product.stock <= 0, className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow font-semibold transition-smooth shadow-soft disabled:opacity-50 disabled:cursor-not-allowed", children: product.stock > 0 ? "Buy Now" : "Sold Out" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-6 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-gold" }),
            " Free shipping on orders above ₹999"
          ] })
        ] })
      ] })
    ] }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider-om text-sm uppercase tracking-[0.4em] mb-8", children: "॥ You may also love ॥" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: related.filter((r) => r.id !== product.id).slice(0, 4).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
    ] })
  ] });
}
export {
  ProductDetail as component
};
