/**
 * Environment configuration with validation and fallbacks
 * Fixed to prevent "Cannot access 'a' before initialization" errors
 */

// Safe environment variable access with fallbacks and initialization guards
const getEnvVar = (key: string, fallback: string = ''): string => {
  try {
    // Ensure import.meta.env is available before accessing
    if (typeof import.meta === 'undefined' || !import.meta.env) {
      console.warn(`import.meta.env not available for ${key}, using fallback`);
      return fallback;
    }

    const value = import.meta.env[key];
    return (typeof value === 'string' && value.trim() !== '') ? value : fallback;
  } catch (error) {
    console.warn(`Error accessing environment variable ${key}:`, error);
    return fallback;
  }
};

// Lazy initialization to prevent circular dependency issues
let requiredEnvVars: {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
} | null = null;

const getRequiredEnvVars = () => {
  if (requiredEnvVars === null) {
    requiredEnvVars = {
      VITE_SUPABASE_URL: getEnvVar('VITE_SUPABASE_URL'),
      VITE_SUPABASE_ANON_KEY: getEnvVar('VITE_SUPABASE_ANON_KEY'),
    };
  }
  return requiredEnvVars;
};

// Validate required environment variables with lazy loading
const validateEnv = () => {
  const missing: string[] = [];
  const envVars = getRequiredEnvVars();

  Object.entries(envVars).forEach(([key, value]) => {
    if (!value || value.trim() === '') {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    const errorMessage = `Missing required environment variables: ${missing.join(', ')}`;
    console.error(errorMessage);

    // In development, show a helpful error
    try {
      if (typeof import.meta !== 'undefined' && import.meta?.env?.DEV) {
        console.error('Please check your .env file and ensure all required variables are set.');
        console.error('You can copy .env.example to .env and update the values.');
      }

      // Don't throw in production to avoid breaking the app
      if (typeof import.meta !== 'undefined' && import.meta?.env?.PROD) {
        console.warn('App may not function correctly without proper environment configuration.');
      }
    } catch (error) {
      console.warn('Error checking environment mode:', error);
    }
  }
};

// Lazy environment object to prevent initialization issues
let envInstance: {
  supabase: {
    url: string;
    anonKey: string;
  };
  isDev: boolean;
  isProd: boolean;
  mode: string;
} | null = null;

// Export validated environment variables with safe access and lazy initialization
export const env = new Proxy({} as Record<string, unknown>, {
  get(target, prop) {
    if (envInstance === null) {
      // Initialize environment on first access
      try {
        validateEnv();
        const envVars = getRequiredEnvVars();

        envInstance = {
          supabase: {
            url: envVars.VITE_SUPABASE_URL || '',
            anonKey: envVars.VITE_SUPABASE_ANON_KEY || '',
          },
          isDev: getEnvVar('DEV') === 'true' || false,
          isProd: getEnvVar('PROD') === 'true' || false,
          mode: getEnvVar('MODE') || 'development',
        };
      } catch (error) {
        console.error('Error initializing environment:', error);
        // Fallback environment
        envInstance = {
          supabase: {
            url: '',
            anonKey: '',
          },
          isDev: false,
          isProd: true,
          mode: 'production',
        };
      }
    }

    return envInstance[prop as keyof typeof envInstance];
  }
});

// Type for environment configuration
export type EnvConfig = typeof env;
