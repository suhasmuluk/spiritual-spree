-- Add delivery_partner column to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_partner text DEFAULT NULL;

-- Update set_updated_at trigger to cover the new column (it already covers all columns)
-- No trigger changes needed since the existing trigger on orders covers all columns