import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { token, action } = await request.json()

    // If CAPTCHA is disabled, always return success
    if (process.env.NEXT_PUBLIC_ENABLE_CAPTCHA !== 'true') {
      return NextResponse.json({ success: true, score: 1.0, action })
    }

    // If no token provided when CAPTCHA is enabled
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 400 }
      )
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY not configured')
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Verify the token with Google
    const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify'
    const response = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()

    // Check if verification was successful
    if (!data.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid token', details: data['error-codes'] },
        { status: 400 }
      )
    }

    // Check the score (0.0 - 1.0, where 1.0 is very likely a good interaction)
    const score = data.score || 0
    const threshold = 0.5 // Adjust this based on your needs

    if (score < threshold) {
      return NextResponse.json(
        { success: false, score, error: 'Score too low' },
        { status: 400 }
      )
    }

    // Check if the action matches
    if (data.action !== action) {
      return NextResponse.json(
        { success: false, error: 'Action mismatch' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      score,
      action: data.action,
      hostname: data.hostname,
    })
  } catch (error) {
    console.error('CAPTCHA verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}