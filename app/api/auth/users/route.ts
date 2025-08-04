import { NextResponse } from 'next/server'
import { getUsersDB } from '@/auth.config'

export async function GET() {
  const users = getUsersDB()
  
  // Return users without passwords
  const safeUsers = users.map(user => ({
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    clearanceLevel: user.clearanceLevel,
    createdAt: user.createdAt
  }))

  return NextResponse.json({
    message: 'Registered Users (in current session)',
    totalUsers: safeUsers.length,
    users: safeUsers,
    note: 'Users are stored in memory and will be lost on server restart'
  })
}