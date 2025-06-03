
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileNav from './MobileNav';
import ThemeToggle from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Don't show header on dashboard
  if (location.pathname === '/dashboard') {
    return null;
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/our-work", label: "Our Work" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-white flex-shrink-0">
            easyio <span className="text-yellow-400">✨</span>
          </Link>

          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`hover:text-yellow-400 transition-colors text-sm lg:text-base ${location.pathname === item.href ? 'text-yellow-400' : 'text-white'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <ThemeToggle />
            {user ? (
              <>
                <span className="text-white flex items-center text-sm lg:text-base">
                  Welcome, {user.firstName}
                </span>
                <Link to="/dashboard">
                  <Button size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500">
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-black">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <MobileNav />
        </nav>
      </div>
    </header>
  );
};

export default Header;
