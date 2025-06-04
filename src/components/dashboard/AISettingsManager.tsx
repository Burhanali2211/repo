import React, { useState, useEffect } from 'react';
import { useAISettings } from '@/hooks/useAISettings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Brain,
  Key,
  Settings,
  Zap,
  Shield,
  TrendingUp,
  Lightbulb,
  MessageSquare,
  Bell,
  BarChart,
  CheckCircle,
  XCircle,
  Loader2,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  Activity,
  Target,
  Users,
  Clock,
  Sparkles,
  Database,
  Globe,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Upload,
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';
import { AI_PROVIDERS, AI_FEATURES } from '@/services/ai/types';
import { maskApiKey, validateApiKey } from '@/services/ai/encryption';
import type { AISettings } from '@/services/ai/types';

// Import modal components
import APIKeyConfigModal from './modals/APIKeyConfigModal';
import ModelSelectionModal from './modals/ModelSelectionModal';
import QueryModal from './modals/QueryModal';
import AISettingsModal from './modals/AISettingsModal';
import ErrorModal from './modals/ErrorModal';
import ConfirmationModal from './modals/ConfirmationModal';

// Import enhanced AI components
import AIAnalytics from './AIAnalytics';
import AIChat from './AIChat';
import AIDashboard from './AIDashboard';

