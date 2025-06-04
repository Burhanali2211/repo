import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { setupAISettings, checkAISettingsTable } from '@/utils/setup-ai-settings';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Brain, CheckCircle, AlertCircle, Copy, Database } from 'lucide-react';

const SetupAISettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [tableExists, setTableExists] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkTableStatus();
  }, []);

  const checkTableStatus = async () => {
    const status = await checkAISettingsTable();
    setTableExists(status.exists);
    if (status.exists) {
      setIsComplete(true);
      setResult({ success: true, message: 'AI settings table is already configured' });
    }
  };

  const handleSetup = async () => {
    setIsLoading(true);
    try {
      const setupResult = await setupAISettings();
      setResult(setupResult);
      setIsComplete(true);
      
      if (setupResult.success) {
        toast({
          title: "Setup Complete",
          description: "AI settings table has been configured successfully."
        });
      } else {
        toast({
          title: "Manual Setup Required",
          description: "Please run the provided SQL in your Supabase dashboard.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Setup error:', error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Setup failed'
      });
      toast({
        title: "Setup Failed",
        description: "An error occurred during setup. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sqlScript = `
-- Create AI Settings Table
CREATE TABLE IF NOT EXISTS ai_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  ai_enabled BOOLEAN DEFAULT false NOT NULL,
  ai_provider TEXT DEFAULT 'openai' NOT NULL,
  ai_model TEXT,
  ai_api_key_encrypted TEXT,
  ai_features_enabled JSONB DEFAULT '{}',
  ai_analytics_enabled BOOLEAN DEFAULT true NOT NULL,
  ai_recommendations_enabled BOOLEAN DEFAULT true NOT NULL,
  ai_queries_enabled BOOLEAN DEFAULT true NOT NULL,
  ai_alerts_enabled BOOLEAN DEFAULT true NOT NULL,
  ai_visualization_enabled BOOLEAN DEFAULT true NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE ai_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can view their own AI settings" ON ai_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI settings" ON ai_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI settings" ON ai_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AI settings" ON ai_settings
  FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_settings_updated_at
  BEFORE UPDATE ON ai_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sqlScript);
      toast({
        title: "Copied to Clipboard",
        description: "SQL script has been copied to your clipboard."
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: "Copy Failed",
        description: "Please manually select and copy the SQL script.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-purple-100 dark:bg-purple-900/20 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle className="text-2xl">AI Settings Setup</CardTitle>
          <CardDescription>
            Initialize the AI settings table in your Supabase database
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!isComplete ? (
            <div className="text-center space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                This will create the necessary ai_settings table in your Supabase database
                and configure Row Level Security policies for secure AI feature management.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Database className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="text-left">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      What this setup includes:
                    </h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• AI settings table with encrypted API key storage</li>
                      <li>• Row Level Security policies for user data protection</li>
                      <li>• Feature toggles for individual AI capabilities</li>
                      <li>• Automatic timestamp management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {result?.success ? (
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
                    Setup Complete!
                  </h3>
                  <p className="text-green-600 dark:text-green-400">
                    {result.message}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                      Manual Setup Required
                    </h3>
                    <p className="text-yellow-600 dark:text-yellow-400 mb-4">
                      Please run the following SQL script in your Supabase dashboard:
                    </p>
                  </div>
                  
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto max-h-96 overflow-y-auto">
                      <code>{sqlScript}</code>
                    </pre>
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-gray-800 border-gray-600 hover:bg-gray-700"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                      Steps to complete setup:
                    </h4>
                    <ol className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1 list-decimal list-inside">
                      <li>Copy the SQL script above</li>
                      <li>Go to your Supabase dashboard</li>
                      <li>Navigate to the SQL Editor</li>
                      <li>Paste and run the script</li>
                      <li>Return here and click "Check Setup" to verify</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
          
          <div className="flex gap-2">
            {!isComplete ? (
              <Button onClick={handleSetup} disabled={isLoading}>
                {isLoading ? 'Setting up...' : 'Start Setup'}
              </Button>
            ) : result?.success ? (
              <Button onClick={() => navigate('/dashboard')}>
                Continue to Dashboard
              </Button>
            ) : (
              <Button onClick={checkTableStatus} variant="outline">
                Check Setup
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SetupAISettings;
