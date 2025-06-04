# AI Providers Setup Guide

This guide explains how to set up and use the various AI providers available in the dashboard.

## Available AI Providers

### 🆓 Free Providers

#### 1. DeepSeek (Free)
- **Models**: DeepSeek R1, DeepSeek V3, DeepSeek Coder
- **Cost**: Very low cost (almost free)
- **API Key**: Required (starts with `sk-`)
- **Setup**: 
  1. Visit [DeepSeek Platform](https://platform.deepseek.com/)
  2. Create an account
  3. Generate API key
  4. Use in dashboard

#### 2. Groq (Fast & Free)
- **Models**: Llama 3.3 70B, Llama 3.1 70B, Mixtral 8x7B, Qwen 2.5 32B
- **Cost**: Free tier available
- **Speed**: Ultra-fast inference
- **API Key**: Required (starts with `gsk_`)
- **Setup**:
  1. Visit [Groq Console](https://console.groq.com/)
  2. Sign up for free account
  3. Generate API key
  4. Free tier includes generous limits

#### 3. Hugging Face (Free)
- **Models**: DialoGPT, BLOOM, and many open-source models
- **Cost**: Free for inference API
- **API Key**: Required (starts with `hf_`)
- **Setup**:
  1. Visit [Hugging Face](https://huggingface.co/)
  2. Create account
  3. Go to Settings > Access Tokens
  4. Generate new token

#### 4. Ollama (Local)
- **Models**: Llama 3.2, Qwen 2.5, Mistral, Code Llama
- **Cost**: Completely free (runs locally)
- **API Key**: Not required
- **Setup**:
  1. Install [Ollama](https://ollama.ai/)
  2. Pull models: `ollama pull llama3.2`
  3. Start Ollama server
  4. No API key needed

### 💰 Paid Providers

#### 1. OpenAI
- **Models**: GPT-4o, GPT-4 Turbo, GPT-4, GPT-3.5 Turbo
- **Cost**: Pay per token
- **API Key**: Required (starts with `sk-`)
- **Setup**:
  1. Visit [OpenAI Platform](https://platform.openai.com/)
  2. Add payment method
  3. Generate API key

#### 2. Anthropic Claude
- **Models**: Claude 3 Opus, Sonnet, Haiku
- **Cost**: Pay per token
- **API Key**: Required (starts with `sk-ant-`)
- **Setup**:
  1. Visit [Anthropic Console](https://console.anthropic.com/)
  2. Add payment method
  3. Generate API key

#### 3. Google Gemini
- **Models**: Gemini 2.0 Flash, Gemini Pro, Gemini Pro Vision
- **Cost**: Free tier + paid tiers
- **API Key**: Required
- **Setup**:
  1. Visit [Google AI Studio](https://aistudio.google.com/)
  2. Create API key
  3. Enable billing if needed

#### 4. Mistral AI
- **Models**: Mistral Large, Medium, Small
- **Cost**: Pay per token
- **API Key**: Required
- **Setup**:
  1. Visit [Mistral Platform](https://console.mistral.ai/)
  2. Add payment method
  3. Generate API key

#### 5. Together AI
- **Models**: Llama 3.2 90B Vision, Llama 3.1 70B Turbo, Qwen 2.5 72B
- **Cost**: Pay per token
- **API Key**: Required
- **Setup**:
  1. Visit [Together AI](https://together.ai/)
  2. Sign up and add payment
  3. Generate API key

## Quick Start Guide

### Step 1: Choose Your Provider
1. **For beginners**: Start with Groq (free and fast)
2. **For local use**: Use Ollama (completely free, runs offline)
3. **For advanced features**: Try DeepSeek (very cheap, GPT-4 level)
4. **For production**: Consider OpenAI or Claude

### Step 2: Get API Key
1. Visit the provider's website
2. Create an account
3. Generate API key
4. Copy the key securely

### Step 3: Configure in Dashboard
1. Click "API Configuration" in the AI Settings
2. Select your provider
3. Enter your API key
4. Choose a model
5. Save configuration

### Step 4: Test the Integration
1. Use the "Natural Language Query" feature
2. Ask a simple question like "What is AI?"
3. Verify the response

## Model Recommendations

### For Different Use Cases

#### 🚀 **Fast Responses** (Real-time chat)
- Groq: Llama 3.3 70B
- DeepSeek: DeepSeek V3
- OpenAI: GPT-3.5 Turbo

#### 🧠 **Complex Analysis** (Data insights)
- DeepSeek: DeepSeek R1
- OpenAI: GPT-4o
- Claude: Claude 3 Opus

#### 💻 **Code Generation**
- DeepSeek: DeepSeek Coder
- Ollama: Code Llama
- OpenAI: GPT-4 Turbo

#### 🌍 **Multilingual Support**
- Groq: Qwen 2.5 32B
- Together AI: Qwen 2.5 72B
- Google: Gemini Pro

#### 💰 **Budget-Friendly**
1. Ollama (Free, local)
2. Groq (Free tier)
3. DeepSeek (Very cheap)
4. Hugging Face (Free)

## Troubleshooting

### Common Issues

#### API Key Not Working
- Check if key starts with correct prefix
- Verify account has credits/billing enabled
- Ensure key has proper permissions

#### Model Not Responding
- Check internet connection
- Verify provider service status
- Try a different model

#### Rate Limits
- Wait before retrying
- Upgrade to paid tier
- Use different provider

### Error Messages

#### "API key is null"
- Ensure API key is properly entered
- Check for extra spaces
- Re-enter the key

#### "Provider not found"
- Refresh the page
- Clear browser cache
- Check for updates

## Best Practices

### Security
- Never share API keys
- Use environment variables in production
- Rotate keys regularly
- Monitor usage

### Performance
- Choose appropriate model for task
- Use free models for testing
- Monitor token usage
- Cache responses when possible

### Cost Optimization
- Start with free providers
- Monitor usage patterns
- Use cheaper models for simple tasks
- Set usage limits

## Support

If you encounter issues:
1. Check this documentation
2. Verify API key and provider status
3. Try a different model/provider
4. Contact support with error details

---

**Last Updated**: January 2025
**Supported Providers**: 8 providers, 25+ models
