import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useCart, f as formatINR } from "./router-ooRAjpbC.mjs";
import { r as resolveImage } from "./types-CpJ-x2HY.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-DJ82In3R.mjs";
import { q as Leaf, S as ShoppingCart } from "../_libs/lucide-react.mjs";
function ProductCard({ product }) {
  const { add } = useCart();
  const img = resolveImage(product.image_url);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "product-card group bg-card rounded-2xl overflow-hidden border border-border/60 shadow-soft flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products/$slug", params: { slug: product.slug }, className: "relative block aspect-square overflow-hidden bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: img,
          alt: product.name,
          loading: "lazy",
          width: 800,
          height: 800,
          className: "w-full h-full object-cover"
        }
      ),
      product.eco_friendly && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-700/90 text-white text-[10px] uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-3 h-3" }),
        " Eco"
      ] }),
      product.featured ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gold text-gold-foreground text-[10px] uppercase tracking-wider font-semibold", children: "Exclusive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-semibold", children: "Limited" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$slug", params: { slug: product.slug }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors", children: product.name }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-2 flex-1", children: product.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: product.stock > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 text-xs font-medium ${product.stock <= 5 ? "text-amber-600" : "text-emerald-700"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${product.stock <= 5 ? "bg-amber-500" : "bg-emerald-600"}` }),
        product.stock <= 5 ? `Only ${product.stock} left` : `${product.stock} in stock`
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-medium text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-destructive" }),
        " Out of stock"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-primary", children: formatINR(product.price) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            disabled: product.stock <= 0,
            onClick: () => {
              add({
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: img
              });
              toast.success(`${product.name} added to cart`);
            },
            className: "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow text-sm font-medium transition-smooth shadow-soft",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
              " Add"
            ]
          }
        )
      ] })
    ] })
  ] });
}
async function fetchProducts(filters) {
  let q = supabase.from("products").select("*, categories(slug,name)").order("created_at", { ascending: false });
  if (filters?.featured) q = q.eq("featured", true);
  if (filters?.search) q = q.ilike("name", `%${filters.search}%`);
  const { data, error } = await q;
  if (error) throw error;
  let rows = data ?? [];
  if (filters?.category) {
    rows = rows.filter((r) => r.categories?.slug === filters.category);
  }
  return rows.map(normalize);
}
async function fetchProductBySlug(slug) {
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? normalize(data) : null;
}
async function fetchCategories() {
  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error) throw error;
  return data ?? [];
}
function normalize(r) {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    description: r.description,
    price: Number(r.price),
    image_url: r.image_url,
    stock: r.stock ?? 0,
    category_id: r.category_id,
    featured: !!r.featured,
    eco_friendly: !!r.eco_friendly,
    highlights: Array.isArray(r.highlights) ? r.highlights : []
  };
}
export {
  ProductCard as P,
  fetchCategories as a,
  fetchProductBySlug as b,
  fetchProducts as f
};
