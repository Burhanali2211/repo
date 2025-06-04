import React, { useState, useEffect } from 'react';
import { X, Key, Eye, EyeOff, Shield, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AI_PROVIDERS } from '@/services/ai/types';
import { validateApiKey } from '@/services/ai/encryption';
import { useToast } from '@/hooks/use-toast';

interface APIKeyConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (provider: string, apiKey: string, model?: string) => Promise<void>;
  currentProvider?: string;
  currentApiKey?: string;
  currentModel?: string;
}

const APIKeyConfigModal: React.FC<APIKeyConfigModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentProvider = '',
  currentApiKey = '',
  currentModel = ''
}) => {
  const [provider, setProvider] = useState(currentProvider || '');
  const [apiKey, setApiKey] = useState(currentApiKey || '');
  const [model, setModel] = useState(currentModel || '');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setProvider(currentProvider || '');
      setApiKey(currentApiKey || '');
      setModel(currentModel || '');
      setValidationResult(null);
    }
  }, [isOpen, currentProvider, currentApiKey, currentModel]);

  const selectedProvider = AI_PROVIDERS.find(p => p.name === provider);
  const availableModels = selectedProvider?.models || [];

  const handleProviderChange = (newProvider: string) => {
    setProvider(newProvider);
    setModel(''); // Reset model when provider changes
    setValidationResult(null);
  };

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    setValidationResult(null);
  };

  const validateApiKeyFormat = async () => {
    if (!apiKey.trim()) {
      setValidationResult({ valid: false, message: 'API key is required' });
      return;
    }

    setIsValidating(true);
    try {
      const result = validateApiKey(apiKey, provider);
      setValidationResult(result);
    } catch (error) {
      setValidationResult({ valid: false, message: 'Validation failed' });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = async () => {
    if (!provider || !apiKey.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a provider and enter an API key.",
        variant: "destructive"
      });
      return;
    }

    if (validationResult && !validationResult.valid) {
      toast({
        title: "Invalid API Key",
        description: validationResult.message,
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      await onSave(provider, apiKey, model || undefined);
      toast({
        title: "API Key Saved",
        description: "Your API key has been securely saved and encrypted."
      });
      onClose();
    } catch (error) {
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save API key.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-key-modal-title"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Key className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 id="api-key-modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                Configure API Key
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Securely store your AI provider credentials
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
          {/* Security Notice */}
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 dark:text-blue-100">Secure Storage</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Your API keys are encrypted using industry-standard encryption before being stored.
                    They are never transmitted or logged in plain text.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Provider Selection */}
          <div className="space-y-2">
            <Label htmlFor="provider">AI Provider *</Label>
            <Select value={provider} onValueChange={handleProviderChange}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select an AI provider" />
              </SelectTrigger>
              <SelectContent>
                {AI_PROVIDERS.map((p) => (
                  <SelectItem key={p.name} value={p.name}>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="font-medium">{p.displayName}</div>
                        <div className="text-xs text-gray-500">
                          {p.models.length} models available
                        </div>
                      </div>
                      {p.requiresApiKey && (
                        <Badge variant="outline" className="ml-2">
                          <Key className="h-3 w-3 mr-1" />
                          API Key Required
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* API Key Input */}
          {selectedProvider?.requiresApiKey && (
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key *</Label>
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    id="apiKey"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => handleApiKeyChange(e.target.value)}
                    placeholder={`Enter your ${selectedProvider.displayName} API key`}
                    className="pr-20 h-12"
                    onBlur={validateApiKeyFormat}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="h-8 w-8 p-0"
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    {isValidating && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
                  </div>
                </div>

                {/* Validation Result */}
                {validationResult && (
                  <div className={`flex items-center gap-2 text-sm ${validationResult.valid ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {validationResult.valid ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                    {validationResult.message}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Model Selection */}
          {availableModels.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="model">Preferred Model (Optional)</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select a model (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      <div>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-xs text-gray-500">{m.description}</div>
                        {m.costPer1kTokens && (
                          <div className="text-xs text-green-600">
                            ${m.costPer1kTokens}/1K tokens
                          </div>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !provider || !apiKey.trim()}
            className="min-w-[100px]"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              'Save API Key'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default APIKeyConfigModal;
