'use server'

import { signIn } from '@/auth.config'
import { AuthError } from 'next-auth'

export async function loginAction(
  prevState: any,
  formData: FormData
) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      return { error: 'Please enter your email/username and password' }
    }

    // Try to sign in with NextAuth
    await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    // If we get here, login was successful
  } catch (error) {
    console.error('Login error:', error)
    
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email/username or password' }
        default:
          return { error: 'Authentication failed. Please try again.' }
      }
    }
    
    // Generic error
    return { error: 'An error occurred. Please try again.' }
  }

  // Return success indicator for client-side redirect
  return { success: true }
}