const AISettingsManager = () => {
  const { settings, loading, error, updateSettings, resetSettings, testConnection } = useAISettings();
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  // Modal states
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [modelSelectionModalOpen, setModelSelectionModalOpen] = useState(false);
  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  // Error handling
  const [currentError, setCurrentError] = useState<{
    code?: string;
    message: string;
    timestamp: Date;
    context?: string;
    stack?: string;
    suggestions?: string[];
  } | null>(null);

  // Confirmation state
  const [confirmationConfig, setConfirmationConfig] = useState<{
    title: string;
    description: string;
    action: () => Promise<void>;
    variant?: 'default' | 'destructive' | 'warning' | 'info';
    details?: string[];
  } | null>(null);

  // Error handling
  const showError = (error: any, context?: string) => {
    setCurrentError({
      message: error instanceof Error ? error.message : String(error),
      timestamp: new Date(),
      context,
      suggestions: [
        'Check your internet connection',
        'Verify your API key is valid',
        'Try refreshing the page',
        'Contact support if the issue persists'
      ]
    });
    setErrorModalOpen(true);
  };

  // Confirmation helper
  const showConfirmation = (config: typeof confirmationConfig) => {
    setConfirmationConfig(config);
    setConfirmationModalOpen(true);
  };

  // Modal handlers
  const handleApiKeySave = async (provider: string, apiKey: string, model?: string) => {
    try {
      const updateData: Partial<AISettings> = {
        ai_provider: provider,
        ai_api_key_encrypted: apiKey,
        ai_model: model || null
      };

      const result = await updateSettings(updateData);
      if (!result.success) {
        throw result.error || new Error('Failed to save API key');
      }
    } catch (error) {
      showError(error, 'API Key Configuration');
      throw error;
    }
  };

  const handleModelSelection = async (provider: string, model: string) => {
    try {
      const updateData: Partial<AISettings> = {
        ai_provider: provider,
        ai_model: model
      };

      const result = await updateSettings(updateData);
      if (!result.success) {
        throw result.error || new Error('Failed to select model');
      }
    } catch (error) {
      showError(error, 'Model Selection');
      throw error;
    }
  };

  const handleQuery = async (query: string) => {
    try {
      if (!settings?.ai_enabled || !settings?.ai_queries_enabled) {
        throw new Error('AI queries are not enabled. Please enable AI features in settings.');
      }

      if (!settings?.ai_provider || !settings?.ai_api_key_encrypted) {
        throw new Error('AI provider not configured. Please set up your API key first.');
      }

      // Initialize AI service with current settings
      const aiService = new (await import('@/services/ai/aiService')).default(settings);

      // Process the query using real AI
      const response = await aiService.processQuery({
        query,
        context: 'dashboard',
        timestamp: new Date()
      });

      return {
        answer: response.answer,
        confidence: response.confidence,
        suggestions: response.suggestions || response.followUpQuestions,
        visualizations: response.visualizations
      };
    } catch (error) {
      console.error('AI Query Error:', error);
      showError(error, 'AI Query Processing');
      throw error;
    }
  };

  const handleSettingsSave = async (newSettings: any) => {
    try {
      const result = await updateSettings(newSettings);
      if (!result.success) {
        throw result.error || new Error('Failed to save settings');
      }
    } catch (error) {
      showError(error, 'Settings Update');
      throw error;
    }
  };

  const handleResetSettings = () => {
    showConfirmation({
      title: 'Reset AI Settings',
      description: 'Are you sure you want to reset all AI settings to their default values? This action cannot be undone.',
      variant: 'destructive',
      details: [
        'All AI features will be disabled',
        'API keys will be removed',
        'Custom preferences will be lost',
        'Analytics data will be preserved'
      ],
      action: async () => {
        try {
          const result = await resetSettings();
          if (!result.success) {
            throw result.error || new Error('Failed to reset settings');
          }
          toast({
            title: "Settings Reset",
            description: "AI settings have been reset to defaults."
          });
        } catch (error) {
          showError(error, 'Settings Reset');
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
            <Brain className="h-6 w-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Loading AI Integration</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Initializing your AI-powered dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-red-900 dark:text-red-100">Failed to Load AI Settings</h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error.message}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const selectedProvider = AI_PROVIDERS.find(p => p.name === settings?.ai_provider);
  const isAIEnabled = settings?.ai_enabled || false;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Integration</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Supercharge your dashboard with intelligent AI-powered features
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge
            variant={isAIEnabled ? "default" : "secondary"}
            className={`px-3 py-1 ${isAIEnabled ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : ''}`}
          >
            {isAIEnabled ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                AI Active
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3 mr-1" />
                AI Inactive
              </>
            )}
          </Badge>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setQueryModalOpen(true)}
            disabled={!isAIEnabled}
            className="hidden sm:flex"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Ask AI
          </Button>
        </div>
      </div>

      {/* Quick Actions - Mobile First Design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] min-h-[120px] flex items-center"
          onClick={() => setApiKeyModalOpen(true)}
        >
          <CardContent className="p-6 w-full">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Key className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">API Configuration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedProvider ? `${selectedProvider.displayName} configured` : 'Setup your AI provider'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] min-h-[120px] flex items-center"
          onClick={() => setModelSelectionModalOpen(true)}
        >
          <CardContent className="p-6 w-full">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">Model Selection</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {settings?.ai_model || 'Choose AI model'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] min-h-[120px] flex items-center"
          onClick={() => setSettingsModalOpen(true)}
        >
          <CardContent className="p-6 w-full">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Settings className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">AI Preferences</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Customize AI behavior
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto p-1">
          <TabsTrigger value="overview" className="flex items-center gap-2 py-3 px-4 text-xs md:text-sm">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2 py-3 px-4 text-xs md:text-sm">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Features</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 py-3 px-4 text-xs md:text-sm">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2 py-3 px-4 text-xs md:text-sm">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2 py-3 px-4 text-xs md:text-sm">
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">Insights</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 py-3 px-4 text-xs md:text-sm">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <AIDashboard />
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(AI_FEATURES).map((feature) => {
              const IconComponent = {
                TrendingUp,
                Lightbulb,
                MessageSquare,
                Bell,
                BarChart
              }[feature.icon] || TrendingUp;

              const isEnabled = settings?.ai_features_enabled?.[feature.id] || false;

              return (
                <Card
                  key={feature.id}
                  className={`transition-all duration-200 hover:shadow-lg ${isEnabled && isAIEnabled
                    ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/20'
                    : isAIEnabled
                      ? 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      : 'opacity-50'
                    }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isEnabled && isAIEnabled
                          ? 'bg-purple-100 dark:bg-purple-900/30'
                          : 'bg-gray-100 dark:bg-gray-800'
                          }`}>
                          <IconComponent className={`h-5 w-5 ${isEnabled && isAIEnabled ? 'text-purple-600' : 'text-gray-400'
                            }`} />
                        </div>
                        <Badge variant={isEnabled && isAIEnabled ? 'default' : 'secondary'}>
                          {isEnabled && isAIEnabled ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      disabled={!isAIEnabled}
                      onClick={() => setSettingsModalOpen(true)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {!isAIEnabled && (
            <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
              <CardContent className="p-8 text-center">
                <Brain className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  AI Features Disabled
                </h3>
                <p className="text-blue-700 dark:text-blue-300 mb-4">
                  Configure your AI provider and enable AI features to unlock intelligent insights and automation.
                </p>
                <Button onClick={() => setApiKeyModalOpen(true)}>
                  <Key className="h-4 w-4 mr-2" />
                  Setup AI Provider
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <AIAnalytics />
        </TabsContent>

        {/* Chat Tab */}
        <TabsContent value="chat" className="space-y-6">
          <AIChat />
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">
                  AI-Powered Insights
                </h3>
              </div>
              <p className="text-yellow-800 dark:text-yellow-200 mb-4">
                Get intelligent recommendations and insights about your dashboard performance.
              </p>
              <Button
                onClick={() => setQueryModalOpen(true)}
                disabled={!isAIEnabled}
                className="w-full sm:w-auto"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask AI for Insights
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* API Key Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Key Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Encryption Status</span>
                  <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    <Shield className="h-3 w-3 mr-1" />
                    Encrypted
                  </Badge>
                </div>

                {settings?.ai_api_key_encrypted && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Stored Key Preview</span>
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
                      {maskApiKey(settings.ai_api_key_encrypted)}
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• API keys are encrypted before storage</p>
                  <p>• Keys are never logged or transmitted in plain text</p>
                  <p>• Only you can access your encrypted keys</p>
                </div>
              </CardContent>
            </Card>

            {/* Data Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Data Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Processing</span>
                    <Badge variant="outline">Local + AI Provider</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Retention</span>
                    <Badge variant="outline">As per AI Provider Policy</Badge>
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Dashboard data may be sent to AI providers for analysis</p>
                  <p>• No personal data is stored by our AI system</p>
                  <p>• Follow your AI provider's data policy</p>
                  <p>• You can disable AI features anytime</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Security Actions</CardTitle>
              <CardDescription>
                Manage your AI security settings and data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={handleResetSettings}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset to Defaults
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setApiKeyModalOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Key className="h-4 w-4" />
                  Manage API Keys
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg"
          onClick={() => setQueryModalOpen(true)}
          disabled={!isAIEnabled}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>

      {/* Modals */}
      <APIKeyConfigModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        onSave={handleApiKeySave}
        currentProvider={settings?.ai_provider}
        currentApiKey={settings?.ai_api_key_encrypted}
        currentModel={settings?.ai_model}
      />

      <ModelSelectionModal
        isOpen={modelSelectionModalOpen}
        onClose={() => setModelSelectionModalOpen(false)}
        onSelect={handleModelSelection}
        currentProvider={settings?.ai_provider}
        currentModel={settings?.ai_model}
      />

      <QueryModal
        isOpen={queryModalOpen}
        onClose={() => setQueryModalOpen(false)}
        onQuery={handleQuery}
      />

      <AISettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        onSave={handleSettingsSave}
        currentSettings={settings || {}}
      />

      {currentError && (
        <ErrorModal
          isOpen={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
          error={currentError}
          onRetry={() => {
            setErrorModalOpen(false);
            // Implement retry logic based on context
          }}
        />
      )}

      {confirmationConfig && (
        <ConfirmationModal
          isOpen={confirmationModalOpen}
          onClose={() => setConfirmationModalOpen(false)}
          onConfirm={confirmationConfig.action}
          title={confirmationConfig.title}
          description={confirmationConfig.description}
          variant={confirmationConfig.variant}
          details={confirmationConfig.details}
        />
      )}
    </div>
  );
};

export default AISettingsManager;
