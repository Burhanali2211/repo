/**
 * Performance Optimization Utilities
 *
 * Collection of utilities to improve website performance on new devices
 */

// Resource preloading utilities
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2' },
    { href: '/images/hero-bg.webp', as: 'image' },
    { href: '/images/logo.webp', as: 'image' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    if (resource.as === 'font') link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// DNS prefetching for external resources
export const prefetchDNS = () => {
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cljvgapifmlhxdwtjumi.supabase.co'
  ];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Optimize images for different screen sizes
export const getOptimizedImageUrl = (
  src: string,
  width?: number,
  quality: number = 80,
  format: 'webp' | 'jpg' | 'auto' = 'auto'
) => {
  if (!src || src.startsWith('data:')) return src;

  try {
    const url = new URL(src, window.location.origin);
    if (width) url.searchParams.set('w', width.toString());
    url.searchParams.set('q', quality.toString());

    // Add format optimization
    if (format === 'webp' || (format === 'auto' && supportsWebP())) {
      url.searchParams.set('f', 'webp');
    }

    return url.toString();
  } catch {
    return src;
  }
};

// WebP support detection
export const supportsWebP = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Lazy loading with intersection observer
export const createLazyLoader = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, defaultOptions);
};

// Bundle size monitoring
export const monitorBundleSize = () => {
  if (typeof window === 'undefined') return;

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const jsResources = resources.filter(r => r.name.includes('.js'));
  const cssResources = resources.filter(r => r.name.includes('.css'));

  const totalJSSize = jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
  const totalCSSSize = cssResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);

  console.log('Bundle Analysis:', {
    totalJS: `${(totalJSSize / 1024).toFixed(2)} KB`,
    totalCSS: `${(totalCSSSize / 1024).toFixed(2)} KB`,
    jsFiles: jsResources.length,
    cssFiles: cssResources.length
  });

  return { totalJSSize, totalCSSSize, jsResources, cssResources };
};

// Memory usage optimization
export const optimizeMemoryUsage = () => {
  // Clean up unused event listeners
  const cleanupEventListeners = () => {
    // Remove passive event listeners that are no longer needed
    document.removeEventListener('scroll', () => { }, { passive: true });
    document.removeEventListener('touchstart', () => { }, { passive: true });
  };

  // Garbage collection hint (if available)
  const triggerGC = () => {
    const windowWithGC = window as typeof window & { gc?: () => void };
    if ('gc' in window && typeof windowWithGC.gc === 'function') {
      windowWithGC.gc();
    }
  };

  return { cleanupEventListeners, triggerGC };
};

// Network optimization
export const optimizeNetworkRequests = () => {
  // Batch API requests
  const requestQueue: Array<() => Promise<unknown>> = [];
  let batchTimeout: NodeJS.Timeout | null = null;

  const batchRequest = (requestFn: () => Promise<unknown>) => {
    requestQueue.push(requestFn);

    if (batchTimeout) clearTimeout(batchTimeout);

    batchTimeout = setTimeout(async () => {
      const requests = [...requestQueue];
      requestQueue.length = 0;

      try {
        await Promise.all(requests.map(fn => fn()));
      } catch (error) {
        console.warn('Batch request failed:', error);
      }
    }, 50); // 50ms batch window
  };

  return { batchRequest };
};

// CSS optimization
export const optimizeCSS = () => {
  // Remove unused CSS classes (basic implementation)
  const removeUnusedCSS = () => {
    const stylesheets = Array.from(document.styleSheets);
    const usedClasses = new Set<string>();

    // Collect all used classes
    document.querySelectorAll('*').forEach(el => {
      el.classList.forEach(cls => usedClasses.add(cls));
    });

    // This is a simplified version - in production, use tools like PurgeCSS
    console.log('Used CSS classes:', usedClasses.size);
  };

  // Optimize critical CSS
  const inlineCriticalCSS = () => {
    const criticalCSS = `
      .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
      .btn-primary { background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); }
      .spinner { animation: spin 1s linear infinite; }
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  };

  return { removeUnusedCSS, inlineCriticalCSS };
};

// Animation performance optimization
export const optimizeAnimations = () => {
  // Use requestAnimationFrame for smooth animations
  const createOptimizedAnimation = (
    element: HTMLElement,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions
  ) => {
    // Add performance optimizations
    element.style.willChange = 'transform, opacity';
    element.style.backfaceVisibility = 'hidden';

    const animation = element.animate(keyframes, {
      ...options,
      composite: 'replace'
    });

    // Clean up after animation
    animation.addEventListener('finish', () => {
      element.style.willChange = 'auto';
    });

    return animation;
  };

  // Throttle scroll-based animations
  const throttleScrollAnimations = (callback: () => void, delay: number = 16) => {
    let ticking = false;

    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback();
          ticking = false;
        });
        ticking = true;
      }
    };
  };

  return { createOptimizedAnimation, throttleScrollAnimations };
};

// Device-specific optimizations
export const getDeviceOptimizations = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEndDevice = navigator.hardwareConcurrency <= 2;
  const navigatorWithConnection = navigator as typeof navigator & {
    connection?: { effectiveType: string };
  };
  const hasSlowConnection = 'connection' in navigator &&
    (navigatorWithConnection.connection?.effectiveType === 'slow-2g' ||
      navigatorWithConnection.connection?.effectiveType === '2g');

  return {
    isMobile,
    isLowEndDevice,
    hasSlowConnection,
    shouldReduceAnimations: isLowEndDevice || hasSlowConnection,
    shouldLazyLoadImages: isMobile || hasSlowConnection,
    shouldPreloadCriticalResources: !hasSlowConnection
  };
};

// Initialize all optimizations
export const initializePerformanceOptimizations = () => {
  const deviceOpts = getDeviceOptimizations();

  // Apply device-specific optimizations
  if (deviceOpts.shouldPreloadCriticalResources) {
    preloadCriticalResources();
    prefetchDNS();
  }

  // Optimize CSS
  const { inlineCriticalCSS } = optimizeCSS();
  inlineCriticalCSS();

  // Monitor performance
  setTimeout(() => {
    monitorBundleSize();
  }, 2000);

  return deviceOpts;
};

export default {
  preloadCriticalResources,
  prefetchDNS,
  getOptimizedImageUrl,
  supportsWebP,
  createLazyLoader,
  monitorBundleSize,
  optimizeMemoryUsage,
  optimizeNetworkRequests,
  optimizeCSS,
  optimizeAnimations,
  getDeviceOptimizations,
  initializePerformanceOptimizations
};
