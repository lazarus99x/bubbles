import { supabase } from './client';

export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
}

/**
 * Update user password after verifying current password
 */
export async function updateUserPassword(data: PasswordUpdateData): Promise<{ success: boolean; error?: string }> {
  try {
    // Get current user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user?.email) {
      return { success: false, error: 'User not authenticated' };
    }

    // Verify current password by attempting to sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userData.user.email,
      password: data.currentPassword
    });

    if (signInError) {
      return { success: false, error: 'Current password is incorrect' };
    }

    // Update to new password
    const { error: updateError } = await supabase.auth.updateUser({
      password: data.newPassword
    });

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    return { success: true };
    
  } catch (error) {
    console.error('Password update error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
