-- Admin Authentication Tables for Easyio Technologies
-- This script creates and configures tables specifically for admin authentication

-- Check if auth schema exists (Supabase provides this)
-- If using this outside of Supabase, you'll need to create the auth schema

-- Create admin_credentials table for storing authentication details
CREATE TABLE IF NOT EXISTS admin_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false
);

-- Create admin_sessions table for managing login sessions
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admin_credentials(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_address TEXT,
  user_agent TEXT
);

-- Create admin_permissions table for role-based access control
CREATE TABLE IF NOT EXISTS admin_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_permissions table for role-based access control
CREATE TABLE IF NOT EXISTS admin_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  resource TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_role_permissions junction table
CREATE TABLE IF NOT EXISTS admin_role_permissions (
  role_id UUID REFERENCES admin_roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES admin_permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (role_id, permission_id)
);

-- Create admin_user_roles junction table
CREATE TABLE IF NOT EXISTS admin_user_roles (
  admin_id UUID REFERENCES admin_credentials(id) ON DELETE CASCADE,
  role_id UUID REFERENCES admin_roles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (admin_id, role_id)
);

-- Create admin_reset_tokens table for password resets
CREATE TABLE IF NOT EXISTS admin_reset_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admin_credentials(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT false
);

-- Create admin_verification_tokens table for email verification
CREATE TABLE IF NOT EXISTS admin_verification_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admin_credentials(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT false
);

-- Create admin_audit_log table for security auditing
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admin_credentials(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Create security policies for admin_credentials
CREATE POLICY admin_credentials_insert ON admin_credentials 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
  
CREATE POLICY admin_credentials_select ON admin_credentials 
  FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
  
CREATE POLICY admin_credentials_update ON admin_credentials 
  FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
  
CREATE POLICY admin_credentials_delete ON admin_credentials 
  FOR DELETE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Insert default admin roles
INSERT INTO admin_roles (name, description) 
VALUES 
  ('super_admin', 'Has full access to all dashboard features'),
  ('content_editor', 'Can edit content but not manage users or settings'),
  ('analyst', 'Can view statistics and reports only');

-- Insert default permissions
INSERT INTO admin_permissions (name, description, resource, action)
VALUES 
  ('manage_users', 'Can create, update, and delete users', 'users', 'all'),
  ('edit_content', 'Can edit website content', 'content', 'edit'),
  ('view_stats', 'Can view statistics and reports', 'stats', 'view'),
  ('manage_settings', 'Can manage site settings', 'settings', 'all');

-- Link permissions to roles
INSERT INTO admin_role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM admin_roles r, admin_permissions p
WHERE r.name = 'super_admin';

INSERT INTO admin_role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM admin_roles r, admin_permissions p
WHERE r.name = 'content_editor' AND p.name IN ('edit_content', 'view_stats');

INSERT INTO admin_role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM admin_roles r, admin_permissions p
WHERE r.name = 'analyst' AND p.name = 'view_stats';

-- Create an index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_admin_credentials_email ON admin_credentials(email);

-- Create an index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);

-- Note: In a production environment, you should add additional security measures:
-- 1. Use stronger password hashing (like bcrypt or Argon2)
-- 2. Implement rate limiting for login attempts
-- 3. Add two-factor authentication
-- 4. Consider using Supabase Auth directly when possible
