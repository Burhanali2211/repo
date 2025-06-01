import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload as UploadIcon, X, Image as ImageIcon, Sun, Moon, Monitor } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { uploadFile } from '@/lib/supabase/services/storage';

interface DualLogoUploadProps {
  siteLogo?: string;
  siteLogoLight?: string;
  siteLogoDark?: string;
  onLogoChange: (field: 'site_logo' | 'site_logo_light' | 'site_logo_dark', value: string) => void;
  isUploading?: boolean;
  onUploadingChange?: (uploading: boolean) => void;
}

const DualLogoUpload: React.FC<DualLogoUploadProps> = ({
  siteLogo,
  siteLogoLight,
  siteLogoDark,
  onLogoChange,
  isUploading = false,
  onUploadingChange
}) => {
  const [previews, setPreviews] = useState({
    fallback: siteLogo || '',
    light: siteLogoLight || '',
    dark: siteLogoDark || ''
  });

  const fileInputRefs = {
    fallback: useRef<HTMLInputElement>(null),
    light: useRef<HTMLInputElement>(null),
    dark: useRef<HTMLInputElement>(null)
  };

  const handleFileUpload = async (
    file: File,
    type: 'fallback' | 'light' | 'dark'
  ) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file (PNG, JPG, SVG, etc.)',
        variant: 'destructive'
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
        variant: 'destructive'
      });
      return;
    }

    try {
      onUploadingChange?.(true);

      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${type}-${Date.now()}.${fileExt}`;

      const uploadedUrl = await uploadFile(file, `logos/${fileName}`);

      // Update the appropriate field
      const fieldMap = {
        fallback: 'site_logo' as const,
        light: 'site_logo_light' as const,
        dark: 'site_logo_dark' as const
      };

      onLogoChange(fieldMap[type], uploadedUrl);

      // Update preview
      setPreviews(prev => ({
        ...prev,
        [type]: uploadedUrl
      }));

      toast({
        title: 'Logo uploaded successfully',
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} logo has been updated`
      });

    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload logo. Please try again.',
        variant: 'destructive'
      });
    } finally {
      onUploadingChange?.(false);
    }
  };

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'fallback' | 'light' | 'dark'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file, type);
    }
  };

  const handleUrlChange = (
    value: string,
    type: 'fallback' | 'light' | 'dark'
  ) => {
    const fieldMap = {
      fallback: 'site_logo' as const,
      light: 'site_logo_light' as const,
      dark: 'site_logo_dark' as const
    };

    onLogoChange(fieldMap[type], value);
    setPreviews(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const clearLogo = (type: 'fallback' | 'light' | 'dark') => {
    const fieldMap = {
      fallback: 'site_logo' as const,
      light: 'site_logo_light' as const,
      dark: 'site_logo_dark' as const
    };

    onLogoChange(fieldMap[type], '');
    setPreviews(prev => ({
      ...prev,
      [type]: ''
    }));

    // Clear file input
    if (fileInputRefs[type].current) {
      fileInputRefs[type].current.value = '';
    }
  };

  const LogoUploadCard = ({
    type,
    title,
    description,
    icon: Icon,
    preview,
    urlValue
  }: {
    type: 'fallback' | 'light' | 'dark';
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    preview: string;
    urlValue: string;
  }) => (
    <Card className="relative">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Icon className="mr-2 h-4 w-4" />
          {title}
        </CardTitle>
        <CardDescription className="text-xs">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Preview */}
        <div className="flex items-center justify-center h-20 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt={`${title} preview`}
                className="max-h-16 max-w-32 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                onClick={() => clearLogo(type)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
              <p className="text-xs text-gray-500 mt-1">No logo</p>
            </div>
          )}
        </div>

        {/* URL Input */}
        <div>
          <Label htmlFor={`${type}_url`} className="text-xs">Logo URL</Label>
          <Input
            id={`${type}_url`}
            value={urlValue}
            onChange={(e) => handleUrlChange(e.target.value, type)}
            placeholder="https://example.com/logo.png"
            className="text-xs"
          />
        </div>

        {/* File Upload */}
        <div>
          <input
            ref={fileInputRefs[type]}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e, type)}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRefs[type].current?.click()}
            disabled={isUploading}
            className="w-full text-xs"
          >
            <UploadIcon className="mr-2 h-3 w-3" />
            {isUploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Dual Logo System</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Configure different logos for light and dark themes. The system automatically switches based on user preference.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LogoUploadCard
          type="light"
          title="Light Theme Logo"
          description="Dark logo on transparent background (for light themes)"
          icon={Sun}
          preview={previews.light}
          urlValue={siteLogoLight || ''}
        />

        <LogoUploadCard
          type="dark"
          title="Dark Theme Logo"
          description="Light logo on transparent background (for dark themes)"
          icon={Moon}
          preview={previews.dark}
          urlValue={siteLogoDark || ''}
        />

        <LogoUploadCard
          type="fallback"
          title="Fallback Logo"
          description="Universal logo that works in both themes"
          icon={Monitor}
          preview={previews.fallback}
          urlValue={siteLogo || ''}
        />
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          Logo Specifications
        </h4>
        <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Recommended Format: PNG, SVG (with transparency)</li>
          <li>• Recommended Size: 200x80px</li>
          <li>• Max File Size: 5MB</li>
          <li>• Aspect Ratio: 2.5:1 (width:height)</li>
        </ul>
      </div>
    </div>
  );
};

export default DualLogoUpload;
