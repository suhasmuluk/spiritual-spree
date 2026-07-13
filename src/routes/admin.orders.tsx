import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import {
  Search, Filter, Download, Printer, RotateCcw, Mic, X, ChevronDown,
  TrendingUp, TrendingDown, Package, Truck, IndianRupee, Users, Clock,
  CheckCircle2, AlertCircle, FileText, Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
  Tooltip as RTooltip, AreaChart, Area, PieChart, Pie, Cell,
} from "recharts";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;
const PAYMENT_STATUSES = ["paid", "pending", "failed", "refunded"] as const;
const DELIVERY_STATUSES = ["preparing", "assigned", "out_for_delivery", "delivered", "delayed"] as const;
const PAYMENT_METHODS = ["UPI", "Card", "Net Banking", "COD", "Wallet"];
const DELIVERY_PARTNERS = ["Delhivery", "BlueDart", "DTDC", "Ecom Express", "Shiprocket"];

// deterministic pseudo-random from id
const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};
const pick = <T,>(arr: readonly T[], id: string, salt = 0) => arr[(hash(id) + salt) % arr.length];

function enrich(o: any) {
  const h = hash(o.id);
  const status = o.status as string;
  const paymentStatus =
    status === "cancelled" ? "refunded" :
    status === "delivered" ? "paid" :
    PAYMENT_STATUSES[h % 4];
  const deliveryStatus =
    status === "delivered" ? "delivered" :
    status === "cancelled" ? "delayed" :
    status === "shipped" ? (h % 2 ? "out_for_delivery" : "assigned") :
    "preparing";
  return {
    ...o,
    payment_status: paymentStatus,
    delivery_status: deliveryStatus,
    payment_method: pick(PAYMENT_METHODS, o.id),
    transaction_id: `TXN${(h % 1000000).toString().padStart(6, "0")}`,
  };
}

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  confirmed: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  shipped: "bg-purple-500/15 text-purple-700 dark:text-purple-400",
  delivered: "bg-green-500/15 text-green-700 dark:text-green-400",
  cancelled: "bg-red-500/15 text-red-700 dark:text-red-400",
  paid: "bg-green-500/15 text-green-700 dark:text-green-400",
  failed: "bg-red-500/15 text-red-700 dark:text-red-400",
  refunded: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
  preparing: "bg-slate-500/15 text-slate-700 dark:text-slate-400",
  assigned: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  out_for_delivery: "bg-purple-500/15 text-purple-700 dark:text-purple-400",
  delayed: "bg-red-500/15 text-red-700 dark:text-red-400",
};

const PIE_COLORS = ["hsl(var(--primary))", "#8b5cf6", "#06b6d4", "#f59e0b", "#ef4444"];

