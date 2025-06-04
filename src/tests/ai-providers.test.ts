// AI Providers Test Suite
import { AI_PROVIDERS } from '@/services/ai/types';
import { validateApiKey, encryptApiKey, decryptApiKey, maskApiKey } from '@/services/ai/encryption';

describe('AI Providers Configuration', () => {
  test('should have all expected providers', () => {
    const expectedProviders = [
      'openai',
      'claude', 
      'google',
      'deepseek',
      'groq',
      'mistral',
      'huggingface',
      'together',
      'ollama'
    ];

    const actualProviders = AI_PROVIDERS.map(p => p.name);
    expectedProviders.forEach(provider => {
      expect(actualProviders).toContain(provider);
    });
  });

  test('should have models for each provider', () => {
    AI_PROVIDERS.forEach(provider => {
      expect(provider.models).toBeDefined();
      expect(provider.models.length).toBeGreaterThan(0);
      
      provider.models.forEach(model => {
        expect(model.id).toBeDefined();
        expect(model.name).toBeDefined();
        expect(model.description).toBeDefined();
        expect(model.maxTokens).toBeGreaterThan(0);
        expect(typeof model.costPer1kTokens).toBe('number');
      });
    });
  });

  test('should have free models available', () => {
    const freeModels = AI_PROVIDERS.flatMap(provider => 
      provider.models.filter(model => model.costPer1kTokens === 0)
    );
    
    expect(freeModels.length).toBeGreaterThan(0);
  });
});

describe('API Key Validation', () => {
  test('should validate OpenAI keys correctly', () => {
    expect(validateApiKey('sk-1234567890abcdef1234567890abcdef', 'openai').valid).toBe(true);
    expect(validateApiKey('invalid-key', 'openai').valid).toBe(false);
    expect(validateApiKey('sk-short', 'openai').valid).toBe(false);
  });

  test('should validate Claude keys correctly', () => {
    expect(validateApiKey('sk-ant-1234567890abcdef1234567890abcdef', 'claude').valid).toBe(true);
    expect(validateApiKey('sk-1234567890abcdef1234567890abcdef', 'claude').valid).toBe(false);
    expect(validateApiKey('sk-ant-short', 'claude').valid).toBe(false);
  });

  test('should validate Groq keys correctly', () => {
    expect(validateApiKey('gsk_1234567890abcdef1234567890abcdef', 'groq').valid).toBe(true);
    expect(validateApiKey('sk-1234567890abcdef1234567890abcdef', 'groq').valid).toBe(false);
    expect(validateApiKey('gsk_short', 'groq').valid).toBe(false);
  });

  test('should validate DeepSeek keys correctly', () => {
    expect(validateApiKey('sk-1234567890abcdef1234567890abcdef', 'deepseek').valid).toBe(true);
    expect(validateApiKey('invalid-key', 'deepseek').valid).toBe(false);
    expect(validateApiKey('sk-short', 'deepseek').valid).toBe(false);
  });

  test('should validate Hugging Face keys correctly', () => {
    expect(validateApiKey('hf_1234567890abcdef1234567890abcdef', 'huggingface').valid).toBe(true);
    expect(validateApiKey('sk-1234567890abcdef1234567890abcdef', 'huggingface').valid).toBe(false);
    expect(validateApiKey('hf_short', 'huggingface').valid).toBe(false);
  });

  test('should handle Ollama (no key required)', () => {
    expect(validateApiKey('', 'ollama').valid).toBe(true);
    expect(validateApiKey('any-key', 'ollama').valid).toBe(true);
  });

  test('should handle unknown providers', () => {
    expect(validateApiKey('1234567890abcdef', 'unknown').valid).toBe(true);
    expect(validateApiKey('short', 'unknown').valid).toBe(false);
  });
});

describe('API Key Encryption', () => {
  test('should encrypt and decrypt keys correctly', () => {
    const originalKey = 'sk-1234567890abcdef1234567890abcdef';
    const encrypted = encryptApiKey(originalKey);
    const decrypted = decryptApiKey(encrypted);
    
    expect(encrypted).not.toBe(originalKey);
    expect(decrypted).toBe(originalKey);
  });

  test('should handle empty keys', () => {
    expect(encryptApiKey('')).toBe('');
    expect(decryptApiKey('')).toBe('');
  });

  test('should mask keys for display', () => {
    const key = 'sk-1234567890abcdef1234567890abcdef';
    const masked = maskApiKey(key);
    
    expect(masked).toContain('sk-1');
    expect(masked).toContain('cdef');
    expect(masked).toContain('••••');
    expect(masked).not.toBe(key);
  });
});

describe('Provider Features', () => {
  test('should have correct requiresApiKey flags', () => {
    const ollamaProvider = AI_PROVIDERS.find(p => p.name === 'ollama');
    expect(ollamaProvider?.requiresApiKey).toBe(false);

    const openaiProvider = AI_PROVIDERS.find(p => p.name === 'openai');
    expect(openaiProvider?.requiresApiKey).toBe(true);
  });

  test('should have display names', () => {
    AI_PROVIDERS.forEach(provider => {
      expect(provider.displayName).toBeDefined();
      expect(provider.displayName.length).toBeGreaterThan(0);
    });
  });
});

describe('Model Categories', () => {
  test('should categorize free models correctly', () => {
    const freeProviders = ['groq', 'deepseek', 'huggingface', 'ollama'];
    
    freeProviders.forEach(providerName => {
      const provider = AI_PROVIDERS.find(p => p.name === providerName);
      expect(provider).toBeDefined();
      
      const hasFreeModels = provider!.models.some(model => model.costPer1kTokens === 0);
      expect(hasFreeModels).toBe(true);
    });
  });

  test('should have high-performance models', () => {
    const highPerfModels = AI_PROVIDERS.flatMap(provider => 
      provider.models.filter(model => 
        model.maxTokens >= 100000 || 
        model.name.toLowerCase().includes('gpt-4') ||
        model.name.toLowerCase().includes('claude-3') ||
        model.name.toLowerCase().includes('deepseek-r1')
      )
    );
    
    expect(highPerfModels.length).toBeGreaterThan(0);
  });

  test('should have code-specialized models', () => {
    const codeModels = AI_PROVIDERS.flatMap(provider => 
      provider.models.filter(model => 
        model.name.toLowerCase().includes('code') ||
        model.description.toLowerCase().includes('code')
      )
    );
    
    expect(codeModels.length).toBeGreaterThan(0);
  });
});

// Integration test helper
export const testAIProviderIntegration = async (providerName: string, apiKey: string) => {
  const provider = AI_PROVIDERS.find(p => p.name === providerName);
  if (!provider) {
    throw new Error(`Provider ${providerName} not found`);
  }

  // Validate API key format
  const validation = validateApiKey(apiKey, providerName);
  if (!validation.valid) {
    throw new Error(`Invalid API key: ${validation.message}`);
  }

  // Test encryption/decryption
  const encrypted = encryptApiKey(apiKey);
  const decrypted = decryptApiKey(encrypted);
  if (decrypted !== apiKey) {
    throw new Error('Encryption/decryption failed');
  }

  return {
    provider: provider.displayName,
    models: provider.models.length,
    requiresApiKey: provider.requiresApiKey,
    keyValid: true
  };
};
