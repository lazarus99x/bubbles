import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAllSiteSettings,
  updateSiteSetting,
  SiteSettings,
} from "@/integrations/supabase/siteSettings";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  updateSetting: (key: string, value: string) => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: SiteSettings = {
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

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const fetchedSettings = await getAllSiteSettings();
      // Merge with defaults in case some settings are missing
      setSettings({ ...defaultSettings, ...fetchedSettings });
    } catch (error) {
      console.error("Failed to load site settings:", error);
      // If we fail to load, fall back to defaults
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSetting = async (key: string, value: string) => {
    if (!isAdmin) {
      toast.error("Only admins can update site settings");
      return;
    }

    try {
      // Update the setting in local state first for immediate UI feedback
      setSettings((prevSettings) => ({
        ...prevSettings,
        [key]: value,
      }));

      // Then update in the database
      await updateSiteSetting(key, value);
      toast.success("Setting updated successfully");
    } catch (error) {
      // If the update fails, revert to the previous state
      toast.error("Failed to update setting");
      await fetchSettings();
    }
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        loading,
        updateSetting,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};
