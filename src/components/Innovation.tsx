
import { Star as Zap, Settings as Globe, User as Smartphone, AlertCircle as Brain } from 'lucide-react';

const Innovation = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Driving Growth Through
            <span className="text-yellow-400"> Digital Innovation</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We leverage cutting-edge technologies and innovative strategies to accelerate your business growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-2">150+</h3>
                <p className="text-gray-300">Projects Completed</p>
              </div>
              <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-2">25+</h3>
                <p className="text-gray-300">Countries Served</p>
              </div>
              <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-2">98%</h3>
                <p className="text-gray-300">Client Satisfaction</p>
              </div>
              <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-2">5+</h3>
                <p className="text-gray-300">Years Experience</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Ready to Transform Your Business?</h3>
              <p className="text-gray-300 mb-8">
                Join hundreds of successful businesses that have chosen us as their digital transformation partner.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Strategic Digital Planning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Custom Development Solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Ongoing Support & Maintenance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Performance Optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovation;
