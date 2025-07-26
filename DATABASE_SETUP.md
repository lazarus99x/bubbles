# Setting Up Site Settings Database

This document explains how to set up the site settings database for Bubbles Restaurant.

## Option 1: Using the Admin Panel Database Setup

1. Log in to the admin panel with your admin credentials
2. Navigate to the "Database Setup" tab
3. Click the "Check site_settings Table" button to see if the table already exists
4. If the table doesn't exist, click the "Create Table" button
5. After creating the table, click the "Seed Initial Settings" button to populate with default values

## Option 2: Manual SQL Execution in Supabase Dashboard

If you prefer to set up the database manually:

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Copy the SQL from `supabase/migrations/20250725000000_create_site_settings.sql`
4. Paste it into the SQL Editor and run it

## Option 3: Using Supabase CLI (Advanced)

If you have Supabase CLI installed:

```bash
cd [project_root]
supabase migration up
```

## Troubleshooting

If you encounter issues with site settings not updating:

1. Check if the table exists using the Database Setup tab
2. Verify that your user has admin privileges
3. Check the browser console for any error messages
4. Try using the Test Update Setting feature in the Database Setup tab

## Database Schema

The site_settings table has the following structure:

```sql
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type TEXT NOT NULL DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Key Settings

| Setting Key       | Description                          | Type    |
| ----------------- | ------------------------------------ | ------- |
| hero_image_url    | URL for the hero background image    | image   |
| contact_phone     | Restaurant contact phone number      | phone   |
| contact_email     | Restaurant email address             | email   |
| address_line1     | First line of restaurant address     | text    |
| address_line2     | Second line of address (city, state) | text    |
| restaurant_name   | Name of the restaurant               | text    |
| restaurant_slogan | Tagline shown in various places      | text    |
| show_3d_pizza     | Whether to show 3D model             | boolean |
| whatsapp_number   | Number used for WhatsApp buttons     | phone   |
