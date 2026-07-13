import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-DJ82In3R.mjs";
import { a as useAuth } from "./router-ooRAjpbC.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function AuthPage() {
  const [mode, setMode] = reactExports.useState("login");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const nav = useNavigate();
  const {
    user
  } = useAuth();
  if (user) {
    setTimeout(() => nav({
      to: "/admin"
    }), 0);
  }
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
            data: {
              full_name: name
            }
          }
        });
        if (error) throw error;
        toast.success("Account created. You're signed in.");
      } else {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success("Welcome back.");
      }
      nav({
        to: "/admin"
      });
    } catch (err) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex items-center justify-center px-4 py-16 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-background border border-border rounded-2xl shadow-soft p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-primary text-center", children: mode === "login" ? "Sign In" : "Create Account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground mt-2", children: "Access your orders & admin dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-6 space-y-4", children: [
      mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full px-4 py-3 rounded-lg border border-border bg-background", placeholder: "Full name", value: name, onChange: (e) => setName(e.target.value), required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", className: "w-full px-4 py-3 rounded-lg border border-border bg-background", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", minLength: 6, className: "w-full px-4 py-3 rounded-lg border border-border bg-background", placeholder: "Password (min 6 chars)", value: password, onChange: (e) => setPassword(e.target.value), required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: busy, className: "w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-glow transition-smooth disabled:opacity-60", children: busy ? "Please wait…" : mode === "login" ? "Sign In" : "Sign Up" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode(mode === "login" ? "signup" : "login"), className: "mt-4 w-full text-sm text-primary hover:underline", children: mode === "login" ? "New here? Create an account" : "Already have an account? Sign in" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "block mt-6 text-center text-xs text-muted-foreground hover:text-primary", children: "← Back to store" })
  ] }) });
}
export {
  AuthPage as component
};
