import * as React from 'react';
const { useState, useEffect } = React;
import { useSettings, type SiteSettingsUpdate } from '../../hooks/useSettings';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { toast } from '@/hooks/use-toast';
import { Settings, Upload as UploadIcon, X, Image as ImageIcon } from 'lucide-react';
import { uploadFile } from '@/lib/supabase/services/storage';

const SettingsManager = () => {
  const { settings, loading, error, updateSettings, resetSettings, fetchSettings } = useSettings();
  const [formData, setFormData] = useState<SiteSettingsUpdate | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadType, setUploadType] = useState<'logo' | 'favicon' | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  const logoInputRef = React.useRef<HTMLInputElement>(null);
  const faviconInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (settings) {
      console.log('Settings loaded:', settings);
      // Ensure we have a clean copy of the settings
      const cleanedSettings = { ...settings };

      // Set default social links object if not present
      if (!cleanedSettings.social_links) {
        cleanedSettings.social_links = {};
      }

      setFormData(cleanedSettings);

      // Set logo preview if available
      if (settings.site_logo) {
        setLogoPreview(settings.site_logo);
      }

      // Set favicon preview if available
      if (settings.site_favicon) {
        setFaviconPreview(settings.site_favicon);
      }
    } else {
      console.log('No settings available yet');
    }
  }, [settings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => prev ? { ...prev, [name]: checked } : null);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSocialLinksChange = (platform: string, value: string) => {
    if (!formData) return;

    // Ensure we have a proper object to work with
    const currentLinks = formData.social_links ?
      (typeof formData.social_links === 'object' ?
        formData.social_links as Record<string, string> :
        {}) :
      {};

    // Create a new object with the updated value
    const updatedLinks = { ...currentLinks, [platform]: value };

    console.log(`Updating social links for ${platform}:`, updatedLinks);

    setFormData(prev => prev ? {
      ...prev,
      social_links: updatedLinks
    } : null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (!uploadType) return;

    const file = e.target.files[0];

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp', 'image/gif', 'image/x-icon', 'image/vnd.microsoft.icon'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a valid image file (JPEG, PNG, SVG, WebP, GIF, or ICO).",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);

      // Create a temporary preview
      const objectUrl = URL.createObjectURL(file);

      if (uploadType === 'logo') {
        setLogoPreview(objectUrl);
      } else {
        setFaviconPreview(objectUrl);
      }

      // Upload to Supabase storage with a folder based on type
      const folderName = uploadType === 'logo' ? 'logos' : 'favicons';
      const uploadPath = await uploadFile(file, folderName);

      // Update form data with the new URL
      if (uploadType === 'logo') {
        setFormData(prev => prev ? { ...prev, site_logo: uploadPath } : null);
        toast({
          title: "Logo Uploaded",
          description: "Logo has been uploaded successfully. Don't forget to save your changes."
        });
      } else {
        setFormData(prev => prev ? { ...prev, site_favicon: uploadPath } : null);
        toast({
          title: "Favicon Uploaded",
          description: "Favicon has been uploaded successfully. Don't forget to save your changes."
        });
      }

    } catch (err) {
      toast({
        title: "Upload Failed",
        description: `Failed to upload ${uploadType}. Please try again.`,
        variant: "destructive"
      });
      console.error(`${uploadType} upload error:`, err);

      // Revert to the original image if upload fails
      if (uploadType === 'logo') {
        setLogoPreview(formData?.site_logo || null);
      } else {
        setFaviconPreview(formData?.site_favicon || null);
      }
    } finally {
      setIsUploading(false);
      setUploadType(null);

      // Reset the file input
      if (logoInputRef.current) {
        logoInputRef.current.value = '';
      }
      if (faviconInputRef.current) {
        faviconInputRef.current.value = '';
      }
    }
  };

  const handleLogoUpload = () => {
    setUploadType('logo');
    logoInputRef.current?.click();
  };

  const handleFaviconUpload = () => {
    setUploadType('favicon');
    faviconInputRef.current?.click();
  };

  const handleRemoveLogo = () => {
    // Update form data to remove the logo
    setFormData(prev => prev ? { ...prev, site_logo: null } : null);
    setLogoPreview(null);

    toast({
      title: "Logo Removed",
      description: "Logo has been removed. Don't forget to save your changes."
    });
  };

  const handleRemoveFavicon = () => {
    // Update form data to remove the favicon
    setFormData(prev => prev ? { ...prev, site_favicon: null } : null);
    setFaviconPreview(null);

    toast({
      title: "Favicon Removed",
      description: "Favicon has been removed. Don't forget to save your changes."
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      setIsSaving(true);
      console.log('Submitting settings update:', formData);

      // Create a clean copy of the data to submit
      const dataToSubmit = {
        ...formData,
        // Ensure social_links is properly formatted
        social_links: formData.social_links || {}
      };

      const result = await updateSettings(dataToSubmit);

      if (result.success) {
        toast({
          title: "Success",
          description: "Settings updated successfully"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update settings",
          variant: "destructive"
        });
        console.error(result.error);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occurred while saving settings",
        variant: "destructive"
      });
      console.error(err);
    } finally {
      setIsSaving(false);
      // Refresh the settings to ensure we have the latest data
      fetchSettings();
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      try {
        setIsResetting(true);
        const result = await resetSettings();

        if (result.success) {
          toast({
            title: "Success",
            description: "Settings reset to defaults"
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to reset settings",
            variant: "destructive"
          });
          console.error(result.error);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "An error occurred while resetting settings",
          variant: "destructive"
        });
        console.error(err);
      } finally {
        setIsResetting(false);
      }
    }
  };

  if (loading && !formData) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin mr-2">
          <Settings size={20} />
        </div>
        <p>Loading settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <div className="flex items-center">
          <Settings className="mr-2" size={20} />
          <span className="block sm:inline">Error loading settings: {error.message}</span>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <div className="flex items-center">
          <Settings className="mr-2" size={20} />
          <span className="block sm:inline">No settings found. Please try refreshing the page.</span>
        </div>
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

              <TabsContent value="general" className="space-y-4">
                <div className="grid gap-4">
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
                    <Label htmlFor="site_logo">Logo URL</Label>
                    <Input
                      id="site_logo"
                      name="site_logo"
                      value={formData.site_logo || ''}
                      onChange={handleInputChange}
                      placeholder="/logo.svg"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Path to your logo file (recommended size: 200x50px)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="site_favicon">Favicon URL</Label>
                    <Input
                      id="site_favicon"
                      name="site_favicon"
                      value={formData.site_favicon || ''}
                      onChange={handleInputChange}
                      placeholder="/favicon.ico"
                    />
                  </div>

                  <div>
                    <Label htmlFor="meta_title">Meta Title</Label>
                    <Input
                      id="meta_title"
                      name="meta_title"
                      value={formData.meta_title || ''}
                      onChange={handleInputChange}
                      placeholder="Meta title for SEO"
                    />
                  </div>

                  <div>
                    <Label htmlFor="meta_description">Meta Description</Label>
                    <Textarea
                      id="meta_description"
                      name="meta_description"
                      value={formData.meta_description || ''}
                      onChange={handleInputChange}
                      placeholder="Brief description for search engines"
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
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-4">
                <div className="grid gap-4">
                  {/* File Upload Inputs */}
                  <input
                    ref={logoInputRef}
                    type="file"
                    id="logo_upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                    aria-label="Upload logo"
                  />
                  <input
                    ref={faviconInputRef}
                    type="file"
                    id="favicon_upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                    aria-label="Upload favicon"
                  />

                  {/* Logo Upload Section */}
                  <div className="mb-6">
                    <Label htmlFor="site_logo" className="block mb-2">Site Logo</Label>
                    <div className="flex flex-col space-y-4">
                      {/* Logo Preview */}
                      {logoPreview ? (
                        <div className="relative w-64 h-24 border rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
                          <img
                            src={logoPreview}
                            alt="Site Logo"
                            className="max-w-full max-h-full object-contain"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveLogo}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            aria-label="Remove logo"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-64 h-24 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50">
                          <div className="text-center">
                            <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No logo uploaded</p>
                          </div>
                        </div>
                      )}

                      {/* Upload Button */}
                      <div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleLogoUpload}
                          disabled={isUploading}
                          className="mr-2"
                        >
                          {isUploading && uploadType === 'logo' ? (
                            <>
                              <UploadIcon className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <UploadIcon className="mr-2 h-4 w-4" />
                              Upload Logo
                            </>
                          )}
                        </Button>
                        <p className="text-sm text-gray-500 mt-1">
                          Recommended size: 200x80px. Formats: PNG, JPG, SVG, WebP.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Favicon Upload Section */}
                  <div className="mb-6">
                    <Label htmlFor="site_favicon" className="block mb-2">Favicon</Label>
                    <div className="flex flex-col space-y-4">
                      {/* Favicon Preview */}
                      {faviconPreview ? (
                        <div className="relative w-16 h-16 border rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
                          <img
                            src={faviconPreview}
                            alt="Favicon"
                            className="w-full h-full object-contain"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveFavicon}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                            aria-label="Remove favicon"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-16 h-16 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50">
                          <div className="text-center">
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                      )}

                      {/* Upload Button */}
                      <div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleFaviconUpload}
                          disabled={isUploading}
                          className="mr-2"
                        >
                          {isUploading && uploadType === 'favicon' ? (
                            <>
                              <UploadIcon className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <UploadIcon className="mr-2 h-4 w-4" />
                              Upload Favicon
                            </>
                          )}
                        </Button>
                        <p className="text-sm text-gray-500 mt-1">
                          Recommended size: 32x32px or 16x16px. Formats: ICO, PNG, SVG.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primary_color">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="primary_color"
                          name="primary_color"
                          type="color"
                          className="w-12 h-10 p-1"
                          value={formData.primary_color || '#2563EB'}
                          onChange={handleColorChange}
                        />
                        <Input
                          name="primary_color"
                          value={formData.primary_color || '#2563EB'}
                          onChange={handleInputChange}
                          placeholder="#2563EB"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondary_color">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="secondary_color"
                          name="secondary_color"
                          type="color"
                          className="w-12 h-10 p-1"
                          value={formData.secondary_color || '#4F46E5'}
                          onChange={handleColorChange}
                        />
                        <Input
                          name="secondary_color"
                          value={formData.secondary_color || '#4F46E5'}
                          onChange={handleInputChange}
                          placeholder="#4F46E5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <Input
                      id="contact_email"
                      name="contact_email"
                      value={formData.contact_email || ''}
                      onChange={handleInputChange}
                      placeholder="contact@example.com"
                      type="email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact_phone">Contact Phone</Label>
                    <Input
                      id="contact_phone"
                      name="contact_phone"
                      value={formData.contact_phone || ''}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Social Media Links</Label>

                    {['facebook', 'twitter', 'linkedin', 'instagram', 'github'].map(platform => {
                      const socialLinks = formData.social_links as Record<string, string> || {};
                      return (
                        <div key={platform} className="flex items-center gap-2">
                          <span className="w-24 capitalize">{platform}:</span>
                          <Input
                            value={socialLinks[platform] || ''}
                            onChange={(e) => handleSocialLinksChange(platform, e.target.value)}
                            placeholder={`https://${platform}.com/yourusername`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="header_scripts">Header Scripts</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, header_scripts: '' }));
                          toast.success('Header scripts cleared');
                        }}
                        className="text-xs"
                      >
                        Clear
                      </Button>
                    </div>
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
                      JavaScript code only (no HTML tags). Will be inserted in the &lt;head&gt; tag.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="footer_scripts">Footer Scripts</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, footer_scripts: '' }));
                          toast.success('Footer scripts cleared');
                        }}
                        className="text-xs"
                      >
                        Clear
                      </Button>
                    </div>
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
                      JavaScript code only (no HTML tags). Will be inserted before the closing &lt;/body&gt; tag.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="is_maintenance_mode"
                      checked={!!formData.is_maintenance_mode}
                      onCheckedChange={(checked) => handleSwitchChange('is_maintenance_mode', checked)}
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
                </div>
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
                disabled={isSaving || isResetting}
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
