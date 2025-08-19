'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, LogOut } from 'lucide-react'

interface NavbarProps {
  isLoggedIn?: boolean
  onLogout?: () => void
}

export default function Navbar({ isLoggedIn = false, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home', hasGlow: true },
    { href: '/about', label: 'About', hasGlow: false },
    { href: '/services', label: 'Services', hasGlow: false },
    { href: '/jobs', label: 'Jobs', hasGlow: false },
    { href: '/mock-interview', label: 'Mock Interview', hasGlow: false },
    { href: '/resources', label: 'Resources', hasGlow: false },
  ]

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    setIsOpen(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Glow utility styles */}
      <style jsx>{`
        .glow-blue {
          position: relative;
          transition: all 0.3s ease;
        }
        .glow-blue:hover {
          color: #60a5fa;
          text-shadow: 0 0 8px #3b82f6, 0 0 16px #1d4ed8;
        }
        .glow-blue-button {
          position: relative;
          transition: all 0.3s ease;
        }
        .glow-blue-button:hover {
          box-shadow: 0 0 20px #3b82f6, 0 0 40px #1d4ed8, 0 0 60px #1e40af;
          transform: translateY(-2px);
        }
      `}</style>

      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center glow-blue">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-white font-bold text-lg">CAG</div>
                  <div className="text-gray-400 text-xs">Cleared Advisory Group</div>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-white transition-all duration-300 ${
                      link.hasGlow ? 'glow-blue hover:scale-105' : 'hover:text-blue-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="glow-blue-button bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/register" 
                    className="glow-blue-button bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    Create Account
                  </Link>
                  <Link
                    href="/login"
                    className="text-white border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="py-4 space-y-2 bg-black/95 rounded-lg mt-2 border border-gray-800">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-6 py-3 text-white transition-all duration-300 ${
                    link.hasGlow ? 'glow-blue' : 'hover:text-blue-400'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="border-t border-gray-800 pt-4 px-6 space-y-2">
                {isLoggedIn ? (
                  <>
                    <Link 
                      href="/dashboard" 
                      className="block glow-blue-button bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-white border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/register" 
                      className="block glow-blue-button bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Create Account
                    </Link>
                    <Link
                      href="/login"
                      className="block text-white border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Log In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}