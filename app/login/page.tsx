'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Shield, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRecaptcha } from '@/hooks/useRecaptcha'

export default function LoginPage() {
  const router = useRouter()
  const { executeRecaptcha, isEnabled: isCaptchaEnabled } = useRecaptcha()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Execute reCAPTCHA if enabled
      if (isCaptchaEnabled) {
        const token = await executeRecaptcha('login')
        
        if (!token) {
          setError('reCAPTCHA verification failed. Please try again.')
          setLoading(false)
          return
        }

        // Verify the token on the server
        const verifyResponse = await fetch('/api/auth/verify-captcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, action: 'login' })
        })

        const verifyResult = await verifyResponse.json()

        if (!verifyResult.success) {
          setError('Security verification failed. Please try again.')
          setLoading(false)
          return
        }
      }

      // Simulate login - in production this would connect to your auth system
      setTimeout(() => {
        if (email && password) {
          // Store minimal user data in localStorage for demo
          localStorage.setItem('user', JSON.stringify({
            email,
            name: email.split('@')[0],
            clearanceLevel: 'SECRET'
          }))
          router.push('/dashboard')
        } else {
          setError('Please enter both email and password')
          setLoading(false)
        }
      }, 1000)
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-ops-charcoal py-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full mx-4"
      >
        <div className="bg-white dark:bg-command-black rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-dynamic-green to-dynamic-blue rounded-full mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-montserrat font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">Log in to your Cleared Advisory account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-dynamic-green dark:focus:border-dynamic-green"
                  placeholder="john.doe@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-dynamic-green dark:focus:border-dynamic-green"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center p-3 bg-red-50 text-red-700 rounded-lg"
              >
                <AlertCircle size={20} className="mr-2" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-dynamic-green hover:text-emerald-green">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-ops-charcoal rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              <strong>Security Notice:</strong> We never store sensitive clearance information. 
              Your privacy is our priority.
              {isCaptchaEnabled && (
                <span className="block mt-2">
                  Protected by reCAPTCHA v3
                </span>
              )}
            </p>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="text-dynamic-green hover:text-emerald-green font-semibold">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}