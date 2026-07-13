import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Heart, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VedaKits" },
      { name: "description", content: "VedaKits, founded by Amol Nagarkar, curates authentic Vedic Astro kits and natural Wellness essentials — bringing tradition and well-being into the modern home." },
      { property: "og:title", content: "About — VedaKits" },
      { property: "og:description", content: "Founded by Amol Nagarkar — VedaKits brings authentic Astro and Wellness essentials rooted in Vedic tradition." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-festive text-cream py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-gold mb-3">Our Story</p>
          <h1 className="font-display text-4xl md:text-6xl mb-4">Tradition. Wellness. Trust.</h1>
          <p className="text-cream/85 text-lg leading-relaxed">
            VedaKits is a curated home for authentic Vedic essentials — sacred Astro kits and
            natural Wellness products, brought together under one mindful brand.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">The Founder</p>
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-6">
            Amol Nagarkar <span className="text-foreground/60 text-xl">(Founder)</span>
          </h2>
          <p className="text-foreground/85 leading-relaxed mb-4">
            VedaKits was founded by <strong>Amol Nagarkar</strong> with a simple belief — that
            the everyday rituals and remedies handed down through Vedic tradition still have a
            meaningful place in modern life. What began as a personal pursuit of authentic
            sources soon grew into a brand built on trust, transparency, and quality.
          </p>
          <p className="text-foreground/85 leading-relaxed mb-4">
            Under his stewardship, VedaKits brings together two carefully curated worlds —
            <strong> Astro Veda</strong> for sacred Vastu and Pooja kits, and
            <strong> Wellness Veda</strong> for natural, plant-based wellness essentials. Every
            product is sourced thoughtfully and assembled with attention to detail so families
            can experience tradition without compromise.
          </p>
          <p className="text-foreground/85 leading-relaxed">
            Our mission is to make authentic Vedic living simple, accessible, and beautiful —
            one kit at a time.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Sparkles, title: "Authentic Vedic", desc: "Sourced traditionally, prepared as the texts intend." },
              { icon: Leaf, title: "Natural & Clean", desc: "Plant-based, mindfully sourced ingredients in every wellness product." },
              { icon: Heart, title: "Made with Care", desc: "Hand-assembled and quality-checked before every dispatch." },
            ].map((v) => (
              <div key={v.title} className="text-center p-6 bg-card rounded-2xl border border-border shadow-soft">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
