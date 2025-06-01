import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Shield,
  Copy,
  ExternalLink
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SocialLinks {
  [key: string]: string;
}

interface EnhancedContactSettingsProps {
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

const EnhancedContactSettings: React.FC<EnhancedContactSettingsProps> = ({
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
    { key: 'linkedin', label: 'LinkedIn', icon: Globe, placeholder: 'https://linkedin.com/company/yourcompany' },
    { key: 'instagram', label: 'Instagram', icon: Globe, placeholder: 'https://instagram.com/youraccount' },
    { key: 'youtube', label: 'YouTube', icon: Globe, placeholder: 'https://youtube.com/yourchannel' },
    { key: 'github', label: 'GitHub', icon: Globe, placeholder: 'https://github.com/youraccount' },
  ];

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'Pacific/Honolulu',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney'
  ];

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'China',
    'India',
    'Brazil'
  ];

  const handleSocialLinkChange = (platform: string, url: string) => {
    const updatedLinks = { ...socialLinks };
    if (url.trim() === '') {
      delete updatedLinks[platform];
    } else {
      updatedLinks[platform] = url;
    }
    onContactChange('social_links', updatedLinks);
  };

  const addCustomSocialLink = () => {
    if (customSocialPlatform && customSocialUrl) {
      handleSocialLinkChange(customSocialPlatform.toLowerCase(), customSocialUrl);
      setCustomSocialPlatform('');
      setCustomSocialUrl('');
      toast({
        title: "Social link added",
        description: `${customSocialPlatform} link has been added successfully.`,
      });
    }
  };

  const removeSocialLink = (platform: string) => {
    const updatedLinks = { ...socialLinks };
    delete updatedLinks[platform];
    onContactChange('social_links', updatedLinks);
    toast({
      title: "Social link removed",
      description: `${platform} link has been removed.`,
    });
  };

  const generateMapEmbedUrl = () => {
    if (mapLatitude && mapLongitude) {
      const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.639!2d${mapLongitude}!3d${mapLatitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(`${mapLatitude},${mapLongitude}`)}!5e0!3m2!1sen!2sus!4v${Date.now()}`;
      onContactChange('map_embed_url', embedUrl);
      toast({
        title: "Map URL generated",
        description: "Google Maps embed URL has been generated from coordinates.",
      });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to clipboard.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Contact Management</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage all contact information, location details, and social media links
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          Enhanced
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                Primary Contact Information
              </CardTitle>
              <CardDescription className="text-xs">
                Essential contact details for your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_email" className="text-sm font-medium">
                    Primary Email
                  </Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => onContactChange('contact_email', e.target.value)}
                    placeholder="hello@yourcompany.com"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_phone" className="text-sm font-medium">
                    Primary Phone
                  </Label>
                  <Input
                    id="contact_phone"
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => onContactChange('contact_phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_phone_secondary" className="text-sm font-medium">
                  Secondary Phone (Optional)
                </Label>
                <Input
                  id="contact_phone_secondary"
                  type="tel"
                  value={contactPhoneSecondary}
                  onChange={(e) => onContactChange('contact_phone_secondary', e.target.value)}
                  placeholder="+1 (555) 123-4568"
                  className="text-sm"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Contact Form Settings
              </CardTitle>
              <CardDescription className="text-xs">
                Customize your contact form appearance and messaging
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_form_title" className="text-sm font-medium">
                    Form Title
                  </Label>
                  <Input
                    id="contact_form_title"
                    value={contactFormTitle}
                    onChange={(e) => onContactChange('contact_form_title', e.target.value)}
                    placeholder="Get In Touch"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_form_subtitle" className="text-sm font-medium">
                    Form Subtitle
                  </Label>
                  <Input
                    id="contact_form_subtitle"
                    value={contactFormSubtitle}
                    onChange={(e) => onContactChange('contact_form_subtitle', e.target.value)}
                    placeholder="We'd love to hear from you"
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="response_time_promise" className="text-sm font-medium">
                    Response Time Promise
                  </Label>
                  <Input
                    id="response_time_promise"
                    value={responseTimePromise}
                    onChange={(e) => onContactChange('response_time_promise', e.target.value)}
                    placeholder="We respond within 24 hours"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_cta_text" className="text-sm font-medium">
                    CTA Button Text
                  </Label>
                  <Input
                    id="contact_cta_text"
                    value={contactCtaText}
                    onChange={(e) => onContactChange('contact_cta_text', e.target.value)}
                    placeholder="Contact Us Today"
                    className="text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="address" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Building className="mr-2 h-4 w-4" />
                Business Address
              </CardTitle>
              <CardDescription className="text-xs">
                Complete address information for your business location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Street Address
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => onContactChange('address', e.target.value)}
                  placeholder="123 Business Street"
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address_line_2" className="text-sm font-medium">
                  Address Line 2 (Optional)
                </Label>
                <Input
                  id="address_line_2"
                  value={addressLine2}
                  onChange={(e) => onContactChange('address_line_2', e.target.value)}
                  placeholder="Suite 100, Floor 2"
                  className="text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => onContactChange('city', e.target.value)}
                    placeholder="San Francisco"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state_province" className="text-sm font-medium">
                    State/Province
                  </Label>
                  <Input
                    id="state_province"
                    value={stateProvince}
                    onChange={(e) => onContactChange('state_province', e.target.value)}
                    placeholder="California"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal_code" className="text-sm font-medium">
                    Postal Code
                  </Label>
                  <Input
                    id="postal_code"
                    value={postalCode}
                    onChange={(e) => onContactChange('postal_code', e.target.value)}
                    placeholder="94105"
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm font-medium">
                    Country
                  </Label>
                  <Select value={country} onValueChange={(value) => onContactChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((countryOption) => (
                        <SelectItem key={countryOption} value={countryOption}>
                          {countryOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-sm font-medium">
                    Timezone
                  </Label>
                  <Select value={timezone} onValueChange={(value) => onContactChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="office_hours_display" className="text-sm font-medium">
                  Office Hours Display Text
                </Label>
                <Input
                  id="office_hours_display"
                  value={officeHoursDisplay}
                  onChange={(e) => onContactChange('office_hours_display', e.target.value)}
                  placeholder="Monday - Friday: 9:00 AM - 5:00 PM PST"
                  className="text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                Emergency Contact Information
              </CardTitle>
              <CardDescription className="text-xs">
                Emergency contact details for urgent situations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_phone" className="text-sm font-medium">
                    Emergency Phone
                  </Label>
                  <Input
                    id="emergency_contact_phone"
                    type="tel"
                    value={emergencyContactPhone}
                    onChange={(e) => onContactChange('emergency_contact_phone', e.target.value)}
                    placeholder="+1 (555) 911-0000"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_email" className="text-sm font-medium">
                    Emergency Email
                  </Label>
                  <Input
                    id="emergency_contact_email"
                    type="email"
                    value={emergencyContactEmail}
                    onChange={(e) => onContactChange('emergency_contact_email', e.target.value)}
                    placeholder="emergency@yourcompany.com"
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Shield className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div className="text-xs text-yellow-800 dark:text-yellow-200">
                    <p className="font-medium">Emergency Contact Guidelines</p>
                    <p className="mt-1">
                      These contacts should be available 24/7 for urgent business matters,
                      system outages, or security incidents. Consider using a dedicated
                      emergency line or on-call service.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Map className="mr-2 h-4 w-4" />
                Map & Location Settings
              </CardTitle>
              <CardDescription className="text-xs">
                Configure map display and location coordinates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="map_latitude" className="text-sm font-medium">
                    Latitude
                  </Label>
                  <Input
                    id="map_latitude"
                    type="number"
                    step="0.000001"
                    value={mapLatitude}
                    onChange={(e) => onContactChange('map_latitude', parseFloat(e.target.value) || 0)}
                    placeholder="37.4419"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="map_longitude" className="text-sm font-medium">
                    Longitude
                  </Label>
                  <Input
                    id="map_longitude"
                    type="number"
                    step="0.000001"
                    value={mapLongitude}
                    onChange={(e) => onContactChange('map_longitude', parseFloat(e.target.value) || 0)}
                    placeholder="-122.1430"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="map_zoom_level" className="text-sm font-medium">
                    Zoom Level
                  </Label>
                  <Input
                    id="map_zoom_level"
                    type="number"
                    min="1"
                    max="20"
                    value={mapZoomLevel}
                    onChange={(e) => onContactChange('map_zoom_level', parseInt(e.target.value) || 15)}
                    placeholder="15"
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateMapEmbedUrl}
                  className="text-xs"
                >
                  <Map className="mr-1 h-3 w-3" />
                  Generate Map URL
                </Button>
                {mapEmbedUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(mapEmbedUrl, 'Map embed URL')}
                    className="text-xs"
                  >
                    <Copy className="mr-1 h-3 w-3" />
                    Copy URL
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="map_embed_url" className="text-sm font-medium">
                  Google Maps Embed URL
                </Label>
                <Textarea
                  id="map_embed_url"
                  value={mapEmbedUrl}
                  onChange={(e) => onContactChange('map_embed_url', e.target.value)}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  className="text-sm min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location_description" className="text-sm font-medium">
                  Location Description
                </Label>
                <Textarea
                  id="location_description"
                  value={locationDescription}
                  onChange={(e) => onContactChange('location_description', e.target.value)}
                  placeholder="Located in the heart of downtown, easily accessible by public transport..."
                  className="text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                Social Media Links
              </CardTitle>
              <CardDescription className="text-xs">
                Manage your social media presence and links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Predefined social platforms */}
              <div className="space-y-3">
                {predefinedSocials.map((social) => (
                  <div key={social.key} className="flex items-center space-x-2">
                    <Label className="text-sm font-medium w-20 flex-shrink-0">
                      {social.label}
                    </Label>
                    <Input
                      value={socialLinks[social.key] || ''}
                      onChange={(e) => handleSocialLinkChange(social.key, e.target.value)}
                      placeholder={social.placeholder}
                      className="text-sm flex-1"
                    />
                    {socialLinks[social.key] && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(socialLinks[social.key], '_blank')}
                        className="text-xs"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Custom social platform */}
              <div className="border-t pt-4">
                <Label className="text-sm font-medium">Add Custom Platform</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    value={customSocialPlatform}
                    onChange={(e) => setCustomSocialPlatform(e.target.value)}
                    placeholder="Platform name"
                    className="text-sm w-32"
                  />
                  <Input
                    value={customSocialUrl}
                    onChange={(e) => setCustomSocialUrl(e.target.value)}
                    placeholder="https://..."
                    className="text-sm flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addCustomSocialLink}
                    disabled={!customSocialPlatform || !customSocialUrl}
                    className="text-xs"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Custom social links */}
              {Object.entries(socialLinks).filter(([key]) =>
                !predefinedSocials.some(social => social.key === key)
              ).length > 0 && (
                  <div className="border-t pt-4">
                    <Label className="text-sm font-medium">Custom Platforms</Label>
                    <div className="space-y-2 mt-2">
                      {Object.entries(socialLinks)
                        .filter(([key]) => !predefinedSocials.some(social => social.key === key))
                        .map(([platform, url]) => (
                          <div key={platform} className="flex items-center space-x-2">
                            <Label className="text-sm font-medium w-20 flex-shrink-0 capitalize">
                              {platform}
                            </Label>
                            <Input
                              value={url}
                              onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                              className="text-sm flex-1"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeSocialLink(platform)}
                              className="text-xs text-red-600 hover:text-red-700"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedContactSettings;
