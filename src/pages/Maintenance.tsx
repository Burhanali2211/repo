import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Clock, 
  Mail, 
  Phone, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useWebsiteSettings } from '@/contexts/SettingsContext';

const Maintenance = () => {
  const { settings } = useWebsiteSettings();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Estimated completion time (you can make this dynamic from settings)
  const estimatedCompletion = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours from now

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = estimatedCompletion.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [estimatedCompletion]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', url: 'https://twitter.com' },
    { icon: Facebook, label: 'Facebook', url: 'https://facebook.com' },
    { icon: Instagram, label: 'Instagram', url: 'https://instagram.com' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
  ];

  const maintenanceSteps = [
    { step: 'Database Optimization', status: 'completed' },
    { step: 'Security Updates', status: 'completed' },
    { step: 'Performance Improvements', status: 'in-progress' },
    { step: 'Feature Enhancements', status: 'pending' },
    { step: 'Final Testing', status: 'pending' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 flex items-center justify-center px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Animated maintenance icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative mx-auto w-24 h-24 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
            >
              <Settings className="h-12 w-12 text-white" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 animate-ping"></div>
          </div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
              We're Under Maintenance
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {settings?.maintenance_message || 
                "We're currently performing scheduled maintenance to improve your experience. We'll be back online soon!"
              }
            </p>
          </motion.div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Estimated Time Remaining
          </h3>
          <div className="flex justify-center gap-4 mb-8">
            {[
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={item.label} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-4 min-w-[80px]">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Maintenance Progress
              </h3>
              <div className="space-y-4">
                {maintenanceSteps.map((step, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {step.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      ) : step.status === 'in-progress' ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Settings className="h-5 w-5 text-blue-500 mr-3" />
                        </motion.div>
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400 mr-3" />
                      )}
                      <span className={`text-sm ${
                        step.status === 'completed' 
                          ? 'text-green-600 dark:text-green-400' 
                          : step.status === 'in-progress'
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {step.step}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      step.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : step.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {step.status === 'completed' ? 'Done' : step.status === 'in-progress' ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Get Notified When We're Back
              </h3>
              {isSubscribed ? (
                <div className="flex items-center justify-center text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Thank you! We'll notify you when we're back online.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Notify Me
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Need Immediate Assistance?
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {settings?.contact_email && (
              <Button variant="outline" asChild>
                <a href={`mailto:${settings.contact_email}`} className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Us
                </a>
              </Button>
            )}
            {settings?.contact_phone && (
              <Button variant="outline" asChild>
                <a href={`tel:${settings.contact_phone}`} className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
                </a>
              </Button>
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-600 hover:text-white transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Thank you for your patience. We appreciate your understanding.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Maintenance;
