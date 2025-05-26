import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <>
      <footer className="bg-black text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">easyio</h3>
              <p className="text-gray-400 mb-6">
                Transforming businesses through innovative digital solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Services</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white">Web Design</a></li>
                <li><a href="#" className="hover:text-white">Development</a></li>
                <li><a href="#" className="hover:text-white">Digital Marketing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Our Work</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Contact Info</h3>
              <div className="space-y-4 text-gray-400">
                <a href="mailto:hello@easyio.tech" className="hover:text-white">
                  hello@easyio.tech
                </a>
                <div>
                  <p>+1 (555) 123-4567</p>
                  <p>123 Business St, Digital City</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>&copy; 2024 easyio. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center"
        aria-label="Back to top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </>
  );
};

export default Footer;
