import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

interface InterviewRequest {
  difficultyTier: number
  conversationHistory?: { role: 'user' | 'assistant'; content: string }[]
}

interface HeygenVideoResponse {
  data: {
    video_id: string
  }
}

interface HeygenStatusResponse {
  data: {
    video_id: string
    status: string
    video_url?: string
  }
}

// Initialize OpenAI client lazily to avoid build-time errors
let openai: OpenAI | null = null

function getOpenAIClient() {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return openai
}

// Helper function to poll Heygen video status
async function pollVideoStatus(videoId: string): Promise<string> {
  const maxAttempts = 60 // 60 attempts * 2 seconds = 2 minutes max wait
  let attempts = 0
  
  while (attempts < maxAttempts) {
    try {
      const response = await fetch(`https://api.heygen.com/v2/video/status/${videoId}`, {
        method: 'GET',
        headers: {
          'x-api-key': process.env.HEYGEN_API_KEY || '',
        },
      })

      if (!response.ok) {
        throw new Error(`Heygen status check failed: ${response.statusText}`)
      }

      const data: HeygenStatusResponse = await response.json()
      
      if (data.data.status === 'completed' && data.data.video_url) {
        return data.data.video_url
      } else if (data.data.status === 'failed') {
        throw new Error('Video generation failed')
      }
      
      // Wait 2 seconds before next attempt
      await new Promise(resolve => setTimeout(resolve, 2000))
      attempts++
    } catch (error) {
      console.error('Error polling video status:', error)
      throw error
    }
  }
  
  throw new Error('Video generation timed out')
}

export async function POST(request: NextRequest) {
  try {
    const body: InterviewRequest = await request.json()
    const { difficultyTier, conversationHistory } = body

    // Validate difficulty tier
    if (!difficultyTier || difficultyTier < 1 || difficultyTier > 5) {
      return NextResponse.json(
        { error: 'Invalid difficulty tier. Must be between 1 and 5.' },
        { status: 400 }
      )
    }

    // Prepare messages for OpenAI
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `You are an expert IT hiring manager conducting a technical interview. Your task is to ask a single, relevant interview question based on the difficulty tier provided. Be professional, clear, and concise.`
      }
    ]

    // Add conversation history if present
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        })
      })
      messages.push({
        role: 'user',
        content: 'Based on my previous answer, ask a relevant follow-up question. Keep it concise and focused on assessing my technical knowledge.'
      })
    } else {
      // Initial question based on difficulty tier
      const difficultyDescriptions = {
        1: 'basic help desk and troubleshooting',
        2: 'intermediate technical support and basic networking',
        3: 'mid-level systems administration and security',
        4: 'advanced infrastructure and cloud technologies',
        5: 'expert-level architecture and complex problem-solving'
      }
      
      messages.push({
        role: 'user',
        content: `Ask me a single, tier ${difficultyTier} interview question for an IT support role focusing on ${difficultyDescriptions[difficultyTier as keyof typeof difficultyDescriptions]}. The question should be concise and clear. Do not add any conversational fluff or introductory text. Just return the question.`
      })
    }

    // Generate question using OpenAI
    const client = getOpenAIClient()
    if (!client) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }
    
    const completion = await client.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      temperature: 0.7,
      max_tokens: 150,
    })

    const questionText = completion.choices[0]?.message?.content?.trim()
    
    if (!questionText) {
      throw new Error('Failed to generate question')
    }

    // Generate video using Heygen API
    const heygenResponse = await fetch('https://api.heygen.com/v2/video/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.HEYGEN_API_KEY || '',
      },
      body: JSON.stringify({
        video_inputs: [
          {
            character: {
              type: 'avatar',
              avatar_id: 'josh_lite3_20230714', // Default professional avatar
              avatar_style: 'normal',
            },
            voice: {
              type: 'text',
              input_text: questionText,
              voice_id: 'en-US-ChristopherNeural', // Professional male voice
            },
          },
        ],
        test: false,
        caption: false,
      }),
    })

    if (!heygenResponse.ok) {
      const errorText = await heygenResponse.text()
      console.error('Heygen API error:', errorText)
      throw new Error(`Heygen API failed: ${heygenResponse.statusText}`)
    }

    const heygenData: HeygenVideoResponse = await heygenResponse.json()
    const videoId = heygenData.data.video_id

    // Poll for video completion
    const videoUrl = await pollVideoStatus(videoId)

    // Return the response
    return NextResponse.json({
      videoUrl,
      questionText,
    })
  } catch (error) {
    console.error('Interview API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}