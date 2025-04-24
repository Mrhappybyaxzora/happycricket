import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { getChatResponse, getSystemPrompt, type ChatMessage } from '@/lib/chatbot-api';
import fs from 'fs';
import path from 'path';

// Helper function to get prompt from file
const getPromptFromFile = async (concise: boolean = false): Promise<string> => {
  try {
    const promptPath = path.join(process.cwd(), 'public', 'mr-happy-prompt.txt');
    let promptContent = await fs.promises.readFile(promptPath, 'utf8');
    
    if (concise) {
      // Add instructions for concise responses
      promptContent += "\n\nIMPORTANT: Keep your responses extremely brief and concise. Use 50 words or less when possible. Focus only on the most important information. Avoid unnecessary details, greetings, or explanations.";
    }
    
    return promptContent;
  } catch (error) {
    console.error('Failed to load system prompt:', error);
    const basePrompt = "You are Mr. Happy, a cricket assistant by happycricket.com.";
    
    return concise 
      ? basePrompt + " Keep responses extremely brief, under 50 words when possible."
      : basePrompt;
  }
};

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Parse request body
    const body = await req.json();
    const { messages, options } = body as { 
      messages: ChatMessage[],
      options?: { concise?: boolean }
    };
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request. Messages array is required.' },
        { status: 400 }
      );
    }
    
    // Check if concise mode is requested
    const conciseMode = options?.concise === true;
    
    // Get system prompt directly from file (more reliable in server context)
    const systemPrompt = await getPromptFromFile(conciseMode);
    const hasSystemMessage = messages.some(msg => msg.role === 'system');
    
    const messagesWithSystem: ChatMessage[] = hasSystemMessage 
      ? messages 
      : [{ role: 'system', content: systemPrompt }, ...messages];
    
    // Get response from AI
    const response = await getChatResponse(messagesWithSystem);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
} 