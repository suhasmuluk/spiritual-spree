import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { e as MapPin, M as Mail, P as Phone, G as Globe } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
function ContactPage() {
  const [submitting, setSubmitting] = reactExports.useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast.success("Message sent. Morya! We'll be in touch shortly.");
    e.target.reset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-festive text-cream py-14 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-gold mb-2", children: "Get in Touch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl", children: "We are here to help" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-4 py-16 max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary rounded-2xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-primary mb-5", children: "Get in Touch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-primary flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm mb-1", children: "Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Shah & Nahar Industrial Estate, Building No: A1, Unit 250/219, Second floor, Sitaram Jadhav Marg, Lower Parel, Mumbai 400013, Maharashtra, India" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5 text-primary flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm mb-1", children: "Mail Us" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:vinayakvarad4@gmail.com", className: "text-xs text-muted-foreground hover:text-primary break-all", children: "vinayakvarad4@gmail.com" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-primary flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm mb-1", children: "Telephone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+917977617782", className: "text-xs text-muted-foreground hover:text-primary", children: "+91 7977617782" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-primary flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm mb-1", children: "Website" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "varadvinayakmoryaa.com" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "bg-card rounded-2xl border border-border p-6 shadow-soft space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-primary", children: "Send Your Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We'd love to hear from you! Whether you have a question, need details, or want to place an order — drop us a message." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, name: "name", placeholder: "Full Name", className: "w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "tel", name: "contact", placeholder: "Contact Number", className: "w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, name: "location", placeholder: "Location", className: "w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", name: "email", placeholder: "Email ID", className: "w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, name: "description", placeholder: "Description", rows: 5, className: "w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: submitting, className: "w-full px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow font-semibold transition-smooth disabled:opacity-60", children: submitting ? "Sending…" : "Submit" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden border border-border shadow-soft min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "Location", src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2667.62399828304!2d72.82437620599055!3d18.993704523957838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce8b4c84a8eb%3A0xb69843a27dd2b3b7!2sA2%2C%20Shah%20And%20Nahar%20Industrial%20Estate!5e0!3m2!1sen!2sin!4v1745961751730!5m2!1sen!2sin", className: "w-full h-full min-h-[400px]", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade", allowFullScreen: true }) })
    ] }) })
  ] });
}
export {
  ContactPage as component
};
