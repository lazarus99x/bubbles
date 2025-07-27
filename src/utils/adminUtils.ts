/**
 * Utility script to grant admin access to a specific email
 * This should be run from the admin panel or by an existing admin
 */

import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const grantAdminAccess = async (email: string) => {
  try {
    console.log(`🔍 Searching for user with email: ${email}`);

    // First, get list of all users to find the one with the specific email
    const { data: usersData, error: listError } =
      await supabase.auth.admin.listUsers();

    if (listError) {
      throw new Error(`Failed to list users: ${listError.message}`);
    }

    // Find the user with the specified email
    const targetUser = usersData.users.find((user) => user.email === email);

    if (!targetUser) {
      throw new Error(
        `User with email ${email} not found. They need to sign up first.`
      );
    }

    console.log(`👤 Found user:`, targetUser.id);

    // Update the user's metadata to include admin role
    const { data, error } = await supabase.auth.admin.updateUserById(
      targetUser.id,
      {
        user_metadata: {
          ...targetUser.user_metadata,
          role: "admin",
        },
      }
    );

    if (error) {
      throw new Error(`Failed to update user role: ${error.message}`);
    }

    console.log(`✅ Successfully granted admin access to ${email}`);
    toast.success(`Admin access granted to ${email}`);

    return {
      success: true,
      message: `Admin access granted to ${email}`,
      userId: targetUser.id,
    };
  } catch (error: unknown) {
    console.error("❌ Error granting admin access:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    toast.error(errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const checkUserRole = async (email: string) => {
  try {
    const { data: usersData, error } = await supabase.auth.admin.listUsers();

    if (error) {
      throw new Error(`Failed to list users: ${error.message}`);
    }

    const user = usersData.users.find((u) => u.email === email);

    if (!user) {
      return { found: false, message: `User with email ${email} not found` };
    }

    const role = user.user_metadata?.role || "customer";

    return {
      found: true,
      userId: user.id,
      email: user.email,
      role: role,
      isAdmin: role === "admin",
      createdAt: user.created_at,
    };
  } catch (error: unknown) {
    console.error("Error checking user role:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return { found: false, message: errorMessage };
  }
};
