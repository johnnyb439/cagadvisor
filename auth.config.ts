import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// Detect CodeSandbox environment
const isCodeSandbox = typeof process !== 'undefined' && (
  process.env.CODESANDBOX_HOST || 
  process.env.HOSTNAME?.includes('csb.app') ||
  process.env.NEXTAUTH_URL?.includes('csb.app') ||
  process.env.CODESANDBOX_SSE === '1'
)

// Check if we're in production (Vercel/CodeSandbox)  
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL || isCodeSandbox

// Default demo users - CLEARED FOR CUSTOM ACCOUNTS
const DEFAULT_USERS = [
  // Add your custom test accounts here
  // Format: { id: 'unique_id', email: 'email@example.com', password: 'hashed_password', name: 'Name', clearanceLevel: 'Secret|Top Secret' }
]

// Helper functions for user management
function getUsersDB() {
  // Always use default users in production/CodeSandbox
  if (isProduction) {
    return { users: DEFAULT_USERS }
  }
  
  // In development, try to use local file
  try {
    const fs = require('fs')
    const path = require('path')
    const dbPath = path.join(process.cwd(), 'data', 'users.json')
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Failed to read users.json:', error)
  }
  
  return { users: DEFAULT_USERS }
}

function saveUsersDB(db: any) {
  // Only save in development, never in production/CodeSandbox
  if (!isProduction) {
    try {
      const fs = require('fs')
      const path = require('path')
      const dbPath = path.join(process.cwd(), 'data', 'users.json')
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
    } catch (error) {
      console.error('Failed to save users.json:', error)
    }
  }
}

// HARDCODED SECRET for CodeSandbox - in production use environment variable
const authSecret = process.env.AUTH_SECRET || 
                  process.env.NEXTAUTH_SECRET || 
                  'codesandbox-demo-secret-change-in-production-2024'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: authSecret,
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
  trustHost: true,
  debug: isCodeSandbox // Enable debug in CodeSandbox
})

// Helper function to create a new user
export async function createUser(
  email: string,
  password: string,
  name: string,
  clearanceLevel: string
) {
  // In production/CodeSandbox, registration is disabled for demo
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