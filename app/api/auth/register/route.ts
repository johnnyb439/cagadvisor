import { NextResponse } from 'next/server'
import { createUser } from '@/auth.config'
import { checkRateLimit, recordAttempt, resetRateLimit } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, clearanceLevel } = body

    // Validate input
    if (!email || !password || !name || !clearanceLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
      // Create user
      const user = await createUser(email, password, name, clearanceLevel)

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