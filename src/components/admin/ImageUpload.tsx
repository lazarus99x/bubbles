import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, ImageIcon, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  imagePreview?: string;
}

export default function ImageUpload({
  onImageSelected,
  imagePreview,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      onImageSelected(file);
      setTimeout(() => setUploading(false), 500);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploading(true);
      onImageSelected(e.dataTransfer.files[0]);
      setTimeout(() => setUploading(false), 500);
    }
  };

  const triggerFileInput = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("image")?.click();
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image">Dish Image</Label>

      {imagePreview && !uploading ? (
        <div className="mt-2 mb-4 relative group">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-md border border-gray-200"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-md">
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-black border-white hover:bg-white/80 hover:text-black"
              onClick={triggerFileInput}
              type="button"
            >
              <ImageIcon className="h-4 w-4 mr-1" />
              Change Image
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
            dragActive
              ? "border-bubbles-pink bg-bubbles-pink/5"
              : "border-gray-300 hover:border-bubbles-pink"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
              <LoaderCircle className="h-8 w-8 animate-spin text-bubbles-pink" />
              <span>Processing image...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="h-10 w-10 text-gray-400" />
              <div>
                <p className="text-sm font-medium">Click or drag & drop</p>
                <p className="text-xs text-muted-foreground">
                  SVG, PNG, JPG or GIF (max 10MB)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <Input
        id="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="sr-only"
        disabled={uploading}
      />
    </div>
  );
}
