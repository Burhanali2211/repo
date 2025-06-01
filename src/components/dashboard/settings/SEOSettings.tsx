import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, BarChart3, Facebook, Tag, Globe, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SEOSettingsProps {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  onSEOChange: (field: string, value: string) => void;
}

const SEOSettings: React.FC<SEOSettingsProps> = ({
  metaTitle = '',
  metaDescription = '',
  metaKeywords = '',
  googleAnalyticsId = '',
  googleTagManagerId = '',
  facebookPixelId = '',
  onSEOChange
}) => {
  const resetToDefaults = () => {
    onSEOChange('meta_title', 'EasyIo.tech - Simplifying Technology');
    onSEOChange('meta_description', 'Founded in 2023, EasyIo.tech simplifies technology to make it more accessible, sustainable, and meaningful. From IoT to Digital transformation, we\'re your creative tech partner.');
    onSEOChange('meta_keywords', 'technology, IoT, digital transformation, sustainable tech, business solutions');
    onSEOChange('google_analytics_id', '');
    onSEOChange('google_tag_manager_id', '');
    onSEOChange('facebook_pixel_id', '');

    toast({
      title: 'SEO settings reset',
      description: 'All SEO settings have been reset to defaults'
    });
  };

  const validateAnalyticsId = (id: string, type: 'ga' | 'gtm' | 'fb') => {
    const patterns = {
      ga: /^G-[A-Z0-9]{10}$/,
      gtm: /^GTM-[A-Z0-9]{7}$/,
      fb: /^\d{15,16}$/
    };

    if (!id) return true; // Empty is valid
    return patterns[type].test(id);
  };

  const getCharacterCount = (text: string, max: number) => {
    const count = text.length;
    const color = count > max ? 'text-red-500' : count > max * 0.9 ? 'text-yellow-500' : 'text-green-500';
    return { count, color, isOver: count > max };
  };

  const SEOPreview = () => {
    const title = metaTitle || 'EasyIo.tech - Simplifying Technology';
    const description = metaDescription || 'Founded in 2023, EasyIo.tech simplifies technology...';

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Search className="mr-2 h-4 w-4" />
            Search Engine Preview
          </CardTitle>
          <CardDescription className="text-xs">
            How your website will appear in search results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-white">
            <div className="text-blue-600 text-lg hover:underline cursor-pointer">
              {title}
            </div>
            <div className="text-green-700 text-sm mt-1">
              https://easyio.tech
            </div>
            <div className="text-gray-600 text-sm mt-2 leading-relaxed">
              {description.length > 160 ? description.substring(0, 160) + '...' : description}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center">
          <Search className="mr-2 h-5 w-5" />
          SEO & Analytics
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Optimize your website for search engines and track performance.
        </p>
      </div>

      {/* Basic SEO */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Tag className="mr-2 h-4 w-4" />
            Meta Tags
          </CardTitle>
          <CardDescription className="text-xs">
            Essential information for search engines and social media
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Meta Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="meta_title" className="text-sm font-medium">
                Meta Title
              </Label>
              <span className={`text-xs ${getCharacterCount(metaTitle, 60).color}`}>
                {getCharacterCount(metaTitle, 60).count}/60
              </span>
            </div>
            <Input
              id="meta_title"
              value={metaTitle}
              onChange={(e) => onSEOChange('meta_title', e.target.value)}
              placeholder="EasyIo.tech - Simplifying Technology"
              className={getCharacterCount(metaTitle, 60).isOver ? 'border-red-500' : ''}
            />
            <p className="text-xs text-gray-500">
              Appears as the clickable headline in search results (recommended: 50-60 characters)
            </p>
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="meta_description" className="text-sm font-medium">
                Meta Description
              </Label>
              <span className={`text-xs ${getCharacterCount(metaDescription, 160).color}`}>
                {getCharacterCount(metaDescription, 160).count}/160
              </span>
            </div>
            <Textarea
              id="meta_description"
              value={metaDescription}
              onChange={(e) => onSEOChange('meta_description', e.target.value)}
              placeholder="Founded in 2023, EasyIo.tech simplifies technology to make it more accessible, sustainable, and meaningful."
              rows={3}
              className={getCharacterCount(metaDescription, 160).isOver ? 'border-red-500' : ''}
            />
            <p className="text-xs text-gray-500">
              Brief summary shown in search results (recommended: 150-160 characters)
            </p>
          </div>

          {/* Meta Keywords */}
          <div className="space-y-2">
            <Label htmlFor="meta_keywords" className="text-sm font-medium">
              Meta Keywords
            </Label>
            <Input
              id="meta_keywords"
              value={metaKeywords}
              onChange={(e) => onSEOChange('meta_keywords', e.target.value)}
              placeholder="technology, IoT, digital transformation, sustainable tech"
            />
            <p className="text-xs text-gray-500">
              Comma-separated keywords relevant to your website (optional for modern SEO)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Analytics & Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics & Tracking
          </CardTitle>
          <CardDescription className="text-xs">
            Track website performance and user behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Analytics */}
          <div className="space-y-2">
            <Label htmlFor="google_analytics_id" className="text-sm font-medium">
              Google Analytics 4 ID
            </Label>
            <Input
              id="google_analytics_id"
              value={googleAnalyticsId}
              onChange={(e) => onSEOChange('google_analytics_id', e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className={googleAnalyticsId && !validateAnalyticsId(googleAnalyticsId, 'ga') ? 'border-red-500' : ''}
            />
            <p className="text-xs text-gray-500">
              Format: G-XXXXXXXXXX (automatically tracks page views and user interactions)
            </p>
          </div>

          {/* Google Tag Manager */}
          <div className="space-y-2">
            <Label htmlFor="google_tag_manager_id" className="text-sm font-medium">
              Google Tag Manager ID
            </Label>
            <Input
              id="google_tag_manager_id"
              value={googleTagManagerId}
              onChange={(e) => onSEOChange('google_tag_manager_id', e.target.value)}
              placeholder="GTM-XXXXXXX"
              className={googleTagManagerId && !validateAnalyticsId(googleTagManagerId, 'gtm') ? 'border-red-500' : ''}
            />
            <p className="text-xs text-gray-500">
              Format: GTM-XXXXXXX (for advanced tracking and conversion setup)
            </p>
          </div>

          {/* Facebook Pixel */}
          <div className="space-y-2">
            <Label htmlFor="facebook_pixel_id" className="text-sm font-medium flex items-center">
              <Facebook className="mr-2 h-4 w-4" />
              Facebook Pixel ID
            </Label>
            <Input
              id="facebook_pixel_id"
              value={facebookPixelId}
              onChange={(e) => onSEOChange('facebook_pixel_id', e.target.value)}
              placeholder="123456789012345"
              className={facebookPixelId && !validateAnalyticsId(facebookPixelId, 'fb') ? 'border-red-500' : ''}
            />
            <p className="text-xs text-gray-500">
              15-16 digit numeric ID (for conversion tracking and retargeting)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={resetToDefaults}
          className="text-sm"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </Button>
      </div>

      {/* SEO Preview */}
      <SEOPreview />

      {/* Implementation Notes */}
      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            SEO & Analytics Implementation
          </h4>
          <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Meta tags are automatically injected into page headers</li>
            <li>• Analytics codes are loaded asynchronously for performance</li>
            <li>• Open Graph tags are generated from meta information</li>
            <li>• All tracking respects user privacy preferences</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOSettings;
