import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Ensure context has all required properties with safe defaults
  return {
    settings: context.settings || null,
    loading: context.loading || false,
    error: context.error || null,
    refresh: context.refresh || (() => Promise.resolve()),
    ...context
  };
};

// Utility components to apply settings across the app

// Component that applies site colors and typography from settings to CSS variables
export const SettingsStyleProvider = () => {
  const { settings } = useWebsiteSettings();

  useEffect(() => {
    if (settings) {
      // Set CSS variables for colors with fallbacks
      const colorMappings = [
        { setting: settings.primary_color, variable: '--primary-color' },
        { setting: settings.secondary_color, variable: '--secondary-color' },
        { setting: settings.accent_color, variable: '--accent-color' },
        { setting: settings.background_color, variable: '--background-color' },
        { setting: settings.background_color_dark, variable: '--background-color-dark' },
        { setting: settings.text_color, variable: '--text-color' },
        { setting: settings.text_color_dark, variable: '--text-color-dark' },
        { setting: settings.border_color, variable: '--border-color' },
        { setting: settings.border_color_dark, variable: '--border-color-dark' }
      ];

      colorMappings.forEach(({ setting, variable }) => {
        if (setting) {
          document.documentElement.style.setProperty(variable, setting);
        }
      });

      // Also update Tailwind CSS custom properties for better integration
      if (settings.primary_color) {
        // Convert hex to HSL for Tailwind compatibility
        const hsl = hexToHsl(settings.primary_color);
        if (hsl) {
          document.documentElement.style.setProperty('--primary', hsl);
        }
      }

      if (settings.secondary_color) {
        const hsl = hexToHsl(settings.secondary_color);
        if (hsl) {
          document.documentElement.style.setProperty('--secondary', hsl);
        }
      }

      if (settings.accent_color) {
        const hsl = hexToHsl(settings.accent_color);
        if (hsl) {
          document.documentElement.style.setProperty('--accent', hsl);
        }
      }

      // Set CSS variables for typography
      if (settings.font_family) {
        document.documentElement.style.setProperty('--font-family', settings.font_family);
      }
      if (settings.font_size) {
        document.documentElement.style.setProperty('--font-size', `${settings.font_size}px`);
      }
      if (settings.line_height) {
        document.documentElement.style.setProperty('--line-height', settings.line_height);
      }
      if (settings.font_weight) {
        document.documentElement.style.setProperty('--font-weight', settings.font_weight);
      }

      // Apply custom CSS if available
      if (settings.custom_css) {
        // Remove existing custom styles
        const existingStyle = document.getElementById('settings-custom-css');
        if (existingStyle) {
          existingStyle.remove();
        }

        // Add new custom styles
        const style = document.createElement('style');
        style.id = 'settings-custom-css';
        style.textContent = settings.custom_css;
        document.head.appendChild(style);
      }
    }
  }, [settings]);

  // This component doesn't render anything visible
  return null;
};

// Helper function to convert hex to HSL for Tailwind compatibility
const hexToHsl = (hex: string): string | null => {
  try {
    // Remove the hash if present
    hex = hex.replace('#', '');

    // Parse the hex values
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    // Convert to degrees and percentages
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    const lPercent = Math.round(l * 100);

    return `${h} ${s}% ${lPercent}%`;
  } catch (error) {
    console.warn('Error converting hex to HSL:', error);
    return null;
  }
};

// Helper function to safely inject scripts
const safelyInjectScript = (content: string, id: string, target: 'head' | 'body'): boolean => {
  try {
    // Validate script content
    if (!content || typeof content !== 'string') {
      console.warn(`Invalid script content for ${id}:`, content);
      return false;
    }

    const cleanContent = content.trim();

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

    // Skip script injection in development to avoid console spam
    const isDev = import.meta.env.DEV;

    // Skip script injection if scripts contain problematic content or are development test scripts
    const skipHeaderScript = settings.header_scripts && (
      /<[^>]+>/g.test(settings.header_scripts) ||
      settings.header_scripts.includes('<') ||
      settings.header_scripts.includes('>') ||
      (isDev && settings.header_scripts.includes('hello world'))
    );

    const skipFooterScript = settings.footer_scripts && (
      /<[^>]+>/g.test(settings.footer_scripts) ||
      settings.footer_scripts.includes('<') ||
      settings.footer_scripts.includes('>') ||
      (isDev && settings.footer_scripts.includes('hello world'))
    );

    if (skipHeaderScript && !isDev) {
      console.warn('Skipping header script injection due to HTML content that may cause syntax errors');
    }

    if (skipFooterScript && !isDev) {
      console.warn('Skipping footer script injection due to HTML content that may cause syntax errors');
    }

    try {
      // Only inject scripts if they don't already exist and are safe
      if (settings.header_scripts &&
        !skipHeaderScript &&
        !document.getElementById('settings-header-script')) {
        safelyInjectScript(settings.header_scripts, 'settings-header-script', 'head');
      }

      if (settings.footer_scripts &&
        !skipFooterScript &&
        !document.getElementById('settings-footer-script')) {
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
