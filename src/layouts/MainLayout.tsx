import * as React from 'react';
const { useEffect } = React;
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import { useSettings } from '../hooks/useSettings';

const MainLayout = () => {
  const { settings } = useSettings();
  
  // Update document title when settings change
  useEffect(() => {
    if (settings?.site_name) {
      document.title = settings.site_name;
    }
  }, [settings]);

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
