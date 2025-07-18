
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
              {services.map((service, index) => {
                // Determine contextual colors based on service content
                const getServiceColors = (title: string, description: string) => {
                  const text = `${title} ${description}`.toLowerCase();
                  if (text.includes('agriculture') || text.includes('farm')) {
                    return {
                      cardBg: 'bg-emerald-50/40 dark:bg-emerald-950/20',
                      border: 'border-emerald-200/40',
                      iconBg: 'bg-emerald-100/60 dark:bg-emerald-900/30',
                      iconColor: 'text-emerald-600 dark:text-emerald-400',
                      hoverBg: 'group-hover:bg-emerald-50/60 dark:group-hover:bg-emerald-950/30',
                      hoverIcon: 'group-hover:bg-emerald-200/70 dark:group-hover:bg-emerald-800/40',
                      ctaColor: 'text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300',
                      bulletColor: 'bg-emerald-600 dark:bg-emerald-400'
                    };
                  }
                  if (text.includes('school') || text.includes('education') || text.includes('student')) {
                    return {
                      cardBg: 'bg-blue-50/40 dark:bg-blue-950/20',
                      border: 'border-blue-200/40',
                      iconBg: 'bg-blue-100/60 dark:bg-blue-900/30',
                      iconColor: 'text-blue-600 dark:text-blue-400',
                      hoverBg: 'group-hover:bg-blue-50/60 dark:group-hover:bg-blue-950/30',
                      hoverIcon: 'group-hover:bg-blue-200/70 dark:group-hover:bg-blue-800/40',
                      ctaColor: 'text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300',
                      bulletColor: 'bg-blue-600 dark:bg-blue-400'
                    };
                  }
                  if (text.includes('business') || text.includes('management') || text.includes('enterprise')) {
                    return {
                      cardBg: 'bg-purple-50/40 dark:bg-purple-950/20',
                      border: 'border-purple-200/40',
                      iconBg: 'bg-purple-100/60 dark:bg-purple-900/30',
                      iconColor: 'text-purple-600 dark:text-purple-400',
                      hoverBg: 'group-hover:bg-purple-50/60 dark:group-hover:bg-purple-950/30',
                      hoverIcon: 'group-hover:bg-purple-200/70 dark:group-hover:bg-purple-800/40',
                      ctaColor: 'text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300',
                      bulletColor: 'bg-purple-600 dark:bg-purple-400'
                    };
                  }
                  // Default colors
                  return {
                    cardBg: 'bg-slate-50/40 dark:bg-slate-950/20',
                    border: 'border-slate-200/40',
                    iconBg: 'bg-slate-100/60 dark:bg-slate-900/30',
                    iconColor: 'text-slate-600 dark:text-slate-400',
                    hoverBg: 'group-hover:bg-slate-50/60 dark:group-hover:bg-slate-950/30',
                    hoverIcon: 'group-hover:bg-slate-200/70 dark:group-hover:bg-slate-800/40',
                    ctaColor: 'text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300',
                    bulletColor: 'bg-slate-600 dark:bg-slate-400'
                  };
                };

                const colors = getServiceColors(service.title, service.description);

                return (
                  <div key={index} className={`group relative h-full p-7 rounded-2xl bg-grid-pattern bg-clip-padding backdrop-filter backdrop-blur-xl shadow-sm border transition-all duration-200 ${colors.cardBg} ${colors.border} ${colors.hoverBg} hover:shadow-md group-hover:scale-[1.01]`}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="mb-6">
                        <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200 ${colors.iconBg} ${colors.hoverIcon}`}>
                          <service.icon className={`w-6 h-6 transition-all duration-200 ${colors.iconColor} group-hover:scale-105`} />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{service.description}</p>

                      <div className="mb-8">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What's Included:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-400">
                              <div className={`w-2 h-2 rounded-full mr-3 ${colors.bulletColor}`}></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`flex items-center transition-colors duration-200 mt-auto ${colors.ctaColor}`}>
                        <span className="text-sm font-medium mr-2">Learn more</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
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
