import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DJ82In3R.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { r as resolveImage } from "./types-CpJ-x2HY.mjs";
import { k as Plus, v as Pencil, l as Trash2, X, f as LoaderCircle, U as Upload } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
function AdminProducts() {
  const qc = useQueryClient();
  const [editing, setEditing] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const uploadImage = async (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const {
        error
      } = await supabase.storage.from("product-images").upload(path, file, {
        cacheControl: "3600",
        upsert: false
      });
      if (error) throw error;
      const {
        data
      } = supabase.storage.from("product-images").getPublicUrl(path);
      setEditing((e) => e ? {
        ...e,
        image_url: data.publicUrl
      } : e);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };
  const {
    data: products = []
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("products").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  const {
    data: categories = []
  } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("categories").select("*").order("name");
      return data ?? [];
    }
  });
  const save = async () => {
    if (!editing?.name || !editing?.slug || editing.price == null) {
      toast.error("Name, slug, price required");
      return;
    }
    const payload = {
      name: editing.name,
      slug: editing.slug,
      price: Number(editing.price),
      stock: Number(editing.stock ?? 0),
      image_url: editing.image_url || null,
      featured: !!editing.featured,
      eco_friendly: editing.eco_friendly !== false,
      description: editing.description || null,
      category_id: editing.category_id || null
    };
    const {
      error
    } = editing.id ? await supabase.from("products").update(payload).eq("id", editing.id) : await supabase.from("products").insert(payload);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved");
    setEditing(null);
    qc.invalidateQueries({
      queryKey: ["admin-products"]
    });
    qc.invalidateQueries({
      queryKey: ["products"]
    });
    qc.invalidateQueries({
      queryKey: ["product"]
    });
  };
  const del = async (id) => {
    if (!confirm("Delete this product?")) return;
    const {
      error
    } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Deleted");
    qc.invalidateQueries({
      queryKey: ["admin-products"]
    });
    qc.invalidateQueries({
      queryKey: ["products"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-primary", children: "Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          products.length,
          " total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
        eco_friendly: true,
        stock: 0,
        featured: false
      }), className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-glow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " New product"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto border border-border rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/50 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Featured" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveImage(p.image_url), alt: p.name, className: "w-12 h-12 rounded object-cover bg-secondary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                "/",
                p.slug
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            "₹",
            Number(p.price).toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: p.stock <= 0 ? "text-destructive" : p.stock <= 5 ? "text-amber-600" : "", children: p.stock }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: p.featured ? "Yes" : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(p), className: "p-2 hover:bg-secondary rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del(p.id), className: "p-2 hover:bg-secondary rounded text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
          ] })
        ] }, p.id)),
        products.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-8 text-center text-muted-foreground", children: "No products yet." }) })
      ] })
    ] }) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4", onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl text-primary", children: editing.id ? "Edit product" : "New product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full px-3 py-2 border border-border rounded-lg", placeholder: "Name", value: editing.name ?? "", onChange: (e) => setEditing({
          ...editing,
          name: e.target.value
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full px-3 py-2 border border-border rounded-lg", placeholder: "Slug (e.g. eco-ganesh)", value: editing.slug ?? "", onChange: (e) => setEditing({
          ...editing,
          slug: e.target.value
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "w-full px-3 py-2 border border-border rounded-lg", placeholder: "Description", rows: 3, value: editing.description ?? "", onChange: (e) => setEditing({
          ...editing,
          description: e.target.value
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, className: "w-full px-3 py-2 border border-border rounded-lg", placeholder: "Price (₹)", value: editing.price ?? "", onChange: (e) => setEditing({
            ...editing,
            price: Number(e.target.value)
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, className: "w-full px-3 py-2 border border-border rounded-lg", placeholder: "Stock", value: editing.stock ?? 0, onChange: (e) => setEditing({
            ...editing,
            stock: Number(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "Product image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            editing.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveImage(editing.image_url), alt: "", className: "w-24 h-24 rounded-lg object-cover bg-secondary border border-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setEditing({
                ...editing,
                image_url: ""
              }), className: "absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-xs", children: "No image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && uploadImage(e.target.files[0]) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: uploading, onClick: () => fileRef.current?.click(), className: "inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-muted text-sm font-medium disabled:opacity-50", children: [
                uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                uploading ? "Uploading…" : "Upload image"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full px-3 py-2 border border-border rounded-lg text-xs", placeholder: "…or paste image URL", value: editing.image_url ?? "", onChange: (e) => setEditing({
                ...editing,
                image_url: e.target.value
              }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full px-3 py-2 border border-border rounded-lg bg-background", value: editing.category_id ?? "", onChange: (e) => setEditing({
          ...editing,
          category_id: e.target.value || null
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— No category —" }),
          categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.name }, c.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!editing.featured, onChange: (e) => setEditing({
              ...editing,
              featured: e.target.checked
            }) }),
            " Featured"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editing.eco_friendly !== false, onChange: (e) => setEditing({
              ...editing,
              eco_friendly: e.target.checked
            }) }),
            " Eco-friendly"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, className: "w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-glow", children: "Save" })
      ] })
    ] }) })
  ] });
}
export {
  AdminProducts as component
};
