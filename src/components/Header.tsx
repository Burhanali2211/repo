
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileNav from './MobileNav';
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
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            easyio <span className="text-yellow-400">✨</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`hover:text-yellow-400 transition-colors ${location.pathname === item.href ? 'text-yellow-400' : 'text-white'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex space-x-4">
            {user ? (
              <>
                <span className="text-white flex items-center">
                  Welcome, {user.firstName}
                </span>
                <Link to="/dashboard">
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
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
