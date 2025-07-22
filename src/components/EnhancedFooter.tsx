'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Shield, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Youtube, CheckCircle, ExternalLink } from 'lucide-react'

export default function EnhancedFooter() {
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribeStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus('success')
      setEmail('')
      setTimeout(() => setSubscribeStatus('idle'), 3000)
    }, 1000)
  }

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' }
    ],
    services: [
      { label: 'Career Coaching', href: '/services/career-coaching' },
      { label: 'Resume Review', href: '/services/resume-review' },
      { label: 'Mock Interviews', href: '/mock-interview' },
      { label: 'Clearance Consulting', href: '/services/clearance-consulting' },
      { label: 'Salary Negotiation', href: '/services/salary-negotiation' }
    ],
    resources: [
      { label: 'Clearance 101', href: '/resources/clearance-101' },
      { label: 'Career Blog', href: '/blog' },
      { label: 'Salary Guide', href: '/resources/salary-guide' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Success Stories', href: '/success-stories' }
    ],
    forEmployers: [
      { label: 'Post a Job', href: '/employer/post-job' },
      { label: 'Talent Search', href: '/employer/talent-search' },
      { label: 'Pricing', href: '/employer/pricing' },
      { label: 'Enterprise', href: '/employer/enterprise' },
      { label: 'API Access', href: '/employer/api' }
    ]
  }

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/cleared-advisory', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/clearedadvisory', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com/clearedadvisory', label: 'Facebook' },
    { icon: Youtube, href: 'https://youtube.com/clearedadvisory', label: 'YouTube' }
  ]

  const trustBadges = [
    { label: 'Veteran-Owned Business', icon: '🇺🇸' },
    { label: 'BBB Accredited', icon: '✓' },
    { label: 'SOC 2 Compliant', icon: '🔒' },
    { label: 'GDPR Compliant', icon: '🛡️' }
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated on Cleared Opportunities
            </h3>
            <p className="text-gray-400 mb-6">
              Get weekly insights on cleared jobs, career tips, and industry trends
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {subscribeStatus === 'loading' && 'Subscribing...'}
                {subscribeStatus === 'success' && (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Subscribed!
                  </>
                )}
                {subscribeStatus === 'idle' && 'Subscribe'}
                {subscribeStatus === 'error' && 'Try Again'}
              </button>
            </form>
            
            <p className="text-xs text-gray-500 mt-3">
              By subscribing, you agree to our Privacy Policy and consent to receive updates
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-primary-500" />
              <div>
                <h2 className="text-xl font-bold text-white">Cleared Advisory Group</h2>
                <p className="text-xs text-gray-500">Your Gateway to Cleared Careers</p>
              </div>
            </Link>
            
            <p className="text-sm text-gray-400 mb-6">
              Empowering cleared professionals to achieve their career goals through intelligent job matching and comprehensive support.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:info@clearedadvisorygroup.com" className="flex items-center text-sm hover:text-primary-400 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                info@clearedadvisorygroup.com
              </a>
              <a href="tel:1-800-CLEARED" className="flex items-center text-sm hover:text-primary-400 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                1-800-CLEARED
              </a>
              <div className="flex items-start text-sm">
                <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                <div>
                  1100 Wilson Blvd, Suite 2800<br />
                  Arlington, VA 22209
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              {footerLinks.forEmployers.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors flex items-center">
                    {link.label}
                    {link.href.includes('api') && <ExternalLink className="h-3 w-3 ml-1" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center space-x-2 text-sm">
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-gray-400">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 Cleared Advisory Group. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">
                Accessibility
              </Link>
              <Link href="/sitemap" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}