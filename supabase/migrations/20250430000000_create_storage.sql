-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('dish_images', 'dish_images', true),
  ('hero_images', 'hero_images', true)
ON CONFLICT (id) DO NOTHING;

-- Clean up existing policies if they exist
DROP POLICY IF EXISTS "Public Access to Dish Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Access to Hero Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload Dish Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload Hero Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update Dish Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update Hero Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete Dish Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete Hero Images" ON storage.objects;

-- Set up policies for dish_images bucket
CREATE POLICY "Public Access to Dish Images" ON storage.objects FOR SELECT
USING (bucket_id = 'dish_images');

CREATE POLICY "Authenticated Upload Dish Images" ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'dish_images'
  AND (CASE
    WHEN LOWER(RIGHT(name, 4)) IN ('.jpg', 'jpeg', '.png', '.gif', 'webp') THEN true
    ELSE false
  END)
  AND LENGTH(name) < 255
);

CREATE POLICY "Authenticated Update Dish Images" ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'dish_images')
WITH CHECK (bucket_id = 'dish_images');

CREATE POLICY "Authenticated Delete Dish Images" ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'dish_images');

-- Set up policies for hero_images bucket
CREATE POLICY "Public Access to Hero Images" ON storage.objects FOR SELECT
USING (bucket_id = 'hero_images');

CREATE POLICY "Authenticated Upload Hero Images" ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'hero_images'
  AND (CASE
    WHEN LOWER(RIGHT(name, 4)) IN ('.jpg', 'jpeg', '.png', '.gif', 'webp') THEN true
    ELSE false
  END)
  AND LENGTH(name) < 255
);

CREATE POLICY "Authenticated Update Hero Images" ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'hero_images')
WITH CHECK (bucket_id = 'hero_images');

CREATE POLICY "Authenticated Delete Hero Images" ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'hero_images');

-- Ensure RLS is enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS storage_objects_bucket_id_name_idx ON storage.objects (bucket_id, name);

-- Notify about successful setup
DO $$
BEGIN
  RAISE NOTICE 'Storage buckets and policies have been created successfully!';
END $$;