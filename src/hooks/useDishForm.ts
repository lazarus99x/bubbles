import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dish } from "@/types/dish";
import { uploadImage } from "@/integrations/supabase/storage";

interface UseDishFormProps {
  dish?: Dish;
  onSubmit: () => void;
}

export const useDishForm = ({ dish, onSubmit }: UseDishFormProps) => {
  const [name, setName] = useState(dish?.name || "");
  const [description, setDescription] = useState(dish?.description || "");
  const [price, setPrice] = useState(dish?.price?.toString() || "");
  const [category, setCategory] = useState(dish?.category || "");
  const [imagePreview, setImagePreview] = useState(dish?.image_url || "");
  const [loading, setLoading] = useState(false);
  const [isFeatured, setIsFeatured] = useState(dish?.is_featured || false);
  const [discountPrice, setDiscountPrice] = useState(
    dish?.discount_price?.toString() || ""
  );
  const [image, setImage] = useState<File | null>(null);

  const handleImageSelected = (file: File) => {
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB");
      return;
    }

    // Validate file type
    if (
      !["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
        file.type
      )
    ) {
      toast.error("Please upload a valid image file (JPEG, PNG, or GIF)");
      return;
    }

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price) {
      toast.error("Dish name and price are required");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = dish?.image_url || "";

      // Upload image if provided
      if (image) {
        const uploadResult = await uploadImage(image, "dishes");

        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Failed to upload image");
        }

        if (!uploadResult.publicUrl) {
          throw new Error("No public URL received for uploaded image");
        }

        imageUrl = uploadResult.publicUrl;
      }

      // Prepare dish data for database operation
      const dishData = {
        name,
        description,
        price: parseFloat(price),
        image_url: imageUrl,
        category,
        currency: "₦",
        is_featured: isFeatured,
        discount_price: discountPrice ? parseFloat(discountPrice) : null,
        updated_at: new Date().toISOString(),
      };

      let error;

      // Update or insert dish record
      if (dish?.id) {
        const { error: updateError } = await supabase
          .from("dishes")
          .update(dishData)
          .eq("id", dish.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("dishes")
          .insert([dishData]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(
        dish ? "Dish updated successfully" : "Dish added successfully"
      );
      onSubmit();
    } catch (error: unknown) {
      console.error("Error saving dish:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to save dish. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData: {
      name,
      description,
      price,
      category,
      imagePreview,
      loading,
      isFeatured,
      discountPrice,
    },
    setters: {
      setName,
      setDescription,
      setPrice,
      setCategory,
      setIsFeatured,
      setDiscountPrice,
    },
    handleImageSelected,
    handleSubmit,
  };
};
