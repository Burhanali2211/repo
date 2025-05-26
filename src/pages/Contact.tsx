
import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-600 to-indigo-700 text-white dark:from-indigo-800 dark:to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get In <span className="text-amber-300 dark:text-amber-300">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your next project? We'd love to hear from you. 
            Let's create something amazing together.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Let's Start a Conversation</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Email Us</h4>
                    <p className="text-gray-600 dark:text-gray-400">hello@easyio.tech</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Call Us</h4>
                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Visit Us</h4>
                    <p className="text-gray-600 dark:text-gray-400">123 Business St, Digital City, DC 12345</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Business Hours</h4>
                    <p className="text-gray-600 dark:text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="h-64 rounded-lg overflow-hidden shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573174316!2d-73.98784542426508!3d40.75751157138396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1657867372607!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                  className="grayscale dark:invert-[0.85] dark:contrast-125 dark:brightness-90"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Modern contact call-to-action section */}
      <section className="py-16 bg-gradient-to-b from-blue-500 to-indigo-600 dark:from-indigo-700 dark:to-indigo-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Ready to transform your digital presence?</h2>
              <p className="text-lg text-gray-200 mb-8">
                Our team of experts is ready to help you create a powerful digital identity that resonates with your audience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-indigo-700 hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-white dark:text-indigo-800 px-6 py-3 rounded-lg font-medium group">
                  Schedule a Call
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 dark:border-gray-100 dark:text-gray-100 dark:hover:bg-white/10 px-6 py-3 rounded-lg font-medium">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Live Chat
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* Social proof and connection options */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg dark:bg-gray-800/30">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-purple-600/50 dark:bg-purple-500/50 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">24/7 Support</h3>
                <p className="text-center text-gray-300">Always here to help with your questions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg dark:bg-gray-800/30">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-600/50 dark:bg-blue-500/50 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Quick Response</h3>
                <p className="text-center text-gray-300">We respond within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20 dark:border-white/10">
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="flex items-center text-white/80 hover:text-white transition-colors">
                <Facebook className="h-5 w-5 mr-2" />
                <span>Facebook</span>
              </a>
              <a href="#" className="flex items-center text-white/80 hover:text-white transition-colors">
                <Twitter className="h-5 w-5 mr-2" />
                <span>Twitter</span>
              </a>
              <a href="#" className="flex items-center text-white/80 hover:text-white transition-colors">
                <Instagram className="h-5 w-5 mr-2" />
                <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center text-white/80 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5 mr-2" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
