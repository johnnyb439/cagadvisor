import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// For Vercel deployment - use environment variable for test users
const getTestUsers = () => {
  if (process.env.TEST_USERS) {
    try {
      return JSON.parse(process.env.TEST_USERS)
    } catch (e) {
      console.error('Failed to parse TEST_USERS:', e)
    }
  }
  
  // Default demo user (password: demo123)
  return [{
    id: 'user_demo',
    email: 'demo@cagadvisor.com',
    password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
    name: 'Demo User',
    clearanceLevel: 'Secret'
  }]
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const users = getTestUsers()
        const user = users.find((u: any) => u.email === credentials.email)

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
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
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

// Simplified createUser for Vercel (stores in memory only for demo)
export async function createUser(
  email: string,
  password: string,
  name: string,
  clearanceLevel: string
) {
  // In production, this would save to a database
  // For demo purposes, we'll just return success
  const hashedPassword = await bcrypt.hash(password, 10)
  
  return {
    id: `user_${Date.now()}`,
    email,
    name,
    clearanceLevel
  }
}