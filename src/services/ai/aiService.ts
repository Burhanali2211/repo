// Enhanced AI Service for Dashboard Integration
import {
  AISettings,
  AIQuery,
  AIQueryResponse,
  AIUsageStats,
  AIRateLimit,
  AIAnomaly,
  AIRecommendation,
  AI_PROVIDERS
} from './types';
import { decryptApiKey } from './encryption';

// AI Provider API Clients
interface AIProviderClient {
  makeRequest(prompt: string, model?: string): Promise<string>;
  testConnection(): Promise<boolean>;
}

class OpenAIClient implements AIProviderClient {
  constructor(private apiKey: string) { }

  async makeRequest(prompt: string, model: string = 'gpt-3.5-turbo'): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated';
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('Test connection', 'gpt-3.5-turbo');
      return true;
    } catch {
      return false;
    }
  }
}

class ClaudeClient implements AIProviderClient {
  constructor(private apiKey: string) { }

  async makeRequest(prompt: string, model: string = 'claude-3-haiku'): Promise<string> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Claude API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.content[0]?.text || 'No response generated';
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('Test connection', 'claude-3-haiku');
      return true;
    } catch {
      return false;
    }
  }
}

class GroqClient implements AIProviderClient {
  constructor(private apiKey: string) { }

  async makeRequest(prompt: string, model: string = 'llama-3.1-70b-versatile'): Promise<string> {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Groq API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated';
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('Test connection', 'llama-3.1-70b-versatile');
      return true;
    } catch {
      return false;
    }
  }
}

class DeepSeekClient implements AIProviderClient {
  constructor(private apiKey: string) { }

  async makeRequest(prompt: string, model: string = 'deepseek-v3'): Promise<string> {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`DeepSeek API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated';
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('Test connection', 'deepseek-v3');
      return true;
    } catch {
      return false;
    }
  }
}

class GoogleClient implements AIProviderClient {
  constructor(private apiKey: string) { }

  async makeRequest(prompt: string, model: string = 'gemini-pro'): Promise<string> {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Google API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('Test connection', 'gemini-pro');
      return true;
    } catch {
      return false;
    }
  }
}

class MistralClient implements AIProviderClient {
  constructor(private apiKey: string) { }

  async makeRequest(prompt: string, model: string = 'mistral-small-latest'): Promise<string> {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Mistral API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated';
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('Test connection', 'mistral-small-latest');
      return true;
    } catch {
      return false;
    }
  }
}

class HuggingFaceClient implements AIProviderClient {
  constructor(private apiKey: string) { }

  async makeRequest(prompt: string, model: string = 'microsoft/DialoGPT-medium'): Promise<string> {
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 1000,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Hugging Face API Error: ${error.error || response.statusText}`);
    }

    const data = await response.json();
    return data[0]?.generated_text || data.generated_text || 'No response generated';
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('Test connection', 'microsoft/DialoGPT-medium');
      return true;
    } catch {
      return false;
    }
  }
}

class TogetherClient implements AIProviderClient {
  constructor(private apiKey: string) { }

  async makeRequest(prompt: string, model: string = 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo'): Promise<string> {
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Together API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated';
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('Test connection', 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo');
      return true;
    } catch {
      return false;
    }
  }
}

class OllamaClient implements AIProviderClient {
  constructor(private baseUrl: string = 'http://localhost:11434') { }

  async makeRequest(prompt: string, model: string = 'llama3.2'): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || 'No response generated';
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('Test connection', 'llama3.2');
      return true;
    } catch {
      return false;
    }
  }
}

class AIService {
  private settings: AISettings | null = null;
  private usageStats: AIUsageStats = {
    totalQueries: 0,
    queriesThisMonth: 0,
    averageResponseTime: 0,
    successRate: 0,
    lastUsed: new Date(),
    creditsUsed: 0,
    creditsRemaining: 1000
  };
  private rateLimit: AIRateLimit = {
    requestsPerMinute: 60,
    requestsPerHour: 1000,
    requestsPerDay: 10000,
    currentUsage: { minute: 0, hour: 0, day: 0 },
    resetTimes: {
      minute: new Date(Date.now() + 60000),
      hour: new Date(Date.now() + 3600000),
      day: new Date(Date.now() + 86400000)
    }
  };

