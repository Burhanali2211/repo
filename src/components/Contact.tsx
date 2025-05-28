
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useToast } from '@/hooks/use-toast';
import AnimatedSection from './AnimatedSection';
import FloatingElement from './FloatingElement';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const { errors, isSubmitting, validateForm, submitForm, setErrors } = useFormValidation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      toast({
        title: "Please fix the errors",
        description: "Check the form fields and try again.",
        variant: "destructive",
      });
      return;
    }

    const success = await submitForm(formData);

    if (success) {
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      setErrors({});
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
    } else {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (isSuccess) {
    return (
      <section id="contact" className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full scale-[1.8] animate-pulse" style={{ animationDuration: '3s' }}></div>
              <FloatingElement amplitude={5} frequency={0.002}>
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6 relative z-10" />
              </FloatingElement>
            </div>

            <AnimatedSection threshold={0.1}>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <Button
                onClick={() => setIsSuccess(false)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span className="mr-2">Send Another Message</span>
                <ArrowRight className="h-5 w-5 inline-block group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6">
        <AnimatedSection threshold={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative inline-block">
              Got any project in mind?
              <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ready to simplify your technology? Let's transform your bold ideas into reality with solutions that work beautifully and simply.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          <AnimatedSection direction="left" threshold={0.2}>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 relative inline-block">
                Get in Touch
                <span className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></span>
              </h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 group hover:bg-purple-50 p-3 rounded-lg transition-colors duration-300">
                  <FloatingElement amplitude={3} frequency={0.002}>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                      <Mail className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </FloatingElement>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Email Us</h4>
                    <p className="text-gray-600">hello@easyio.tech</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group hover:bg-blue-50 p-3 rounded-lg transition-colors duration-300">
                  <FloatingElement amplitude={3} frequency={0.002} phase={1}>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                      <Phone className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </FloatingElement>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Call Us</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group hover:bg-green-50 p-3 rounded-lg transition-colors duration-300">
                  <FloatingElement amplitude={3} frequency={0.002} phase={2}>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                      <MapPin className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </FloatingElement>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">Visit Us</h4>
                    <p className="text-gray-600">123 Business St, Digital City, DC 12345</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" threshold={0.2}>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Tell us about your project..."
                    disabled={isSubmitting}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                  disabled={isSubmitting}
                >
                  <span className="mr-2">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className="h-5 w-5 inline-block group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
