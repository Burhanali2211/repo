import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Plus,
  X,
  AlertTriangle,
  Clock,
  Map,
  Settings,
  Building,
  User,
  Shield
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SocialLinks {
  [key: string]: string;
}

interface ContactSettingsProps {
  contactEmail?: string;
  contactPhone?: string;
  contactPhoneSecondary?: string;
  emergencyContactPhone?: string;
  emergencyContactEmail?: string;
  address?: string;
  addressLine2?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
  timezone?: string;
  mapLatitude?: number;
  mapLongitude?: number;
  mapZoomLevel?: number;
  mapEmbedUrl?: string;
  locationDescription?: string;
  contactFormTitle?: string;
  contactFormSubtitle?: string;
  responseTimePromise?: string;
  officeHoursDisplay?: string;
  contactCtaText?: string;
  socialLinks?: SocialLinks;
  onContactChange: (field: string, value: string | SocialLinks | number) => void;
}

const ContactSettings: React.FC<ContactSettingsProps> = ({
  contactEmail = '',
  contactPhone = '',
  contactPhoneSecondary = '',
  emergencyContactPhone = '',
  emergencyContactEmail = '',
  address = '',
  addressLine2 = '',
  city = '',
  stateProvince = '',
  postalCode = '',
  country = 'United States',
  timezone = 'America/New_York',
  mapLatitude = 37.4419,
  mapLongitude = -122.1430,
  mapZoomLevel = 15,
  mapEmbedUrl = '',
  locationDescription = '',
  contactFormTitle = 'Get In Touch',
  contactFormSubtitle = 'We\'d love to hear from you',
  responseTimePromise = 'We respond within 24 hours',
  officeHoursDisplay = '',
  contactCtaText = 'Contact Us Today',
  socialLinks = {},
  onContactChange
}) => {
  const [customSocialPlatform, setCustomSocialPlatform] = useState('');
  const [customSocialUrl, setCustomSocialUrl] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  const predefinedSocials = [
    { key: 'facebook', label: 'Facebook', icon: Globe, placeholder: 'https://facebook.com/yourpage' },
    { key: 'twitter', label: 'Twitter', icon: Globe, placeholder: 'https://twitter.com/youraccount' },
    { key: 'instagram', label: 'Instagram', icon: Globe, placeholder: 'https://instagram.com/youraccount' },
    { key: 'linkedin', label: 'LinkedIn', icon: Globe, placeholder: 'https://linkedin.com/company/yourcompany' },
    { key: 'youtube', label: 'YouTube', icon: Globe, placeholder: 'https://youtube.com/channel/yourchannel' }
  ];

  const updateSocialLinks = (key: string, value: string) => {
    const newSocialLinks = { ...socialLinks };
    if (value.trim() === '') {
      delete newSocialLinks[key];
    } else {
      newSocialLinks[key] = value;
    }
    onContactChange('social_links', newSocialLinks);
  };

  const addCustomSocial = () => {
    if (customSocialPlatform.trim() && customSocialUrl.trim()) {
      updateSocialLinks(customSocialPlatform.toLowerCase().replace(/\s+/g, '_'), customSocialUrl);
      setCustomSocialPlatform('');
      setCustomSocialUrl('');
      toast({
        title: 'Social link added',
        description: `${customSocialPlatform} link has been added`
      });
    }
  };

  const removeCustomSocial = (key: string) => {
    updateSocialLinks(key, '');
    toast({
      title: 'Social link removed',
      description: 'Social media link has been removed'
    });
  };

  const resetToDefaults = () => {
    onContactChange('contact_email', 'hello@easyio.tech');
    onContactChange('contact_phone', '+1 (555) 123-4567');
    onContactChange('contact_phone_secondary', '');
    onContactChange('address', '123 Tech Street, Innovation City, IC 12345');
    onContactChange('social_links', {});

    toast({
      title: 'Contact settings reset',
      description: 'All contact settings have been reset to defaults'
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };



  const ContactPreview = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-sm">Contact Information Preview</CardTitle>
        <CardDescription className="text-xs">
          How your contact information will appear to customers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {contactEmail && (
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{contactEmail}</span>
          </div>
        )}
        {contactPhone && (
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{contactPhone}</span>
          </div>
        )}
        {contactPhoneSecondary && (
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{contactPhoneSecondary} (Secondary)</span>
          </div>
        )}
        {address && (
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
            <span className="text-sm">{address}</span>
          </div>
        )}
        {Object.keys(socialLinks).length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500 mb-2">Social Media</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(socialLinks).map(([platform, url]) => {
                const predefined = predefinedSocials.find(s => s.key === platform);
                const Icon = predefined?.icon || Globe;
                return (
                  <a
                    key={platform}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800"
                  >
                    <Icon className="h-3 w-3" />
                    <span className="capitalize">{platform.replace('_', ' ')}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center">
          <Phone className="mr-2 h-5 w-5" />
          Contact Information
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage your business contact details and social media links.
        </p>
      </div>

      {/* Basic Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Primary Contact Details</CardTitle>
          <CardDescription className="text-xs">
            Essential contact information for your business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="contact_email" className="text-sm font-medium flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Primary Email
            </Label>
            <Input
              id="contact_email"
              type="email"
              value={contactEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onContactChange('contact_email', e.target.value)}
              placeholder="hello@easyio.tech"
              className={contactEmail && !validateEmail(contactEmail) ? 'border-red-500' : ''}
            />
            {contactEmail && !validateEmail(contactEmail) && (
              <p className="text-xs text-red-500">Please enter a valid email address</p>
            )}
          </div>

          {/* Primary Phone */}
          <div className="space-y-2">
            <Label htmlFor="contact_phone" className="text-sm font-medium flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              Primary Phone
            </Label>
            <Input
              id="contact_phone"
              type="tel"
              value={contactPhone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onContactChange('contact_phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Secondary Phone */}
          <div className="space-y-2">
            <Label htmlFor="contact_phone_secondary" className="text-sm font-medium flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              Secondary Phone (Optional)
            </Label>
            <Input
              id="contact_phone_secondary"
              type="tel"
              value={contactPhoneSecondary}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onContactChange('contact_phone_secondary', e.target.value)}
              placeholder="+1 (555) 987-6543"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Business Address
            </Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onContactChange('address', e.target.value)}
              placeholder="123 Tech Street, Innovation City, IC 12345"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Social Media Links</CardTitle>
          <CardDescription className="text-xs">
            Connect your social media profiles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Predefined Social Platforms */}
          {predefinedSocials.map(({ key, label, icon: Icon, placeholder }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={`social_${key}`} className="text-sm font-medium flex items-center">
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Label>
              <Input
                id={`social_${key}`}
                type="url"
                value={socialLinks[key] || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSocialLinks(key, e.target.value)}
                placeholder={placeholder}
                className={socialLinks[key] && !validateUrl(socialLinks[key]) ? 'border-red-500' : ''}
              />
              {socialLinks[key] && !validateUrl(socialLinks[key]) && (
                <p className="text-xs text-red-500">Please enter a valid URL</p>
              )}
            </div>
          ))}

          {/* Custom Social Platforms */}
          {Object.entries(socialLinks).map(([key, url]) => {
            if (predefinedSocials.some(s => s.key === key)) return null;
            return (
              <div key={key} className="flex items-end space-x-2">
                <div className="flex-1 space-y-2">
                  <Label className="text-sm font-medium capitalize">
                    {key.replace('_', ' ')}
                  </Label>
                  <Input
                    type="url"
                    value={url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSocialLinks(key, e.target.value)}
                    placeholder="https://example.com/yourprofile"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeCustomSocial(key)}
                  className="mb-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}

          {/* Add Custom Social Platform */}
          <div className="border-t pt-4">
            <Label className="text-sm font-medium mb-2 block">Add Custom Social Platform</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Platform name"
                value={customSocialPlatform}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomSocialPlatform(e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="https://example.com/yourprofile"
                value={customSocialUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomSocialUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCustomSocial}
                disabled={!customSocialPlatform.trim() || !customSocialUrl.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
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

      {/* Contact Preview */}
      <ContactPreview />

      {/* Implementation Note */}
      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            Contact Information Usage
          </h4>
          <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Contact details are automatically available in contact forms</li>
            <li>• Social links can be displayed in headers, footers, and contact pages</li>
            <li>• Email addresses are protected from spam with proper encoding</li>
            <li>• Phone numbers support click-to-call functionality on mobile devices</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSettings;
