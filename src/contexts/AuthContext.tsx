
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("You've been logged out");
    } catch (error: any) {
      toast.error(`Error logging out: ${error.message}`);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log("Auth event:", event);
      console.log("Session user metadata:", currentSession?.user?.user_metadata);
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Check if user has admin role
      const userRole = currentSession?.user?.user_metadata?.role;
      console.log("User role:", userRole);
      setIsAdmin(userRole === 'admin');
      
      if (event === 'SIGNED_OUT') {
        toast.info("You've been logged out");
      } else if (event === 'SIGNED_IN') {
        toast.success("Successfully logged in");
      } else if (event === 'USER_UPDATED') {
        toast.success("User profile updated");
      }
      
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession);
      console.log("Initial user metadata:", currentSession?.user?.user_metadata);
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Check if user has admin role
      const userRole = currentSession?.user?.user_metadata?.role;
      console.log("Initial user role:", userRole);
      setIsAdmin(userRole === 'admin');
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, loading, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
