'use client'

import { WifiOff, RefreshCw, Home, MessageSquare, FileText, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload()
  }

  const cachedPages = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/mock-interview', label: 'Mock Interview', icon: MessageSquare },
    { href: '/resources', label: 'Resources', icon: FileText },
    { href: '/jobs', label: 'Jobs', icon: Briefcase }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4"
            >
              <WifiOff className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">You're Offline</h1>
            <p className="text-white/90">Don't worry, we've got you covered!</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                What's Available Offline
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You can still access these cached pages and features:
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {cachedPages.map((page, index) => (
                  <motion.div
                    key={page.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      href={page.href}
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <page.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">{page.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What You Can Do
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Browse previously visited pages
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Practice mock interviews with cached questions
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Fill out forms (will sync when online)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  View downloaded resources
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRetry}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </button>
              
              <Link href="/" className="flex-1">
                <button className="w-full flex items-center justify-center px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
                  <Home className="w-5 h-5 mr-2" />
                  Go to Home
                </button>
              </Link>
            </div>

            {/* Tips */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Pro Tip:</strong> This site works offline! We automatically save important pages 
                so you can access them even without an internet connection.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}