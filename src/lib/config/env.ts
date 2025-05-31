/**
 * Environment configuration with validation and fallbacks
 */

// Environment variable validation
const requiredEnvVars = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
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
    if (import.meta.env.DEV) {
      console.error('Please check your .env file and ensure all required variables are set.');
      console.error('You can copy .env.example to .env and update the values.');
    }
    
    // Don't throw in production to avoid breaking the app
    if (import.meta.env.PROD) {
      console.warn('App may not function correctly without proper environment configuration.');
    }
  }
};

// Validate on module load
validateEnv();

// Export validated environment variables
export const env = {
  supabase: {
    url: requiredEnvVars.VITE_SUPABASE_URL || '',
    anonKey: requiredEnvVars.VITE_SUPABASE_ANON_KEY || '',
  },
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;

// Type for environment configuration
export type EnvConfig = typeof env;
