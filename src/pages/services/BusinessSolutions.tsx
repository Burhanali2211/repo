import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Building2, Cog, BarChart3, Package, Database, Zap, TrendingUp, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BusinessSolutions = () => {
  const features = [
    {
      icon: Cog,
      title: 'Business Process Solutions',
      description: 'Streamline and automate your business processes for maximum efficiency and productivity.'
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Real-time inventory tracking, automated reordering, and comprehensive stock management.'
    },
    {
      icon: Database,
      title: 'Custom ERP Systems',
      description: 'Tailored Enterprise Resource Planning solutions designed for your specific business needs.'
    },
    {
      icon: BarChart3,
      title: 'Market Analysis Insights',
      description: 'Advanced analytics and business intelligence for data-driven decision making.'
    },
    {
      icon: TrendingUp,
      title: 'Performance Optimization',
      description: 'Identify bottlenecks and optimize operations for improved business performance.'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security measures and compliance with industry standards.'
    }
  ];

  const benefits = [
    'Increase operational efficiency by 45%',
    'Reduce manual processes by 70%',
    'Improve data accuracy by 90%',
    'Cut operational costs by 35%',
    'Real-time business insights',
    'Scalable solutions for growth'
  ];

  return (
    <>
      <Helmet>
        <title>Business Solutions - EasyIo.tech</title>
        <meta name="description" content="Custom business software solutions including ERP systems, inventory management, process automation, and market analysis for optimized business operations." />
        <meta name="keywords" content="business solutions, ERP systems, inventory management, business automation, process optimization, custom software, business intelligence" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 dark:from-purple-400/5 dark:to-indigo-400/5"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Building2 className="h-4 w-4" />
                Business Solutions
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Custom Software for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"> Business Excellence</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Transform your business operations with our custom software solutions, ERP systems, and process optimization tools designed to drive growth and efficiency.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Optimize Your Business
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/our-work">
                  <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20 px-8 py-4 text-lg font-semibold rounded-xl">
                    View Business Cases
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
                Comprehensive Business Solutions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                From process automation to custom ERP systems, we provide end-to-end solutions that transform how your business operates.
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
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
                  Driving Business Growth Through Technology
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Our business solutions have helped companies across industries achieve significant improvements in efficiency, cost reduction, and overall performance.
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
                      <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400 flex-shrink-0" />
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
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">45%</div>
                      <div className="text-purple-100">Efficiency Gain</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">70%</div>
                      <div className="text-purple-100">Process Automation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">35%</div>
                      <div className="text-purple-100">Cost Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">90%</div>
                      <div className="text-purple-100">Data Accuracy</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Let us help you streamline operations, reduce costs, and drive growth with our custom business solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Business Analysis
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

export default BusinessSolutions;
