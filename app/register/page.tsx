'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Shield, AlertCircle, Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRecaptcha } from '@/hooks/useRecaptcha'

export default function RegisterPage() {
  const router = useRouter()
  const { executeRecaptcha, isEnabled: isCaptchaEnabled } = useRecaptcha()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    clearanceLevel: '',
    agreeToTerms: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions')
      return
    }

    setLoading(true)

    try {
      // Execute reCAPTCHA if enabled
      if (isCaptchaEnabled) {
        const token = await executeRecaptcha('register')
        
        if (!token) {
          setError('reCAPTCHA verification failed. Please try again.')
          setLoading(false)
          return
        }

        // Verify the token on the server
        const verifyResponse = await fetch('/api/auth/verify-captcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, action: 'register' })
        })

        const verifyResult = await verifyResponse.json()

        if (!verifyResult.success) {
          setError('Security verification failed. Please try again.')
          setLoading(false)
          return
        }
      }

      // Simulate registration - in production this would connect to your auth system
      setTimeout(() => {
        // Store user data
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          name: formData.name,
          clearanceLevel: formData.clearanceLevel
        }))
        router.push('/dashboard')
      }, 1000)
    } catch (err) {
      console.error('Registration error:', err)
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
            <h1 className="text-2xl font-montserrat font-bold mb-2 dark:text-white">Create Your Account</h1>
            <p className="text-gray-600 dark:text-gray-400">Join the cleared professional community</p>
          </div>

          {/* Account Type Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex">
              <button
                className="px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm"
              >
                Individual
              </button>
              <Link 
                href="/register/company"
                className="px-4 py-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Company
              </Link>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-dynamic-green dark:text-white"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-dynamic-green dark:text-white"
                  placeholder="john.doe@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="clearance" className="block text-sm font-medium mb-2">
                Current Clearance Level
              </label>
              <select
                id="clearance"
                value={formData.clearanceLevel}
                onChange={(e) => setFormData({ ...formData, clearanceLevel: e.target.value })}
                className="w-full px-4 py-3 border dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-dynamic-green dark:text-white"
                required
              >
                <option value="">Select clearance level</option>
                <option value="NONE">No Clearance</option>
                <option value="PUBLIC">Public Trust</option>
                <option value="SECRET">SECRET</option>
                <option value="TS">TOP SECRET</option>
                <option value="TS/SCI">TS/SCI</option>
              </select>
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-dynamic-green dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Must be at least 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-dynamic-green dark:text-white"
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

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                className="mt-1 mr-2"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <Link href="/terms" className="text-dynamic-green hover:text-emerald-green">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-dynamic-green hover:text-emerald-green">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-ops-charcoal rounded-lg">
            <div className="flex items-start">
              <Check className="text-green-600 mr-2 mt-0.5" size={16} />
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <p className="font-semibold mb-1">Your Privacy is Protected</p>
                <ul className="space-y-1">
                  <li>• We never store sensitive clearance details</li>
                  <li>• No SSN or personal investigation data</li>
                  <li>• Your information is encrypted and secure</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-dynamic-green hover:text-emerald-green font-semibold">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}