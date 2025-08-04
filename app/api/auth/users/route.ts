import { NextResponse } from 'next/server'

// This endpoint shows all registered users (for testing only)
export async function GET() {
  // Import the auth config to access the in-memory users
  const authConfig = await import('@/auth.config')
  
  // Get current users
  const db = authConfig.getUsersDB ? authConfig.getUsersDB() : { users: [] }
  
  // Hide passwords in response
  const safeUsers = db.users.map((user: any) => ({
    id: user.id,
    email: user.email,
    username: user.username || 'N/A',
    name: user.name,
    clearanceLevel: user.clearanceLevel,
    createdAt: user.createdAt || 'N/A'
  }))
  
  return NextResponse.json({
    message: 'Registered Users (in current session)',
    totalUsers: safeUsers.length,
    users: safeUsers,
    note: 'Users are stored in memory and will be lost on server restart'
  })
}

// Export the getUsersDB function for this endpoint
export { getUsersDB } from '@/auth.config'