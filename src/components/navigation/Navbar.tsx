import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/theme-toggle';
import Logo from '@/components/ui/logo';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleToggleMenu();
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { 
      label: 'Services', 
      dropdown: true,
      id: 'services-dropdown',
      items: [
        { path: '/services/web-development', label: 'Web Design & Development' },
        { path: '/services/seo', label: 'SEO Services' },
        { path: '/services/digital-marketing', label: 'Digital Marketing' },
        { path: '/services/brand-design', label: 'Brand Design' },
        { path: '/services/cloud-services', label: 'Cloud Services' },
        { path: '/services/app-development', label: 'Mobile Application' },
      ] 
    },
    { path: '/about', label: 'About' },
    { path: '/portfolio', label: 'Our Work' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  const toggleDropdown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-white/80 dark:bg-transparent backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Logo size="md" />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group">
              {link.dropdown ? (
                <div className="flex items-center">
                  <button
                    onClick={(e) => toggleDropdown(e, link.id)}
                    className={`text-sm font-medium px-2 py-1 transition-colors hover:text-purple-500 flex items-center ${activeDropdown === link.id ? 'text-purple-500' : 'text-gray-700 dark:text-gray-300'}`}
                    aria-expanded={activeDropdown === link.id}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <svg 
                      className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === link.id ? 'rotate-180' : ''}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === link.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-60 bg-white dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl z-50 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-2">
                          {link.items?.map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.path}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to={link.path || '/'}
                  className={`text-sm font-medium px-2 py-1 transition-colors hover:text-purple-500 ${isActive(link.path || '/') ? 'text-purple-500' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
        
        {/* Contact Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to="/contact"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Get a Quote</span>
          </Link>
          
          <ThemeToggle />
          
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-md"
            onClick={() => window.open('tel:+1234567890')}
          >
            <Phone className="h-4 w-4 mr-2" />
            <span>Book a Call</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div 
          className="lg:hidden flex items-center"
          onClick={handleToggleMenu}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
        >
          <div className="space-y-2">
            <span className={`block w-8 h-0.5 bg-gray-700 dark:bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`block w-8 h-0.5 bg-gray-700 dark:bg-white transition-all ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-8 h-0.5 bg-gray-700 dark:bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.dropdown ? (
                    <div className="space-y-2">
                      <button
                        onClick={(e) => toggleDropdown(e, link.id)}
                        className={`flex justify-between items-center w-full py-2 text-base font-medium transition-colors ${activeDropdown === link.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        <span>{link.label}</span>
                        <svg 
                          className={`h-5 w-5 transition-transform ${activeDropdown === link.id ? 'rotate-180' : ''}`} 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === link.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 border-l border-gray-300 dark:border-gray-700 space-y-2"
                          >
                            {link.items?.map((item, idx) => (
                              <Link
                                key={idx}
                                to={item.path}
                                className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path || '/'}
                      className={`block py-2 text-base font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400 ${isActive(link.path || '/') ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-gray-300 dark:border-gray-700 flex flex-col space-y-3">
                <Link
                  to="/contact"
                  className="py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 flex items-center"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Get a Quote
                </Link>
                
                <Link
                  to="/contact"
                  className="py-3 px-4 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all text-center flex items-center justify-center"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Book a Call
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
