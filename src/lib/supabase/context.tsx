import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from './client';
import { useToast } from '@/components/ui/use-toast';

// Define the context type
interface SupabaseContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: (title: string, description: string, variant?: 'default' | 'destructive') => void;
}

// Create the context
const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

// Provider component
interface SupabaseProviderProps {
  children: ReactNode;
}

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Helper function to show toast messages
  const showToast = (
    title: string, 
    description: string, 
    variant: 'default' | 'destructive' = 'default'
  ) => {
    toast({
      title,
      description,
      variant,
    });
  };

  // Effect to set up auth state listener
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Handle auth state changes if needed
        console.log('Auth state changed:', event, session);
      }
    );

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    showToast,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

// Custom hook for using the context
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