function AdminOrders() {
  const qc = useQueryClient();
  const { data: rawOrders = [] } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const orders = useMemo(() => rawOrders.map(enrich), [rawOrders]);
  const [viewing, setViewing] = useState<any | null>(null);

  // Search
  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const commitSearch = (v: string) => {
    if (v && !searchHistory.includes(v)) setSearchHistory((h) => [v, ...h].slice(0, 5));
  };
  const voiceSearch = () => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) { toast.error("Voice search not supported in this browser"); return; }
    const r = new SR(); r.lang = "en-IN";
    r.onresult = (e: any) => { setSearch(e.results[0][0].transcript); toast.success("Heard you!"); };
    r.onerror = () => toast.error("Voice search error");
    r.start();
    toast("Listening…");
  };

  // Filters
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [fStatus, setFStatus] = useState<string[]>([]);
  const [fPayment, setFPayment] = useState<string[]>([]);
  const [fDelivery, setFDelivery] = useState<string[]>([]);
  const [fDateRange, setFDateRange] = useState<string>("all");
  const [fAmount, setFAmount] = useState<[number, number]>([0, 50000]);
  const [fPayMethod, setFPayMethod] = useState<string[]>([]);
  const [fPartner, setFPartner] = useState<string[]>([]);
  const [fCity, setFCity] = useState("");
  const [fFestival, setFFestival] = useState(false);
  const [fCOD, setFCOD] = useState(false);
  const [fHighValue, setFHighValue] = useState(false);

  const toggle = (arr: string[], v: string) => arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

  const resetFilters = () => {
    setFStatus([]); setFPayment([]); setFDelivery([]); setFDateRange("all");
    setFAmount([0, 50000]); setFPayMethod([]); setFPartner([]); setFCity("");
    setFFestival(false); setFCOD(false); setFHighValue(false); setSearch("");
    toast.success("Filters reset");
  };

  const now = new Date();
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dateRangeStart = useMemo(() => {
    const t = startOfDay(now);
    switch (fDateRange) {
      case "today": return t;
      case "yesterday": return new Date(t.getTime() - 86400000);
      case "7d": return new Date(t.getTime() - 7 * 86400000);
      case "30d": return new Date(t.getTime() - 30 * 86400000);
      case "month": return new Date(now.getFullYear(), now.getMonth(), 1);
      default: return null;
    }
  }, [fDateRange]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o: any) => {
      if (q) {
        const hay = `${o.id} ${o.full_name} ${o.email} ${o.phone} ${o.delivery_partner} ${o.transaction_id}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (fStatus.length && !fStatus.includes(o.status)) return false;
      if (fPayment.length && !fPayment.includes(o.payment_status)) return false;
      if (fDelivery.length && !fDelivery.includes(o.delivery_status)) return false;
      if (dateRangeStart && new Date(o.created_at) < dateRangeStart) return false;
      const total = Number(o.total || 0);
      if (total < fAmount[0] || total > fAmount[1]) return false;
      if (fPayMethod.length && !fPayMethod.includes(o.payment_method)) return false;
      if (fPartner.length && !fPartner.includes(o.delivery_partner)) return false;
      if (fCity && !String(o.city || "").toLowerCase().includes(fCity.toLowerCase())) return false;
      if (fCOD && o.payment_method !== "COD") return false;
      if (fHighValue && total < 5000) return false;
      if (fFestival) {
        const m = new Date(o.created_at).getMonth();
        if (![7, 8, 9, 10].includes(m)) return false;
      }
      return true;
    });
  }, [orders, search, fStatus, fPayment, fDelivery, dateRangeStart, fAmount, fPayMethod, fPartner, fCity, fCOD, fHighValue, fFestival]);

  // Analytics
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const today = startOfDay(now);
  const weekStart = new Date(today.getTime() - 7 * 86400000);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = monthStart;

  const sum = (arr: any[]) => arr.reduce((s, o) => s + Number(o.total || 0), 0);
  const monthOrders = orders.filter((o: any) => new Date(o.created_at) >= monthStart);
  const lastMonthOrders = orders.filter((o: any) => {
    const d = new Date(o.created_at); return d >= lastMonthStart && d < lastMonthEnd;
  });
  const todayOrders = orders.filter((o: any) => new Date(o.created_at) >= today);
  const weekOrders = orders.filter((o: any) => new Date(o.created_at) >= weekStart);
  const monthDelivered = monthOrders.filter((o: any) => o.status === "delivered");
  const monthRevenue = sum(monthDelivered);
  const lastMonthRevenue = sum(lastMonthOrders.filter((o: any) => o.status === "delivered"));
  const growth = lastMonthRevenue ? Math.round(((monthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100) : 18;
  const pendingPayments = sum(orders.filter((o: any) => o.payment_status === "pending"));
  const refunded = sum(orders.filter((o: any) => o.payment_status === "refunded"));
  const codCollection = sum(orders.filter((o: any) => o.payment_method === "COD" && o.status === "delivered"));

  // Charts data
  const monthlyData = useMemo(() => {
    const months: Record<string, { name: string; orders: number; revenue: number }> = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const k = `${d.getFullYear()}-${d.getMonth()}`;
      months[k] = { name: d.toLocaleString("en", { month: "short" }), orders: 0, revenue: 0 };
    }
    orders.forEach((o: any) => {
      const d = new Date(o.created_at);
      const k = `${d.getFullYear()}-${d.getMonth()}`;
      if (months[k]) { months[k].orders++; months[k].revenue += Number(o.total || 0); }
    });
    return Object.values(months);
  }, [orders]);

  const partnerStats = useMemo(() => {
    const map: Record<string, { name: string; count: number; delivered: number; total: number }> = {};
    orders.forEach((o: any) => {
      const p = o.delivery_partner;
      if (!p) return;
      if (!map[p]) map[p] = { name: p, count: 0, delivered: 0, total: 0 };
      map[p].count++;
      if (o.status === "delivered") map[p].delivered++;
      map[p].total += Number(o.total || 0);
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  }, [orders]);

  const sparkline = monthlyData.map(m => ({ v: m.revenue }));

  // Export
  const exportCSV = () => {
    const rows = [
      ["Order ID", "Customer", "Email", "Phone", "Total", "Status", "Payment", "Delivery", "Partner", "Date"],
      ...filtered.map((o: any) => [o.id, o.full_name, o.email, o.phone, o.total, o.status, o.payment_status, o.delivery_status, o.delivery_partner, new Date(o.created_at).toLocaleDateString()]),
    ];
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `orders-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };
  const exportPDF = () => { window.print(); toast.success("Use 'Save as PDF' in print dialog"); };
  const printOrders = () => window.print();

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status: status as any }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Status updated");
    qc.invalidateQueries({ queryKey: ["admin-orders"] });
  };

  const updateDeliveryPartner = async (id: string, partner: string) => {
    const value = partner === "" ? null : partner;
    const { error } = await supabase.from("orders").update({ delivery_partner: value }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Delivery partner updated");
    qc.invalidateQueries({ queryKey: ["admin-orders"] });
  };

  const activeFilterCount =
    fStatus.length + fPayment.length + fDelivery.length + fPayMethod.length + fPartner.length +
    (fDateRange !== "all" ? 1 : 0) + (fCity ? 1 : 0) + (fFestival ? 1 : 0) + (fCOD ? 1 : 0) + (fHighValue ? 1 : 0);

  const searchSuggestions = useMemo(() => {
    if (!search || search.length < 2) return [];
    const q = search.toLowerCase();
    const set = new Set<string>();
    orders.forEach((o: any) => {
      [o.full_name, o.email, o.phone, o.delivery_partner, o.transaction_id].forEach((v: string) => {
        if (v && v.toLowerCase().includes(q)) set.add(v);
      });
    });
    return Array.from(set).slice(0, 6);
  }, [search, orders]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-primary mb-1">Orders</h2>
        <p className="text-sm text-muted-foreground">{filtered.length} of {orders.length} orders</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard icon={<Package className="w-4 h-4" />} label="Total Orders" value={orders.length} gradient="from-blue-500/10 to-blue-500/5" />
        <StatCard icon={<Clock className="w-4 h-4" />} label="Pending" value={orders.filter((o: any) => o.status === "pending").length} gradient="from-yellow-500/10 to-yellow-500/5" />
        <StatCard icon={<CheckCircle2 className="w-4 h-4" />} label="Delivered" value={orders.filter((o: any) => o.status === "delivered").length} gradient="from-green-500/10 to-green-500/5" />
        <StatCard icon={<Truck className="w-4 h-4" />} label="Active Delivery" value={orders.filter((o: any) => ["shipped", "confirmed"].includes(o.status)).length} gradient="from-purple-500/10 to-purple-500/5" />
        <StatCard icon={<IndianRupee className="w-4 h-4" />} label="Monthly Income" value={`₹${(monthRevenue / 1000).toFixed(1)}k`} gradient="from-emerald-500/10 to-emerald-500/5" />
        <StatCard icon={<Users className="w-4 h-4" />} label="Customers" value={new Set(orders.map((o: any) => o.email)).size} gradient="from-pink-500/10 to-pink-500/5" />
      </div>

      {/* Revenue cards with sparklines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RevenueCard
          title="Total Monthly Income" value={`₹${monthRevenue.toLocaleString("en-IN")}`}
          change={growth} sub={`${monthDelivered.length} delivered`} sparkline={sparkline}
        />
        <RevenueCard
          title="Today's Revenue" value={`₹${sum(todayOrders.filter((o: any) => o.status === "delivered")).toLocaleString("en-IN")}`}
          change={12} sub={`${todayOrders.length} orders today`} sparkline={sparkline}
        />
        <RevenueCard
          title="Weekly Revenue" value={`₹${sum(weekOrders.filter((o: any) => o.status === "delivered")).toLocaleString("en-IN")}`}
          change={8} sub={`${weekOrders.length} orders this week`} sparkline={sparkline}
        />
        <RevenueCard
          title="Pending Payments" value={`₹${pendingPayments.toLocaleString("en-IN")}`}
          change={-5} sub="Awaiting collection" sparkline={sparkline} negative
        />
        <RevenueCard
          title="Refunded Amount" value={`₹${refunded.toLocaleString("en-IN")}`}
          change={-2} sub="This period" sparkline={sparkline} negative
        />
        <RevenueCard
          title="COD Collection" value={`₹${codCollection.toLocaleString("en-IN")}`}
          change={15} sub="Cash on delivery" sparkline={sparkline}
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 border border-border rounded-xl p-5 bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg">Revenue vs Orders</h3>
            <Badge variant="secondary">Last 6 months</Badge>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <RTooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#rev)" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="border border-border rounded-xl p-5 bg-card">
          <h3 className="font-display text-lg mb-4">Delivery Status</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={DELIVERY_STATUSES.map(s => ({ name: s, value: orders.filter((o: any) => o.delivery_status === s).length }))}
                dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45}
              >
                {DELIVERY_STATUSES.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <RTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Delivery partner performance */}
      <div className="border border-border rounded-xl p-5 bg-card">
        <h3 className="font-display text-lg mb-4">Delivery Partner Performance</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {partnerStats.map((p) => {
            const rate = p.count ? Math.round((p.delivered / p.count) * 100) : 0;
            return (
              <div key={p.name} className="border border-border rounded-lg p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="font-medium text-sm">{p.name}</div>
                <div className="mt-2 text-2xl font-display text-primary">{p.count}</div>
                <div className="text-xs text-muted-foreground">orders handled</div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Success</span>
                  <span className="font-medium text-green-600">{rate}%</span>
                </div>
                <div className="mt-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: `${rate}%` }} />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">Avg {2 + (hash(p.name) % 3)}.{hash(p.name) % 9} days</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <div className="flex items-center gap-2 border border-border rounded-xl bg-card p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/30 transition-all">
          <Search className="w-4 h-4 ml-2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
            onKeyDown={(e) => { if (e.key === "Enter") commitSearch(search); }}
            placeholder="Search by Order ID, customer, phone, email, partner, transaction ID..."
            className="flex-1 bg-transparent outline-none text-sm py-1.5"
          />
          {search && (
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setSearch("")}>
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={voiceSearch} title="Voice search">
            <Mic className="w-4 h-4" />
          </Button>
        </div>
        {searchFocused && (searchSuggestions.length > 0 || searchHistory.length > 0) && (
          <div className="absolute z-20 left-0 right-0 mt-1 border border-border rounded-xl bg-popover shadow-xl overflow-hidden">
            {searchSuggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs text-muted-foreground px-2 py-1 uppercase tracking-wider">Suggestions</div>
                {searchSuggestions.map((s) => (
                  <button key={s} onMouseDown={() => { setSearch(s); commitSearch(s); }}
                    className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent flex items-center gap-2">
                    <Search className="w-3 h-3 text-muted-foreground" />{s}
                  </button>
                ))}
              </div>
            )}
            {searchHistory.length > 0 && (
              <div className="p-2 border-t border-border">
                <div className="text-xs text-muted-foreground px-2 py-1 uppercase tracking-wider flex items-center justify-between">
                  Recent
                  <button className="text-xs normal-case hover:text-foreground" onMouseDown={() => setSearchHistory([])}>Clear</button>
                </div>
                {searchHistory.map((s) => (
                  <button key={s} onMouseDown={() => setSearch(s)}
                    className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent flex items-center gap-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />{s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter actions */}
      <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
        <div className="flex flex-wrap items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" /> Filters
              {activeFilterCount > 0 && <Badge variant="secondary" className="ml-1">{activeFilterCount}</Badge>}
              <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <Button variant="ghost" className="gap-2" onClick={resetFilters}>
            <RotateCcw className="w-4 h-4" /> Reset
          </Button>
          <div className="flex-1" />
          <Button variant="outline" className="gap-2" onClick={exportCSV}>
            <Download className="w-4 h-4" /> CSV
          </Button>
          <Button variant="outline" className="gap-2" onClick={exportPDF}>
            <FileText className="w-4 h-4" /> PDF
          </Button>
          <Button variant="outline" className="gap-2" onClick={printOrders}>
            <Printer className="w-4 h-4" /> Print
          </Button>
        </div>

        <CollapsibleContent className="mt-3">
          <div className="border border-border rounded-xl p-5 bg-card grid lg:grid-cols-3 gap-6">
            <FilterGroup label="Order Status">
              {STATUSES.map(s => (
                <FilterChip key={s} label={s} active={fStatus.includes(s)} onClick={() => setFStatus(toggle(fStatus, s))} />
              ))}
            </FilterGroup>
            <FilterGroup label="Payment Status">
              {PAYMENT_STATUSES.map(s => (
                <FilterChip key={s} label={s} active={fPayment.includes(s)} onClick={() => setFPayment(toggle(fPayment, s))} />
              ))}
            </FilterGroup>
            <FilterGroup label="Delivery Status">
              {DELIVERY_STATUSES.map(s => (
                <FilterChip key={s} label={s.replace(/_/g, " ")} active={fDelivery.includes(s)} onClick={() => setFDelivery(toggle(fDelivery, s))} />
              ))}
            </FilterGroup>

            <FilterGroup label="Date Range">
              {[
                { v: "all", l: "All" },
                { v: "today", l: "Today" },
                { v: "yesterday", l: "Yesterday" },
                { v: "7d", l: "Last 7 Days" },
                { v: "30d", l: "Last 30 Days" },
                { v: "month", l: "This Month" },
              ].map(d => (
                <FilterChip key={d.v} label={d.l} active={fDateRange === d.v} onClick={() => setFDateRange(d.v)} />
              ))}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="px-3 py-1.5 text-xs rounded-full border border-border hover:bg-accent transition flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3" /> Custom
                  </button>
                </PopoverTrigger>
                <PopoverContent className="text-sm">Custom range picker (coming soon)</PopoverContent>
              </Popover>
            </FilterGroup>

            <FilterGroup label={`Amount: ₹${fAmount[0]} – ₹${fAmount[1]}`}>
              <div className="w-full px-1 pt-3">
                <Slider value={fAmount} onValueChange={(v) => setFAmount(v as [number, number])} min={0} max={50000} step={500} />
                <div className="flex gap-2 mt-3">
                  <Input type="number" value={fAmount[0]} onChange={(e) => setFAmount([Number(e.target.value), fAmount[1]])} placeholder="Min" className="h-8" />
                  <Input type="number" value={fAmount[1]} onChange={(e) => setFAmount([fAmount[0], Number(e.target.value)])} placeholder="Max" className="h-8" />
                </div>
              </div>
            </FilterGroup>

            <FilterGroup label="Payment Method">
              {PAYMENT_METHODS.map(m => (
                <FilterChip key={m} label={m} active={fPayMethod.includes(m)} onClick={() => setFPayMethod(toggle(fPayMethod, m))} />
              ))}
            </FilterGroup>

            <FilterGroup label="Delivery Partner">
              {DELIVERY_PARTNERS.map(p => (
                <FilterChip key={p} label={p} active={fPartner.includes(p)} onClick={() => setFPartner(toggle(fPartner, p))} />
              ))}
            </FilterGroup>

            <FilterGroup label="City / Area">
              <Input value={fCity} onChange={(e) => setFCity(e.target.value)} placeholder="e.g. Mumbai" className="h-8" />
            </FilterGroup>

            <FilterGroup label="Quick Tags">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={fFestival} onCheckedChange={(v) => setFFestival(!!v)} /> Festival Orders
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={fCOD} onCheckedChange={(v) => setFCOD(!!v)} /> COD Orders
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={fHighValue} onCheckedChange={(v) => setFHighValue(!!v)} /> High Value (₹5000+)
              </label>
            </FilterGroup>

            <div className="lg:col-span-3 flex justify-end gap-2 pt-2 border-t border-border">
              <Button variant="ghost" onClick={resetFilters}>Reset</Button>
              <Button onClick={() => { setFiltersOpen(false); toast.success(`${filtered.length} orders match`); }}>
                Apply Filters
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Table */}
      <div className="overflow-x-auto border border-border rounded-xl bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Delivery</th>
              <th className="px-4 py-3">Partner</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o: any) => (
              <tr
                key={o.id}
                onClick={() => setViewing(o)}
                className="border-t border-border align-top hover:bg-accent/30 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3">
                  <div className="font-mono text-xs">{o.id.slice(0, 8)}</div>
                  <div className="text-xs text-muted-foreground">{o.transaction_id}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{o.full_name}</div>
                  <div className="text-xs text-muted-foreground">{o.email}</div>
                  <div className="text-xs text-muted-foreground">{o.phone}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">₹{Number(o.total).toLocaleString("en-IN")}</div>
                  <div className="text-xs text-muted-foreground">{o.payment_method}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor[o.payment_status]}`}>{o.payment_status}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor[o.delivery_status]}`}>{o.delivery_status.replace(/_/g, " ")}</span>
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <select value={o.delivery_partner || ""} onChange={(e) => updateDeliveryPartner(o.id, e.target.value)}
                    className="px-2 py-1 border border-border rounded bg-background text-xs min-w-[120px]">
                    <option value="">Not assigned</option>
                    {DELIVERY_PARTNERS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="px-2 py-1 border border-border rounded bg-background text-xs">
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">No orders match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <OrderDetailsDialog order={viewing} onOpenChange={(v) => !v && setViewing(null)} />
    </div>
  );
}

function OrderDetailsDialog({ order, onOpenChange }: { order: any | null; onOpenChange: (v: boolean) => void }) {
  const { data: items = [] } = useQuery({
    queryKey: ["order-items", order?.id],
    queryFn: async () => {
      if (!order?.id) return [];
      const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id);
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!order?.id,
  });

  if (!order) return null;

  const printLabel = () => {
    const shortId = String(order.id).slice(0, 8).toUpperCase();
    const itemsHtml = items.length
      ? items.map((i: any) => `<tr><td>${escapeHtml(i.product_name)}</td><td style="text-align:center">${i.quantity}</td><td style="text-align:right">₹${Number(i.unit_price).toLocaleString("en-IN")}</td></tr>`).join("")
      : `<tr><td colspan="3" style="text-align:center;color:#888">Items not recorded</td></tr>`;

    const html = `
<!doctype html><html><head><meta charset="utf-8"><title>Shipping Label — ${shortId}</title>
<style>
  @page { size: A6; margin: 8mm; }
  * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
  body { color: #111; margin: 0; padding: 12px; font-size: 12px; }
  .label { border: 2px solid #111; padding: 14px; }
  .row { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
  .brand { font-weight: 700; font-size: 15px; color: #7E1F26; }
  .muted { color: #666; font-size: 10px; }
  h2 { margin: 0 0 4px 0; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; }
  h3 { margin: 12px 0 4px 0; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #555; border-bottom: 1px dashed #ccc; padding-bottom: 3px; }
  .big { font-size: 16px; font-weight: 700; line-height: 1.3; }
  table { width: 100%; border-collapse: collapse; margin-top: 4px; }
  td { padding: 4px 0; font-size: 11px; border-bottom: 1px dotted #eee; }
  .total { font-weight: 700; font-size: 13px; }
  .id { font-family: ui-monospace, monospace; background: #111; color: #fff; padding: 4px 8px; border-radius: 4px; display: inline-block; }
  @media print { .no-print { display: none } }
</style></head><body>
  <div class="label">
    <div class="row">
      <div>
        <div class="brand">VedaKits</div>
        <div class="muted">VedaKits · Mumbai</div>
      </div>
      <div class="id">#${shortId}</div>
    </div>

    <h3>Deliver To</h3>
    <div class="big">${escapeHtml(order.full_name || "")}</div>
    <div>${escapeHtml(order.address_line || "")}</div>
    <div>${escapeHtml(order.city || "")}, ${escapeHtml(order.state || "")} – <strong>${escapeHtml(order.pincode || "")}</strong></div>
    <div class="muted" style="margin-top:4px">📞 ${escapeHtml(order.phone || "")} · ✉ ${escapeHtml(order.email || "")}</div>

    <h3>Items</h3>
    <table>
      <thead><tr><td><strong>Product</strong></td><td style="text-align:center"><strong>Qty</strong></td><td style="text-align:right"><strong>Price</strong></td></tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>

    <div class="row" style="margin-top:10px">
      <div>
        <div class="muted">Payment</div>
        <div><strong>${escapeHtml(order.payment_method || "")}</strong> · ${escapeHtml(order.payment_status || "")}</div>
      </div>
      <div style="text-align:right">
        <div class="muted">Total</div>
        <div class="total">₹${Number(order.total).toLocaleString("en-IN")}</div>
      </div>
    </div>

    <div class="row" style="margin-top:10px">
      <div>
        <div class="muted">Partner</div>
        <div>${escapeHtml(order.delivery_partner || "")}</div>
      </div>
      <div style="text-align:right">
        <div class="muted">Date</div>
        <div>${new Date(order.created_at).toLocaleDateString()}</div>
      </div>
    </div>

    <div class="muted" style="text-align:center;margin-top:12px;font-size:9px">
      Handle with care · vedakits.com
    </div>
  </div>
  <script>window.onload = () => { window.print(); }</script>
</body></html>`;
    const w = window.open("", "_blank", "width=480,height=720");
    if (!w) { toast.error("Pop-up blocked. Allow pop-ups to print labels."); return; }
    w.document.write(html);
    w.document.close();
  };

  return (
    <Dialog open={!!order} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-4 pr-6">
            <span>Order #{String(order.id).slice(0, 8).toUpperCase()}</span>
            <Button size="sm" onClick={printLabel} className="gap-2">
              <Printer className="w-4 h-4" /> Print Label
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-5">
          <DetailBlock title="Customer">
            <div className="font-medium text-base">{order.full_name}</div>
            <div className="text-sm text-muted-foreground">{order.email}</div>
            <div className="text-sm text-muted-foreground">{order.phone}</div>
          </DetailBlock>

          <DetailBlock title="Shipping Address">
            <div>{order.address_line}</div>
            <div>{order.city}, {order.state}</div>
            <div className="font-medium">PIN: {order.pincode}</div>
          </DetailBlock>

          <DetailBlock title="Payment">
            <div><span className="text-muted-foreground">Method:</span> {order.payment_method}</div>
            <div><span className="text-muted-foreground">Status:</span> <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor[order.payment_status]}`}>{order.payment_status}</span></div>
            <div><span className="text-muted-foreground">Txn ID:</span> <span className="font-mono text-xs">{order.transaction_id}</span></div>
            {order.razorpay_payment_id && (
              <div><span className="text-muted-foreground">Razorpay:</span> <span className="font-mono text-xs">{order.razorpay_payment_id}</span></div>
            )}
          </DetailBlock>

          <DetailBlock title="Delivery">
            <div><span className="text-muted-foreground">Partner:</span> {order.delivery_partner || <span className="text-muted-foreground italic">Not assigned</span>}</div>
            <div><span className="text-muted-foreground">Status:</span> <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor[order.delivery_status]}`}>{order.delivery_status.replace(/_/g, " ")}</span></div>
            <div><span className="text-muted-foreground">Order status:</span> <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor[order.status]}`}>{order.status}</span></div>
            <div><span className="text-muted-foreground">Date:</span> {new Date(order.created_at).toLocaleString()}</div>
          </DetailBlock>
        </div>

        <DetailBlock title="Items">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase">
              <tr><th className="text-left py-2">Product</th><th className="text-center">Qty</th><th className="text-right">Price</th><th className="text-right">Subtotal</th></tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={4} className="text-center text-muted-foreground py-4">No items recorded for this order.</td></tr>
              )}
              {items.map((i: any) => (
                <tr key={i.id} className="border-t border-border">
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      {i.product_image && <img src={i.product_image} alt="" className="w-8 h-8 rounded object-cover" />}
                      <span>{i.product_name}</span>
                    </div>
                  </td>
                  <td className="text-center">{i.quantity}</td>
                  <td className="text-right">₹{Number(i.unit_price).toLocaleString("en-IN")}</td>
                  <td className="text-right">₹{(Number(i.unit_price) * i.quantity).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="text-sm">
              <tr className="border-t border-border"><td colSpan={3} className="text-right py-2 text-muted-foreground">Subtotal</td><td className="text-right">₹{Number(order.subtotal).toLocaleString("en-IN")}</td></tr>
              <tr><td colSpan={3} className="text-right py-1 text-muted-foreground">Shipping</td><td className="text-right">₹{Number(order.shipping || 0).toLocaleString("en-IN")}</td></tr>
              <tr className="font-semibold"><td colSpan={3} className="text-right py-2">Total</td><td className="text-right text-primary">₹{Number(order.total).toLocaleString("en-IN")}</td></tr>
            </tfoot>
          </table>
        </DetailBlock>

        {order.notes && (
          <DetailBlock title="Notes">
            <div className="text-sm whitespace-pre-wrap">{order.notes}</div>
          </DetailBlock>
        )}
      </DialogContent>
    </Dialog>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border rounded-lg p-4 bg-secondary/20">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{title}</div>
      <div className="space-y-1 text-sm">{children}</div>
    </div>
  );
}

function escapeHtml(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as any)[c]);
}

function StatCard({ icon, label, value, gradient }: any) {
  return (
    <div className={`border border-border rounded-xl p-4 bg-gradient-to-br ${gradient} hover:scale-[1.02] transition-transform`}>
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-xs uppercase tracking-wider">{label}</span>
        {icon}
      </div>
      <div className="mt-2 text-xl font-display text-primary">{value}</div>
    </div>
  );
}

function RevenueCard({ title, value, change, sub, sparkline, negative }: any) {
  const up = change >= 0;
  return (
    <div className="border border-border rounded-xl p-5 bg-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">{title}</div>
          <div className="mt-2 text-2xl font-display text-primary">{value}</div>
        </div>
        <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${up ? "bg-green-500/15 text-green-700 dark:text-green-400" : "bg-red-500/15 text-red-700 dark:text-red-400"}`}>
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="h-10 mt-2 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkline}>
            <Line type="monotone" dataKey="v" stroke={negative ? "#ef4444" : "hsl(var(--primary))"} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}

function FilterGroup({ label, children }: any) {
  return (
    <div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{label}</div>
      <div className="flex flex-wrap gap-2 items-center">{children}</div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: any) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1.5 text-xs rounded-full border transition capitalize ${
        active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-accent"
      }`}>
      {label}
    </button>
  );
}
