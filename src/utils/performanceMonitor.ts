/**
 * Performance monitoring utilities for EasyIo.tech
 * Tracks Core Web Vitals and other performance metrics
 */

export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  loadTime?: number;
  domContentLoaded?: number;
}

export interface WebVitalsData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

/**
 * Core Web Vitals thresholds
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 }
};

/**
 * Get performance rating based on value and thresholds
 */
export function getPerformanceRating(
  metric: keyof typeof WEB_VITALS_THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = WEB_VITALS_THRESHOLDS[metric];
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Measure Core Web Vitals using Performance Observer API
 */
export function measureWebVitals(callback: (data: WebVitalsData) => void): void {
  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        if (lastEntry) {
          const value = lastEntry.startTime;
          callback({
            name: 'LCP',
            value,
            rating: getPerformanceRating('LCP', value),
            delta: value,
            id: 'lcp'
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const value = entry.processingStart - entry.startTime;
          callback({
            name: 'FID',
            value,
            rating: getPerformanceRating('FID', value),
            delta: value,
            id: 'fid'
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        callback({
          name: 'CLS',
          value: clsValue,
          rating: getPerformanceRating('CLS', clsValue),
          delta: clsValue,
          id: 'cls'
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            const value = entry.startTime;
            callback({
              name: 'FCP',
              value,
              rating: getPerformanceRating('FCP', value),
              delta: value,
              id: 'fcp'
            });
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }
  }
}

/**
 * Measure navigation timing metrics
 */
export function measureNavigationTiming(): PerformanceMetrics {
  if (!('performance' in window) || !performance.timing) {
    return {};
  }

  const timing = performance.timing;
  const navigation = performance.navigation;

  return {
    ttfb: timing.responseStart - timing.navigationStart,
    domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
    loadTime: timing.loadEventEnd - timing.navigationStart,
  };
}

/**
 * Measure resource loading performance
 */
export function measureResourceTiming(): Array<{
  name: string;
  duration: number;
  size: number;
  type: string;
}> {
  if (!('performance' in window) || !performance.getEntriesByType) {
    return [];
  }

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  return resources.map(resource => ({
    name: resource.name,
    duration: resource.duration,
    size: resource.transferSize || 0,
    type: getResourceType(resource.name)
  }));
}

/**
 * Get resource type from URL
 */
function getResourceType(url: string): string {
  if (url.includes('.css')) return 'CSS';
  if (url.includes('.js')) return 'JavaScript';
  if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'Image';
  if (url.match(/\.(woff|woff2|ttf|eot)$/i)) return 'Font';
  if (url.includes('api/') || url.includes('.json')) return 'API';
  return 'Other';
}

/**
 * Monitor bundle sizes
 */
export function monitorBundleSizes(): Promise<Array<{
  name: string;
  size: number;
  gzipSize?: number;
}>> {
  return new Promise((resolve) => {
    const bundles: Array<{ name: string; size: number; gzipSize?: number }> = [];
    
    // Get all script and CSS resources
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    resources.forEach(resource => {
      if (resource.name.includes('.js') || resource.name.includes('.css')) {
        const name = resource.name.split('/').pop() || resource.name;
        bundles.push({
          name,
          size: resource.transferSize || 0,
          gzipSize: resource.encodedBodySize || undefined
        });
      }
    });
    
    resolve(bundles);
  });
}

/**
 * Track user interactions for performance insights
 */
export function trackUserInteractions(): void {
  let interactionCount = 0;
  let totalDelay = 0;

  const trackInteraction = (event: Event) => {
    const startTime = performance.now();
    
    // Use requestIdleCallback to measure delay
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const delay = performance.now() - startTime;
        interactionCount++;
        totalDelay += delay;
        
        // Log if delay is significant
        if (delay > 50) {
          console.warn(`Slow interaction detected: ${event.type} took ${delay.toFixed(2)}ms`);
        }
      });
    }
  };

  // Track common interactions
  ['click', 'keydown', 'scroll', 'touchstart'].forEach(eventType => {
    document.addEventListener(eventType, trackInteraction, { passive: true });
  });
}

/**
 * Generate performance report
 */
export function generatePerformanceReport(): Promise<{
  webVitals: PerformanceMetrics;
  navigation: PerformanceMetrics;
  resources: Array<{ name: string; duration: number; size: number; type: string }>;
  bundles: Array<{ name: string; size: number; gzipSize?: number }>;
  score: number;
  recommendations: string[];
}> {
  return new Promise((resolve) => {
    const webVitals: PerformanceMetrics = {};
    const recommendations: string[] = [];

    // Collect Web Vitals
    measureWebVitals((data) => {
      switch (data.name) {
        case 'LCP':
          webVitals.lcp = data.value;
          if (data.rating === 'poor') {
            recommendations.push('Optimize Largest Contentful Paint by reducing server response times and optimizing images');
          }
          break;
        case 'FID':
          webVitals.fid = data.value;
          if (data.rating === 'poor') {
            recommendations.push('Reduce First Input Delay by minimizing JavaScript execution time');
          }
          break;
        case 'CLS':
          webVitals.cls = data.value;
          if (data.rating === 'poor') {
            recommendations.push('Improve Cumulative Layout Shift by setting dimensions for images and avoiding dynamic content insertion');
          }
          break;
        case 'FCP':
          webVitals.fcp = data.value;
          if (data.rating === 'poor') {
            recommendations.push('Optimize First Contentful Paint by reducing render-blocking resources');
          }
          break;
      }
    });

    // Get other metrics
    const navigation = measureNavigationTiming();
    const resources = measureResourceTiming();
    
    monitorBundleSizes().then(bundles => {
      // Calculate performance score (0-100)
      let score = 100;
      
      if (webVitals.lcp && webVitals.lcp > WEB_VITALS_THRESHOLDS.LCP.poor) score -= 20;
      if (webVitals.fid && webVitals.fid > WEB_VITALS_THRESHOLDS.FID.poor) score -= 20;
      if (webVitals.cls && webVitals.cls > WEB_VITALS_THRESHOLDS.CLS.poor) score -= 20;
      if (navigation.ttfb && navigation.ttfb > WEB_VITALS_THRESHOLDS.TTFB.poor) score -= 20;
      if (navigation.loadTime && navigation.loadTime > 5000) score -= 20;

      // Add bundle size recommendations
      const totalBundleSize = bundles.reduce((sum, bundle) => sum + bundle.size, 0);
      if (totalBundleSize > 1000000) { // 1MB
        recommendations.push('Reduce bundle sizes by implementing code splitting and removing unused dependencies');
      }

      resolve({
        webVitals,
        navigation,
        resources,
        bundles,
        score: Math.max(0, score),
        recommendations
      });
    });
  });
}

/**
 * Send performance data to analytics
 */
export function sendPerformanceToAnalytics(data: WebVitalsData): void {
  // Send to Google Analytics if available
  if ('gtag' in window) {
    (window as any).gtag('event', 'web_vitals', {
      event_category: 'Performance',
      event_label: data.name,
      value: Math.round(data.value),
      custom_parameter_1: data.rating,
    });
  }

  // Send to custom analytics endpoint
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: data.name,
        value: data.value,
        rating: data.rating,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch(error => {
      console.warn('Failed to send performance data:', error);
    });
  }
}
