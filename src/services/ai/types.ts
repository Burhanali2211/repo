// AI Service Types and Interfaces

export interface AIProvider {
  name: string;
  displayName: string;
  models: AIModel[];
  requiresApiKey: boolean;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  costPer1kTokens?: number;
}

export interface AISettings {
  id: string;
  created_at: string;
  updated_at: string;
  ai_enabled: boolean;
  ai_provider: string;
  ai_model: string | null;
  ai_api_key_encrypted: string | null;
  ai_features_enabled: Record<string, boolean> | null;
  ai_analytics_enabled: boolean;
  ai_recommendations_enabled: boolean;
  ai_queries_enabled: boolean;
  ai_alerts_enabled: boolean;
  ai_visualization_enabled: boolean;
  user_id: string | null;
}

export interface AIAnalyticsInsight {
  id: string;
  title: string;
  description: string;
  type: 'trend' | 'anomaly' | 'recommendation' | 'alert';
  severity: 'low' | 'medium' | 'high';
  data: any;
  timestamp: string;
  actionable: boolean;
  actions?: AIAction[];
}

export interface AIAction {
  id: string;
  label: string;
  type: 'navigate' | 'filter' | 'export' | 'alert';
  payload: any;
}

export interface AIQuery {
  query: string;
  context?: string;
  dataSource?: string;
}

export interface AIQueryResponse {
  answer: string;
  confidence: number;
  sources?: string[];
  visualizations?: AIVisualization[];
  followUpQuestions?: string[];
}

export interface AIVisualization {
  type: 'chart' | 'table' | 'metric' | 'graph';
  title: string;
  data: any;
  config: any;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'content' | 'user_experience' | 'business';
  priority: 'low' | 'medium' | 'high';
  impact: string;
  effort: 'low' | 'medium' | 'high';
  actions: AIAction[];
  timestamp: string;
}

export interface AIAlert {
  id: string;
  title: string;
  message: string;
  type: 'anomaly' | 'threshold' | 'trend' | 'error';
  severity: 'info' | 'warning' | 'error' | 'critical';
  timestamp: string;
  resolved: boolean;
  data: any;
  actions?: AIAction[];
}

