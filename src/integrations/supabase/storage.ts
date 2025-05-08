import { supabase } from "./client";

// Maximum file size in bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed file types
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

// Initialize storage buckets
export const initializeStorage = async () => {
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      console.error("Error checking buckets:", error);
      return;
    }

    const dishImagesBucketExists = buckets.some(
      (bucket) => bucket.name === "dish_images"
    );

    if (!dishImagesBucketExists) {
      console.error(
        "dish_images bucket not found - please create it in Supabase dashboard"
      );
    }
  } catch (error) {
    console.error("Error initializing storage:", error);
  }
};

// Generate a unique filename with proper extension
const generateUniqueFilename = (file: File, prefix: string = "") => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  return `${prefix}${timestamp}_${randomString}.${extension}`;
};

// Upload an image to Supabase storage
export const uploadImage = async (file: File, folderPath: string = "") => {
  try {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      };
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return {
        success: false,
        error:
          "File type not supported. Please upload a JPEG, PNG, or GIF image.",
      };
    }

    // Generate unique filename
    const filename = generateUniqueFilename(
      file,
      folderPath ? `${folderPath}/` : ""
    );

    // Attempt upload
    const { data, error } = await supabase.storage
      .from("dish_images")
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: true, // Allow overwriting
      });

    if (error) {
      console.error("Error uploading image:", error);
      return {
        success: false,
        error: error.message || "Failed to upload image. Please try again.",
      };
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("dish_images")
      .getPublicUrl(filename);

    if (!publicUrlData?.publicUrl) {
      return {
        success: false,
        error: "Failed to generate public URL for uploaded image.",
      };
    }

    return {
      success: true,
      filePath: data?.path,
      publicUrl: publicUrlData.publicUrl,
    };
  } catch (error: unknown) {
    console.error("Exception uploading image:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Delete an image from Supabase storage
export const deleteImage = async (filePath: string) => {
  try {
    if (!filePath) {
      return { success: false, error: "No file path provided" };
    }

    const { error } = await supabase.storage
      .from("dish_images")
      .remove([filePath]);

    if (error) {
      console.error("Error deleting image:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Exception deleting image:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return { success: false, error: errorMessage };
  }
};

// Get a public URL for an image
export const getPublicUrl = (filePath: string) => {
  if (!filePath) return null;

  const { data } = supabase.storage.from("dish_images").getPublicUrl(filePath);

  return data?.publicUrl || null;
};
