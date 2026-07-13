-- Tighten orders insert policy: require authenticated user matching user_id
DROP POLICY IF EXISTS "users create own orders" ON public.orders;
CREATE POLICY "users create own orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Restrict order_items insert to authenticated users only
DROP POLICY IF EXISTS "users insert own order items" ON public.order_items;
CREATE POLICY "users insert own order items"
ON public.order_items
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id AND o.user_id = auth.uid()
  )
);

-- Lock down has_role and claim_first_admin: revoke anonymous EXECUTE
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.claim_first_admin() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;