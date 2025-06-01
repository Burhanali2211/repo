/**
 * Environment configuration with validation and fallbacks
 */

// Safe environment variable access with fallbacks
const getEnvVar = (key: string, fallback: string = ''): string => {
  try {
    const value = import.meta.env[key];
    return (typeof value === 'string' && value.trim() !== '') ? value : fallback;
  } catch (error) {
    console.warn(`Error accessing environment variable ${key}:`, error);
    return fallback;
  }
};

// Environment variable validation with safe access
const requiredEnvVars = {
  VITE_SUPABASE_URL: getEnvVar('VITE_SUPABASE_URL'),
  VITE_SUPABASE_ANON_KEY: getEnvVar('VITE_SUPABASE_ANON_KEY'),
} as const;

// Validate required environment variables
const validateEnv = () => {
  const missing: string[] = [];

  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value || value.trim() === '') {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    const errorMessage = `Missing required environment variables: ${missing.join(', ')}`;
    console.error(errorMessage);

    // In development, show a helpful error
    try {
      if (import.meta?.env?.DEV) {
        console.error('Please check your .env file and ensure all required variables are set.');
        console.error('You can copy .env.example to .env and update the values.');
      }

      // Don't throw in production to avoid breaking the app
      if (import.meta?.env?.PROD) {
        console.warn('App may not function correctly without proper environment configuration.');
      }
    } catch (error) {
      console.warn('Error checking environment mode:', error);
    }
  }
};

// Validate on module load
validateEnv();

// Export validated environment variables with safe access
export const env = {
  supabase: {
    url: requiredEnvVars.VITE_SUPABASE_URL || '',
    anonKey: requiredEnvVars.VITE_SUPABASE_ANON_KEY || '',
  },
  isDev: getEnvVar('DEV') === 'true' || false,
  isProd: getEnvVar('PROD') === 'true' || false,
  mode: getEnvVar('MODE') || 'development',
} as const;

// Type for environment configuration
export type EnvConfig = typeof env;