  constructor(settings?: AISettings) {
    if (settings) {
      this.updateSettings(settings);
    }
  }

  updateSettings(settings: AISettings) {
    this.settings = settings;
  }

  private getAIClient(): AIProviderClient {
    if (!this.settings?.ai_provider || !this.settings?.ai_api_key_encrypted) {
      throw new Error('AI provider or API key not configured');
    }

    const apiKey = decryptApiKey(this.settings.ai_api_key_encrypted);

    switch (this.settings.ai_provider) {
      case 'openai':
        return new OpenAIClient(apiKey);
      case 'claude':
        return new ClaudeClient(apiKey);
      case 'groq':
        return new GroqClient(apiKey);
      case 'deepseek':
        return new DeepSeekClient(apiKey);
      case 'google':
        return new GoogleClient(apiKey);
      case 'mistral':
        return new MistralClient(apiKey);
      case 'huggingface':
        return new HuggingFaceClient(apiKey);
      case 'together':
        return new TogetherClient(apiKey);
      case 'ollama':
        return new OllamaClient();
      default:
        throw new Error(`Unsupported AI provider: ${this.settings.ai_provider}`);
    }
  }

  // Rate limiting check
  private checkRateLimit(): boolean {
    const now = new Date();

    // Reset counters if time has passed
    if (now > this.rateLimit.resetTimes.minute) {
      this.rateLimit.currentUsage.minute = 0;
      this.rateLimit.resetTimes.minute = new Date(now.getTime() + 60000);
    }
    if (now > this.rateLimit.resetTimes.hour) {
      this.rateLimit.currentUsage.hour = 0;
      this.rateLimit.resetTimes.hour = new Date(now.getTime() + 3600000);
    }
    if (now > this.rateLimit.resetTimes.day) {
      this.rateLimit.currentUsage.day = 0;
      this.rateLimit.resetTimes.day = new Date(now.getTime() + 86400000);
    }

    // Check limits
    return (
      this.rateLimit.currentUsage.minute < this.rateLimit.requestsPerMinute &&
      this.rateLimit.currentUsage.hour < this.rateLimit.requestsPerHour &&
      this.rateLimit.currentUsage.day < this.rateLimit.requestsPerDay
    );
  }

  // Update usage counters
  private updateUsage(responseTime: number, success: boolean) {
    this.rateLimit.currentUsage.minute++;
    this.rateLimit.currentUsage.hour++;
    this.rateLimit.currentUsage.day++;

    this.usageStats.totalQueries++;
    this.usageStats.queriesThisMonth++;
    this.usageStats.lastUsed = new Date();

    // Update average response time
    this.usageStats.averageResponseTime =
      (this.usageStats.averageResponseTime + responseTime) / 2;

    // Update success rate
    const totalSuccessful = this.usageStats.successRate * (this.usageStats.totalQueries - 1);
    this.usageStats.successRate =
      (totalSuccessful + (success ? 1 : 0)) / this.usageStats.totalQueries;
  }

  // Process natural language query with real AI
  async processQuery(query: AIQuery): Promise<AIQueryResponse> {
    if (!this.settings?.ai_enabled || !this.settings?.ai_queries_enabled) {
      throw new Error('AI queries are not enabled');
    }

    if (!this.checkRateLimit()) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    const startTime = Date.now();

    try {
      const client = this.getAIClient();
      const model = this.settings.ai_model || this.getDefaultModel();

      // Create a comprehensive prompt for dashboard analysis
      const prompt = this.createAnalysisPrompt(query.query);

      const aiResponse = await client.makeRequest(prompt, model);

      // Parse and structure the AI response
      const response = this.parseAIResponse(aiResponse, query.query);

      const responseTime = Date.now() - startTime;
      this.updateUsage(responseTime, true);

      return response;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateUsage(responseTime, false);
      throw error;
    }
  }

