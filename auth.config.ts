import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

// Check if we're in production (Vercel/CodeSandbox)
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL || process.env.CODESANDBOX_HOST

// Default demo users for production
const DEFAULT_USERS = [
  {
    id: 'user_demo_1',
    email: 'demo@cagadvisor.com',
    password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u', // demo123
    name: 'Demo User',
    clearanceLevel: 'Secret'
  },
  {
    id: 'user_admin_1',
    email: 'admin@cagadvisor.com',
    password: '$2a$10$YPy8dPATPRPCp7mvQhtLz.nAPUZ/QjbD7DQpUe/QZhh4Dy5g1pYlG', // admin123
    name: 'Admin User',
    clearanceLevel: 'Top Secret'
  }
]

// Helper functions for user management
function getUsersDB() {
  // In production, use environment variable or default users
  if (isProduction) {
    if (process.env.DEMO_USERS) {
      try {
        return { users: JSON.parse(process.env.DEMO_USERS) }
      } catch (e) {
        console.error('Failed to parse DEMO_USERS:', e)
      }
    }
    return { users: DEFAULT_USERS }
  }
  
  // In development, use local file
  try {
    const dbPath = join(process.cwd(), 'data', 'users.json')
    if (existsSync(dbPath)) {
      const data = readFileSync(dbPath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Failed to read users.json:', error)
  }
  
  return { users: DEFAULT_USERS }
}

function saveUsersDB(db: any) {
  // Only save in development
  if (!isProduction) {
    try {
      const dbPath = join(process.cwd(), 'data', 'users.json')
      writeFileSync(dbPath, JSON.stringify(db, null, 2))
    } catch (error) {
      console.error('Failed to save users.json:', error)
    }
  }
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

        const db = getUsersDB()
        const user = db.users.find((u: any) => u.email === credentials.email)

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

// Helper function to create a new user
export async function createUser(
  email: string,
  password: string,
  name: string,
  clearanceLevel: string
) {
  // In production, registration is disabled for demo
  if (isProduction) {
    // For demo purposes, just return success but don't actually save
    const hashedPassword = await bcrypt.hash(password, 10)
    return {
      id: `user_${Date.now()}`,
      email,
      name,
      clearanceLevel
    }
  }
  
  // In development, use file system
  const db = getUsersDB()
  
  // Check if user already exists
  if (db.users.find((u: any) => u.email === email)) {
    throw new Error('User already exists')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  
  // Create new user
  const newUser = {
    id: `user_${Date.now()}`,
    email,
    password: hashedPassword,
    name,
    clearanceLevel,
    createdAt: new Date().toISOString()
  }

  db.users.push(newUser)
  saveUsersDB(db)

  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    clearanceLevel: newUser.clearanceLevel
  }
}