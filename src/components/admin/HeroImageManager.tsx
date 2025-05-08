
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { uploadImage } from '@/integrations/supabase/storage';
import { LoaderCircle, ImageIcon } from 'lucide-react';

interface HeroImageManagerProps {
  currentImageUrl: string;
  onUpdateImage: (newUrl: string) => void;
  pizzaVisible: boolean;
  onTogglePizza: (visible: boolean) => void;
}

const HeroImageManager: React.FC<HeroImageManagerProps> = ({ 
  currentImageUrl, 
  onUpdateImage,
  pizzaVisible,
  onTogglePizza
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(currentImageUrl);
  const [customUrl, setCustomUrl] = useState("");
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setUploading(true);
      
      // Show file reader preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      // Upload to Supabase
      const result = await uploadImage(file, `hero_${Date.now()}.${file.name.split('.').pop()}`);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      // Update the image URL
      if (result.publicUrl) {
        onUpdateImage(result.publicUrl);
        toast.success("Hero image updated successfully");
      }
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };
  
  const handleUseCustomUrl = () => {
    if (customUrl.trim()) {
      setImagePreview(customUrl);
      onUpdateImage(customUrl);
      toast.success("Hero image updated successfully");
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Hero Section</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="rounded-lg border overflow-hidden aspect-video">
            <img 
              src={imagePreview} 
              alt="Hero Preview" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {uploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-bubbles-pink h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hero-image">Upload New Image</Label>
            <Input 
              id="hero-image" 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {uploading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LoaderCircle className="h-3 w-3 animate-spin" />
                <span>Uploading image...</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="custom-url">Or use image URL</Label>
            <div className="flex gap-2">
              <Input 
                id="custom-url" 
                placeholder="https://example.com/image.jpg" 
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
              />
              <Button 
                onClick={handleUseCustomUrl} 
                disabled={!customUrl.trim()}
                type="button"
              >
                <ImageIcon className="h-4 w-4 mr-1" />
                Use
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 border-t pt-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-pizza">Show 3D Pizza Model</Label>
              <Switch 
                id="show-pizza" 
                checked={pizzaVisible}
                onCheckedChange={onTogglePizza}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              When enabled, a 3D pizza model will be displayed on the hero section
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImageManager;
