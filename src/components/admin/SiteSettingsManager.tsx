import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSiteSettings } from "@/contexts/useSiteSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Save,
  Building,
  AlertCircle,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const SiteSettingsManager: React.FC = () => {
  const { settings, loading, updateSetting, refreshSettings } =
    useSiteSettings();

  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantSlogan, setRestaurantSlogan] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load settings into state when they're available
  useEffect(() => {
    if (!loading) {
      setRestaurantName(settings.restaurant_name || "");
      setRestaurantSlogan(settings.restaurant_slogan || "");
      setContactPhone(settings.contact_phone || "");
      setContactEmail(settings.contact_email || "");
      setAddressLine1(settings.address_line1 || "");
      setAddressLine2(settings.address_line2 || "");
      setWhatsappNumber(settings.whatsapp_number || "");
    }
  }, [settings, loading]);

  const handleSaveSettings = async (section: string) => {
    setIsSaving(true);
    try {
      switch (section) {
        case "general":
          await updateSetting("restaurant_name", restaurantName);
          await updateSetting("restaurant_slogan", restaurantSlogan);
          break;
        case "contact":
          await updateSetting("contact_phone", contactPhone);
          await updateSetting("contact_email", contactEmail);
          await updateSetting("whatsapp_number", whatsappNumber);
          break;
        case "address":
          await updateSetting("address_line1", addressLine1);
          await updateSetting("address_line2", addressLine2);
          break;
        default:
          toast.error("Unknown settings section");
          return;
      }

      toast.success(
        `${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully`
      );

      // Refresh settings to ensure we have the latest data
      await refreshSettings();
    } catch (error) {
      console.error(`Error saving ${section} settings:`, error);
      toast.error(`Failed to save ${section} settings`);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-bubbles-pink border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
          Site Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your restaurant's information displayed across the website
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 bg-white dark:bg-gray-800 shadow-sm">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Phone className="h-4 w-4" /> Contact
          </TabsTrigger>
          <TabsTrigger value="address" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Address
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" /> Restaurant Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="restaurant-name">Restaurant Name</Label>
                <Input
                  id="restaurant-name"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder="Your restaurant name"
                  className="bg-white dark:bg-gray-800 text-black dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="restaurant-slogan">Slogan/Tagline</Label>
                <Input
                  id="restaurant-slogan"
                  value={restaurantSlogan}
                  onChange={(e) => setRestaurantSlogan(e.target.value)}
                  placeholder="Your restaurant slogan"
                  className="bg-white dark:bg-gray-800 text-black dark:text-white"
                />
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => handleSaveSettings("general")}
                  className="bg-bubbles-pink hover:bg-bubbles-pink/80"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" /> Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone Number</Label>
                <Input
                  id="contact-phone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="(123) 456-7890"
                  className="bg-white dark:bg-gray-800 text-black dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Email Address</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="contact@bubblesrestaurant.pro"
                  className="bg-white dark:bg-gray-800 text-black dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">
                  WhatsApp Number (with country code)
                </Label>
                <Input
                  id="whatsapp-number"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+2347088081689"
                  className="bg-white dark:bg-gray-800 text-black dark:text-white"
                />
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Include country code
                  (e.g., +234 for Nigeria)
                </p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => handleSaveSettings("contact")}
                  className="bg-bubbles-pink hover:bg-bubbles-pink/80"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address-line1">Address Line 1</Label>
                <Input
                  id="address-line1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="Old Ughelli/Warri Road, opposite former Ecoban"
                  className="bg-white dark:bg-gray-800 text-black dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address-line2">
                  Address Line 2 (City, State, Zip)
                </Label>
                <Input
                  id="address-line2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="Agbarho, Delta State"
                  className="bg-white dark:bg-gray-800 text-black dark:text-white"
                />
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => handleSaveSettings("address")}
                  className="bg-bubbles-pink hover:bg-bubbles-pink/80"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettingsManager;
