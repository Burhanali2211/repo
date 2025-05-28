
import React from 'react';
import { Target, Users, Award, Clock } from 'lucide-react';

const About = () => {
  const timeline = [
    { year: '2023', title: 'EasyIo.tech Founded', description: 'Started with a vision to simplify technology and make it accessible to everyone' },
    { year: '2023', title: 'First IoT Solutions', description: 'Launched our first smart agriculture and automation projects' },
    { year: '2024', title: 'Student Programs Launch', description: 'Introduced comprehensive student upskill programs and workshops' },
    { year: '2024', title: 'Business Solutions Expansion', description: 'Expanded into comprehensive business process solutions and ERP systems' },
    { year: '2024', title: 'Sustainability Focus', description: 'Committed to sustainable technology solutions that are kind to the planet' }
  ];

  const values = [
    { icon: Target, title: 'Simplicity Driven', description: 'We believe simplicity drives innovation and makes technology accessible' },
    { icon: Users, title: 'Partnership Focused', description: 'Your creative tech partner in shaping the future together' },
    { icon: Award, title: 'Sustainability', description: 'Technology solutions that are kind to the planet and meaningful' },
    { icon: Clock, title: 'Innovation', description: 'Cutting through complexity to build tools that work beautifully' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-600 to-indigo-700 text-white dark:from-indigo-800 dark:to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-amber-300 dark:text-amber-300">EasyIo.tech</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Founded in 2023, we're dedicated to simplifying technology and making it more accessible,
            sustainable, and meaningful for everyone. From bold ideas to business transformation,
            we're your creative tech partner.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission & Vision</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                At EasyIo.tech, we envision a world where technology meets sustainability—driving progress that's both innovative and responsible. Our mission is to transform your ideas into reality, whether you're a start-up shaping the future or a student building your first prototype.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We empower businesses to streamline their technology and stay ahead, while nurturing a new generation of thinkers and innovators. Through smart solutions and a commitment to impact, EasyIo.tech is making innovation accessible, meaningful, and enduring.
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

      {/* Company Story Section */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Founded in 2023, EasyIo.tech is built on the belief that simplicity drives innovation. We believe technology should empower, not overwhelm. That's why we're dedicated to simplifying technology—making it more accessible, sustainable, and meaningful for everyone.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              From turning your bold ideas into reality to helping businesses run smarter and students think like innovators, we create solutions that are easy to use, powerful in impact, and kind to the planet. Whether it's IoT, Automation, or Digital transformation, we're your creative tech partner—cutting through complexity to build tools that work beautifully and simply.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              At EasyIo.tech, we don't just keep up with the future. We help you shape it.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-200 dark:from-gray-900 dark:to-black">
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
