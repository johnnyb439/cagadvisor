'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Briefcase, 
  MessageSquare, 
  User, 
  FileText,
  ChevronUp
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/jobs', icon: Briefcase, label: 'Jobs' },
  { href: '/mock-interview', icon: MessageSquare, label: 'Interview' },
  { href: '/resources', icon: FileText, label: 'Resources' },
  { href: '/profile', icon: User, label: 'Profile' }
]

const moreItems = [
  { href: '/salary-calculator', label: 'Salary Calculator' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showMoreMenu, setShowMoreMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setShowMoreMenu(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Only show on mobile screens
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    return null
  }

  return (
    <>
      {/* More Menu Overlay */}
      <AnimatePresence>
        {showMoreMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setShowMoreMenu(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-20 left-4 right-4 bg-gray-900 rounded-2xl border border-gray-700 p-4 z-50 md:hidden"
            >
              <div className="grid grid-cols-2 gap-3">
                {moreItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setShowMoreMenu(false)}
                    className="flex items-center justify-center p-4 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors min-h-[56px]"
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="w-full mt-3 p-3 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                <span className="text-sm">Close</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 z-40 md:hidden"
      >
        <div className="grid grid-cols-5 h-16">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 transition-colors relative min-h-[64px] ${
                  isActive 
                    ? 'text-cyan-400' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-400"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
          
          {/* More Button */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center justify-center gap-1 transition-colors min-h-[64px] ${
              showMoreMenu 
                ? 'text-cyan-400' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-current rounded-full" />
              <div className="w-1 h-1 bg-current rounded-full" />
              <div className="w-1 h-1 bg-current rounded-full" />
            </div>
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>

        {/* Safe area for iPhone notch */}
        <div className="h-safe-area-bottom bg-gray-900" />
      </motion.nav>

      {/* Add padding to main content to account for bottom nav */}
      <style jsx global>{`
        @media (max-width: 767px) {
          body {
            padding-bottom: 64px;
          }
        }
      `}</style>
    </>
  )
}