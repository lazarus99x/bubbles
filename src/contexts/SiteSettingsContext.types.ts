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
  contact_phone: "+2347088081689",
  contact_email: "contact@bubblesrestaurant.pro",
  address_line1: "Old Ughelli/Warri Road, opposite former Ecoban",
  address_line2: "Agbarho, Delta State",
  restaurant_name: "Bubbles",
  restaurant_slogan: "Bringing you the best taste of Nigeria",
  show_3d_pizza: "true",
  whatsapp_number: "+2347088081689",
};

export const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  loading: true,
  updateSetting: async () => {},
  refreshSettings: async () => {},
});
