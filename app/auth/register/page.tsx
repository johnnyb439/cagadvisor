'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Shield } from 'lucide-react'

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<'candidate' | 'employer'>('candidate')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    clearanceLevel: '',
    company: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Register:', formData)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
          Join Cleared Advisory
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex mb-6">
            <button
              type="button"
              onClick={() => setAccountType('candidate')}
              className={`flex-1 py-2 text-sm font-medium rounded-l-lg ${
                accountType === 'candidate'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              I'm a Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setAccountType('employer')}
              className={`flex-1 py-2 text-sm font-medium rounded-r-lg ${
                accountType === 'employer'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              I'm an Employer
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 border focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 border focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {accountType === 'employer' && (
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  required
                  className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 border focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            )}

            {accountType === 'candidate' && (
              <div>
                <label htmlFor="clearance" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Clearance Level
                </label>
                <select
                  id="clearance"
                  required
                  className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 border focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={formData.clearanceLevel}
                  onChange={(e) => setFormData({ ...formData, clearanceLevel: e.target.value })}
                >
                  <option value="">Select clearance level</option>
                  <option value="none">No Clearance</option>
                  <option value="public">Public Trust</option>
                  <option value="secret">Secret</option>
                  <option value="topsecret">Top Secret</option>
                  <option value="ts-sci">TS/SCI</option>
                  <option value="ts-sci-poly">TS/SCI + Poly</option>
                </select>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 border focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                required
                className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 border focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <div className="text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                  required
                />
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-500">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                LinkedIn
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                Google
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}