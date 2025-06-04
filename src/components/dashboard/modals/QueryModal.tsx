import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageSquare, Loader2, Lightbulb, BarChart3, Download, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface QueryMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  visualizations?: any[];
  confidence?: number;
}

interface QueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuery: (query: string) => Promise<{
    answer: string;
    confidence: number;
    suggestions?: string[];
    visualizations?: any[];
  }>;
}

const QueryModal: React.FC<QueryModalProps> = ({
  isOpen,
  onClose,
  onQuery
}) => {
  const [messages, setMessages] = useState<QueryMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const suggestedQueries = [
    "How is my website performing this month?",
    "What are my top traffic sources?",
    "Show me conversion rate trends",
    "Which pages have the highest bounce rate?",
    "What's my user engagement like?",
    "How can I improve my SEO performance?"
  ];

  useEffect(() => {
    if (isOpen) {
      // Initialize with welcome message
      setMessages([
        {
          id: '1',
          type: 'ai',
          content: "Hello! I'm your AI assistant. I can help you analyze your dashboard data and answer questions about your website performance. What would you like to know?",
          timestamp: new Date(),
          suggestions: suggestedQueries.slice(0, 3)
        }
      ]);
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Clear messages when modal closes
      setMessages([]);
      setInput('');
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (queryText?: string) => {
    const query = queryText || input.trim();
    if (!query || isLoading) return;

    const userMessage: QueryMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await onQuery(query);
      
      const aiMessage: QueryMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.answer,
        timestamp: new Date(),
        confidence: response.confidence,
        suggestions: response.suggestions,
        visualizations: response.visualizations
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: QueryMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm sorry, I encountered an error while processing your request. Please try again or rephrase your question.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Query Failed",
        description: error instanceof Error ? error.message : "Failed to process query.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Message copied to clipboard."
    });
  };

  const clearConversation = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        content: "Conversation cleared. How can I help you today?",
        timestamp: new Date(),
        suggestions: suggestedQueries.slice(0, 3)
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="query-modal-title"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <MessageSquare className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 id="query-modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                AI Query Assistant
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ask questions about your dashboard data in natural language
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearConversation}
              className="text-gray-500 hover:text-gray-700"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                }`}
              >
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  
                  {/* Confidence Score */}
                  {message.confidence && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Confidence:</span>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(message.confidence * 100)}%
                      </Badge>
                    </div>
                  )}

                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Lightbulb className="h-3 w-3" />
                        Suggested follow-ups:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => handleSendMessage(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Visualizations */}
                  {message.visualizations && message.visualizations.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <BarChart3 className="h-3 w-3" />
                        Visualizations available
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs h-7">
                          <Download className="h-3 w-3 mr-1" />
                          Export Chart
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Message Actions */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                      onClick={() => copyToClipboard(message.content)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {/* Quick suggestions (only show when no messages or just welcome) */}
          {messages.length <= 1 && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.slice(0, 4).map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleSendMessage(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your dashboard data..."
              className="flex-1 h-12"
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="h-12 px-6"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryModal;
