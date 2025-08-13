'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, CheckCircle, AlertCircle } from 'lucide-react'

export default function ServiceWorkerRegistration() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [showDevWarning, setShowDevWarning] = useState(false)

  useEffect(() => {
    // Check if in development mode
    const isDev = process.env.NODE_ENV === 'development'
    
    if (isDev) {
      console.log('Service Worker: Skipped in development mode')
      setShowDevWarning(true)
      setTimeout(() => setShowDevWarning(false), 5000)
      return
    }
    
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
      // Register service worker
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((reg) => {
          console.log('Service Worker registered successfully:', reg.scope)
          setRegistration(reg)

          // Check for updates every hour
          setInterval(() => {
            reg.update()
          }, 60 * 60 * 1000)

          // Handle updates
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available
                  setShowUpdatePrompt(true)
                }
              })
            }
          })

          // Show install success briefly
          if (reg.active && !localStorage.getItem('sw-installed')) {
            setShowInstallPrompt(true)
            localStorage.setItem('sw-installed', 'true')
            setTimeout(() => setShowInstallPrompt(false), 4000)
          }
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })

      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })

      // Pre-cache important pages after load
      window.addEventListener('load', () => {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          // Cache additional resources
          navigator.serviceWorker.controller.postMessage({
            type: 'CACHE_URLS',
            urls: [
              '/dashboard',
              '/profile',
              '/login',
              '/register'
            ]
          })
        }
      })
    }
  }, [])

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      setShowUpdatePrompt(false)
    }
  }

  return (
    <>
      {/* Dev Mode Warning */}
      <AnimatePresence>
        {showDevWarning && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-40"
          >
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 flex items-start shadow-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                  Development Mode
                </p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                  Offline features work fully on production build (npm run build & npm start) or live site
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Available Prompt */}
      <AnimatePresence>
        {showUpdatePrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 z-50 max-w-sm"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Update Available
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    A new version of the site is available with improvements and bug fixes.
                  </p>
                  <div className="mt-3 flex space-x-3">
                    <button
                      onClick={handleUpdate}
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
                    >
                      Update Now
                    </button>
                    <button
                      onClick={() => setShowUpdatePrompt(false)}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install Success Notification */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-24 right-4 z-40"
          >
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center shadow-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  Offline mode enabled
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  This site will work even without internet
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}