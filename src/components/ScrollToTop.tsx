import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  showAfter?: number;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: 'circle' | 'square' | 'pill';
  showOnMobile?: boolean;
  className?: string;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({
  showAfter = 300,
  position = 'bottom-right',
  color = 'bg-gradient-to-r from-purple-600 to-blue-500',
  size = 'md',
  style = 'circle',
  showOnMobile = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  // Size classes
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
  };

  // Icon size classes
  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  // Style classes
  const styleClasses = {
    circle: 'rounded-full',
    square: 'rounded-md',
    pill: 'rounded-full px-4',
  };

  // Check scroll position
  const handleScroll = useCallback(() => {
    if (window.scrollY > showAfter) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [showAfter]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showAfter, handleScroll]);

  // Hide on mobile if specified
  useEffect(() => {
    if (!showOnMobile) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      if (isMobile) {
        setIsVisible(false);
      }
    }
  }, [showOnMobile]);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed ${positionClasses[position]} ${sizeClasses[size]} ${styleClasses[style]}
        ${color} text-white shadow-lg z-50
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        hover:shadow-xl hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-purple-400
        ${className}
      `}
      aria-label="Scroll to top"
      tabIndex={0}
    >
      <ArrowUp className={`${iconSizeClasses[size]} group-hover:-translate-y-1 transition-transform duration-300`} />
    </button>
  );
};

export default ScrollToTop;
