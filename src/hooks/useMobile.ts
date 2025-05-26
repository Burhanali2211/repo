import { useState, useEffect } from 'react';

const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const MOBILE_BREAKPOINT = 768;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      checkMobile();
    };
    
    mql.addEventListener("change", onChange);
    checkMobile();
    
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
};

export default useMobile;
