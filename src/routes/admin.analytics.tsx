import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  IndianRupee, ShoppingBag, CheckCircle2, XCircle, TrendingUp, Users, Repeat, Percent,
  Sparkles, MapPin, Package, Trophy, AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, Legend,
} from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsPage,
});

type RangeKey = "today" | "7d" | "30d" | "month" | "custom";

function getRange(key: RangeKey, customFrom?: string, customTo?: string): { from: Date; to: Date } {
  const now = new Date();
  const to = new Date(now);
  const from = new Date(now);
  if (key === "today") { from.setHours(0, 0, 0, 0); }
  else if (key === "7d") { from.setDate(from.getDate() - 6); from.setHours(0, 0, 0, 0); }
  else if (key === "30d") { from.setDate(from.getDate() - 29); from.setHours(0, 0, 0, 0); }
  else if (key === "month") { from.setDate(1); from.setHours(0, 0, 0, 0); }
  else if (key === "custom" && customFrom && customTo) {
    return { from: new Date(customFrom), to: new Date(new Date(customTo).setHours(23, 59, 59, 999)) };
  }
  return { from, to };
}

const fmtINR = (n: number) =>
  `₹${(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

const SUCCESS = ["paid", "shipped", "delivered"] as const;
const FAILED = ["failed", "cancelled"] as const;

function AnalyticsPage() {
  const [range, setRange] = useState<RangeKey>("30d");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const { from, to } = useMemo(
    () => getRange(range, customFrom, customTo),
    [range, customFrom, customTo],
  );

  const q = useQuery({
    queryKey: ["admin-analytics", range, customFrom, customTo],
    queryFn: async () => {
      const fromIso = from.toISOString();
      const toIso = to.toISOString();

      const [ordersRes, itemsRes, paymentsRes, profilesRes, catsRes] = await Promise.all([
        supabase
          .from("orders")
          .select("id,user_id,total,status,city,pincode,created_at,email")
          .gte("created_at", fromIso)
          .lte("created_at", toIso)
          .order("created_at", { ascending: true }),
        supabase
          .from("order_items")
          .select("order_id,product_id,product_name,product_image,unit_price,quantity,created_at,products(category_id,categories(name))")
          .gte("created_at", fromIso)
          .lte("created_at", toIso),
        supabase
          .from("payment_logs")
          .select("id,event,amount,error_message,customer_name,customer_email,created_at")
          .gte("created_at", fromIso)
          .lte("created_at", toIso)
          .order("created_at", { ascending: false }),
        supabase.from("profiles").select("id,created_at"),
        supabase.from("categories").select("id,name"),
      ]);

      if (ordersRes.error) throw ordersRes.error;
      if (itemsRes.error) throw itemsRes.error;

      return {
        orders: ordersRes.data ?? [],
        items: itemsRes.data ?? [],
        payments: paymentsRes.data ?? [],
        profiles: profilesRes.data ?? [],
        categories: catsRes.data ?? [],
      };
    },
  });

  const insights = useMemo(() => {
    if (!q.data) return null;
    const { orders, items, payments, profiles } = q.data;

    const successOrders = orders.filter((o: any) => (SUCCESS as readonly string[]).includes(o.status));
    const failedOrders = orders.filter((o: any) => (FAILED as readonly string[]).includes(o.status));
    const revenue = successOrders.reduce((s: number, o: any) => s + Number(o.total || 0), 0);
    const aov = successOrders.length ? revenue / successOrders.length : 0;
    const successRate = orders.length ? (successOrders.length / orders.length) * 100 : 0;

    // Customers
    const customerOrderCount = new Map<string, number>();
    for (const o of orders) {
      const key = o.user_id || o.email;
      if (!key) continue;
      customerOrderCount.set(key, (customerOrderCount.get(key) ?? 0) + 1);
    }
    const totalCustomers = customerOrderCount.size;
    const returning = [...customerOrderCount.values()].filter((c) => c > 1).length;
    const returningPct = totalCustomers ? (returning / totalCustomers) * 100 : 0;

    // Revenue trend by day
    const days = new Map<string, number>();
    const cursor = new Date(from);
    while (cursor <= to) {
      days.set(cursor.toISOString().slice(0, 10), 0);
      cursor.setDate(cursor.getDate() + 1);
    }
    for (const o of successOrders) {
      const k = new Date(o.created_at).toISOString().slice(0, 10);
      if (days.has(k)) days.set(k, (days.get(k) ?? 0) + Number(o.total || 0));
    }
    const revenueTrend = [...days.entries()].map(([d, v]) => ({
      date: d.slice(5),
      revenue: Math.round(v),
    }));

    // Payment conversion from payment_logs events
    const pCount = { Successful: 0, Failed: 0, Pending: 0 };
    for (const p of payments) {
      const ev = (p.event || "").toLowerCase();
      if (ev.includes("captured") || ev.includes("success") || ev.includes("paid")) pCount.Successful++;
      else if (ev.includes("fail") || ev.includes("error")) pCount.Failed++;
      else pCount.Pending++;
    }
    const paymentBreakdown = [
      { name: "Successful", value: pCount.Successful },
      { name: "Failed", value: pCount.Failed },
      { name: "Pending", value: pCount.Pending },
    ];

    // Top delivery areas
    const areaMap = new Map<string, { city: string; pincode: string; count: number; revenue: number }>();
    for (const o of successOrders) {
      const key = `${o.city}|${o.pincode}`;
      const cur = areaMap.get(key) ?? { city: o.city, pincode: o.pincode, count: 0, revenue: 0 };
      cur.count += 1;
      cur.revenue += Number(o.total || 0);
      areaMap.set(key, cur);
    }
    const topAreas = [...areaMap.values()].sort((a, b) => b.count - a.count).slice(0, 6);

    // Top products
    const successOrderIds = new Set(successOrders.map((o: any) => o.id));
    const prodMap = new Map<string, { name: string; image?: string; units: number; revenue: number }>();
    for (const it of items as any[]) {
      if (!successOrderIds.has(it.order_id)) continue;
      const key = it.product_id || it.product_name;
      const cur = prodMap.get(key) ?? { name: it.product_name, image: it.product_image, units: 0, revenue: 0 };
      cur.units += it.quantity;
      cur.revenue += Number(it.unit_price) * it.quantity;
      prodMap.set(key, cur);
    }
    const topProducts = [...prodMap.values()].sort((a, b) => b.units - a.units).slice(0, 7);

    // Revenue by category
    const catMap = new Map<string, number>();
    for (const it of items as any[]) {
      if (!successOrderIds.has(it.order_id)) continue;
      const name = it.products?.categories?.name ?? "Uncategorized";
      catMap.set(name, (catMap.get(name) ?? 0) + Number(it.unit_price) * it.quantity);
    }
    const revenueByCategory = [...catMap.entries()].map(([name, value]) => ({
      name, value: Math.round(value),
    }));

    // Customer growth trend (cumulative profiles created up to end of each day in range)
    const growthDays = new Map<string, number>();
    const c2 = new Date(from);
    while (c2 <= to) {
      growthDays.set(c2.toISOString().slice(0, 10), 0);
      c2.setDate(c2.getDate() + 1);
    }
    let cumulative = (profiles as any[]).filter((p) => new Date(p.created_at) < from).length;
    const sortedProfiles = [...(profiles as any[])]
      .filter((p) => new Date(p.created_at) >= from && new Date(p.created_at) <= to)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    const dailyNew = new Map<string, number>();
    for (const p of sortedProfiles) {
      const k = new Date(p.created_at).toISOString().slice(0, 10);
      dailyNew.set(k, (dailyNew.get(k) ?? 0) + 1);
    }
    const customerGrowth = [...growthDays.keys()].map((d) => {
      cumulative += dailyNew.get(d) ?? 0;
      return { date: d.slice(5), customers: cumulative, newCustomers: dailyNew.get(d) ?? 0 };
    });

    // Top customers
    const custAgg = new Map<string, { name: string; email: string; orders: number; revenue: number }>();
    for (const o of successOrders as any[]) {
      const key = o.email || o.user_id;
      if (!key) continue;
      const cur = custAgg.get(key) ?? { name: "", email: o.email, orders: 0, revenue: 0 };
      cur.orders += 1;
      cur.revenue += Number(o.total || 0);
      custAgg.set(key, cur);
    }
    const topCustomers = [...custAgg.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 8);

    // Payment gateway performance
    const gateway = {
      total: payments.length,
      successful: pCount.Successful,
      failed: pCount.Failed,
      pending: pCount.Pending,
      successRate: payments.length ? (pCount.Successful / payments.length) * 100 : 0,
      revenue: (payments as any[])
        .filter((p) => {
          const ev = (p.event || "").toLowerCase();
          return ev.includes("captured") || ev.includes("success") || ev.includes("paid");
        })
        .reduce((s, p: any) => s + Number(p.amount || 0), 0) / 100,
    };

    const failedTx = (payments as any[])
      .filter((p) => {
        const ev = (p.event || "").toLowerCase();
        return ev.includes("fail") || ev.includes("error") || p.error_message;
      })
      .slice(0, 8);

    // AI-style insights (rule-based summaries)
    const bestProduct = topProducts[0];
    const topCity = topAreas[0];
    const revGrowth = (() => {
      if (revenueTrend.length < 2) return 0;
      const half = Math.floor(revenueTrend.length / 2);
      const first = revenueTrend.slice(0, half).reduce((s, x) => s + x.revenue, 0);
      const second = revenueTrend.slice(half).reduce((s, x) => s + x.revenue, 0);
      if (!first) return second > 0 ? 100 : 0;
      return ((second - first) / first) * 100;
    })();

    return {
      kpi: {
        revenue, orders: orders.length, success: successOrders.length, failed: failedOrders.length,
        successRate, aov, totalCustomers, returning, returningPct,
      },
      revenueTrend, paymentBreakdown, topAreas, topProducts, revenueByCategory,
      customerGrowth, topCustomers, gateway, failedTx,
      ai: { bestProduct, topCity, revGrowth, paymentSuccess: gateway.successRate, returningPct },
    };
  }, [q.data, from, to]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-primary">Analytics</h2>
          <p className="text-sm text-muted-foreground">Business intelligence for your store.</p>
        </div>
        <RangeFilter
          value={range} onChange={setRange}
          customFrom={customFrom} customTo={customTo}
          setCustomFrom={setCustomFrom} setCustomTo={setCustomTo}
        />
      </div>

      {q.isLoading ? <KPISkeleton /> : insights && <KPIGrid k={insights.kpi} />}

      {!q.isLoading && insights && <AIInsights data={insights.ai} />}

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2" title="Revenue Trend" subtitle="Successful orders by day">
          {q.isLoading ? <ChartSkeleton /> : (insights?.revenueTrend.length ? (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={insights.revenueTrend}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip formatter={(v: any) => fmtINR(Number(v))} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#rev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : <Empty />)}
        </Card>

        <Card title="Payment Conversion" subtitle="Successful / Failed / Pending">
          {q.isLoading ? <ChartSkeleton /> : (insights?.paymentBreakdown.some((p) => p.value) ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={insights.paymentBreakdown} dataKey="value" nameKey="name" outerRadius={90} innerRadius={50} paddingAngle={2}>
                  {insights.paymentBreakdown.map((_, i) => (
                    <Cell key={i} fill={["#10b981", "#ef4444", "#f59e0b"][i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : <Empty />)}
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Top Selling Products" subtitle="Units sold and revenue">
          {q.isLoading ? <ChartSkeleton /> : (insights?.topProducts.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={insights.topProducts} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} />
                <Tooltip formatter={(v: any, n) => n === "revenue" ? fmtINR(Number(v)) : v} />
                <Bar dataKey="units" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <Empty />)}
        </Card>

        <Card title="Revenue by Category">
          {q.isLoading ? <ChartSkeleton /> : (insights?.revenueByCategory.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={insights.revenueByCategory} dataKey="value" nameKey="name" outerRadius={100}>
                  {insights.revenueByCategory.map((_, i) => (
                    <Cell key={i} fill={["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#06b6d4", "#8b5cf6", "#ef4444"][i % 7]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => fmtINR(Number(v))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : <Empty />)}
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Top Delivery Areas" subtitle="City + Pincode">
          {q.isLoading ? <ChartSkeleton /> : (insights?.topAreas.length ? (
            <div className="space-y-2">
              {insights.topAreas.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">{i + 1}</div>
                    <div>
                      <div className="font-medium text-sm flex items-center gap-1"><MapPin className="w-3 h-3" />{a.city}</div>
                      <div className="text-xs text-muted-foreground">{a.pincode}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">{a.count} orders</div>
                    <div className="text-xs text-muted-foreground">{fmtINR(a.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : <Empty />)}
        </Card>

        <Card title="Customer Growth" subtitle="Cumulative customers over time">
          {q.isLoading ? <ChartSkeleton /> : (insights?.customerGrowth.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={insights.customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="customers" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : <Empty />)}
        </Card>
      </div>

      <Card title="Top Customers" subtitle="By revenue">
        {q.isLoading ? <TableSkeleton /> : (insights?.topCustomers.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground uppercase">
                <tr>
                  <th className="py-2">Customer</th><th>Orders</th><th className="text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {insights.topCustomers.map((c, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="py-3">{c.email}</td>
                    <td>{c.orders}</td>
                    <td className="text-right font-semibold">{fmtINR(c.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <Empty />)}
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Payment Gateway Performance">
          {q.isLoading ? <TableSkeleton /> : insights && (
            <div className="space-y-3">
              <Row label="Gateway" value="Razorpay" />
              <Row label="Total events" value={String(insights.gateway.total)} />
              <Row label="Successful" value={String(insights.gateway.successful)} />
              <Row label="Failed" value={String(insights.gateway.failed)} />
              <Row label="Pending" value={String(insights.gateway.pending)} />
              <Row label="Success rate" value={`${insights.gateway.successRate.toFixed(1)}%`} />
              <Row label="Captured revenue" value={fmtINR(insights.gateway.revenue)} />
            </div>
          )}
        </Card>

        <Card title="Recent Failed Transactions">
          {q.isLoading ? <TableSkeleton /> : (insights?.failedTx.length ? (
            <div className="space-y-2 max-h-[320px] overflow-y-auto">
              {insights.failedTx.map((p: any) => (
                <div key={p.id} className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{p.customer_name || p.customer_email || "Unknown"}</div>
                      <div className="text-xs text-muted-foreground truncate">{p.error_message || p.event}</div>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(p.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : <div className="text-sm text-muted-foreground text-center py-8">No failures — nice!</div>)}
        </Card>
      </div>
    </div>
  );
}

function RangeFilter(props: {
  value: RangeKey; onChange: (v: RangeKey) => void;
  customFrom: string; customTo: string;
  setCustomFrom: (v: string) => void; setCustomTo: (v: string) => void;
}) {
  const opts: { k: RangeKey; label: string }[] = [
    { k: "today", label: "Today" },
    { k: "7d", label: "7 Days" },
    { k: "30d", label: "30 Days" },
    { k: "month", label: "This Month" },
    { k: "custom", label: "Custom" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="inline-flex rounded-lg border border-border bg-background p-1">
        {opts.map((o) => (
          <button
            key={o.k}
            onClick={() => props.onChange(o.k)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              props.value === o.k ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-secondary"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {props.value === "custom" && (
        <div className="flex items-center gap-2">
          <input type="date" value={props.customFrom} onChange={(e) => props.setCustomFrom(e.target.value)}
            className="text-xs px-2 py-1.5 rounded-md border border-border bg-background" />
          <span className="text-xs text-muted-foreground">to</span>
          <input type="date" value={props.customTo} onChange={(e) => props.setCustomTo(e.target.value)}
            className="text-xs px-2 py-1.5 rounded-md border border-border bg-background" />
        </div>
      )}
    </div>
  );
}

function KPIGrid({ k }: { k: any }) {
  const cards = [
    { label: "Total Revenue", value: fmtINR(k.revenue), icon: IndianRupee, accent: "text-emerald-600" },
    { label: "Total Orders", value: k.orders, icon: ShoppingBag, accent: "text-primary" },
    { label: "Successful Orders", value: k.success, icon: CheckCircle2, accent: "text-emerald-600" },
    { label: "Failed Orders", value: k.failed, icon: XCircle, accent: "text-red-500" },
    { label: "Success Rate", value: `${k.successRate.toFixed(1)}%`, icon: Percent, accent: "text-primary" },
    { label: "Avg Order Value", value: fmtINR(k.aov), icon: TrendingUp, accent: "text-primary" },
    { label: "Total Customers", value: k.totalCustomers, icon: Users, accent: "text-primary" },
    { label: "Returning", value: `${k.returning} (${k.returningPct.toFixed(0)}%)`, icon: Repeat, accent: "text-primary" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((c) => (
        <div key={c.label} className="border border-border rounded-xl p-4 bg-background hover:shadow-soft transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{c.label}</div>
            <c.icon className={`w-4 h-4 ${c.accent}`} />
          </div>
          <div className="mt-2 font-display text-xl text-primary">{c.value}</div>
        </div>
      ))}
    </div>
  );
}

function AIInsights({ data }: { data: any }) {
  const items = [
    data.bestProduct && { icon: Trophy, label: "Best Seller", value: data.bestProduct.name, sub: `${data.bestProduct.units} units` },
    data.topCity && { icon: MapPin, label: "Top City", value: data.topCity.city, sub: `${data.topCity.count} orders` },
    { icon: TrendingUp, label: "Revenue Growth", value: `${data.revGrowth >= 0 ? "+" : ""}${data.revGrowth.toFixed(1)}%`, sub: "vs first half of range" },
    { icon: Percent, label: "Payment Success", value: `${data.paymentSuccess.toFixed(1)}%`, sub: "of all attempts" },
    { icon: Repeat, label: "Returning Customers", value: `${data.returningPct.toFixed(0)}%`, sub: "of customers" },
  ].filter(Boolean) as any[];

  return (
    <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="font-display text-primary">AI Insights</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {items.map((it, i) => (
          <div key={i} className="bg-background/60 backdrop-blur rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><it.icon className="w-3 h-3" />{it.label}</div>
            <div className="mt-1.5 font-semibold text-sm truncate" title={it.value}>{it.value}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{it.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-border rounded-xl p-5 bg-background ${className}`}>
      <div className="mb-4">
        <h3 className="font-display text-primary">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function KPISkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-24 rounded-xl bg-secondary/40 animate-pulse" />
      ))}
    </div>
  );
}
function ChartSkeleton() { return <div className="h-[280px] rounded-lg bg-secondary/40 animate-pulse" />; }
function TableSkeleton() { return <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-10 rounded-md bg-secondary/40 animate-pulse" />)}</div>; }
function Empty() {
  return (
    <div className="h-[240px] flex flex-col items-center justify-center text-center text-muted-foreground">
      <Package className="w-8 h-8 mb-2 opacity-40" />
      <div className="text-sm">No data for this range</div>
      <div className="text-xs">Try a wider date range</div>
    </div>
  );
}
