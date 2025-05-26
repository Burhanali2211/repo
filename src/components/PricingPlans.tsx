
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$2,999',
    period: 'one-time',
    description: 'Perfect for small businesses getting started online',
    features: [
      'Responsive website design',
      'Up to 5 pages',
      'Basic SEO optimization',
      'Contact form integration',
      '30 days support',
      'Mobile optimization'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '$5,999',
    period: 'one-time',
    description: 'Ideal for growing businesses with advanced needs',
    features: [
      'Custom web application',
      'Up to 15 pages',
      'Advanced SEO package',
      'E-commerce integration',
      'CMS implementation',
      '90 days support',
      'Analytics setup',
      'Social media integration'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$12,999+',
    period: 'project-based',
    description: 'For large organizations requiring custom solutions',
    features: [
      'Fully custom development',
      'Unlimited pages',
      'Enterprise SEO strategy',
      'Advanced integrations',
      'User authentication',
      '6 months support',
      'Performance optimization',
      'Security auditing',
      'Team training'
    ],
    popular: false
  }
];

const PricingPlans = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white border rounded-2xl p-8 ${
                plan.popular 
                  ? 'border-purple-500 shadow-xl scale-105' 
                  : 'border-gray-200 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/ {plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full py-4 text-lg font-semibold ${
                  plan.popular
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need a custom solution? Let's discuss your specific requirements.
          </p>
          <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
            Contact for Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
