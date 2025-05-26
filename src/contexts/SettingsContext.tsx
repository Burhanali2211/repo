import * as React from 'react';
const { createContext, useContext, useState, useEffect } = React;
import { useSettings, type SiteSettings } from '@/hooks/useSettings';

interface SettingsContextType {
  settings: SiteSettings | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { settings, loading, error, fetchSettings } = useSettings();

  // Fetch settings on initial load
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const value = {
    settings,
    loading,
    error,
    refresh: fetchSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useWebsiteSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useWebsiteSettings must be used within a SettingsProvider');
  }
  return context;
};

// Utility components to apply settings across the app

// Component that applies site colors from settings to CSS variables
export const SettingsStyleProvider = () => {
  const { settings } = useWebsiteSettings();
  
  useEffect(() => {
    if (settings) {
      // Set CSS variables for colors
      if (settings.primary_color) {
        document.documentElement.style.setProperty('--primary-color', settings.primary_color);
      }
      if (settings.secondary_color) {
        document.documentElement.style.setProperty('--secondary-color', settings.secondary_color);
      }
    }
  }, [settings]);
  
  // This component doesn't render anything visible
  return null;
};

// Component to add header/footer scripts from settings
export const SettingsScriptInjector = () => {
  const { settings } = useWebsiteSettings();
  
  useEffect(() => {
    if (settings) {
      // Add header scripts
      if (settings.header_scripts) {
        const headerScript = document.createElement('script');
        headerScript.innerHTML = settings.header_scripts;
        headerScript.id = 'settings-header-script';
        
        // Remove any existing script first
        const existingScript = document.getElementById('settings-header-script');
        if (existingScript) {
          existingScript.remove();
        }
        
        document.head.appendChild(headerScript);
      }
      
      // Add footer scripts
      if (settings.footer_scripts) {
        const footerScript = document.createElement('script');
        footerScript.innerHTML = settings.footer_scripts;
        footerScript.id = 'settings-footer-script';
        
        // Remove any existing script first
        const existingScript = document.getElementById('settings-footer-script');
        if (existingScript) {
          existingScript.remove();
        }
        
        document.body.appendChild(footerScript);
      }
    }
    
    // Cleanup function
    return () => {
      const headerScript = document.getElementById('settings-header-script');
      const footerScript = document.getElementById('settings-footer-script');
      
      if (headerScript) headerScript.remove();
      if (footerScript) footerScript.remove();
    };
  }, [settings]);
  
  // This component doesn't render anything visible
  return null;
};

// Component that shows maintenance mode when enabled
export const MaintenanceMode = ({ children }: { children: React.ReactNode }) => {
  const { settings, loading } = useWebsiteSettings();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (settings?.is_maintenance_mode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Maintenance Mode</h1>
          <p className="text-gray-600 mb-6">
            {settings.maintenance_message || "We're currently performing maintenance. Please check back soon."}
          </p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};
