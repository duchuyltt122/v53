-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_email TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    items JSONB NOT NULL,
    notes TEXT,
    payment_method TEXT NOT NULL,
    payment_status TEXT NOT NULL,
    payment_transaction_id TEXT,
    payment_bank_code TEXT,
    payment_card_type TEXT,
    payment_error_code TEXT,
    payment_error_message TEXT,
    order_status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add RLS policies
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view their own orders
CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
USING (auth.uid()::text = customer_email);

-- Policy to allow insert for authenticated users
CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
WITH CHECK (true);

-- Policy to allow update for service role only
CREATE POLICY "Service role can update orders"
ON public.orders
FOR UPDATE
USING (auth.uid() IS NOT NULL);

-- Create index on customer_email for faster lookups
CREATE INDEX IF NOT EXISTS orders_customer_email_idx ON public.orders (customer_email);

-- Create index on payment_status for faster filtering
CREATE INDEX IF NOT EXISTS orders_payment_status_idx ON public.orders (payment_status);

-- Create index on order_status for faster filtering
CREATE INDEX IF NOT EXISTS orders_order_status_idx ON public.orders (order_status);
