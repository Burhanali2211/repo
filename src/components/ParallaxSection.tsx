import React, { useEffect, useRef, useState } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  bgImage?: string;
  speed?: number;
  overlay?: boolean;
  overlayColor?: string;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  bgImage,
  speed = 0.5,
  overlay = true,
  overlayColor = 'rgba(0, 0, 0, 0.6)',
  className = '',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const calculateParallax = () => {
    if (!sectionRef.current) return '0px';
    
    const sectionTop = sectionRef.current.offsetTop;
    const parallaxOffset = (scrollPosition - sectionTop) * speed;
    
    return `${parallaxOffset}px`;
  };

  return (
    <div 
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      {bgImage && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            transform: `translateY(${calculateParallax()})`,
            height: 'calc(100% + 200px)',
            top: '-100px',
          }}
        />
      )}
      
      {overlay && bgImage && (
        <div 
          className="absolute inset-0 w-full h-full" 
          style={{ backgroundColor: overlayColor }}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
