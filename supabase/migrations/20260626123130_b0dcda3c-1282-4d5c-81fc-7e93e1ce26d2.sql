
-- 1) Restrict SECURITY DEFINER function execution.
-- has_role is still callable from RLS policies regardless of EXECUTE grants.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
-- claim_first_admin must remain callable by signed-in users (used from the admin page).
REVOKE EXECUTE ON FUNCTION public.claim_first_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;

-- 2) Storage: stop allowing listing of the product-images bucket via the Data API.
-- Files remain accessible via their direct public URLs (bucket is public).
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;

-- 3) payment_logs: explicit deny on client inserts, and let users see their own logs.
DROP POLICY IF EXISTS "no client inserts on payment logs" ON public.payment_logs;
CREATE POLICY "no client inserts on payment logs"
  ON public.payment_logs
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

DROP POLICY IF EXISTS "users view own payment logs" ON public.payment_logs;
CREATE POLICY "users view own payment logs"
  ON public.payment_logs
  FOR SELECT
  TO authenticated
  USING (user_id IS NOT NULL AND user_id = auth.uid());

-- 4) user_roles: explicit deny on self-insert/update/delete by non-admins.
-- The existing "admins manage roles" ALL policy still permits admin operations.
DROP POLICY IF EXISTS "no self role insert" ON public.user_roles;
CREATE POLICY "no self role insert"
  ON public.user_roles
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "no self role update" ON public.user_roles;
CREATE POLICY "no self role update"
  ON public.user_roles
  FOR UPDATE
  TO anon, authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "no self role delete" ON public.user_roles;
CREATE POLICY "no self role delete"
  ON public.user_roles
  FOR DELETE
  TO anon, authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));
