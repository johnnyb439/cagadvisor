'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Shield } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Cleared Advisory</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Where Security Clearance Meets Opportunity</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/jobs" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
              Find Jobs
            </Link>
            <Link href="/features" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
              Features
            </Link>
            <Link href="/profile" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
              Profile
            </Link>
            <Link href="/employer/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
              For Employers
            </Link>
            <Link href="/auth/login" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
              Sign In
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              Get Started
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6 dark:text-gray-300" /> : <Menu className="h-6 w-6 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href="/jobs" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
              Find Jobs
            </Link>
            <Link href="/features" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
              Features
            </Link>
            <Link href="/profile" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
              Profile
            </Link>
            <Link href="/employer/dashboard" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
              For Employers
            </Link>
            <Link href="/auth/login" className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
              Sign In
            </Link>
            <Link 
              href="/auth/register" 
              className="block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-center"
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}