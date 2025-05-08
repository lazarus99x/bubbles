
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { User } from '@supabase/supabase-js';

interface AdminUser {
  id: string;
  email: string | null;
  created_at: string;
  user_metadata: {
    role: string;
  };
}

export default function UserManager() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.admin.listUsers();
      
      if (error) {
        throw error;
      }
      
      // Transform Supabase User[] to AdminUser[] with correct typing
      const adminUsers = data.users.map(user => ({
        id: user.id,
        email: user.email || 'No email',
        created_at: user.created_at,
        user_metadata: {
          role: user.user_metadata?.role || 'customer'
        }
      }));
      
      setUsers(adminUsers);
    } catch (error: any) {
      toast.error("Cannot fetch users. Admins can access user management in the Supabase dashboard.");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserRole = async (user: AdminUser) => {
    try {
      const newRole = user.user_metadata?.role === 'admin' ? 'customer' : 'admin';
      const { error } = await supabase.auth.admin.updateUserById(
        user.id,
        { user_metadata: { role: newRole } }
      );
      
      if (error) throw error;
      
      setUsers(users.map(u => {
        if (u.id === user.id) {
          return {
            ...u,
            user_metadata: {
              ...u.user_metadata,
              role: newRole
            }
          };
        }
        return u;
      }));
      
      toast.success(`User role updated to ${newRole}`);
    } catch (error: any) {
      toast.error("Cannot update user. Please use the Supabase dashboard.");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button 
          onClick={fetchUsers} 
          disabled={loading}
          className="bg-bubbles-pink hover:bg-bubbles-pink/80"
        >
          Refresh
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-24">Admin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                  No users found
                </TableCell>
              </TableRow>
            ) : users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.user_metadata?.role === 'admin'}
                    onCheckedChange={() => toggleUserRole(user)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        Note: Full user management features require Supabase dashboard access.
      </p>
    </div>
  );
}
