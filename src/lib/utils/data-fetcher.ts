import { PostgrestError, AuthError } from '@supabase/supabase-js';
import { logError, ErrorResponse, handleSupabaseError } from './error-handler';
import { isAuthenticated, refreshSession } from '@/lib/supabase/client';

/**
 * Options for data fetching operations
 */
type FetchOptions<T> = {
  fallbackData?: T[];
  errorContext: string;
  transformer?: (data: unknown) => T[];
  requireAuth?: boolean;
  retryOnAuthFailure?: boolean;
};

/**
 * Result of a mutation operation
 */
export type MutationResult<T> = {
  success: boolean;
  data?: T;
  error?: ErrorResponse;
};

/**
 * Generic data fetcher with error handling, authentication, and fallback
 * @param fetchFn The async function that fetches data from Supabase
 * @param options Configuration options including fallback data
 * @returns A promise resolving to the fetched data or fallback
 */
export const fetchDataWithFallback = async <T>(
  fetchFn: () => Promise<{ data: unknown; error: PostgrestError | null }>,
  options: FetchOptions<T>
): Promise<T[]> => {
  try {
    // Check authentication if required
    if (options.requireAuth) {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        if (options.retryOnAuthFailure) {
          // Try to refresh the session
          const refreshed = await refreshSession();
          if (!refreshed) {
            throw new Error('Authentication required');
          }
        } else {
          throw new Error('Authentication required');
        }
      }
    }

    const { data, error } = await fetchFn();

    if (error) {
      throw error;
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.warn(`No data returned from ${options.errorContext}. Using fallback data.`);
      return options.fallbackData || [];
    }

    // Transform data if a transformer is provided
    if (options.transformer) {
      return options.transformer(data);
    }

    return Array.isArray(data) ? data as T[] : [data] as T[];
  } catch (error) {
    logError(error, options.errorContext);
    console.warn(`Error in ${options.errorContext}. Using fallback data.`);
    return options.fallbackData || [];
  }
};

/**
 * Execute a Supabase mutation (create, update, delete) with error handling and authentication
 * @param mutationFn The async function that performs the mutation
 * @param errorContext Context string for error logging
 * @param requireAuth Whether authentication is required for this mutation
 * @param retryOnAuthFailure Whether to retry if authentication fails
 * @returns The mutation result with success flag
 */
export const executeMutation = async <T>(
  mutationFn: () => Promise<{ data: unknown; error: PostgrestError | null }>,
  errorContext: string,
  requireAuth: boolean = true,
  retryOnAuthFailure: boolean = true
): Promise<MutationResult<T>> => {
  try {
    // Check authentication if required
    if (requireAuth) {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        if (retryOnAuthFailure) {
          // Try to refresh the session
          const refreshed = await refreshSession();
          if (!refreshed) {
            throw new Error('Authentication required');
          }
        } else {
          throw new Error('Authentication required');
        }
      }
    }

    const { data, error } = await mutationFn();

    if (error) {
      throw error;
    }

    return {
      success: true,
      data: data as T
    };
  } catch (error) {
    logError(error, errorContext);
    const processedError = handleSupabaseError(error);
    return {
      success: false,
      error: processedError
    };
  }
};

/**
 * Fetches data with retry logic for authentication failures
 * @param fetchFn The function to fetch data
 * @param options Options for fetching
 * @returns The fetched data or null on failure
 */
export const fetchWithAuthRetry = async <T>(
  fetchFn: () => Promise<{ data: unknown; error: PostgrestError | null }>,
  options: {
    errorContext: string;
    maxRetries?: number;
  }
): Promise<T | null> => {
  const maxRetries = options.maxRetries || 1;
  let retries = 0;

  while (retries <= maxRetries) {
    try {
      const { data, error } = await fetchFn();

      if (error) {
        // Check if it's an auth error
        if (error.code === '401' || error.code === '403' || error.message.includes('auth')) {
          if (retries < maxRetries) {
            // Try to refresh the session
            const refreshed = await refreshSession();
            if (refreshed) {
              retries++;
              continue;
            }
          }
        }
        throw error;
      }

      return data as T;
    } catch (error) {
      logError(error, `${options.errorContext} (attempt ${retries + 1}/${maxRetries + 1})`);
      if (retries >= maxRetries) {
        return null;
      }
      retries++;
    }
  }

  return null;
};
