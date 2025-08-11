'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building, Mail, Lock, Phone, Users, Check, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CompanyRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companySize: '',
    hiringNeeds: '',
    agreeToTerms: false,
    agreeToDisclaimer: false
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

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

    if (!formData.agreeToDisclaimer) {
      setError('Please acknowledge the self-report disclaimer')
      return
    }

    setLoading(true)

    try {
      // Call the real API endpoint
      const response = await fetch('/api/auth/register/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          companySize: formData.companySize,
          hiringNeeds: formData.hiringNeeds,
          disclaimerAgreed: formData.agreeToDisclaimer
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Registration failed. Please try again.')
        setLoading(false)
        return
      }

      // Registration successful
      setSuccess('🎉 Company account created successfully!')
      
      // Store company data and redirect
      if (data.company) {
        localStorage.setItem('company', JSON.stringify(data.company))
        localStorage.setItem('currentUser', JSON.stringify({
          ...data.company,
          name: data.company.contactName,
          isCompany: true
        }))
      }

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/dashboard/company')
      }, 1500)

    } catch (err) {
      console.error('Registration error:', err)
      setError('An error occurred during registration. Please try again.')
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-ops-charcoal py-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full mx-4"
      >
        <div className="bg-white dark:bg-command-black rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-dynamic-blue to-navy-blue rounded-full mb-4">
              <Building size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-montserrat font-bold mb-2 dark:text-white">Company Registration</h1>
            <p className="text-gray-600 dark:text-gray-400">Partner with us to find cleared IT talent</p>
          </div>

          {/* Account Type Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex">
              <Link 
                href="/register"
                className="px-4 py-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Individual
              </Link>
              <button
                className="px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm"
              >
                Company
              </button>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center"
            >
              <Check size={20} className="text-green-500 mr-2" />
              <span className="text-green-700 dark:text-green-400 text-sm">{success}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
                  <input
                    type="text"
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-dynamic-green dark:text-white"
                    placeholder="Acme Defense Corp"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactName" className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Contact Person
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
                  <input
                    type="text"
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-dynamic-green dark:text-white"
                    placeholder="Jane Smith"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Business Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-dynamic-green dark:text-white"
                    placeholder="hr@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 dark:text-gray-300">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-dynamic-green dark:text-white"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="companySize" className="block text-sm font-medium mb-2 dark:text-gray-300">
                Company Size
              </label>
              <select
                id="companySize"
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                className="w-full px-4 py-3 border dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-dynamic-green dark:text-white"
                required
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>

            <div>
              <label htmlFor="hiringNeeds" className="block text-sm font-medium mb-2 dark:text-gray-300">
                Immediate Hiring Needs
              </label>
              <textarea
                id="hiringNeeds"
                value={formData.hiringNeeds}
                onChange={(e) => setFormData({ ...formData, hiringNeeds: e.target.value })}
                className="w-full px-4 py-3 border dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-dynamic-green dark:text-white"
                rows={3}
                placeholder="e.g., Looking for 5 cleared network engineers for upcoming contract..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 dark:text-gray-300">
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
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 dark:text-gray-300">
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
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg"
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

            <div className="flex items-start">
              <input
                type="checkbox"
                id="disclaimer"
                checked={formData.agreeToDisclaimer}
                onChange={(e) => setFormData({ ...formData, agreeToDisclaimer: e.target.checked })}
                className="mt-1 mr-2"
              />
              <label htmlFor="disclaimer" className="text-sm text-gray-600 dark:text-gray-400">
                I acknowledge that candidate information is self-reported and our company is responsible for verification
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.agreeToTerms || !formData.agreeToDisclaimer}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Company Account...' : 'Create Company Account'}
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start">
              <Check className="text-blue-600 dark:text-blue-400 mr-2 mt-0.5" size={16} />
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <p className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Company Benefits</p>
                <ul className="space-y-1">
                  <li>• Access to pre-screened cleared professionals</li>
                  <li>• Bulk job posting capabilities</li>
                  <li>• Priority candidate matching</li>
                  <li>• Dedicated account support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have a company account?{' '}
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