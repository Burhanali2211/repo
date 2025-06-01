/**
 * Safe property access utilities to prevent "undefined has no properties" errors
 */
import React from 'react';

/**
 * Safely access nested object properties
 * @param obj The object to access
 * @param path The property path (e.g., 'user.profile.name')
 * @param defaultValue The default value to return if path is not found
 * @returns The value at the path or the default value
 */
export const safeGet = <T = unknown>(
  obj: Record<string, unknown> | null | undefined,
  path: string,
  defaultValue: T | null = null
): T | null => {
  try {
    if (!obj || typeof obj !== 'object') {
      return defaultValue;
    }

    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return defaultValue;
      }
      current = current[key];
    }

    return current !== undefined ? current : defaultValue;
  } catch (error) {
    console.warn(`Safe access error for path "${path}":`, error);
    return defaultValue;
  }
};

/**
 * Safely execute a function with error handling
 * @param fn The function to execute
 * @param fallback The fallback value if function throws
 * @param context Optional context for error logging
 * @returns The function result or fallback value
 */
export const safeExecute = <T = unknown>(
  fn: () => T,
  fallback: T,
  context?: string
): T => {
  try {
    return fn();
  } catch (error) {
    if (context) {
      console.warn(`Safe execution error in ${context}:`, error);
    } else {
      console.warn('Safe execution error:', error);
    }
    return fallback;
  }
};

/**
 * Safely access array elements
 * @param arr The array to access
 * @param index The index to access
 * @param defaultValue The default value if index is out of bounds
 * @returns The array element or default value
 */
export const safeArrayAccess = <T = unknown>(
  arr: T[] | null | undefined,
  index: number,
  defaultValue: T | null = null
): T | null => {
  try {
    if (!Array.isArray(arr) || index < 0 || index >= arr.length) {
      return defaultValue;
    }
    return arr[index] !== undefined ? arr[index] : defaultValue;
  } catch (error) {
    console.warn(`Safe array access error at index ${index}:`, error);
    return defaultValue;
  }
};

/**
 * Safely parse JSON with fallback
 * @param jsonString The JSON string to parse
 * @param fallback The fallback value if parsing fails
 * @returns The parsed object or fallback value
 */
export const safeJsonParse = <T = unknown>(
  jsonString: string | null | undefined,
  fallback: T
): T => {
  try {
    if (!jsonString || typeof jsonString !== 'string') {
      return fallback;
    }
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Safe JSON parse error:', error);
    return fallback;
  }
};

/**
 * Safely access localStorage with fallback
 * @param key The localStorage key
 * @param fallback The fallback value if key doesn't exist or access fails
 * @returns The stored value or fallback
 */
export const safeLocalStorageGet = <T = unknown>(
  key: string,
  fallback: T
): T => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }

    const item = localStorage.getItem(key);
    if (item === null) {
      return fallback;
    }

    return JSON.parse(item);
  } catch (error) {
    console.warn(`Safe localStorage get error for key "${key}":`, error);
    return fallback;
  }
};

/**
 * Safely set localStorage with error handling
 * @param key The localStorage key
 * @param value The value to store
 * @returns True if successful, false otherwise
 */
export const safeLocalStorageSet = (key: string, value: unknown): boolean => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }

    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Safe localStorage set error for key "${key}":`, error);
    return false;
  }
};

/**
 * Safely access environment variables
 * @param key The environment variable key
 * @param fallback The fallback value
 * @returns The environment variable value or fallback
 */
export const safeEnvGet = (key: string, fallback: string = ''): string => {
  try {
    const value = import.meta?.env?.[key];
    return (typeof value === 'string' && value.trim() !== '') ? value : fallback;
  } catch (error) {
    console.warn(`Safe env get error for key "${key}":`, error);
    return fallback;
  }
};

/**
 * Safely destructure objects with default values
 * @param obj The object to destructure
 * @param defaults The default values
 * @returns The destructured object with defaults applied
 */
export const safeDestructure = <T extends Record<string, unknown>>(
  obj: Partial<T> | null | undefined,
  defaults: T
): T => {
  try {
    if (!obj || typeof obj !== 'object') {
      return defaults;
    }

    return { ...defaults, ...obj };
  } catch (error) {
    console.warn('Safe destructure error:', error);
    return defaults;
  }
};

/**
 * Create a safe wrapper for React components to prevent crashes
 * @param Component The component to wrap
 * @param fallback The fallback component to render on error
 * @returns The wrapped component
 */
export const createSafeComponent = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  fallback: React.ComponentType<P> | null = null
) => {
  return (props: P) => {
    try {
      // Use React.createElement to avoid JSX syntax issues in TypeScript
      return React.createElement(Component, props);
    } catch (error) {
      console.error('Component render error:', error);
      if (fallback && typeof fallback === 'function') {
        return React.createElement(fallback, props);
      }
      return null;
    }
  };
};

/**
 * Safe async function wrapper
 * @param asyncFn The async function to wrap
 * @param fallback The fallback value on error
 * @param context Optional context for error logging
 * @returns Promise that resolves to result or fallback
 */
export const safeAsync = async <T = unknown>(
  asyncFn: () => Promise<T>,
  fallback: T,
  context?: string
): Promise<T> => {
  try {
    return await asyncFn();
  } catch (error) {
    if (context) {
      console.warn(`Safe async error in ${context}:`, error);
    } else {
      console.warn('Safe async error:', error);
    }
    return fallback;
  }
};
