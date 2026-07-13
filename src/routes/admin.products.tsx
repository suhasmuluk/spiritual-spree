import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X, Upload, Loader2 } from "lucide-react";
import { resolveImage } from "@/lib/types";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

type Row = { id: string; name: string; slug: string; price: number; stock: number; image_url: string | null; featured: boolean; eco_friendly: boolean; description: string | null; category_id: string | null; images: string[] | null; };

function AdminProducts() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Row> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingExtra, setUploadingExtra] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const extraFileRef = useRef<HTMLInputElement>(null);
  const MAX_EXTRA_IMAGES = 4;

  const uploadImage = async (file: File) => {
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file, { cacheControl: "3600", upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setEditing((e) => e ? { ...e, image_url: data.publicUrl } : e);
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const uploadExtraImages = async (files: FileList) => {
    const current = editing?.images ?? [];
    const room = MAX_EXTRA_IMAGES - current.length;
    if (room <= 0) { toast.error(`Up to ${MAX_EXTRA_IMAGES} extra images`); return; }
    const list = Array.from(files).slice(0, room);
    setUploadingExtra(true);
    try {
      const uploaded: string[] = [];
      for (const file of list) {
        if (!file.type.startsWith("image/")) { toast.error(`${file.name}: not an image`); continue; }
        if (file.size > 5 * 1024 * 1024) { toast.error(`${file.name}: over 5MB`); continue; }
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("product-images").upload(path, file, { cacheControl: "3600", upsert: false });
        if (error) { toast.error(error.message); continue; }
        const { data } = supabase.storage.from("product-images").getPublicUrl(path);
        uploaded.push(data.publicUrl);
      }
      if (uploaded.length) {
        setEditing((e) => e ? { ...e, images: [...((e.images as string[]) ?? []), ...uploaded] } : e);
        toast.success(`${uploaded.length} image(s) added`);
      }
    } finally {
      setUploadingExtra(false);
      if (extraFileRef.current) extraFileRef.current.value = "";
    }
  };

  const removeExtraImage = (idx: number) => {
    setEditing((e) => e ? { ...e, images: ((e.images as string[]) ?? []).filter((_, i) => i !== idx) } : e);
  };

  const { data: products = [] } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Row[];
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*").order("name");
      return data ?? [];
    },
  });

  const save = async () => {
    if (!editing?.name || !editing?.slug || editing.price == null) { toast.error("Name, slug, price required"); return; }
    const payload = {
      name: editing.name, slug: editing.slug, price: Number(editing.price),
      stock: Number(editing.stock ?? 0), image_url: editing.image_url || null,
      featured: !!editing.featured, eco_friendly: editing.eco_friendly !== false,
      description: editing.description || null, category_id: editing.category_id || null,
      images: ((editing.images as string[]) ?? []).slice(0, MAX_EXTRA_IMAGES),
    };
    const { error } = editing.id
      ? await supabase.from("products").update(payload).eq("id", editing.id)
      : await supabase.from("products").insert(payload);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved");
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["admin-products"] });
    qc.invalidateQueries({ queryKey: ["products"] });
    qc.invalidateQueries({ queryKey: ["product"] });
  };

  const del = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin-products"] });
    qc.invalidateQueries({ queryKey: ["products"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl text-primary">Products</h2>
          <p className="text-sm text-muted-foreground">{products.length} total</p>
        </div>
        <button onClick={() => setEditing({ eco_friendly: true, stock: 0, featured: false })} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-glow">
          <Plus className="w-4 h-4" /> New product
        </button>
      </div>

      <div className="overflow-x-auto border border-border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left">
            <tr>
              <th className="px-4 py-3">Name</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Featured</th><th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={resolveImage(p.image_url)} alt={p.name} className="w-12 h-12 rounded object-cover bg-secondary" />
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">/{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">₹{Number(p.price).toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <span className={p.stock <= 0 ? "text-destructive" : p.stock <= 5 ? "text-amber-600" : ""}>{p.stock}</span>
                </td>
                <td className="px-4 py-3">{p.featured ? "Yes" : "—"}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing(p)} className="p-2 hover:bg-secondary rounded"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => del(p.id)} className="p-2 hover:bg-secondary rounded text-destructive"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No products yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-background rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl text-primary">{editing.id ? "Edit product" : "New product"}</h3>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input className="w-full px-3 py-2 border border-border rounded-lg" placeholder="Name" value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              <input className="w-full px-3 py-2 border border-border rounded-lg" placeholder="Slug (e.g. vastu-shanti-kit)" value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              <textarea className="w-full px-3 py-2 border border-border rounded-lg" placeholder="Description" rows={3} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" min={0} className="w-full px-3 py-2 border border-border rounded-lg" placeholder="Price (₹)" value={editing.price ?? ""} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
                <input type="number" min={0} className="w-full px-3 py-2 border border-border rounded-lg" placeholder="Stock" value={editing.stock ?? 0} onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Product image</label>
                <div className="flex items-start gap-3">
                  {editing.image_url ? (
                    <div className="relative">
                      <img src={resolveImage(editing.image_url)} alt="" className="w-24 h-24 rounded-lg object-cover bg-secondary border border-border" />
                      <button type="button" onClick={() => setEditing({ ...editing, image_url: "" })} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"><X className="w-3 h-3" /></button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-xs">No image</div>
                  )}
                  <div className="flex-1 space-y-2">
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
                    <button type="button" disabled={uploading} onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-muted text-sm font-medium disabled:opacity-50">
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {uploading ? "Uploading…" : "Upload image"}
                    </button>
                    <input className="w-full px-3 py-2 border border-border rounded-lg text-xs" placeholder="…or paste image URL" value={editing.image_url ?? ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground">Additional images (up to {MAX_EXTRA_IMAGES})</label>
                  <span className="text-xs text-muted-foreground">{(editing.images ?? []).length}/{MAX_EXTRA_IMAGES}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {((editing.images as string[]) ?? []).map((url, i) => (
                    <div key={i} className="relative aspect-square">
                      <img src={resolveImage(url)} alt="" className="w-full h-full rounded-lg object-cover bg-secondary border border-border" />
                      <button type="button" onClick={() => removeExtraImage(i)} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"><X className="w-3 h-3" /></button>
                    </div>
                  ))}
                  {((editing.images as string[]) ?? []).length < MAX_EXTRA_IMAGES && (
                    <button
                      type="button"
                      disabled={uploadingExtra}
                      onClick={() => extraFileRef.current?.click()}
                      className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary text-xs disabled:opacity-50"
                    >
                      {uploadingExtra ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                      <span className="mt-1">{uploadingExtra ? "…" : "Add"}</span>
                    </button>
                  )}
                </div>
                <input ref={extraFileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && e.target.files.length > 0 && uploadExtraImages(e.target.files)} />
              </div>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-background" value={editing.category_id ?? ""} onChange={(e) => setEditing({ ...editing, category_id: e.target.value || null })}>
                <option value="">— No category —</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div className="flex gap-4 text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" checked={!!editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} /> Featured</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={editing.eco_friendly !== false} onChange={(e) => setEditing({ ...editing, eco_friendly: e.target.checked })} /> Eco-friendly</label>
              </div>
              <button onClick={save} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-glow">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