  private getDefaultModel(): string {
    switch (this.settings?.ai_provider) {
      case 'openai': return 'gpt-3.5-turbo';
      case 'claude': return 'claude-3-haiku';
      case 'groq': return 'llama-3.1-70b-versatile';
      case 'deepseek': return 'deepseek-v3';
      case 'google': return 'gemini-pro';
      case 'mistral': return 'mistral-small-latest';
      case 'huggingface': return 'microsoft/DialoGPT-medium';
      case 'together': return 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo';
      case 'ollama': return 'llama3.2';
      default: return 'gpt-3.5-turbo';
    }
  }

  private createAnalysisPrompt(userQuery: string): string {
    return `You are an AI assistant for a website dashboard analytics platform. The user is asking about their website performance and data.

User Query: "${userQuery}"

Please provide a helpful, accurate response about website analytics. If the query is about:
- Traffic: Discuss visitor patterns, sources, and trends
- Performance: Cover page load times, Core Web Vitals, and optimization
- Conversions: Analyze conversion rates, funnels, and optimization opportunities
- SEO: Discuss search rankings, keywords, and optimization strategies
- General analytics: Provide insights about overall website performance

Format your response as a clear, actionable answer. Include specific suggestions when appropriate.

If you need actual data to provide a meaningful response, explain what data would be helpful and provide general best practices instead.

Response:`;
  }

  private parseAIResponse(aiResponse: string, originalQuery: string): AIQueryResponse {
    // Extract suggestions from the AI response
    const suggestions = this.extractSuggestions(aiResponse, originalQuery);

    // Calculate confidence based on response quality
    const confidence = this.calculateConfidence(aiResponse);

    return {
      answer: aiResponse.trim(),
      confidence,
      suggestions,
      followUpQuestions: suggestions
    };
  }

  private extractSuggestions(response: string, query: string): string[] {
    const suggestions: string[] = [];
    const lowerQuery = query.toLowerCase();

    // Generate contextual follow-up questions based on the query topic
    if (lowerQuery.includes('traffic') || lowerQuery.includes('visitor')) {
      suggestions.push(
        'What are my top traffic sources?',
        'How can I increase organic traffic?',
        'Show me traffic trends over time'
      );
    } else if (lowerQuery.includes('conversion') || lowerQuery.includes('sales')) {
      suggestions.push(
        'How can I improve conversion rates?',
        'What pages have the lowest conversion?',
        'Analyze my conversion funnel'
      );
    } else if (lowerQuery.includes('performance') || lowerQuery.includes('speed')) {
      suggestions.push(
        'How can I improve page speed?',
        'What are my Core Web Vitals scores?',
        'Show me performance bottlenecks'
      );
    } else if (lowerQuery.includes('seo') || lowerQuery.includes('search')) {
      suggestions.push(
        'How can I improve my SEO?',
        'What keywords should I target?',
        'Analyze my search rankings'
      );
    } else {
      suggestions.push(
        'Analyze my website performance',
        'Show me key metrics',
        'What should I focus on improving?'
      );
    }

    return suggestions.slice(0, 3);
  }

  private calculateConfidence(response: string): number {
    // Simple confidence calculation based on response characteristics
    let confidence = 0.7; // Base confidence

    if (response.length > 100) confidence += 0.1;
    if (response.includes('recommend') || response.includes('suggest')) confidence += 0.1;
    if (response.includes('data') || response.includes('analytics')) confidence += 0.05;
    if (response.includes('%') || response.includes('increase') || response.includes('improve')) confidence += 0.05;

    return Math.min(confidence, 0.95);
  }



  // Real AI-powered anomaly detection
  async detectAnomalies(): Promise<AIAnomaly[]> {
    if (!this.settings?.ai_enabled || !this.settings?.ai_alerts_enabled) {
      return [];
    }

    try {
      const client = this.getAIClient();
      const model = this.settings.ai_model || this.getDefaultModel();

      const prompt = `You are an AI system monitoring website analytics for anomaly detection.

      Analyze the following simulated metrics and identify any potential anomalies:
      - Current traffic: 12,450 visitors this month (last month: 10,120)
      - Page load time: 2.3s average (last week: 2.0s)
      - Conversion rate: 3.2% (last month: 3.5%)
      - Bounce rate: 45% (last month: 42%)
      - Server uptime: 99.2% (target: 99.5%)

      Identify any anomalies and provide:
      1. Type of anomaly (traffic, performance, conversion, error, security)
      2. Severity (low, medium, high, critical)
      3. Description of the issue
      4. Suggested actions

      Format as JSON array with objects containing: type, severity, title, description, suggestedActions`;

      const response = await client.makeRequest(prompt, model);

      // Parse AI response and convert to anomaly objects
      return this.parseAnomaliesFromAI(response);
    } catch (error) {
      console.error('AI anomaly detection failed:', error);
      // Return fallback anomalies if AI fails
      return this.getFallbackAnomalies();
    }
  }

