import React from 'react';
import { X, AlertTriangle, RefreshCw, Bug, ExternalLink, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ErrorDetails {
  code?: string;
  message: string;
  timestamp: Date;
  context?: string;
  stack?: string;
  suggestions?: string[];
}

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  error: ErrorDetails;
  title?: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  error,
  title = "An Error Occurred"
}) => {
  const { toast } = useToast();

  const copyErrorDetails = () => {
    const errorText = `
Error: ${error.message}
Code: ${error.code || 'N/A'}
Time: ${error.timestamp.toISOString()}
Context: ${error.context || 'N/A'}
${error.stack ? `Stack: ${error.stack}` : ''}
    `.trim();

    navigator.clipboard.writeText(errorText);
    toast({
      title: "Copied",
      description: "Error details copied to clipboard."
    });
  };

  const getErrorSeverity = () => {
    if (error.code?.startsWith('CRITICAL') || error.message.toLowerCase().includes('critical')) {
      return { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', label: 'Critical' };
    } else if (error.code?.startsWith('WARNING') || error.message.toLowerCase().includes('warning')) {
      return { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', label: 'Warning' };
    } else {
      return { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', label: 'Error' };
    }
  };

  const severity = getErrorSeverity();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="error-modal-title"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 id="error-modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Something went wrong with your AI integration
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
          {/* Error Summary */}
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <Badge className={severity.color}>
                  {severity.label}
                </Badge>
                {error.code && (
                  <Badge variant="outline" className="font-mono text-xs">
                    {error.code}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-red-800 dark:text-red-200 leading-relaxed">
                {error.message}
              </p>
              {error.context && (
                <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-800">
                  <p className="text-xs text-red-600 dark:text-red-400">
                    <strong>Context:</strong> {error.context}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Error Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Error Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Timestamp:</span>
                <p className="text-gray-600 dark:text-gray-400 font-mono">
                  {error.timestamp.toLocaleString()}
                </p>
              </div>
              
              {error.code && (
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Error Code:</span>
                  <p className="text-gray-600 dark:text-gray-400 font-mono">
                    {error.code}
                  </p>
                </div>
              )}
            </div>

            {/* Stack Trace (if available) */}
            {error.stack && (
              <div className="space-y-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">Stack Trace:</span>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-h-32 overflow-y-auto">
                  <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {error.suggestions && error.suggestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Suggested Solutions</h3>
              <div className="space-y-2">
                {error.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Solutions */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Common Solutions</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Check your internet connection and try again</li>
                <li>• Verify your API key is valid and has sufficient credits</li>
                <li>• Ensure the AI provider service is operational</li>
                <li>• Try refreshing the page or restarting the application</li>
                <li>• Contact support if the problem persists</li>
              </ul>
            </CardContent>
          </Card>

          {/* Help Resources */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Bug className="h-3 w-3 mr-1" />
              Report Bug
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              Documentation
            </Button>
            <Button variant="outline" size="sm" className="text-xs" onClick={copyErrorDetails}>
              <Copy className="h-3 w-3 mr-1" />
              Copy Details
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {onRetry && (
            <Button onClick={onRetry} className="min-w-[100px]">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
