import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '@/auth.config'

export async function POST(request: NextRequest) {
  console.log('REGISTER ENDPOINT HIT');
  try {
    const body = await request.json()
    const { email, username, password, name, clearanceLevel, disclaimerAgreed } = body

    // Validate required fields
    if (!email || !username || !password || !name) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate disclaimer agreement
    if (!disclaimerAgreed) {
      return NextResponse.json(
        { error: 'You must agree to the self-report disclaimer to create an account' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Validate username format (3-20 chars, alphanumeric, underscore, dash)
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: 'Username must be 3-20 characters and contain only letters, numbers, underscore, or dash' },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Create the user
    const newUser = await createUser(
      email.toLowerCase(),
      username.toLowerCase(),
      password,
      name,
      clearanceLevel || 'None'
    )

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        name: newUser.name,
        clearanceLevel: newUser.clearanceLevel
      }
    })

  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Return specific error messages
    if (error.message.includes('already registered')) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 } // Conflict
      )
    }
    
    if (error.message.includes('already taken')) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 } // Conflict
      )
    }

    // Generic error
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    )
  }
}