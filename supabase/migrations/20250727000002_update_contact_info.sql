-- Update all contact information to new details
-- Phone: +2347088081689
-- Email: contact@bubblesrestaurant.pro
-- Address: Agbarho, Delta State. We're located on Old Ughelli/Warri Road, opposite former Ecoban

UPDATE public.site_settings 
SET setting_value = '+2347088081689' 
WHERE setting_key = 'contact_phone';

UPDATE public.site_settings 
SET setting_value = 'contact@bubblesrestaurant.pro' 
WHERE setting_key = 'contact_email';

UPDATE public.site_settings 
SET setting_value = 'Old Ughelli/Warri Road, opposite former Ecoban' 
WHERE setting_key = 'address_line1';

UPDATE public.site_settings 
SET setting_value = 'Agbarho, Delta State' 
WHERE setting_key = 'address_line2';

UPDATE public.site_settings 
SET setting_value = '+2347088081689' 
WHERE setting_key = 'whatsapp_number';
