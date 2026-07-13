import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-festive text-cream mt-24">
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gold-grad flex items-center justify-center">
              <span className="text-primary font-display text-xl">ॐ</span>
            </div>
            <div className="font-display text-xl">VedaKits</div>
          </div>
          <p className="text-cream/80 text-sm leading-relaxed">
            Authentic Vedic essentials for the home — sacred Astro kits and natural Wellness
            products, made with care in India.
          </p>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-widest text-xs mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/astro-veda" className="hover:text-gold">Astro Veda</Link></li>
            <li><Link to="/astro-veda/shop" className="hover:text-gold">Vastu & Pooja Kits</Link></li>
            <li><Link to="/wellness-veda" className="hover:text-gold">Wellness Veda</Link></li>
            <li><Link to="/wellness-veda/shop" className="hover:text-gold">Wellness Products</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-widest text-xs mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/shipping-returns" className="hover:text-gold">Shipping & Returns</Link></li>
            <li><Link to="/faq" className="hover:text-gold">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-widest text-xs mb-4">Connect</h4>
          <div className="space-y-2 text-sm">
            <a href="mailto:hello@vedakits.com" className="flex items-center gap-2 hover:text-gold">
              <Mail className="w-4 h-4" />
              <span>hello@vedakits.com</span>
            </a>
            <a href="tel:+917977617782" className="flex items-center gap-2 hover:text-gold">
              <Phone className="w-4 h-4" />
              <span>+91 7977617782</span>
            </a>
          </div>
          <div className="flex gap-3 mt-4">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-smooth">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-smooth">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container mx-auto px-4 text-center text-xs text-cream/60">
          © {new Date().getFullYear()} VedaKits. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
