import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  MessageSquare, 
  Lightbulb, 
  Bell, 
  BarChart3,
  Zap,
  Settings,
  Activity,
  Target,
  Users,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useAISettings } from '@/hooks/useAISettings';

const AIDashboard = () => {
  const { settings } = useAISettings();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // Mock data for demonstration
  const aiMetrics = {
    totalInsights: 12,
    activeRecommendations: 5,
    queriesProcessed: 47,
    alertsGenerated: 3,
    accuracyScore: 94,
    responseTime: 1.2
  };

  const recentActivity = [
    {
      id: '1',
      type: 'insight',
      title: 'Traffic surge detected',
      description: 'Website traffic increased by 45% in the last 7 days',
      timestamp: '2 minutes ago',
      severity: 'medium'
    },
    {
      id: '2',
      type: 'recommendation',
      title: 'Optimize mobile performance',
      description: 'Mobile page load time can be improved by 30%',
      timestamp: '15 minutes ago',
      severity: 'high'
    },
    {
      id: '3',
      type: 'query',
      title: 'User asked about conversion rates',
      description: 'Provided analysis of form completion rates',
      timestamp: '1 hour ago',
      severity: 'low'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Unusual bounce rate pattern',
      description: 'Bounce rate increased by 15% on mobile devices',
      timestamp: '2 hours ago',
      severity: 'high'
    }
  ];

  const aiFeatures = [
    {
      id: 'analytics',
      name: 'AI Analytics',
      description: 'Intelligent insights from your data',
      icon: TrendingUp,
      enabled: settings?.ai_analytics_enabled || false,
      status: 'active',
      metrics: { insights: 12, accuracy: 94 }
    },
    {
      id: 'recommendations',
      name: 'Smart Recommendations',
      description: 'AI-powered improvement suggestions',
      icon: Lightbulb,
      enabled: settings?.ai_recommendations_enabled || false,
      status: 'active',
      metrics: { recommendations: 5, implemented: 2 }
    },
    {
      id: 'queries',
      name: 'Natural Language Queries',
      description: 'Chat with your data',
      icon: MessageSquare,
      enabled: settings?.ai_queries_enabled || false,
      status: 'active',
      metrics: { queries: 47, satisfaction: 96 }
    },
    {
      id: 'alerts',
      name: 'Intelligent Alerts',
      description: 'Proactive anomaly detection',
      icon: Bell,
      enabled: settings?.ai_alerts_enabled || false,
      status: 'active',
      metrics: { alerts: 3, accuracy: 89 }
    },
    {
      id: 'visualization',
      name: 'Smart Visualizations',
      description: 'AI-suggested charts and graphs',
      icon: BarChart3,
      enabled: settings?.ai_visualization_enabled || false,
      status: 'active',
      metrics: { suggestions: 8, adopted: 6 }
    }
  ];

  const getStatusColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'insight': return TrendingUp;
      case 'recommendation': return Lightbulb;
      case 'query': return MessageSquare;
      case 'alert': return Bell;
      default: return Activity;
    }
  };

  if (!settings?.ai_enabled) {
    return (
      <div className="text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
          AI Features Not Enabled
        </h3>
        <p className="text-gray-500 dark:text-gray-500 mb-4">
          Configure your AI settings to unlock intelligent dashboard features
        </p>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Configure AI Settings
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Overview of your AI-powered dashboard features and insights
          </p>
        </div>
        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          AI Active
        </Badge>
      </div>

      {/* AI Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Insights</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{aiMetrics.totalInsights}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Recommendations</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{aiMetrics.activeRecommendations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Queries Processed</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{aiMetrics.queriesProcessed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy Score</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{aiMetrics.accuracyScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Features Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Features Status
            </CardTitle>
            <CardDescription>
              Overview of your enabled AI capabilities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    feature.enabled 
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                      : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                  } ${activeFeature === feature.id ? 'ring-2 ring-purple-500' : ''}`}
                  onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`h-5 w-5 ${
                        feature.enabled ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                      }`} />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{feature.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                    <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                      {feature.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  
                  {activeFeature === feature.id && feature.enabled && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {Object.entries(feature.metrics).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-gray-600 dark:text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">
                              {typeof value === 'number' && key.includes('accuracy') || key.includes('satisfaction') 
                                ? `${value}%` 
                                : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent AI Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest AI-generated insights and actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <div className={`p-1.5 rounded-full ${getStatusColor(activity.severity)}`}>
                    <IconComponent className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                      {activity.title}
                    </h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>AI Performance Metrics</CardTitle>
          <CardDescription>
            How well your AI features are performing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Accuracy Score</span>
                <span className="text-sm text-gray-600">{aiMetrics.accuracyScore}%</span>
              </div>
              <Progress value={aiMetrics.accuracyScore} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Response Time</span>
                <span className="text-sm text-gray-600">{aiMetrics.responseTime}s</span>
              </div>
              <Progress value={(3 - aiMetrics.responseTime) / 3 * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIDashboard;
