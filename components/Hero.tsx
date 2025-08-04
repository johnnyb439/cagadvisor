'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shield, Users, Briefcase } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-professional-gradient"></div>
      
      {/* Binary Pattern Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="text-dynamic-green font-mono text-lg leading-relaxed">
            {Array(30).fill(null).map((_, i) => (
              <div key={i} className="whitespace-nowrap">
                {Array(15).fill('01101000 01100101 01101100 01110000 00100000 ').join('')}
              </div>
            ))}
          </div>
        </div>
        {/* Scattered larger binary numbers */}
        <div className="absolute top-10 left-20 text-cyber-cyan opacity-20 font-mono text-4xl transform rotate-12">
          01010011
        </div>
        <div className="absolute top-40 right-32 text-dynamic-green opacity-20 font-mono text-3xl transform -rotate-6">
          11001010
        </div>
        <div className="absolute bottom-20 left-40 text-sky-blue opacity-20 font-mono text-5xl transform rotate-45">
          10110
        </div>
        <div className="absolute bottom-40 right-20 text-emerald-green opacity-20 font-mono text-3xl transform -rotate-12">
          01101110
        </div>
        <div className="absolute top-1/3 left-1/4 text-cyber-cyan opacity-20 font-mono text-2xl transform rotate-30">
          11100101
        </div>
        <div className="absolute top-2/3 right-1/3 text-dynamic-green opacity-20 font-mono text-4xl transform -rotate-20">
          00110111
        </div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-dynamic-green/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-dynamic-blue/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-blue/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Multiple blending layers for better integration */}
              <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent blur-3xl scale-150"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-2xl"></div>
              <Image 
                src="/images/cag-logo.png" 
                alt="Cleared Advisory Group Logo" 
                width={450} 
                height={350}
                className="relative object-contain opacity-90 mix-blend-screen"
                style={{
                  filter: 'drop-shadow(0 0 60px rgba(255, 255, 255, 0.2)) drop-shadow(0 0 120px rgba(135, 206, 235, 0.1)) brightness(1.1) contrast(0.9)',
                  transform: 'scaleX(1.2)'
                }}
              />
            </div>
          </div>

          {/* Banner */}
          <div className="flex justify-center mb-8">
            <div className="relative glass glass-enhanced glass-frosted-blue rounded-full px-8 py-3 overflow-hidden">
              {/* Binary background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="text-xs font-mono leading-none whitespace-nowrap">
                  {Array(10).fill('01011010 11001100 10101010 01110110 ').join('')}
                </div>
              </div>
              <span className="relative text-white font-semibold text-lg">Proudly Serving America's Cleared Professionals</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-montserrat font-bold text-white mb-6 text-shadow-lg">
            Your Gateway to
            <span className="block gradient-text-animated mt-2">Cleared IT Opportunities</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Bridging the gap for National Guard, Reservists, Veterans, and cleared professionals 
            seeking lucrative government contracting careers.
          </p>
          

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/jobs" className="glass-button ripple text-white inline-flex items-center group hover-glow">
                Browse Cleared Jobs
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-2" size={20} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/mock-interview" className="glass-button ripple text-white inline-flex items-center hover-glow">
                Try AI Mock Interview
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="glass-button ripple text-white inline-flex items-center hover-glow">
                Schedule Consultation
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card"
            >
              <Shield className="w-12 h-12 text-dynamic-green mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">SECRET+ Required</h3>
              <p className="text-gray-400 text-sm">We specialize in opportunities for cleared professionals</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card"
            >
              <Users className="w-12 h-12 text-dynamic-blue mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Military-Friendly</h3>
              <p className="text-gray-400 text-sm">Understanding your unique service commitments</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-card"
            >
              <Briefcase className="w-12 h-12 text-emerald-green mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">IT Focus</h3>
              <p className="text-gray-400 text-sm">From help desk to systems administration</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}