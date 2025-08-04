import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'Auth system is working',
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      CODESANDBOX_HOST: process.env.CODESANDBOX_HOST,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      isProduction: process.env.NODE_ENV === 'production' || process.env.VERCEL || process.env.CODESANDBOX_HOST
    },
    demoUsers: [
      { email: 'demo@cagadvisor.com', password: 'demo123', clearance: 'Secret' },
      { email: 'admin@cagadvisor.com', password: 'admin123', clearance: 'Top Secret' }
    ],
    timestamp: new Date().toISOString()
  })
}