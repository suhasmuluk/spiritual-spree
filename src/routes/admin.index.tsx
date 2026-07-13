import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Package, ShoppingBag, IndianRupee, Tags } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [p, o, c, rev] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("categories").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("total").eq("status", "delivered"),
      ]);
      const revenue = (rev.data ?? []).reduce((s, r: any) => s + Number(r.total || 0), 0);
      return { products: p.count ?? 0, orders: o.count ?? 0, categories: c.count ?? 0, revenue };
    },
  });

  const stats = [
    { label: "Products", value: data?.products ?? "—", icon: Package },
    { label: "Orders", value: data?.orders ?? "—", icon: ShoppingBag },
    { label: "Categories", value: data?.categories ?? "—", icon: Tags },
    { label: "Revenue (delivered)", value: data ? `₹${data.revenue.toLocaleString("en-IN")}` : "—", icon: IndianRupee },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl text-primary mb-1">Overview</h2>
      <p className="text-sm text-muted-foreground mb-6">Quick snapshot of your store.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-border rounded-xl p-5 bg-secondary/30">
            <s.icon className="w-6 h-6 text-primary" />
            <div className="mt-3 text-2xl font-display text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
