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
    type = 'tween',
    delay = 0,
    duration = 0.35
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

  // Optimized animation variants with natural easing
  const fadeIn = {
    hidden: {
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
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
        ease: [0.25, 1, 0.5, 1], // Optimized ease-out curve
      }
    }
  };

  const slideIn = {
    hidden: {
      x: direction === 'left' ? '-50%' : direction === 'right' ? '50%' : 0,
      y: direction === 'up' ? '50%' : direction === 'down' ? '-50%' : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1], // Optimized expo ease-out
      }
    }
  };

  const zoomIn = {
    hidden: {
      scale: 0.95,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  const stagger = (staggerChildren?: number, delayChildren?: number) => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren || 0.08,
        delayChildren: delayChildren || 0,
      }
    }
  });

  const textVariant = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.35,
        delay,
        ease: [0.25, 1, 0.5, 1],
      }
    }
  };

  const floatAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: [0.76, 0, 0.24, 1],
    },
  };

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: [0.76, 0, 0.24, 1],
    },
  };

  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: 'loop' as const,
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
