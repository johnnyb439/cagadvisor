import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import fs from 'fs'
import path from 'path'

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      clearanceLevel?: string
      username?: string
    }
  }

  interface User {
    clearanceLevel?: string
    username?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    clearanceLevel?: string
    username?: string
  }
}

// User Data Structure
interface StoredUser {
  id: string
  email: string
  username: string
  name: string
  password: string  // Plain text for local testing
  clearanceLevel: string
  createdAt: string
  isAdmin?: boolean
}

const usersFilePath = path.join(process.cwd(), 'data', 'users.json')

// Ensure the data directory and users.json file exist
function initializeUsersDB() {
  const dir = path.dirname(usersFilePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(usersFilePath)) {
    // Initialize with test users
    const defaultUsers = [
      {
        id: 'user_admin_001',
        email: 'tone.dubai@icloud.com',
        username: 'admin',
        password: 'Admin@2025!',  // Plain text password
        name: 'Admin User',
        clearanceLevel: 'Top Secret',
        isAdmin: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'user_test_001',
        email: 'test@test.com',
        username: 'testuser',
        password: 'test123',  // Plain text password
        name: 'Test User',
        clearanceLevel: 'Secret',
        createdAt: new Date().toISOString()
      }
    ]
    fs.writeFileSync(usersFilePath, JSON.stringify(defaultUsers, null, 2), 'utf-8')
    console.log('✅ Initialized users.json with default users')
  }
}

initializeUsersDB()

// Get users from JSON file (handles both array and object formats)
export function getUsersDB(): StoredUser[] {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8')
    const parsed = JSON.parse(data)
    // Handle both { users: [] } and [] formats
    return Array.isArray(parsed) ? parsed : (parsed.users || [])
  } catch (error) {
    console.error('Error reading users.json:', error)
    return []
  }
}

// Save users to JSON file
function saveUsersDB(users: StoredUser[]): void {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8')
    console.log(`✅ Saved ${users.length} users to users.json`)
  } catch (error) {
    console.error('Error writing to users.json:', error)
  }
}

// Find user by email or username
export function findUser(identifier: string): StoredUser | undefined {
  const users = getUsersDB()
  const lowerIdentifier = identifier.toLowerCase()
  return users.find(
    u =>
      u.email.toLowerCase() === lowerIdentifier ||
      u.username.toLowerCase() === lowerIdentifier
  )
}

// Create a new user (plain text password for local testing)
export async function createUser(
  email: string,
  username: string,
  password: string,
  name: string,
  clearanceLevel: string
): Promise<StoredUser> {
  const users = getUsersDB()
  
  // Check if email already exists
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error(`Email "${email}" is already registered`)
  }

  // Check if username already exists
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    throw new Error(`Username "${username}" is already taken`)
  }

  // Create new user with plain text password
  const newUser: StoredUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    email: email.toLowerCase(),
    username: username.toLowerCase(),
    password: password,  // Store plain text for local testing
    name,
    clearanceLevel,
    createdAt: new Date().toISOString()
  }

  users.push(newUser)
  saveUsersDB(users)

  console.log(`✅ User registered: ${email} (username: ${username})`)
  return newUser
}

// Simple local auth configuration - NO external dependencies
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: 'local-dev-secret-key-2025',  // Fixed secret for local development
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔐 Login attempt:', credentials?.email)
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials')
          return null
        }

        // Get all users from local JSON
        const users = getUsersDB()
        console.log(`📊 Found ${users.length} users in database`)

        // Find user by email or username (case-insensitive)
        const user = users.find(u => 
          u.email.toLowerCase() === credentials.email.toLowerCase() ||
          u.username.toLowerCase() === credentials.email.toLowerCase()
        )

        if (!user) {
          console.log('❌ User not found:', credentials.email)
          return null
        }

        console.log('✅ User found:', user.email)

        // Simple password comparison (plain text for local testing)
        if (user.password !== credentials.password) {
          console.log('❌ Invalid password')
          return null
        }

        console.log('✅ Password correct - Login successful!')

        // Return user object for session
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          clearanceLevel: user.clearanceLevel,
          username: user.username
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60  // 30 days
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
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.clearanceLevel = token.clearanceLevel as string
        session.user.username = token.username as string
      }
      return session
    }
  },
  trustHost: true,
  debug: true  // Enable debug for troubleshooting
})

// Export helper functions
export function clearAllUsers(): void {
  saveUsersDB([])
}

export function addUser(user: StoredUser): void {
  const users = getUsersDB()
  users.push(user)
  saveUsersDB(users)
}