/**
 * Performance Dashboard Component
 * 
 * Real-time performance monitoring dashboard for development and testing
 */

import React, { useState, useEffect } from 'react';
import { getPerformanceMonitor, type PerformanceMetrics } from '@/lib/performance/monitor';

interface PerformanceDashboardProps {
  isVisible?: boolean;
  onToggle?: () => void;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  isVisible = false,
  onToggle
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const updateMetrics = () => {
      const monitor = getPerformanceMonitor();
      if (monitor) {
        setMetrics(monitor.getMetrics());
      }
    };

    // Update metrics every 2 seconds
    const interval = setInterval(updateMetrics, 2000);
    updateMetrics(); // Initial update

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible || !metrics) return null;

  const getScoreColor = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.poor) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (time?: number) => {
    if (time === undefined) return 'N/A';
    return `${time.toFixed(2)}ms`;
  };

  const coreWebVitals = [
    {
      name: 'FCP',
      label: 'First Contentful Paint',
      value: metrics.fcp,
      thresholds: { good: 1800, poor: 3000 },
      unit: 'ms'
    },
    {
      name: 'LCP',
      label: 'Largest Contentful Paint',
      value: metrics.lcp,
      thresholds: { good: 2500, poor: 4000 },
      unit: 'ms'
    },
    {
      name: 'FID',
      label: 'First Input Delay',
      value: metrics.fid,
      thresholds: { good: 100, poor: 300 },
      unit: 'ms'
    },
    {
      name: 'CLS',
      label: 'Cumulative Layout Shift',
      value: metrics.cls,
      thresholds: { good: 0.1, poor: 0.25 },
      unit: ''
    },
    {
      name: 'TTFB',
      label: 'Time to First Byte',
      value: metrics.ttfb,
      thresholds: { good: 800, poor: 1800 },
      unit: 'ms'
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-2 px-3 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        📊 Performance
      </button>

      {/* Dashboard Panel */}
      {isExpanded && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Performance Metrics
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Core Web Vitals */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Core Web Vitals
            </h4>
            <div className="space-y-2">
              {coreWebVitals.map((vital) => (
                <div key={vital.name} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {vital.label}
                    </div>
                    <div className="text-sm font-mono">
                      <span className={vital.value !== undefined ?
                        getScoreColor(vital.value, vital.thresholds) : 'text-gray-400'}>
                        {vital.value !== undefined ?
                          `${vital.value.toFixed(vital.name === 'CLS' ? 3 : 0)}${vital.unit}` :
                          'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {vital.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device & Connection Info */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Environment
            </h4>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Device:</span>
                <span className="font-mono">{metrics.deviceType || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Connection:</span>
                <span className="font-mono">{metrics.connectionType || 'Unknown'}</span>
              </div>
            </div>
          </div>

          {/* Custom Metrics */}
          {(metrics.routeChangeTime || metrics.componentRenderTime) && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Custom Metrics
              </h4>
              <div className="text-xs space-y-1">
                {metrics.routeChangeTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Route Change:</span>
                    <span className="font-mono">{formatTime(metrics.routeChangeTime)}</span>
                  </div>
                )}
                {metrics.componentRenderTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Component Render:</span>
                    <span className="font-mono">{formatTime(metrics.componentRenderTime)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Chunk Load Times */}
          {metrics.chunkLoadTimes && Object.keys(metrics.chunkLoadTimes).length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chunk Load Times
              </h4>
              <div className="text-xs space-y-1 max-h-24 overflow-y-auto">
                {Object.entries(metrics.chunkLoadTimes).map(([chunk, time]) => (
                  <div key={chunk} className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400 truncate">
                      {chunk}:
                    </span>
                    <span className="font-mono ml-2">{formatTime(time)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                const monitor = getPerformanceMonitor();
                monitor?.reportMetrics('Manual Report');
              }}
              className="flex-1 px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
            >
              Report
            </button>
            <button
              onClick={() => {
                console.table(metrics);
              }}
              className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
            >
              Log
            </button>
          </div>

          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            Updated: {new Date(metrics.timestamp).toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceDashboard;
