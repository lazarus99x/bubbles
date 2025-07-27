-- Fix site_settings table with simpler RLS policies
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can do everything with site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Anyone can view site settings" ON public.site_settings;

-- Create simpler policies that work without user_roles table
-- Allow anyone to read site settings (public data)
CREATE POLICY "Public read access to site settings"
ON public.site_settings
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow authenticated users to update site settings (admin functionality)
CREATE POLICY "Authenticated users can manage site settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Update trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
