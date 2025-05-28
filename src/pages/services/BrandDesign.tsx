import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Eye, Layers, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BrandDesign = () => {
  const services = [
    {
      icon: Palette,
      title: 'Logo Design',
      description: 'Create memorable and impactful logos that represent your brand identity perfectly.'
    },
    {
      icon: Layers,
      title: 'Brand Guidelines',
      description: 'Comprehensive brand guidelines to ensure consistency across all touchpoints.'
    },
    {
      icon: Eye,
      title: 'UI/UX Design',
      description: 'User-centered design that creates intuitive and engaging digital experiences.'
    },
    {
      icon: Sparkles,
      title: 'Print Design',
      description: 'Professional print materials that extend your brand into the physical world.'
    }
  ];

  const deliverables = [
    'Logo Design & Variations',
    'Color Palette & Typography',
    'Brand Guidelines Document',
    'Business Card Design',
    'Letterhead & Stationery',
    'Social Media Templates',
    'Website Design Mockups',
    'Marketing Materials'
  ];

  const designProcess = [
    { step: '01', title: 'Discovery', description: 'Understanding your brand, goals, and target audience' },
    { step: '02', title: 'Research', description: 'Market analysis and competitor research' },
    { step: '03', title: 'Concept', description: 'Initial design concepts and creative exploration' },
    { step: '04', title: 'Refinement', description: 'Iterating and perfecting the chosen direction' },
    { step: '05', title: 'Delivery', description: 'Final files and brand guidelines delivery' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-700 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Palette className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Brand Design
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Complete brand identity and visual design solutions that make your 
              business stand out and connect with your audience.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-xl">
                Start Your Brand
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
              Our Design Services
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive brand design solutions to establish your visual identity
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
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl mr-4">
                    <service.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Design Process
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A structured approach to creating exceptional brand experiences
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {designProcess.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {phase.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{phase.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What You'll Receive
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complete brand package with everything you need to launch your brand
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((deliverable, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <CheckCircle className="h-6 w-6 text-purple-500 flex-shrink-0" />
                <span className="text-gray-900 dark:text-white font-medium">{deliverable}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your Brand?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's create a brand identity that tells your story and connects with your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl">
                Start Your Project
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl">
                View Our Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandDesign;
