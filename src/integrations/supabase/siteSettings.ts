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

    // First check if the setting exists
    const { data, error: checkError } = await supabase
      .from("site_settings")
      .select("id")
      .eq("setting_key", key)
      .maybeSingle();

    if (checkError) {
      console.error("❌ Error checking if setting exists:", checkError);
    }

    console.log(`📋 Setting ${key} exists:`, !!data?.id, "ID:", data?.id);

    // If the setting exists, update it
    if (data?.id) {
      console.log(`🔄 Updating existing setting: ${key}`);
      const result = await supabase
        .from("site_settings")
        .update({ setting_value: value })
        .eq("setting_key", key);

      console.log(`📋 Update operation result:`, result);

      if (result.error) {
        console.error(`❌ Error updating setting ${key}:`, result.error);
        throw result.error;
      }
      console.log(`✅ Successfully updated setting: ${key}`);
    } else {
      // If the setting doesn't exist, insert it
      console.log(`➕ Inserting new setting: ${key}`);
      const settingType = key.includes("_url")
        ? "image"
        : key.includes("email")
          ? "email"
          : key.includes("phone") || key.includes("number")
            ? "phone"
            : "text";

      console.log(`📋 Setting type determined: ${settingType}`);

      const result = await supabase.from("site_settings").insert([
        {
          setting_key: key,
          setting_value: value,
          setting_type: settingType,
        },
      ]);

      console.log(`📋 Insert operation result:`, result);

      if (result.error) {
        console.error(`❌ Error inserting setting ${key}:`, result.error);
        throw result.error;
      }
      console.log(`✅ Successfully inserted setting: ${key}`);
    }
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
