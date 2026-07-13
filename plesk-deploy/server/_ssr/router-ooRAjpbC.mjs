import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-DJ82In3R.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { P as Phone, M as Mail, F as Facebook, S as ShoppingCart, X, a as Menu, I as Instagram, Y as Youtube } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-mIpJ02FV.css";
const CartContext = reactExports.createContext(null);
const KEY = "vvm_cart_v1";
function CartProvider({ children }) {
  const [items, setItems] = reactExports.useState([]);
  reactExports.useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {
    }
  }, []);
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEY, JSON.stringify(items));
    }
  }, [items]);
  const add = (item, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) => p.id === item.id ? { ...p, quantity: p.quantity + qty } : p);
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };
  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const setQty = (id, qty) => setItems(
    (prev) => prev.map((p) => p.id === id ? { ...p, quantity: Math.max(1, qty) } : p)
  );
  const clear = () => setItems([]);
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CartContext.Provider, { value: { items, add, remove, setQty, clear, count, subtotal }, children });
}
function useCart() {
  const ctx = reactExports.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
const formatINR = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const logo = "/assets/logo-varad-vinayak-n0PQ5i9p.jpeg";
const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Pooja Kit", category: "pooja-kits" },
  { to: "/products", label: "Makhar Designs", category: "makhars" },
  { to: "/guruji", label: "Guruji's Guidance" },
  { to: "/contact", label: "Contact Us" }
];
function Header() {
  const { count } = useCart();
  const [open, setOpen] = reactExports.useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const searchStr = useRouterState({ select: (s) => s.location.searchStr });
  const currentCategory = (() => {
    try {
      return new URLSearchParams(searchStr ?? "").get("category") ?? void 0;
    } catch {
      return void 0;
    }
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-festive text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 h-9 flex items-center justify-end gap-6 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+917977617782", className: "hidden sm:flex items-center gap-1.5 hover:text-gold transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+91 7977617782" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:info@varadvinayakmorya.com", className: "hidden sm:flex items-center gap-1.5 hover:text-gold transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "info@varadvinayakmorya.com" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Facebook", className: "w-6 h-6 rounded-full bg-white/15 hover:bg-gold hover:text-primary flex items-center justify-center transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "w-3.5 h-3.5" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background border-b border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 flex items-center justify-between h-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: logo,
            alt: "Varad Vinayak Morya",
            className: "h-12 md:h-14 w-auto object-contain"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-8", children: nav.map((n, i) => {
          let active = false;
          if (i === 0) {
            active = path === "/";
          } else if (n.to === "/products") {
            active = path === "/products" && currentCategory === n.category;
          } else {
            active = path === n.to;
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: n.to,
              search: n.category ? { category: n.category } : {},
              className: `relative text-[15px] font-medium transition-colors ${active ? "text-primary after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:w-6 after:h-0.5 after:bg-primary" : "text-foreground/80 hover:text-primary"}`,
              children: n.label
            },
            `${n.to}-${i}`
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/cart",
              className: "relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-secondary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth",
              "aria-label": "Cart",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-5 h-5" }),
                count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold flex items-center justify-center", children: count })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-secondary text-primary",
              onClick: () => setOpen((s) => !s),
              "aria-label": "Menu",
              children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
            }
          )
        ] })
      ] }),
      open && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-3", children: nav.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: n.to,
          search: n.category ? { category: n.category } : {},
          onClick: () => setOpen(false),
          className: "py-2 text-foreground/80 hover:text-primary text-[15px] font-medium",
          children: n.label
        },
        `${n.to}-m-${i}`
      )) })
    ] })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-festive text-cream mt-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 grid md:grid-cols-4 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gold-grad flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-display text-xl", children: "ॐ" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl", children: "Varad Vinayak Morya" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/80 text-sm leading-relaxed", children: "Authentic, eco-friendly Ganeshotsav essentials, hand-crafted with devotion in Maharashtra." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-gold uppercase tracking-widest text-xs mb-4", children: "Shop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "hover:text-gold", children: "All Products" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", search: { category: "makhars" }, className: "hover:text-gold", children: "Makhars" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", search: { category: "pooja-kits" }, className: "hover:text-gold", children: "Pooja Kits" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-gold uppercase tracking-widest text-xs mb-4", children: "Company" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-gold", children: "About Us" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-gold", children: "Contact" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shipping-returns", className: "hover:text-gold", children: "Shipping & Returns" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/faq", className: "hover:text-gold", children: "FAQ" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-gold uppercase tracking-widest text-xs mb-4", children: "Connect" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:vinayakvarad4@gmail.com", className: "flex items-center gap-2 hover:text-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "vinayakvarad4@gmail.com" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+917977617782", className: "flex items-center gap-2 hover:text-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+91 7977617782" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/70 text-xs leading-relaxed pt-1", children: "Lower Parel, Mumbai 400013, Maharashtra" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.instagram.com/icon.printing.co/", target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram", className: "w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.facebook.com/share/1MBDjoMsnk/", target: "_blank", rel: "noopener noreferrer", "aria-label": "Facebook", className: "w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "YouTube", className: "w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "w-4 h-4" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 py-5 text-center text-xs text-cream/60", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Varad Vinayak Morya · Copyright Icon Printing · गणपती बाप्पा मोरया"
    ] })
  ] });
}
function WhatsAppButton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href: "https://wa.me/919999999999?text=Namaste%20%E0%A4%AE%E0%A5%8B%E0%A4%B0%E0%A4%AF%E0%A4%BE!%20I%20have%20a%20question%20about%20your%20products.",
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Chat on WhatsApp",
      className: "fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-elegant flex items-center justify-center animate-glow-pulse hover:scale-110 transition-smooth",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 32 32", className: "w-7 h-7", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.11 17.21c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.42.12-.55.13-.13.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.05-.22-.54-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34s-.96.94-.96 2.29.99 2.66 1.13 2.84c.14.18 1.95 2.97 4.72 4.16.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.62-.66 1.85-1.31.23-.65.23-1.2.16-1.31-.07-.11-.25-.18-.52-.32zM16.02 5.33c-5.86 0-10.62 4.76-10.62 10.62 0 1.87.49 3.7 1.42 5.31L5 27l5.91-1.55a10.6 10.6 0 005.11 1.3h.01c5.85 0 10.62-4.76 10.62-10.62 0-2.84-1.1-5.5-3.11-7.51a10.55 10.55 0 00-7.52-3.29z" }) })
    }
  );
}
const Ctx = reactExports.createContext(void 0);
function AuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [user, setUser] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const checkRole = async (uid) => {
    if (!uid) {
      setIsAdmin(false);
      return;
    }
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid).eq("role", "admin").maybeSingle();
    setIsAdmin(!!data);
  };
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setTimeout(() => {
        checkRole(s?.user?.id);
      }, 0);
    });
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      checkRole(s?.user?.id).finally(() => setLoading(false));
    });
    return () => subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value: {
    user,
    session,
    isAdmin,
    loading,
    signOut: async () => {
      await supabase.auth.signOut();
    },
    refreshRole: async () => {
      await checkRole(user?.id);
    }
  }, children });
}
function useAuth() {
  const c = reactExports.useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-display text-primary", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-display", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "This path does not exist. Bappa is guiding you home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-glow transition-smooth",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong. Please try again." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-secondary", children: "Go home" })
    ] })
  ] }) });
}
const Route$i = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Varad Vinayak Morya — Exclusive Hand-carved Makhars & Pooja Kits" },
      { name: "description", content: "Exclusive, limited-edition hand-carved makhars and authentic Vedic pooja kits — eco-friendly, handcrafted with devotion in Maharashtra." },
      { name: "author", content: "Varad Vinayak Morya" },
      { property: "og:title", content: "Varad Vinayak Morya — Exclusive Hand-carved Makhars & Pooja Kits" },
      { property: "og:description", content: "Exclusive, limited-edition hand-carved makhars and authentic Vedic pooja kits — eco-friendly, handcrafted with devotion in Maharashtra." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Varad Vinayak Morya — Exclusive Hand-carved Makhars & Pooja Kits" },
      { name: "twitter:description", content: "Exclusive, limited-edition hand-carved makhars and authentic Vedic pooja kits — eco-friendly, handcrafted with devotion in Maharashtra." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fa415c6b-0515-4698-91a3-981540482626/id-preview-b7dc9010--9303df36-6ac9-46c5-8a4d-21742f90b7de.lovable.app-1778691084017.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fa415c6b-0515-4698-91a3-981540482626/id-preview-b7dc9010--9303df36-6ac9-46c5-8a4d-21742f90b7de.lovable.app-1778691084017.png" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Tiro+Devanagari+Marathi&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$i.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CartProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppButton, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) }) });
}
const $$splitComponentImporter$h = () => import("./shipping-returns-DASDUbVL.mjs");
const Route$h = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [{
      title: "Shipping & Returns — Varad Vinayak Morya"
    }, {
      name: "description",
      content: "Our shipping timelines, charges, and return/refund policy for pooja kits and makhars."
    }, {
      property: "og:title",
      content: "Shipping & Returns — Varad Vinayak Morya"
    }, {
      property: "og:description",
      content: "Our shipping timelines, charges, and return/refund policy for pooja kits and makhars."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./order-success-V8Dn7v7C.mjs");
const Route$g = createFileRoute("/order-success")({
  validateSearch: (s) => objectType({
    orderId: stringType().optional()
  }).parse(s),
  head: () => ({
    meta: [{
      title: "Order Confirmed — Varad Vinayak Morya"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./guruji-CWsUmi-9.mjs");
const Route$f = createFileRoute("/guruji")({
  head: () => ({
    meta: [{
      title: "Guruji's Guidance & Features — Varad Vinayak Morya"
    }, {
      name: "description",
      content: "Step-by-step Ganesh Puja guidance by Guruji in Marathi, Hindi, English & Tamil. Learn why the Varad Vinayak Morya kit is the most authentic, eco-friendly, hassle-free choice."
    }, {
      property: "og:title",
      content: "Guruji's Guidance — Varad Vinayak Morya"
    }, {
      property: "og:description",
      content: "Authentic Ganesh Puja made simple — guided videos in 4 languages with a complete shastrashuddha kit."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./faq-xCqz_XJj.mjs");
const Route$e = createFileRoute("/faq")({
  head: () => ({
    meta: [{
      title: "FAQ — Varad Vinayak Morya"
    }, {
      name: "description",
      content: "Frequently asked questions about our pooja kits, makhars, shipping, and returns."
    }, {
      property: "og:title",
      content: "FAQ — Varad Vinayak Morya"
    }, {
      property: "og:description",
      content: "Frequently asked questions about our pooja kits, makhars, shipping, and returns."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./contact-DsXixepo.mjs");
const Route$d = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — Varad Vinayak Morya"
    }, {
      name: "description",
      content: "Get in touch with Varad Vinayak Morya, Lower Parel Mumbai. Call +91 7977617782 or email vinayakvarad4@gmail.com for orders and pooja guidance."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./checkout-C92GnbS6.mjs");
const Route$c = createFileRoute("/checkout")({
  head: () => ({
    meta: [{
      title: "Checkout — Varad Vinayak Morya"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./cart-D9cJzwh3.mjs");
const Route$b = createFileRoute("/cart")({
  head: () => ({
    meta: [{
      title: "Your Cart — Varad Vinayak Morya"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./auth-D1umyTcr.mjs");
const Route$a = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Sign in — Varad Vinayak Morya"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin-Bj68x5h4.mjs");
const Route$9 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin — Varad Vinayak Morya"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./about-DxAGV267.mjs");
const Route$8 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — Varad Vinayak Morya"
    }, {
      name: "description",
      content: "Founded by Abhijit Pathare, Varad Vinayak Morya brings 35+ years of printing & design expertise to crafting authentic Ganpati Pooja Kits and Eco-Friendly Makhars."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./index-Bc9gWx8g.mjs");
const Route$7 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Varad Vinayak Morya — Exclusive Eco-Friendly Ganeshotsav Collection"
    }, {
      name: "description",
      content: "Shop our exclusive, limited-edition hand-carved makhars and authentic Vedic pooja kits — eco-friendly, handcrafted with devotion in Maharashtra."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./products.index--McJjOXa.mjs");
const searchSchema = objectType({
  category: stringType().optional()
});
const Route$6 = createFileRoute("/products/")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [{
      title: "Exclusive Eco-Friendly Collection — Varad Vinayak Morya"
    }, {
      name: "description",
      content: "Browse our exclusive, limited-edition hand-carved makhars and authentic Vedic pooja kits — eco-friendly, handcrafted with devotion."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.index-a60Ou8kU.mjs");
const Route$5 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./products._slug-Ep4WGcvI.mjs");
const Route$4 = createFileRoute("/products/$slug")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.products-DJnoC-NX.mjs");
const Route$3 = createFileRoute("/admin/products")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.payment-logs-DUQtaAUR.mjs");
const Route$2 = createFileRoute("/admin/payment-logs")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.orders-DHTgxCkH.mjs");
const Route$1 = createFileRoute("/admin/orders")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.categories-DQnrPti3.mjs");
const Route = createFileRoute("/admin/categories")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ShippingReturnsRoute = Route$h.update({
  id: "/shipping-returns",
  path: "/shipping-returns",
  getParentRoute: () => Route$i
});
const OrderSuccessRoute = Route$g.update({
  id: "/order-success",
  path: "/order-success",
  getParentRoute: () => Route$i
});
const GurujiRoute = Route$f.update({
  id: "/guruji",
  path: "/guruji",
  getParentRoute: () => Route$i
});
const FaqRoute = Route$e.update({
  id: "/faq",
  path: "/faq",
  getParentRoute: () => Route$i
});
const ContactRoute = Route$d.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$i
});
const CheckoutRoute = Route$c.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$i
});
const CartRoute = Route$b.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$i
});
const AuthRoute = Route$a.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$i
});
const AdminRoute = Route$9.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$i
});
const AboutRoute = Route$8.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$i
});
const IndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$i
});
const ProductsIndexRoute = Route$6.update({
  id: "/products/",
  path: "/products/",
  getParentRoute: () => Route$i
});
const AdminIndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const ProductsSlugRoute = Route$4.update({
  id: "/products/$slug",
  path: "/products/$slug",
  getParentRoute: () => Route$i
});
const AdminProductsRoute = Route$3.update({
  id: "/products",
  path: "/products",
  getParentRoute: () => AdminRoute
});
const AdminPaymentLogsRoute = Route$2.update({
  id: "/payment-logs",
  path: "/payment-logs",
  getParentRoute: () => AdminRoute
});
const AdminOrdersRoute = Route$1.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => AdminRoute
});
const AdminCategoriesRoute = Route.update({
  id: "/categories",
  path: "/categories",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminCategoriesRoute,
  AdminOrdersRoute,
  AdminPaymentLogsRoute,
  AdminProductsRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute: AdminRouteWithChildren,
  AuthRoute,
  CartRoute,
  CheckoutRoute,
  ContactRoute,
  FaqRoute,
  GurujiRoute,
  OrderSuccessRoute,
  ShippingReturnsRoute,
  ProductsSlugRoute,
  ProductsIndexRoute
};
const routeTree = Route$i._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$g as R,
  useAuth as a,
  Route$6 as b,
  Route$4 as c,
  formatINR as f,
  router as r,
  useCart as u
};