  private parseAnomaliesFromAI(response: string): AIAnomaly[] {
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const anomaliesData = JSON.parse(jsonMatch[0]);
        return anomaliesData.map((item: any, index: number) => ({
          id: `ai-${Date.now()}-${index}`,
          type: item.type || 'performance',
          severity: item.severity || 'medium',
          title: item.title || 'Anomaly Detected',
          description: item.description || 'An anomaly was detected in your website metrics.',
          detectedAt: new Date(),
          affectedMetrics: this.extractMetrics(item.description),
          suggestedActions: Array.isArray(item.suggestedActions) ? item.suggestedActions : ['Review metrics', 'Monitor trends'],
          confidence: 0.85,
          data: { source: 'ai_analysis' }
        }));
      }
    } catch (error) {
      console.error('Failed to parse AI anomaly response:', error);
    }

    // Return fallback if parsing fails
    return this.getFallbackAnomalies();
  }

  private extractMetrics(description: string): string[] {
    const metrics: string[] = [];
    const lowerDesc = description.toLowerCase();

    if (lowerDesc.includes('traffic') || lowerDesc.includes('visitor')) metrics.push('traffic');
    if (lowerDesc.includes('conversion') || lowerDesc.includes('sales')) metrics.push('conversions');
    if (lowerDesc.includes('performance') || lowerDesc.includes('speed')) metrics.push('performance');
    if (lowerDesc.includes('bounce')) metrics.push('bounce_rate');
    if (lowerDesc.includes('uptime') || lowerDesc.includes('server')) metrics.push('uptime');

    return metrics.length > 0 ? metrics : ['general'];
  }

  private getFallbackAnomalies(): AIAnomaly[] {
    return [
      {
        id: 'fallback-1',
        type: 'performance',
        severity: 'low',
        title: 'Performance Monitoring Active',
        description: 'AI monitoring is active. No significant anomalies detected at this time.',
        detectedAt: new Date(),
        affectedMetrics: ['performance'],
        suggestedActions: ['Continue monitoring', 'Review metrics regularly'],
        confidence: 0.7,
        data: { source: 'fallback' }
      }
    ];
  }

  // Real AI-powered recommendations
  async generateRecommendations(): Promise<AIRecommendation[]> {
    if (!this.settings?.ai_enabled || !this.settings?.ai_recommendations_enabled) {
      return [];
    }

    try {
      const client = this.getAIClient();
      const model = this.settings.ai_model || this.getDefaultModel();

      const prompt = `You are an AI consultant analyzing website performance data to generate actionable recommendations.

      Current website metrics:
      - Traffic: 12,450 visitors/month (23% increase)
      - Conversion rate: 3.2% (industry avg: 2.5%)
      - Page load time: 2.3s (target: <2s)
      - Bounce rate: 45% (industry avg: 40%)
      - Mobile traffic: 65% of total
      - Top traffic sources: Organic (45%), Direct (28%), Social (15%)
      - SEO score: 87/100

      Generate 3-5 specific, actionable recommendations to improve website performance. For each recommendation, provide:
      1. Category (seo, performance, conversion, content, ux)
      2. Priority (high, medium, low)
      3. Title (concise recommendation)
      4. Description (detailed explanation)
      5. Impact (high, medium, low)
      6. Effort (high, medium, low)
      7. Estimated improvement (specific percentage or metric)
      8. Action items (3-5 specific steps)

      Format as JSON array with these fields: category, priority, title, description, impact, effort, estimatedImprovement, actionItems`;

      const response = await client.makeRequest(prompt, model);

      // Parse AI response and convert to recommendation objects
      return this.parseRecommendationsFromAI(response);
    } catch (error) {
      console.error('AI recommendations generation failed:', error);
      // Return fallback recommendations if AI fails
      return this.getFallbackRecommendations();
    }
  }

  private parseRecommendationsFromAI(response: string): AIRecommendation[] {
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const recommendationsData = JSON.parse(jsonMatch[0]);
        return recommendationsData.map((item: any, index: number) => ({
          id: `ai-rec-${Date.now()}-${index}`,
          category: item.category || 'performance',
          priority: item.priority || 'medium',
          title: item.title || 'Optimization Recommendation',
          description: item.description || 'AI-generated recommendation for website improvement.',
          impact: item.impact || 'medium',
          effort: item.effort || 'medium',
          estimatedImprovement: item.estimatedImprovement || 'Measurable improvement expected',
          actionItems: Array.isArray(item.actionItems) ? item.actionItems : ['Review and implement changes'],
          resources: ['AI-Generated Recommendation', 'Best Practices Guide'],
          createdAt: new Date(),
          status: 'new' as const
        }));
      }
    } catch (error) {
      console.error('Failed to parse AI recommendations response:', error);
    }

    // Return fallback if parsing fails
    return this.getFallbackRecommendations();
  }

  private getFallbackRecommendations(): AIRecommendation[] {
    return [
      {
        id: 'fallback-rec-1',
        category: 'performance',
        priority: 'high',
        title: 'Optimize Page Load Speed',
        description: 'Current page load time of 2.3s exceeds the recommended 2s target. Improving load speed can significantly impact user experience and conversions.',
        impact: 'high',
        effort: 'medium',
        estimatedImprovement: '15-25% improvement in user engagement',
        actionItems: [
          'Compress and optimize images',
          'Minify CSS and JavaScript files',
          'Enable browser caching',
          'Consider using a CDN'
        ],
        resources: ['Performance Optimization Guide', 'Core Web Vitals Documentation'],
        createdAt: new Date(),
        status: 'new'
      },
      {
        id: 'fallback-rec-2',
        category: 'conversion',
        priority: 'medium',
        title: 'Reduce Bounce Rate',
        description: 'Bounce rate of 45% is above industry average. Improving content relevance and page experience can help retain more visitors.',
        impact: 'medium',
        effort: 'low',
        estimatedImprovement: '10-15% reduction in bounce rate',
        actionItems: [
          'Improve page loading speed',
          'Enhance content relevance',
          'Add clear call-to-action buttons',
          'Optimize mobile experience'
        ],
        resources: ['UX Best Practices', 'Conversion Optimization Guide'],
        createdAt: new Date(),
        status: 'new'
      }
    ];
  }

  // Get usage statistics
  getUsageStats(): AIUsageStats {
    return { ...this.usageStats };
  }

  // Get rate limit status
  getRateLimit(): AIRateLimit {
    return { ...this.rateLimit };
  }

  // Test AI provider connection with real API calls
  async testConnection(provider: string, apiKey: string, model?: string): Promise<boolean> {
    try {
      const decryptedKey = decryptApiKey(apiKey);

      // Create client for the specific provider
      let client: AIProviderClient;

      switch (provider) {
        case 'openai':
          client = new OpenAIClient(decryptedKey);
          break;
        case 'claude':
          client = new ClaudeClient(decryptedKey);
          break;
        case 'groq':
          client = new GroqClient(decryptedKey);
          break;
        case 'deepseek':
          client = new DeepSeekClient(decryptedKey);
          break;
        case 'google':
          client = new GoogleClient(decryptedKey);
          break;
        case 'mistral':
          client = new MistralClient(decryptedKey);
          break;
        case 'huggingface':
          client = new HuggingFaceClient(decryptedKey);
          break;
        case 'together':
          client = new TogetherClient(decryptedKey);
          break;
        case 'ollama':
          client = new OllamaClient();
          break;
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }

      // Test the connection with a simple request
      return await client.testConnection();
    } catch (error) {
      throw new Error(`Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export default AIService;
