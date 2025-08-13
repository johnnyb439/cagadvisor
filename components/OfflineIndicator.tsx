'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, WifiOff, RefreshCw, Cloud, CloudOff } from 'lucide-react'

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [showPersistent, setShowPersistent] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    // Check initial online status - force check
    const checkConnection = () => {
      // More reliable check - try to fetch a small resource
      if (typeof window !== 'undefined') {
        // First check navigator.onLine
        const navOnline = navigator.onLine
        setIsOnline(navOnline)
        setShowPersistent(!navOnline)
        
        // Also do a real connection test
        fetch('/api/version', { method: 'HEAD', cache: 'no-cache' })
          .then(() => {
            if (!isOnline) {
              setIsOnline(true)
              setShowPersistent(false)
            }
          })
          .catch(() => {
            if (isOnline) {
              setIsOnline(false)
              setShowPersistent(true)
            }
          })
      }
    }
    
    checkConnection()

    // Handle online/offline events
    const handleOnline = () => {
      console.log('Connection: Online event detected')
      setIsOnline(true)
      setIsVisible(true)
      setIsSyncing(true)
      
      // Show "back online" message briefly
      setTimeout(() => {
        setIsVisible(false)
        setShowPersistent(false)
        setIsSyncing(false)
      }, 3000)
    }

    const handleOffline = () => {
      console.log('Connection: Offline event detected')
      setIsOnline(false)
      setIsVisible(true)
      setShowPersistent(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check connection periodically with actual fetch
    const interval = setInterval(() => {
      checkConnection()
    }, 5000)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearInterval(interval)
    }
  }, [isOnline])

  // Mini persistent indicator for offline mode
  const PersistentIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 right-4 z-40"
    >
      <div className="bg-orange-500 text-white px-3 py-1 rounded-full flex items-center shadow-lg">
        <CloudOff className="w-4 h-4 mr-2" />
        <span className="text-sm font-medium">Offline Mode</span>
      </div>
    </motion.div>
  )

  // Full notification banner
  const NotificationBanner = () => (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className={`${
        isOnline 
          ? 'bg-gradient-to-r from-green-500 to-green-600' 
          : 'bg-gradient-to-r from-orange-500 to-red-500'
      } text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isOnline ? (
                <>
                  {isSyncing ? (
                    <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                  ) : (
                    <Wifi className="w-5 h-5 mr-3" />
                  )}
                  <span className="font-medium">
                    {isSyncing ? 'Syncing your data...' : 'You\'re back online!'}
                  </span>
                </>
              ) : (
                <>
                  <WifiOff className="w-5 h-5 mr-3" />
                  <div>
                    <span className="font-medium">You're currently offline</span>
                    <span className="ml-2 text-sm opacity-90">
                      Some features may be limited
                    </span>
                  </div>
                </>
              )}
            </div>
            
            {!isOnline && (
              <button
                onClick={() => window.location.reload()}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm transition-colors flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Retry
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <>
      <AnimatePresence>
        {isVisible && <NotificationBanner />}
      </AnimatePresence>
      
      <AnimatePresence>
        {showPersistent && !isVisible && <PersistentIndicator />}
      </AnimatePresence>

      {/* Connection Status Dot */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 px-3 py-2 rounded-full shadow-lg">
          <div className={`w-2 h-2 rounded-full ${
            isOnline ? 'bg-green-500 shadow-green-500/50' : 'bg-orange-500 shadow-orange-500/50'
          } animate-pulse shadow-lg`} />
          <span className={`text-xs font-medium ${
            isOnline ? 'text-green-400' : 'text-orange-400'
          }`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </>
  )
}