'use server'

import { signIn } from '@/auth.config'
import { AuthError } from 'next-auth'

// Simplified rate limiting for CodeSandbox/production
const rateLimitStore = new Map<string, {
  attempts: number
  firstAttempt: number
  blockedUntil?: number
}>()

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const BLOCK_DURATION_MS = 60 * 60 * 1000 // 1 hour

async function checkRateLimit(identifier: string) {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)
  
  if (entry?.blockedUntil && entry.blockedUntil > now) {
    return {
      allowed: false,
      blockedUntil: entry.blockedUntil
    }
  }
  
  if (entry && now - entry.firstAttempt < WINDOW_MS) {
    if (entry.attempts >= MAX_ATTEMPTS) {
      entry.blockedUntil = now + BLOCK_DURATION_MS
      return {
        allowed: false,
        blockedUntil: entry.blockedUntil
      }
    }
  }
  
  return { allowed: true }
}

async function recordAttempt(identifier: string) {
  const now = Date.now()
  let entry = rateLimitStore.get(identifier)
  
  if (!entry || now - entry.firstAttempt >= WINDOW_MS) {
    entry = {
      attempts: 1,
      firstAttempt: now,
    }
  } else {
    entry.attempts++
  }
  
  rateLimitStore.set(identifier, entry)
}

async function resetRateLimit(identifier: string) {
  rateLimitStore.delete(identifier)
}

export async function loginAction(
  prevState: any,
  formData: FormData
) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Check rate limit before attempting login
    const rateLimitResult = await checkRateLimit(email)
    if (!rateLimitResult.allowed) {
      const minutesUntilReset = Math.ceil((rateLimitResult.blockedUntil! - Date.now()) / 1000 / 60)
      return { 
        error: `Too many login attempts. Please try again in ${minutesUntilReset} minutes.` 
      }
    }

    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: '/dashboard'
      })

      // Reset rate limit on successful login
      await resetRateLimit(email)
      return { success: true }
    } catch (error) {
      // Record failed attempt
      await recordAttempt(email)
      
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return { error: 'Invalid email or password' }
          default:
            return { error: 'Authentication failed' }
        }
      }
      throw error
    }
  } catch (error) {
    console.error('Login action error:', error)
    return { error: 'An error occurred. Please try again.' }
  }
}