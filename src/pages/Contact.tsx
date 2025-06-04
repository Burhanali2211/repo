
import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
  Star,
  Users,
  Zap,
  Shield,
  Award,
  Timer,
  TrendingUp,
  Sparkles,
  Heart
} from 'lucide-react';
import DynamicContactForm from '../components/forms/DynamicContactForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useWebsiteSettings } from '@/contexts/SettingsContext';
import { getFeaturedSuccessStories, type SuccessStory } from '@/lib/supabase/successStoriesServices';
import ComprehensiveSEO from '@/components/SEO/ComprehensiveSEO';

const Contact = () => {
  const { settings } = useWebsiteSettings();
  const [responseTime, setResponseTime] = useState('< 2 hours');
  const [activeClients, setActiveClients] = useState(47);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);

  // Load success stories
  useEffect(() => {
    const loadSuccessStories = async () => {
      try {
        const stories = await getFeaturedSuccessStories(1);
        setSuccessStories(stories);
      } catch (error) {
        console.error('Error loading success stories:', error);
      }
    };

    loadSuccessStories();
  }, []);

  // Update response time from settings
  useEffect(() => {
    if (settings?.response_time_promise) {
      setResponseTime(settings.response_time_promise);
    }
  }, [settings]);



  const trustSignals = [
    { icon: CheckCircle, text: "100% Project Success Rate", color: "text-green-500" },
    { icon: Users, text: "50+ Happy Clients", color: "text-blue-500" },
    { icon: Award, text: "Industry Recognized", color: "text-purple-500" },
    { icon: Shield, text: "Secure & Confidential", color: "text-orange-500" }
  ];

  const urgencyIndicators = [
    { icon: Timer, text: "Limited Slots Available", badge: "Only 3 left this month" },
    { icon: TrendingUp, text: "High Demand Service", badge: "Book now" },
    { icon: Sparkles, text: "Free Consultation", badge: "Worth $200" }
  ];

  return (
    <>
      <ComprehensiveSEO
        title="Contact EasyIo.tech"
        description="Contact EasyIo.tech (EasyIoTech) - Get in touch with our technology experts for IoT solutions, automation services, and digital transformation projects. EasyIoTechnology support team."
        pageType="contact"
        keywords={['contact easyio', 'easyiotech contact', 'technology consultation', 'IoT consultation', 'automation consultation']}
      />
      <div className="min-h-screen pt-20">
        {/* Enhanced Hero Section with Psychological Elements */}
        <section className="relative py-24 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white dark:from-purple-800 dark:via-indigo-800 dark:to-gray-900 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
          </div>

          <div className="container mx-auto container-responsive relative z-10">
            <div className="text-center mb-8 sm:mb-12">
              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                {trustSignals.map((signal, index) => (
                  <Badge key={index} className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium">
                    <signal.icon className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 ${signal.color}`} />
                    <span className="hidden sm:inline">{signal.text}</span>
                    <span className="sm:hidden">{signal.text.split(' ')[0]}</span>
                  </Badge>
                ))}
              </div>

              <h1 className="text-responsive-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                Let's Build Something
                <span className="block text-yellow-300 animate-pulse">Extraordinary</span>
              </h1>

              <p className="text-responsive-lg text-gray-200 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
                Join <span className="font-bold text-yellow-300">{activeClients}+ successful clients</span> who've transformed their digital presence.
                We respond in <span className="font-bold text-green-300">{responseTime}</span> and deliver results that exceed expectations.
              </p>

              {/* Urgency Indicators */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                {urgencyIndicators.map((indicator, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 sm:py-3 border border-white/20 max-w-xs sm:max-w-none">
                    <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2">
                      <indicator.icon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300 flex-shrink-0" />
                      <span className="text-white font-medium text-xs sm:text-sm text-center sm:text-left">{indicator.text}</span>
                      <Badge className="bg-yellow-400 text-black text-xs font-bold">
                        {indicator.badge}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Start Your Project Now</span>
                  <span className="sm:hidden">Start Project</span>
                </Button>
                <Button variant="outline-light" className="backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full border-2 border-white/70 text-white hover:bg-white hover:text-black">
                  <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Free Consultation</span>
                  <span className="sm:hidden">Get Quote</span>
                </Button>
              </div>
            </div>


          </div>

          {/* Enhanced gradient transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
        </section>

        {/* Enhanced Contact Info & Form Section */}
        <section className="section-responsive bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
          <div className="container mx-auto container-responsive">
            {/* Section Header with Social Proof */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="flex justify-center items-center space-x-1 sm:space-x-2 mb-4">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                <span className="text-gray-600 dark:text-gray-400 ml-2 text-responsive-sm">4.9/5 from 50+ reviews</span>
              </div>
              <h2 className="text-responsive-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Transform</span> Your Business?
              </h2>
              <p className="text-responsive-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Join the ranks of successful businesses that chose EasyIo.tech. Get your free consultation and project estimate today.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Enhanced Contact Information */}
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <MessageSquare className="h-6 w-6 mr-3 text-purple-600" />
                    Get In Touch
                  </h3>

                  <div className="space-y-6">
                    {settings?.contact_email && (
                      <div className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Mail className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Email Us</h4>
                          <p className="text-purple-600 dark:text-purple-400 font-medium">{settings.contact_email}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{settings.response_time_promise || 'We respond quickly'}</p>
                        </div>
                      </div>
                    )}

                    {settings?.contact_phone && (
                      <div className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Phone className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Call Us</h4>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">{settings.contact_phone}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{settings.office_hours_display || 'Business hours'}</p>
                        </div>
                      </div>
                    )}

                    {settings?.address && (
                      <div className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <MapPin className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">Visit Us</h4>
                          <p className="text-green-600 dark:text-green-400 font-medium">
                            {[
                              settings.address,
                              settings.address_line_2,
                              settings.city,
                              settings.state_province
                            ].filter(Boolean).join(', ')}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {settings.location_description || 'By appointment only'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Success Stories Teaser */}
                {successStories.length > 0 && (
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Award className="h-6 w-6 mr-3 text-yellow-600" />
                      Recent Success Story
                    </h3>
                    <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4">
                      "{successStories[0].story_content}"
                    </blockquote>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {successStories[0].client_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{successStories[0].client_name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {successStories[0].client_role && successStories[0].client_company
                            ? `${successStories[0].client_role}, ${successStories[0].client_company}`
                            : successStories[0].client_role || successStories[0].client_company || 'Satisfied Client'
                          }
                        </p>
                      </div>
                    </div>
                    {successStories[0].results_achieved && (
                      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                        <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                          Results: {successStories[0].results_achieved}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Interactive Map */}
                {settings?.map_embed_url && (
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                    <iframe
                      src={settings.map_embed_url}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Office Location"
                      className="grayscale hover:grayscale-0 transition-all duration-500 dark:invert-[0.85] dark:contrast-125 dark:brightness-90"
                    ></iframe>
                  </div>
                )}
              </div>

              {/* Enhanced Contact Form */}
              <div className="relative">
                {/* Form Enhancement Wrapper */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                  {/* Form Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {settings?.contact_form_title || 'Get Your Free Consultation'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {settings?.contact_form_subtitle || 'Fill out the form below and we\'ll get back to you soon'}
                    </p>
                    <div className="flex justify-center items-center space-x-2 mt-4">
                      <Timer className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                        {settings?.response_time_promise || `Average response time: ${responseTime}`}
                      </span>
                    </div>
                  </div>

                  <DynamicContactForm showTitle={false} />

                  {/* Trust Indicators */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>100% Secure</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>No Spam</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        <span>Free Consultation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-800 dark:via-indigo-800 dark:to-gray-900 text-white relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
              <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
            </div>
          </div>

          <div className="container mx-auto container-responsive relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-responsive-2xl font-bold mb-4 sm:mb-6">
                Don't Wait - Your Competition Won't
              </h2>
              <p className="text-responsive-lg text-gray-200 max-w-3xl mx-auto mb-6 sm:mb-8">
                Every day you delay is a day your competitors get ahead. Join the digital revolution today and watch your business soar.
              </p>

              {/* Urgency Timer */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8 border border-white/20">
                <h3 className="text-responsive-base font-semibold mb-3 sm:mb-4">Limited Time Offer</h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div>
                    <div className="text-responsive-xl font-bold text-yellow-300">03</div>
                    <div className="text-responsive-xs text-gray-300">Days</div>
                  </div>
                  <div>
                    <div className="text-responsive-xl font-bold text-yellow-300">14</div>
                    <div className="text-responsive-xs text-gray-300">Hours</div>
                  </div>
                  <div>
                    <div className="text-responsive-xl font-bold text-yellow-300">27</div>
                    <div className="text-responsive-xs text-gray-300">Minutes</div>
                  </div>
                </div>
                <p className="text-responsive-xs text-gray-300 mt-3 sm:mt-4">Get 20% off your first project</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Claim Your Discount Now</span>
                  <span className="sm:hidden">Claim Discount</span>
                </Button>
                <Button variant="outline-light" className="backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full border-2 border-white/70 text-white hover:bg-white hover:text-black">
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Call Now: +1 (555) 123-4567</span>
                  <span className="sm:hidden">Call Now</span>
                </Button>
              </div>
            </div>

            <div className="grid-responsive-1-2-3 gap-responsive-md mb-12 sm:mb-16">
              {/* Enhanced Service Cards */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/20 transition-all duration-300 group">
                <CardContent className="card-responsive">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-responsive-lg font-semibold mb-2">Instant Support</h3>
                  <p className="text-gray-300 mb-3 sm:mb-4 text-responsive-sm">Get immediate help from our expert team</p>
                  <Badge className="bg-green-500 text-white text-xs sm:text-sm">Available 24/7</Badge>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/20 transition-all duration-300 group">
                <CardContent className="card-responsive">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Timer className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-responsive-lg font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-gray-300 mb-3 sm:mb-4 text-responsive-sm">Projects delivered in record time</p>
                  <Badge className="bg-yellow-500 text-black text-xs sm:text-sm">2x Faster</Badge>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/20 transition-all duration-300 group">
                <CardContent className="card-responsive">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-responsive-lg font-semibold mb-2">Guaranteed Results</h3>
                  <p className="text-gray-300 mb-3 sm:mb-4 text-responsive-sm">100% satisfaction or money back</p>
                  <Badge className="bg-purple-500 text-white text-xs sm:text-sm">Risk-Free</Badge>
                </CardContent>
              </Card>
            </div>

            {/* Social Links */}
            <div className="text-center">
              <h3 className="text-responsive-lg font-semibold mb-4 sm:mb-6">Follow Our Journey</h3>
              <div className="flex justify-center space-x-4 sm:space-x-6">
                <a href="#" className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 touch-target">
                  <Facebook className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="#" className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 touch-target">
                  <Twitter className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="#" className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 touch-target">
                  <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="#" className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 touch-target">
                  <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom gradient transition */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100 dark:from-gray-900 to-transparent"></div>
        </section>
      </div>
    </>
  );
};

export default Contact;
