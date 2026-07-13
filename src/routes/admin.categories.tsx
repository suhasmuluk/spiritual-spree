import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const { data = [] } = useQuery({
    queryKey: ["admin-cats"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*").order("name");
      return data ?? [];
    },
  });

  const add = async () => {
    if (!name || !slug) { toast.error("Name and slug required"); return; }
    const { error } = await supabase.from("categories").insert({ name, slug });
    if (error) { toast.error(error.message); return; }
    setName(""); setSlug("");
    qc.invalidateQueries({ queryKey: ["admin-cats"] });
  };

  const del = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ["admin-cats"] });
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-primary mb-6">Categories</h2>
      <div className="flex gap-2 mb-6">
        <input className="flex-1 px-3 py-2 border border-border rounded-lg" placeholder="Name (e.g. Pooja Kit)" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="flex-1 px-3 py-2 border border-border rounded-lg" placeholder="Slug (e.g. pooja-kit)" value={slug} onChange={(e) => setSlug(e.target.value)} />
        <button onClick={add} className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground"><Plus className="w-4 h-4" /> Add</button>
      </div>
      <ul className="border border-border rounded-xl divide-y divide-border">
        {data.map((c: any) => (
          <li key={c.id} className="flex items-center justify-between px-4 py-3">
            <div><div className="font-medium">{c.name}</div><div className="text-xs text-muted-foreground">/{c.slug}</div></div>
            <button onClick={() => del(c.id)} className="p-2 hover:bg-secondary rounded text-destructive"><Trash2 className="w-4 h-4" /></button>
          </li>
        ))}
        {data.length === 0 && <li className="px-4 py-8 text-center text-muted-foreground">No categories yet.</li>}
      </ul>
    </div>
  );
}
