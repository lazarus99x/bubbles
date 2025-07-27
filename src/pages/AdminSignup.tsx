import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AdminSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Create the user account with admin role
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'admin' // Always create as admin from this page
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Auto sign-in after signup for immediate access
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) throw signInError;
        
        toast.success("Admin account created successfully! You now have full access.");
        navigate("/admin");
      } else {
        toast.info("Account created! Please check your email for verification, then login.");
        navigate("/admin-login");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create admin account";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-bubbles-pink">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-bubbles-pink">
                  Become Admin
                </CardTitle>
                <CardDescription>
                  Create your admin account to manage the restaurant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <Input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-bubbles-pink hover:bg-bubbles-pink/80"
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? "Creating Account..." : "Become Admin"}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">What you'll get:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Full access to admin dashboard</li>
                    <li>• Menu management capabilities</li>
                    <li>• Order and customer management</li>
                    <li>• Site settings control</li>
                  </ul>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an admin account?{" "}
                    <button
                      onClick={() => navigate("/admin-login")}
                      className="text-bubbles-pink hover:underline font-medium"
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminSignup;
