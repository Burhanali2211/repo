
import React, { useState, useEffect, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "@/components/ErrorBoundary";
import { safeLazyPage, safeLazySection } from "@/lib/utils/safe-lazy-loading";
import { createLazyRoute } from "@/lib/lazy-routes";
import { preloadCommonIcons } from "@/lib/icons";
import { initializePerformanceMonitoring } from "@/lib/performance/monitor";
import PerformanceDashboard from "@/components/PerformanceDashboard";
import { runPerformanceTests } from "@/lib/performance/tests";

// Import React Query directly to avoid lazy loading conflicts
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import stagewise toolbar for development
import { StagewiseToolbar } from "@stagewise/toolbar-react";
import ReactPlugin from "@stagewise-plugins/react";


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

// Core Pages - Optimized lazy loading with intelligent chunking
const HomePage = createLazyRoute(() => import("./pages/Home"), "Home", { preload: true });
const AboutPage = createLazyRoute(() => import("./pages/About"), "About", { preload: true });
const ServicesPage = createLazyRoute(() => import("./pages/Services"), "Services", { preload: true });
const ContactPage = createLazyRoute(() => import("./pages/Contact"), "Contact", { preload: true });

// Secondary Pages - Standard loading
const PortfolioPage = createLazyRoute(() => import("./pages/Portfolio"), "Portfolio");
const OurWorkPage = createLazyRoute(() => import("./pages/OurWork"), "Our Work");
const EnhancedContactPage = createLazyRoute(() => import("./pages/EnhancedContact"), "Enhanced Contact");
const LoginPage = createLazyRoute(() => import("./pages/Login"), "Login");
const RegisterPage = createLazyRoute(() => import("./pages/Register"), "Register");
const BlogPage = createLazyRoute(() => import("./pages/Blog"), "Blog");
const BlogPostPage = createLazyRoute(() => import("./pages/BlogPost"), "Blog Post");
const CareersPage = createLazyRoute(() => import("./pages/Careers"), "Careers");
const NotFoundPage = createLazyRoute(() => import("./pages/NotFound"), "Not Found");

// Legal Pages - Low priority
const PrivacyPage = createLazyRoute(() => import("./pages/Privacy"), "Privacy Policy");
const TermsPage = createLazyRoute(() => import("./pages/Terms"), "Terms of Service");
const CookiesPage = createLazyRoute(() => import("./pages/Cookies"), "Cookie Policy");

// Admin Pages - Separate chunk
const AdminLoginPage = createLazyRoute(() => import("./pages/AdminLogin"), "Admin Login");
const AdminSignupPage = createLazyRoute(() => import("./pages/AdminSignup"), "Admin Signup");

// Settings Pages - Dashboard chunk
const SettingsPage = createLazyRoute(() => import("./pages/Settings"), "Settings");
const SetupSettingsPage = createLazyRoute(() => import("./pages/SetupSettings"), "Setup Settings");

// Additional Pages - Industry focused
const IndustriesPage = createLazyRoute(() => import("./pages/Industries"), "Industries");
const CaseStudiesPage = createLazyRoute(() => import("./pages/CaseStudies"), "Case Studies");
const SitemapPage = createLazyRoute(() => import("./pages/Sitemap"), "Sitemap");

// Service Pages - Grouped for better chunking
const WebDevelopmentPage = createLazyRoute(() => import("./pages/services/WebDevelopment"), "Web Development");
const SEOPage = createLazyRoute(() => import("./pages/services/SEO"), "SEO Services");
const DigitalMarketingPage = createLazyRoute(() => import("./pages/services/DigitalMarketing"), "Digital Marketing");
const BrandDesignPage = createLazyRoute(() => import("./pages/services/BrandDesign"), "Brand Design");
const CloudServicesPage = createLazyRoute(() => import("./pages/services/CloudServices"), "Cloud Services");
const AppDevelopmentPage = createLazyRoute(() => import("./pages/services/AppDevelopment"), "App Development");

// Industry Service Pages - Separate chunk
const AgricultureTechPage = createLazyRoute(() => import("./pages/services/AgricultureTech"), "Agriculture Tech");
const SchoolManagementPage = createLazyRoute(() => import("./pages/services/SchoolManagement"), "School Management");
const BusinessSolutionsPage = createLazyRoute(() => import("./pages/services/BusinessSolutions"), "Business Solutions");
const StudentProgramsPage = createLazyRoute(() => import("./pages/services/StudentPrograms"), "Student Programs");
const TechnicalServicesPage = createLazyRoute(() => import("./pages/services/TechnicalServices"), "Technical Services");
const DigitalTransformationPage = createLazyRoute(() => import("./pages/services/DigitalTransformation"), "Digital Transformation");

// Dynamic Service Detail Page
const ServiceDetailPage = createLazyRoute(() => import("./pages/ServiceDetail"), "Service Details");

// Services Demo Page
const ServicesDemoPage = createLazyRoute(() => import("./pages/ServicesDemo"), "Services Demo");

// No longer needed - Dashboard now handles its own routing

// Safe lazy load animation and common components for better performance
const CustomCursor = safeLazySection(() => import("./components/animations").then(module => ({ default: module.CustomCursor })), "Custom Cursor");
const ScrollProgress = safeLazySection(() => import("./components/common/").then(module => ({ default: module.ScrollProgress })), "Scroll Progress");
const ParticleBackground = safeLazySection(() => import("./components/animations").then(module => ({ default: module.ParticleBackground })), "Particle Background");
import { safeExecute } from "@/lib/utils/safe-access";

// Create a loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
  </div>
);

