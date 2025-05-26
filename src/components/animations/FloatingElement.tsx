import React, { useRef, useEffect } from 'react';
import { motion, useAnimation as useFramerAnimation } from 'framer-motion';
// Note: We're using Framer Motion's useAnimation here, not our custom hook

interface FloatingElementProps {
  children: React.ReactNode;
  amplitude?: number;
  frequency?: number;
  duration?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  amplitude = 10,
  frequency = 0.5,
  duration = 4,
  className = '',
}) => {
  const controls = useFramerAnimation();
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    controls.start({
      y: [0, -amplitude, 0, amplitude, 0],
      transition: {
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.25, 0.5, 0.75, 1]
      }
    });
    
    return () => {
      controls.stop();
    };
  }, [amplitude, duration, frequency, controls]);
  
  return (
    <motion.div
      ref={elementRef}
      animate={controls}
      className={className}
      initial={{ y: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;