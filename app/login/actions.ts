'use server'

import { signIn } from '@/auth.config'
import { AuthError } from 'next-auth'
import { checkRateLimit, recordAttempt, resetRateLimit } from '@/lib/rate-limit'

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