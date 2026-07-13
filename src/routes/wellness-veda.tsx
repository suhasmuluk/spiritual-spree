import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Leaf, Droplet, Sprout } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/queries";

export const Route = createFileRoute("/wellness-veda")({
  head: () => ({
    meta: [
      { title: "Wellness Veda — Natural Bath, Skin & Superfoods | VedaKits" },
      { name: "description", content: "Fresh, organic and minimalist — bathing salts, moringa powder and lip balms made from pure botanicals." },
      { property: "og:title", content: "Wellness Veda — Natural Bath, Skin & Superfoods" },
      { property: "og:description", content: "Fresh, organic and minimalist — bathing salts, moringa powder and lip balms made from pure botanicals." },
      { property: "og:url", content: "/wellness-veda" },
    ],
    links: [{ rel: "canonical", href: "/wellness-veda" }],
  }),
  component: WellnessVedaLayout,
});

function WellnessVedaLayout() {
  return (
    <div className="theme-wellness min-h-screen bg-background text-foreground">
      <Outlet />
    </div>
  );
}

export function WellnessVedaLanding() {
  const { data: products = [] } = useQuery({
    queryKey: ["products", { section: "wellness-veda" }],
    queryFn: () => fetchProducts({ section: "wellness-veda" }),
  });

  return (
    <>
      {/* Airy minimalist hero — left text, right marquee accent */}
      <section className="relative bg-background pt-20 md:pt-28 pb-16">
        <div className="container mx-auto px-4 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 mb-6 text-[11px] uppercase tracking-[0.3em] text-primary">
              <span className="w-8 h-px bg-primary" /> <Leaf className="w-3.5 h-3.5" /> Wellness Veda
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6 text-primary">
              Clean rituals,<br />
              <span className="text-accent">rooted in nature.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed mb-10">
              Bathing salts, moringa powder and lip balms &mdash; small-batch, plant-based, made with botanicals you can pronounce.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                to="/wellness-veda/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
              >
                Shop the range <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="#about" className="text-sm font-medium text-foreground/70 hover:text-accent underline underline-offset-4 decoration-accent/40">
                Our philosophy
              </Link>
            </div>
          </div>

          {/* Right ornamental block — minimal sage panel with stats */}
          <div className="md:col-span-5">
            <div className="aspect-[4/5] rounded-[2rem] bg-secondary relative overflow-hidden flex flex-col justify-between p-8">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/15" />
              <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-accent/15" />
              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-1">Est. 2024</p>
                <p className="font-display text-xl text-primary">Small batch, slow made.</p>
              </div>
              <div className="relative grid grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl font-semibold text-primary">100%</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Botanical</p>
                </div>
                <div>
                  <p className="text-4xl font-semibold text-accent">0</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Synthetics</p>
                </div>
                <div>
                  <p className="text-4xl font-semibold text-primary">12+</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Farms</p>
                </div>
                <div>
                  <p className="text-4xl font-semibold text-accent">100%</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Recyclable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars — inline horizontal list, no boxy cards */}
      <section id="about" className="border-y border-border bg-card">
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-10">
          {[
            { icon: Sprout, title: "100% Botanical", desc: "Plant-derived ingredients, never synthetic." },
            { icon: Droplet, title: "Cold Processed", desc: "Gentle methods that preserve nutrients and aroma." },
            { icon: Leaf, title: "Eco Packaging", desc: "Recyclable, refill-friendly and plastic-free." },
          ].map((f) => (
            <div key={f.title} className="flex gap-5">
              <div className="shrink-0 w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center">
                <f.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-primary">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Featured</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-primary tracking-tight">Everyday wellness picks</h2>
          </div>
          <Link to="/wellness-veda/shop" className="hidden md:inline-flex items-center gap-2 text-primary hover:gap-3 transition-all text-sm font-medium uppercase tracking-wider">
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
