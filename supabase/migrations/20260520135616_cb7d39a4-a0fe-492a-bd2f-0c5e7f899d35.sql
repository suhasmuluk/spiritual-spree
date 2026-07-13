
CREATE TABLE public.payment_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event TEXT NOT NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount NUMERIC,
  currency TEXT DEFAULT 'INR',
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  receipt TEXT,
  error_message TEXT,
  notes JSONB DEFAULT '{}'::jsonb,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_payment_logs_created_at ON public.payment_logs (created_at DESC);
CREATE INDEX idx_payment_logs_event ON public.payment_logs (event);
CREATE INDEX idx_payment_logs_order_id ON public.payment_logs (razorpay_order_id);

ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins view all payment logs"
  ON public.payment_logs FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));
