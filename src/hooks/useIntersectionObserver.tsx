import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

const useIntersectionObserver = <T extends Element>(
  ref: RefObject<T>,
  options: IntersectionObserverOptions = {}
): boolean => {
  const { root = null, rootMargin = '0px', threshold = 0, once = false } = options;
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        
        // If once is true and the element is intersecting, disconnect the observer
        if (once && entry.isIntersecting) {
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, root, rootMargin, threshold, once]);

  return isIntersecting;
};

export default useIntersectionObserver;
