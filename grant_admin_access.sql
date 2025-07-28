-- Grant admin access to contact@bubblesrestaurant.pro
-- Run this SQL in your Supabase dashboard under SQL Editor

UPDATE auth.users 
SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
WHERE email = 'contact@bubblesrestaurant.pro';

-- Verify the update
SELECT id, email, raw_user_meta_data 
FROM auth.users 
WHERE email = 'contact@bubblesrestaurant.pro';
