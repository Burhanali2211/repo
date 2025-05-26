
import React from 'react';
import { Sparkles, Eye, Heart } from 'lucide-react';

const Design = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-3xl p-8 transform rotate-3">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop" 
                alt="Design process"
                className="rounded-2xl w-full h-64 object-cover transform -rotate-3"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Creative Excellence</h4>
                  <p className="text-gray-600 text-sm">Award-winning designs</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Designs That Speak, Strategies That Perform
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We believe powerful design and unique storytelling create emotional connections that drive business success. Every pixel has a purpose.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Visual Impact</h3>
                  <p className="text-gray-600">Designs that capture attention and communicate your brand's essence at first glance.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Emotional Connection</h3>
                  <p className="text-gray-600">Storytelling that resonates with your audience and builds lasting relationships.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Creative Innovation</h3>
                  <p className="text-gray-600">Pushing boundaries with fresh ideas that set your brand apart from the competition.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Design;
