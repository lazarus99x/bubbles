# Site Management Features

## Overview

The admin panel now includes comprehensive site management features that allow you to customize various aspects of your website without having to modify code directly. These changes are connected to the frontend, so updates made in the admin panel will appear throughout the website.

## Features

### 1. Hero Image Management

- Upload new hero background images directly from your device
- Use custom image URLs from the web
- Toggle the 3D pizza model visibility on the landing page

### 2. Contact Information Management

- Update phone number displayed on the website
- Change email address
- Set WhatsApp number for order buttons (include country code)

### 3. Address Management

- Update restaurant address information
- Changes will appear in the footer and contact sections

### 4. General Information

- Change restaurant name
- Update slogan/tagline displayed across the site

## Technical Details

All site settings are stored in a Supabase database table and loaded dynamically when the website starts. The site uses a context provider pattern to make these settings available throughout the application.

### Database Structure

```sql
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    setting_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Key Settings

| Setting Key       | Description                           |
| ----------------- | ------------------------------------- |
| hero_image_url    | URL for the hero background image     |
| contact_phone     | Restaurant contact phone number       |
| contact_email     | Restaurant email address              |
| address_line1     | First line of restaurant address      |
| address_line2     | Second line of address (city, state)  |
| restaurant_name   | Name of the restaurant                |
| restaurant_slogan | Tagline shown in various places       |
| show_3d_pizza     | Whether to show 3D model (true/false) |
| whatsapp_number   | Number used for WhatsApp buttons      |

## Usage Instructions

1. Log in to the admin panel
2. On the dashboard, click "Hero Image" to manage the landing page hero image
3. Click "Contact & Address" to update contact information and address details
4. Changes are saved instantly and will be visible to all users
