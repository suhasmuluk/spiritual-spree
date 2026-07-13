import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — VedaKits" },
      { name: "description", content: "Frequently asked questions about VedaKits Astro and Wellness products, shipping, and returns." },
      { property: "og:title", content: "FAQ — VedaKits" },
      { property: "og:description", content: "Answers to common questions about ordering from VedaKits." },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  {
    q: "What does VedaKits offer?",
    a: "Two curated sections: Astro Veda — authentic Vastu and Pooja kits, and Wellness Veda — natural products like bathing salts, moringa powder, and lip balms.",
  },
  {
    q: "Are your products authentic and natural?",
    a: "Yes. Astro kits use traditionally sourced samagri. Wellness products are plant-based with clean, mindfully chosen ingredients.",
  },
  {
    q: "Do you ship across India?",
    a: "Yes, we ship pan-India. Orders are typically dispatched within 2-3 business days.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery is 4-7 business days depending on your location. A tracking link is sent once your order is dispatched.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, Credit/Debit Cards, and Netbanking through our secure Razorpay gateway.",
  },
  {
    q: "Can I cancel or modify my order?",
    a: "Orders can be cancelled or modified within 12 hours of placement, provided they have not been dispatched. Please contact us to make changes.",
  },
  {
    q: "How can I contact customer support?",
    a: "Email hello@vedakits.com or call +91 7977617782. You can also reach us via the WhatsApp button on the site.",
  },
];

function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="font-display text-4xl md:text-5xl text-primary mb-3">Frequently Asked Questions</h1>
      <p className="text-muted-foreground mb-10">Everything you need to know about ordering from VedaKits.</p>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
