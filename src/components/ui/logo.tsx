import React from 'react';
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
  
  return (
    <Link 
      to="/" 
      className={`flex items-center ${className}`}
      aria-label={settings?.site_name || 'Website Home'}
    >
      {settings?.site_logo ? (
        <img 
          src={settings.site_logo} 
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
