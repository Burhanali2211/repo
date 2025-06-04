import React, { useState, useEffect } from 'react';
import { X, Brain, Zap, DollarSign, Clock, Star, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AI_PROVIDERS, AIModel } from '@/services/ai/types';
import { useToast } from '@/hooks/use-toast';

interface ModelSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (provider: string, model: string) => Promise<void>;
  currentProvider?: string;
  currentModel?: string;
}

const ModelSelectionModal: React.FC<ModelSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentProvider = '',
  currentModel = ''
}) => {
  const [selectedProvider, setSelectedProvider] = useState(currentProvider || '');
  const [selectedModel, setSelectedModel] = useState(currentModel || '');
  const [isSelecting, setIsSelecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSelectedProvider(currentProvider || '');
      setSelectedModel(currentModel || '');
    }
  }, [isOpen, currentProvider, currentModel]);

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
    setSelectedModel(''); // Reset model when provider changes
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const handleConfirmSelection = async () => {
    if (!selectedProvider || !selectedModel) {
      toast({
        title: "Selection Required",
        description: "Please select both a provider and a model.",
        variant: "destructive"
      });
      return;
    }

    setIsSelecting(true);
    try {
      await onSelect(selectedProvider, selectedModel);
      toast({
        title: "Model Selected",
        description: "Your AI model has been updated successfully."
      });
      onClose();
    } catch (error) {
      toast({
        title: "Selection Failed",
        description: error instanceof Error ? error.message : "Failed to select model.",
        variant: "destructive"
      });
    } finally {
      setIsSelecting(false);
    }
  };

  const getModelTypeColor = (model: AIModel) => {
    if (model.costPer1kTokens === undefined || model.costPer1kTokens === 0) {
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    } else if (model.costPer1kTokens < 0.01) {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    } else {
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    }
  };

  const getModelTypeLabel = (model: AIModel) => {
    if (model.costPer1kTokens === undefined || model.costPer1kTokens === 0) {
      return 'Free';
    } else if (model.costPer1kTokens < 0.01) {
      return 'Budget';
    } else {
      return 'Premium';
    }
  };

  const getPerformanceRating = (model: AIModel) => {
    // Simple heuristic based on model name and cost
    if (model.name.toLowerCase().includes('gpt-4') || model.costPer1kTokens && model.costPer1kTokens > 0.02) {
      return 5;
    } else if (model.name.toLowerCase().includes('turbo') || model.costPer1kTokens && model.costPer1kTokens > 0.005) {
      return 4;
    } else {
      return 3;
    }
  };

  if (!isOpen) return null;

  const provider = AI_PROVIDERS.find(p => p.name === selectedProvider);
  const availableModels = provider?.models || [];

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="model-selection-modal-title"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 id="model-selection-modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                Select AI Model
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose the best AI model for your needs
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
          {/* Provider Selection */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">AI Provider</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {AI_PROVIDERS.map((p) => (
                <Card
                  key={p.name}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${selectedProvider === p.name
                    ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  onClick={() => handleProviderChange(p.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{p.displayName}</h4>
                      {selectedProvider === p.name && (
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {p.models.length} models available
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          {selectedProvider && availableModels.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Available Models</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {availableModels.map((model) => {
                  const isSelected = selectedModel === model.id;
                  const performanceRating = getPerformanceRating(model);

                  return (
                    <Card
                      key={model.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${isSelected
                        ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      onClick={() => handleModelSelect(model.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{model.name}</h4>
                              {isSelected && (
                                <CheckCircle className="h-4 w-4 text-purple-600" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {model.description}
                            </p>
                          </div>
                          <Badge className={getModelTypeColor(model)}>
                            {getModelTypeLabel(model)}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          {/* Performance Rating */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Performance:</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < performanceRating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Model Stats */}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              {model.maxTokens.toLocaleString()} tokens
                            </div>
                            {model.costPer1kTokens !== undefined && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {model.costPer1kTokens === 0 ? 'Free' : `$${model.costPer1kTokens}/1K`}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Model Comparison Info */}
          {selectedProvider && (
            <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Model Selection Tips</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• <strong>Free models:</strong> Great for testing and basic tasks</li>
                  <li>• <strong>Budget models:</strong> Good balance of cost and performance</li>
                  <li>• <strong>Premium models:</strong> Best performance for complex analysis</li>
                  <li>• You can change your model selection anytime</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <Button variant="outline" onClick={onClose} disabled={isSelecting}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSelection}
            disabled={isSelecting || !selectedProvider || !selectedModel}
            className="min-w-[120px]"
          >
            {isSelecting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Selecting...
              </>
            ) : (
              'Select Model'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModelSelectionModal;
