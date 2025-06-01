import React, { useState, useEffect } from 'react';
import { useSettings, type SiteSettingsUpdate } from '../../hooks/useSettings';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { toast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';

// Import new settings components
import DualLogoUpload from './settings/DualLogoUpload';
import FaviconUpload from './settings/FaviconUpload';
import ThemeColorPicker from './settings/ThemeColorPicker';
import TypographySettings from './settings/TypographySettings';
import BusinessHours from './settings/BusinessHours';
import SEOSettings from './settings/SEOSettings';
import EnhancedContactSettings from './settings/EnhancedContactSettings';

const SettingsManager = () => {
  const { settings, loading, error, updateSettings, resetSettings, fetchSettings } = useSettings();
  const [formData, setFormData] = useState<SiteSettingsUpdate | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (settings) {
      console.log('Settings loaded:', settings);
      // Ensure we have a clean copy of the settings
      const cleanedSettings = { ...settings };

      // Set default social links object if not present
      if (!cleanedSettings.social_links) {
        cleanedSettings.social_links = {};
      }

      // Set default business hours if not present
      if (!cleanedSettings.business_hours) {
        cleanedSettings.business_hours = {
          monday: { open: '09:00', close: '17:00', closed: false },
          tuesday: { open: '09:00', close: '17:00', closed: false },
          wednesday: { open: '09:00', close: '17:00', closed: false },
          thursday: { open: '09:00', close: '17:00', closed: false },
          friday: { open: '09:00', close: '17:00', closed: false },
          saturday: { open: '10:00', close: '14:00', closed: false },
          sunday: { open: '10:00', close: '14:00', closed: true }
        };
      }

      setFormData(cleanedSettings);
    } else {
      console.log('No settings available yet');
    }
  }, [settings]);

  // Generic handler for updating any field
  const handleFieldChange = (field: string, value: unknown) => {
    setFormData((prev: SiteSettingsUpdate | null) => prev ? { ...prev, [field]: value } : null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleFieldChange(name, value);
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    handleFieldChange(name, checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSaving(true);
    try {
      const result = await updateSettings(formData);
      if (result.success) {
        toast({
          title: "Settings Updated",
          description: "Website settings have been saved successfully."
        });
        // Refresh settings to get the latest data
        await fetchSettings();
      } else {
        throw result.error || new Error('Failed to update settings');
      }
    } catch (err) {
      console.error('Error updating settings:', err);
      toast({
        title: "Update Failed",
        description: err instanceof Error ? err.message : "Failed to update settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      const result = await resetSettings();
      if (result.success) {
        toast({
          title: "Settings Reset",
          description: "All settings have been reset to default values."
        });
        // Refresh settings to get the latest data
        await fetchSettings();
      } else {
        throw result.error || new Error('Failed to reset settings');
      }
    } catch (err) {
      console.error('Error resetting settings:', err);
      toast({
        title: "Reset Failed",
        description: err instanceof Error ? err.message : "Failed to reset settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsResetting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <Card className="w-full">
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <Settings className="mr-2 h-5 w-5 animate-spin" />
              <span>Loading settings...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Card className="w-full">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Settings</h3>
              <p className="text-gray-600 mb-4">{error.message}</p>
              <Button onClick={() => fetchSettings()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="container mx-auto py-6">
        <Card className="w-full">
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2 text-gray-500">
              <Settings className="mr-2" size={20} />
              <span className="block sm:inline">No settings found. Please try refreshing the page.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center">
            <Settings className="mr-2" size={20} />
            <CardTitle>Website Settings</CardTitle>
          </div>
          <CardDescription>
            Manage website information, appearance, and functionality.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <CardContent>
              <TabsList className="mb-6">
                <TabsTrigger value="general">
                  <Settings className="mr-2" size={16} />
                  General
                </TabsTrigger>
                <TabsTrigger value="appearance">
                  <Settings className="mr-2" size={16} />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="contact">
                  <Settings className="mr-2" size={16} />
                  Contact
                </TabsTrigger>
                <TabsTrigger value="advanced">
                  <Settings className="mr-2" size={16} />
                  Advanced
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <div className="grid gap-6">
                  {/* Basic Site Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Basic Information</CardTitle>
                      <CardDescription className="text-xs">
                        Essential website information and branding
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="site_name">Website Name</Label>
                        <Input
                          id="site_name"
                          name="site_name"
                          value={formData.site_name || ''}
                          onChange={handleInputChange}
                          placeholder="Enter website name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="site_tagline">Tagline</Label>
                        <Input
                          id="site_tagline"
                          name="site_tagline"
                          value={formData.site_tagline || ''}
                          onChange={handleInputChange}
                          placeholder="Simplifying Technology"
                        />
                      </div>

                      <div>
                        <Label htmlFor="site_description">Description</Label>
                        <Textarea
                          id="site_description"
                          name="site_description"
                          value={formData.site_description || ''}
                          onChange={handleInputChange}
                          placeholder="Brief description of your website"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="footer_text">Footer Text</Label>
                        <Input
                          id="footer_text"
                          name="footer_text"
                          value={formData.footer_text || ''}
                          onChange={handleInputChange}
                          placeholder="© 2024 Your Company"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Dual Logo Upload */}
                  <DualLogoUpload
                    siteLogo={formData.site_logo || ''}
                    siteLogoLight={formData.site_logo_light || ''}
                    siteLogoDark={formData.site_logo_dark || ''}
                    onLogoChange={handleFieldChange}
                    isUploading={isUploading}
                    onUploadingChange={setIsUploading}
                  />

                  {/* Favicon Upload */}
                  <FaviconUpload
                    siteFavicon={formData.site_favicon || ''}
                    onFaviconChange={handleFieldChange}
                    isUploading={isUploading}
                    onUploadingChange={setIsUploading}
                  />
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                {/* Theme Color Picker */}
                <ThemeColorPicker
                  primaryColor={formData.primary_color}
                  secondaryColor={formData.secondary_color}
                  accentColor={formData.accent_color}
                  backgroundColor={formData.background_color}
                  backgroundColorDark={formData.background_color_dark}
                  textColor={formData.text_color}
                  textColorDark={formData.text_color_dark}
                  borderColor={formData.border_color}
                  borderColorDark={formData.border_color_dark}
                  onColorChange={handleFieldChange}
                />

                {/* Typography Settings */}
                <TypographySettings
                  fontFamily={formData.font_family}
                  fontSize={formData.font_size}
                  lineHeight={formData.line_height}
                  fontWeight={formData.font_weight}
                  onTypographyChange={handleFieldChange}
                />
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                {/* Enhanced Contact Settings */}
                <EnhancedContactSettings
                  contactEmail={formData.contact_email}
                  contactPhone={formData.contact_phone}
                  contactPhoneSecondary={formData.contact_phone_secondary}
                  emergencyContactPhone={formData.emergency_contact_phone}
                  emergencyContactEmail={formData.emergency_contact_email}
                  address={formData.address}
                  addressLine2={formData.address_line_2}
                  city={formData.city}
                  stateProvince={formData.state_province}
                  postalCode={formData.postal_code}
                  country={formData.country}
                  timezone={formData.timezone}
                  mapLatitude={formData.map_latitude}
                  mapLongitude={formData.map_longitude}
                  mapZoomLevel={formData.map_zoom_level}
                  mapEmbedUrl={formData.map_embed_url}
                  locationDescription={formData.location_description}
                  contactFormTitle={formData.contact_form_title}
                  contactFormSubtitle={formData.contact_form_subtitle}
                  responseTimePromise={formData.response_time_promise}
                  officeHoursDisplay={formData.office_hours_display}
                  contactCtaText={formData.contact_cta_text}
                  socialLinks={formData.social_links as Record<string, string>}
                  onContactChange={handleFieldChange}
                />

                {/* Business Hours */}
                <BusinessHours
                  businessHours={formData.business_hours}
                  onBusinessHoursChange={(hours: unknown) => handleFieldChange('business_hours', hours)}
                />
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                {/* SEO Settings */}
                <SEOSettings
                  metaTitle={formData.meta_title}
                  metaDescription={formData.meta_description}
                  metaKeywords={formData.meta_keywords}
                  googleAnalyticsId={formData.google_analytics_id}
                  googleTagManagerId={formData.google_tag_manager_id}
                  facebookPixelId={formData.facebook_pixel_id}
                  onSEOChange={handleFieldChange}
                />

                {/* Custom Code & Maintenance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Custom Code & System</CardTitle>
                    <CardDescription className="text-xs">
                      Custom styling, scripts, and system settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="custom_css">Custom CSS</Label>
                      <Textarea
                        id="custom_css"
                        name="custom_css"
                        value={formData.custom_css || ''}
                        onChange={handleInputChange}
                        placeholder="/* Custom CSS styles */"
                        rows={4}
                        className="font-mono text-sm"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Custom CSS that will be applied site-wide
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="header_scripts">Header Scripts</Label>
                      <Textarea
                        id="header_scripts"
                        name="header_scripts"
                        value={formData.header_scripts || ''}
                        onChange={handleInputChange}
                        placeholder="console.log('Header script example');"
                        rows={4}
                        className="font-mono text-sm"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        JavaScript code inserted in the &lt;head&gt; tag
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="footer_scripts">Footer Scripts</Label>
                      <Textarea
                        id="footer_scripts"
                        name="footer_scripts"
                        value={formData.footer_scripts || ''}
                        onChange={handleInputChange}
                        placeholder="console.log('Footer script example');"
                        rows={4}
                        className="font-mono text-sm"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        JavaScript code inserted before the closing &lt;/body&gt; tag
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        id="is_maintenance_mode"
                        checked={!!formData.is_maintenance_mode}
                        onCheckedChange={(checked: boolean) => handleSwitchChange('is_maintenance_mode', checked)}
                      />
                      <Label htmlFor="is_maintenance_mode">Maintenance Mode</Label>
                    </div>

                    {formData.is_maintenance_mode && (
                      <div>
                        <Label htmlFor="maintenance_message">Maintenance Message</Label>
                        <Textarea
                          id="maintenance_message"
                          name="maintenance_message"
                          value={formData.maintenance_message || ''}
                          onChange={handleInputChange}
                          placeholder="We're currently performing maintenance. Please check back soon."
                          rows={3}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isResetting || isSaving}
              >
                {isResetting ? (
                  <>
                    <Settings className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    <Settings className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </>
                )}
              </Button>

              <Button
                type="submit"
                disabled={isSaving || isResetting || isUploading}
              >
                {isSaving ? (
                  <>
                    <Settings className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Settings className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Tabs>
        </form>
      </Card>
    </div>
  );
};

export default SettingsManager;
