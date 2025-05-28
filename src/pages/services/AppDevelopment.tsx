import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Tablet, Monitor, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AppDevelopment = () => {
  const services = [
    {
      icon: Smartphone,
      title: 'Native Mobile Apps',
      description: 'High-performance native apps for iOS and Android with platform-specific features.'
    },
    {
      icon: Monitor,
      title: 'Cross-Platform Apps',
      description: 'Cost-effective cross-platform solutions using React Native and Flutter.'
    },
    {
      icon: Tablet,
      title: 'Progressive Web Apps',
      description: 'Web apps that work like native apps with offline capabilities and push notifications.'
    },
    {
      icon: Zap,
      title: 'App Optimization',
      description: 'Performance optimization and user experience improvements for existing apps.'
    }
  ];

  const technologies = [
    { name: 'React Native', icon: '⚛️' },
    { name: 'Flutter', icon: '🦋' },
    { name: 'Swift', icon: '🍎' },
    { name: 'Kotlin', icon: '🤖' },
    { name: 'Ionic', icon: '⚡' },
    { name: 'Xamarin', icon: '🔷' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'AWS Mobile', icon: '☁️' }
  ];

  const features = [
    'Cross-Platform Compatibility',
    'Offline Functionality',
    'Push Notifications',
    'In-App Purchases',
    'Social Media Integration',
    'Analytics & Tracking',
    'Security & Encryption',
    'App Store Optimization'
  ];

  const developmentProcess = [
    { step: '01', title: 'Planning', description: 'Requirements analysis and project planning' },
    { step: '02', title: 'Design', description: 'UI/UX design and prototyping' },
    { step: '03', title: 'Development', description: 'Coding and feature implementation' },
    { step: '04', title: 'Testing', description: 'Quality assurance and bug fixing' },
    { step: '05', title: 'Launch', description: 'App store submission and deployment' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Smartphone className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mobile Application
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Custom mobile applications that engage users and drive business growth 
              across iOS, Android, and web platforms.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 text-lg font-semibold rounded-xl">
                Start Your App
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
              Our App Development Services
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive mobile app development solutions for all platforms
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
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl mr-4">
                    <service.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Development Process
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A proven methodology for delivering successful mobile applications
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {developmentProcess.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {phase.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{phase.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technologies We Use
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Cutting-edge technologies for modern mobile app development
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{tech.name}</h3>
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <CheckCircle className="h-6 w-6 text-indigo-500 flex-shrink-0" />
                <span className="text-gray-900 dark:text-white font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your App?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's turn your app idea into reality with our expert development team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl">
                Get App Quote
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl">
                View App Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppDevelopment;
