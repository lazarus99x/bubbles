-- Create site_settings table for storing configurable website content
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    setting_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create RLS policies for site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow admins to do everything
CREATE POLICY "Admins can do everything with site settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Allow all users to read site settings
CREATE POLICY "Anyone can view site settings"
ON public.site_settings
FOR SELECT
TO anon, authenticated
USING (true);

-- Insert default values
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
('whatsapp_number', '+2347012345678', 'phone');

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update the updated_at timestamp
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
