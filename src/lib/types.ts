export type Section = "astro-veda" | "wellness-veda";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock: number;
  category_id: string | null;
  category_slug?: string | null;
  category_section?: Section | null;
  featured: boolean;
  eco_friendly: boolean;
  highlights: string[];
  images: string[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  section?: Section;
};

// Product images are stored as CDN URLs (or external http URLs).
// This helper exists for backward compatibility — it simply passes the URL through.
export function resolveImage(url: string | null | undefined): string {
  if (!url) return "/placeholder.svg";
  return url;
}
