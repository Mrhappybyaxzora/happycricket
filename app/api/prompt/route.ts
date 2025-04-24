import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const promptPath = path.join(process.cwd(), 'public', 'mr-happy-prompt.txt');
    const promptContent = await fs.promises.readFile(promptPath, 'utf8');
    
    return NextResponse.json({ prompt: promptContent });
  } catch (error) {
    console.error('Failed to load system prompt:', error);
    return NextResponse.json(
      { error: 'Failed to load system prompt' },
      { status: 500 }
    );
  }
} 