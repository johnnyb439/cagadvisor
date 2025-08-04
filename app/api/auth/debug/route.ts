import { NextResponse } from 'next/server'

export async function GET() {
  // Debug information to help fix auth issues
  const debugInfo = {
    message: 'Auth Debug Endpoint',
    timestamp: new Date().toISOString(),
    
    environment: {
      NODE_ENV: process.env.NODE_ENV || 'not set',
      AUTH_SECRET: process.env.AUTH_SECRET ? 'SET (hidden)' : 'NOT SET',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET (hidden)' : 'NOT SET',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
      CODESANDBOX_HOST: process.env.CODESANDBOX_HOST || 'NOT SET',
      HOSTNAME: process.env.HOSTNAME || 'NOT SET',
    },
    
    authPages: {
      login: '/login - EXISTS',
      register: '/register - EXISTS',
      api_route: '/api/auth/[...nextauth] - EXISTS'
    },
    
    testAccounts: [
      {
        email: 'demo@cagadvisor.com',
        password: 'demo123',
        description: 'Demo user with Secret clearance'
      },
      {
        email: 'admin@cagadvisor.com',
        password: 'admin123',
        description: 'Admin user with Top Secret clearance'
      }
    ],
    
    instructions: {
      step1: 'If AUTH_SECRET shows NOT SET, add it in CodeSandbox environment variables',
      step2: 'Use: AUTH_SECRET=codesandbox-secret-key-123456789',
      step3: 'Also add: NEXTAUTH_SECRET=codesandbox-secret-key-123456789',
      step4: 'And: NEXTAUTH_URL=https://dfv3s6-3000.csb.app',
      step5: 'Restart server after adding variables'
    }
  }
  
  return NextResponse.json(debugInfo, { 
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}