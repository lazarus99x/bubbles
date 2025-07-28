import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Key, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { updateUserPassword } from '@/integrations/supabase/auth';

const PasswordReset: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
      checks: {
        minLength,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpecial
      }
    };
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword.trim()) {
      toast.error('Please enter your current password');
      return;
    }

    if (!newPassword.trim()) {
      toast.error('Please enter a new password');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      toast.error('New password does not meet security requirements');
      return;
    }

    if (currentPassword === newPassword) {
      toast.error('New password must be different from current password');
      return;
    }

    setLoading(true);

    try {
      const result = await updateUserPassword({
        currentPassword,
        newPassword
      });

      if (result.success) {
        toast.success('Password updated successfully!');
        // Clear form
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(result.error || 'Failed to update password');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const passwordValidation = validatePassword(newPassword);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Change Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordReset} className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Password Requirements */}
          {newPassword && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="mt-2 space-y-1">
                  <p className="font-medium">Password Requirements:</p>
                  <div className="grid grid-cols-1 gap-1 text-sm">
                    <div className={`flex items-center gap-2 ${passwordValidation.checks.minLength ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordValidation.checks.minLength ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      At least 8 characters
                    </div>
                    <div className={`flex items-center gap-2 ${passwordValidation.checks.hasUpper ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordValidation.checks.hasUpper ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      One uppercase letter
                    </div>
                    <div className={`flex items-center gap-2 ${passwordValidation.checks.hasLower ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordValidation.checks.hasLower ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      One lowercase letter
                    </div>
                    <div className={`flex items-center gap-2 ${passwordValidation.checks.hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordValidation.checks.hasNumber ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      One number
                    </div>
                    <div className={`flex items-center gap-2 ${passwordValidation.checks.hasSpecial ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordValidation.checks.hasSpecial ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      One special character
                    </div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Password Mismatch Warning */}
          {confirmPassword && newPassword !== confirmPassword && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Passwords do not match
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full"
            disabled={
              loading || 
              !currentPassword || 
              !newPassword || 
              !confirmPassword || 
              newPassword !== confirmPassword || 
              !passwordValidation.isValid ||
              currentPassword === newPassword
            }
          >
            {loading ? 'Updating Password...' : 'Update Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PasswordReset;
