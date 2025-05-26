
import React from 'react';
import { Building2, ShoppingCart, Heart, GraduationCap, Car, Utensils } from 'lucide-react';

const industries = [
  { icon: Building2, name: 'Real Estate', count: '25+ Projects' },
  { icon: ShoppingCart, name: 'E-commerce', count: '40+ Projects' },
  { icon: Heart, name: 'Healthcare', count: '15+ Projects' },
  { icon: GraduationCap, name: 'Education', count: '20+ Projects' },
  { icon: Car, name: 'Automotive', count: '12+ Projects' },
  { icon: Utensils, name: 'Food & Beverage', count: '18+ Projects' }
];

const Industries = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Industries We Serve
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We've helped businesses across various industries achieve their digital transformation goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <industry.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{industry.name}</h3>
              <p className="text-gray-600">{industry.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
