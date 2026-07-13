import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart, formatINR } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — VedaKits" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, count } = useCart();
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="font-display text-4xl md:text-5xl text-primary mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-secondary/50 rounded-3xl">
          <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-6">Your cart is empty.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow font-medium transition-smooth">
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-card rounded-2xl border border-border shadow-soft">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1 flex flex-col">
                  <Link to="/products/$slug" params={{ slug: item.slug }} className="font-display text-lg hover:text-primary line-clamp-1">
                    {item.name}
                  </Link>
                  <span className="text-primary font-medium mt-1">{formatINR(item.price)}</span>
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <div className="inline-flex items-center bg-secondary rounded-full">
                      <button onClick={() => setQty(item.id, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => setQty(item.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                    <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-destructive p-2" aria-label="Remove">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="font-display text-lg text-foreground">{formatINR(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>

          <aside className="bg-card rounded-2xl border border-border p-6 shadow-soft h-fit sticky top-28">
            <h2 className="font-display text-xl mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Items</span><span>{count}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">GST (5%)</span><span>{formatINR(gst)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-xs text-muted-foreground">Calculated at checkout</span></div>
            </div>
            <div className="border-t border-border my-4" />
            <div className="flex justify-between font-display text-xl">
              <span>Total</span>
              <span className="text-primary">{formatINR(total)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow font-semibold transition-smooth shadow-soft"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
