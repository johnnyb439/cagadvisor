import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// Helper functions for local JSON database
function getUsersDB() {
  try {
    const dbPath = join(process.cwd(), 'data', 'users.json')
    const data = readFileSync(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return { users: [] }
  }
}

function saveUsersDB(db: any) {
  const dbPath = join(process.cwd(), 'data', 'users.json')
  writeFileSync(dbPath, JSON.stringify(db, null, 2))
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