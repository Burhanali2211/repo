import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions: string[];
  lastLogin: string | null;
}

export const useAdminAuth = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if we have an admin session on component mount
    const checkAdminSession = async () => {
      try {
        setIsLoading(true);
        
        // First check if we have a Supabase auth session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setAdminUser(null);
          return;
        }
        
        // Then check if this user is an admin
        const { data: isAdminData, error: isAdminError } = await supabase.rpc('is_admin', {
          user_id: session.user.id
        });
        
        if (isAdminError || !isAdminData) {
          setAdminUser(null);
          return;
        }
        
        // Get admin user details
        const { data: userData, error: userError } = await supabase
          .from('admin_credentials')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (userError || !userData) {
          setAdminUser(null);
          return;
        }
        
        // Get admin permissions
        const { data: permissionsData, error: permissionsError } = await supabase.rpc('get_admin_permissions', {
          admin_id: session.user.id
        });
        
        if (permissionsError) {
          console.error('Error fetching permissions:', permissionsError);
        }
        
        // Get user profile for name details
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', session.user.id)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile:', profileError);
        }
        
        // Construct admin user object
        const admin: AdminUser = {
          id: userData.id,
          email: userData.email,
          firstName: profileData?.first_name || session.user.user_metadata?.first_name || '',
          lastName: profileData?.last_name || session.user.user_metadata?.last_name || '',
          role: 'admin',
          permissions: permissionsData?.map(p => p.permission_name) || [],
          lastLogin: userData.last_login
        };
        
        setAdminUser(admin);
        
        // Record this login session
        await supabase.rpc('record_admin_login', {
          admin_id: session.user.id,
          ip_address: '',
          user_agent: navigator.userAgent
        });
        
      } catch (error) {
        console.error('Error checking admin session:', error);
        setAdminUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminSession();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        checkAdminSession();
      } else if (event === 'SIGNED_OUT') {
        setAdminUser(null);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Sign in with Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (!data.user) {
        throw new Error('No user returned from login');
      }
      
      // Check if this user is an admin
      const { data: isAdminData, error: isAdminError } = await supabase.rpc('is_admin', {
        user_id: data.user.id
      });
      
      if (isAdminError || !isAdminData) {
        // If not an admin, sign them out immediately
        await supabase.auth.signOut();
        throw new Error('User is not authorized as an admin');
      }
      
      // The onAuthStateChange listener will handle updating the admin user
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the dashboard"
      });
      
      return true;
    } catch (error) {
      console.error('Admin login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials or not authorized as admin",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logoutAdmin = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      if (adminUser) {
        // Invalidate all admin sessions
        await supabase.rpc('invalidate_admin_sessions', {
          admin_id: adminUser.id
        });
      }
      
      // Sign out from Supabase auth
      await supabase.auth.signOut();
      
      setAdminUser(null);
      
      toast({
        title: "Logout Successful",
        description: "You have been logged out"
      });
      
      return true;
    } catch (error) {
      console.error('Admin logout error:', error);
      toast({
        title: "Logout Failed",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const hasPermission = (resource: string, action: string): boolean => {
    if (!adminUser) return false;
    
    // Super admin has all permissions
    if (adminUser.permissions.includes('manage_users')) {
      return true;
    }
    
    // Check for specific permission
    return adminUser.permissions.some(p => {
      const [res, act] = p.split(':');
      return (res === resource || res === '*') && (act === action || act === '*');
    });
  };
  
  return {
    adminUser,
    isLoading,
    loginAdmin,
    logoutAdmin,
    hasPermission,
    isAdmin: !!adminUser,
  };
};

export default useAdminAuth;
