import React, { useState, useEffect } from 'react';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  showPercentage?: boolean;
  position?: 'top' | 'bottom';
  className?: string;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  color = 'bg-gradient-to-r from-purple-600 to-blue-500',
  height = 4,
  showPercentage = false,
  position = 'top',
  className = '',
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    const progress = (scrollPosition / totalHeight) * 100;
    setScrollProgress(progress);
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const positionClass = position === 'top' ? 'top-0' : 'bottom-0';
  
  return (
    <div className={`fixed ${positionClass} left-0 w-full z-50 ${className}`}>
      <div 
        className={`${color} h-${height} transition-all duration-300 ease-out`} 
        style={{ width: `${scrollProgress}%` }}
      />
      
      {showPercentage && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
          {Math.round(scrollProgress)}%
        </div>
      )}
    </div>
  );
};

export default ScrollProgress;
