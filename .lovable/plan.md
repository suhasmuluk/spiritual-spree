# VedaKits.com — Two-Section Rebrand

Rebrand the storefront from "Varad Vinayak Morya" to **VedaKits.com** and split it into two themed sub-brands. Admin panel, cart, checkout, auth, Razorpay, and all DB logic stay untouched.

## 1. Database (one migration)

Add 4 new categories and seed starter products. No schema changes — uses the existing `categories` and `products` tables.

- Categories: `vastu-kits`, `pooja-kits` (Astro Veda) · `bathing-salt`, `moringa-powder`, `lip-balm` (Wellness Veda)
- Each category gets a `section` tag stored via a new `section` column on `categories` (`astro-veda` | `wellness-veda`) so routing/styling can group them. Default `astro-veda` for safety.
- Seed 2–3 placeholder products per category (name, slug, price, description, stock, image_url placeholder). You can edit them in the admin later.

## 2. Routes

```text
/                    → new VedaKits landing (two big section cards)
/astro-veda          → Astro Veda landing (mystical theme)
/astro-veda/shop     → product grid filtered to astro categories
/wellness-veda       → Wellness Veda landing (organic theme)
/wellness-veda/shop  → product grid filtered to wellness categories
/products/$slug      → existing PDP, auto-themes based on product's category.section
```

The old `/products` route stays as a generic fallback but is no longer linked from nav.

## 3. Theming (scoped, no global leak)

Two new CSS variable scopes added to `src/styles.css`, applied via wrapper classes — global tokens and admin styles remain identical.

- `.theme-astro` — midnight blue `#0b1437`, gold `#c9a14a`, cream `#f6efe1`; serif headings (Cormorant Garamond) loaded alongside existing fonts.
- `.theme-wellness` — sage `#7c9473`, soft terracotta `#c97b5a`, off-white `#f7f4ee`; clean sans (Inter) for everything.

Each section route wraps its content in the matching class. The PDP looks up `category.section` and wraps accordingly. Header, footer, cart, checkout, and `/admin/*` are never wrapped and keep the current look.

## 4. Header / Nav

Replace category links in `src/components/Header.tsx` with: Home · Astro Veda · Wellness Veda · About · Contact. Logo text becomes "VedaKits". Top maroon strip phone/email updated to vedakits.com.

## 5. Metadata

Update `__root.tsx` site title to "VedaKits — Astro & Wellness Veda Kits", new description, drop the old OG image. Each new section route sets its own `head()` title/description/OG.

## Technical notes

- Theme scoping uses CSS custom properties under `.theme-astro {…}` / `.theme-wellness {…}` that override `--primary`, `--background`, `--card`, `--gold`, `--font-display`, etc., for descendants only. No Tailwind config changes.
- Fonts loaded via `<link>` in `__root.tsx` head (per Tailwind v4 rules — no `@import` URL in CSS).
- `ProductCard` and existing shop logic stay reusable; theming flows through CSS variables.
- New section landing pages use the same `fetchProducts({ category })` query, just filtered by the section's category slugs.

## Out of scope

- No admin UI changes.
- No payment, cart, auth, or DB-policy changes.
- Existing Ganesh assets are left in `src/assets/` untouched; new sections use placeholder/generated images you can replace later.
