import React, { ComponentType, lazy, Suspense } from 'react';
import DynamicImportErrorBoundary from '@/components/ErrorBoundary/DynamicImportErrorBoundary';

/**
 * Safe lazy loading utility that handles dynamic import failures gracefully
 */

interface SafeLazyOptions {
  fallback?: React.ComponentType;
  loadingComponent?: React.ComponentType;
  retryAttempts?: number;
  onError?: (error: Error) => void;
}

/**
 * Creates a safe lazy-loaded component with error handling and retry logic
 */
export function safeLazy<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: SafeLazyOptions = {}
): ComponentType {
  const {
    fallback: FallbackComponent,
    loadingComponent: LoadingComponent,
    retryAttempts = 3,
    onError
  } = options;

  // Default loading component
  const DefaultLoading = () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>
  );

  // Default fallback component for failed imports
  const DefaultFallback = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Content Unavailable
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          This section is temporarily unavailable. Please try refreshing the page.
        </p>
      </div>
    </div>
  );

  // Create the lazy component with retry logic
  const LazyComponent = lazy(async () => {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        const module = await importFn();
        return module;
      } catch (error) {
        lastError = error as Error;
        console.warn(`Lazy loading attempt ${attempt}/${retryAttempts} failed:`, error);
        
        // If this is a chunk loading error, wait before retrying
        if (attempt < retryAttempts && isChunkLoadError(error as Error)) {
          await new Promise(resolve => setTimeout(resolve, attempt * 1000));
        }
      }
    }
    
    // If all attempts failed, call onError callback
    if (onError && lastError) {
      onError(lastError);
    }
    
    // Return a fallback component
    return {
      default: FallbackComponent || DefaultFallback
    };
  });

  // Return the wrapped component
  return function SafeLazyWrapper(props: any) {
    return (
      <DynamicImportErrorBoundary
        fallback={FallbackComponent ? <FallbackComponent /> : <DefaultFallback />}
        onError={onError}
      >
        <Suspense fallback={LoadingComponent ? <LoadingComponent /> : <DefaultLoading />}>
          <LazyComponent {...props} />
        </Suspense>
      </DynamicImportErrorBoundary>
    );
  };
}

/**
 * Check if an error is related to chunk loading
 */
function isChunkLoadError(error: Error): boolean {
  return (
    error.message.includes('Loading chunk') ||
    error.message.includes('Failed to fetch') ||
    error.message.includes('Loading CSS chunk') ||
    error.message.includes('ChunkLoadError') ||
    error.name === 'ChunkLoadError'
  );
}

/**
 * Safe lazy loading for icon components from lucide-react
 */
export function safeLazyIcon(iconName: string) {
  return safeLazy(
    () => import('lucide-react').then(module => ({ default: (module as any)[iconName] })),
    {
      fallback: () => (
        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
      ),
      loadingComponent: () => (
        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
      ),
      retryAttempts: 2,
      onError: (error) => {
        console.warn(`Failed to load icon: ${iconName}`, error);
      }
    }
  );
}

/**
 * Safe lazy loading for page components
 */
export function safeLazyPage(
  importFn: () => Promise<{ default: ComponentType<any> }>,
  pageName: string
) {
  return safeLazy(importFn, {
    loadingComponent: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading {pageName}...</p>
        </div>
      </div>
    ),
    fallback: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Page Unavailable
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The {pageName} page could not be loaded. This might be due to a network issue.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    ),
    retryAttempts: 3,
    onError: (error) => {
      console.error(`Failed to load page: ${pageName}`, error);
    }
  });
}

/**
 * Safe lazy loading for section components
 */
export function safeLazySection(
  importFn: () => Promise<{ default: ComponentType<any> }>,
  sectionName: string
) {
  return safeLazy(importFn, {
    loadingComponent: () => (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    ),
    fallback: () => (
      <div className="py-20 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            The {sectionName} section is temporarily unavailable.
          </p>
        </div>
      </div>
    ),
    retryAttempts: 2,
    onError: (error) => {
      console.warn(`Failed to load section: ${sectionName}`, error);
    }
  });
}

export default safeLazy;
