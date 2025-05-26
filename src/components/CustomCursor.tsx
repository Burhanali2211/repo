import React, { useState, useEffect } from 'react';

interface CustomCursorProps {
  size?: number;
  color?: string;
  trailColor?: string;
  trailLength?: number;
  showOnMobile?: boolean;
  className?: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  size = 24,
  color = 'rgba(138, 43, 226, 0.7)',
  trailColor = 'rgba(138, 43, 226, 0.3)',
  trailLength = 5,
  showOnMobile = false,
  className = '',
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [isPointer, setIsPointer] = useState(false);
  
  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    
    // Update trail positions
    setTrail(prevTrail => {
      const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY }];
      if (newTrail.length > trailLength) {
        return newTrail.slice(newTrail.length - trailLength);
      }
      return newTrail;
    });
    
    // Check if cursor is over a clickable element
    const target = e.target as HTMLElement;
    const isClickable = 
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' || 
      target.closest('a') || 
      target.closest('button') ||
      window.getComputedStyle(target).cursor === 'pointer';
    
    setIsPointer(!!isClickable);
  };
  
  // Handle mouse enter/leave events
  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Check if we should show the custom cursor on mobile
    if (!showOnMobile) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      if (isMobile) {
        setIsVisible(false);
      }
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showOnMobile]);
  
  if (!isVisible) return null;
  
  return (
    <>
      {/* Trail elements */}
      {trail.map((point, index) => {
        const scale = 1 - (index / trailLength) * 0.6;
        const opacity = 1 - (index / trailLength) * 0.8;
        
        return (
          <div
            key={index}
            className={`fixed pointer-events-none z-50 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${className}`}
            style={{
              left: point.x,
              top: point.y,
              width: size * scale * 0.8,
              height: size * scale * 0.8,
              backgroundColor: trailColor,
              opacity,
            }}
          />
        );
      })}
      
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${className}`}
        style={{
          left: position.x,
          top: position.y,
          width: isPointer ? size * 1.5 : size,
          height: isPointer ? size * 1.5 : size,
          backgroundColor: color,
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s',
        }}
      >
        {isPointer && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
            Click
          </div>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
