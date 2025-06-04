// AI API Key Encryption/Decryption Service
// This provides secure storage for AI API keys

/**
 * Simple encryption/decryption for API keys
 * In production, consider using more robust encryption methods
 */

const ENCRYPTION_KEY = 'ai-dashboard-key-2024'; // In production, use environment variable

/**
 * Simple XOR encryption for API keys
 * @param text - Text to encrypt
 * @param key - Encryption key
 * @returns Encrypted text
 */
function xorEncrypt(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result); // Base64 encode
}

/**
 * Simple XOR decryption for API keys
 * @param encryptedText - Encrypted text to decrypt
 * @param key - Decryption key
 * @returns Decrypted text
 */
function xorDecrypt(encryptedText: string, key: string): string {
  try {
    const decoded = atob(encryptedText); // Base64 decode
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  } catch (error) {
    console.error('Failed to decrypt API key:', error);
    return '';
  }
}

/**
 * Encrypt an API key for secure storage
 * @param apiKey - Plain text API key
 * @returns Encrypted API key
 */
export function encryptApiKey(apiKey: string): string {
  if (!apiKey || apiKey.trim() === '') {
    return '';
  }
  return xorEncrypt(apiKey.trim(), ENCRYPTION_KEY);
}

/**
 * Decrypt an API key for use
 * @param encryptedApiKey - Encrypted API key
 * @returns Plain text API key
 */
export function decryptApiKey(encryptedApiKey: string): string {
  if (!encryptedApiKey || encryptedApiKey.trim() === '') {
    return '';
  }
  return xorDecrypt(encryptedApiKey.trim(), ENCRYPTION_KEY);
}

/**
 * Validate API key format based on provider
 * @param apiKey - API key to validate
 * @param provider - AI provider name
 * @returns Validation result
 */
export function validateApiKey(apiKey: string, provider: string): { valid: boolean; message: string } {
  if (!apiKey || apiKey.trim() === '') {
    return { valid: false, message: 'API key is required' };
  }

  const key = apiKey.trim();

  switch (provider) {
    case 'openai':
      if (!key.startsWith('sk-')) {
        return { valid: false, message: 'OpenAI API keys should start with "sk-"' };
      }
      if (key.length < 20) {
        return { valid: false, message: 'OpenAI API key appears to be too short' };
      }
      break;

    case 'claude':
      if (!key.startsWith('sk-ant-')) {
        return { valid: false, message: 'Claude API keys should start with "sk-ant-"' };
      }
      if (key.length < 30) {
        return { valid: false, message: 'Claude API key appears to be too short' };
      }
      break;

    case 'google':
      if (key.length < 20) {
        return { valid: false, message: 'Google API key appears to be too short' };
      }
      break;

    case 'deepseek':
      if (!key.startsWith('sk-')) {
        return { valid: false, message: 'DeepSeek API keys should start with "sk-"' };
      }
      if (key.length < 20) {
        return { valid: false, message: 'DeepSeek API key appears to be too short' };
      }
      break;

    case 'groq':
      if (!key.startsWith('gsk_')) {
        return { valid: false, message: 'Groq API keys should start with "gsk_"' };
      }
      if (key.length < 30) {
        return { valid: false, message: 'Groq API key appears to be too short' };
      }
      break;

    case 'mistral':
      if (key.length < 20) {
        return { valid: false, message: 'Mistral API key appears to be too short' };
      }
      break;

    case 'huggingface':
      if (!key.startsWith('hf_')) {
        return { valid: false, message: 'Hugging Face API keys should start with "hf_"' };
      }
      if (key.length < 20) {
        return { valid: false, message: 'Hugging Face API key appears to be too short' };
      }
      break;

    case 'together':
      if (key.length < 20) {
        return { valid: false, message: 'Together AI API key appears to be too short' };
      }
      break;

    case 'ollama':
      // Ollama doesn't require API keys for local usage
      return { valid: true, message: 'Ollama runs locally and does not require an API key' };

    default:
      if (key.length < 10) {
        return { valid: false, message: 'API key appears to be too short' };
      }
  }

  return { valid: true, message: 'API key format is valid' };
}

/**
 * Mask API key for display purposes
 * @param apiKey - API key to mask
 * @returns Masked API key
 */
export function maskApiKey(apiKey: string): string {
  if (!apiKey || apiKey.length < 8) {
    return '••••••••';
  }

  const start = apiKey.substring(0, 4);
  const end = apiKey.substring(apiKey.length - 4);
  const middle = '•'.repeat(Math.max(8, apiKey.length - 8));

  return `${start}${middle}${end}`;
}

/**
 * Generate a test API key for development/testing
 * @param provider - AI provider name
 * @returns Test API key
 */
export function generateTestApiKey(provider: string): string {
  const timestamp = Date.now().toString();

  switch (provider) {
    case 'openai':
      return `sk-test-${timestamp}`;
    case 'claude':
      return `sk-ant-test-${timestamp}`;
    case 'google':
      return `test-google-${timestamp}`;
    case 'deepseek':
      return `sk-test-deepseek-${timestamp}`;
    case 'groq':
      return `gsk_test-${timestamp}`;
    case 'mistral':
      return `test-mistral-${timestamp}`;
    case 'huggingface':
      return `hf_test-${timestamp}`;
    case 'together':
      return `test-together-${timestamp}`;
    case 'ollama':
      return 'local-ollama-no-key-required';
    default:
      return `test-${provider}-${timestamp}`;
  }
}
