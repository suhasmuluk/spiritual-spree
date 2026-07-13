import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Sparkles, ShieldCheck, Truck, Moon, Gem } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VedaKits — Sacred Astro & Pure Wellness Kits" },
      { name: "description", content: "VedaKits brings together two worlds — Astro Veda (Vastu & Pooja kits) and Wellness Veda (bath, skin & superfoods). Authentic, eco-friendly, made with care." },
      { property: "og:title", content: "VedaKits — Sacred Astro & Pure Wellness Kits" },
      { property: "og:description", content: "Two collections, one promise. Astro Veda for sacred rituals, Wellness Veda for everyday self-care." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Split-screen hero: two themed worlds side by side, full bleed */}
      <section className="grid md:grid-cols-2 min-h-[640px] md:min-h-[78vh]">
        {/* ── Astro Veda half ── */}
        <Link
          to="/astro-veda"
          className="theme-astro group relative overflow-hidden flex items-end md:items-center p-8 md:p-14 text-white"
          style={{
            background:
              "linear-gradient(165deg, #1b3a2a 0%, #224a36 55%, #2c5a42 100%)",
          }}

        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-700 group-hover:opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 75% 25%, #d4af5e 0, transparent 45%), radial-gradient(circle at 15% 85%, #c9a14a 0, transparent 35%)",
            }}
          />
          {/* faint constellation lines */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
               style={{ backgroundImage: "linear-gradient(#c9a14a 1px, transparent 1px), linear-gradient(90deg, #c9a14a 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

          <div className="relative max-w-md">
            <div className="inline-flex items-center gap-2 mb-5 text-[11px] uppercase tracking-[0.4em]"
                 style={{ color: "#d4af5e" }}>
              <Moon className="w-3.5 h-3.5" /> 01 · Sacred
            </div>
            <h2 className="text-5xl md:text-7xl leading-[1.05] mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f6efe1" }}>
              Astro<br /><em className="not-italic" style={{ color: "#d4af5e" }}>Veda</em>
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-8 max-w-sm"
               style={{ color: "#f6efe1cc", fontFamily: "'Cormorant Garamond', serif" }}>
              Energised Vastu and Pooja kits, assembled in ritual.
              Mystical. Premium. Traditional.
            </p>
            <span className="inline-flex items-center gap-3 pb-2 border-b text-sm tracking-wider uppercase transition-all group-hover:gap-5"
                  style={{ color: "#d4af5e", borderColor: "#d4af5e" }}>
              Enter the Sanctum <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>

        {/* ── Wellness Veda half ── */}
        <Link
          to="/wellness-veda"
          className="theme-wellness group relative overflow-hidden flex items-end md:items-center p-8 md:p-14"
          style={{ background: "linear-gradient(165deg, #f7f4ee 0%, #ecede2 55%, #d9d1c0 100%)" }}
        >
          <div className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-700 group-hover:opacity-60"
               style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #7c9473 0, transparent 50%), radial-gradient(circle at 15% 85%, #c97b5a 0, transparent 45%)" }} />

          <div className="relative max-w-md">
            <div className="inline-flex items-center gap-2 mb-5 text-[11px] uppercase tracking-[0.4em]"
                 style={{ color: "#7c9473" }}>
              <Leaf className="w-3.5 h-3.5" /> 02 · Natural
            </div>
            <h2 className="text-5xl md:text-7xl leading-[1.05] mb-5 font-semibold tracking-tight"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#2f3a2d" }}>
              Wellness<br /><span style={{ color: "#7c9473" }}>Veda.</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-8 max-w-sm"
               style={{ color: "#3a4a3acc", fontFamily: "'Inter', system-ui, sans-serif" }}>
              Bathing salts, moringa &amp; lip balms.
              Fresh. Organic. Minimalist.
            </p>
            <span className="inline-flex items-center gap-3 pb-2 border-b text-sm tracking-wider uppercase transition-all group-hover:gap-5"
                  style={{ color: "#3a4a3a", borderColor: "#7c9473" }}>
              Step Outside <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </section>

      {/* Brand strip */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-display italic text-lg md:text-xl text-foreground/80">
            Two worlds of Veda &mdash; <span className="text-accent">one trusted source</span>.
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">VedaKits.com</p>
        </div>
      </section>

      {/* Trust band — tokens-driven, restructured to 2x2 with index numerals */}
      <section className="container mx-auto px-4 py-20 md:py-24">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Why VedaKits</p>
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            Authentic by sourcing.<br />
            <span className="italic text-foreground/60">Beautiful by intention.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {[
            { n: "01", icon: ShieldCheck, title: "Authentic", desc: "Sourced and verified at every step." },
            { n: "02", icon: Leaf, title: "Eco-Friendly", desc: "Natural materials, plastic-free packaging." },
            { n: "03", icon: Sparkles, title: "Small Batch", desc: "Made with care, never mass-produced." },
            { n: "04", icon: Truck, title: "Pan-India Ship", desc: "Delivered safely to your doorstep." },
          ].map((f) => (
            <div key={f.title} className="bg-card p-7 group hover:bg-secondary transition-smooth">
              <div className="flex items-start justify-between mb-8">
                <span className="text-xs tracking-[0.3em] text-muted-foreground">{f.n}</span>
                <f.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-xl mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing call-to-explore */}
      <section className="container mx-auto px-4 pb-24">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
               style={{ backgroundImage: "radial-gradient(circle at 30% 30%, var(--gold) 0, transparent 40%), radial-gradient(circle at 70% 70%, var(--gold) 0, transparent 40%)" }} />
          <Gem className="w-8 h-8 mx-auto mb-5 text-accent" />
          <h2 className="font-display text-3xl md:text-5xl mb-4 max-w-2xl mx-auto leading-tight">
            Begin with the world that calls you.
          </h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8">
            Whether you seek divine harmony or daily nourishment — your kit is waiting.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/astro-veda" className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:scale-105 transition-smooth">
              Astro Veda
            </Link>
            <Link to="/wellness-veda" className="px-6 py-3 rounded-full border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-smooth font-semibold">
              Wellness Veda
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
