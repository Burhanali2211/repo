import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="container mx-auto px-4 md:px-6" aria-labelledby="cta-heading">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden"
      >
        {/* Background gradient and overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 opacity-90" aria-hidden="true"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 left-0 w-full h-96 bg-white/5 -skew-y-12 translate-y-[-60%]"></div>
          <div className="absolute bottom-0 right-0 w-full h-96 bg-white/5 -skew-y-12 translate-y-[60%]"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 py-12 md:py-16 px-6 md:px-12 text-center">
          <h2 id="cta-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Got any project in mind?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your vision and transform it into reality. Our team is ready to help you achieve your goals.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-white/60 via-white/80 to-white/60 mx-auto rounded-full mb-6"></div>

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
              className="border-white/80 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-purple-900 px-8 py-6 text-lg font-medium rounded-xl flex items-center gap-2 w-full sm:w-auto"
              onClick={() => window.open('tel:+919596418282')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Book a Call
            </Button>

            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 px-8 py-6 text-lg font-medium rounded-xl flex items-center gap-2 w-full sm:w-auto"
              onClick={() => window.open('https://wa.me/+919596418282')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              WhatsApp Support
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">




      </div>
    </section>
  );
};

export default CallToAction;
