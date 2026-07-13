import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingCart, Menu, X, Phone, Mail, Facebook } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import logoAsset from "@/assets/vedakits-logo.png.asset.json";


type NavItem = { to: string; label: string };

const nav: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/astro-veda", label: "Astro Veda" },
  { to: "/wellness-veda", label: "Wellness Veda" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 shadow-soft">
      {/* Top contact strip */}
      <div className="bg-festive text-cream">
        <div className="container mx-auto px-4 h-9 flex items-center justify-end gap-6 text-xs">
          <a href="tel:+917977617782" className="hidden sm:flex items-center gap-1.5 hover:text-gold transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span>+91 7977617782</span>
          </a>
          <a href="mailto:hello@vedakits.com" className="hidden sm:flex items-center gap-1.5 hover:text-gold transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span>hello@vedakits.com</span>
          </a>
          <a href="#" aria-label="Facebook" className="w-6 h-6 rounded-full bg-white/15 hover:bg-gold hover:text-primary flex items-center justify-center transition-smooth">
            <Facebook className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="bg-background border-b border-border/60">
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoAsset.url} alt="VedaKits" className="w-11 h-11 object-contain" />
            <span className="font-display text-2xl font-semibold text-primary tracking-tight">
              Veda<span className="text-gold">Kits</span>
            </span>
          </Link>


          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n, i) => {
              const active = n.to === "/" ? path === "/" : path === n.to || path.startsWith(n.to + "/");
              return (
                <Link
                  key={`${n.to}-${i}`}
                  to={n.to}
                  className={`relative text-[15px] font-medium transition-colors ${
                    active
                      ? "text-primary after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:w-6 after:h-0.5 after:bg-primary"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-secondary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-secondary text-primary"
              onClick={() => setOpen((s) => !s)}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-3">
            {nav.map((n, i) => (
              <Link
                key={`${n.to}-m-${i}`}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground/80 hover:text-primary text-[15px] font-medium"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
