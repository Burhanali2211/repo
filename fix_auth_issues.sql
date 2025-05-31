-- Fix Authentication and RLS Issues
-- This script fixes the 406 errors and auto-logout issues

-- 1. Fix RLS policies for profiles table to allow proper access
DROP POLICY IF EXISTS public_read_profiles ON profiles;
DROP POLICY IF EXISTS authenticated_read_profiles ON profiles;
DROP POLICY IF EXISTS authenticated_update_profiles ON profiles;

-- Create more permissive policies for profiles table
CREATE POLICY "Allow authenticated users to read profiles" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Allow authenticated users to update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow authenticated users to insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Ensure admin_users table has proper policies
DROP POLICY IF EXISTS public_read_admin_users ON admin_users;
DROP POLICY IF EXISTS authenticated_read_admin_users ON admin_users;

CREATE POLICY "Allow authenticated users to read admin_users" ON admin_users
  FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- 3. Create or update the is_admin function to be more robust
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID) 
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user exists in admin_users table
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = $1
  );
EXCEPTION
  WHEN OTHERS THEN
    -- If there's any error, return false
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.is_admin TO authenticated, anon, service_role;

-- 5. Ensure all tables have proper read permissions for authenticated users
-- Projects
DROP POLICY IF EXISTS public_read_projects ON projects;
CREATE POLICY "Allow public read access to projects" ON projects
  FOR SELECT USING (true);

-- Services  
DROP POLICY IF EXISTS public_read_services ON services;
CREATE POLICY "Allow public read access to services" ON services
  FOR SELECT USING (true);

-- Testimonials
DROP POLICY IF EXISTS public_read_testimonials ON testimonials;
CREATE POLICY "Allow public read access to testimonials" ON testimonials
  FOR SELECT USING (true);

-- What We Do
DROP POLICY IF EXISTS public_read_what_we_do ON what_we_do;
CREATE POLICY "Allow public read access to what_we_do" ON what_we_do
  FOR SELECT USING (true);

-- About Content
DROP POLICY IF EXISTS public_read_about_content ON about_content;
CREATE POLICY "Allow public read access to about_content" ON about_content
  FOR SELECT USING (true);

-- Blog Posts
DROP POLICY IF EXISTS public_read_blog_posts ON blog_posts;
CREATE POLICY "Allow public read access to blog_posts" ON blog_posts
  FOR SELECT USING (true);

-- Activity Log
DROP POLICY IF EXISTS public_read_activity_log ON activity_log;
CREATE POLICY "Allow authenticated read access to activity_log" ON activity_log
  FOR SELECT USING (auth.role() = 'authenticated');

-- 6. Create admin write policies for content management
-- Projects admin policies
CREATE POLICY "Allow admins to manage projects" ON projects
  FOR ALL USING (
    auth.role() = 'authenticated' AND (
      (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin' OR
      public.is_admin(auth.uid())
    )
  );

-- Services admin policies  
CREATE POLICY "Allow admins to manage services" ON services
  FOR ALL USING (
    auth.role() = 'authenticated' AND (
      (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin' OR
      public.is_admin(auth.uid())
    )
  );

-- Testimonials admin policies
CREATE POLICY "Allow admins to manage testimonials" ON testimonials
  FOR ALL USING (
    auth.role() = 'authenticated' AND (
      (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin' OR
      public.is_admin(auth.uid())
    )
  );

-- What We Do admin policies
CREATE POLICY "Allow admins to manage what_we_do" ON what_we_do
  FOR ALL USING (
    auth.role() = 'authenticated' AND (
      (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin' OR
      public.is_admin(auth.uid())
    )
  );

-- About Content admin policies
CREATE POLICY "Allow admins to manage about_content" ON about_content
  FOR ALL USING (
    auth.role() = 'authenticated' AND (
      (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin' OR
      public.is_admin(auth.uid())
    )
  );

-- 7. Refresh schema cache
NOTIFY pgrst, 'reload schema';

-- 8. Create a test admin user if none exists
-- This will help with testing the admin functionality
DO $$
BEGIN
  -- Only create if no admin users exist
  IF NOT EXISTS (SELECT 1 FROM admin_users LIMIT 1) THEN
    -- Insert a test profile
    INSERT INTO profiles (id, first_name, last_name, email, role)
    VALUES (
      '11111111-1111-1111-1111-111111111111',
      'Test',
      'Admin',
      'test@admin.com',
      'admin'
    ) ON CONFLICT (id) DO NOTHING;
    
    -- Insert admin user record
    INSERT INTO admin_users (user_id)
    VALUES ('11111111-1111-1111-1111-111111111111')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
END $$;
