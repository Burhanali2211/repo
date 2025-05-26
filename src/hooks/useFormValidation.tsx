
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (data: FormData): boolean => {
    const newErrors: ValidationErrors = {};

    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!data.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (data: FormData): Promise<boolean> => {
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log form data for now (in real app, send to backend)
      console.log('Form submitted:', data);
      
      setIsSubmitting(false);
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      return false;
    }
  };

  return {
    errors,
    isSubmitting,
    validateForm,
    submitForm,
    setErrors
  };
};
