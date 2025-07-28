import { supabase } from "./client";

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: "text" | "email" | "image" | "boolean" | "phone";
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  [key: string]: string;
}

/**
 * Fetch all site settings
 */
export const getAllSiteSettings = async (): Promise<SiteSettings> => {
  try {
    console.log("Fetching site settings...");
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .order("setting_key");

    if (error) {
      console.error("Supabase error fetching settings:", error);
      throw error;
    }

    console.log("Received settings data:", data);

    // Convert array of settings to key-value object for easier access
    const settings: SiteSettings = {};
    if (Array.isArray(data)) {
      data.forEach((setting: SiteSetting) => {
        settings[setting.setting_key] = setting.setting_value;
      });
    } else {
      console.warn("Received non-array data from site_settings:", data);
    }

    return settings;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    throw error;
  }
};

/**
 * Update a site setting
 */
export const updateSiteSetting = async (
  key: string,
  value: string
): Promise<void> => {
  try {
    console.log(`🔄 Updating site setting: ${key} with value: ${value}`);

    // Determine the setting type based on the key
    const settingType =
      key.includes("_url") || key.includes("image")
        ? "image"
        : key.includes("email")
          ? "email"
          : key.includes("phone") ||
              key.includes("number") ||
              key.includes("whatsapp")
            ? "phone"
            : key.includes("show_") ||
                key.includes("enable_") ||
                key.includes("_enabled")
              ? "boolean"
              : "text";

    // Use upsert (insert or update) to handle both new and existing settings
    const { data, error } = await supabase
      .from("site_settings")
      .upsert(
        {
          setting_key: key,
          setting_value: value,
          setting_type: settingType,
        },
        {
          onConflict: "setting_key",
          ignoreDuplicates: false,
        }
      )
      .select();

    if (error) {
      console.error(`❌ Error upserting setting ${key}:`, error);
      throw error;
    }

    console.log(`✅ Successfully updated setting: ${key}`, data);
  } catch (error) {
    console.error(`❌ Error updating site setting ${key}:`, error);
    throw error;
  }
};

/**
 * Fetch a single site setting by key
 */
export const getSiteSetting = async (key: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("setting_value")
      .eq("setting_key", key)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows returned
        return null;
      }
      throw error;
    }

    return data?.setting_value || null;
  } catch (error) {
    console.error(`Error fetching site setting ${key}:`, error);
    throw error;
  }
};
