import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWebsiteSettings } from '@/contexts/SettingsContext';

interface LogoProps {
  className?: string;
  textClassName?: string;
  imgClassName?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  textClassName = '',
  imgClassName = '',
  size = 'md'
}) => {
  const { settings } = useWebsiteSettings();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  // Size mappings
  const sizeClasses = {
    sm: 'h-6 max-w-[120px]',
    md: 'h-8 max-w-[160px]',
    lg: 'h-10 max-w-[200px]'
  };

  // Determine image sizing class
  const imgSizeClass = sizeClasses[size];

  // Determine text sizing class
  const textSizeClass = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }[size];

  // Theme detection for dual logo system
  useEffect(() => {
    const detectTheme = () => {
      // Check localStorage for theme preference first
      const storedTheme = localStorage.getItem('ui-theme');

      let isDarkMode = false;

      if (storedTheme === 'dark') {
        isDarkMode = true;
      } else if (storedTheme === 'light') {
        isDarkMode = false;
      } else if (storedTheme === 'system' || !storedTheme) {
        // Use system preference
        isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      // Also check if dark class is present on document element
      const hasClassDark = document.documentElement.classList.contains('dark');

      // Use class presence as final authority if it exists
      if (hasClassDark) {
        isDarkMode = true;
      } else if (document.documentElement.classList.contains('light')) {
        isDarkMode = false;
      }

      const newTheme = isDarkMode ? 'dark' : 'light';
      setCurrentTheme(newTheme);
    };

    // Initial detection
    detectTheme();

    // Listen for theme changes via class mutations
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          detectTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => detectTheme();
    mediaQuery.addEventListener('change', handleChange);

    // Listen for localStorage changes (theme switching)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ui-theme') {
        detectTheme();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Determine which logo to use based on theme
  const getLogoUrl = () => {
    if (currentTheme === 'dark' && settings?.site_logo_dark) {
      return settings.site_logo_dark;
    }
    if (currentTheme === 'light' && settings?.site_logo_light) {
      return settings.site_logo_light;
    }
    // Fallback to universal logo
    return settings?.site_logo;
  };

  const logoUrl = getLogoUrl();

  return (
    <Link
      to="/"
      className={`flex items-center ${className}`}
      aria-label={settings?.site_name || 'Website Home'}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={settings?.site_name || 'Logo'}
          className={`${imgSizeClass} object-contain ${imgClassName}`}
          onError={(e) => {
            // If image fails to load, show text logo as fallback
            e.currentTarget.style.display = 'none';
            // Add a data attribute to mark that we had an error
            e.currentTarget.dataset.error = 'true';
          }}
        />
      ) : (
        <div className={`font-bold ${textSizeClass} ${textClassName}`}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {settings?.site_name?.split(' ')[0] || 'Easyio'}
          </span>
          <span className="text-gray-900 dark:text-white">
            {settings?.site_name?.split(' ').length > 1
              ? '.' + settings?.site_name?.split(' ').slice(1).join('')
              : '.tech'}
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
