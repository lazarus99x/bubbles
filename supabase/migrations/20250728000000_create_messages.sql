-- Create messages table for customer contact form
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    read BOOLEAN DEFAULT false,
    admin_reply TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    replied_by UUID REFERENCES auth.users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read ON public.messages(read);
CREATE INDEX IF NOT EXISTS idx_messages_email ON public.messages(email);

-- Enable RLS (Row Level Security)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to insert messages (for contact form)
CREATE POLICY "Anyone can insert messages" ON public.messages
    FOR INSERT WITH CHECK (true);

-- Only authenticated admin users can view messages
CREATE POLICY "Admin users can view messages" ON public.messages
    FOR SELECT USING (
        auth.uid() IS NOT NULL 
        AND auth.jwt() ->> 'user_metadata' ->> 'role' = 'admin'
    );

-- Only authenticated admin users can update messages
CREATE POLICY "Admin users can update messages" ON public.messages
    FOR UPDATE USING (
        auth.uid() IS NOT NULL 
        AND auth.jwt() ->> 'user_metadata' ->> 'role' = 'admin'
    );

-- Only authenticated admin users can delete messages
CREATE POLICY "Admin users can delete messages" ON public.messages
    FOR DELETE USING (
        auth.uid() IS NOT NULL 
        AND auth.jwt() ->> 'user_metadata' ->> 'role' = 'admin'
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_messages_updated_at 
    BEFORE UPDATE ON public.messages 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
