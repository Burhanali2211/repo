import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Star, Users, Clock, Award, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from '@/components/AnimatedSection';
import FloatingElement from '@/components/FloatingElement';
import { getServiceBySlug } from '@/lib/supabase/services';
import { getIconComponent } from '@/components/sections/Services';
import { Helmet } from 'react-helmet-async';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) {
        setError('Service not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: fetchError } = await getServiceBySlug(slug);
        
        if (fetchError) {
          throw fetchError;
        }

        if (!data) {
          setError('Service not found');
          return;
        }

        setService(data);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Failed to load service');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
        <div className="container mx-auto px-6 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The service you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/services')} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = getIconComponent(service.icon || 'Globe');

  // Mock data for demonstration - in a real app, this would come from the database
  const serviceFeatures = [
    'Custom Development Solutions',
    'Scalable Architecture',
    '24/7 Support & Maintenance',
    'Modern Technology Stack',
    'Performance Optimization',
    'Security Best Practices'
  ];

  const stats = [
    { label: 'Projects Completed', value: '50+', icon: Award },
    { label: 'Happy Clients', value: '40+', icon: Users },
    { label: 'Average Rating', value: '4.9', icon: Star },
    { label: 'Response Time', value: '< 2h', icon: Clock }
  ];

  return (
    <>
      <Helmet>
        <title>{service.title} | EasyIo.tech - Simplifying Technology</title>
        <meta name="description" content={service.description} />
        <meta property="og:title" content={`${service.title} | EasyIo.tech`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection>
              <div className="flex items-center mb-8">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/services')}
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Services
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                      Professional Service
                    </Badge>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    {service.title}
                  </h1>

                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact">
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl">
                        Get Started
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/20">
                      Learn More
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <FloatingElement amplitude={10} frequency={0.002}>
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>
                      <div className="space-y-3">
                        {serviceFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FloatingElement>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center text-white"
                  >
                    <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
                    <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200/50 dark:border-purple-800/50">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Ready to Get Started?
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    Let's discuss how our {service.title.toLowerCase()} can help transform your business and achieve your goals.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/contact">
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl text-lg">
                        Contact Us Today
                      </Button>
                    </Link>
                    <Link to="/services">
                      <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/20 px-8 py-3 rounded-xl text-lg">
                        View All Services
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceDetail;
