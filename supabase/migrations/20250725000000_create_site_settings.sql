-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type TEXT NOT NULL DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- If you don't have an admin_users table yet, create it first
-- We need to create this before setting up RLS policies that reference it
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Set up Row Level Security (RLS) for site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read
CREATE POLICY "Authenticated users can read site settings"
  ON public.site_settings
  FOR SELECT
  TO authenticated
  USING (true);
  
-- Create policy for admin users only to update/insert/delete
CREATE POLICY "Admin users can modify site settings"
  ON public.site_settings
  FOR ALL
  TO authenticated
  USING (
    -- This will allow access if the user's ID is in the admin_users table
    auth.uid() IN (
      SELECT user_id FROM public.admin_users
    )
  );

-- Insert initial settings
INSERT INTO public.site_settings (setting_key, setting_value, setting_type)
VALUES
  ('hero_image_url', '/images/hero.jpg', 'image'),
  ('contact_phone', '+1 (555) 123-4567', 'phone'),
  ('contact_email', 'info@bubblesrestaurant.com', 'email'),
  ('address_line1', '123 Main Street', 'text'),
  ('address_line2', 'New York, NY 10001', 'text'),
  ('restaurant_name', 'Bubbles Restaurant', 'text'),
  ('restaurant_slogan', 'Taste the Nigerian Experience', 'text'),
  ('show_3d_pizza', 'true', 'boolean'),
  ('whatsapp_number', '+15551234567', 'phone')
ON CONFLICT (setting_key) DO 
  UPDATE SET setting_value = EXCLUDED.setting_value,
             setting_type = EXCLUDED.setting_type,
             updated_at = now();

-- Now let's add a temporary admin user to the admin_users table
-- Replace the UUID below with your actual user ID from Supabase Auth
-- You can find this in the Supabase dashboard under Authentication > Users
DO $$
BEGIN
    -- Only try to insert if there are no admin users yet
    IF NOT EXISTS (SELECT 1 FROM public.admin_users LIMIT 1) THEN
        -- Insert the current user as an admin (will use the user who's running this script)
        INSERT INTO public.admin_users (user_id)
        SELECT auth.uid();
        
        -- If the above fails, you'll need to manually add a user by their ID
        -- For example: INSERT INTO public.admin_users (user_id) VALUES ('your-user-id-here');
    END IF;
END
$$;

-- Add RLS to admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Only allow admins to see/modify admin list
CREATE POLICY "Only admins can view admin list"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (SELECT user_id FROM public.admin_users)
  );

CREATE POLICY "Only admins can modify admin list"
  ON public.admin_users
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (SELECT user_id FROM public.admin_users)
  );

-- Create a simpler policy that allows unrestricted access to site_settings for now
-- You can enable the more restrictive policies later once you've set up admin users
CREATE POLICY "Allow all users to read and write site settings during setup"
  ON public.site_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- IMPORTANT: Delete this policy once you've set up your admin users and tested the system
-- Execute this command once everything is working:
-- DROP POLICY "Allow all users to read and write site settings during setup" ON public.site_settings;
