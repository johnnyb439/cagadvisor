'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Shield, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loginAction } from './actions'

export default function LoginPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)
    
    // Use NextAuth signIn
    startTransition(async () => {
      const result = await loginAction(null, formData)
      if (result?.error) {
        setError(result.error)
      }
    })
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
                Email or Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-dynamic-green dark:focus:border-dynamic-green transition-all duration-200"
                  placeholder="email@example.com or username"
                  disabled={isPending}
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
                  name="password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-dynamic-green dark:focus:border-dynamic-green transition-all duration-200"
                  placeholder="Enter your password"
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2"
              >
                <AlertCircle size={20} className="text-red-600 dark:text-red-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  {error.includes('Too many login attempts') && (
                    <p className="text-xs text-red-500 dark:text-red-300 mt-1">
                      You have been temporarily blocked due to multiple failed login attempts. 
                      Please wait before trying again.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-dynamic-green to-dynamic-blue text-white py-3 rounded-lg hover:from-emerald-green hover:to-cyber-cyan transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-ops-charcoal rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              <strong>Security Notice:</strong> We never store sensitive clearance information. 
              Your privacy is our priority.
            </p>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="text-dynamic-green hover:text-emerald-green font-semibold">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}