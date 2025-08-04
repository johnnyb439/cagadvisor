// Hardcoded auth configuration specifically for CodeSandbox
// This bypasses environment variable issues

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// Hardcoded demo users
const DEMO_USERS = [
  {
    id: 'user_demo_1',
    email: 'demo@cagadvisor.com',
    password: '$2b$10$QRESah7q31cZZgyNWBji4e.6zUWKRtrQmTSdRHClZq4LOVwkSdt1.', // demo123
    name: 'Demo User',
    clearanceLevel: 'Secret'
  },
  {
    id: 'user_admin_1',
    email: 'admin@cagadvisor.com',
    password: '$2b$10$Z.kjKiqTnebDBGtaqNRJX.AaXzMzOE8DJYKGOR4xb0BZYzYsuibOS', // admin123
    name: 'Admin User',
    clearanceLevel: 'Top Secret'
  }
]

// Hardcoded configuration - no environment variables needed
const config = {
  // HARDCODED SECRET - This is for demo only
  secret: 'codesandbox-demo-secret-key-change-in-production-2024',
  
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        const user = DEMO_USERS.find(u => u.email === credentials.email)
        if (!user) {
          console.log('User not found:', credentials.email)
          return null
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isValid) {
          console.log('Invalid password for:', credentials.email)
          return null
        }

        console.log('Login successful for:', credentials.email)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          clearanceLevel: user.clearanceLevel
        }
      }
    })
  ],
  
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60
  },
  
  pages: {
    signIn: '/login',
    error: '/login'
  },
  
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.clearanceLevel = user.clearanceLevel
      }
      return token
    },
    
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.clearanceLevel = token.clearanceLevel
      }
      return session
    }
  },
  
  trustHost: true,
  debug: true // Enable debug logs
}

export const { handlers, signIn, signOut, auth } = NextAuth(config)

// Simple user creation for demo
export async function createUser(
  email: string,
  password: string,
  name: string,
  clearanceLevel: string
) {
  console.log('Demo mode: User registration (not saved):', email)
  return {
    id: `user_${Date.now()}`,
    email,
    name,
    clearanceLevel
  }
}