
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/our-work", label: "Our Work" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <>
      <div className="flex items-center space-x-2 md:hidden">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 sm:p-6">
              <Link to="/" className="text-xl sm:text-2xl font-bold text-white">
                easyio <span className="text-yellow-400">✨</span>
              </Link>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <nav className="flex-1 px-4 sm:px-6">
              <ul className="space-y-4 sm:space-y-6">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block text-lg sm:text-xl transition-colors w-full text-left py-2 ${location.pathname === item.href ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                        }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                {user ? (
                  <>
                    <div className="text-white text-center py-2">
                      Welcome, {user.firstName}
                    </div>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                        Dashboard
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-black">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
