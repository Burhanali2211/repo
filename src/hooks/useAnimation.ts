import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

type AnimationDirection = 'up' | 'down' | 'left' | 'right';
type AnimationType = 'spring' | 'tween' | 'ease';

interface AnimationOptions {
  direction?: AnimationDirection;
  type?: AnimationType;
  delay?: number;
  duration?: number;
}

const useAnimation = (options: AnimationOptions = {}) => {
  const { 
    direction = 'up', 
    type = 'spring',
    delay = 0,
    duration = 1.25
  } = options;
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);
  
  // Animation variants
  const fadeIn = {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type,
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };
  
  const slideIn = {
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      }
    }
  };
  
  const zoomIn = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        delay,
        duration,
        ease: 'easeOut',
      }
    }
  };
  
  const stagger = (staggerChildren?: number, delayChildren?: number) => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren || 0.1,
        delayChildren: delayChildren || 0,
      }
    }
  });
  
  const textVariant = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1.25,
        delay,
      }
    }
  };
  
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  };
  
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  };
  
  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
    },
  };
  
  return { 
    ref, 
    inView,
    hasAnimated,
    variants: {
      fadeIn,
      slideIn,
      zoomIn,
      stagger,
      textVariant,
      floatAnimation,
      pulseAnimation,
      rotateAnimation
    }
  };
};

export default useAnimation;
