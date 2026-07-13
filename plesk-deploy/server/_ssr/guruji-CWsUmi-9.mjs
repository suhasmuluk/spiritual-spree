import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as CircleCheck, b as Sparkles, B as BookOpen, Q as QrCode, c as Clock, H as Heart, L as Languages, Y as Youtube } from "../_libs/lucide-react.mjs";
const features = [{
  icon: CircleCheck,
  title: "Comprehensive & Convenient",
  desc: "Receive all essential Ganesh Puja items in one beautifully packaged kit. No more last-minute searches or compromising on quality."
}, {
  icon: Sparkles,
  title: "Authentic & Shastrashuddha",
  desc: "Each component is chosen in strict adherence to Vedic scriptures (Shastras), guaranteeing the purity and traditional significance of your worship."
}, {
  icon: BookOpen,
  title: "Multilingual Puja Guide",
  desc: "Our detailed Ganesh Puja Vidhi booklet is available in Marathi, Hindi, and English — making sacred rituals accessible to everyone."
}, {
  icon: QrCode,
  title: "Guided Video Assistance",
  desc: "Simply scan the QR code to access step-by-step video instructions led by experienced Guruji — accurate pronunciation, proper execution."
}, {
  icon: Clock,
  title: "Beginner-Friendly & Time-Saving",
  desc: "Perfect for those new to Ganesh Puja and busy families alike. Our kit simplifies the process for a stress-free, swift setup."
}, {
  icon: Heart,
  title: "Affordable Quality & Spiritual Value",
  desc: "Premium, ethically sourced materials at a fair price — ensuring your celebration is both spiritually fulfilling and memorable."
}];
const languages = [
  // TODO: replace these YouTube video IDs with the real Guruji recordings.
  {
    lang: "मराठी",
    label: "Marathi",
    videoId: "dQw4w9WgXcQ"
  },
  {
    lang: "हिंदी",
    label: "Hindi",
    videoId: "dQw4w9WgXcQ"
  },
  {
    lang: "English",
    label: "English",
    videoId: "dQw4w9WgXcQ"
  },
  {
    lang: "தமிழ்",
    label: "Tamil",
    videoId: "dQw4w9WgXcQ"
  }
];
function GurujiPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-festive text-cream py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-gold mb-3", children: "Features" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-6xl mb-4", children: "Why Choose the Varad Vinayak Morya Kit?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/85 text-lg leading-relaxed", children: "A complete, shastrashuddha Ganesh Puja experience — guided by Guruji, designed for every family." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto", children: features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-6 border border-border shadow-soft hover:border-gold transition-smooth", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl text-primary mb-2", children: f.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: f.desc })
    ] }, f.title)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.3em] text-gold mb-2 inline-flex items-center gap-2 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "w-3.5 h-3.5" }),
          " Guruji's Guidance"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-5xl text-primary mb-4", children: "Watch Our Demo Video — Available in Your Language!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 leading-relaxed", children: "Follow the authentic Ganesh Puja at home. Our expert Guruji will guide you step-by-step, just like in a real mandap. Available in Marathi, Hindi, English & Tamil — easy, clear, and traditional. Make your Ganesh Puja pure, peaceful, and perfectly done!" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto", children: languages.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-4 border border-border shadow-soft flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl text-primary mb-3 text-center", children: [
          v.lang,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground font-sans", children: [
            "(",
            v.label,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-hidden rounded-xl bg-black", style: {
          paddingTop: "56.25%"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { className: "absolute inset-0 w-full h-full", src: `https://www.youtube.com/embed/${v.videoId}`, title: `Guruji demo video — ${v.label}`, loading: "lazy", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", allowFullScreen: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://www.youtube.com/watch?v=${v.videoId}`, target: "_blank", rel: "noopener noreferrer", className: "mt-3 inline-flex items-center justify-center gap-2 text-sm text-primary hover:text-primary-glow transition-smooth", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "w-4 h-4" }),
          " Watch on YouTube"
        ] })
      ] }, v.label)) })
    ] }) })
  ] });
}
export {
  GurujiPage as component
};
