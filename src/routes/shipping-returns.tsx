import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — VedaKits" },
      { name: "description", content: "VedaKits shipping timelines, charges, and return/refund policy." },
      { property: "og:title", content: "Shipping & Returns — VedaKits" },
      { property: "og:description", content: "VedaKits shipping timelines, charges, and return/refund policy." },
    ],
  }),
  component: ShippingReturnsPage,
});

function ShippingReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-neutral">
      <h1 className="font-display text-4xl md:text-5xl text-primary mb-6">Shipping & Returns</h1>

      <section className="space-y-3 mb-10">
        <h2 className="font-display text-2xl text-primary">Shipping Policy</h2>
        <p className="text-muted-foreground leading-relaxed">
          We ship across India through trusted courier partners. Orders are processed and dispatched
          within <strong>2-3 business days</strong> of confirmation.
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2">
          <li>Standard delivery: 4-7 business days, depending on location.</li>
          <li>Tracking link is shared on email/SMS once your order is dispatched.</li>
          <li>Shipping fee is calculated at checkout based on your pincode.</li>
        </ul>
      </section>

      <section className="space-y-3 mb-10">
        <h2 className="font-display text-2xl text-primary">Return & Refund Policy</h2>
        <p className="text-muted-foreground leading-relaxed">
          Every VedaKits order is packed with care. If you receive a damaged or incorrect item,
          we are happy to help.
        </p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-2">
          <li>
            <strong>Damaged / wrong item:</strong> Notify us within <strong>48 hours</strong> of delivery
            with an unboxing photo/video to hello@vedakits.com.
          </li>
          <li>
            <strong>Replacement or refund</strong> will be processed within 5-7 business days after the
            return is received and inspected.
          </li>
          <li>
            Consumables and wellness products (once opened) are <strong>non-returnable</strong> for hygiene
            and quality reasons.
          </li>
          <li>
            Refunds are credited back to the original payment method via Razorpay.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl text-primary">Cancellations</h2>
        <p className="text-muted-foreground leading-relaxed">
          Orders can be cancelled within <strong>12 hours</strong> of placement, provided they have not
          been dispatched. Please call <a href="tel:+917977617782" className="text-primary underline">+91 7977617782</a>
          {" "}or email <a href="mailto:hello@vedakits.com" className="text-primary underline">hello@vedakits.com</a> to cancel.
        </p>
      </section>
    </div>
  );
}
