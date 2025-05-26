import React, { createContext, useContext, ReactNode } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';

// Create the context with undefined as initial value
const AdminAuthContext = createContext<ReturnType<typeof useAdminAuth> | undefined>(undefined);

// Provider component that wraps app with the AdminAuth context
export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  // Use the hook inside the provider
  const adminAuth = useAdminAuth();
  
  return (
    <AdminAuthContext.Provider value={adminAuth}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Custom hook to use the admin auth context
export const useAdminAuthContext = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuthContext must be used within an AdminAuthProvider');
  }
  return context;
};
