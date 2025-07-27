import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { grantAdminAccess, checkUserRole } from "@/utils/adminUtils";

interface UserRoleInfo {
  found: boolean;
  userId?: string;
  email?: string;
  role?: string;
  isAdmin?: boolean;
  createdAt?: string;
  message?: string;
}

export default function AdminAccessManager() {
  const [email, setEmail] = useState("contact@bubblesrestaurant.pro");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserRoleInfo | null>(null);

  const handleGrantAccess = async () => {
    if (!email.trim()) {
      alert("Please enter an email address");
      return;
    }

    setLoading(true);
    try {
      const result = await grantAdminAccess(email.trim());
      if (result.success) {
        // Check the updated user role
        const roleCheck = await checkUserRole(email.trim());
        setUserInfo(roleCheck);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckRole = async () => {
    if (!email.trim()) {
      alert("Please enter an email address");
      return;
    }

    setLoading(true);
    try {
      const result = await checkUserRole(email.trim());
      setUserInfo(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-bubbles-pink">
          Admin Access Manager
        </CardTitle>
        <CardDescription>
          Grant admin privileges to existing users or check current user roles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleCheckRole}
            disabled={loading}
            variant="outline"
          >
            Check Role
          </Button>
        </div>

        {userInfo && (
          <div className="p-4 bg-gray-50 rounded-lg">
            {userInfo.found ? (
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <p>
                  <strong>User ID:</strong> {userInfo.userId}
                </p>
                <p>
                  <strong>Current Role:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded text-sm ${
                      userInfo.isAdmin
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {userInfo.role}
                  </span>
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(userInfo.createdAt).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p className="text-red-600">{userInfo.message}</p>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleGrantAccess}
            disabled={loading || !email.trim()}
            className="bg-bubbles-pink hover:bg-bubbles-pink/80"
          >
            {loading ? "Processing..." : "Grant Admin Access"}
          </Button>
        </div>

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>Instructions:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              The user must already have an account (they need to sign up first)
            </li>
            <li>Enter their email address above</li>
            <li>Click "Check Role" to verify the user exists</li>
            <li>Click "Grant Admin Access" to give them admin privileges</li>
            <li>
              They will need to log out and log back in to see admin features
            </li>
          </ol>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Pre-filled Email:</strong> contact@bubblesrestaurant.pro
            <br />
            This email is ready to be granted admin access. Make sure this user
            has created an account first.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
