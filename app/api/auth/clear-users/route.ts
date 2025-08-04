import { NextResponse } from 'next/server'

// This endpoint clears all in-memory users (for testing)
export async function POST() {
  try {
    // Clear the in-memory users array
    const authConfig = await import('@/auth.config')
    
    // Access the IN_MEMORY_USERS array and clear it
    if (global.IN_MEMORY_USERS) {
      global.IN_MEMORY_USERS.length = 0
    }
    
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
    const authConfig = await import('@/auth.config')
    const db = authConfig.getUsersDB()
    
    return NextResponse.json({
      totalUsers: db.users.length,
      users: db.users.map((u: any) => ({
        email: u.email,
        username: u.username || 'N/A'
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