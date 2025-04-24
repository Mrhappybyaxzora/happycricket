// API Keys - in production these should be environment variables
const GROQ_API_KEY = "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";
const OPENAI_API_KEY = "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";

// Message type definition
export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// Default system prompt
let systemPrompt = "You are Mr. Happy, a cricket assistant by happycricket.com.";

// This gets used on the server side in API routes
export const getSystemPrompt = async (): Promise<string> => {
  try {
    const response = await fetch('/api/prompt');
    if (!response.ok) {
      throw new Error('Failed to fetch prompt');
    }
    
    const data = await response.json();
    return data.prompt;
  } catch (error) {
    console.error('Error loading prompt:', error);
    // Return default prompt if there's an error
    return systemPrompt;
  }
};

// Function to call Groq API
export const callGroqAPI = async (messages: ChatMessage[]): Promise<string> => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
};

// Function to call OpenAI API as fallback
export const callOpenAIAPI = async (messages: ChatMessage[]): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

// Function that tries Groq first, then OpenAI as fallback
export const getChatResponse = async (messages: ChatMessage[]): Promise<string> => {
  try {
    // Try Groq first
    return await callGroqAPI(messages);
  } catch (error) {
    console.log('Falling back to OpenAI due to Groq error:', error);
    try {
      // Fall back to OpenAI
      return await callOpenAIAPI(messages);
    } catch (openAIError) {
      console.error('Both API calls failed:', openAIError);
      return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    }
  }
}; 