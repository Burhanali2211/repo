import React from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Target, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SEO = () => {
  const services = [
    {
      icon: Search,
      title: 'Technical SEO',
      description: 'Optimize your website\'s technical foundation for better search engine crawling and indexing.'
    },
    {
      icon: TrendingUp,
      title: 'Content Optimization',
      description: 'Create and optimize content that ranks well and engages your target audience.'
    },
    {
      icon: Target,
      title: 'Local SEO',
      description: 'Dominate local search results and attract customers in your geographic area.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Track performance with detailed reports and actionable insights.'
    }
  ];

  const benefits = [
    'Increased Organic Traffic',
    'Higher Search Rankings',
    'Better User Experience',
    'Improved Brand Visibility',
    'Higher Conversion Rates',
    'Long-term ROI',
    'Competitive Advantage',
    'Mobile Optimization'
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-blue-700 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Search className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              SEO Services
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Boost your search rankings and organic traffic with our comprehensive 
              SEO strategies that deliver measurable results.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-xl">
                Get SEO Audit
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
              Our SEO Services
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive SEO solutions to improve your online visibility
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
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl mr-4">
                    <service.icon className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our SEO Services?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Drive more qualified traffic and grow your business with proven SEO strategies
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
                className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm"
              >
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-900 dark:text-white font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Improve Your Rankings?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a free SEO audit and discover how we can help you dominate search results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl">
                Get Free SEO Audit
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl">
                View Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SEO;
