-- Fix site_settings table RLS policies
-- Drop existing policies
DROP POLICY IF EXISTS "Admins can do everything with site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Anyone can view site settings" ON public.site_settings;

-- Create new simplified policies
-- Allow all authenticated users to manage site settings (since we removed complex admin checking)
CREATE POLICY "Authenticated users can manage site settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow anonymous users to read site settings
CREATE POLICY "Anyone can view site settings"
ON public.site_settings
FOR SELECT
TO anon, authenticated
USING (true);

-- Ensure the table has the correct structure and default data
INSERT INTO public.site_settings (setting_key, setting_value, setting_type)
VALUES 
('hero_image_url', '/images/hero.jpg', 'image'),
('contact_phone', '(123) 456-7890', 'text'),
('contact_email', 'hello@bubblesrestaurant.com', 'email'),
('address_line1', '123 Bubble Street', 'text'),
('address_line2', 'Foodie City, FC 12345', 'text'),
('restaurant_name', 'Bubbles', 'text'),
('restaurant_slogan', 'Bringing you the best taste of Nigeria', 'text'),
('show_3d_pizza', 'true', 'boolean'),
('whatsapp_number', '2348000000000', 'text')
ON CONFLICT (setting_key) DO NOTHING;
