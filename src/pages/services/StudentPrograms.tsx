import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Users, BookOpen, Trophy, Lightbulb, Code, Presentation, Target, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const StudentPrograms = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Student Upskill Programs',
      description: 'Comprehensive skill development programs in technology, design, and business fundamentals.'
    },
    {
      icon: Presentation,
      title: 'Workshops & Training',
      description: 'Hands-on workshops covering latest technologies, tools, and industry best practices.'
    },
    {
      icon: Trophy,
      title: 'Hackathons & Ideathons',
      description: 'Competitive events that foster innovation, creativity, and collaborative problem-solving.'
    },
    {
      icon: Lightbulb,
      title: 'Research Support',
      description: 'Guidance and resources for academic research projects and innovative solutions.'
    },
    {
      icon: Code,
      title: 'Technical Mentorship',
      description: 'One-on-one mentoring from industry experts to accelerate learning and career growth.'
    },
    {
      icon: Target,
      title: 'Career Development',
      description: 'Professional development programs to prepare students for successful careers in tech.'
    }
  ];

  const benefits = [
    'Enhance technical skills and knowledge',
    'Build real-world project experience',
    'Network with industry professionals',
    'Develop problem-solving abilities',
    'Gain competitive advantage in job market',
    'Foster innovation and creativity'
  ];

  return (
    <>
      <Helmet>
        <title>Student Programs - EasyIo.tech</title>
        <meta name="description" content="Comprehensive student development programs including upskilling, workshops, hackathons, and research support to prepare students for successful tech careers." />
        <meta name="keywords" content="student programs, upskilling, workshops, hackathons, ideathons, research support, technical training, career development" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-orange-600/10 dark:from-amber-400/5 dark:to-orange-400/5"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Users className="h-4 w-4" />
                Student Programs
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Empowering Students for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600"> Future Success</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Comprehensive programs designed to upskill students, foster innovation, and prepare them for successful careers in technology and beyond.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Join Our Programs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/our-work">
                  <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-900/20 px-8 py-4 text-lg font-semibold rounded-xl">
                    View Student Projects
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
                Comprehensive Student Development
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our programs combine theoretical knowledge with practical experience to prepare students for the challenges of tomorrow.
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
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
                  Building Tomorrow's Leaders
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Our student programs have helped thousands of students develop essential skills, build confidence, and launch successful careers in technology.
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
                      <CheckCircle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
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
                <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-8 text-white">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">5000+</div>
                      <div className="text-amber-100">Students Trained</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">200+</div>
                      <div className="text-amber-100">Workshops Conducted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">85%</div>
                      <div className="text-amber-100">Job Placement Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">50+</div>
                      <div className="text-amber-100">Industry Partners</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Accelerate Your Career?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join our comprehensive student programs and take the first step towards a successful career in technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/our-work">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl">
                    View Alumni Success
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

export default StudentPrograms;
