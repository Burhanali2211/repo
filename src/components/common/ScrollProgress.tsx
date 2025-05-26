import React, { useEffect, useState } from 'react';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ 
  color = 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500', 
  height = 3, 
  position = 'top' 
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    const progress = (scrollPosition / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 z-50 ${color}`} 
      style={{ width: `${scrollProgress}%`, height: `${height}px` }}
      role="progressbar"
      aria-valuenow={scrollProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
};

export default ScrollProgress;