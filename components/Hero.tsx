'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shield, Users, Briefcase, CheckCircle, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Gradient Squares Grid Pattern Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)
            `
          }}
        />
        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent"></div>
      </div>
      
      {/* Subtle Animated Gradient Orbs - Green themed */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo moved up closer to top */}
          <div className="mb-6">
            <Image 
              src="/images/cag-logo.png" 
              alt="Cleared Advisory Group" 
              width={350} 
              height={250}
              className="mx-auto object-contain"
              priority
            />
          </div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-sm text-white">Trusted by 500+ Cleared Professionals</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm text-white">95% Success Rate</span>
            </div>
          </motion.div>

          {/* Main Headline with reduced spacing */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
          >
            Your Security Clearance is Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mt-2">
              Gateway to Success
            </span>
          </motion.h1>

          {/* Subheadline with reduced spacing */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            We help cleared professionals transition into lucrative IT contracting careers 
            with personalized guidance and proven strategies.
          </motion.p>

          {/* CTA Buttons with reduced spacing */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/register" className="group">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center">
                Create Account
              </button>
            </Link>
            <Link href="/login">
              <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-black transition-all duration-200">
                Log In
              </button>
            </Link>
          </motion.div>

          {/* QR Code Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12 flex justify-center"
          >
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="w-48 h-48 bg-white flex items-center justify-center">
                {/* QR Code Pattern */}
                <svg width="180" height="180" viewBox="0 0 180 180" className="text-black">
                  {/* Simplified QR Code pattern */}
                  <rect width="180" height="180" fill="white"/>
                  <rect x="0" y="0" width="60" height="60" fill="black"/>
                  <rect x="120" y="0" width="60" height="60" fill="black"/>
                  <rect x="0" y="120" width="60" height="60" fill="black"/>
                  <rect x="20" y="20" width="20" height="20" fill="white"/>
                  <rect x="140" y="20" width="20" height="20" fill="white"/>
                  <rect x="20" y="140" width="20" height="20" fill="white"/>
                  {/* Add some data pattern */}
                  <rect x="80" y="20" width="10" height="10" fill="black"/>
                  <rect x="100" y="20" width="10" height="10" fill="black"/>
                  <rect x="80" y="40" width="10" height="10" fill="black"/>
                  <rect x="100" y="50" width="10" height="10" fill="black"/>
                  <rect x="70" y="80" width="10" height="10" fill="black"/>
                  <rect x="90" y="80" width="10" height="10" fill="black"/>
                  <rect x="110" y="80" width="10" height="10" fill="black"/>
                  <rect x="80" y="100" width="10" height="10" fill="black"/>
                  <rect x="100" y="100" width="10" height="10" fill="black"/>
                  <rect x="70" y="120" width="10" height="10" fill="black"/>
                  <rect x="90" y="120" width="10" height="10" fill="black"/>
                  <rect x="110" y="120" width="10" height="10" fill="black"/>
                  <rect x="130" y="120" width="10" height="10" fill="black"/>
                  <rect x="150" y="120" width="10" height="10" fill="black"/>
                  <rect x="80" y="140" width="10" height="10" fill="black"/>
                  <rect x="100" y="140" width="10" height="10" fill="black"/>
                  <rect x="120" y="140" width="10" height="10" fill="black"/>
                  <rect x="80" y="160" width="10" height="10" fill="black"/>
                  <rect x="110" y="160" width="10" height="10" fill="black"/>
                  <rect x="130" y="160" width="10" height="10" fill="black"/>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300">Professionals Placed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">30 Days</div>
              <div className="text-gray-300">Average Time to Hire</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}