
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Newsletter subscription:', email);
      
      setIsSubscribed(true);
      setEmail('');
      
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 rounded-xl shadow-lg">
        <div className="container mx-auto px-6 text-center">
          <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">You're All Set!</h3>
          <p className="text-purple-100">Thank you for subscribing to our newsletter.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 rounded-xl shadow-lg">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 text-white mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Our Latest Insights
          </h3>
          <p className="text-purple-100 mb-8">
            Get exclusive tips, industry insights, and updates delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-2 focus:ring-white/50"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="bg-white text-purple-700 hover:bg-yellow-400 hover:text-black font-semibold transition-colors duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
