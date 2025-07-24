import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import DishManager from "@/components/admin/DishManager";
import CategoryManager from "@/components/admin/CategoryManager";
import UserManager from "@/components/admin/UserManager";
import MessageManager from "@/components/admin/MessageManager";
import Dashboard from "@/components/admin/Dashboard";

const Admin: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();

    // Subscribe to realtime updates for dishes
    const channel = supabase
      .channel("dishes-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "dishes",
        },
        () => {
          fetchCategories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCategories = async () => {
    try {
      // Get distinct categories from dishes
      const { data, error } = await supabase
        .from("dishes")
        .select("category")
        .order("category");

      if (error) throw error;

      const uniqueCategories = Array.from(
        new Set(data.map((item) => item.category))
      );
      setCategories(uniqueCategories as string[]);
    } catch (error: any) {
      toast.error("Error fetching categories: " + error.message);
    }
  };

  const handleAddCategory = async (newCategory: string) => {
    try {
      // Check if category already exists
      if (categories.includes(newCategory)) {
        toast.error("This category already exists");
        return;
      }

      // Instead of adding a placeholder dish, just add the category
      // The user will be able to add dishes to this category later
      // We're doing this because the dish might not have an image yet
      // and we want to avoid placeholder dishes

      // Create a new dish in the new category
      const { error } = await supabase.from("dishes").insert([
        {
          name: `New ${newCategory}`,
          description: `Add description for this ${newCategory} dish`,
          price: 0,
          category: newCategory,
          is_featured: false,
          currency: "₦",
        },
      ]);

      if (error) {
        console.error("Error adding category:", error);
        toast.error("Error adding category: " + error.message);
        return;
      }

      toast.success(`Category "${newCategory}" added successfully`);
      await fetchCategories();
    } catch (error: any) {
      toast.error("Error adding category: " + error.message);
    }
  };

  const handleRemoveCategory = async (category: string) => {
    try {
      // First check if there are any dishes in this category
      const { data: dishes, error: checkError } = await supabase
        .from("dishes")
        .select("id")
        .eq("category", category);

      if (checkError) throw checkError;

      // If there are dishes in this category, alert the user
      if (dishes && dishes.length > 0) {
        const confirmDelete = window.confirm(
          `This category contains ${dishes.length} dishes. Would you like to:\n` +
            `• Click OK to delete the category and its dishes\n` +
            `• Click Cancel to keep the category and its dishes`
        );

        if (confirmDelete) {
          // Delete all dishes in this category
          const { error: deleteError } = await supabase
            .from("dishes")
            .delete()
            .eq("category", category);

          if (deleteError) throw deleteError;
        } else {
          return; // User cancelled the deletion
        }
      }

      toast.success(
        `Category "${category}" and its dishes removed successfully`
      );
      await fetchCategories();
    } catch (error: any) {
      toast.error("Error removing category: " + error.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold">Admin Login Required</h2>
          <p className="mt-2">
            Please log in with your admin credentials to access the admin panel.
          </p>
          <button
            onClick={() => navigate("/admin-login")}
            className="mt-4 px-4 py-2 bg-bubbles-pink text-white rounded-md hover:shadow-[0_0_15px_#FF6B9D] transition-all duration-300"
          >
            Admin Login
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold">Access Restricted</h2>
          <p className="mt-2">You need admin privileges to access this page.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-bubbles-pink text-white rounded-md hover:shadow-[0_0_15px_#FF6B9D] transition-all duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <Navbar />

      <div className="section-padding">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-bubbles-pink mb-8">
            Admin Panel
          </h1>

          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-8 overflow-x-auto grid grid-cols-5">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="menu">Menu Management</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <div className="glass p-6 rounded-lg shadow-lg">
              <TabsContent value="dashboard" className="space-y-6">
                <Dashboard />
              </TabsContent>

              <TabsContent value="menu" className="space-y-6">
                <DishManager categories={categories} />
              </TabsContent>

              <TabsContent value="categories">
                <CategoryManager
                  categories={categories}
                  onAddCategory={handleAddCategory}
                  onRemoveCategory={handleRemoveCategory}
                />
              </TabsContent>

              <TabsContent value="users">
                <UserManager />
              </TabsContent>

              <TabsContent value="messages">
                <MessageManager />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
