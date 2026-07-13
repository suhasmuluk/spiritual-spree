import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { FloatingPetals } from "@/components/FloatingPetals";

export const Route = createFileRoute("/order-success")({
  validateSearch: (s) => z.object({ orderId: z.string().optional() }).parse(s),
  head: () => ({ meta: [{ title: "Order Confirmed — VedaKits" }] }),
  component: Success,
});

function Success() {
  const { orderId } = Route.useSearch();
  return (
    <section className="relative container mx-auto px-4 py-20">
      <FloatingPetals count={20} />
      <div className="relative max-w-lg mx-auto text-center bg-card border border-border rounded-3xl p-10 shadow-elegant">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-700/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-700" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-primary mb-3">गणपती बाप्पा मोरया!</h1>
        <p className="text-muted-foreground mb-2">Your order has been received with devotion.</p>
        {orderId && <p className="text-sm">Order ID: <span className="font-mono text-foreground">{orderId}</span></p>}
        <p className="text-sm text-muted-foreground mt-4">
          We'll send a confirmation email shortly with shipping details.
        </p>
        <Link to="/products" className="inline-flex mt-8 items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow font-semibold transition-smooth">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
