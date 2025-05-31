
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Import router configuration to handle React Router v7 warnings
import { configureRouterOptions, ROUTER_FUTURE_FLAGS } from "@/lib/router-config";
import ErrorBoundary from "@/components/ErrorBoundary";

// Configure React Router v7 future flags on app startup
if (typeof window !== 'undefined') {
  configureRouterOptions();
}
import { AuthProvider } from "./contexts/AuthContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { DataProvider } from "./contexts/DataContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SettingsProvider, SettingsStyleProvider, SettingsScriptInjector, MaintenanceMode } from "./contexts/SettingsContext";
import FaviconInjector from "./components/ui/favicon-injector";
import { ProtectedRoute } from "./components/common";
import { SupabaseProvider, SupabaseInitializer } from "./lib/supabase/context";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./pages/Dashboard";

// Pages - Lazy loaded for better performance
const HomePage = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const ServicesPage = lazy(() => import("./pages/Services"));
const PortfolioPage = lazy(() => import("./pages/Portfolio"));
const OurWorkPage = lazy(() => import("./pages/OurWork"));
const ContactPage = lazy(() => import("./pages/Contact"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const AdminLoginPage = lazy(() => import("./pages/AdminLogin"));
const AdminSignupPage = lazy(() => import("./pages/AdminSignup"));
const SettingsPage = lazy(() => import("./pages/Settings"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const BlogPage = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const CareersPage = lazy(() => import("./pages/Careers"));
const PrivacyPage = lazy(() => import("./pages/Privacy"));
const TermsPage = lazy(() => import("./pages/Terms"));
const CookiesPage = lazy(() => import("./pages/Cookies"));
const SetupSettingsPage = lazy(() => import("./pages/SetupSettings"));

// Service Pages
const WebDevelopmentPage = lazy(() => import("./pages/services/WebDevelopment"));
const SEOPage = lazy(() => import("./pages/services/SEO"));
const DigitalMarketingPage = lazy(() => import("./pages/services/DigitalMarketing"));
const BrandDesignPage = lazy(() => import("./pages/services/BrandDesign"));
const CloudServicesPage = lazy(() => import("./pages/services/CloudServices"));
const AppDevelopmentPage = lazy(() => import("./pages/services/AppDevelopment"));

// No longer needed - Dashboard now handles its own routing

// Animation and common components
import { CustomCursor, ParticleBackground } from "./components/animations";
import { ScrollProgress } from "./components/common/";

// Create a loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
  </div>
);

// Configure the query client with better caching and error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Set loaded state after initial render to enable animations
  useEffect(() => {
    // Small delay to ensure smooth animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider defaultTheme="light">
            <SupabaseProvider>
              <SupabaseInitializer>
                <AuthProvider>
                  <AdminAuthProvider>
                    <SettingsProvider>
                      <SettingsStyleProvider />
                      <SettingsScriptInjector />
                      <FaviconInjector />
                      <MaintenanceMode>
                        <DataProvider>
                          {/* Toast notifications */}
                          <Toaster />
                          <Sonner />

                          {/* Animation and interactive components */}
                          <CustomCursor
                            size={16}
                            color="rgba(138, 43, 226, 0.6)"
                            trailColor="rgba(138, 43, 226, 0.2)"
                            showOnMobile={false}
                            trailLength={3}
                          />

                          <ScrollProgress
                            color="bg-gradient-to-r from-yellow-400 to-purple-600"
                            height={3}
                            position="top"
                          />

                          <ParticleBackground
                            particleCount={30}
                            connectParticles={true}
                            connectDistance={100}
                            particleSpeed={0.3}
                            maxFPS={30}
                          />

                          {/* Main content with transition */}
                          <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                            <BrowserRouter>
                              <Suspense fallback={<PageLoader />}>
                                <Routes>
                                  {/* Main Layout Routes */}
                                  <Route element={<MainLayout />}>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/about" element={<AboutPage />} />
                                    <Route path="/services" element={<ServicesPage />} />
                                    <Route path="/services/web-development" element={<WebDevelopmentPage />} />
                                    <Route path="/services/seo" element={<SEOPage />} />
                                    <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
                                    <Route path="/services/brand-design" element={<BrandDesignPage />} />
                                    <Route path="/services/cloud-services" element={<CloudServicesPage />} />
                                    <Route path="/services/app-development" element={<AppDevelopmentPage />} />
                                    <Route path="/portfolio" element={<PortfolioPage />} />
                                    <Route path="/our-work" element={<OurWorkPage />} />
                                    <Route path="/contact" element={<ContactPage />} />
                                    <Route path="/blog" element={<BlogPage />} />
                                    <Route path="/blog/:id" element={<BlogPostPage />} />
                                    <Route path="/careers" element={<CareersPage />} />
                                    <Route path="/privacy" element={<PrivacyPage />} />
                                    <Route path="/terms" element={<TermsPage />} />
                                    <Route path="/cookies" element={<CookiesPage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/register" element={<RegisterPage />} />
                                    <Route path="/admin/login" element={<AdminLoginPage />} />
                                    <Route path="/admin/signup" element={<AdminSignupPage />} />
                                  </Route>

                                  {/* Dashboard Route */}
                                  <Route path="/dashboard" element={
                                    <ProtectedRoute>
                                      <DashboardLayout />
                                    </ProtectedRoute>
                                  } />

                                  {/* Setup Settings Route */}
                                  <Route path="/setup-settings" element={
                                    <ProtectedRoute>
                                      <SetupSettingsPage />
                                    </ProtectedRoute>
                                  } />

                                  {/* Redirect legacy Index to Home */}
                                  <Route path="/index" element={<Navigate to="/" replace />} />

                                  {/* 404 Route */}
                                  <Route path="*" element={<NotFoundPage />} />
                                </Routes>
                              </Suspense>
                            </BrowserRouter>
                          </div>
                        </DataProvider>
                      </MaintenanceMode>
                    </SettingsProvider>
                  </AdminAuthProvider>
                </AuthProvider>
              </SupabaseInitializer>
            </SupabaseProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
