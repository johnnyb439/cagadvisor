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

// In-memory user storage for CodeSandbox (resets on server restart)
// This allows testing registration without file system access
const IN_MEMORY_USERS: any[] = []

// Default demo users - starts empty, fills with registered users
const DEFAULT_USERS = [
  // Registered users will be stored here during the session
  // Note: These will be lost when the server restarts
]

// Helper functions for user management
export function getUsersDB() {
  // Use in-memory storage for CodeSandbox/production
  if (isProduction) {
    // Combine default users with newly registered users
    return { users: [...DEFAULT_USERS, ...IN_MEMORY_USERS] }
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
  // In production/CodeSandbox, save to in-memory storage
  if (isProduction) {
    // Check if user already exists in memory
    const existingUser = IN_MEMORY_USERS.find(u => u.email === email)
    if (existingUser) {
      throw new Error('User already exists')
    }
    
    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      password: hashedPassword,
      name,
      clearanceLevel,
      createdAt: new Date().toISOString()
    }
    
    // Save to in-memory storage
    IN_MEMORY_USERS.push(newUser)
    console.log(`✅ User registered in memory: ${email}`)
    console.log(`Total users in memory: ${IN_MEMORY_USERS.length}`)
    
    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      clearanceLevel: newUser.clearanceLevel
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