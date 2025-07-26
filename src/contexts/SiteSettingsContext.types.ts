import { createContext } from "react";
import { SiteSettings } from "@/integrations/supabase/siteSettings";

export interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  updateSetting: (key: string, value: string) => Promise<void>;
  refreshSettings: () => Promise<void>;
}

export const defaultSettings: SiteSettings = {
  hero_image_url: "/images/hero.jpg",
  contact_phone: "(123) 456-7890",
  contact_email: "hello@bubblesrestaurant.com",
  address_line1: "123 Bubble Street",
  address_line2: "Foodie City, FC 12345",
  restaurant_name: "Bubbles",
  restaurant_slogan: "Bringing you the best taste of Nigeria",
  show_3d_pizza: "true",
  whatsapp_number: "+2347012345678",
};

export const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  loading: true,
  updateSetting: async () => {},
  refreshSettings: async () => {},
});
