import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { claimFirstAdmin } from "@/lib/admin.functions";
import { toast } from "sonner";
import { LayoutDashboard, Package, ShoppingBag, Tags, LogOut, ShieldCheck, Receipt, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — VedaKits" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isAdmin, loading, signOut, refreshRole } = useAuth();
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [loading, user, nav]);



  const claimAdmin = async () => {
    try {
      const res = await claimFirstAdmin();
      if (res.claimed) { toast.success("You are now admin."); await refreshRole(); }
      else toast.error("An admin already exists. Ask them to grant you access.");
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to claim admin");
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md text-center bg-background border border-border rounded-2xl p-8 shadow-soft">
          <ShieldCheck className="w-12 h-12 mx-auto text-primary" />
          <h1 className="font-display text-2xl text-primary mt-4">Admin access required</h1>
          <p className="text-sm text-muted-foreground mt-2">You're signed in as <strong>{user.email}</strong>, but you don't have admin rights.</p>
          <button onClick={claimAdmin} className="mt-6 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary-glow transition-smooth">
            Claim admin (first user only)
          </button>
          <button onClick={async () => { await signOut(); nav({ to: "/auth" }); }} className="mt-3 block mx-auto text-sm text-muted-foreground hover:text-primary">Sign out</button>
        </div>
      </div>
    );
  }


  const links: Array<{ to: "/admin" | "/admin/products" | "/admin/orders" | "/admin/categories" | "/admin/payment-logs" | "/admin/analytics"; label: string; icon: typeof LayoutDashboard; exact?: boolean }> = [
    { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
    { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/admin/products", label: "Products", icon: Package },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { to: "/admin/payment-logs", label: "Payment Logs", icon: Receipt },
    { to: "/admin/categories", label: "Categories", icon: Tags },
  ];

  const handleSignOut = async () => {
    await signOut();
    nav({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl text-primary">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <button onClick={handleSignOut} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-background text-sm">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>

        <div className="grid md:grid-cols-[220px_1fr] gap-6">
          <aside className="bg-background border border-border rounded-xl p-3 h-fit">
            <nav className="flex md:flex-col gap-1 overflow-x-auto">
              {links.map((l) => {
                const active = l.exact ? path === l.to : path.startsWith(l.to);
                return (
                  <Link key={l.to} to={l.to} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-secondary"}`}>
                    <l.icon className="w-4 h-4" /> {l.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          <section className="bg-background border border-border rounded-xl p-6 min-h-[400px]">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
}
