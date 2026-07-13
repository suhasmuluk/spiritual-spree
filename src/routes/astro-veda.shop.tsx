import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, fetchCategories } from "@/lib/queries";

const searchSchema = z.object({ category: z.string().optional() });

export const Route = createFileRoute("/astro-veda/shop")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Shop Astro Veda — Vastu & Pooja Kits | VedaKits" },
      { name: "description", content: "Browse our complete Astro Veda collection — Vastu kits, Pooja kits and sacred Vedic samagri." },
      { property: "og:title", content: "Shop Astro Veda — Vastu & Pooja Kits" },
      { property: "og:url", content: "/astro-veda/shop" },
    ],
    links: [{ rel: "canonical", href: "/astro-veda/shop" }],
  }),
  component: AstroVedaShop,
});

function AstroVedaShop() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [search, setSearch] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const astroCats = categories.filter((c) => c.section === "astro-veda");
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", { section: "astro-veda", category, search }],
    queryFn: () =>
      fetchProducts({
        section: "astro-veda",
        category,
        search: search || undefined,
      }),
  });

  return (
    <>
      <section className="bg-festive text-cream py-14">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold mb-3">Astro Veda · Sacred Collection</p>
          <h1 className="font-display text-4xl md:text-5xl">
            {category ? astroCats.find((c) => c.slug === category)?.name ?? "Shop" : "Vastu & Pooja Kits"}
          </h1>
          <p className="text-cream/80 max-w-2xl mx-auto mt-4 text-sm md:text-base">
            Authentic Vedic kits, energised and ready to bring prosperity, peace and divine grace.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Astro Veda…"
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-card border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate({ search: {} })}
              className={`px-4 py-2 rounded-full text-sm transition-smooth ${
                !category ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              All
            </button>
            {astroCats.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate({ search: { category: c.slug } })}
                className={`px-4 py-2 rounded-full text-sm transition-smooth ${
                  category === c.slug ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-secondary animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No products found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  );
}
