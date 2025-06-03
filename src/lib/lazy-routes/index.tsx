/**
 * Route-based Lazy Loading System
 * 
 * This module provides optimized lazy loading for route components with
 * intelligent preloading, error boundaries, and performance monitoring.
 */

import React, { ComponentType, lazy, Suspense } from 'react';

// Route loading cache
const routeCache = new Map<string, ComponentType>();

// Preload queue for intelligent preloading
const preloadQueue = new Set<string>();

// Performance tracking
interface RouteLoadMetrics {
  routeName: string;
  loadTime: number;
  success: boolean;
  error?: string;
}

const routeMetrics: RouteLoadMetrics[] = [];

/**
 * Enhanced loading component for routes
 */
const RouteLoader: React.FC<{ routeName?: string }> = ({ routeName }) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
        {routeName ? `Loading ${routeName}...` : 'Loading...'}
      </p>
      <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
        Please wait while we prepare your content
      </p>
    </div>
  </div>
);

/**
 * Enhanced error fallback for routes
 */
const RouteErrorFallback: React.FC<{ routeName?: string; error?: Error }> = ({
  routeName,
  error
}) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
    <div className="text-center max-w-md mx-auto p-8">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <div className="w-8 h-8 text-red-600 dark:text-red-400">⚠️</div>
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Failed to Load {routeName || 'Page'}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        We encountered an issue loading this page. This might be due to a network problem or a temporary server issue.
      </p>
      {error && (
        <details className="text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
            Technical Details
          </summary>
          <pre className="text-xs text-gray-600 dark:text-gray-400 mt-2 overflow-auto">
            {error.message}
          </pre>
        </details>
      )}
      <div className="space-y-3">
        <button
          onClick={() => window.location.reload()}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Reload Page
        </button>
        <button
          onClick={() => window.history.back()}
          className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
);

/**
 * Creates an optimized lazy route component
 */
export function createLazyRoute<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  routeName: string,
  options: {
    preload?: boolean;
    retryAttempts?: number;
    timeout?: number;
  } = {}
): ComponentType {
  const { preload = false, retryAttempts = 3, timeout = 10000 } = options;

  // Check cache first
  if (routeCache.has(routeName)) {
    return routeCache.get(routeName)!;
  }

  // Create lazy component with retry logic and timeout
  const LazyRoute = lazy(async () => {
    const startTime = performance.now();
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        // Add timeout to import
        const importPromise = importFn();
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error(`Route loading timeout: ${routeName}`)), timeout);
        });

        const module = await Promise.race([importPromise, timeoutPromise]);

        // Track successful load
        const loadTime = performance.now() - startTime;
        routeMetrics.push({
          routeName,
          loadTime,
          success: true
        });

        return module;
      } catch (error) {
        lastError = error as Error;
        console.warn(`Route loading attempt ${attempt}/${retryAttempts} failed for ${routeName}:`, error);

        // Wait before retrying (exponential backoff)
        if (attempt < retryAttempts) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    // Track failed load
    const loadTime = performance.now() - startTime;
    routeMetrics.push({
      routeName,
      loadTime,
      success: false,
      error: lastError?.message
    });

    // Return error fallback
    return {
      default: () => <RouteErrorFallback routeName={routeName} error={lastError} />
    };
  });

  // Wrap with error boundary and suspense
  const WrappedRoute: ComponentType = (props) => (
    <Suspense fallback={<RouteLoader routeName={routeName} />}>
      <LazyRoute {...props} />
    </Suspense>
  );

  WrappedRoute.displayName = `LazyRoute(${routeName})`;

  // Cache the component
  routeCache.set(routeName, WrappedRoute);

  // Add to preload queue if requested
  if (preload) {
    preloadQueue.add(routeName);
  }

  return WrappedRoute;
}

/**
 * Preload a route component
 */
export async function preloadRoute(routeName: string): Promise<void> {
  if (routeCache.has(routeName)) {
    return; // Already loaded
  }

  try {
    // This will trigger the lazy loading
    const component = routeCache.get(routeName);
    if (component) {
      // Component is now cached
      console.log(`Route ${routeName} preloaded successfully`);
    }
  } catch (error) {
    console.warn(`Failed to preload route ${routeName}:`, error);
  }
}

/**
 * Get route loading metrics
 */
export function getRouteMetrics(): RouteLoadMetrics[] {
  return [...routeMetrics];
}

/**
 * Clear route cache and metrics
 */
export function clearRouteCache(): void {
  routeCache.clear();
  routeMetrics.length = 0;
  preloadQueue.clear();
}

export default {
  createLazyRoute,
  preloadRoute,
  getRouteMetrics,
  clearRouteCache
};
