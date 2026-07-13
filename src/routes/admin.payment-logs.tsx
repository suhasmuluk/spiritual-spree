import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMemo, useState } from "react";
import { RefreshCw, Download, CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/payment-logs")({
  component: AdminPaymentLogs,
});

type LogRow = {
  id: string;
  event: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  amount: number | null;
  currency: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  receipt: string | null;
  error_message: string | null;
  notes: any;
  created_at: string;
};

const EVENTS = [
  { key: "all", label: "All" },
  { key: "order_created", label: "Order Created" },
  { key: "payment_success", label: "Successful" },
  { key: "payment_failed", label: "Failed" },
  { key: "verification_failed", label: "Verification Failed" },
  { key: "order_failed", label: "Order Errors" },
] as const;

function eventBadge(event: string) {
  switch (event) {
    case "payment_success":
      return <Badge className="bg-green-500/15 text-green-700 dark:text-green-400 border-0"><CheckCircle2 className="w-3 h-3 mr-1" />Success</Badge>;
    case "payment_failed":
      return <Badge className="bg-red-500/15 text-red-700 dark:text-red-400 border-0"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
    case "verification_failed":
      return <Badge className="bg-orange-500/15 text-orange-700 dark:text-orange-400 border-0"><AlertTriangle className="w-3 h-3 mr-1" />Verify Failed</Badge>;
    case "order_failed":
      return <Badge className="bg-red-500/15 text-red-700 dark:text-red-400 border-0"><XCircle className="w-3 h-3 mr-1" />Order Error</Badge>;
    case "order_created":
      return <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border-0"><Clock className="w-3 h-3 mr-1" />Initiated</Badge>;
    default:
      return <Badge variant="secondary">{event}</Badge>;
  }
}

function AdminPaymentLogs() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const { data: logs = [], isLoading, refetch, isFetching } = useQuery({
    queryKey: ["admin-payment-logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payment_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return data as LogRow[];
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return logs.filter((l) => {
      if (filter !== "all" && l.event !== filter) return false;
      if (!q) return true;
      const hay = `${l.razorpay_order_id ?? ""} ${l.razorpay_payment_id ?? ""} ${l.customer_name ?? ""} ${l.customer_phone ?? ""} ${l.customer_email ?? ""} ${l.error_message ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [logs, filter, search]);

  const counts = useMemo(() => {
    const c = { total: logs.length, success: 0, failed: 0, initiated: 0 };
    for (const l of logs) {
      if (l.event === "payment_success") c.success++;
      else if (l.event === "payment_failed" || l.event === "verification_failed" || l.event === "order_failed") c.failed++;
      else if (l.event === "order_created") c.initiated++;
    }
    return c;
  }, [logs]);

  const exportCSV = () => {
    const rows = [
      ["Date", "Event", "Order ID", "Payment ID", "Amount", "Customer", "Phone", "Email", "Error"],
      ...filtered.map((l) => [
        new Date(l.created_at).toLocaleString(),
        l.event,
        l.razorpay_order_id ?? "",
        l.razorpay_payment_id ?? "",
        l.amount ?? "",
        l.customer_name ?? "",
        l.customer_phone ?? "",
        l.customer_email ?? "",
        l.error_message ?? "",
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `payment-logs-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-primary mb-1">Payment Logs</h2>
          <p className="text-sm text-muted-foreground">
            Every payment attempt — successful, failed, or errored — recorded in real time.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-secondary text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-secondary text-sm"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile label="Total Events" value={counts.total} tone="default" />
        <StatTile label="Successful" value={counts.success} tone="success" />
        <StatTile label="Failed" value={counts.failed} tone="danger" />
        <StatTile label="Initiated" value={counts.initiated} tone="info" />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {EVENTS.map((e) => (
          <button
            key={e.key}
            onClick={() => setFilter(e.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === e.key
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:bg-secondary"
            }`}
          >
            {e.label}
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search order ID, payment ID, customer, error…"
          className="ml-auto px-3 py-1.5 rounded-lg border border-border bg-background text-sm w-full sm:w-80"
        />
      </div>

      <div className="border border-border rounded-xl overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>When</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Order / Payment ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Error</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">Loading…</TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No payment logs yet. Logs will appear here whenever a checkout is attempted.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {new Date(l.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>{eventBadge(l.event)}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {l.razorpay_order_id && <div>{l.razorpay_order_id}</div>}
                    {l.razorpay_payment_id && <div className="text-muted-foreground">{l.razorpay_payment_id}</div>}
                    {!l.razorpay_order_id && !l.razorpay_payment_id && <span className="text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell className="text-sm">
                    {l.customer_name || <span className="text-muted-foreground">—</span>}
                    {l.customer_phone && <div className="text-xs text-muted-foreground">{l.customer_phone}</div>}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    {l.amount != null ? `₹${Number(l.amount).toLocaleString("en-IN")}` : "—"}
                  </TableCell>
                  <TableCell className="text-xs text-destructive max-w-xs">
                    {l.error_message || <span className="text-muted-foreground">—</span>}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function StatTile({ label, value, tone }: { label: string; value: number; tone: "default" | "success" | "danger" | "info" }) {
  const cls =
    tone === "success" ? "from-green-500/10 to-green-500/5 text-green-700 dark:text-green-400"
    : tone === "danger" ? "from-red-500/10 to-red-500/5 text-red-700 dark:text-red-400"
    : tone === "info" ? "from-blue-500/10 to-blue-500/5 text-blue-700 dark:text-blue-400"
    : "from-secondary to-secondary/50 text-foreground";
  return (
    <div className={`rounded-xl border border-border p-4 bg-gradient-to-br ${cls}`}>
      <div className="text-xs uppercase tracking-wider opacity-80">{label}</div>
      <div className="text-2xl font-display mt-1">{value}</div>
    </div>
  );
}
