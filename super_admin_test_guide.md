# Super Admin User Test Guide

## Account Details
- **Email**: suadmin@easyio.tech
- **Password**: EasyioAdmin@2025
- **Role**: Super Admin
- **Status**: Active and Verified

## Login Process Testing

### 1. Admin Login Page
1. Navigate to: `http://localhost:3000/admin/login`
2. Enter credentials:
   - Email: `suadmin@easyio.tech`
   - Password: `EasyioAdmin@2025`
3. Click "Sign in to Admin"
4. Should redirect to dashboard upon successful login

### 2. Dashboard Access
1. After login, should be redirected to: `http://localhost:3000/dashboard`
2. Should see admin dashboard with full access
3. User should be displayed as "Super Admin" in the interface

### 3. Permissions Verification
The super admin user has the following permissions:
- **manage_users**: Can create, update, and delete users
- **edit_content**: Can edit website content
- **view_stats**: Can view statistics and reports
- **manage_settings**: Can manage site settings

### 4. Database Verification
Run these queries in Supabase SQL Editor to verify setup:

```sql
-- Check user authentication
SELECT email, email_confirmed_at, raw_user_meta_data 
FROM auth.users 
WHERE email = 'suadmin@easyio.tech';

-- Check admin role
SELECT ac.email, ar.name as role, ar.description
FROM admin_credentials ac
JOIN admin_user_roles aur ON ac.id = aur.admin_id
JOIN admin_roles ar ON aur.role_id = ar.id
WHERE ac.email = 'suadmin@easyio.tech';

-- Check permissions
SELECT ap.name, ap.description
FROM admin_user_roles aur
JOIN admin_role_permissions arp ON aur.role_id = arp.role_id
JOIN admin_permissions ap ON arp.permission_id = ap.id
WHERE aur.admin_id = (
  SELECT id FROM admin_credentials WHERE email = 'suadmin@easyio.tech'
);

-- Test admin function
SELECT is_admin((SELECT id FROM auth.users WHERE email = 'suadmin@easyio.tech'));
```

## Troubleshooting

### If Login Fails
1. Check that email is confirmed in auth.users table
2. Verify user_metadata contains role: 'admin'
3. Ensure admin_credentials record exists and is active
4. Check that admin_user_roles assignment exists

### If Dashboard Access Denied
1. Verify user.role === 'admin' in user metadata
2. Check profile table has role = 'admin'
3. Ensure is_admin() function returns true

### If Permissions Missing
1. Check admin_user_roles table for role assignment
2. Verify admin_role_permissions for super_admin role
3. Ensure all 4 permissions are assigned

## Security Notes
- Password uses strong encryption via Supabase Auth
- User has email verification enabled
- Admin sessions are tracked in admin_sessions table
- All admin actions are logged in admin_audit_log table
- Row Level Security (RLS) policies are enabled

## Next Steps
1. Test login functionality in the application
2. Verify dashboard access and navigation
3. Test CRUD operations on projects, services, etc.
4. Confirm all admin features work correctly
5. Test logout functionality

## Account Management
- To deactivate: Set `active = false` in admin_credentials
- To change role: Update admin_user_roles table
- To reset password: Use Supabase Auth password reset
- To revoke sessions: Use invalidate_admin_sessions() function
