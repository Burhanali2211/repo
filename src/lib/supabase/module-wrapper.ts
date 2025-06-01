/**
 * Supabase Module Wrapper
 *
 * This wrapper ensures proper ES module exports for Supabase dependencies
 * and fixes CommonJS/ESM interop issues that can cause production errors.
 */

// Import Supabase with proper module resolution
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Re-export with proper ES module syntax
export { createClient };
export type { Database };

// Export specific types that might be needed
export type {
  SupabaseClient,
  Session,
  User,
  AuthError,
  PostgrestError,
  RealtimeChannel,
  RealtimePostgresChangesPayload,
} from '@supabase/supabase-js';

/**
 * Create a properly typed Supabase client with ES module compatibility
 */
export const createSupabaseClient = (
  supabaseUrl: string,
  supabaseKey: string,
  options?: Record<string, unknown>
) => {
  try {
    return createClient<Database>(supabaseUrl, supabaseKey, options);
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    throw new Error('Supabase client creation failed. Check your configuration.');
  }
};

/**
 * Validate Supabase module availability
 */
export const validateSupabaseModules = () => {
  try {
    // Check if createClient is available
    if (typeof createClient !== 'function') {
      throw new Error('createClient is not available from @supabase/supabase-js');
    }

    // Check if we can create a client (without actually connecting)
    const testClient = createClient('https://test.supabase.co', 'test-key');
    if (!testClient) {
      throw new Error('Failed to create test Supabase client');
    }

    return true;
  } catch (error) {
    console.error('Supabase module validation failed:', error);
    return false;
  }
};

/**
 * Safe Supabase import with error handling
 */
export const safeSupabaseImport = async () => {
  try {
    // Validate modules are available
    if (!validateSupabaseModules()) {
      throw new Error('Supabase modules validation failed');
    }

    return {
      createClient,
      createSupabaseClient,
      success: true,
      error: null
    };
  } catch (error) {
    console.error('Safe Supabase import failed:', error);
    return {
      createClient: null,
      createSupabaseClient: null,
      success: false,
      error: error as Error
    };
  }
};
