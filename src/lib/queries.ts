import { supabase } from "@/integrations/supabase/client";
import type { Product, Category, Section } from "./types";

export async function fetchProducts(filters?: {
  category?: string;
  categories?: string[];
  section?: Section;
  search?: string;
  featured?: boolean;
}) {
  let q = supabase
    .from("products")
    .select("*, categories(slug,name,section)")
    .order("created_at", { ascending: false });
  if (filters?.featured) q = q.eq("featured", true);
  if (filters?.search) q = q.ilike("name", `%${filters.search}%`);
  const { data, error } = await q;
  if (error) throw error;
  let rows = (data ?? []) as any[];
  if (filters?.category) {
    rows = rows.filter((r) => r.categories?.slug === filters.category);
  }
  if (filters?.categories?.length) {
    const set = new Set(filters.categories);
    rows = rows.filter((r) => r.categories?.slug && set.has(r.categories.slug));
  }
  if (filters?.section) {
    rows = rows.filter((r) => r.categories?.section === filters.section);
  }
  return rows.map(normalize);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(slug,name,section)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? normalize(data) : null;
}

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error) throw error;
  return (data ?? []) as Category[];
}

function normalize(r: any): Product {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    description: r.description,
    price: Number(r.price),
    image_url: r.image_url,
    stock: r.stock ?? 0,
    category_id: r.category_id,
    category_slug: r.categories?.slug ?? null,
    category_section: (r.categories?.section ?? null) as any,
    featured: !!r.featured,
    eco_friendly: !!r.eco_friendly,
    highlights: Array.isArray(r.highlights) ? r.highlights : [],
    images: Array.isArray(r.images) ? r.images.filter((x: any) => typeof x === "string") : [],
  };
}
