
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const PrivateRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading && !user && adminOnly) {
      toast.error("You need to be logged in as an admin to access this page");
    } else if (!loading && user && adminOnly && !isAdmin) {
      toast.error("You need admin privileges to access this page");
    }
  }, [loading, user, adminOnly, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bubbles-pink"></div>
      </div>
    );
  }

  // If not logged in, redirect to the appropriate login page
  if (!user) {
    console.log("User not logged in, redirecting to login");
    return <Navigate to={adminOnly ? "/admin-login" : "/customer-login"} />;
  }

  // If admin route but user is not admin
  if (adminOnly && !isAdmin) {
    console.log("User is not admin, access denied");
    toast.error("You need admin privileges to access this page");
    return <Navigate to="/" />;
  }

  console.log("Access granted, rendering protected content");
  return <>{children}</>;
};
