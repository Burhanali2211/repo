
import * as React from 'react';
const { createContext, useContext, useState, useEffect } = React;
import { supabase, getCurrentUser } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'client';
  company?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize authentication state from Supabase
    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        // Get the current session and user from Supabase
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          // Create a user object from Supabase auth data only
          // Don't depend on profiles table to avoid 406 errors
          const basicUser: User = {
            id: session.user.id,
            email: session.user.email || '',
            firstName: session.user.user_metadata?.first_name || 'User',
            lastName: session.user.user_metadata?.last_name || '',
            role: session.user.user_metadata?.role || 'client',
            company: session.user.user_metadata?.company
          };
          setUser(basicUser);
          localStorage.setItem('user', JSON.stringify(basicUser));
        } else {
          // No session, clear everything
          setUser(null);
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Don't show error toast for auth initialization issues
        // Just clear the user state
        setUser(null);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          initializeAuth();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('user');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [toast]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      // Auth state change listener will handle updating the user
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: 'client',
            company: userData.company || ''
          }
        }
      });

      if (error) {
        throw error;
      }

      // No need to create user profile in separate table, using auth metadata is sufficient
      // The user metadata is already stored in the auth.users table by Supabase

      toast({
        title: "Registration Successful",
        description: "Your account has been created. You may need to verify your email before logging in."
      });

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was a problem creating your account. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      // Sign out with Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      // Auth state change listener will handle clearing the user
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive"
      });

      // Force clean up anyway
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
