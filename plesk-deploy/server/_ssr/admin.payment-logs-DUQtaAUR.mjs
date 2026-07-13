import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DJ82In3R.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { w as RefreshCw, D as Download, c as Clock, x as CircleX, y as TriangleAlert, C as CircleCheck } from "../_libs/lucide-react.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const Table = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props }));
TableBody.displayName = "TableBody";
const TableFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tfoot",
  {
    ref,
    className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props }));
TableCaption.displayName = "TableCaption";
const EVENTS = [{
  key: "all",
  label: "All"
}, {
  key: "order_created",
  label: "Order Created"
}, {
  key: "payment_success",
  label: "Successful"
}, {
  key: "payment_failed",
  label: "Failed"
}, {
  key: "verification_failed",
  label: "Verification Failed"
}, {
  key: "order_failed",
  label: "Order Errors"
}];
function eventBadge(event) {
  switch (event) {
    case "payment_success":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-500/15 text-green-700 dark:text-green-400 border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
        "Success"
      ] });
    case "payment_failed":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-500/15 text-red-700 dark:text-red-400 border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
        "Failed"
      ] });
    case "verification_failed":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 mr-1" }),
        "Verify Failed"
      ] });
    case "order_failed":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-500/15 text-red-700 dark:text-red-400 border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
        "Order Error"
      ] });
    case "order_created":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 mr-1" }),
        "Initiated"
      ] });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: event });
  }
}
function AdminPaymentLogs() {
  const [filter, setFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const {
    data: logs = [],
    isLoading,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["admin-payment-logs"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("payment_logs").select("*").order("created_at", {
        ascending: false
      }).limit(500);
      if (error) throw error;
      return data;
    }
  });
  const filtered = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    return logs.filter((l) => {
      if (filter !== "all" && l.event !== filter) return false;
      if (!q) return true;
      const hay = `${l.razorpay_order_id ?? ""} ${l.razorpay_payment_id ?? ""} ${l.customer_name ?? ""} ${l.customer_phone ?? ""} ${l.customer_email ?? ""} ${l.error_message ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [logs, filter, search]);
  const counts = reactExports.useMemo(() => {
    const c = {
      total: logs.length,
      success: 0,
      failed: 0,
      initiated: 0
    };
    for (const l of logs) {
      if (l.event === "payment_success") c.success++;
      else if (l.event === "payment_failed" || l.event === "verification_failed" || l.event === "order_failed") c.failed++;
      else if (l.event === "order_created") c.initiated++;
    }
    return c;
  }, [logs]);
  const exportCSV = () => {
    const rows = [["Date", "Event", "Order ID", "Payment ID", "Amount", "Customer", "Phone", "Email", "Error"], ...filtered.map((l) => [new Date(l.created_at).toLocaleString(), l.event, l.razorpay_order_id ?? "", l.razorpay_payment_id ?? "", l.amount ?? "", l.customer_name ?? "", l.customer_phone ?? "", l.customer_email ?? "", l.error_message ?? ""])];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], {
      type: "text/csv"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payment-logs-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-primary mb-1", children: "Payment Logs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Every payment attempt — successful, failed, or errored — recorded in real time." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => refetch(), className: "inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-secondary text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${isFetching ? "animate-spin" : ""}` }),
          " Refresh"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportCSV, className: "inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-secondary text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
          " Export CSV"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Total Events", value: counts.total, tone: "default" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Successful", value: counts.success, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Failed", value: counts.failed, tone: "danger" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Initiated", value: counts.initiated, tone: "info" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
      EVENTS.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(e.key), className: `px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filter === e.key ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`, children: e.label }, e.key)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search order ID, payment ID, customer, error…", className: "ml-auto px-3 py-1.5 rounded-lg border border-border bg-background text-sm w-full sm:w-80" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-xl overflow-hidden bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "When" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Order / Payment ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Error" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center py-10 text-muted-foreground", children: "Loading…" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center py-10 text-muted-foreground", children: "No payment logs yet. Logs will appear here whenever a checkout is attempted." }) }) : filtered.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-nowrap text-xs text-muted-foreground", children: new Date(l.created_at).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: eventBadge(l.event) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-mono text-xs", children: [
          l.razorpay_order_id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: l.razorpay_order_id }),
          l.razorpay_payment_id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: l.razorpay_payment_id }),
          !l.razorpay_order_id && !l.razorpay_payment_id && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-sm", children: [
          l.customer_name || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }),
          l.customer_phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: l.customer_phone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right whitespace-nowrap", children: l.amount != null ? `₹${Number(l.amount).toLocaleString("en-IN")}` : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-destructive max-w-xs", children: l.error_message || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) })
      ] }, l.id)) })
    ] }) })
  ] });
}
function StatTile({
  label,
  value,
  tone
}) {
  const cls = tone === "success" ? "from-green-500/10 to-green-500/5 text-green-700 dark:text-green-400" : tone === "danger" ? "from-red-500/10 to-red-500/5 text-red-700 dark:text-red-400" : tone === "info" ? "from-blue-500/10 to-blue-500/5 text-blue-700 dark:text-blue-400" : "from-secondary to-secondary/50 text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl border border-border p-4 bg-gradient-to-br ${cls}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider opacity-80", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display mt-1", children: value })
  ] });
}
export {
  AdminPaymentLogs as component
};
