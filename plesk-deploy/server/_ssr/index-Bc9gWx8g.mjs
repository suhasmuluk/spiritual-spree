import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { F as FloatingPetals } from "./FloatingPetals-4wkyN4zs.mjs";
import { P as ProductCard, f as fetchProducts } from "./queries--zSvVXVj.mjs";
import "../_libs/sonner.mjs";
import { b as Sparkles, A as ArrowRight, q as Leaf, T as Truck, r as Star, h as ShieldCheck } from "../_libs/lucide-react.mjs";
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
import "./router-ooRAjpbC.mjs";
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
import "./types-CpJ-x2HY.mjs";
const heroImg = "/assets/hero-ganesh-CKocZ05U.jpg";
function HomePage() {
  const {
    data: featured = []
  } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => fetchProducts({
      featured: true
    })
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-festive text-cream min-h-[calc(100svh-4rem)] flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingPetals, { count: 18 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 md:py-12 grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-gold/30 text-gold text-[10px] md:text-xs uppercase tracking-[0.25em] mb-3 md:mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
            " Exclusive · Eco-Friendly · Ganeshotsav 2026"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-3 md:mb-4", children: [
            "Exclusive ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-shimmer", children: "Eco-Friendly" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Ganeshotsav, crafted with devotion"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-cream/85 max-w-lg mb-4 md:mb-6 leading-relaxed", children: "A limited, handpicked collection of hand-carved makhars and authentic Vedic pooja kits — exclusive to a few devotees, eco-friendly by craft, and made to bless your home for generations." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", className: "inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-gold text-gold-foreground font-semibold hover:scale-105 transition-smooth shadow-gold text-sm md:text-base", children: [
            "Shop the Exclusive Collection ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 md:mt-6 text-xs md:text-sm text-cream/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4 text-gold" }),
              " 100% Eco-Friendly"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-gold" }),
              " Limited Edition"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-gold" }),
              " Pan-India Shipping"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-gold" }),
              " 4.9★ rated"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden md:block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 rounded-[2rem] bg-gold-grad opacity-20 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Eco-friendly Ganesh idol on hand-carved makhar", width: 1600, height: 1024, className: "relative rounded-[2rem] shadow-elegant border border-gold/30 animate-float-slow max-h-[75vh] w-full object-cover" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider-om text-sm uppercase tracking-[0.4em] mb-10", children: "॥ Shop by Category ॥" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 max-w-2xl mx-auto", children: [{
        slug: "makhars",
        label: "Hand-carved Makhars"
      }, {
        slug: "pooja-kits",
        label: "Vedic Pooja Kits"
      }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", search: {
        category: c.slug
      }, className: "group p-6 rounded-2xl bg-card border border-border hover:border-gold transition-smooth shadow-soft text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-cream font-display text-xl group-hover:scale-110 transition-smooth", children: "ॐ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg text-foreground", children: c.label })
      ] }, c.slug)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-gold mb-2", children: "Bestsellers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl", children: "Featured for Bappa" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", className: "hidden md:inline-flex items-center gap-1 text-primary hover:text-primary-glow text-sm font-medium", children: [
          "View all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: featured.slice(0, 8).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary mt-20 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-gold mb-2", children: "Why Choose Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl text-primary", children: "Exclusive. Eco-Friendly. Authentic." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3", children: "Every makhar and pooja kit is made in small, limited batches by Maharashtrian artisans using natural materials and plastic-free packaging — kind to the earth, sacred to Bappa." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [{
        icon: Leaf,
        title: "Eco-Friendly Craft",
        desc: "Natural materials, natural colours & plastic-free packaging."
      }, {
        icon: Sparkles,
        title: "Exclusive & Limited",
        desc: "Small-batch, hand-crafted pieces — never mass-produced."
      }, {
        icon: ShieldCheck,
        title: "Authentic Vedic",
        desc: "Every samagri sourced traditionally & blessed correctly."
      }, {
        icon: Truck,
        title: "Doorstep Delivery",
        desc: "Carefully packed, delivered pan-India with love."
      }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-6 border border-border shadow-soft text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-1", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: f.desc })
      ] }, f.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-gold mb-2", children: "Devotees Say" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl", children: "Blessed by thousands of families" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
        name: "Priya Joshi",
        city: "Pune",
        text: "The makhar is breathtaking and the pooja kit had everything we needed. Felt like Bappa Himself was guiding us."
      }, {
        name: "Rohit Deshmukh",
        city: "Mumbai",
        text: "Loved the eco-friendly idol — dissolved in water beautifully. Will order every year."
      }, {
        name: "Anjali Patil",
        city: "Nashik",
        text: "Premium quality, traditional touch and the digital guruji guide is a blessing for first-timers."
      }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "bg-card rounded-2xl p-7 border border-border shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-3 text-gold", children: Array.from({
          length: 5
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-current" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-foreground/90 italic leading-relaxed", children: [
          '"',
          t.text,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            " · ",
            t.city
          ] })
        ] })
      ] }, t.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-4 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-festive text-cream p-12 md:p-16 text-center shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingPetals, { count: 10 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-5xl mb-4", children: "गणपती बाप्पा मोरया!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/85 max-w-xl mx-auto mb-7", children: "Reserve your exclusive, eco-friendly Varad Vinayak Morya kit today — limited pieces, handmade with love, blessed for your home." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", className: "inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-gold-foreground font-semibold hover:scale-105 transition-smooth shadow-gold", children: [
          "Shop the Exclusive Collection ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  HomePage as component
};
