
import React from 'react';
import { Code, Search, Megaphone, Palette, ArrowRight, Leaf, GraduationCap, Building2, Users, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '../components/Footer';
import ComprehensiveSEO from '@/components/SEO/ComprehensiveSEO';

const Services = () => {
  const services = [
    {
      icon: Leaf,
      title: 'Sustainable Agriculture Technology',
      description: 'Smart farming systems and eco-friendly agricultural solutions',
      features: ['Smart Farming Systems', 'Automated Farms', 'Eco-Farming Integration', 'IoT Sensors & Monitoring'],
      color: 'bg-green-500'
    },
    {
      icon: GraduationCap,
      title: 'School Management Systems',
      description: 'Comprehensive educational technology solutions',
      features: ['School Websites & Apps', 'Administrative Systems', 'Admission & Fee Management', 'Live Bus Tracking Systems'],
      color: 'bg-blue-500'
    },
    {
      icon: Building2,
      title: 'Business Solutions',
      description: 'Custom business software and process optimization',
      features: ['Business Process Solutions', 'Inventory Management', 'Custom ERP Systems', 'Market Analysis Insights'],
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      title: 'Student Programs',
      description: 'Educational programs and skill development initiatives',
      features: ['Student Upskill Programs', 'Workshops & Training', 'Hackathons & Ideathons', 'Research Support'],
      color: 'bg-amber-500'
    },
    {
      icon: Wrench,
      title: 'Technical Services',
      description: 'Prototyping and technical design services',
      features: ['3D Designing Solutions', '3D Printing Services', 'PCB Designing & Printing', 'Rapid Prototyping'],
      color: 'bg-pink-500'
    }
  ];

  return (
    <>
      <ComprehensiveSEO
        title="Services - EasyIo.tech"
        description="EasyIo.tech Services - Comprehensive IoT solutions, automation services, digital transformation, web development, and cloud services. EasyIoTech delivers innovative technology solutions."
        pageType="services"
        keywords={['easyio services', 'IoT solutions', 'automation services', 'digital transformation', 'technology services', 'easyiotech solutions']}
      />
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-blue-600 to-indigo-700 text-white dark:from-indigo-800 dark:to-gray-900 overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-amber-300 dark:text-amber-300">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From sustainable agriculture to student empowerment, we create solutions that are
              easy to use, powerful in impact, and kind to the planet.
            </p>
          </div>

          {/* Gradient transition to Services Grid section */}
          <div className="section-transition-overlay gradient-transition-to-light dark:gradient-transition-to-dark"></div>
        </section>

        {/* Services Grid */}
        <section className="relative py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {services.map((service, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-8 hover:shadow-xl transition-shadow duration-300 dark:shadow-gray-900/30">
                  <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                          <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient transition to CTA section */}
          <div className="section-transition-overlay gradient-transition-purple-to-blue"></div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-b from-blue-500 to-indigo-600 dark:from-indigo-700 dark:to-indigo-800 text-white overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Simplify Your Technology?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's transform your bold ideas into reality with solutions that are accessible, sustainable, and meaningful.
            </p>
            <Button className="bg-amber-300 text-gray-800 hover:bg-amber-400 dark:bg-amber-400 dark:hover:bg-amber-500 dark:text-gray-900 px-8 py-4 text-lg">
              Start Your Project
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Services;
