-- Create admin function for Easyio Technologies
-- This function handles creating an admin user and related entries

-- Function to create an admin user with proper permissions
CREATE OR REPLACE FUNCTION public.create_admin(
  admin_email TEXT,
  admin_id UUID,
  first_name TEXT,
  last_name TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  profile_id UUID;
BEGIN
  -- Create a profile entry for the admin
  INSERT INTO profiles (id, first_name, last_name, email, role)
  VALUES (admin_id, first_name, last_name, admin_email, 'admin')
  RETURNING id INTO profile_id;
  
  -- Create an entry in admin_users
  INSERT INTO admin_users (user_id)
  VALUES (profile_id);
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error creating admin: %', SQLERRM;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create is_admin function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID) 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = $1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fix RLS policies for profiles and admin_users tables
-- Allow authenticated users to insert into profiles
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Alternative: Enable RLS with proper policies
-- Uncomment and use these if you prefer to maintain RLS with proper access control
/*
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
DROP POLICY IF EXISTS profiles_insert_policy ON profiles;
CREATE POLICY profiles_insert_policy ON profiles 
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS profiles_update_policy ON profiles;
CREATE POLICY profiles_update_policy ON profiles 
  FOR UPDATE USING (auth.uid() = id OR auth.role() = 'service_role');

DROP POLICY IF EXISTS profiles_delete_policy ON profiles;
CREATE POLICY profiles_delete_policy ON profiles 
  FOR DELETE USING (auth.uid() = id OR auth.role() = 'service_role');

-- Policies for admin_users table
DROP POLICY IF EXISTS admin_users_insert_policy ON admin_users;
CREATE POLICY admin_users_insert_policy ON admin_users 
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS admin_users_update_policy ON admin_users;
CREATE POLICY admin_users_update_policy ON admin_users 
  FOR UPDATE USING (auth.uid() = user_id OR auth.role() = 'service_role');

DROP POLICY IF EXISTS admin_users_delete_policy ON admin_users;
CREATE POLICY admin_users_delete_policy ON admin_users 
  FOR DELETE USING (auth.uid() = user_id OR auth.role() = 'service_role');
*/

-- Grant necessary permissions to use the functions
GRANT EXECUTE ON FUNCTION public.create_admin TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_admin TO anon;
GRANT EXECUTE ON FUNCTION public.create_admin TO service_role;

GRANT EXECUTE ON FUNCTION public.is_admin TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin TO anon;
GRANT EXECUTE ON FUNCTION public.is_admin TO service_role;
