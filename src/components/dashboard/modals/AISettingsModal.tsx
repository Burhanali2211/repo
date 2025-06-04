import React, { useState, useEffect } from 'react';
import { X, Settings, Zap, Bell, BarChart3, TrendingUp, MessageSquare, Lightbulb, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AI_FEATURES } from '@/services/ai/types';
import { useToast } from '@/hooks/use-toast';

interface AISettingsData {
  ai_enabled: boolean;
  ai_features_enabled: Record<string, boolean>;
  ai_analytics_enabled: boolean;
  ai_recommendations_enabled: boolean;
  ai_queries_enabled: boolean;
  ai_alerts_enabled: boolean;
  ai_visualization_enabled: boolean;
}

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: Partial<AISettingsData>) => Promise<void>;
  currentSettings: Partial<AISettingsData>;
}

const AISettingsModal: React.FC<AISettingsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentSettings
}) => {
  const [settings, setSettings] = useState<AISettingsData>({
    ai_enabled: false,
    ai_features_enabled: {},
    ai_analytics_enabled: true,
    ai_recommendations_enabled: true,
    ai_queries_enabled: true,
    ai_alerts_enabled: true,
    ai_visualization_enabled: true,
    ...currentSettings
  });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSettings({
        ai_enabled: false,
        ai_features_enabled: {},
        ai_analytics_enabled: true,
        ai_recommendations_enabled: true,
        ai_queries_enabled: true,
        ai_alerts_enabled: true,
        ai_visualization_enabled: true,
        ...currentSettings
      });
    }
  }, [isOpen, currentSettings]);

  const handleFeatureToggle = (featureId: string, enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      ai_features_enabled: {
        ...prev.ai_features_enabled,
        [featureId]: enabled
      },
      [`ai_${featureId}_enabled`]: enabled
    }));
  };

  const handleSettingChange = (key: keyof AISettingsData, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(settings);
      toast({
        title: "Settings Saved",
        description: "Your AI preferences have been updated successfully."
      });
      onClose();
    } catch (error) {
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save settings.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getFeatureIcon = (iconName: string) => {
    const icons = {
      TrendingUp,
      Lightbulb,
      MessageSquare,
      Bell,
      BarChart3
    };
    return icons[iconName as keyof typeof icons] || TrendingUp;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-settings-modal-title"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Settings className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 id="ai-settings-modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                AI Preferences
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customize your AI experience and feature settings
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(95vh-140px)] overflow-y-auto">
          {/* Master AI Toggle */}
          <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Enable AI Features
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Turn on AI-powered enhancements for your dashboard
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.ai_enabled}
                  onCheckedChange={(checked) => handleSettingChange('ai_enabled', checked)}
                  className="scale-125"
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">AI Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(AI_FEATURES).map((feature) => {
                const IconComponent = getFeatureIcon(feature.icon);
                const isEnabled = settings.ai_features_enabled[feature.id] || false;

                return (
                  <Card
                    key={feature.id}
                    className={`transition-all duration-200 ${isEnabled && settings.ai_enabled
                      ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/20'
                      : settings.ai_enabled
                        ? 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        : 'opacity-50'
                      }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <IconComponent className={`h-5 w-5 ${isEnabled && settings.ai_enabled ? 'text-purple-600' : 'text-gray-400'
                            }`} />
                          <Badge variant={isEnabled && settings.ai_enabled ? 'default' : 'secondary'}>
                            {isEnabled && settings.ai_enabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </div>
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={(checked) => handleFeatureToggle(feature.id, checked)}
                          disabled={!settings.ai_enabled}
                        />
                      </div>
                      <h4 className="font-medium mb-1">{feature.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Additional Settings Info */}
          <div className="space-y-4">
            <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">AI Settings Configured</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Your AI features are now configured. You can adjust individual feature settings and
                  manage your API keys through the main AI dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="min-w-[100px]">
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AISettingsModal;
