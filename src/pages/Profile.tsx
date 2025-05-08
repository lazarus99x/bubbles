
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Bookmark, Clock } from "lucide-react";
import { Dish } from "@/types/dish";

interface Order {
  id: string;
  created_at: string;
  status: string;
  items: {
    dish: string;
    quantity: number;
    price: number;
  }[];
}

const Profile: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("account");
  const [orders, setOrders] = useState<Order[]>([]);
  const [savedDishes, setSavedDishes] = useState<Dish[]>([]);
  const [favorites, setFavorites] = useState<Dish[]>([]);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  // For demo purposes, create mock data
  useEffect(() => {
    if (user) {
      // Mock orders data
      const mockOrders: Order[] = [
        {
          id: "ord-123456",
          created_at: new Date().toISOString(),
          status: "Delivered",
          items: [
            { dish: "Jollof Rice", quantity: 2, price: 15.99 },
            { dish: "Suya", quantity: 1, price: 12.99 }
          ]
        },
        {
          id: "ord-123457",
          created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
          status: "Processing",
          items: [
            { dish: "Pounded Yam & Egusi", quantity: 1, price: 18.99 }
          ]
        }
      ];
      setOrders(mockOrders);
      
      // Fetch some dishes to use as saved/favorites
      const fetchDishes = async () => {
        const { data } = await supabase
          .from('dishes')
          .select('*')
          .limit(4);
        
        if (data) {
          setSavedDishes(data.slice(0, 2));
          setFavorites(data.slice(2, 4));
        }
      };
      
      fetchDishes();
    }
  }, [user]);
  
  const handlePasswordReset = async () => {
    if (!user?.email) return;
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email);
      
      if (error) throw error;
      
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      
      <div className="py-12 bg-bubbles-white/50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-bubbles-pink mb-8">
            My Profile
          </h1>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
            </TabsList>
            
            <div className="glass p-6 rounded-lg shadow-lg">
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user.email || ""} readOnly />
                    </div>
                    <Button onClick={handlePasswordReset}>Reset Password</Button>
                    
                    {isAdmin && (
                      <div className="mt-8 pt-4 border-t">
                        <Button 
                          onClick={() => navigate("/admin")}
                          className="bg-bubbles-pink hover:bg-bubbles-pink/80"
                        >
                          Go to Admin Dashboard
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="orders">
                <div className="space-y-6">
                  {orders.length > 0 ? (
                    orders.map(order => (
                      <Card key={order.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex justify-between">
                            <span>Order #{order.id}</span>
                            <span className={`text-sm ${
                              order.status === "Delivered" 
                                ? "text-green-500" 
                                : "text-amber-500"
                            }`}>
                              {order.status}
                            </span>
                          </CardTitle>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(order.created_at).toLocaleDateString()}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <div>
                                  {item.quantity}x {item.dish}
                                </div>
                                <div className="font-semibold">
                                  ₦{(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-2 border-t border-gray-200 flex justify-end">
                            <div className="font-bold">
                              Total: ₦{order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No orders yet</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="collections">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Bookmark className="mr-2 h-5 w-5" />
                      Saved for Later
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedDishes.length > 0 ? savedDishes.map(dish => (
                        <Card key={dish.id} className="flex overflow-hidden">
                          <div className="w-1/3">
                            <img 
                              src={dish.image_url || "/placeholder.svg"}
                              alt={dish.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <CardContent className="w-2/3 p-4">
                            <h4 className="font-semibold">{dish.name}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{dish.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="font-bold">₦{dish.price.toFixed(2)}</div>
                              <Button variant="outline" size="sm">Order</Button>
                            </div>
                          </CardContent>
                        </Card>
                      )) : (
                        <p className="col-span-2 text-center py-8 text-gray-500">
                          No saved dishes yet
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Heart className="mr-2 h-5 w-5" />
                      Favorites
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {favorites.length > 0 ? favorites.map(dish => (
                        <Card key={dish.id} className="flex overflow-hidden">
                          <div className="w-1/3">
                            <img 
                              src={dish.image_url || "/placeholder.svg"}
                              alt={dish.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <CardContent className="w-2/3 p-4">
                            <h4 className="font-semibold">{dish.name}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{dish.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="font-bold">₦{dish.price.toFixed(2)}</div>
                              <Button variant="outline" size="sm">Order</Button>
                            </div>
                          </CardContent>
                        </Card>
                      )) : (
                        <p className="col-span-2 text-center py-8 text-gray-500">
                          No favorite dishes yet
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
