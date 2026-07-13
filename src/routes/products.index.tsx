import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, fetchCategories } from "@/lib/queries";
import { useState } from "react";
import { z } from "zod";

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/products/")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Shop — VedaKits" },
      { name: "description", content: "Browse the full VedaKits collection — authentic Astro Vastu & Pooja kits and natural Wellness essentials." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [search, setSearch] = useState("");

  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", { category, search }],
    queryFn: () => fetchProducts({ category, search }),
  });

  return (
    <>
      <section className="bg-festive text-cream py-14">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold mb-3">VedaKits · Full Collection</p>
          <h1 className="font-display text-4xl md:text-5xl">
            {category ? categories.find((c) => c.slug === category)?.name ?? "Shop" : "Shop the Collection"}
          </h1>
          <p className="text-cream/80 max-w-2xl mx-auto mt-4 text-sm md:text-base">
            Authentic Astro kits and natural Wellness essentials, curated under one mindful brand.
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
              placeholder="Search products…"
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
            {categories.map((c) => (
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
