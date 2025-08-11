import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const usersFilePath = path.join(process.cwd(), 'data', 'users.json')

function getUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

function saveUsers(users: any[]) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, username, password, name, clearanceLevel, disclaimerAgreed } = body

    // Validate required fields
    if (!email || !username || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate disclaimer agreement
    if (!disclaimerAgreed) {
      return NextResponse.json(
        { success: false, error: 'You must agree to the self-report disclaimer to create an account' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const users = getUsers()
    
    // Check if email already exists
    if (users.find((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Check if username already exists
    if (users.find((u: any) => u.username.toLowerCase() === username.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: 'Username already taken' },
        { status: 409 }
      )
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: password, // Plain text for testing
      name: name,
      clearanceLevel: clearanceLevel || 'None',
      disclaimerAgreed: disclaimerAgreed,
      disclaimerAgreedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }

    // Add user and save
    users.push(newUser)
    saveUsers(users)

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newUser
    
    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Server error occurred' },
      { status: 500 }
    )
  }
}