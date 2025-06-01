import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Wrench, Box, Cpu, Layers, Zap, Settings, Printer, Cog, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TechnicalServices = () => {
  const features = [
    {
      icon: Box,
      title: '3D Designing Solutions',
      description: 'Professional 3D modeling and design services for products, prototypes, and architectural visualization.'
    },
    {
      icon: Printer,
      title: '3D Printing Services',
      description: 'High-quality 3D printing with various materials and precision for prototypes and final products.'
    },
    {
      icon: Cpu,
      title: 'PCB Designing & Printing',
      description: 'Custom PCB design and manufacturing for electronic projects and commercial applications.'
    },
    {
      icon: Zap,
      title: 'Rapid Prototyping',
      description: 'Fast and efficient prototyping services to bring your ideas to life quickly and cost-effectively.'
    },
    {
      icon: Layers,
      title: 'Product Development',
      description: 'End-to-end product development from concept to manufacturing-ready designs.'
    },
    {
      icon: Settings,
      title: 'Technical Consulting',
      description: 'Expert technical guidance and consulting for complex engineering and design challenges.'
    }
  ];

  const benefits = [
    'Reduce development time by 60%',
    'Lower prototyping costs by 40%',
    'High-precision manufacturing',
    'Expert technical guidance',
    'Fast turnaround times',
    'Quality assurance guaranteed'
  ];

  return (
    <>
      <Helmet>
        <title>Technical Services - EasyIo.tech</title>
        <meta name="description" content="Professional technical services including 3D designing, 3D printing, PCB design and manufacturing, rapid prototyping, and product development solutions." />
        <meta name="keywords" content="3D design, 3D printing, PCB design, rapid prototyping, product development, technical services, manufacturing, engineering" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-pink-900">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-rose-600/10 dark:from-pink-400/5 dark:to-rose-400/5"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Wrench className="h-4 w-4" />
                Technical Services
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Precision Engineering &
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600"> Technical Excellence</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Professional technical services including 3D design, printing, PCB development, and rapid prototyping to bring your innovative ideas to reality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/our-work">
                  <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50 dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-900/20 px-8 py-4 text-lg font-semibold rounded-xl">
                    View Technical Projects
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Complete Technical Solutions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                From concept to production, we provide comprehensive technical services to support your innovation journey.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Precision Meets Innovation
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Our technical services combine cutting-edge technology with expert craftsmanship to deliver exceptional results for your projects.
                </p>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="h-6 w-6 text-pink-600 dark:text-pink-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 text-lg">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-2xl p-8 text-white">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">1000+</div>
                      <div className="text-pink-100">Projects Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">60%</div>
                      <div className="text-pink-100">Faster Development</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">99.5%</div>
                      <div className="text-pink-100">Precision Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">24h</div>
                      <div className="text-pink-100">Turnaround Time</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-pink-600 to-rose-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Bring Your Ideas to Life?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Let our technical experts help you transform your concepts into reality with precision and excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/our-work">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl">
                    View Portfolio
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TechnicalServices;
