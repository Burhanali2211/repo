
import React from 'react';
import { BarChart3, Users, Lightbulb, Rocket } from 'lucide-react';

const Strategy = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              We create digital strategy experiences
              <span className="text-yellow-400"> based on business analysis</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Our strategic approach combines deep market analysis with innovative thinking to create experiences that drive business growth and customer engagement.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-2">Analytics</h3>
                <p className="text-gray-400 text-sm">Data-driven insights</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-2">Research</h3>
                <p className="text-gray-400 text-sm">Market understanding</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-2">Innovation</h3>
                <p className="text-gray-400 text-sm">Creative solutions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-2">Growth</h3>
                <p className="text-gray-400 text-sm">Scalable results</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8">
              <div className="rounded-2xl w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-6">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <div className="text-lg font-semibold">Analytics Dashboard</div>
                  <div className="text-sm opacity-80">Data-Driven Insights</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-white">
                  <span>Conversion Rate</span>
                  <span className="font-bold">+24%</span>
                </div>
                <div className="flex items-center justify-between text-white">
                  <span>User Engagement</span>
                  <span className="font-bold">+67%</span>
                </div>
                <div className="flex items-center justify-between text-white">
                  <span>Revenue Growth</span>
                  <span className="font-bold">+45%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Strategy;
