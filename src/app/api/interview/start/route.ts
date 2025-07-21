
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client lazily to avoid build-time errors
let openai: OpenAI | null = null;

function getOpenAIClient() {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

// Placeholder for Heygen API call
async function generateHeygenVideo(text: string) {
  // In a real implementation, you would call the Heygen API here.
  // For now, we'll just return a placeholder video ID.
  console.log(`Generating Heygen video for: ${text}`);
  return new Promise(resolve => setTimeout(() => resolve('placeholder_video_id'), 1000));
}

export async function POST(request: Request) {
  try {
    const { difficulty } = await request.json();

    if (!difficulty || difficulty < 1 || difficulty > 5) {
      return NextResponse.json({ error: 'Invalid difficulty tier' }, { status: 400 });
    }

    const prompt = `Ask me a Tier ${difficulty} IT interview question.`;

    const client = getOpenAIClient();
    if (!client) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }
    
    const completion = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const question = completion.choices[0].message.content;

    if (!question) {
      return NextResponse.json({ error: 'Failed to generate question' }, { status: 500 });
    }

    const videoId = await generateHeygenVideo(question);

    return NextResponse.json({ question, videoId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