// Create query client directly to avoid lazy loading issues
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
  const [showPerformanceDashboard, setShowPerformanceDashboard] = useState(
    process.env.NODE_ENV === 'development'
  );

  // Set loaded state after initial render to enable animations
  useEffect(() => {
    // Small delay to ensure smooth animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Preload common icons and initialize performance monitoring
  useEffect(() => {
    // Preload commonly used icons immediately
    preloadCommonIcons();

    // Initialize performance monitoring
    initializePerformanceMonitoring();

    const timer = setTimeout(() => {
      // Run performance tests in development
      if (process.env.NODE_ENV === 'development') {
        runPerformanceTests().then(results => {
          console.log('🎯 Performance test results:', results);
        }).catch(error => {
          console.warn('Performance tests failed:', error);
        });
      }

      // Optional legacy performance monitoring
      try {
        import("@/utils/performanceMonitor").then(({ measureWebVitals, sendPerformanceToAnalytics }) => {
          measureWebVitals(sendPerformanceToAnalytics);
        }).catch(() => {
          // Silently fail if performance monitoring is not available
        });
      } catch (error) {
        // Silently fail
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Suspense fallback={<PageLoader />}>
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

                              {/* Animation and interactive components - lazy loaded */}
                              <Suspense fallback={null}>
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
                              </Suspense>

                              <Suspense fallback={null}>
                                <ParticleBackground
                                  particleCount={30}
                                  connectParticles={true}
                                  connectDistance={100}
                                  particleSpeed={0.3}
                                  maxFPS={30}
                                />
                              </Suspense>

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
                                        <Route path="/services-demo" element={<ServicesDemoPage />} />
                                        <Route path="/services/web-development" element={<WebDevelopmentPage />} />
                                        <Route path="/services/seo" element={<SEOPage />} />
                                        <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
                                        <Route path="/services/brand-design" element={<BrandDesignPage />} />
                                        <Route path="/services/cloud-services" element={<CloudServicesPage />} />
                                        <Route path="/services/app-development" element={<AppDevelopmentPage />} />
                                        <Route path="/services/agriculture-tech" element={<AgricultureTechPage />} />
                                        <Route path="/services/school-management" element={<SchoolManagementPage />} />
                                        <Route path="/services/business-solutions" element={<BusinessSolutionsPage />} />
                                        <Route path="/services/student-programs" element={<StudentProgramsPage />} />
                                        <Route path="/services/technical-services" element={<TechnicalServicesPage />} />
                                        <Route path="/services/digital-transformation" element={<DigitalTransformationPage />} />
                                        {/* Dynamic service detail route */}
                                        <Route path="/services/:slug" element={<ServiceDetailPage />} />
                                        <Route path="/portfolio" element={<PortfolioPage />} />
                                        <Route path="/our-work" element={<OurWorkPage />} />
                                        <Route path="/contact" element={<ContactPage />} />
                                        <Route path="/contact-enhanced" element={<EnhancedContactPage />} />
                                        <Route path="/blog" element={<BlogPage />} />
                                        <Route path="/blog/:id" element={<BlogPostPage />} />
                                        <Route path="/careers" element={<CareersPage />} />
                                        <Route path="/industries" element={<IndustriesPage />} />
                                        <Route path="/case-studies" element={<CaseStudiesPage />} />
                                        <Route path="/sitemap" element={<SitemapPage />} />
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

                              {/* Performance Dashboard - Development only */}
                              {showPerformanceDashboard && (
                                <PerformanceDashboard
                                  isVisible={showPerformanceDashboard}
                                  onToggle={() => setShowPerformanceDashboard(!showPerformanceDashboard)}
                                />
                              )}

                              {/* Stagewise Toolbar - Development only */}
                              {process.env.NODE_ENV === 'development' && (
                                <StagewiseToolbar
                                  config={{
                                    plugins: [ReactPlugin]
                                  }}
                                />
                              )}
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
        </Suspense>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
