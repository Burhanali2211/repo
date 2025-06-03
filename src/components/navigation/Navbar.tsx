import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/theme-toggle';
import Logo from '@/components/ui/logo';

// Type definitions for better type safety
interface NavItem {
  path?: string;
  label: string;
  dropdown?: boolean;
  id?: string;
  items?: Array<{
    path: string;
    label: string;
  }>;
}

// Memoized Navigation Item Component for better performance
const NavigationItem = React.memo(({
  link,
  isActive,
  activeDropdown,
  toggleDropdown
}: {
  link: NavItem;
  isActive: (path: string) => boolean;
  activeDropdown: string | null;
  toggleDropdown: (e: React.MouseEvent, id: string) => void;
}) => {
  if (link.dropdown) {
    return (
      <div className="flex items-center">
        <motion.button
          onClick={(e: React.MouseEvent) => toggleDropdown(e, link.id!)}
          className={`
            relative text-sm lg:text-base font-semibold px-3 py-2 rounded-lg
            transition-all duration-200 ease-out flex items-center
            hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50
            dark:hover:from-purple-900/20 dark:hover:to-blue-900/20
            hover:shadow-sm
            ${activeDropdown === link.id
              ? 'text-purple-600 dark:text-purple-400 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
              : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
            }
          `}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.995 }}
          transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
          aria-expanded={activeDropdown === link.id}
          aria-haspopup="true"
        >
          <span className="relative z-10">{link.label}</span>
          <motion.svg
            className="ml-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            animate={{ rotate: activeDropdown === link.id ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </motion.svg>
        </motion.button>

        <AnimatePresence>
          {activeDropdown === link.id && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 mt-3 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-400/20 z-50 overflow-hidden"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="p-2">
                {link.items?.map((item: { path: string; label: string }, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-sm"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
    >
      <Link
        to={link.path || '/'}
        className={`
          relative text-sm lg:text-base font-semibold px-3 py-2 rounded-lg
          transition-all duration-200 ease-out block
          hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50
          dark:hover:from-purple-900/20 dark:hover:to-blue-900/20
          hover:shadow-sm
          ${isActive(link.path || '/')
            ? 'text-purple-600 dark:text-purple-400 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
            : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
          }
        `}
      >
        <span className="relative z-10">{link.label}</span>
        {isActive(link.path || '/') && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-800/30 dark:to-blue-800/30 rounded-lg"
            initial={false}
            transition={{ type: "tween", duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
          />
        )}
      </Link>
    </motion.div>
  );
});

NavigationItem.displayName = 'NavigationItem';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isScrollingUp, setIsScrollingUp] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const location = React.useMemo(() => ({ pathname: window.location.pathname }), []);



  // Optimized scroll effect with better performance
  const handleScroll = React.useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 20;
    const hideThreshold = 10;

    // Batch state updates for better performance
    const newIsScrolled = currentScrollY > scrollThreshold;
    const newIsScrollingUp = currentScrollY < lastScrollY || currentScrollY < hideThreshold;

    // Only update if values actually changed
    if (newIsScrolled !== isScrolled) {
      setIsScrolled(newIsScrolled);
    }
    if (newIsScrollingUp !== isScrollingUp) {
      setIsScrollingUp(newIsScrollingUp);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, isScrolled, isScrollingUp]);

  React.useEffect(() => {
    let ticking = false;
    let timeoutId: NodeJS.Timeout;

    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Debounce for additional performance on rapid scrolling
    const debouncedScrollHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(optimizedScrollHandler, 10);
    };

    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Close mobile menu and dropdowns when route changes
  React.useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
    return undefined;
  }, [activeDropdown]);

  // Enhanced mobile menu toggle with animation and focus management
  const handleToggleMenu = React.useCallback(() => {
    setIsMenuOpen((prev: boolean) => {
      const newState = !prev;
      // Close any open dropdowns when opening mobile menu
      if (newState) {
        setActiveDropdown(null);
      }
      return newState;
    });
  }, []);

  // Enhanced keyboard navigation with better performance
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleToggleMenu();
        break;
      case 'Escape':
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
        if (activeDropdown) {
          setActiveDropdown(null);
        }
        break;
    }
  }, [handleToggleMenu, isMenuOpen, activeDropdown]);

  // Memoized navigation links for better performance
  const navLinks = React.useMemo(() => [
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
    { path: '/our-work', label: 'Our Work' },
    { path: '/contact', label: 'Contact' },
  ], []);

  // Memoized active state checker for better performance
  const isActive = React.useCallback((path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  }, [location.pathname]);

  // Optimized dropdown toggle with better event handling
  const toggleDropdown = React.useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveDropdown((prev: string | null) => prev === id ? null : id);
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{
        y: isScrolled && !isScrollingUp ? -100 : 0,
        scale: isScrolled ? 0.995 : 1
      }}
      transition={{
        duration: 0.3,
        ease: [0.25, 1, 0.5, 1],
        type: "tween"
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 navbar-optimized ${isScrolled
        ? 'pt-2 px-2 md:pt-3 md:px-4'
        : 'pt-0 px-0'
        }`}
    >
      <div className="flex justify-center w-full">
        <div className={`
          ${isScrolled
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-400/20 rounded-2xl border border-white/20 dark:border-gray-700/50 w-[95%] max-w-7xl'
            : 'bg-white/80 dark:bg-transparent backdrop-blur-sm w-full'
          }
          transition-all duration-500 ease-out
        `}>
          <div className={`
            ${isScrolled ? 'max-w-6xl mx-auto' : 'container-safe mx-auto'}
            px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between mobile-safe
          `}>
            {/* Logo */}
            <Logo size="md" />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              {navLinks.map((link: NavItem, index: number) => (
                <div key={index} className="relative group">
                  <NavigationItem
                    link={link}
                    isActive={isActive}
                    activeDropdown={activeDropdown}
                    toggleDropdown={toggleDropdown}
                  />
                </div>
              ))}
            </div>

            {/* Contact Actions */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              <motion.div
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/contact"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 hover:shadow-md"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden xl:inline">Get a Quote</span>
                  <span className="xl:hidden">Quote</span>
                </Link>
              </motion.div>

              <div className="flex items-center">
                <ThemeToggle />
              </div>

              <motion.div
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-4 xl:px-6 py-2"
                  onClick={() => window.open('tel:+1234567890')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="hidden xl:inline">Book a Call</span>
                  <span className="xl:hidden">Call</span>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.div
              className="lg:hidden flex items-center p-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300"
              onClick={handleToggleMenu}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-8 h-6 flex flex-col justify-center">
                <motion.span
                  className="block w-8 h-0.5 bg-gray-700 dark:bg-white rounded-full"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="block w-8 h-0.5 bg-gray-700 dark:bg-white rounded-full mt-1.5"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                    x: isMenuOpen ? 10 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="block w-8 h-0.5 bg-gray-700 dark:bg-white rounded-full mt-1.5"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className={`lg:hidden overflow-hidden ${isScrolled
              ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-b-2xl border-t border-white/20 dark:border-gray-700/50'
              : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
              }`}
          >
            <div className="flex justify-center w-full">
              <div className={`
                ${isScrolled ? 'w-[95%] max-w-7xl' : 'w-full'}
                transition-all duration-500 ease-out
              `}>
                <div className={`
                ${isScrolled ? 'max-w-6xl mx-auto' : 'container-safe mx-auto'}
                px-3 sm:px-4 md:px-6 py-6 space-y-4 mobile-safe
              `}>
                  {navLinks.map((link: NavItem, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                    >
                      {link.dropdown ? (
                        <div className="space-y-3">
                          <motion.button
                            onClick={(e: React.MouseEvent) => toggleDropdown(e, link.id!)}
                            className={`flex justify-between items-center w-full py-3 px-4 text-base font-semibold transition-all duration-200 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 ${activeDropdown === link.id
                              ? 'text-purple-600 dark:text-purple-400 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
                              : 'text-gray-700 dark:text-gray-300'
                              }`}
                            whileTap={{ scale: 0.995 }}
                            transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
                          >
                            <span>{link.label}</span>
                            <motion.svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              animate={{ rotate: activeDropdown === link.id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </motion.svg>
                          </motion.button>

                          <AnimatePresence>
                            {activeDropdown === link.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="ml-4 pl-4 border-l-2 border-purple-400 space-y-2"
                              >
                                {link.items?.map((item: { path: string; label: string }, idx: number) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                  >
                                    <Link
                                      to={item.path}
                                      className="block py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20"
                                    >
                                      {item.label}
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <motion.div whileTap={{ scale: 0.98 }}>
                          <Link
                            to={link.path || '/'}
                            className={`block py-3 px-4 text-base font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 ${isActive(link.path || '/')
                              ? 'text-purple-600 dark:text-purple-400 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
                              : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                              }`}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  <motion.div
                    className="pt-6 mt-6 border-t border-purple-200 dark:border-purple-800 flex flex-col space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    {/* Theme Toggle for Mobile */}
                    <motion.div
                      className="flex items-center justify-between py-3 px-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20"
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                        Theme
                      </span>
                      <ThemeToggle />
                    </motion.div>

                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/contact"
                        className="flex items-center py-3 px-4 text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20"
                      >
                        <MessageSquare className="h-5 w-5 mr-3" />
                        Get a Quote
                      </Link>
                    </motion.div>

                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/contact"
                        className="flex items-center justify-center py-4 px-6 text-base font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Book a Call
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
