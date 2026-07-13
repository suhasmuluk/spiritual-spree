import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DJ82In3R.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { k as Plus, l as Trash2 } from "../_libs/lucide-react.mjs";
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
function AdminCategories() {
  const qc = useQueryClient();
  const [name, setName] = reactExports.useState("");
  const [slug, setSlug] = reactExports.useState("");
  const {
    data = []
  } = useQuery({
    queryKey: ["admin-cats"],
    queryFn: async () => {
      const {
        data: data2
      } = await supabase.from("categories").select("*").order("name");
      return data2 ?? [];
    }
  });
  const add = async () => {
    if (!name || !slug) {
      toast.error("Name and slug required");
      return;
    }
    const {
      error
    } = await supabase.from("categories").insert({
      name,
      slug
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setName("");
    setSlug("");
    qc.invalidateQueries({
      queryKey: ["admin-cats"]
    });
  };
  const del = async (id) => {
    if (!confirm("Delete this category?")) return;
    const {
      error
    } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    qc.invalidateQueries({
      queryKey: ["admin-cats"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-primary mb-6", children: "Categories" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "flex-1 px-3 py-2 border border-border rounded-lg", placeholder: "Name (e.g. Pooja Kit)", value: name, onChange: (e) => setName(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "flex-1 px-3 py-2 border border-border rounded-lg", placeholder: "Slug (e.g. pooja-kit)", value: slug, onChange: (e) => setSlug(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: add, className: "inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " Add"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "border border-border rounded-xl divide-y divide-border", children: [
      data.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "/",
            c.slug
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del(c.id), className: "p-2 hover:bg-secondary rounded text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
      ] }, c.id)),
      data.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-4 py-8 text-center text-muted-foreground", children: "No categories yet." })
    ] })
  ] });
}
export {
  AdminCategories as component
};
