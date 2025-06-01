import * as React from 'react';
const { useEffect, useState } = React;
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface SupabaseInitializerProps {
  children: React.ReactNode;
}

/**
 * Component that initializes and verifies Supabase tables when the app starts
 * It runs silently in the background and only shows loading state if it takes too long
 */
const SupabaseInitializer: React.FC<SupabaseInitializerProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        // Set a timer to show loading state if initialization takes too long
        const loadingTimer = setTimeout(() => {
          setShowLoading(true);
        }, 2000);

        // First, wait a moment to ensure auth is initialized
        await new Promise(resolve => setTimeout(resolve, 500));

        // Verify the required tables exist by querying them
        const tables = ['services', 'testimonials', 'projects'];
        const missingTables: Array<{ table: string, issue: string }> = [];

        for (const table of tables) {
          try {
            const { error } = await supabase.from(table).select('count').limit(1);

            // CORS errors will typically appear as network errors
            if (error && error.message && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
              console.warn(`CORS issue detected when accessing ${table}:`, error);
              missingTables.push({ table, issue: 'CORS' });
              continue;
            }

            // Code PGRST116 is just an empty result, which is fine
            // Any other error typically means the table doesn't exist
            if (error && error.code !== 'PGRST116') {
              console.warn(`Table ${table} check failed:`, error);
              missingTables.push({ table, issue: 'missing' });
            }
          } catch (err) {
            console.error(`Error checking table ${table}:`, err);
            missingTables.push({ table, issue: 'error' });
          }
        }

        if (missingTables.length > 0) {
          // Check specifically for CORS issues
          const corsIssues = missingTables.some(t => t.issue === 'CORS');

          console.warn('Database initialization issues:', { missingTables, corsIssues });

          if (corsIssues) {
            toast({
              title: 'CORS Configuration Issue',
              description: 'Your browser is being blocked from accessing Supabase. Please add your domain to the allowed origins in Supabase settings.',
              variant: 'destructive',
              duration: 10000
            });
          } else {
            toast({
              title: 'Database Tables Missing',
              description: 'Required database tables are missing. Please run the database_setup.sql script in your Supabase SQL Editor.',
              variant: 'destructive',
              duration: 10000
            });
          }
        } else {
          console.log('All required tables exist in Supabase');
        }

        // Clear the loading timer and mark as initialized
        clearTimeout(loadingTimer);
        setIsInitialized(true);
        setShowLoading(false);
      } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        setIsInitialized(true); // We'll continue anyway, but log the error
        setShowLoading(false);

        toast({
          title: 'Database Connection Error',
          description: 'Failed to connect to the database. Please check your Supabase configuration and network connection.',
          variant: 'destructive',
          duration: 10000
        });
      }
    };

    initializeSupabase();
  }, [toast]);

  if (showLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="text-center p-6 bg-background rounded-lg shadow-lg max-w-md">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Initializing database...</p>
          <p className="mt-2 text-sm text-muted-foreground">If this takes too long, you may need to:</p>
          <ul className="mt-2 text-sm text-left list-disc pl-6 text-muted-foreground">
            <li>Check your Supabase configuration</li>
            <li>Configure CORS settings in Supabase</li>
            <li>Run the database_setup.sql script</li>
          </ul>
        </div>
      </div>
    );
  }

  // Render children once initialized or if taking too long but not showing loading
  return <>{children}</>;
};

export default SupabaseInitializer;
