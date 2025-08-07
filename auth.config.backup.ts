import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
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

// --- User Data Persistence using JSON file ---

interface StoredUser {
  id: string
  email: string
  username: string
  name: string
  password: string
  clearanceLevel: string
  createdAt: string
}

const usersFilePath = path.join(process.cwd(), 'data', 'users.json')

// Ensure the data directory and users.json file exist
function initializeUsersDB() {
  const dir = path.dirname(usersFilePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, '[]', 'utf-8')
  }
}

initializeUsersDB()

// Get users from JSON file
export function getUsersDB(): StoredUser[] {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8')
    const parsed = JSON.parse(data)
    // Handle both { users: [] } and [] formats
    return Array.isArray(parsed) ? parsed : (parsed.users || [])
  } catch (error) {
    console.error('Error reading from users.json:', error)
    return []
  }
}

// Save users to JSON file
function saveUsersDB(users: StoredUser[]): void {
  try {
    // Save as plain array to match current file format
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing to users.json:', error)
  }
}

// Add a new user
export function addUser(user: StoredUser): void {
  const users = getUsersDB()
  users.push(user)
  saveUsersDB(users)
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

// Check if email exists
export function emailExists(email: string): boolean {
  const users = getUsersDB()
  return users.some(u => u.email.toLowerCase() === email.toLowerCase())
}

// Check if username exists
export function usernameExists(username: string): boolean {
  const users = getUsersDB()
  return users.some(u => u.username.toLowerCase() === username.toLowerCase())
}

// Clear all users
export function clearAllUsers(): void {
  saveUsersDB([])
}


// Create a new user
export async function createUser(
  email: string,
  username: string,
  password: string,
  name: string,
  clearanceLevel: string
): Promise<StoredUser> {
  // Validate inputs
  if (!email || !username || !password || !name) {
    throw new Error('All fields are required')
  }

  // Check if email already exists
  if (emailExists(email)) {
    throw new Error(`Email "'${email}'" is already registered`)
  }

  // Check if username already exists
  if (usernameExists(username)) {
    throw new Error(`Username "'${username}'" is already taken`)
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create new user
  const newUser: StoredUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    email: email.toLowerCase(),
    username: username.toLowerCase(),
    password: hashedPassword,
    name,
    clearanceLevel,
    createdAt: new Date().toISOString()
  }

  // Add to storage
  addUser(newUser)

  console.log(`✅ User registered: '${email}' (username: '${username}')`)
  console.log(`Total users: '${getUsersDB().length}'`)

  return newUser
}

// Auth configuration
const authSecret = process.env.AUTH_SECRET ||
                  process.env.NEXTAUTH_SECRET ||
                  'development-secret-key-change-in-production-2024'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: authSecret,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email/username and password')
        }

        // Find user by email or username
        const user = findUser(credentials.email as string)

        if (!user) {
          throw new Error('No account found with this email or username')
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('Invalid password')
        }

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
  debug: false
})