import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronLeft, ChevronRight, Leaf, Minus, Plus, ShoppingCart, Truck } from "lucide-react";
import { useState } from "react";
import { fetchProductBySlug, fetchProducts } from "@/lib/queries";
import { resolveImage } from "@/lib/types";
import { useCart, formatINR } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [activeIdx, setActiveIdx] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
  });
  const { data: related = [] } = useQuery({
    queryKey: ["products", "related"],
    queryFn: () => fetchProducts({ featured: true }),
  });

  if (isLoading) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading…</div>;
  if (!product) return <div className="container mx-auto px-4 py-20 text-center">Product not found.</div>;

  const gallery = [product.image_url, ...(product.images || [])]
    .filter((u): u is string => !!u)
    .slice(0, 5)
    .map(resolveImage);
  const images = gallery.length > 0 ? gallery : [resolveImage(product.image_url)];
  const activeImg = images[Math.min(activeIdx, images.length - 1)];

  const handleAdd = () => {
    add({ id: product.id, name: product.name, slug: product.slug, price: product.price, image: images[0] }, qty);
    toast.success(`${product.name} added to cart`);
  };
  const handleBuy = () => {
    handleAdd();
    navigate({ to: "/checkout" });
  };

  const themeClass =
    product.category_section === "astro-veda"
      ? "theme-astro"
      : product.category_section === "wellness-veda"
      ? "theme-wellness"
      : "";

  return (
    <div className={themeClass ? `${themeClass} bg-background text-foreground` : ""}>
      <section className="container mx-auto px-4 py-10">

        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-primary">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="relative rounded-3xl overflow-hidden bg-secondary aspect-square shadow-elegant">
              <img src={activeImg} alt={product.name} className="w-full h-full object-cover transition-opacity" width={800} height={800} />
              {product.eco_friendly && (
                <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-700 text-white text-xs">
                  <Leaf className="w-3.5 h-3.5" /> Eco-friendly
                </span>
              )}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() => setActiveIdx((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur hover:bg-background flex items-center justify-center shadow-soft"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => setActiveIdx((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur hover:bg-background flex items-center justify-center shadow-soft"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-secondary border-2 transition-colors ${i === activeIdx ? "border-primary" : "border-transparent hover:border-border"}`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Exclusive · Eco-Friendly · Handcrafted</p>
            <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">{product.name}</h1>
            <div className="text-3xl font-display text-foreground mb-5">{formatINR(product.price)}</div>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {product.highlights.length > 0 && (
              <ul className="space-y-2 mb-8">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center bg-secondary rounded-full">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:text-primary"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))} disabled={qty >= product.stock} className="w-10 h-10 flex items-center justify-center hover:text-primary disabled:opacity-40"><Plus className="w-4 h-4" /></button>
              </div>
              {product.stock > 0 ? (
                <span className={`text-sm font-medium ${product.stock <= 5 ? "text-amber-600" : "text-emerald-700"}`}>
                  {product.stock <= 5 ? `Only ${product.stock} left in stock` : `${product.stock} in stock`}
                </span>
              ) : (
                <span className="text-sm font-medium text-destructive">Out of stock</span>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAdd}
                disabled={product.stock <= 0}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-secondary text-foreground border border-border hover:bg-muted font-medium transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={handleBuy}
                disabled={product.stock <= 0}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow font-semibold transition-smooth shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? "Buy Now" : "Sold Out"}
              </button>
            </div>

            <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
              <Truck className="w-4 h-4 text-gold" /> Free shipping on orders above ₹999
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="divider-om text-sm uppercase tracking-[0.4em] mb-8">॥ You may also love ॥</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.filter((r) => r.id !== product.id).slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}

