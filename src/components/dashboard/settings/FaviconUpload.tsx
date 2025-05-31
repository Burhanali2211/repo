import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, X, Image, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { uploadFile } from '@/lib/supabase/services/storage';

interface FaviconUploadProps {
  siteFavicon?: string;
  onFaviconChange: (field: 'site_favicon', value: string) => void;
  isUploading?: boolean;
  onUploadingChange?: (uploading: boolean) => void;
}

const FaviconUpload: React.FC<FaviconUploadProps> = ({
  siteFavicon,
  onFaviconChange,
  isUploading = false,
  onUploadingChange
}) => {
  const [preview, setPreview] = useState(siteFavicon || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type - favicons should be ICO, PNG, or SVG
    const validTypes = ['image/x-icon', 'image/vnd.microsoft.icon', 'image/png', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an ICO, PNG, or SVG file for the favicon',
        variant: 'destructive'
      });
      return;
    }

    // Validate file size (1MB limit for favicons)
    if (file.size > 1 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload a favicon smaller than 1MB',
        variant: 'destructive'
      });
      return;
    }

    try {
      onUploadingChange?.(true);
      
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `favicon-${Date.now()}.${fileExt}`;
      
      const uploadedUrl = await uploadFile(file, `favicons/${fileName}`);
      
      onFaviconChange('site_favicon', uploadedUrl);
      setPreview(uploadedUrl);
      
      toast({
        title: 'Favicon uploaded successfully',
        description: 'Your website favicon has been updated'
      });
      
    } catch (error) {
      console.error('Error uploading favicon:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload favicon. Please try again.',
        variant: 'destructive'
      });
    } finally {
      onUploadingChange?.(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleUrlChange = (value: string) => {
    onFaviconChange('site_favicon', value);
    setPreview(value);
  };

  const handleRemove = () => {
    onFaviconChange('site_favicon', '');
    setPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center">
          <Image className="mr-2 h-4 w-4" />
          Favicon Management
        </CardTitle>
        <CardDescription className="text-xs">
          Upload a custom favicon for your website. Recommended size: 32x32px or 16x16px
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preview */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
            {preview ? (
              <img
                src={preview}
                alt="Favicon preview"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <Image className="h-6 w-6 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Current Favicon</p>
            <p className="text-xs text-gray-500">
              {preview ? 'Favicon is set' : 'No favicon uploaded'}
            </p>
          </div>
          {preview && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* URL Input */}
        <div className="space-y-2">
          <Label htmlFor="favicon-url" className="text-xs">Favicon URL</Label>
          <Input
            id="favicon-url"
            type="url"
            value={preview}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://example.com/favicon.ico"
            className="text-sm"
          />
          <p className="text-xs text-gray-500">
            Enter a direct URL to your favicon file
          </p>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <Label className="text-xs">Upload Favicon</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".ico,.png,.svg,image/x-icon,image/vnd.microsoft.icon,image/png,image/svg+xml"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full text-xs"
          >
            <UploadIcon className="mr-2 h-3 w-3" />
            {isUploading ? 'Uploading...' : 'Upload Favicon File'}
          </Button>
          <div className="flex items-start space-x-2 text-xs text-gray-500">
            <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <p>
              Supported formats: ICO, PNG, SVG. For best compatibility, use ICO format.
              The favicon will appear in browser tabs and bookmarks.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FaviconUpload;