// AI Provider Configurations
export const AI_PROVIDERS: AIProvider[] = [
  {
    name: 'openai',
    displayName: 'OpenAI',
    requiresApiKey: true,
    models: [
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        description: 'Latest multimodal model with vision capabilities',
        maxTokens: 128000,
        costPer1kTokens: 0.005
      },
      {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo',
        description: 'Faster and more cost-effective than GPT-4',
        maxTokens: 128000,
        costPer1kTokens: 0.01
      },
      {
        id: 'gpt-4',
        name: 'GPT-4',
        description: 'Most capable model, best for complex analysis',
        maxTokens: 8192,
        costPer1kTokens: 0.03
      },
      {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        description: 'Fast and efficient for most tasks',
        maxTokens: 16384,
        costPer1kTokens: 0.002
      }
    ]
  },
  {
    name: 'claude',
    displayName: 'Anthropic Claude',
    requiresApiKey: true,
    models: [
      {
        id: 'claude-3-opus',
        name: 'Claude 3 Opus',
        description: 'Most powerful model for complex reasoning',
        maxTokens: 200000,
        costPer1kTokens: 0.015
      },
      {
        id: 'claude-3-sonnet',
        name: 'Claude 3 Sonnet',
        description: 'Balanced performance and speed',
        maxTokens: 200000,
        costPer1kTokens: 0.003
      },
      {
        id: 'claude-3-haiku',
        name: 'Claude 3 Haiku',
        description: 'Fastest model for simple tasks',
        maxTokens: 200000,
        costPer1kTokens: 0.00025
      }
    ]
  },
  {
    name: 'google',
    displayName: 'Google Gemini',
    requiresApiKey: true,
    models: [
      {
        id: 'gemini-2.0-flash-exp',
        name: 'Gemini 2.0 Flash (Experimental)',
        description: 'Latest experimental model with enhanced capabilities',
        maxTokens: 1000000,
        costPer1kTokens: 0.0005
      },
      {
        id: 'gemini-pro',
        name: 'Gemini Pro',
        description: 'Advanced reasoning and code generation',
        maxTokens: 32768,
        costPer1kTokens: 0.0005
      },
      {
        id: 'gemini-pro-vision',
        name: 'Gemini Pro Vision',
        description: 'Multimodal model with vision capabilities',
        maxTokens: 16384,
        costPer1kTokens: 0.0025
      }
    ]
  },
  {
    name: 'deepseek',
    displayName: 'DeepSeek (Free)',
    requiresApiKey: true,
    models: [
      {
        id: 'deepseek-r1',
        name: 'DeepSeek R1',
        description: 'Advanced reasoning model, competitive with GPT-4',
        maxTokens: 128000,
        costPer1kTokens: 0.0001
      },
      {
        id: 'deepseek-v3',
        name: 'DeepSeek V3',
        description: 'Latest general-purpose model',
        maxTokens: 64000,
        costPer1kTokens: 0.0001
      },
      {
        id: 'deepseek-coder',
        name: 'DeepSeek Coder',
        description: 'Specialized for code generation and analysis',
        maxTokens: 64000,
        costPer1kTokens: 0.0001
      }
    ]
  },
  {
    name: 'groq',
    displayName: 'Groq (Fast & Free)',
    requiresApiKey: true,
    models: [
      {
        id: 'llama-3.3-70b-versatile',
        name: 'Llama 3.3 70B',
        description: 'Latest Llama model with excellent performance',
        maxTokens: 32768,
        costPer1kTokens: 0
      },
      {
        id: 'llama-3.1-70b-versatile',
        name: 'Llama 3.1 70B',
        description: 'High-performance open-source model',
        maxTokens: 32768,
        costPer1kTokens: 0
      },
      {
        id: 'mixtral-8x7b-32768',
        name: 'Mixtral 8x7B',
        description: 'Mixture of experts model for complex tasks',
        maxTokens: 32768,
        costPer1kTokens: 0
      },
      {
        id: 'qwen-2.5-32b-instruct',
        name: 'Qwen 2.5 32B',
        description: 'Advanced Chinese-English bilingual model',
        maxTokens: 32768,
        costPer1kTokens: 0
      }
    ]
  },
  {
    name: 'mistral',
    displayName: 'Mistral AI',
    requiresApiKey: true,
    models: [
      {
        id: 'mistral-large-latest',
        name: 'Mistral Large',
        description: 'Most capable Mistral model for complex tasks',
        maxTokens: 128000,
        costPer1kTokens: 0.004
      },
      {
        id: 'mistral-medium-latest',
        name: 'Mistral Medium',
        description: 'Balanced performance and cost',
        maxTokens: 32768,
        costPer1kTokens: 0.0025
      },
      {
        id: 'mistral-small-latest',
        name: 'Mistral Small',
        description: 'Fast and cost-effective for simple tasks',
        maxTokens: 32768,
        costPer1kTokens: 0.001
      }
    ]
  },
  {
    name: 'huggingface',
    displayName: 'Hugging Face (Free)',
    requiresApiKey: true,
    models: [
      {
        id: 'microsoft/DialoGPT-medium',
        name: 'DialoGPT Medium',
        description: 'Conversational AI model',
        maxTokens: 1024,
        costPer1kTokens: 0
      },
      {
        id: 'microsoft/DialoGPT-large',
        name: 'DialoGPT Large',
        description: 'Large conversational model',
        maxTokens: 1024,
        costPer1kTokens: 0
      },
      {
        id: 'bigscience/bloom-560m',
        name: 'BLOOM 560M',
        description: 'Multilingual language model',
        maxTokens: 2048,
        costPer1kTokens: 0
      }
    ]
  },
  {
    name: 'together',
    displayName: 'Together AI',
    requiresApiKey: true,
    models: [
      {
        id: 'meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo',
        name: 'Llama 3.2 90B Vision',
        description: 'Multimodal Llama model with vision capabilities',
        maxTokens: 131072,
        costPer1kTokens: 0.0012
      },
      {
        id: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
        name: 'Llama 3.1 70B Turbo',
        description: 'Fast Llama 3.1 70B model',
        maxTokens: 131072,
        costPer1kTokens: 0.0009
      },
      {
        id: 'Qwen/Qwen2.5-72B-Instruct-Turbo',
        name: 'Qwen 2.5 72B Turbo',
        description: 'High-performance Qwen model',
        maxTokens: 32768,
        costPer1kTokens: 0.0009
      }
    ]
  },
  {
    name: 'ollama',
    displayName: 'Ollama (Local)',
    requiresApiKey: false,
    models: [
      {
        id: 'llama3.2',
        name: 'Llama 3.2',
        description: 'Run locally with Ollama',
        maxTokens: 128000,
        costPer1kTokens: 0
      },
      {
        id: 'qwen2.5',
        name: 'Qwen 2.5',
        description: 'Run locally with Ollama',
        maxTokens: 32768,
        costPer1kTokens: 0
      },
      {
        id: 'mistral',
        name: 'Mistral',
        description: 'Run locally with Ollama',
        maxTokens: 32768,
        costPer1kTokens: 0
      },
      {
        id: 'codellama',
        name: 'Code Llama',
        description: 'Code-specialized model for local use',
        maxTokens: 16384,
        costPer1kTokens: 0
      }
    ]
  }
];

export const AI_FEATURES = {
  analytics: {
    id: 'analytics',
    name: 'AI Analytics',
    description: 'Get intelligent insights from your dashboard data',
    icon: 'TrendingUp'
  },
  recommendations: {
    id: 'recommendations',
    name: 'Smart Recommendations',
    description: 'Receive AI-powered suggestions for improvements',
    icon: 'Lightbulb'
  },
  queries: {
    id: 'queries',
    name: 'Natural Language Queries',
    description: 'Ask questions about your data in plain English',
    icon: 'MessageSquare'
  },
  alerts: {
    id: 'alerts',
    name: 'Intelligent Alerts',
    description: 'Get notified about anomalies and important changes',
    icon: 'Bell'
  },
  visualization: {
    id: 'visualization',
    name: 'Smart Visualizations',
    description: 'AI-suggested charts and data presentations',
    icon: 'BarChart'
  }
};

// Rate limiting and usage tracking
export interface AIUsageStats {
  totalQueries: number;
  queriesThisMonth: number;
  averageResponseTime: number;
  successRate: number;
  lastUsed: Date;
  creditsUsed: number;
  creditsRemaining?: number;
}

export interface AIRateLimit {
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  currentUsage: {
    minute: number;
    hour: number;
    day: number;
  };
  resetTimes: {
    minute: Date;
    hour: Date;
    day: Date;
  };
}

// Anomaly detection
export interface AIAnomaly {
  id: string;
  type: 'traffic' | 'performance' | 'conversion' | 'error' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  detectedAt: Date;
  affectedMetrics: string[];
  suggestedActions: string[];
  confidence: number;
  data: any;
}

// Enhanced recommendation system
export interface AIRecommendation {
  id: string;
  category: 'performance' | 'seo' | 'conversion' | 'content' | 'security';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  estimatedImprovement: string;
  actionItems: string[];
  resources: string[];
  createdAt: Date;
  status: 'new' | 'in_progress' | 'completed' | 'dismissed';
}
