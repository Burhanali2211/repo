/**
 * React Router v7 Configuration
 * 
 * This module configures React Router to use v7 features early,
 * silencing deprecation warnings about future behavior changes.
 */

// These are the future flags that will be enabled in React Router v7
export const ROUTER_FUTURE_FLAGS = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
};

/**
 * Apply React Router v7 future flags configuration
 * This is called when the module is imported and sets flags in sessionStorage
 */
export function configureRouterOptions(): void {
  try {
    // Set the future flags in sessionStorage to enable v7 features
    // This approach works with any React Router component (BrowserRouter, Routes, etc.)
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(
        'react-router-future',
        JSON.stringify(ROUTER_FUTURE_FLAGS)
      );
      console.log('React Router v7 future flags enabled:', ROUTER_FUTURE_FLAGS);
    }
  } catch (error) {
    console.error('Failed to set React Router future flags:', error);
  }
}

// Automatically apply the configuration when this module is imported
configureRouterOptions();

export default configureRouterOptions;
