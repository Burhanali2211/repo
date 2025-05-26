import React, { useState, useRef, useEffect } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  sensitivity?: number;
  perspective?: number;
  glareEnabled?: boolean;
  glareMaxOpacity?: number;
  glareColor?: string;
  glarePositionSide?: 'all' | 'top' | 'right' | 'bottom' | 'left';
  shadowEnabled?: boolean;
  shadowColor?: string;
  resetOnLeave?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  depth = 30,
  sensitivity = 50,
  perspective = 1000,
  glareEnabled = true,
  glareMaxOpacity = 0.5,
  glareColor = 'rgba(255, 255, 255, 0.8)',
  glarePositionSide = 'all',
  shadowEnabled = true,
  shadowColor = 'rgba(0, 0, 0, 0.2)',
  resetOnLeave = true,
  disabled = false,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [glareOpacity, setGlareOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center (in percentage)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Calculate rotation based on mouse position and sensitivity
    const rotateY = x * sensitivity;
    const rotateX = -y * sensitivity;
    
    setRotation({ x: rotateX, y: rotateY });
    
    // Calculate glare position
    setGlarePosition({ x: x * 100 + 50, y: y * 100 + 50 });
    
    // Calculate glare opacity based on mouse position
    const distanceFromCenter = Math.sqrt(x * x + y * y) * 2; // Normalize to 0-1
    setGlareOpacity(Math.min(distanceFromCenter * glareMaxOpacity, glareMaxOpacity));
  };
  
  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (resetOnLeave) {
      setRotation({ x: 0, y: 0 });
      setGlareOpacity(0);
    }
    setIsHovered(false);
  };
  
  // Determine glare gradient direction based on glarePositionSide
  const getGlareGradient = () => {
    switch (glarePositionSide) {
      case 'top':
        return 'to bottom';
      case 'right':
        return 'to left';
      case 'bottom':
        return 'to top';
      case 'left':
        return 'to right';
      default:
        return `to bottom right`;
    }
  };
  
  // Apply shadow based on rotation
  const getShadow = () => {
    if (!shadowEnabled || !isHovered) return '';
    
    const x = rotation.y / 20;
    const y = -rotation.x / 20;
    const blur = Math.abs(x) + Math.abs(y) + 10;
    
    return `${x}px ${y}px ${blur}px ${shadowColor}`;
  };
  
  return (
    <div
      ref={cardRef}
      className={`relative transform-gpu transition-transform duration-200 ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      role={onClick ? 'button' : undefined}
    >
      <div
        className="relative w-full h-full transition-transform duration-200"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          boxShadow: getShadow(),
        }}
      >
        {children}
        
        {/* 3D elements */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateZ(-${depth}px)`,
            transformStyle: 'preserve-3d',
          }}
        />
        
        {/* Glare effect */}
        {glareEnabled && (
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]"
            style={{
              opacity: glareOpacity,
              background: `linear-gradient(${getGlareGradient()}, ${glareColor} 0%, transparent 80%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Card3D;
