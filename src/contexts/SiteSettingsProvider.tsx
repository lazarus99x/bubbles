import React, { useState, useEffect } from "react";
import {
  getAllSiteSettings,
  updateSiteSetting,
} from "@/integrations/supabase/siteSettings";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import {
  SiteSettingsContext,
  defaultSettings,
  SiteSettingsContextType,
} from "./SiteSettingsContext.types";

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState(defaultSettings);
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
