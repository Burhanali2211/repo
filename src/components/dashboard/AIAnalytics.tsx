import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Activity,
  Zap,
  RefreshCw,
  Brain,
  Target,
  Users,
  Eye
} from 'lucide-react';
import { useAISettings } from '@/hooks/useAISettings';
import type { AIAnalyticsInsight, AIRecommendation } from '@/services/ai/types';

const AIAnalytics = () => {
  const { settings } = useAISettings();
  const [insights, setInsights] = useState<AIAnalyticsInsight[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  // Real AI-powered analytics
  useEffect(() => {
    if (settings?.ai_enabled && settings?.ai_analytics_enabled) {
      loadAIAnalytics();
    }
  }, [settings]);

  const loadAIAnalytics = async () => {
    setLoading(true);
    try {
      // Initialize AI service with current settings
      const AIService = (await import('@/services/ai/aiService')).default;
      const aiService = new AIService(settings);

      // Generate real AI insights and recommendations
      const [anomalies, aiRecommendations] = await Promise.all([
        aiService.detectAnomalies(),
        aiService.generateRecommendations()
      ]);

      // Convert anomalies to insights format
      const aiInsights: AIAnalyticsInsight[] = anomalies.map(anomaly => ({
        id: anomaly.id,
        title: anomaly.title,
        description: anomaly.description,
        type: anomaly.type === 'traffic' ? 'trend' :
          anomaly.type === 'performance' ? 'alert' : 'recommendation',
        severity: anomaly.severity,
        data: anomaly.data,
        timestamp: anomaly.detectedAt.toISOString(),
        actionable: anomaly.suggestedActions.length > 0,
        actions: anomaly.suggestedActions.map((action, index) => ({
          id: `${anomaly.id}-${index}`,
          label: action,
          type: 'action' as const,
          payload: { action }
        }))
      }));

      // Convert AI recommendations to the expected format
      const formattedRecommendations: AIRecommendation[] = aiRecommendations.map(rec => ({
        id: rec.id,
        title: rec.title,
        description: rec.description,
        category: rec.category,
        priority: rec.priority,
        impact: rec.estimatedImprovement,
        effort: rec.effort,
        actions: rec.actionItems.map((item, index) => ({
          id: `${rec.id}-${index}`,
          label: item,
          type: 'action' as const,
          payload: { action: item }
        })),
        timestamp: rec.createdAt.toISOString()
      }));

      setInsights(aiInsights);
      setRecommendations(formattedRecommendations);
    } catch (error) {
      console.error('Failed to load AI analytics:', error);
      // Fallback to basic insights if AI fails
      setInsights([{
        id: 'fallback-1',
        title: 'AI Analytics Active',
        description: 'AI monitoring is running. Real insights will appear as data is analyzed.',
        type: 'trend',
        severity: 'low',
        data: {},
        timestamp: new Date().toISOString(),
        actionable: false,
        actions: []
      }]);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshAnalytics = async () => {
    await loadAIAnalytics();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trend': return TrendingUp;
      case 'anomaly': return AlertTriangle;
      case 'recommendation': return Lightbulb;
      case 'alert': return AlertTriangle;
      default: return Activity;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!settings?.ai_enabled || !settings?.ai_analytics_enabled) {
    return (
      <div className="text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <Brain className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
          AI Analytics Disabled
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          Enable AI Analytics in the AI Integration settings to view intelligent insights
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Intelligent insights and recommendations for your dashboard
          </p>
        </div>
        <Button
          onClick={refreshAnalytics}
          disabled={loading}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Insights Generated</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{insights.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Recommendations</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{recommendations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Actionable Items</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {insights.filter(i => i.actionable).length + recommendations.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Insights
          </CardTitle>
          <CardDescription>
            AI-powered analysis of your dashboard data and performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight) => {
            const IconComponent = getTypeIcon(insight.type);
            return (
              <div
                key={insight.id}
                className={`p-4 rounded-lg border ${getSeverityColor(insight.severity)}`}
              >
                <div className="flex items-start gap-3">
                  <IconComponent className="h-5 w-5 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{insight.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {insight.type}
                      </Badge>
                    </div>
                    <p className="text-sm mb-3">{insight.description}</p>
                    {insight.actions && insight.actions.length > 0 && (
                      <div className="flex gap-2">
                        {insight.actions.map((action) => (
                          <Button
                            key={action.id}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
          <CardDescription>
            Suggested improvements based on data analysis and best practices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">{rec.title}</h4>
                <Badge className={getPriorityColor(rec.priority)}>
                  {rec.priority} priority
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {rec.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <span>Impact: {rec.impact}</span>
                <span>Effort: {rec.effort}</span>
                <span>Category: {rec.category}</span>
              </div>
              <div className="flex gap-2">
                {rec.actions.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAnalytics;
