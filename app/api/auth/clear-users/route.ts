import { NextResponse } from 'next/server'
import { clearAllUsers, getUsersDB } from '@/auth.config'

// POST endpoint to clear all users
export async function POST() {
  try {
    clearAllUsers()
    
    return NextResponse.json({
      success: true,
      message: 'All in-memory users have been cleared',
      note: 'You can now register fresh test accounts'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to clear users' },
      { status: 500 }
    )
  }
}

// GET endpoint to check how many users exist
export async function GET() {
  try {
    const users = getUsersDB()
    
    return NextResponse.json({
      totalUsers: users.length,
      users: users.map(u => ({
        email: u.email,
        username: u.username
      })),
      message: 'These users are currently registered in memory'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get users' },
      { status: 500 }
    )
  }
}