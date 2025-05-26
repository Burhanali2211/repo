
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell,
  Heart,
  Star,
  AlertCircle,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
// Admin auth will be implemented when database functions are ready
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Dashboard Components
import ProjectsManager from '@/components/dashboard/ProjectsManager';
import ServicesManager from '@/components/dashboard/ServicesManager';
import TestimonialsManager from '@/components/dashboard/TestimonialsManager';
import WhatWeDoManager from '@/components/dashboard/WhatWeDoManager';
import AboutContentManager from '@/components/dashboard/AboutContentManager';
import SettingsManager from '@/components/dashboard/SettingsManager';

/**
 * Dashboard Component
 * 
 * This component serves as the main dashboard interface, providing access to various
 * content management components (ProjectsManager, ServicesManager, etc.).
 */
const Dashboard = () => {
  // State and hooks
  const [activeTab, setActiveTab] = useState('overview');
  const { user, isLoading, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Authentication check
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
      return;
    }
    
    // If user exists, check if they have admin role
    const checkAdminRole = async () => {
      if (user) {
        // First check the user metadata from Auth (most reliable source)
        if (user.role === 'admin') {
          // User is an admin in Auth metadata, allow access
          return;
        }
        
        // Fallback: Check if the user is an admin in the profiles table
        try {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
            
          // If they're an admin in the profiles table, allow access
          if (!error && profileData?.role === 'admin') {
            return;
          }
        } catch (err) {
          console.error('Error checking admin role in profiles:', err);
        }
        
        // As a final fallback, check the is_admin function if it exists
        try {
          const { data: isAdminData, error: isAdminError } = await supabase.rpc(
            'is_admin',
            { user_id: user.id }
          );
          
          if (!isAdminError && isAdminData === true) {
            return;
          }
        } catch (err) {
          console.error('Error checking is_admin function:', err);
        }
        
        // If we get here, the user is not an admin by any check
        toast({
          title: "Admin Access Required",
          description: "You need administrator privileges to access this dashboard.",
          variant: "destructive"
        });
        navigate('/');
      }
    };
    
    checkAdminRole();
  }, [user, isLoading, navigate, toast]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out of the dashboard.",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'services', label: 'Services', icon: FileText },
    { id: 'projects', label: 'Portfolio', icon: FolderOpen },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'whatwedo', label: 'What We Do', icon: Heart },
    { id: 'about', label: 'About Content', icon: Star },
    { id: 'settings', label: 'Website Settings', icon: Settings }
  ];
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to access the dashboard.</p>
          <Button onClick={() => navigate('/login')} className="mr-2">Login</Button>
          <Button variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  // Main dashboard layout
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            easyio <span className="text-yellow-400">✨</span>
          </h2>
          <p className="text-sm text-gray-600 mt-1">Welcome, {user?.firstName} <span className="inline-block ml-1 p-1 bg-purple-100 text-purple-800 text-xs rounded">Admin</span></p>
        </div>
        
        {/* Sidebar Navigation */}
        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeTab === item.id ? 'bg-purple-50 text-purple-600 border-r-2 border-purple-600' : 'text-gray-600'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
        
        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                {user?.firstName?.[0] || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {/* Stats Overview */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Overview</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Projects */}
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-100 rounded-full p-2">
                          <FolderOpen className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">12</div>
                          <div className="text-sm text-gray-600">Projects</div>
                        </div>
                      </div>
                    </div>
                    {/* Services */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 rounded-full p-2">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">8</div>
                          <div className="text-sm text-gray-600">Services</div>
                        </div>
                      </div>
                    </div>
                    {/* Testimonials */}
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 rounded-full p-2">
                          <MessageSquare className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">15</div>
                          <div className="text-sm text-gray-600">Testimonials</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Updates */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Updates</h2>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full mt-2 bg-purple-600"></div>
                      <div>
                        <p className="text-gray-900">Dashboard system initialized and ready</p>
                        <p className="text-sm text-gray-500">Just now</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full mt-2 bg-green-600"></div>
                      <div>
                        <p className="text-gray-900">Authentication system configured</p>
                        <p className="text-sm text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full mt-2 bg-blue-600"></div>
                      <div>
                        <p className="text-gray-900">Database connections established</p>
                        <p className="text-sm text-gray-500">5 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Management Tabs - Using components from components/dashboard folder */}
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
          {activeTab === 'whatwedo' && <WhatWeDoManager />}
          {activeTab === 'about' && <AboutContentManager />}

          {/* Settings Tab */}
          {activeTab === 'settings' && <SettingsManager />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
