import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  // Redirect if already logged in as admin
  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin");
    }
  }, [navigate, user, isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if the user has admin role
      if (data.user?.user_metadata?.role === "admin") {
        toast.success("Admin login successful!");
        navigate("/admin");
      } else {
        // If not an admin, sign them out
        await supabase.auth.signOut();
        toast.error("This account doesn't have admin privileges");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create the user account with admin role
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "admin", // Always create as admin from this page
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // For development purposes, immediately sign in after signup
        // This bypasses email verification
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        toast.success("Admin account created and logged in!");
        navigate("/admin");
      } else {
        toast.info(
          "Sign up successful! Please check your email for verification."
        );
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <Navbar />

      <div className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto glass p-8 rounded-lg shadow-lg border-2 border-bubbles-pink">
            <h1 className="text-3xl font-bold text-bubbles-pink mb-6">
              Admin Portal
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-bubbles-pink"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-bubbles-pink"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full mb-4 transition-all duration-300 hover:shadow-[0_0_15px_#FF6B9D] animate-pulse"
                disabled={loading}
              >
                {loading ? "Loading..." : "Admin Login"}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Don't have an admin account?
                </p>
                <button
                  onClick={() => navigate("/admin-signup")}
                  type="button"
                  className="btn-outline w-full transition-all duration-300 hover:shadow-[0_0_10px_#FF6B9D]"
                  disabled={loading}
                >
                  Become Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLogin;
