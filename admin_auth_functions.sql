-- Admin Authentication Functions for Easyio Technologies
-- This script creates the stored procedures needed for admin authentication

-- Function to create a new admin user
CREATE OR REPLACE FUNCTION create_admin(
  admin_email TEXT,
  admin_id UUID,
  first_name TEXT,
  last_name TEXT
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  salt TEXT;
  empty_hash TEXT := 'placeholder_hash'; -- In reality, auth is handled by Supabase Auth
BEGIN
  -- Generate a random salt
  salt := gen_random_uuid()::TEXT;
  
  -- Insert into admin_credentials
  -- Note: In a real implementation with Supabase, password hashing is handled by Auth service
  -- This is just to populate our custom admin tables
  INSERT INTO admin_credentials (id, email, password_hash, salt, email_verified)
  VALUES (admin_id, admin_email, empty_hash, salt, TRUE);
  
  -- Also insert into profiles if not exists (for compatibility with existing code)
  INSERT INTO profiles (id, first_name, last_name, email, role)
  VALUES (admin_id, first_name, last_name, admin_email, 'admin')
  ON CONFLICT (id) DO UPDATE
  SET first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      email = EXCLUDED.email,
      role = 'admin';
  
  -- Insert into admin_users table for role-based access
  INSERT INTO admin_users (user_id)
  VALUES (admin_id)
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Log the admin creation
  INSERT INTO admin_audit_log (admin_id, action, details)
  VALUES (admin_id, 'admin_created', jsonb_build_object('email', admin_email));
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to create admin: %', SQLERRM;
    RETURN FALSE;
END;
$$;

-- Function to assign a role to an admin user
CREATE OR REPLACE FUNCTION assign_admin_role(
  admin_id UUID,
  role_name TEXT
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  role_id UUID;
BEGIN
  -- Get the role ID
  SELECT id INTO role_id FROM admin_roles WHERE name = role_name;
  
  IF role_id IS NULL THEN
    RAISE EXCEPTION 'Role % not found', role_name;
  END IF;
  
  -- Assign the role to the admin
  INSERT INTO admin_user_roles (admin_id, role_id)
  VALUES (admin_id, role_id)
  ON CONFLICT (admin_id, role_id) DO NOTHING;
  
  -- Log the role assignment
  INSERT INTO admin_audit_log (admin_id, action, details)
  VALUES (admin_id, 'role_assigned', jsonb_build_object('role', role_name));
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to assign role: %', SQLERRM;
    RETURN FALSE;
END;
$$;

-- Function to verify if a user is an admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID) 
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_credentials WHERE id = user_id AND active = TRUE
  );
END;
$$;

-- Function to get admin permissions
CREATE OR REPLACE FUNCTION get_admin_permissions(admin_id UUID)
RETURNS TABLE (
  permission_name TEXT,
  resource TEXT,
  action TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT
    p.name,
    p.resource,
    p.action
  FROM admin_permissions p
  JOIN admin_role_permissions rp ON p.id = rp.permission_id
  JOIN admin_user_roles ur ON rp.role_id = ur.role_id
  WHERE ur.admin_id = get_admin_permissions.admin_id;
END;
$$;

-- Function to check if admin has a specific permission
CREATE OR REPLACE FUNCTION admin_has_permission(
  admin_id UUID,
  resource TEXT,
  action TEXT
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM admin_permissions p
    JOIN admin_role_permissions rp ON p.id = rp.permission_id
    JOIN admin_user_roles ur ON rp.role_id = ur.role_id
    WHERE ur.admin_id = admin_has_permission.admin_id
      AND p.resource = admin_has_permission.resource
      AND (p.action = admin_has_permission.action OR p.action = 'all')
  );
END;
$$;

-- Function to record login session
CREATE OR REPLACE FUNCTION record_admin_login(
  admin_id UUID,
  ip_address TEXT,
  user_agent TEXT
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  session_id UUID;
  token TEXT;
BEGIN
  -- Generate session token
  session_id := gen_random_uuid();
  token := encode(gen_random_bytes(32), 'hex');
  
  -- Insert into admin_sessions
  INSERT INTO admin_sessions (id, admin_id, token, expires_at, ip_address, user_agent)
  VALUES (
    session_id, 
    admin_id, 
    token, 
    NOW() + INTERVAL '7 days', 
    ip_address, 
    user_agent
  );
  
  -- Update last login time
  UPDATE admin_credentials
  SET last_login = NOW()
  WHERE id = admin_id;
  
  -- Log the login
  INSERT INTO admin_audit_log (admin_id, action, details, ip_address, user_agent)
  VALUES (admin_id, 'login', jsonb_build_object('session_id', session_id), ip_address, user_agent);
  
  RETURN session_id;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to record login: %', SQLERRM;
END;
$$;

-- Function to validate admin token
CREATE OR REPLACE FUNCTION validate_admin_session(token TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_id UUID;
BEGIN
  -- Get admin ID for the valid session
  SELECT s.admin_id INTO admin_id
  FROM admin_sessions s
  WHERE s.token = validate_admin_session.token
    AND s.expires_at > NOW();
  
  IF admin_id IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Check if admin is still active
  IF NOT EXISTS (
    SELECT 1 FROM admin_credentials WHERE id = admin_id AND active = TRUE
  ) THEN
    RETURN NULL;
  END IF;
  
  RETURN admin_id;
END;
$$;

-- Function to invalidate all sessions for an admin
CREATE OR REPLACE FUNCTION invalidate_admin_sessions(admin_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete all sessions for the admin
  DELETE FROM admin_sessions
  WHERE admin_id = invalidate_admin_sessions.admin_id;
  
  -- Log the session invalidation
  INSERT INTO admin_audit_log (admin_id, action, details)
  VALUES (admin_id, 'sessions_invalidated', jsonb_build_object('reason', 'manual_logout'));
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to invalidate sessions: %', SQLERRM;
    RETURN FALSE;
END;
$$;
