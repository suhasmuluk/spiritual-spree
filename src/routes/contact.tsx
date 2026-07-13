import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VedaKits" },
      { name: "description", content: "Get in touch with VedaKits. Call +91 7977617782 or email hello@vedakits.com for orders and product guidance." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast.success("Message sent. We'll be in touch shortly.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <section className="bg-festive text-cream py-14 text-center">
        <div className="container mx-auto px-4">
          <p className="text-xs uppercase tracking-[0.4em] text-gold mb-2">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl">We are here to help</h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: contact info + form */}
          <div className="space-y-8">
            <div className="bg-secondary rounded-2xl p-6">
              <h2 className="font-display text-2xl text-primary mb-5">Get in Touch</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Address</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Shah & Nahar Industrial Estate, Building No: A1, Unit 250/219,
                      Second floor, Sitaram Jadhav Marg, Lower Parel,
                      Mumbai 400013, Maharashtra, India
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Mail Us</h3>
                    <a href="mailto:hello@vedakits.com" className="text-xs text-muted-foreground hover:text-primary break-all">
                      hello@vedakits.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Telephone</h3>
                    <a href="tel:+917977617782" className="text-xs text-muted-foreground hover:text-primary">
                      +91 7977617782
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Website</h3>
                    <p className="text-xs text-muted-foreground">vedakits.com</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="bg-card rounded-2xl border border-border p-6 shadow-soft space-y-4">
              <h2 className="font-display text-xl text-primary">Send Your Message</h2>
              <p className="text-sm text-muted-foreground">
                We'd love to hear from you! Whether you have a question, need details, or want to place an order — drop us a message.
              </p>
              <input required name="name" placeholder="Full Name" className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none" />
              <input required type="tel" name="contact" placeholder="Contact Number" className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none" />
              <input required name="location" placeholder="Location" className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none" />
              <input required type="email" name="email" placeholder="Email ID" className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none" />
              <textarea required name="description" placeholder="Description" rows={5} className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:border-primary focus:outline-none" />
              <button disabled={submitting} className="w-full px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow font-semibold transition-smooth disabled:opacity-60">
                {submitting ? "Sending…" : "Submit"}
              </button>
            </form>
          </div>

          {/* Right: map */}
          <div className="rounded-2xl overflow-hidden border border-border shadow-soft min-h-[400px]">
            <iframe
              title="Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2667.62399828304!2d72.82437620599055!3d18.993704523957838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce8b4c84a8eb%3A0xb69843a27dd2b3b7!2sA2%2C%20Shah%20And%20Nahar%20Industrial%20Estate!5e0!3m2!1sen!2sin!4v1745961751730!5m2!1sen!2sin"
              className="w-full h-full min-h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
