import React, { useEffect, ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({
  children,
  speed = 0.05,
  className = '',
}) => {
  useEffect(() => {
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let scrollFrame: number;
    const scrollContainer = document.documentElement;
    
    const handleScroll = () => {
      targetScroll = window.scrollY;
    };
    
    const smoothScroll = () => {
      // Calculate the difference between current and target scroll
      const diff = targetScroll - currentScroll;
      
      // Apply easing effect
      currentScroll += diff * speed;
      
      // Apply the scroll position to the document
      scrollContainer.scrollTop = currentScroll;
      
      // Continue animation
      scrollFrame = requestAnimationFrame(smoothScroll);
    };
    
    // Start the animation
    scrollFrame = requestAnimationFrame(smoothScroll);
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      // Clean up
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default SmoothScroll;
