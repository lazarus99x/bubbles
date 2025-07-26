import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Utensils,
  Users,
  Tag,
  Image,
  Settings,
  Phone,
} from "lucide-react";
import HeroImageManager from "./HeroImageManager";
import SiteSettingsManager from "./SiteSettingsManager";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/contexts/useSiteSettings";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { settings } = useSiteSettings();
  const [showHeroManager, setShowHeroManager] = useState(false);
  const [showSiteSettings, setShowSiteSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const handleBack = () => {
    setShowHeroManager(false);
    setShowSiteSettings(false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome back, Admin
        </h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      {showHeroManager ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <HeroImageManager />
          <Button variant="outline" className="mt-4" onClick={handleBack}>
            Back to Dashboard
          </Button>
        </div>
      ) : showSiteSettings ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <SiteSettingsManager />
          <Button variant="outline" className="mt-4" onClick={handleBack}>
            Back to Dashboard
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer bg-white border border-gray-200"
            onClick={() => setActiveTab("menu")}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-gray-900">
                Menu Items
              </CardTitle>
              <Utensils className="h-5 w-5 text-pink-500" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Manage your restaurant dishes
              </CardDescription>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer bg-white border border-gray-200"
            onClick={() => setActiveTab("categories")}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-gray-900">
                Categories
              </CardTitle>
              <Tag className="h-5 w-5 text-pink-500" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Organize dishes by categories
              </CardDescription>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer bg-white border border-gray-200"
            onClick={() => setActiveTab("users")}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-gray-900">
                Users
              </CardTitle>
              <Users className="h-5 w-5 text-pink-500" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Manage user accounts
              </CardDescription>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer bg-white border border-gray-200"
            onClick={() => setShowHeroManager(true)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-gray-900">
                Hero Image
              </CardTitle>
              <Image className="h-5 w-5 text-pink-500" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Update landing page appearance
              </CardDescription>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer bg-white border border-gray-200"
            onClick={() => setShowSiteSettings(true)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-gray-900">
                Contact & Address
              </CardTitle>
              <Phone className="h-5 w-5 text-pink-500" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Manage contact information and address
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
