import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { setupSiteSettings } from '@/utils/setup-site-settings';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';

const SetupSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const navigate = useNavigate();

  const handleSetup = async () => {
    try {
      setIsLoading(true);
      const setupResult = await setupSiteSettings();
      setResult(setupResult);
      setIsComplete(true);

      if (setupResult.success) {
        toast({
          title: "Success",
          description: "Settings table has been set up successfully"
        });
      } else {
        toast({
          title: "Error",
          description: `Failed to set up settings: ${setupResult.message}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      setResult({ success: false, message: error.message || 'Unknown error occurred' });
      toast({
        title: "Error",
        description: `An error occurred: ${error.message || 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-[550px] shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <Settings className="h-8 w-8 text-primary-600" />
          </div>
          <CardTitle className="text-2xl">Settings Setup</CardTitle>
          <CardDescription>
            Initialize the site settings table in your database
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {!isComplete ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                This will create the necessary site_settings table in your Supabase database
                and populate it with default values. You can modify these settings later
                from the dashboard.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md text-sm">
                Make sure you have proper database permissions before proceeding.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {result?.success ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                  <p className="font-medium">Setup completed successfully!</p>
                  <p className="text-sm mt-1">{result.message}</p>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  <p className="font-medium">Setup failed</p>
                  <p className="text-sm mt-1">{result?.message}</p>
                  <p className="text-sm mt-2">
                    You might need to run the SQL script directly on your database.
                    See the console for more details.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          {!isComplete ? (
            <Button
              onClick={handleSetup}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Settings className="mr-2 h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : (
                "Initialize Settings Table"
              )}
            </Button>
          ) : (
            <Button
              onClick={handleGoToDashboard}
              className="w-full"
            >
              Go to Dashboard
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SetupSettings;
