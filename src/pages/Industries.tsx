import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  ShoppingCart, 
  GraduationCap, 
  Heart, 
  Banknote, 
  Truck, 
  Factory, 
  Smartphone,
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Industries = () => {
  const industries = [
    {
      icon: ShoppingCart,
      title: "E-commerce & Retail",
      description: "Comprehensive digital solutions for online stores, marketplaces, and retail businesses.",
      services: ["Custom E-commerce Platforms", "Payment Integration", "Inventory Management", "Mobile Commerce"],
      projects: 45,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      icon: Heart,
      title: "Healthcare & Medical",
      description: "HIPAA-compliant solutions for healthcare providers, telemedicine, and patient management.",
      services: ["Telemedicine Platforms", "Patient Portals", "Medical Records", "Appointment Systems"],
      projects: 32,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-950/20"
    },
    {
      icon: GraduationCap,
      title: "Education & E-learning",
      description: "Interactive learning platforms, LMS solutions, and educational technology.",
      services: ["Learning Management Systems", "Virtual Classrooms", "Student Portals", "Assessment Tools"],
      projects: 28,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      icon: Banknote,
      title: "Finance & FinTech",
      description: "Secure financial applications, banking solutions, and payment processing systems.",
      services: ["Banking Apps", "Payment Gateways", "Investment Platforms", "Cryptocurrency"],
      projects: 38,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20"
    },
    {
      icon: Building2,
      title: "Real Estate",
      description: "Property management systems, real estate platforms, and virtual tour solutions.",
      services: ["Property Listings", "CRM Systems", "Virtual Tours", "Property Management"],
      projects: 22,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      icon: Truck,
      title: "Logistics & Transportation",
      description: "Fleet management, tracking systems, and supply chain optimization solutions.",
      services: ["Fleet Management", "Route Optimization", "Tracking Systems", "Warehouse Management"],
      projects: 19,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/20"
    },
    {
      icon: Factory,
      title: "Manufacturing & Industry",
      description: "Industrial automation, IoT solutions, and manufacturing process optimization.",
      services: ["IoT Solutions", "Process Automation", "Quality Control", "Supply Chain"],
      projects: 25,
      color: "from-gray-500 to-slate-500",
      bgColor: "bg-gray-50 dark:bg-gray-950/20"
    },
    {
      icon: Smartphone,
      title: "Technology & SaaS",
      description: "Software as a Service platforms, tech startups, and digital transformation.",
      services: ["SaaS Platforms", "API Development", "Cloud Solutions", "Digital Transformation"],
      projects: 41,
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50 dark:bg-teal-950/20"
    }
  ];

  const stats = [
    { label: "Industries Served", value: "15+", icon: Building2 },
    { label: "Successful Projects", value: "250+", icon: CheckCircle },
    { label: "Happy Clients", value: "180+", icon: Users },
    { label: "Growth Rate", value: "95%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Industries We Serve
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              We deliver tailored technology solutions across diverse industries, 
              helping businesses transform digitally and achieve their goals.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className={`h-full ${industry.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${industry.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <industry.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {industry.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                      {industry.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      {industry.services.slice(0, 3).map((service, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          {service}
                        </div>
                      ))}
                      {industry.services.length > 3 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          +{industry.services.length - 3} more services
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {industry.projects} Projects
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Don't See Your Industry?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              We work with businesses across all sectors. Our adaptable approach means we can 
              create custom solutions for any industry or business model.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl">
                <Link to="/contact">
                  Discuss Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="px-8 py-3 rounded-xl">
                <Link to="/our-work">View Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
