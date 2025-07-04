import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Leaf, Sprout, Zap, BarChart3, Droplets, Thermometer, Wifi, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AgricultureTech = () => {
  const features = [
    {
      icon: Sprout,
      title: 'Smart Farming Systems',
      description: 'IoT-enabled monitoring and automation for optimal crop growth and resource management.'
    },
    {
      icon: Zap,
      title: 'Automated Farms',
      description: 'Fully automated irrigation, fertilization, and harvesting systems for maximum efficiency.'
    },
    {
      icon: Leaf,
      title: 'Eco-Farming Integration',
      description: 'Sustainable farming practices with minimal environmental impact and maximum yield.'
    },
    {
      icon: BarChart3,
      title: 'Data Analytics',
      description: 'Advanced analytics for crop prediction, yield optimization, and market insights.'
    },
    {
      icon: Droplets,
      title: 'Water Management',
      description: 'Smart irrigation systems with moisture sensors and weather-based scheduling.'
    },
    {
      icon: Thermometer,
      title: 'Climate Control',
      description: 'Greenhouse automation with temperature, humidity, and light control systems.'
    }
  ];

  const benefits = [
    'Increase crop yield by up to 40%',
    'Reduce water consumption by 30%',
    'Lower operational costs by 25%',
    'Minimize pesticide usage by 50%',
    'Real-time monitoring and alerts',
    'Sustainable farming practices'
  ];

  return (
    <>
      <Helmet>
        <title>Sustainable Agriculture Technology - EasyIo.tech</title>
        <meta name="description" content="Transform your farming with our smart agriculture technology solutions. IoT sensors, automated systems, and eco-friendly farming integration for sustainable agriculture." />
        <meta name="keywords" content="smart farming, agriculture technology, IoT farming, automated irrigation, sustainable agriculture, precision farming" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 dark:from-green-400/5 dark:to-emerald-400/5"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Leaf className="h-4 w-4" />
                Sustainable Agriculture Technology
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Smart Farming for a
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> Sustainable Future</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Transform your agricultural operations with cutting-edge IoT technology, automated systems, and eco-friendly solutions that maximize yield while minimizing environmental impact.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Start Your Smart Farm
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/our-work">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20 px-8 py-4 text-lg font-semibold rounded-xl">
                    View Case Studies
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
                Comprehensive Agriculture Solutions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our integrated technology platform covers every aspect of modern farming, from soil monitoring to harvest optimization.
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
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
                  Proven Results for Modern Farmers
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Our agriculture technology solutions have helped farmers worldwide achieve remarkable improvements in productivity, sustainability, and profitability.
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
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
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
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">40%</div>
                      <div className="text-green-100">Yield Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">30%</div>
                      <div className="text-green-100">Water Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">25%</div>
                      <div className="text-green-100">Cost Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">50%</div>
                      <div className="text-green-100">Less Pesticides</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Farm?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join thousands of farmers who have revolutionized their operations with our smart agriculture technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/our-work">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl">
                    View Success Stories
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

export default AgricultureTech;
