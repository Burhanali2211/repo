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

// Helper function to safely inject scripts
const safelyInjectScript = (content: string, id: string, target: 'head' | 'body'): boolean => {
  try {
    // Validate script content
    if (!content || typeof content !== 'string') {
      console.warn(`Invalid script content for ${id}:`, content);
      return false;
    }

    let cleanContent = content.trim();

    // Skip if content is empty after cleaning
    if (!cleanContent) {
      console.warn(`Empty script content for ${id}`);
      return false;
    }

    // Check if content contains HTML tags (like <script>, <style>, etc.)
    const hasHtmlTags = /<[^>]+>/g.test(cleanContent);

    if (hasHtmlTags) {
      console.log(`Content for ${id} contains HTML tags, processing as HTML...`);

      // If it contains HTML, inject it as HTML instead of JavaScript
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cleanContent;
      tempDiv.id = id;
      tempDiv.style.display = 'none'; // Hide the container

      // Remove any existing element first
      const existingElement = document.getElementById(id);
      if (existingElement) {
        existingElement.remove();
      }

      // Append to the appropriate location
      const targetElement = target === 'head' ? document.head : document.body;
      targetElement.appendChild(tempDiv);

      console.log(`Successfully injected HTML content: ${id}`);
      return true;
    } else {
      // If it's pure JavaScript, validate it first
      try {
        // Try to parse as JavaScript to check for syntax errors
        new Function(cleanContent);
      } catch (jsError) {
        console.error(`JavaScript syntax error in ${id}:`, jsError);
        console.warn(`Skipping injection of malformed JavaScript for ${id}`);
        return false;
      }

      // Remove any existing script first
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }

      // Create new script element
      const script = document.createElement('script');
      script.id = id;
      script.textContent = cleanContent;

      // Append to the appropriate location
      const targetElement = target === 'head' ? document.head : document.body;
      targetElement.appendChild(script);

      console.log(`Successfully injected JavaScript: ${id}`);
      return true;
    }
  } catch (error) {
    console.error(`Failed to inject script ${id}:`, error);
    return false;
  }
};

// Component to add header/footer scripts from settings
export const SettingsScriptInjector = () => {
  const { settings } = useWebsiteSettings();

  useEffect(() => {
    if (!settings) return;

    // Skip script injection if scripts contain problematic content
    const skipHeaderScript = settings.header_scripts && (
      /<[^>]+>/g.test(settings.header_scripts) ||
      settings.header_scripts.includes('<') ||
      settings.header_scripts.includes('>')
    );

    const skipFooterScript = settings.footer_scripts && (
      /<[^>]+>/g.test(settings.footer_scripts) ||
      settings.footer_scripts.includes('<') ||
      settings.footer_scripts.includes('>')
    );

    if (skipHeaderScript) {
      console.warn('Skipping header script injection due to HTML content that may cause syntax errors');
    }

    if (skipFooterScript) {
      console.warn('Skipping footer script injection due to HTML content that may cause syntax errors');
    }

    try {
      // Add header scripts only if they're safe
      if (settings.header_scripts && !skipHeaderScript) {
        safelyInjectScript(settings.header_scripts, 'settings-header-script', 'head');
      }

      // Add footer scripts only if they're safe
      if (settings.footer_scripts && !skipFooterScript) {
        safelyInjectScript(settings.footer_scripts, 'settings-footer-script', 'body');
      }
    } catch (error) {
      console.error('Error in SettingsScriptInjector:', error);
      // Don't let script injection errors crash the app
    }

    // Cleanup function
    return () => {
      try {
        const headerScript = document.getElementById('settings-header-script');
        const footerScript = document.getElementById('settings-footer-script');

        if (headerScript) headerScript.remove();
        if (footerScript) footerScript.remove();
      } catch (error) {
        console.error('Error cleaning up scripts:', error);
      }
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
