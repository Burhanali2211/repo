import React, { useEffect, useState } from 'react';
import { useMobile } from '../../hooks';

interface CustomCursorProps {
  size?: number;
  color?: string;
  trailColor?: string;
  showOnMobile?: boolean;
  trailLength?: number;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  size = 16,
  color = 'rgba(138, 43, 226, 0.6)',
  trailColor = 'rgba(138, 43, 226, 0.2)',
  showOnMobile = false,
  trailLength = 3
}) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number }>>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isMobile = useMobile();

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Update trail positions
      setTrailPositions(prev => {
        const newPositions = [{ x: e.clientX, y: e.clientY }, ...prev.slice(0, trailLength - 1)];
        return newPositions;
      });
      
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, trailLength]);

  // Don't render on mobile if showOnMobile is false
  if (isMobile && !showOnMobile) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <div 
        className="fixed pointer-events-none z-50 rounded-full transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
        aria-hidden="true"
      />
      
      {/* Cursor trail */}
      {trailPositions.map((pos, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-50 rounded-full transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
          style={{
            width: `${size * (1 - index * 0.2)}px`,
            height: `${size * (1 - index * 0.2)}px`,
            backgroundColor: trailColor,
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            opacity: isVisible ? (1 - index * (1 / trailLength)) : 0,
            transition: 'opacity 0.2s ease',
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
};

export default CustomCursor;