import { NextResponse } from 'next/server'

export async function GET() {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL
  
  return NextResponse.json({
    status: 'Auth Test Endpoint',
    environment: process.env.NODE_ENV,
    isProduction,
    vercel: !!process.env.VERCEL,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasAuthSecret: !!process.env.AUTH_SECRET,
    timestamp: new Date().toISOString(),
    demoUsers: [
      { email: 'demo@cagadvisor.com', password: 'demo123' },
      { email: 'admin@cagadvisor.com', password: 'admin123' }
    ]
  })
}