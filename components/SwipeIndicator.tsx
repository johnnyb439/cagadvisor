'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function SwipeIndicator() {
  const [showIndicator, setShowIndicator] = useState(false)
  const [hasShownBefore, setHasShownBefore] = useState(false)

  useEffect(() => {
    // Check if user has seen the indicator before
    const hasSeenIndicator = localStorage.getItem('hasSeenSwipeIndicator')
    
    if (!hasSeenIndicator && !hasShownBefore) {
      // Show indicator after a delay
      const timer = setTimeout(() => {
        setShowIndicator(true)
        setHasShownBefore(true)
        
        // Hide after 5 seconds
        setTimeout(() => {
          setShowIndicator(false)
          localStorage.setItem('hasSeenSwipeIndicator', 'true')
        }, 5000)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [hasShownBefore])

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="md:hidden fixed left-0 top-1/2 -translate-y-1/2 z-30"
        >
          <div className="relative">
            {/* Pulsing background */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-blue-500 rounded-r-full opacity-20"
            />
            
            {/* Main indicator */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 rounded-r-full shadow-lg flex items-center">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ChevronRight className="w-5 h-5 mr-2" />
              </motion.div>
              <span className="text-sm font-medium pr-2">Swipe for menu</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}