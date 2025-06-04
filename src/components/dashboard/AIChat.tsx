import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Brain,
  Sparkles,
  BarChart3,
  TrendingUp,
  Users
} from 'lucide-react';
import { useAISettings } from '@/hooks/useAISettings';
import type { AIQueryResponse } from '@/services/ai/types';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  response?: AIQueryResponse;
}

const AIChat = () => {
  const { settings } = useAISettings();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (settings?.ai_enabled && settings?.ai_queries_enabled && messages.length === 0) {
      setMessages([
        {
          id: '1',
          type: 'ai',
          content: "Hello! I'm your AI assistant. I can help you analyze your dashboard data, answer questions about your website performance, and provide insights. Try asking me something like 'How is my website performing?' or 'What are my top traffic sources?'",
          timestamp: new Date()
        }
      ]);
    }
  }, [settings, messages.length]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse = generateMockResponse(userMessage.content);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.answer,
        timestamp: new Date(),
        response: aiResponse
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const generateMockResponse = (query: string): AIQueryResponse => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('performance') || lowerQuery.includes('speed')) {
      return {
        answer: "Your website performance is looking good! Your average page load time is 2.3 seconds, which is within the recommended range. However, I noticed that mobile performance could be improved - it's currently at 3.1 seconds. Consider optimizing images and enabling compression to boost mobile speeds.",
        confidence: 0.85,
        sources: ['Performance Analytics', 'Core Web Vitals'],
        visualizations: [
          {
            type: 'chart',
            title: 'Page Load Times',
            data: { desktop: 2.3, mobile: 3.1, target: 3.0 },
            config: { type: 'bar' }
          }
        ],
        followUpQuestions: [
          "How can I improve mobile performance?",
          "What are my Core Web Vitals scores?",
          "Show me performance trends over time"
        ]
      };
    }
    
    if (lowerQuery.includes('traffic') || lowerQuery.includes('visitors')) {
      return {
        answer: "Your website traffic has been growing steadily! You've had 12,450 visitors this month, which is a 23% increase from last month. Your top traffic sources are: Organic Search (45%), Direct (28%), Social Media (15%), and Referrals (12%). The majority of your visitors are from the United States (60%), followed by Canada (15%) and the UK (10%).",
        confidence: 0.92,
        sources: ['Google Analytics', 'Traffic Reports'],
        visualizations: [
          {
            type: 'chart',
            title: 'Traffic Sources',
            data: { organic: 45, direct: 28, social: 15, referral: 12 },
            config: { type: 'pie' }
          }
        ],
        followUpQuestions: [
          "Which pages get the most traffic?",
          "How can I increase organic traffic?",
          "What's my bounce rate?"
        ]
      };
    }
    
    if (lowerQuery.includes('conversion') || lowerQuery.includes('leads')) {
      return {
        answer: "Your conversion rate is currently 2.8%, which is slightly below the industry average of 3.2%. You've generated 85 leads this month through your contact forms. The 'Contact Us' page has the highest conversion rate at 4.1%, while the homepage converts at 1.9%. I recommend A/B testing different call-to-action buttons and optimizing your forms for better performance.",
        confidence: 0.78,
        sources: ['Form Analytics', 'Conversion Tracking'],
        followUpQuestions: [
          "How can I improve my conversion rate?",
          "Which forms perform best?",
          "What's my cost per lead?"
        ]
      };
    }
    
    // Default response
    return {
      answer: "I understand you're asking about your dashboard data. While I can help with various analytics questions, I'd need more specific information to provide detailed insights. You can ask me about website performance, traffic analytics, conversion rates, user behavior, or any other metrics you'd like to understand better.",
      confidence: 0.6,
      followUpQuestions: [
        "How is my website performing?",
        "What are my traffic sources?",
        "How are my conversions doing?",
        "Show me user engagement metrics"
      ]
    };
  };

  const suggestedQuestions = [
    "How is my website performing?",
    "What are my top traffic sources?",
    "How can I improve conversions?",
    "Show me user engagement metrics",
    "What's my bounce rate trend?",
    "Which pages need optimization?"
  ];

  if (!settings?.ai_enabled || !settings?.ai_queries_enabled) {
    return (
      <div className="text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <Brain className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
          AI Chat Disabled
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          Enable AI Natural Language Queries in the AI Integration settings to chat with your data
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          AI Chat Assistant
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Ask questions about your dashboard data in natural language
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-600" />
              Chat with Your Data
            </CardTitle>
            <CardDescription>
              Ask me anything about your website analytics and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Messages */}
            <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-blue-100 dark:bg-blue-900' 
                        : 'bg-purple-100 dark:bg-purple-900'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 border'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      {message.response?.confidence && (
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {Math.round(message.response.confidence * 100)}% confident
                          </Badge>
                        </div>
                      )}
                      {message.response?.followUpQuestions && (
                        <div className="mt-3 space-y-1">
                          <p className="text-xs font-medium opacity-75">Suggested follow-ups:</p>
                          {message.response.followUpQuestions.map((question, idx) => (
                            <button
                              key={idx}
                              onClick={() => setInput(question)}
                              className="block text-xs text-left p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors w-full"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Analyzing your data...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about your website analytics..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={loading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Quick Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => setInput(question)}
                className="w-full text-left p-3 text-sm rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {question}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;
