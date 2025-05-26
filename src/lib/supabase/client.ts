import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Helper to check if user is authenticated with fallback to localStorage
export const isAuthenticated = async () => {
  try {
    // First check for a session with Supabase
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    if (data.session) {
      // Verify session is not expired
      const now = Math.floor(Date.now() / 1000);
      if (data.session.expires_at && data.session.expires_at > now) {
        return true;
      }
    }

    // If no valid session, check localStorage as fallback
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        // Validate that the stored user has the expected format
        const user = JSON.parse(storedUser);
        if (user && user.id) {
          // Log that we're using fallback authentication
          console.info('Using fallback authentication from localStorage');
          return true;
        }
      } catch (parseError) {
        console.error('Error parsing stored user:', parseError);
        localStorage.removeItem('user'); // Clear invalid data
        return false;
      }
    }

    // No valid authentication found
    return false;
  } catch (error) {
    console.error('Error checking authentication:', error);
    // Use the error handler to standardize error logging
    const { logError } = await import('../utils/error-handler');
    logError(error, 'isAuthenticated');

    // Fallback to localStorage only if there's an error with Supabase
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        return !!user?.id;
      }
    } catch (fallbackError) {
      console.error('Fallback authentication failed:', fallbackError);
      localStorage.removeItem('user'); // Clear invalid data
    }

    return false;
  }
};

// Define a type for the user object returned from localStorage
type StoredUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  company?: string;
};

// Helper to get current user with localStorage fallback
export const getCurrentUser = async () => {
  try {
    // First try to get user from Supabase
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    if (data.user) {
      return data.user;
    }

    // If no user from Supabase, check localStorage
    return getUserFromLocalStorage();
  } catch (error) {
    // Use the error handler to standardize error logging
    const { logError } = await import('../utils/error-handler');
    logError(error, 'getCurrentUser');

    // Fallback to localStorage if there's an error
    return getUserFromLocalStorage();
  }
};

/**
 * Helper function to get user from localStorage
 * @returns A user object formatted to match Supabase user structure or null
 */
const getUserFromLocalStorage = () => {
  try {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;

    const user = JSON.parse(storedUser) as StoredUser;
    if (!user || !user.id) {
      localStorage.removeItem('user'); // Clear invalid data
      return null;
    }

    // Convert stored user format to match Supabase user format
    return {
      id: user.id,
      email: user.email,
      user_metadata: {
        first_name: user.firstName,
        last_name: user.lastName,
        role: user.role,
        company: user.company
      }
    };
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    localStorage.removeItem('user'); // Clear invalid data
    return null;
  }
};

/**
 * Refreshes the authentication session
 * @returns True if session was refreshed successfully
 */
export const refreshSession = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    return !!data.session;
  } catch (error) {
    const { logError } = await import('../utils/error-handler');
    logError(error, 'refreshSession');
    return false;
  }
};
