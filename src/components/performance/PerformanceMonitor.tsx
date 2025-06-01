import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Zap, Clock, Eye, Wifi } from 'lucide-react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
  fcp?: number;
  bundleSize?: number;
  loadTime?: number;
  score?: number;
}

interface PerformanceMonitorProps {
  className?: string;
  showDetails?: boolean;
}

/**
 * Real-time performance monitoring component
 * Displays Core Web Vitals and performance metrics
 */
const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  className = '',
  showDetails = true
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPerformanceData = async () => {
      try {
        // Dynamically import performance utilities
        const { generatePerformanceReport } = await import('@/utils/performanceMonitor');
        
        const report = await generatePerformanceReport();
        setMetrics({
          lcp: report.webVitals.lcp,
          fid: report.webVitals.fid,
          cls: report.webVitals.cls,
          ttfb: report.navigation.ttfb,
          fcp: report.navigation.fcp,
          bundleSize: report.bundles.reduce((sum, bundle) => sum + bundle.size, 0),
          loadTime: report.navigation.loadTime,
          score: report.score
        });
      } catch (error) {
        console.warn('Failed to load performance data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Delay loading to avoid blocking initial render
    const timer = setTimeout(loadPerformanceData, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score?: number) => {
    if (!score) return 'gray';
    if (score >= 90) return 'green';
    if (score >= 70) return 'yellow';
    return 'red';
  };

  const getMetricRating = (value?: number, thresholds?: { good: number; poor: number }) => {
    if (!value || !thresholds) return 'unknown';
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.poor) return 'needs-improvement';
    return 'poor';
  };

  const formatBytes = (bytes?: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  const formatTime = (ms?: number) => {
    if (!ms) return '0ms';
    return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`;
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Performance Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Performance Monitor
          {metrics.score && (
            <Badge variant={getScoreColor(metrics.score) === 'green' ? 'default' : 'destructive'}>
              Score: {metrics.score}/100
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Performance Score */}
        {metrics.score && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Performance</span>
              <span className="text-sm text-gray-600">{metrics.score}/100</span>
            </div>
            <Progress value={metrics.score} className="h-2" />
          </div>
        )}

        {/* Core Web Vitals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Largest Contentful Paint */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">LCP</span>
              <Badge 
                variant={getMetricRating(metrics.lcp, { good: 2500, poor: 4000 }) === 'good' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {getMetricRating(metrics.lcp, { good: 2500, poor: 4000 })}
              </Badge>
            </div>
            <div className="text-lg font-semibold">{formatTime(metrics.lcp)}</div>
            <div className="text-xs text-gray-500">Largest Contentful Paint</div>
          </div>

          {/* First Input Delay */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">FID</span>
              <Badge 
                variant={getMetricRating(metrics.fid, { good: 100, poor: 300 }) === 'good' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {getMetricRating(metrics.fid, { good: 100, poor: 300 })}
              </Badge>
            </div>
            <div className="text-lg font-semibold">{formatTime(metrics.fid)}</div>
            <div className="text-xs text-gray-500">First Input Delay</div>
          </div>

          {/* Cumulative Layout Shift */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">CLS</span>
              <Badge 
                variant={getMetricRating(metrics.cls, { good: 0.1, poor: 0.25 }) === 'good' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {getMetricRating(metrics.cls, { good: 0.1, poor: 0.25 })}
              </Badge>
            </div>
            <div className="text-lg font-semibold">{metrics.cls?.toFixed(3) || '0'}</div>
            <div className="text-xs text-gray-500">Cumulative Layout Shift</div>
          </div>
        </div>

        {/* Additional Metrics */}
        {showDetails && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">TTFB</span>
              </div>
              <div className="text-sm">{formatTime(metrics.ttfb)}</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-indigo-500" />
                <span className="text-sm font-medium">Bundle Size</span>
              </div>
              <div className="text-sm">{formatBytes(metrics.bundleSize)}</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Load Time</span>
              </div>
              <div className="text-sm">{formatTime(metrics.loadTime)}</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-cyan-500" />
                <span className="text-sm font-medium">FCP</span>
              </div>
              <div className="text-sm">{formatTime(metrics.fcp)}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceMonitor;
