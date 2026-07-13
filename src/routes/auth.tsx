import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — VedaKits" }] }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();
  const { user } = useAuth();

  if (user) {
    setTimeout(() => nav({ to: "/admin" }), 0);
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin`, data: { full_name: name } },
        });
        if (error) throw error;
        toast.success("Account created. You're signed in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
      }
      nav({ to: "/admin" });
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-secondary/40">
      <div className="w-full max-w-md bg-background border border-border rounded-2xl shadow-soft p-8">
        <h1 className="font-display text-3xl text-primary text-center">{mode === "login" ? "Sign In" : "Create Account"}</h1>
        <p className="text-center text-sm text-muted-foreground mt-2">Access your orders & admin dashboard</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <input className="w-full px-4 py-3 rounded-lg border border-border bg-background" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
          )}
          <input type="email" className="w-full px-4 py-3 rounded-lg border border-border bg-background" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" minLength={6} className="w-full px-4 py-3 rounded-lg border border-border bg-background" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button disabled={busy} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-glow transition-smooth disabled:opacity-60">
            {busy ? "Please wait…" : mode === "login" ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="mt-4 w-full text-sm text-primary hover:underline">
          {mode === "login" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
        <Link to="/" className="block mt-6 text-center text-xs text-muted-foreground hover:text-primary">← Back to store</Link>
      </div>
    </div>
  );
}
