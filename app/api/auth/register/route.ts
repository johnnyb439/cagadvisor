import { NextResponse } from 'next/server'
import { createUser } from '@/auth.config'

// Simplified rate limiting for CodeSandbox
const rateLimitStore = new Map<string, {
  attempts: number
  firstAttempt: number
  blockedUntil?: number
}>()

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000
const BLOCK_DURATION_MS = 60 * 60 * 1000

async function checkRateLimit(identifier: string) {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)
  
  if (entry?.blockedUntil && entry.blockedUntil > now) {
    return { allowed: false, blockedUntil: entry.blockedUntil }
  }
  
  if (entry && now - entry.firstAttempt < WINDOW_MS) {
    if (entry.attempts >= MAX_ATTEMPTS) {
      entry.blockedUntil = now + BLOCK_DURATION_MS
      return { allowed: false, blockedUntil: entry.blockedUntil }
    }
  }
  
  return { allowed: true }
}

async function recordAttempt(identifier: string) {
  const now = Date.now()
  let entry = rateLimitStore.get(identifier)
  
  if (!entry || now - entry.firstAttempt >= WINDOW_MS) {
    entry = { attempts: 1, firstAttempt: now }
  } else {
    entry.attempts++
  }
  
  rateLimitStore.set(identifier, entry)
}

async function resetRateLimit(identifier: string) {
  rateLimitStore.delete(identifier)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, username, password, name, clearanceLevel } = body

    // Validate input
    if (!email || !username || !password || !name || !clearanceLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate username format (alphanumeric, underscore, dash, 3-20 chars)
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: 'Username must be 3-20 characters and contain only letters, numbers, underscore, or dash' },
        { status: 400 }
      )
    }

    // Check rate limit for registration
    const rateLimitResult = await checkRateLimit(`register:${email}`)
    if (!rateLimitResult.allowed) {
      const minutesUntilReset = Math.ceil((rateLimitResult.blockedUntil! - Date.now()) / 1000 / 60)
      return NextResponse.json(
        { error: `Too many registration attempts. Please try again in ${minutesUntilReset} minutes.` },
        { status: 429 }
      )
    }

    try {
      // Create user with username
      const user = await createUser(email, username, password, name, clearanceLevel)

      // Reset rate limit on successful registration
      await resetRateLimit(`register:${email}`)

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          clearanceLevel: user.clearanceLevel
        }
      })
    } catch (error: any) {
      // Record failed attempt
      await recordAttempt(`register:${email}`)
      
      return NextResponse.json(
        { error: error.message || 'Registration failed' },
        { status: 400 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 400 }
    )
  }
}