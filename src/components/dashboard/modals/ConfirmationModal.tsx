import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle, Info, Trash2, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive' | 'warning' | 'info';
  requiresConfirmation?: boolean;
  confirmationText?: string;
  details?: string[];
  icon?: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  requiresConfirmation = false,
  confirmationText = 'I understand the consequences',
  details = [],
  icon
}) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const handleConfirm = async () => {
    if (requiresConfirmation && !hasConfirmed) {
      return;
    }

    setIsConfirming(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Confirmation action failed:', error);
    } finally {
      setIsConfirming(false);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'destructive':
        return {
          headerBg: 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
          iconBg: 'bg-red-100 dark:bg-red-900/30',
          iconColor: 'text-red-600',
          cardBg: 'border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800',
          textColor: 'text-red-800 dark:text-red-200',
          buttonVariant: 'destructive' as const,
          defaultIcon: <AlertTriangle className="h-5 w-5" />
        };
      case 'warning':
        return {
          headerBg: 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
          iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
          iconColor: 'text-yellow-600',
          cardBg: 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800',
          textColor: 'text-yellow-800 dark:text-yellow-200',
          buttonVariant: 'default' as const,
          defaultIcon: <AlertTriangle className="h-5 w-5" />
        };
      case 'info':
        return {
          headerBg: 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
          iconBg: 'bg-blue-100 dark:bg-blue-900/30',
          iconColor: 'text-blue-600',
          cardBg: 'border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800',
          textColor: 'text-blue-800 dark:text-blue-200',
          buttonVariant: 'default' as const,
          defaultIcon: <Info className="h-5 w-5" />
        };
      default:
        return {
          headerBg: 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20',
          iconBg: 'bg-purple-100 dark:bg-purple-900/30',
          iconColor: 'text-purple-600',
          cardBg: 'border-purple-200 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-800',
          textColor: 'text-purple-800 dark:text-purple-200',
          buttonVariant: 'default' as const,
          defaultIcon: <CheckCircle className="h-5 w-5" />
        };
    }
  };

  const styles = getVariantStyles();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className={`flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 ${styles.headerBg}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 ${styles.iconBg} rounded-lg`}>
              <div className={styles.iconColor}>
                {icon || styles.defaultIcon}
              </div>
            </div>
            <div>
              <h2 id="confirmation-modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            disabled={isConfirming}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Message */}
          <Card className={styles.cardBg}>
            <CardContent className="p-4">
              <p className={`text-sm leading-relaxed ${styles.textColor}`}>
                {description}
              </p>
            </CardContent>
          </Card>

          {/* Details */}
          {details.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                This action will:
              </h3>
              <ul className="space-y-2">
                {details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Confirmation Checkbox */}
          {requiresConfirmation && (
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Checkbox
                  id="confirmation-checkbox"
                  checked={hasConfirmed}
                  onCheckedChange={setHasConfirmed}
                  disabled={isConfirming}
                />
                <label
                  htmlFor="confirmation-checkbox"
                  className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  {confirmationText}
                </label>
              </div>
            </div>
          )}

          {/* Warning for destructive actions */}
          {variant === 'destructive' && (
            <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-700 dark:text-red-300">
                <strong>Warning:</strong> This action cannot be undone. Please make sure you want to proceed.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={isConfirming}
          >
            {cancelText}
          </Button>
          <Button 
            variant={styles.buttonVariant}
            onClick={handleConfirm} 
            disabled={isConfirming || (requiresConfirmation && !hasConfirmed)}
            className="min-w-[100px]"
          >
            {isConfirming ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
