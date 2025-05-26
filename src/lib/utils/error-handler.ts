import { PostgrestError } from '@supabase/supabase-js';

// Define a standard error response type
export type ErrorResponse = {
  message: string;
  details?: string;
  code?: string | number;
};

/**
 * Processes Supabase errors into a standardized format
 * @param error The error from Supabase
 * @returns Standardized error response
 */
export const handleSupabaseError = (error: PostgrestError | Error | unknown): ErrorResponse => {
  // Handle Supabase PostgrestError
  if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
    const postgrestError = error as PostgrestError;
    return {
      message: postgrestError.message || 'An error occurred with the database operation',
      details: postgrestError.details || undefined,
      code: postgrestError.code
    };
  }
  
  // Handle standard Error objects
  if (error instanceof Error) {
    return {
      message: error.message || 'An unexpected error occurred',
      details: error.stack
    };
  }
  
  // Handle unknown error types
  return {
    message: 'An unknown error occurred',
    details: error ? String(error) : undefined
  };
};

/**
 * Gets a user-friendly error message based on error type
 * @param error The error to process
 * @returns A user-friendly error message
 */
export const getUserFriendlyErrorMessage = (error: unknown): string => {
  const processedError = handleSupabaseError(error);
  
  // Map specific error codes to user-friendly messages
  if (processedError.code) {
    // Auth errors
    if (processedError.code === '23505') {
      return 'This record already exists.';
    }
    if (processedError.code === 'P0001') {
      return 'The operation was not permitted. You may not have sufficient permissions.';
    }
    if (processedError.code === '23503') {
      return 'This operation would violate referential integrity constraints.';
    }
  }
  
  // Return generic message for other errors
  return processedError.message || 'Something went wrong. Please try again later.';
};

/**
 * Logs an error to console with additional context
 * @param error The error object
 * @param context Additional context about where the error occurred
 */
export const logError = (error: unknown, context: string): void => {
  const processedError = handleSupabaseError(error);
  console.error(`Error in ${context}:`, {
    message: processedError.message,
    details: processedError.details,
    code: processedError.code
  });
};
