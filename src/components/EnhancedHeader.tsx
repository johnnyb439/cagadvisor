'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Shield, Search, ChevronDown } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

interface DropdownItem {
  label: string
  href: string
  description?: string
}

interface NavItem {
  label: string
  href: string
  dropdown?: DropdownItem[]
}

export default function EnhancedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  // Navigation items with dropdowns
  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Services',
      href: '/services',
      dropdown: [
        { label: 'Career Coaching', href: '/services/career-coaching', description: 'Personalized career guidance' },
        { label: 'Resume Review', href: '/services/resume-review', description: 'Professional resume optimization' },
        { label: 'Interview Prep', href: '/services/interview-prep', description: 'AI-powered mock interviews' },
        { label: 'Clearance Consulting', href: '/services/clearance-consulting', description: 'Expert clearance advice' },
      ]
    },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Mock Interview', href: '/mock-interview' },
    {
      label: 'Resources',
      href: '/resources',
      dropdown: [
        { label: 'Clearance 101', href: '/resources/clearance-101', description: 'Learn about security clearances' },
        { label: 'Career Blog', href: '/resources/blog', description: 'Tips and industry insights' },
        { label: 'Salary Guide', href: '/resources/salary-guide', description: 'Cleared professional salaries' },
        { label: 'FAQs', href: '/resources/faqs', description: 'Common questions answered' },
      ]
    },
  ]

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if current page
  const isActive = (href: string) => {
    if (href === '/') return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <header 
      className={`bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - 20% larger */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Shield className={`text-primary-600 transition-all duration-300 ${
              isScrolled ? 'h-9 w-9' : 'h-10 w-10'
            } group-hover:scale-110`} />
            <div>
              <h1 className={`font-bold text-gray-900 dark:text-gray-100 transition-all duration-300 ${
                isScrolled ? 'text-xl' : 'text-2xl'
              }`}>
                Cleared Advisory Group
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Your Gateway to Cleared IT Opportunities</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center space-x-1 font-medium transition-colors duration-200 py-2 px-3 rounded-md ${
                    isActive(item.href)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {item.dropdown && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && openDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border dark:border-gray-700"
                    role="menu"
                    aria-label={`${item.label} submenu`}
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        role="menuitem"
                      >
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {dropdownItem.label}
                        </div>
                        {dropdownItem.description && (
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {dropdownItem.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Search jobs"
              aria-expanded={isSearchOpen}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* CTAs */}
            <Link
              href="/auth/login"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Get Started
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6 dark:text-gray-300" /> : <Menu className="h-6 w-6 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="hidden lg:block mt-4 pb-4">
            <form className="relative max-w-2xl mx-auto">
              <input
                type="search"
                placeholder="Search for cleared jobs, companies, or keywords..."
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                aria-label="Search jobs"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                aria-label="Submit search"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2 pb-4">
            {/* Mobile Search */}
            <form className="mb-4">
              <input
                type="search"
                placeholder="Search jobs..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                aria-label="Search jobs"
              />
            </form>

            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className={`block py-2 px-3 rounded-md font-medium ${
                    isActive(item.href)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        className="block py-1 px-3 text-sm text-gray-600 dark:text-gray-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 space-y-2 border-t dark:border-gray-700">
              <Link
                href="/auth/login"
                className="block text-center py-2 px-4 text-gray-700 dark:text-gray-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-center font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}