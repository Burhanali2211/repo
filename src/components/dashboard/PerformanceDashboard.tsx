import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Zap, 
  Clock, 
  TrendingUp, 
  Download, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { generatePerformanceReport, type PerformanceMetrics } from '@/utils/performanceMonitor';
import { generateCompleteSitemap, downloadSitemap } from '@/utils/sitemapGenerator';

interface PerformanceReport {
  webVitals: PerformanceMetrics;
  navigation: PerformanceMetrics;
  resources: Array<{ name: string; duration: number; size: number; type: string }>;
  bundles: Array<{ name: string; size: number; gzipSize?: number }>;
  score: number;
  recommendations: string[];
}

const PerformanceDashboard: React.FC = () => {
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [sitemapGenerating, setSitemapGenerating] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      const performanceReport = await generatePerformanceReport();
      setReport(performanceReport);
    } catch (error) {
      console.error('Failed to generate performance report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSitemap = async () => {
    setSitemapGenerating(true);
    try {
      const sitemap = await generateCompleteSitemap();
      downloadSitemap(sitemap);
    } catch (error) {
      console.error('Failed to generate sitemap:', error);
    } finally {
      setSitemapGenerating(false);
    }
  };

  useEffect(() => {
    generateReport();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (score >= 70) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
  };

  const getMetricIcon = (value: number, threshold: { good: number; poor: number }) => {
    if (value <= threshold.good) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (value <= threshold.poor) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor website performance and Core Web Vitals</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={generateReport}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Report
          </Button>
          <Button
            onClick={handleGenerateSitemap}
            disabled={sitemapGenerating}
            variant="outline"
            size="sm"
          >
            <Download className={`h-4 w-4 mr-2 ${sitemapGenerating ? 'animate-spin' : ''}`} />
            Generate Sitemap
          </Button>
        </div>
      </div>

      {loading && !report ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      ) : report ? (
        <>
          {/* Performance Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Overall Performance Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`text-4xl font-bold ${getScoreColor(report.score)}`}>
                    {report.score}
                  </div>
                  {getScoreBadge(report.score)}
                </div>
                <Progress value={report.score} className="w-32" />
              </div>
            </CardContent>
          </Card>

          {/* Core Web Vitals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {report.webVitals.lcp && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    {getMetricIcon(report.webVitals.lcp, { good: 2500, poor: 4000 })}
                    <span className="ml-2">LCP</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(report.webVitals.lcp / 1000).toFixed(2)}s</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Largest Contentful Paint</p>
                </CardContent>
              </Card>
            )}

            {report.webVitals.fid && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    {getMetricIcon(report.webVitals.fid, { good: 100, poor: 300 })}
                    <span className="ml-2">FID</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report.webVitals.fid.toFixed(0)}ms</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">First Input Delay</p>
                </CardContent>
              </Card>
            )}

            {report.webVitals.cls && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    {getMetricIcon(report.webVitals.cls, { good: 0.1, poor: 0.25 })}
                    <span className="ml-2">CLS</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report.webVitals.cls.toFixed(3)}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Cumulative Layout Shift</p>
                </CardContent>
              </Card>
            )}

            {report.navigation.ttfb && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    {getMetricIcon(report.navigation.ttfb, { good: 800, poor: 1800 })}
                    <span className="ml-2">TTFB</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report.navigation.ttfb.toFixed(0)}ms</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Time to First Byte</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Bundle Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Bundle Analysis
              </CardTitle>
              <CardDescription>JavaScript and CSS bundle sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {report.bundles.slice(0, 10).map((bundle, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <span className="text-sm font-medium truncate">{bundle.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatBytes(bundle.size)}
                      </span>
                      {bundle.gzipSize && (
                        <span className="text-xs text-gray-500">
                          ({formatBytes(bundle.gzipSize)} gzipped)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {report.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Performance Recommendations
                </CardTitle>
                <CardDescription>Suggestions to improve your website performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">No performance data available. Click "Refresh Report" to generate a new report.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PerformanceDashboard;
