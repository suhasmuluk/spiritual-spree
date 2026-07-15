import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthCtx = {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkRole = async (uid: string | undefined) => {
    if (!uid) { setIsAdmin(false); return; }
    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", uid).eq("role", "admin").maybeSingle();
    if (error) {
      console.error("Failed to load user role", error);
      setIsAdmin(false);
      return;
    }
    setIsAdmin(!!data);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(true);
      setTimeout(() => {
        checkRole(s?.user?.id).finally(() => setLoading(false));
      }, 0);
    });
    supabase.auth.getSession()
      .then(({ data: { session: s } }) => {
        setSession(s);
        setUser(s?.user ?? null);
        return checkRole(s?.user?.id);
      })
      .catch((error) => {
        console.error("Failed to load auth session", error);
        setSession(null);
        setUser(null);
        setIsAdmin(false);
      })
      .finally(() => setLoading(false));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Ctx.Provider value={{
      user, session, isAdmin, loading,
      signOut: async () => { await supabase.auth.signOut(); },
      refreshRole: async () => { await checkRole(user?.id); },
    }}>{children}</Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}
