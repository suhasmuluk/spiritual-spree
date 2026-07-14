import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Leaf, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart, formatINR } from "@/lib/cart";
import { resolveImage, type Product } from "@/lib/types";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add, items, setQty, remove } = useCart();
  const [showQty, setShowQty] = useState(false);
  const img = resolveImage(product.image_url);
  const cartItem = items.find((i) => i.id === product.id);

  return (
    <article className="product-card group bg-card rounded-2xl overflow-hidden border border-border/60 shadow-soft flex flex-col">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="relative block aspect-square overflow-hidden bg-secondary">
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          onError={(event) => {
            event.currentTarget.src = "/placeholder.svg";
          }}
          className="w-full h-full object-cover"
        />
        {product.eco_friendly && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-700/90 text-white text-[10px] uppercase tracking-wider">
            <Leaf className="w-3 h-3" /> Eco
          </span>
        )}
        {product.featured ? (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gold text-gold-foreground text-[10px] uppercase tracking-wider font-semibold">
            Exclusive
          </span>
        ) : (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-semibold">
            Limited
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link to="/products/$slug" params={{ slug: product.slug }}>
          <h3 className="font-display text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="mt-3">
          {product.stock > 0 ? (
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${product.stock <= 5 ? "text-amber-600" : "text-emerald-700"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${product.stock <= 5 ? "bg-amber-500" : "bg-emerald-600"}`} />
              {product.stock <= 5 ? `Only ${product.stock} left` : `${product.stock} in stock`}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive" /> Out of stock
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-display text-2xl text-primary">{formatINR(product.price)}</span>
          {showQty ? (
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full border-2 border-gold bg-card">
              <button
                type="button"
                aria-label={cartItem && cartItem.quantity > 1 ? "Decrease quantity" : "Remove from cart"}
                onClick={() => {
                  if (cartItem && cartItem.quantity > 1) {
                    setQty(product.id, cartItem.quantity - 1);
                  } else {
                    if (cartItem) remove(product.id);
                    setShowQty(false);
                  }
                }}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary text-foreground"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <span className="min-w-[1.5rem] text-center text-sm font-semibold">{cartItem?.quantity ?? 1}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                disabled={!!cartItem && cartItem.quantity >= product.stock}
                onClick={() => {
                  if (!cartItem) {
                    add({
                      id: product.id,
                      name: product.name,
                      slug: product.slug,
                      price: product.price,
                      image: img,
                    });
                  } else {
                    setQty(product.id, cartItem.quantity + 1);
                  }
                }}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary text-foreground disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              disabled={product.stock <= 0}
              onClick={() => {
                if (!cartItem) {
                  add({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    image: img,
                  });
                  
                  toast.success(`${product.name} added to cart`);
                }
                setShowQty(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow text-sm font-medium transition-smooth shadow-soft disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4" /> Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
