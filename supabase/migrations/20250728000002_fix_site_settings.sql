-- Create site_settings table and policies for proper functionality
-- This ensures site settings can be read by everyone and updated by admins

-- Create the site_settings table first
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    setting_type TEXT NOT NULL DEFAULT 'text',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (only after table exists)
DROP POLICY IF EXISTS "Admins can do everything with site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Anyone can view site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin users can insert site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin users can update site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin users can delete site settings" ON public.site_settings;

-- Allow everyone (including anonymous users) to read site settings
CREATE POLICY "Anyone can view site settings" ON public.site_settings
    FOR SELECT 
    USING (true);

-- Allow only authenticated admin users to insert site settings
CREATE POLICY "Admin users can insert site settings" ON public.site_settings
    FOR INSERT 
    WITH CHECK (
        auth.uid() IS NOT NULL 
        AND (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
    );

-- Allow only authenticated admin users to update site settings  
CREATE POLICY "Admin users can update site settings" ON public.site_settings
    FOR UPDATE 
    USING (
        auth.uid() IS NOT NULL 
        AND (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
    );

-- Allow only authenticated admin users to delete site settings
CREATE POLICY "Admin users can delete site settings" ON public.site_settings
    FOR DELETE 
    USING (
        auth.uid() IS NOT NULL 
        AND (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
    );

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists and create new one
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at 
    BEFORE UPDATE ON public.site_settings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_site_settings_updated_at();

-- Upsert default values (insert if not exists, update if exists)
INSERT INTO public.site_settings (setting_key, setting_value, setting_type)
VALUES 
    ('hero_image_url', '/images/hero.jpg', 'image'),
    ('contact_phone', '+2347088081689', 'phone'),
    ('contact_email', 'contact@bubblesrestaurant.pro', 'email'),
    ('address_line1', 'Old Ughelli/Warri Road, opposite former Ecoban', 'text'),
    ('address_line2', 'Agbarho, Delta State, Nigeria', 'text'),
    ('restaurant_name', 'Bubbles Restaurant', 'text'),
    ('restaurant_slogan', 'Bringing you the best taste of Nigeria', 'text'),
    ('show_3d_pizza', 'true', 'boolean'),
    ('whatsapp_number', '+2347088081689', 'phone')
ON CONFLICT (setting_key) 
DO UPDATE SET 
    setting_value = EXCLUDED.setting_value,
    setting_type = EXCLUDED.setting_type,
    updated_at = now();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON public.site_settings(setting_key);
