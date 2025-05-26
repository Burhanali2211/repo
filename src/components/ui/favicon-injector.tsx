import React, { useEffect } from 'react';
import { useWebsiteSettings } from '@/contexts/SettingsContext';

/**
 * Component that dynamically injects favicon tags based on site settings
 * This doesn't render anything visible, it just updates the document head
 */
const FaviconInjector: React.FC = () => {
  const { settings } = useWebsiteSettings();
  
  useEffect(() => {
    if (!settings) return;
    
    // Remove any existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach(link => link.remove());
    
    // Add new favicon if available in settings
    if (settings.site_favicon) {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon';
      link.href = settings.site_favicon;
      
      document.head.appendChild(link);
      
      // Also add apple touch icon for iOS devices
      const appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      appleLink.href = settings.site_favicon;
      
      document.head.appendChild(appleLink);
    }
  }, [settings]);
  
  // This component doesn't render anything visible
  return null;
};

export default FaviconInjector;
