import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden"
      >
        {/* Background gradient and overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 opacity-90"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-96 bg-white/5 -skew-y-12 translate-y-[-60%]"></div>
          <div className="absolute bottom-0 right-0 w-full h-96 bg-white/5 -skew-y-12 translate-y-[60%]"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 py-16 md:py-20 px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Got any project in mind?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Let's discuss your vision and transform it into reality. Our team is ready to help you achieve your goals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link to="/contact">
              <Button 
                className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-6 text-lg font-medium rounded-xl flex items-center gap-2 w-full sm:w-auto"
              >
                <MessageSquare className="h-5 w-5" />
                Get a Quote
              </Button>
            </Link>
            
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-6 text-lg font-medium rounded-xl flex items-center gap-2 w-full sm:w-auto"
              onClick={() => window.open('tel:+1234567890')}
            >
              <Phone className="h-5 w-5" />
              Book a Call
            </Button>
            
            <Button 
              variant="ghost"
              className="text-white hover:bg-white/10 px-8 py-6 text-lg font-medium rounded-xl flex items-center gap-2 w-full sm:w-auto"
              onClick={() => window.open('https://wa.me/1234567890')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              WhatsApp Support
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center shadow-md dark:shadow-none"
        >
          <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">3000+</div>
          <p className="text-gray-700 dark:text-gray-300">Projects Completed</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center shadow-md dark:shadow-none"
        >
          <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">Dedicated</div>
          <p className="text-gray-700 dark:text-gray-300">24/7 Support Team</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center shadow-md dark:shadow-none"
        >
          <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">Assured</div>
          <p className="text-gray-700 dark:text-gray-300">100% Satisfaction Guarantee</p>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;
