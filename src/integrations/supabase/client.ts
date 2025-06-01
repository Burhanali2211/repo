import { createSupabaseClient, validateSupabaseModules } from '@/lib/supabase/module-wrapper';
import type { Database } from './types';
import { env } from '@/lib/config/env';

// Lazy initialization to prevent "Cannot access 'a' before initialization" errors
let SUPABASE_URL: string | null = null;
let SUPABASE_ANON_KEY: string | null = null;

const getSupabaseConfig = () => {
  if (SUPABASE_URL === null || SUPABASE_ANON_KEY === null) {
    try {
      // Access env lazily to prevent initialization issues
      SUPABASE_URL = env?.supabase?.url || '';
      SUPABASE_ANON_KEY = env?.supabase?.anonKey || '';

      // Validate that we have the required values
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.error('Missing Supabase configuration:', {
          hasUrl: !!SUPABASE_URL,
          hasKey: !!SUPABASE_ANON_KEY,
          url: SUPABASE_URL ? 'Present' : 'Missing',
          key: SUPABASE_ANON_KEY ? 'Present' : 'Missing'
        });
      }
    } catch (error) {
      console.error('Error accessing Supabase configuration:', error);
      SUPABASE_URL = '';
      SUPABASE_ANON_KEY = '';
    }
  }

  return { url: SUPABASE_URL, key: SUPABASE_ANON_KEY };
};

// Create a singleton variable to ensure we only create one client instance
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

// Enhanced storage options for better session persistence
const storageOptions = {
  persistSession: true,
  autoRefreshToken: true,
  detectSessionInUrl: false, // Setting to false to avoid URL parsing issues
  localStorage: {
    getItem: (key: string) => {
      try {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
          return storedValue;
        }
      } catch (error) {
        console.warn('Error accessing localStorage:', error);
      }
      return null;
    },
    setItem: (key: string, value: string) => {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.warn('Error setting localStorage value:', error);
      }
    },
    removeItem: (key: string) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn('Error removing localStorage value:', error);
      }
    }
  }
};

// Create a single supabase client for interacting with your database with lazy initialization
export const supabase = (() => {
  if (supabaseInstance) return supabaseInstance;

  try {
    // Get configuration lazily to prevent initialization issues
    const config = getSupabaseConfig();

    // Ensure we have valid URL and key before creating client
    if (!config.url || !config.key) {
      console.error('Missing Supabase configuration:', {
        hasUrl: !!config.url,
        hasKey: !!config.key,
        url: config.url ? 'Present' : 'Missing',
        key: config.key ? 'Present' : 'Missing'
      });
      throw new Error('Missing required Supabase configuration. Please check your environment variables.');
    }

    // Validate Supabase modules before creating client
    if (!validateSupabaseModules()) {
      throw new Error('Supabase modules validation failed');
    }

    supabaseInstance = createSupabaseClient(
      config.url,
      config.key,
      {
        auth: storageOptions
      }
    );

    console.log('Supabase client created successfully');
    return supabaseInstance;
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    throw error;
  }
})();

// Initialize the auth session without awaiting to avoid blocking render
if (typeof window !== 'undefined') {
  // Wrap in setTimeout to ensure it runs after the component tree is mounted
  setTimeout(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        if (error.message !== 'Auth session missing!') {
          console.warn('Session initialization error:', error);
        }
      }
      if (data?.session) {
        console.log('Session initialized successfully');
      }
    });
  }, 0);
}

// Helper to get current user with localStorage fallback
export const getCurrentUser = async () => {
  try {
    // Try to get the session first
    const { data: sessionData } = await supabase.auth.getSession();

    // If we have a session, get the user
    if (sessionData?.session) {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        return data.user;
      }
    }

    // No session or error getting user, try refreshing
    const refreshResult = await refreshSession();
    if (refreshResult) {
      // Try again after refresh
      const { data: refreshedData, error: refreshedError } = await supabase.auth.getUser();
      if (!refreshedError && refreshedData.user) {
        return refreshedData.user;
      }
    }

    // If still no user from Supabase, check localStorage
    return getUserFromLocalStorage();
  } catch (error) {
    // Only log real errors, not just missing session
    if (error.message !== 'Auth session missing!') {
      console.error('Error in getCurrentUser:', error);
    }

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

    const user = JSON.parse(storedUser);
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
    // First check if we have a session
    const { data: sessionData } = await supabase.auth.getSession();

    // Only try to refresh if we actually have a session
    if (sessionData?.session) {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        // Only log real errors, not just missing session
        if (error.message !== 'Auth session missing!') {
          console.error('Failed to refresh session:', error);
        }
        return false;
      }
      return !!data.session;
    }

    return false;
  } catch (error) {
    // Only log real errors, not just missing session
    if (error.message !== 'Auth session missing!') {
      console.error('Error in refreshSession:', error);
    }
    return false;
  }
};
