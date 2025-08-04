import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// Simple demo users for CodeSandbox
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = DEMO_USERS.find(u => u.email === credentials.email)
        if (!user) {
          return null
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          clearanceLevel: user.clearanceLevel
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET || 'codesandbox-dev-secret-change-in-production',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.clearanceLevel = user.clearanceLevel
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.clearanceLevel = token.clearanceLevel as string
      }
      return session
    }
  },
  trustHost: true
})

// Simple user creation for demo
export async function createUser(
  email: string,
  password: string,
  name: string,
  clearanceLevel: string
) {
  // For demo, just return success without actually saving
  return {
    id: `user_${Date.now()}`,
    email,
    name,
    clearanceLevel
  }
}