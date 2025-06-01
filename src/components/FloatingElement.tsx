import React, { useState, useEffect } from 'react';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  frequency?: number;
  phase?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  amplitude = 10,
  frequency = 0.002,
  phase = 0,
}) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newPosition = amplitude * Math.sin(frequency * elapsed + phase);
      setPosition(newPosition);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [amplitude, frequency, phase]);

  return (
    <div
      className={`transition-transform ${className}`}
      style={{ transform: `translateY(${position}px)` }}
    >
      {children}
    </div>
  );
};

export default FloatingElement;
