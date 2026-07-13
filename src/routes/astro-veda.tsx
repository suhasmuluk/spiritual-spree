import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Sparkles, Moon, Gem } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/queries";

export const Route = createFileRoute("/astro-veda")({
  head: () => ({
    meta: [
      { title: "Astro Veda — Vastu & Pooja Kits | VedaKits" },
      { name: "description", content: "Mystical, premium and traditional — Vastu kits and Pooja kits crafted with authentic Vedic wisdom." },
      { property: "og:title", content: "Astro Veda — Vastu & Pooja Kits | VedaKits" },
      { property: "og:description", content: "Mystical, premium and traditional — Vastu and Pooja kits, crafted with authentic Vedic wisdom." },
      { property: "og:url", content: "/astro-veda" },
    ],
    links: [{ rel: "canonical", href: "/astro-veda" }],
  }),
  component: AstroVedaLayout,
});

function AstroVedaLayout() {
  return (
    <div className="theme-astro min-h-screen bg-background text-foreground">
      <Outlet />
    </div>
  );
}

export function AstroVedaLanding() {
  const { data: products = [] } = useQuery({
    queryKey: ["products", { section: "astro-veda" }],
    queryFn: () => fetchProducts({ section: "astro-veda" }),
  });

  return (
    <>
      {/* Editorial split hero — asymmetric, premium */}
      <section className="relative overflow-hidden bg-festive text-cream">
        <div className="absolute inset-0 opacity-25 pointer-events-none"
             style={{ backgroundImage: "radial-gradient(circle at 18% 22%, var(--gold) 0, transparent 35%), radial-gradient(circle at 82% 78%, var(--primary-glow) 0, transparent 45%)" }} />
        {/* Star grid */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
             style={{ backgroundImage: "radial-gradient(circle, var(--gold) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container mx-auto px-4 py-24 md:py-32 relative grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 text-gold text-[11px] uppercase tracking-[0.35em] mb-8">
              <Sparkles className="w-3 h-3" /> Astro Veda · 01
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight">
              Sacred energies,<br />
              <em className="not-italic text-shimmer">crafted in tradition.</em>
            </h1>
          </div>
          <div className="md:col-span-5 md:pl-8 md:border-l border-gold/30">
            <p className="text-cream/85 text-lg leading-relaxed mb-8">
              Authentic Vastu and Vedic pooja kits &mdash; assembled by traditional priests to bring harmony, prosperity and divine grace into your home.
            </p>
            <Link
              to="/astro-veda/shop"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gold text-gold-foreground font-semibold hover:scale-105 transition-smooth shadow-gold"
            >
              Explore the collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="relative border-t border-gold/20">
          <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.35em] text-gold/80">
            <span>Energised · Pure · Vedic</span>
            <span className="hidden sm:inline">Brass · Copper · Crystal</span>
            <span>Hand-assembled in Bharat</span>
          </div>
        </div>
      </section>

      {/* Three pillars — vertical with serial numbers, no boxy cards */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-3 md:gap-12 gap-10">
          {[
            { n: "I", icon: Gem, title: "Energised & Pure", desc: "Each kit blessed in sacred Vedic ritual before dispatch from our atelier." },
            { n: "II", icon: Moon, title: "Mystical Tradition", desc: "Sourced from authentic Vedic lineages across India, preserving ancestral wisdom." },
            { n: "III", icon: Sparkles, title: "Premium Craft", desc: "Brass, copper, crystal and sacred herbs &mdash; never compromised, never substituted." },
          ].map((f) => (
            <div key={f.title} className="border-t border-gold/40 pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="font-display italic text-3xl text-gold">{f.n}</span>
                <f.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl mb-3 leading-tight">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: f.desc }} />
            </div>
          ))}
        </div>
      </section>

      {/* Featured — magazine-style heading */}
      <section className="container mx-auto px-4 pb-24">
        <div className="flex items-end justify-between mb-10 border-b border-border pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold mb-3">Featured · Volume I</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">Sacred kits for your home</h2>
          </div>
          <Link to="/astro-veda/shop" className="hidden md:inline-flex items-center gap-2 text-primary hover:gap-3 transition-all text-sm font-medium uppercase tracking-wider">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
