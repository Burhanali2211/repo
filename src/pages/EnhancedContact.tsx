import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Star,
  Building,
  User,
  Calendar,
  TrendingUp,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useWebsiteSettings } from '@/contexts/SettingsContext';
import { getAllContactFormFields, type ContactFormField } from '@/lib/supabase/contactFormServices';
import { getFeaturedSuccessStories, type SuccessStory } from '@/lib/supabase/successStoriesServices';
import { createContactMessage } from '@/lib/supabase/contactServices';
import AnimatedSection from '@/components/AnimatedSection';

const EnhancedContact = () => {
  const { settings } = useWebsiteSettings();
  const [formFields, setFormFields] = useState<ContactFormField[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFormFields();
    loadSuccessStories();
  }, []);

  const loadFormFields = async () => {
    try {
      const fields = await getAllContactFormFields();
      setFormFields(fields);
      
      // Initialize form data with empty values
      const initialData: { [key: string]: string } = {};
      fields.forEach(field => {
        initialData[field.field_name] = '';
      });
      setFormData(initialData);
    } catch (error) {
      console.error('Error loading form fields:', error);
      toast({
        title: "Error loading form",
        description: "Failed to load contact form fields.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadSuccessStories = async () => {
    try {
      const stories = await getFeaturedSuccessStories(3);
      setSuccessStories(stories);
    } catch (error) {
      console.error('Error loading success stories:', error);
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = formFields.filter(field => field.is_required);
    const missingFields = requiredFields.filter(field => !formData[field.field_name]?.trim());
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: `Please fill in: ${missingFields.map(f => f.field_label).join(', ')}`,
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Create contact message with dynamic form data
      const messageData = {
        name: formData.name || formData.full_name || 'Unknown',
        email: formData.email || '',
        company: formData.company || '',
        message: formData.message || JSON.stringify(formData),
        source: 'enhanced_contact_form'
      };
      
      const success = await createContactMessage(messageData);
      
      if (success) {
        setIsSubmitted(true);
        toast({
          title: "Message sent successfully!",
          description: settings?.response_time_promise || "We'll get back to you soon.",
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormField = (field: ContactFormField) => {
    const commonProps = {
      id: field.field_name,
      value: formData[field.field_name] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        handleInputChange(field.field_name, e.target.value),
      placeholder: field.field_placeholder || '',
      required: field.is_required,
      className: "w-full"
    };

    switch (field.field_type) {
      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            rows={4}
          />
        );
      case 'select':
        return (
          <select
            {...commonProps}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an option</option>
            {field.field_options?.options?.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <Input
            {...commonProps}
            type={field.field_type}
          />
        );
    }
  };

  const contactInfo = [
    ...(settings?.contact_email ? [{
      icon: Mail,
      label: 'Email',
      value: settings.contact_email,
      href: `mailto:${settings.contact_email}`
    }] : []),
    ...(settings?.contact_phone ? [{
      icon: Phone,
      label: 'Phone',
      value: settings.contact_phone,
      href: `tel:${settings.contact_phone.replace(/\D/g, '')}`
    }] : []),
    ...(settings?.address ? [{
      icon: MapPin,
      label: 'Address',
      value: [
        settings.address,
        settings.address_line_2,
        settings.city,
        settings.state_province,
        settings.postal_code
      ].filter(Boolean).join(', '),
      href: settings.map_embed_url || '#'
    }] : []),
    ...(settings?.office_hours_display ? [{
      icon: Clock,
      label: 'Office Hours',
      value: settings.office_hours_display,
      href: '#'
    }] : [])
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading contact form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
              {settings?.contact_form_title || 'Get In Touch'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              {settings?.contact_form_subtitle || 'We\'d love to hear from you'}
            </p>
            {settings?.response_time_promise && (
              <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm">
                <CheckCircle className="mr-2 h-4 w-4" />
                {settings.response_time_promise}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Send us a message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          Message sent successfully!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          {settings?.response_time_promise || "We'll get back to you soon."}
                        </p>
                        <Button onClick={() => {
                          setIsSubmitted(false);
                          setFormData({});
                          loadFormFields();
                        }}>
                          Send another message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {formFields.map((field) => (
                          <div key={field.id} className="space-y-2">
                            <Label htmlFor={field.field_name} className="text-sm font-medium">
                              {field.field_label}
                              {field.is_required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                            {renderFormField(field)}
                            {field.help_text && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {field.help_text}
                              </p>
                            )}
                          </div>
                        ))}
                        
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              {settings?.contact_cta_text || 'Send Message'}
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <AnimatedSection>
                <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <a
                        key={index}
                        href={info.href}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <info.icon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {info.label}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Emergency Contact */}
              {(settings?.emergency_contact_phone || settings?.emergency_contact_email) && (
                <AnimatedSection>
                  <Card className="shadow-xl border-0 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm border-red-200 dark:border-red-800">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-red-800 dark:text-red-200 flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5" />
                        Emergency Contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {settings.emergency_contact_phone && (
                        <a
                          href={`tel:${settings.emergency_contact_phone.replace(/\D/g, '')}`}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <Phone className="h-4 w-4 text-red-600 dark:text-red-400" />
                          <span className="text-sm text-red-800 dark:text-red-200">
                            {settings.emergency_contact_phone}
                          </span>
                        </a>
                      )}
                      {settings.emergency_contact_email && (
                        <a
                          href={`mailto:${settings.emergency_contact_email}`}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <Mail className="h-4 w-4 text-red-600 dark:text-red-400" />
                          <span className="text-sm text-red-800 dark:text-red-200">
                            {settings.emergency_contact_email}
                          </span>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {settings?.map_embed_url && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Find Us
                  </CardTitle>
                  {settings.location_description && (
                    <CardDescription>
                      {settings.location_description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video">
                    <iframe
                      src={settings.map_embed_url}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Office Location"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Success Stories Section */}
      {successStories.length > 0 && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
                Success Stories
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                See how we've helped our clients achieve their goals
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.map((story) => (
                <AnimatedSection key={story.id}>
                  <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {story.category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-xs ml-1">Featured</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {story.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <User className="mr-1 h-4 w-4" />
                        <span>{story.client_name}</span>
                        {story.client_role && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{story.client_role}</span>
                          </>
                        )}
                      </div>
                      {story.client_company && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Building className="mr-1 h-4 w-4" />
                          <span>{story.client_company}</span>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {story.story_content}
                      </p>
                      
                      {story.results_achieved && (
                        <div className="mb-4">
                          <div className="flex items-center text-green-600 dark:text-green-400 mb-2">
                            <TrendingUp className="mr-1 h-4 w-4" />
                            <span className="text-sm font-medium">Results</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {story.results_achieved}
                          </p>
                        </div>
                      )}
                      
                      {story.project_duration && (
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>Duration: {story.project_duration}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EnhancedContact;
