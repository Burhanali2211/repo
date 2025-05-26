import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type ConnectionStatus = 'connected' | 'disconnected' | 'checking';

const SupabaseConnectionStatus: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>('checking');
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  const { toast } = useToast();

  const checkConnection = async () => {
    setStatus('checking');
    try {
      // Simple query to check if Supabase is responsive
      const startTime = Date.now();
      const { data, error } = await supabase.from('testimonials').select('count').limit(1);
      const responseTime = Date.now() - startTime;
      
      if (error) {
        console.error('Supabase connection error:', error);
        setStatus('disconnected');
        toast({
          title: 'Database Connection Error',
          description: 'Unable to connect to the database. Some features may not work correctly.',
          variant: 'destructive',
        });
      } else {
        setStatus('connected');
        // Only show toast for reconnection
        if (status === 'disconnected') {
          toast({
            title: 'Database Connected',
            description: `Successfully connected to the database (${responseTime}ms).`,
          });
        }
      }
    } catch (error) {
      console.error('Error checking Supabase connection:', error);
      setStatus('disconnected');
    }
    
    setLastChecked(new Date());
  };

  // Check connection on mount and periodically
  useEffect(() => {
    checkConnection();
    
    // Check connection every 2 minutes
    const interval = setInterval(checkConnection, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Different status indicators
  const statusConfig = {
    connected: {
      icon: <Wifi className="h-4 w-4 text-green-500" />,
      label: 'Connected',
      class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    },
    disconnected: {
      icon: <WifiOff className="h-4 w-4 text-red-500" />,
      label: 'Disconnected',
      class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    },
    checking: {
      icon: <AlertCircle className="h-4 w-4 text-yellow-500 animate-pulse" />,
      label: 'Checking',
      class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    }
  };

  const currentConfig = statusConfig[status];
  const formattedTime = lastChecked.toLocaleTimeString();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center gap-2 text-xs rounded-full py-1 px-3 ${currentConfig.class}`}
            onClick={checkConnection}
          >
            {currentConfig.icon}
            <span className="hidden sm:inline">{currentConfig.label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p>Database: {currentConfig.label}</p>
            <p className="text-xs text-muted-foreground">Last checked: {formattedTime}</p>
            <p className="text-xs mt-1">Click to check again</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SupabaseConnectionStatus;
