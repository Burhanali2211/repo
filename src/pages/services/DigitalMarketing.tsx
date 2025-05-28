import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Users, Mail, Share2, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DigitalMarketing = () => {
  const services = [
    {
      icon: Share2,
      title: 'Social Media Marketing',
      description: 'Build brand awareness and engage with your audience across all major social platforms.'
    },
    {
      icon: Users,
      title: 'PPC Advertising',
      description: 'Drive targeted traffic with optimized pay-per-click campaigns that maximize ROI.'
    },
    {
      icon: Mail,
      title: 'Email Marketing',
      description: 'Nurture leads and retain customers with personalized email campaigns.'
    },
    {
      icon: Megaphone,
      title: 'Content Strategy',
      description: 'Create compelling content that resonates with your audience and drives conversions.'
    }
  ];

  const platforms = [
    { name: 'Google Ads', icon: '🔍' },
    { name: 'Facebook', icon: '📘' },
    { name: 'Instagram', icon: '📷' },
    { name: 'LinkedIn', icon: '💼' },
    { name: 'Twitter', icon: '🐦' },
    { name: 'YouTube', icon: '📺' },
    { name: 'TikTok', icon: '🎵' },
    { name: 'Pinterest', icon: '📌' }
  ];

  const benefits = [
    'Increased Brand Awareness',
    'Higher Lead Generation',
    'Better Customer Engagement',
    'Improved ROI',
    'Targeted Audience Reach',
    'Real-time Analytics',
    'Cost-effective Marketing',
    'Scalable Campaigns'
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-pink-700 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Megaphone className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Digital Marketing
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
              Data-driven marketing campaigns that deliver measurable results 
              and help your business reach its full potential.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-semibold rounded-xl">
                Start Your Campaign
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Marketing Services
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive digital marketing solutions to grow your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-red-100 dark:bg-red-900 rounded-xl mr-4">
                    <service.icon className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Platforms We Work With
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We leverage the power of major platforms to maximize your reach
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{platform.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{platform.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Digital Marketing?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Drive growth with proven marketing strategies that deliver results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <CheckCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                <span className="text-gray-900 dark:text-white font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's create a digital marketing strategy that drives real results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl">
                Get Marketing Plan
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl">
                View Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketing;
