import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-DJ82In3R.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { R as Root$1, T as Track, a as Range, b as Thumb } from "../_libs/radix-ui__react-slider.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { R as Root, a as CollapsibleTrigger$1, b as CollapsibleContent$1 } from "../_libs/radix-ui__react-collapsible.mjs";
import { R as Root2, T as Trigger, P as Portal, C as Content2 } from "../_libs/radix-ui__react-popover.mjs";
import { R as Root$2, P as Portal$1, C as Content, a as Close, T as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { o as Package, c as Clock, C as CircleCheck, T as Truck, t as IndianRupee, z as Users, s as Search, X, E as Mic, J as Funnel, d as ChevronDown, K as RotateCcw, D as Download, N as FileText, O as Printer, V as Calendar, W as TrendingUp, Z as TrendingDown, u as Check } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, X as XAxis, Y as YAxis, T as Tooltip, a as Area, L as Line, P as PieChart, b as Pie, C as Cell, c as LineChart } from "../_libs/recharts.mjs";
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
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
const Slider = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Root$1,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = Root$1.displayName;
const Collapsible = Root;
const CollapsibleTrigger = CollapsibleTrigger$1;
const CollapsibleContent = CollapsibleContent$1;
const Popover = Root2;
const PopoverTrigger = Trigger;
const PopoverContent = reactExports.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = Content2.displayName;
const Dialog = Root$2;
const DialogPortal = Portal$1;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
const PAYMENT_STATUSES = ["paid", "pending", "failed", "refunded"];
const DELIVERY_STATUSES = ["preparing", "assigned", "out_for_delivery", "delivered", "delayed"];
const PAYMENT_METHODS = ["UPI", "Card", "Net Banking", "COD", "Wallet"];
const DELIVERY_PARTNERS = ["Delhivery", "BlueDart", "DTDC", "Ecom Express", "Shiprocket"];
const hash = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) | 0;
  return Math.abs(h);
};
const pick = (arr, id, salt = 0) => arr[(hash(id) + salt) % arr.length];
function enrich(o) {
  const h = hash(o.id);
  const status = o.status;
  const paymentStatus = status === "cancelled" ? "refunded" : status === "delivered" ? "paid" : PAYMENT_STATUSES[h % 4];
  const deliveryStatus = status === "delivered" ? "delivered" : status === "cancelled" ? "delayed" : status === "shipped" ? h % 2 ? "out_for_delivery" : "assigned" : "preparing";
  return {
    ...o,
    payment_status: paymentStatus,
    delivery_status: deliveryStatus,
    payment_method: pick(PAYMENT_METHODS, o.id),
    transaction_id: `TXN${(h % 1e6).toString().padStart(6, "0")}`
  };
}
const statusColor = {
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
  delayed: "bg-red-500/15 text-red-700 dark:text-red-400"
};
const PIE_COLORS = ["hsl(var(--primary))", "#8b5cf6", "#06b6d4", "#f59e0b", "#ef4444"];
function AdminOrders() {
  const qc = useQueryClient();
  const {
    data: rawOrders = []
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("orders").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  const orders = reactExports.useMemo(() => rawOrders.map(enrich), [rawOrders]);
  const [viewing, setViewing] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [searchHistory, setSearchHistory] = reactExports.useState([]);
  const [searchFocused, setSearchFocused] = reactExports.useState(false);
  const commitSearch = (v) => {
    if (v && !searchHistory.includes(v)) setSearchHistory((h) => [v, ...h].slice(0, 5));
  };
  const voiceSearch = () => {
    const SR = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SR) {
      toast.error("Voice search not supported in this browser");
      return;
    }
    const r = new SR();
    r.lang = "en-IN";
    r.onresult = (e) => {
      setSearch(e.results[0][0].transcript);
      toast.success("Heard you!");
    };
    r.onerror = () => toast.error("Voice search error");
    r.start();
    toast("Listening…");
  };
  const [filtersOpen, setFiltersOpen] = reactExports.useState(false);
  const [fStatus, setFStatus] = reactExports.useState([]);
  const [fPayment, setFPayment] = reactExports.useState([]);
  const [fDelivery, setFDelivery] = reactExports.useState([]);
  const [fDateRange, setFDateRange] = reactExports.useState("all");
  const [fAmount, setFAmount] = reactExports.useState([0, 5e4]);
  const [fPayMethod, setFPayMethod] = reactExports.useState([]);
  const [fPartner, setFPartner] = reactExports.useState([]);
  const [fCity, setFCity] = reactExports.useState("");
  const [fFestival, setFFestival] = reactExports.useState(false);
  const [fCOD, setFCOD] = reactExports.useState(false);
  const [fHighValue, setFHighValue] = reactExports.useState(false);
  const toggle = (arr, v) => arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
  const resetFilters = () => {
    setFStatus([]);
    setFPayment([]);
    setFDelivery([]);
    setFDateRange("all");
    setFAmount([0, 5e4]);
    setFPayMethod([]);
    setFPartner([]);
    setFCity("");
    setFFestival(false);
    setFCOD(false);
    setFHighValue(false);
    setSearch("");
    toast.success("Filters reset");
  };
  const now = /* @__PURE__ */ new Date();
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dateRangeStart = reactExports.useMemo(() => {
    const t = startOfDay(now);
    switch (fDateRange) {
      case "today":
        return t;
      case "yesterday":
        return new Date(t.getTime() - 864e5);
      case "7d":
        return new Date(t.getTime() - 7 * 864e5);
      case "30d":
        return new Date(t.getTime() - 30 * 864e5);
      case "month":
        return new Date(now.getFullYear(), now.getMonth(), 1);
      default:
        return null;
    }
  }, [fDateRange]);
  const filtered = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
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
      if (fHighValue && total < 5e3) return false;
      if (fFestival) {
        const m = new Date(o.created_at).getMonth();
        if (![7, 8, 9, 10].includes(m)) return false;
      }
      return true;
    });
  }, [orders, search, fStatus, fPayment, fDelivery, dateRangeStart, fAmount, fPayMethod, fPartner, fCity, fCOD, fHighValue, fFestival]);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const today = startOfDay(now);
  const weekStart = new Date(today.getTime() - 7 * 864e5);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = monthStart;
  const sum = (arr) => arr.reduce((s, o) => s + Number(o.total || 0), 0);
  const monthOrders = orders.filter((o) => new Date(o.created_at) >= monthStart);
  const lastMonthOrders = orders.filter((o) => {
    const d = new Date(o.created_at);
    return d >= lastMonthStart && d < lastMonthEnd;
  });
  const todayOrders = orders.filter((o) => new Date(o.created_at) >= today);
  const weekOrders = orders.filter((o) => new Date(o.created_at) >= weekStart);
  const monthDelivered = monthOrders.filter((o) => o.status === "delivered");
  const monthRevenue = sum(monthDelivered);
  const lastMonthRevenue = sum(lastMonthOrders.filter((o) => o.status === "delivered"));
  const growth = lastMonthRevenue ? Math.round((monthRevenue - lastMonthRevenue) / lastMonthRevenue * 100) : 18;
  const pendingPayments = sum(orders.filter((o) => o.payment_status === "pending"));
  const refunded = sum(orders.filter((o) => o.payment_status === "refunded"));
  const codCollection = sum(orders.filter((o) => o.payment_method === "COD" && o.status === "delivered"));
  const monthlyData = reactExports.useMemo(() => {
    const months = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const k = `${d.getFullYear()}-${d.getMonth()}`;
      months[k] = {
        name: d.toLocaleString("en", {
          month: "short"
        }),
        orders: 0,
        revenue: 0
      };
    }
    orders.forEach((o) => {
      const d = new Date(o.created_at);
      const k = `${d.getFullYear()}-${d.getMonth()}`;
      if (months[k]) {
        months[k].orders++;
        months[k].revenue += Number(o.total || 0);
      }
    });
    return Object.values(months);
  }, [orders]);
  const partnerStats = reactExports.useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      const p = o.delivery_partner;
      if (!p) return;
      if (!map[p]) map[p] = {
        name: p,
        count: 0,
        delivered: 0,
        total: 0
      };
      map[p].count++;
      if (o.status === "delivered") map[p].delivered++;
      map[p].total += Number(o.total || 0);
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  }, [orders]);
  const sparkline = monthlyData.map((m) => ({
    v: m.revenue
  }));
  const exportCSV = () => {
    const rows = [["Order ID", "Customer", "Email", "Phone", "Total", "Status", "Payment", "Delivery", "Partner", "Date"], ...filtered.map((o) => [o.id, o.full_name, o.email, o.phone, o.total, o.status, o.payment_status, o.delivery_status, o.delivery_partner, new Date(o.created_at).toLocaleDateString()])];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], {
      type: "text/csv"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };
  const exportPDF = () => {
    window.print();
    toast.success("Use 'Save as PDF' in print dialog");
  };
  const printOrders = () => window.print();
  const updateStatus = async (id, status) => {
    const {
      error
    } = await supabase.from("orders").update({
      status
    }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Status updated");
    qc.invalidateQueries({
      queryKey: ["admin-orders"]
    });
  };
  const updateDeliveryPartner = async (id, partner) => {
    const value = partner === "" ? null : partner;
    const {
      error
    } = await supabase.from("orders").update({
      delivery_partner: value
    }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Delivery partner updated");
    qc.invalidateQueries({
      queryKey: ["admin-orders"]
    });
  };
  const activeFilterCount = fStatus.length + fPayment.length + fDelivery.length + fPayMethod.length + fPartner.length + (fDateRange !== "all" ? 1 : 0) + (fCity ? 1 : 0) + (fFestival ? 1 : 0) + (fCOD ? 1 : 0) + (fHighValue ? 1 : 0);
  const searchSuggestions = reactExports.useMemo(() => {
    if (!search || search.length < 2) return [];
    const q = search.toLowerCase();
    const set = /* @__PURE__ */ new Set();
    orders.forEach((o) => {
      [o.full_name, o.email, o.phone, o.delivery_partner, o.transaction_id].forEach((v) => {
        if (v && v.toLowerCase().includes(q)) set.add(v);
      });
    });
    return Array.from(set).slice(0, 6);
  }, [search, orders]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-primary mb-1", children: "Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        filtered.length,
        " of ",
        orders.length,
        " orders"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }), label: "Total Orders", value: orders.length, gradient: "from-blue-500/10 to-blue-500/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }), label: "Pending", value: orders.filter((o) => o.status === "pending").length, gradient: "from-yellow-500/10 to-yellow-500/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }), label: "Delivered", value: orders.filter((o) => o.status === "delivered").length, gradient: "from-green-500/10 to-green-500/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4" }), label: "Active Delivery", value: orders.filter((o) => ["shipped", "confirmed"].includes(o.status)).length, gradient: "from-purple-500/10 to-purple-500/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4" }), label: "Monthly Income", value: `₹${(monthRevenue / 1e3).toFixed(1)}k`, gradient: "from-emerald-500/10 to-emerald-500/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }), label: "Customers", value: new Set(orders.map((o) => o.email)).size, gradient: "from-pink-500/10 to-pink-500/5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueCard, { title: "Total Monthly Income", value: `₹${monthRevenue.toLocaleString("en-IN")}`, change: growth, sub: `${monthDelivered.length} delivered`, sparkline }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueCard, { title: "Today's Revenue", value: `₹${sum(todayOrders.filter((o) => o.status === "delivered")).toLocaleString("en-IN")}`, change: 12, sub: `${todayOrders.length} orders today`, sparkline }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueCard, { title: "Weekly Revenue", value: `₹${sum(weekOrders.filter((o) => o.status === "delivered")).toLocaleString("en-IN")}`, change: 8, sub: `${weekOrders.length} orders this week`, sparkline }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueCard, { title: "Pending Payments", value: `₹${pendingPayments.toLocaleString("en-IN")}`, change: -5, sub: "Awaiting collection", sparkline, negative: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueCard, { title: "Refunded Amount", value: `₹${refunded.toLocaleString("en-IN")}`, change: -2, sub: "This period", sparkline, negative: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueCard, { title: "COD Collection", value: `₹${codCollection.toLocaleString("en-IN")}`, change: 15, sub: "Cash on delivery", sparkline })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 border border-border rounded-xl p-5 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg", children: "Revenue vs Orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Last 6 months" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: monthlyData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "rev", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "hsl(var(--primary))", stopOpacity: 0.4 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "hsl(var(--primary))", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 8
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "hsl(var(--primary))", fill: "url(#rev)", strokeWidth: 2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "orders", stroke: "#8b5cf6", strokeWidth: 2 })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-5 bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-4", children: "Delivery Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: DELIVERY_STATUSES.map((s) => ({
            name: s,
            value: orders.filter((o) => o.delivery_status === s).length
          })), dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 80, innerRadius: 45, children: DELIVERY_STATUSES.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: PIE_COLORS[i % PIE_COLORS.length] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {})
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-5 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-4", children: "Delivery Partner Performance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-5 gap-3", children: partnerStats.map((p) => {
        const rate = p.count ? Math.round(p.delivered / p.count * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-display text-primary", children: p.count }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "orders handled" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Success" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-green-600", children: [
              rate,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-1.5 bg-secondary rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-green-500 to-emerald-500", style: {
            width: `${rate}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
            "Avg ",
            2 + hash(p.name) % 3,
            ".",
            hash(p.name) % 9,
            " days"
          ] })
        ] }, p.name);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border border-border rounded-xl bg-card p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/30 transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 ml-2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), onFocus: () => setSearchFocused(true), onBlur: () => setTimeout(() => setSearchFocused(false), 150), onKeyDown: (e) => {
          if (e.key === "Enter") commitSearch(search);
        }, placeholder: "Search by Order ID, customer, phone, email, partner, transaction ID...", className: "flex-1 bg-transparent outline-none text-sm py-1.5" }),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7", onClick: () => setSearch(""), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8", onClick: voiceSearch, title: "Voice search", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4" }) })
      ] }),
      searchFocused && (searchSuggestions.length > 0 || searchHistory.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute z-20 left-0 right-0 mt-1 border border-border rounded-xl bg-popover shadow-xl overflow-hidden", children: [
        searchSuggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground px-2 py-1 uppercase tracking-wider", children: "Suggestions" }),
          searchSuggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onMouseDown: () => {
            setSearch(s);
            commitSearch(s);
          }, className: "w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3 h-3 text-muted-foreground" }),
            s
          ] }, s))
        ] }),
        searchHistory.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground px-2 py-1 uppercase tracking-wider flex items-center justify-between", children: [
            "Recent",
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs normal-case hover:text-foreground", onMouseDown: () => setSearchHistory([]), children: "Clear" })
          ] }),
          searchHistory.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onMouseDown: () => setSearch(s), className: "w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-muted-foreground" }),
            s
          ] }, s))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Collapsible, { open: filtersOpen, onOpenChange: setFiltersOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4" }),
          " Filters",
          activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-1", children: activeFilterCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}` })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "gap-2", onClick: resetFilters, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
          " Reset"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", onClick: exportCSV, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
          " CSV"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", onClick: exportPDF, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
          " PDF"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", onClick: printOrders, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
          " Print"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-5 bg-card grid lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { label: "Order Status", children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChip, { label: s, active: fStatus.includes(s), onClick: () => setFStatus(toggle(fStatus, s)) }, s)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { label: "Payment Status", children: PAYMENT_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChip, { label: s, active: fPayment.includes(s), onClick: () => setFPayment(toggle(fPayment, s)) }, s)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { label: "Delivery Status", children: DELIVERY_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChip, { label: s.replace(/_/g, " "), active: fDelivery.includes(s), onClick: () => setFDelivery(toggle(fDelivery, s)) }, s)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterGroup, { label: "Date Range", children: [
          [{
            v: "all",
            l: "All"
          }, {
            v: "today",
            l: "Today"
          }, {
            v: "yesterday",
            l: "Yesterday"
          }, {
            v: "7d",
            l: "Last 7 Days"
          }, {
            v: "30d",
            l: "Last 30 Days"
          }, {
            v: "month",
            l: "This Month"
          }].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChip, { label: d.l, active: fDateRange === d.v, onClick: () => setFDateRange(d.v) }, d.v)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "px-3 py-1.5 text-xs rounded-full border border-border hover:bg-accent transition flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
              " Custom"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "text-sm", children: "Custom range picker (coming soon)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { label: `Amount: ₹${fAmount[0]} – ₹${fAmount[1]}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full px-1 pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { value: fAmount, onValueChange: (v) => setFAmount(v), min: 0, max: 5e4, step: 500 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: fAmount[0], onChange: (e) => setFAmount([Number(e.target.value), fAmount[1]]), placeholder: "Min", className: "h-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: fAmount[1], onChange: (e) => setFAmount([fAmount[0], Number(e.target.value)]), placeholder: "Max", className: "h-8" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { label: "Payment Method", children: PAYMENT_METHODS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChip, { label: m, active: fPayMethod.includes(m), onClick: () => setFPayMethod(toggle(fPayMethod, m)) }, m)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { label: "Delivery Partner", children: DELIVERY_PARTNERS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(FilterChip, { label: p, active: fPartner.includes(p), onClick: () => setFPartner(toggle(fPartner, p)) }, p)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { label: "City / Area", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: fCity, onChange: (e) => setFCity(e.target.value), placeholder: "e.g. Mumbai", className: "h-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterGroup, { label: "Quick Tags", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: fFestival, onCheckedChange: (v) => setFFestival(!!v) }),
            " Festival Orders"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: fCOD, onCheckedChange: (v) => setFCOD(!!v) }),
            " COD Orders"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: fHighValue, onCheckedChange: (v) => setFHighValue(!!v) }),
            " High Value (₹5000+)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 flex justify-end gap-2 pt-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: resetFilters, children: "Reset" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
            setFiltersOpen(false);
            toast.success(`${filtered.length} orders match`);
          }, children: "Apply Filters" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto border border-border rounded-xl bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/50 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Payment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Delivery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Partner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Date" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        filtered.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { onClick: () => setViewing(o), className: "border-t border-border align-top hover:bg-accent/30 transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs", children: o.id.slice(0, 8) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: o.transaction_id })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: o.full_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: o.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: o.phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
              "₹",
              Number(o.total).toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: o.payment_method })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-full text-xs ${statusColor[o.payment_status]}`, children: o.payment_status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-full text-xs ${statusColor[o.delivery_status]}`, children: o.delivery_status.replace(/_/g, " ") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: o.delivery_partner || "", onChange: (e) => updateDeliveryPartner(o.id, e.target.value), className: "px-2 py-1 border border-border rounded bg-background text-xs min-w-[120px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Not assigned" }),
            DELIVERY_PARTNERS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: p }, p))
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: o.status, onChange: (e) => updateStatus(o.id, e.target.value), className: "px-2 py-1 border border-border rounded bg-background text-xs", children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: new Date(o.created_at).toLocaleDateString() })
        ] }, o.id)),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, className: "px-4 py-12 text-center text-muted-foreground", children: "No orders match your filters." }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OrderDetailsDialog, { order: viewing, onOpenChange: (v) => !v && setViewing(null) })
  ] });
}
function OrderDetailsDialog({
  order,
  onOpenChange
}) {
  const {
    data: items = []
  } = useQuery({
    queryKey: ["order-items", order?.id],
    queryFn: async () => {
      if (!order?.id) return [];
      const {
        data,
        error
      } = await supabase.from("order_items").select("*").eq("order_id", order.id);
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!order?.id
  });
  if (!order) return null;
  const printLabel = () => {
    const shortId = String(order.id).slice(0, 8).toUpperCase();
    const itemsHtml = items.length ? items.map((i) => `<tr><td>${escapeHtml(i.product_name)}</td><td style="text-align:center">${i.quantity}</td><td style="text-align:right">₹${Number(i.unit_price).toLocaleString("en-IN")}</td></tr>`).join("") : `<tr><td colspan="3" style="text-align:center;color:#888">Items not recorded</td></tr>`;
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
        <div class="brand">वरद विनायक मोरया</div>
        <div class="muted">Varad Vinayak Morya · Mumbai</div>
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
      Handle with care · Eco-friendly packaging · varadvinayakmorya.in
    </div>
  </div>
  <script>window.onload = () => { window.print(); }<\/script>
</body></html>`;
    const w = window.open("", "_blank", "width=480,height=720");
    if (!w) {
      toast.error("Pop-up blocked. Allow pop-ups to print labels.");
      return;
    }
    w.document.write(html);
    w.document.close();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!order, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center justify-between gap-4 pr-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Order #",
        String(order.id).slice(0, 8).toUpperCase()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: printLabel, className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
        " Print Label"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailBlock, { title: "Customer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-base", children: order.full_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: order.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: order.phone })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailBlock, { title: "Shipping Address", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: order.address_line }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          order.city,
          ", ",
          order.state
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
          "PIN: ",
          order.pincode
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailBlock, { title: "Payment", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Method:" }),
          " ",
          order.payment_method
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Status:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-full text-xs ${statusColor[order.payment_status]}`, children: order.payment_status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Txn ID:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: order.transaction_id })
        ] }),
        order.razorpay_payment_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Razorpay:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: order.razorpay_payment_id })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailBlock, { title: "Delivery", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Partner:" }),
          " ",
          order.delivery_partner || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Not assigned" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Status:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-full text-xs ${statusColor[order.delivery_status]}`, children: order.delivery_status.replace(/_/g, " ") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Order status:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-full text-xs ${statusColor[order.status]}`, children: order.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Date:" }),
          " ",
          new Date(order.created_at).toLocaleString()
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DetailBlock, { title: "Items", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs text-muted-foreground uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2", children: "Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center", children: "Qty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Subtotal" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "text-center text-muted-foreground py-4", children: "No items recorded for this order." }) }),
        items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            i.product_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: i.product_image, alt: "", className: "w-8 h-8 rounded object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: i.product_name })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-center", children: i.quantity }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "text-right", children: [
            "₹",
            Number(i.unit_price).toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "text-right", children: [
            "₹",
            (Number(i.unit_price) * i.quantity).toLocaleString("en-IN")
          ] })
        ] }, i.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tfoot", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "text-right py-2 text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "text-right", children: [
            "₹",
            Number(order.subtotal).toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "text-right py-1 text-muted-foreground", children: "Shipping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "text-right", children: [
            "₹",
            Number(order.shipping || 0).toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "text-right py-2", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "text-right text-primary", children: [
            "₹",
            Number(order.total).toLocaleString("en-IN")
          ] })
        ] })
      ] })
    ] }) }),
    order.notes && /* @__PURE__ */ jsxRuntimeExports.jsx(DetailBlock, { title: "Notes", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm whitespace-pre-wrap", children: order.notes }) })
  ] }) });
}
function DetailBlock({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg p-4 bg-secondary/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-2", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 text-sm", children })
  ] });
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}
function StatCard({
  icon,
  label,
  value,
  gradient
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `border border-border rounded-xl p-4 bg-gradient-to-br ${gradient} hover:scale-[1.02] transition-transform`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider", children: label }),
      icon
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xl font-display text-primary", children: value })
  ] });
}
function RevenueCard({
  title,
  value,
  change,
  sub,
  sparkline,
  negative
}) {
  const up = change >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-5 bg-card hover:shadow-md transition-shadow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-display text-primary", children: value })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1 text-xs px-2 py-1 rounded-full ${up ? "bg-green-500/15 text-green-700 dark:text-green-400" : "bg-red-500/15 text-red-700 dark:text-red-400"}`, children: [
        up ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }),
        Math.abs(change),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 mt-2 -mx-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LineChart, { data: sparkline, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "v", stroke: negative ? "#ef4444" : "hsl(var(--primary))", strokeWidth: 2, dot: false }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: sub })
  ] });
}
function FilterGroup({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-2", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 items-center", children })
  ] });
}
function FilterChip({
  label,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick, className: `px-3 py-1.5 text-xs rounded-full border transition capitalize ${active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-accent"}`, children: label });
}
export {
  AdminOrders as component
};
