import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth.config'
import { promises as fs } from 'fs'
import path from 'path'

const RATE_LIMIT_FILE = path.join(process.cwd(), 'data', 'rate-limits.json')

export async function GET(req: NextRequest) {
  try {
    // Check authentication - in production, verify admin role
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Read rate limit data
    let rateLimits: Record<string, any> = {}
    try {
      const data = await fs.readFile(RATE_LIMIT_FILE, 'utf-8')
      rateLimits = JSON.parse(data)
    } catch {
      // File doesn't exist yet
    }

    // Format data for display
    const now = Date.now()
    const formattedData = Object.entries(rateLimits).map(([email, entry]: [string, any]) => ({
      email,
      attempts: entry.attempts,
      firstAttempt: new Date(entry.firstAttempt).toISOString(),
      lastAttempt: new Date(entry.lastAttempt).toISOString(),
      blockedUntil: entry.blockedUntil ? new Date(entry.blockedUntil).toISOString() : null,
      isBlocked: entry.blockedUntil && entry.blockedUntil > now
    }))

    return NextResponse.json({ rateLimits: formattedData })
  } catch (error) {
    console.error('Error fetching rate limits:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Clear rate limit for a specific user
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Read current data
    let rateLimits: Record<string, any> = {}
    try {
      const data = await fs.readFile(RATE_LIMIT_FILE, 'utf-8')
      rateLimits = JSON.parse(data)
    } catch {
      return NextResponse.json({ message: 'No rate limits found' })
    }

    // Remove the specified user
    delete rateLimits[email]

    // Save updated data
    await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(rateLimits, null, 2))

    return NextResponse.json({ message: 'Rate limit cleared successfully' })
  } catch (error) {
    console.error('Error clearing rate limit:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}