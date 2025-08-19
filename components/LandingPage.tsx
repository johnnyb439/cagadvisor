'use client'

import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check authentication state from localStorage
    const checkAuthState = () => {
      const user = localStorage.getItem('currentUser')
      const authToken = localStorage.getItem('authToken')
      setIsLoggedIn(!!(user && authToken))
    }
    
    checkAuthState()
    
    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      checkAuthState()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('currentUser')
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    
    // Redirect to home page
    window.location.href = '/'
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Hero isLoggedIn={isLoggedIn} />
    </div>
  )
}