
import React, { useState, useEffect, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "@/components/ErrorBoundary";
import { safeLazyPage, safeLazySection } from "@/lib/utils/safe-lazy-loading";

// Import React Query directly to avoid lazy loading conflicts
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


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

// Pages - Safe lazy loaded for better performance and error handling
const HomePage = safeLazyPage(() => import("./pages/Home"), "Home");
const AboutPage = safeLazyPage(() => import("./pages/About"), "About");
const ServicesPage = safeLazyPage(() => import("./pages/Services"), "Services");
const PortfolioPage = safeLazyPage(() => import("./pages/Portfolio"), "Portfolio");
const OurWorkPage = safeLazyPage(() => import("./pages/OurWork"), "Our Work");
const ContactPage = safeLazyPage(() => import("./pages/Contact"), "Contact");
const EnhancedContactPage = safeLazyPage(() => import("./pages/EnhancedContact"), "Enhanced Contact");
const LoginPage = safeLazyPage(() => import("./pages/Login"), "Login");
const RegisterPage = safeLazyPage(() => import("./pages/Register"), "Register");
const AdminLoginPage = safeLazyPage(() => import("./pages/AdminLogin"), "Admin Login");
const AdminSignupPage = safeLazyPage(() => import("./pages/AdminSignup"), "Admin Signup");
const SettingsPage = safeLazyPage(() => import("./pages/Settings"), "Settings");
const NotFoundPage = safeLazyPage(() => import("./pages/NotFound"), "Not Found");
const BlogPage = safeLazyPage(() => import("./pages/Blog"), "Blog");
const BlogPostPage = safeLazyPage(() => import("./pages/BlogPost"), "Blog Post");
const CareersPage = safeLazyPage(() => import("./pages/Careers"), "Careers");
const PrivacyPage = safeLazyPage(() => import("./pages/Privacy"), "Privacy Policy");
const TermsPage = safeLazyPage(() => import("./pages/Terms"), "Terms of Service");
const CookiesPage = safeLazyPage(() => import("./pages/Cookies"), "Cookie Policy");
const SetupSettingsPage = safeLazyPage(() => import("./pages/SetupSettings"), "Setup Settings");

// New pages for missing routes
const IndustriesPage = safeLazyPage(() => import("./pages/Industries"), "Industries");
const CaseStudiesPage = safeLazyPage(() => import("./pages/CaseStudies"), "Case Studies");
const SitemapPage = safeLazyPage(() => import("./pages/Sitemap"), "Sitemap");

// Service Pages
const WebDevelopmentPage = safeLazyPage(() => import("./pages/services/WebDevelopment"), "Web Development");
const SEOPage = safeLazyPage(() => import("./pages/services/SEO"), "SEO Services");
const DigitalMarketingPage = safeLazyPage(() => import("./pages/services/DigitalMarketing"), "Digital Marketing");
const BrandDesignPage = safeLazyPage(() => import("./pages/services/BrandDesign"), "Brand Design");
const CloudServicesPage = safeLazyPage(() => import("./pages/services/CloudServices"), "Cloud Services");
const AppDevelopmentPage = safeLazyPage(() => import("./pages/services/AppDevelopment"), "App Development");

// New Service Pages
const AgricultureTechPage = safeLazyPage(() => import("./pages/services/AgricultureTech"), "Agriculture Tech");
const SchoolManagementPage = safeLazyPage(() => import("./pages/services/SchoolManagement"), "School Management");
const BusinessSolutionsPage = safeLazyPage(() => import("./pages/services/BusinessSolutions"), "Business Solutions");
const StudentProgramsPage = safeLazyPage(() => import("./pages/services/StudentPrograms"), "Student Programs");
const TechnicalServicesPage = safeLazyPage(() => import("./pages/services/TechnicalServices"), "Technical Services");
const DigitalTransformationPage = safeLazyPage(() => import("./pages/services/DigitalTransformation"), "Digital Transformation");

// Dynamic Service Detail Page
const ServiceDetailPage = safeLazyPage(() => import("./pages/ServiceDetail"), "Service Details");

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

  // Set loaded state after initial render to enable animations
  useEffect(() => {
    // Small delay to ensure smooth animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Simple performance monitoring
  useEffect(() => {
    const timer = setTimeout(() => {
      // Optional performance monitoring
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
