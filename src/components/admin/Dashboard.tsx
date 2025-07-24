import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Utensils, Users, Tag, Image } from "lucide-react";
import HeroImageManager from "./HeroImageManager";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showHeroManager, setShowHeroManager] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [heroImageUrl, setHeroImageUrl] = useState(
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  );
  const [pizzaVisible, setPizzaVisible] = useState(true);

  // Load the hero image URL and pizza visibility from localStorage on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem("heroBackgroundImage");
    if (savedImage) {
      setHeroImageUrl(savedImage);
    }

    const pizzaVisibility = localStorage.getItem("heroPizzaVisible");
    if (pizzaVisibility !== null) {
      setPizzaVisible(pizzaVisibility === "true");
    }
  }, []);

  const handleUpdateHeroImage = (newUrl: string) => {
    setHeroImageUrl(newUrl);
    // Save to localStorage so it persists
    localStorage.setItem("heroBackgroundImage", newUrl);
  };

  const handleTogglePizza = (visible: boolean) => {
    setPizzaVisible(visible);
    // Save to localStorage so it persists
    localStorage.setItem("heroPizzaVisible", visible.toString());
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
          <HeroImageManager
            currentImageUrl={heroImageUrl}
            onUpdateImage={handleUpdateHeroImage}
            pizzaVisible={pizzaVisible}
            onTogglePizza={handleTogglePizza}
          />
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setShowHeroManager(false)}
          >
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
        </div>
      )}
    </div>
  );
};

export default Dashboard;
