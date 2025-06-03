/**
 * Advanced Performance Monitoring System
 *
 * Tracks Core Web Vitals, bundle loading performance, and user experience metrics
 */

// Type definitions for performance APIs
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
}

// Performance metrics interface
export interface PerformanceMetrics {
  // Core Web Vitals
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte

  // Custom metrics
  tti?: number; // Time to Interactive
  tbt?: number; // Total Blocking Time
  si?: number; // Speed Index

  // Bundle loading metrics
  bundleLoadTime?: number;
  chunkLoadTimes?: Record<string, number>;
  totalBundleSize?: number;

  // User experience metrics
  routeChangeTime?: number;
  componentRenderTime?: number;

  // Device information
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  connectionType?: string;

  // Timestamp
  timestamp: number;
}

// Performance observer for Core Web Vitals
class PerformanceMonitor {
  private metrics: PerformanceMetrics = { timestamp: Date.now() };
  private observers: PerformanceObserver[] = [];
  private chunkLoadStartTimes: Map<string, number> = new Map();

  constructor() {
    this.initializeObservers();
    this.detectDeviceType();
    this.detectConnectionType();
    this.monitorBundleLoading();
  }

  private initializeObservers() {
    // Core Web Vitals observers
    if ('PerformanceObserver' in window) {
      // First Contentful Paint & Largest Contentful Paint
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.fcp = entry.startTime;
            }
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(paintObserver);
      } catch (e) {
        console.warn('Paint observer not supported:', e);
      }

      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported:', e);
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const fidEntry = entry as PerformanceEventTiming;
            this.metrics.fid = fidEntry.processingStart - entry.startTime;
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported:', e);
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            const clsEntry = entry as LayoutShift;
            if (!clsEntry.hadRecentInput) {
              clsValue += clsEntry.value;
            }
          }
          this.metrics.cls = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported:', e);
      }

      // Navigation timing
      try {
        const navigationObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const navEntry = entry as PerformanceNavigationTiming;
            this.metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
            this.metrics.tti = navEntry.domInteractive - navEntry.navigationStart;
          }
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navigationObserver);
      } catch (e) {
        console.warn('Navigation observer not supported:', e);
      }
    }
  }

  private detectDeviceType() {
    const userAgent = navigator.userAgent;
    const screenWidth = window.screen.width;

    if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      this.metrics.deviceType = screenWidth < 768 ? 'mobile' : 'tablet';
    } else {
      this.metrics.deviceType = 'desktop';
    }
  }

  private detectConnectionType() {
    if ('connection' in navigator) {
      const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
      this.metrics.connectionType = connection?.effectiveType || 'unknown';
    }
  }

  private monitorBundleLoading() {
    // Monitor script loading
    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function <T extends Node>(newChild: T): T {
      if (newChild.nodeName === 'SCRIPT') {
        const script = newChild as unknown as HTMLScriptElement;
        const src = script.src;

        if (src && src.includes('/assets/')) {
          const chunkName = src.split('/').pop()?.split('-')[0] || 'unknown';
          const startTime = performance.now();

          script.addEventListener('load', () => {
            const loadTime = performance.now() - startTime;
            if (!this.metrics.chunkLoadTimes) {
              this.metrics.chunkLoadTimes = {};
            }
            this.metrics.chunkLoadTimes[chunkName] = loadTime;
          });
        }
      }

      return originalAppendChild.call(this, newChild);
    };
  }

  // Measure route change performance
  measureRouteChange(routeName: string): () => void {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      this.metrics.routeChangeTime = endTime - startTime;
      this.reportMetrics(`Route change to ${routeName}`);
    };
  }

  // Measure component render performance
  measureComponentRender(componentName: string): () => void {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      this.metrics.componentRenderTime = endTime - startTime;
      console.log(`${componentName} render time:`, endTime - startTime, 'ms');
    };
  }

  // Get current metrics
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Report metrics to analytics
  reportMetrics(context?: string) {
    const metrics = this.getMetrics();

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`Performance Metrics${context ? ` - ${context}` : ''}`);
      console.table(metrics);
      console.groupEnd();
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(metrics, context);
    }
  }

  private async sendToAnalytics(metrics: PerformanceMetrics, context?: string) {
    try {
      // Example: Send to Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'performance_metrics', {
          custom_parameter_fcp: metrics.fcp,
          custom_parameter_lcp: metrics.lcp,
          custom_parameter_fid: metrics.fid,
          custom_parameter_cls: metrics.cls,
          custom_parameter_ttfb: metrics.ttfb,
          custom_parameter_device: metrics.deviceType,
          custom_parameter_connection: metrics.connectionType,
          custom_parameter_context: context,
        });
      }

      // Example: Send to custom analytics endpoint
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metrics, context }),
      }).catch(() => {
        // Silently fail if analytics endpoint is not available
      });
    } catch (error) {
      console.warn('Failed to send performance metrics:', error);
    }
  }

  // Cleanup observers
  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Global performance monitor instance
let performanceMonitor: PerformanceMonitor | null = null;

// Initialize performance monitoring
export function initializePerformanceMonitoring(): PerformanceMonitor {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();

    // Report initial metrics after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        performanceMonitor?.reportMetrics('Page Load Complete');
      }, 1000);
    });
  }

  return performanceMonitor;
}

// Get performance monitor instance
export function getPerformanceMonitor(): PerformanceMonitor | null {
  return performanceMonitor;
}

// Utility functions for React components
export function usePerformanceMonitor() {
  return {
    measureRouteChange: (routeName: string) =>
      performanceMonitor?.measureRouteChange(routeName),
    measureComponentRender: (componentName: string) =>
      performanceMonitor?.measureComponentRender(componentName),
    getMetrics: () => performanceMonitor?.getMetrics(),
    reportMetrics: (context?: string) => performanceMonitor?.reportMetrics(context),
  };
}

// React hook for component performance measurement
export function useComponentPerformance(componentName: string) {
  const measureEnd = performanceMonitor?.measureComponentRender(componentName);

  // Note: This would need React import in a .tsx file
  // For now, this is a placeholder that can be used in React components
  return measureEnd;
}

export default {
  initializePerformanceMonitoring,
  getPerformanceMonitor,
  usePerformanceMonitor,
  useComponentPerformance,
};
