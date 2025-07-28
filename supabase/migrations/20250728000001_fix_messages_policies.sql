-- Fix RLS policies for messages table to avoid auth.users table access issues
-- Drop existing policies
DROP POLICY IF EXISTS "Admin users can view messages" ON public.messages;
DROP POLICY IF EXISTS "Admin users can update messages" ON public.messages;
DROP POLICY IF EXISTS "Admin users can delete messages" ON public.messages;

-- Create new policies that don't require direct access to auth.users table
-- These policies check the user_metadata from the JWT token directly

-- Only authenticated admin users can view messages
CREATE POLICY "Admin users can view messages" ON public.messages
    FOR SELECT USING (
        auth.uid() IS NOT NULL 
        AND (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
    );

-- Only authenticated admin users can update messages  
CREATE POLICY "Admin users can update messages" ON public.messages
    FOR UPDATE USING (
        auth.uid() IS NOT NULL 
        AND (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
    );

-- Only authenticated admin users can delete messages
CREATE POLICY "Admin users can delete messages" ON public.messages
    FOR DELETE USING (
        auth.uid() IS NOT NULL 
        AND (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
    );
