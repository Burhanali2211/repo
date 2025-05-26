
import React from 'react';
import { Code, Search, Megaphone, Palette, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '../components/Footer';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      features: ['Responsive Design', 'E-commerce Solutions', 'Progressive Web Apps', 'API Integration'],
      color: 'bg-blue-500'
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Boost your search rankings and organic traffic',
      features: ['Technical SEO', 'Content Optimization', 'Local SEO', 'Analytics & Reporting'],
      color: 'bg-green-500'
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Data-driven marketing campaigns that deliver results',
      features: ['Social Media Marketing', 'PPC Advertising', 'Email Marketing', 'Content Strategy'],
      color: 'bg-red-500'
    },
    {
      icon: Palette,
      title: 'Branding & Design',
      description: 'Complete brand identity and visual design solutions',
      features: ['Logo Design', 'Brand Guidelines', 'UI/UX Design', 'Print Design'],
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-600 to-indigo-700 text-white dark:from-indigo-800 dark:to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-amber-300 dark:text-amber-300">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your business needs, 
            from strategy to execution.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-blue-500 to-indigo-600 dark:from-indigo-700 dark:to-indigo-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your project and find the perfect solution for your business needs.
          </p>
          <Button className="bg-amber-300 text-gray-800 hover:bg-amber-400 dark:bg-amber-400 dark:hover:bg-amber-500 dark:text-gray-900 px-8 py-4 text-lg">
            Get Free Consultation
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
