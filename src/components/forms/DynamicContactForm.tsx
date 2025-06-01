import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useWebsiteSettings } from '@/contexts/SettingsContext';
import { getAllContactFormFields, type ContactFormField } from '@/lib/supabase/contactFormServices';
import { createContactMessage } from '@/lib/supabase/contactServices';

interface DynamicContactFormProps {
  className?: string;
  onSuccess?: () => void;
  showTitle?: boolean;
}

const DynamicContactForm: React.FC<DynamicContactFormProps> = ({
  className = '',
  onSuccess,
  showTitle = true
}) => {
  const { settings } = useWebsiteSettings();
  const [formFields, setFormFields] = useState<ContactFormField[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string | string[] }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    loadFormFields();
  }, []);

  const loadFormFields = async () => {
    try {
      setLoading(true);
      const fields = await getAllContactFormFields();
      setFormFields(fields);

      // Initialize form data with empty values
      const initialData: { [key: string]: string | string[] } = {};
      fields.forEach(field => {
        if (field.field_type === 'checkbox') {
          initialData[field.field_name] = [];
        } else {
          initialData[field.field_name] = '';
        }
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

  const handleInputChange = (fieldName: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const requiredFields = formFields.filter(field => field.is_required);

    requiredFields.forEach(field => {
      const value = formData[field.field_name];

      if (!value || (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'string' && !value.trim())) {
        newErrors[field.field_name] = `${field.field_label} is required`;
      }

      // Email validation
      if (field.field_type === 'email' && value && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.field_name] = 'Please enter a valid email address';
        }
      }

      // Phone validation
      if (field.field_type === 'tel' && value && typeof value === 'string') {
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
          newErrors[field.field_name] = 'Please enter a valid phone number';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Some fields need your attention.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create contact message with dynamic form data
      const messageData = {
        name: (formData.name || formData.full_name || formData.first_name || 'Unknown') as string,
        email: formData.email as string || '',
        company: formData.company as string || '',
        message: formData.message as string || JSON.stringify(formData),
        source: 'dynamic_contact_form'
      };

      const success = await createContactMessage(messageData);

      if (success) {
        setIsSubmitted(true);
        toast({
          title: "Message sent successfully!",
          description: settings?.response_time_promise || "We'll get back to you soon.",
        });

        if (onSuccess) {
          onSuccess();
        }
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
    const hasError = !!errors[field.field_name];
    const errorMessage = errors[field.field_name];

    const commonProps = {
      id: field.field_name,
      required: field.is_required,
      className: `w-full ${hasError ? 'border-red-500 focus:border-red-500' : ''}`
    };

    switch (field.field_type) {
      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            value={formData[field.field_name] as string || ''}
            onChange={(e) => handleInputChange(field.field_name, e.target.value)}
            placeholder={field.field_placeholder || ''}
            rows={4}
          />
        );

      case 'select':
        return (
          <Select
            value={formData[field.field_name] as string || ''}
            onValueChange={(value) => handleInputChange(field.field_name, value)}
          >
            <SelectTrigger className={hasError ? 'border-red-500' : ''}>
              <SelectValue placeholder={field.field_placeholder || 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              {field.field_options?.options?.map((option: string, index: number) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.field_options?.options?.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.field_name}_${index}`}
                  checked={(formData[field.field_name] as string[])?.includes(option) || false}
                  onCheckedChange={(checked) => {
                    const currentValues = (formData[field.field_name] as string[]) || [];
                    if (checked) {
                      handleInputChange(field.field_name, [...currentValues, option]);
                    } else {
                      handleInputChange(field.field_name, currentValues.filter(v => v !== option));
                    }
                  }}
                />
                <Label htmlFor={`${field.field_name}_${index}`} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'radio':
        return (
          <RadioGroup
            value={formData[field.field_name] as string || ''}
            onValueChange={(value) => handleInputChange(field.field_name, value)}
          >
            {field.field_options?.options?.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.field_name}_${index}`} />
                <Label htmlFor={`${field.field_name}_${index}`} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      default:
        return (
          <Input
            {...commonProps}
            type={field.field_type}
            value={formData[field.field_name] as string || ''}
            onChange={(e) => handleInputChange(field.field_name, e.target.value)}
            placeholder={field.field_placeholder || ''}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading contact form...</p>
        </div>
      </div>
    );
  }

  if (formFields.length === 0) {
    return (
      <div className={`text-center p-8 ${className}`}>
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Contact form not configured
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Please configure contact form fields in the dashboard.
        </p>
      </div>
    );
  }

  return (
    <Card className={`shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm ${className}`}>
      {showTitle && (
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {settings?.contact_form_title || 'Get In Touch'}
          </CardTitle>
          {settings?.contact_form_subtitle && (
            <CardDescription>
              {settings.contact_form_subtitle}
            </CardDescription>
          )}
        </CardHeader>
      )}
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
                {errors[field.field_name] && (
                  <p className="text-xs text-red-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors[field.field_name]}
                  </p>
                )}
                {field.help_text && !errors[field.field_name] && (
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
  );
};

export default DynamicContactForm;
