
import React from 'react';
import { Target, Users, Award, Clock } from 'lucide-react';

const About = () => {
  const timeline = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to transform digital experiences' },
    { year: '2021', title: 'First Major Client', description: 'Landed our first enterprise client and scaled the team' },
    { year: '2022', title: 'Award Recognition', description: 'Won Digital Agency of the Year award' },
    { year: '2023', title: 'Global Expansion', description: 'Opened offices in 3 new countries' },
    { year: '2024', title: 'AI Integration', description: 'Pioneered AI-driven design and development solutions' }
  ];

  const values = [
    { icon: Target, title: 'Mission-Driven', description: 'We believe in creating digital solutions that make a real impact' },
    { icon: Users, title: 'Client-Focused', description: 'Your success is our success. We build lasting partnerships' },
    { icon: Award, title: 'Excellence', description: 'We strive for perfection in every project we undertake' },
    { icon: Clock, title: 'Innovation', description: 'Always pushing boundaries with cutting-edge technology' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-600 to-indigo-700 text-white dark:from-indigo-800 dark:to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-amber-300 dark:text-amber-300">easyio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're a team of passionate digital creators dedicated to helping businesses 
            transform their digital presence and achieve extraordinary results.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                To easyio businesses of all sizes to thrive in the digital age by providing 
                innovative, scalable, and results-driven solutions that exceed expectations.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We believe that great design and technology should be accessible to everyone, 
                and we're committed to making that vision a reality.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                alt="Team collaboration"
                className="rounded-lg shadow-2xl dark:border dark:border-gray-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we work with our clients.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Journey</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From a small startup to an award-winning agency, here's how we've grown.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center mb-12 last:mb-0">
                <div className="flex-shrink-0 w-20 h-20 bg-purple-600 dark:bg-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-8">
                  {item.year}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
