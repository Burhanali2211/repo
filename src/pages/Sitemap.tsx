import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Info, 
  Briefcase, 
  Phone, 
  Settings, 
  FileText, 
  Shield, 
  Cookie,
  Building2,
  Search,
  BookOpen,
  Users,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Sitemap = () => {
  const siteStructure = [
    {
      title: "Main Pages",
      icon: Home,
      links: [
        { name: "Home", path: "/", description: "Welcome to EasyIo.tech" },
        { name: "About Us", path: "/about", description: "Learn about our company and mission" },
        { name: "Contact", path: "/contact", description: "Get in touch with our team" },
      ]
    },
    {
      title: "Services",
      icon: Briefcase,
      links: [
        { name: "All Services", path: "/services", description: "Overview of our services" },
        { name: "Web Development", path: "/services/web-development", description: "Custom web applications and websites" },
        { name: "SEO Services", path: "/services/seo", description: "Search engine optimization" },
        { name: "Digital Marketing", path: "/services/digital-marketing", description: "Comprehensive digital marketing solutions" },
        { name: "Brand Design", path: "/services/brand-design", description: "Brand identity and design services" },
        { name: "Cloud Services", path: "/services/cloud-services", description: "Cloud infrastructure and solutions" },
        { name: "App Development", path: "/services/app-development", description: "Mobile application development" },
      ]
    },
    {
      title: "Portfolio & Work",
      icon: Search,
      links: [
        { name: "Our Work", path: "/our-work", description: "Showcase of our completed projects" },
        { name: "Portfolio", path: "/portfolio", description: "Detailed portfolio gallery" },
        { name: "Industries", path: "/industries", description: "Industries we serve" },
        { name: "Case Studies", path: "/case-studies", description: "Detailed project case studies" },
      ]
    },
    {
      title: "Resources",
      icon: BookOpen,
      links: [
        { name: "Blog", path: "/blog", description: "Latest articles and insights" },
        { name: "Careers", path: "/careers", description: "Join our team" },
      ]
    },
    {
      title: "Legal & Policies",
      icon: Shield,
      links: [
        { name: "Privacy Policy", path: "/privacy", description: "How we protect your privacy" },
        { name: "Terms of Service", path: "/terms", description: "Terms and conditions" },
        { name: "Cookie Policy", path: "/cookies", description: "Information about cookies" },
      ]
    },
    {
      title: "Account & Admin",
      icon: Users,
      links: [
        { name: "Login", path: "/login", description: "User login" },
        { name: "Register", path: "/register", description: "Create new account" },
        { name: "Admin Login", path: "/admin/login", description: "Administrator access" },
      ]
    }
  ];

  const quickStats = [
    { label: "Total Pages", value: "25+" },
    { label: "Service Areas", value: "6" },
    { label: "Industries", value: "15+" },
    { label: "Resources", value: "50+" }
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
              Sitemap
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Navigate through all pages and sections of our website. 
              Find exactly what you're looking for quickly and easily.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sitemap Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteStructure.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                      <section.icon className="h-6 w-6 mr-3 text-purple-600 dark:text-purple-400" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <motion.div
                          key={link.path}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.1) + (linkIndex * 0.05), duration: 0.4 }}
                          whileHover={{ x: 5 }}
                          className="group"
                        >
                          <Link
                            to={link.path}
                            className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                  {link.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {link.description}
                                </p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl p-8 md:p-12 text-center"
          >
            <Search className="h-12 w-12 mx-auto mb-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Use our search functionality or contact us directly. We're here to help you 
              find the information or services you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/?search=true"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Search className="h-4 w-4 mr-2" />
                Search Site
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-all duration-300"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Sitemap;
