'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Radar/Scanner Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Multiple scanning lines for depth */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-full h-0.5"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(0, 255, 255, 0.8), transparent)',
              animation: 'scan 6s linear infinite',
              boxShadow: '0 0 25px 8px rgba(0, 255, 255, 0.4)',
              maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
            }}
          />
          <div 
            className="absolute w-full h-0.5"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(0, 255, 255, 0.5), transparent)',
              animation: 'scan 6s linear infinite 2s',
              boxShadow: '0 0 15px 5px rgba(0, 255, 255, 0.3)',
              maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
            }}
          />
          <div 
            className="absolute w-full h-px"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(0, 255, 255, 0.3), transparent)',
              animation: 'scan 6s linear infinite 4s',
              boxShadow: '0 0 10px 3px rgba(0, 255, 255, 0.2)',
              maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)'
            }}
          />
        </div>
        {/* Grid overlay for radar effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)
            `
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-dark p-8 md:p-12 text-center backdrop-blur-md border-cyan-500/20"
        >
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Your clearance is your competitive advantage. Let us help you leverage it for maximum career impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="glass-button bg-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 inline-flex items-center justify-center group"
            >
              <Calendar className="mr-2" size={20} />
              Schedule Free Consultation
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
            </Link>
            
            <Link 
              href="/mock-interview" 
              className="glass-button text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
            >
              <MessageCircle className="mr-2" size={20} />
              Try Mock Interview
            </Link>
          </div>
          
          <p className="text-white/70 text-sm mt-8">
            No commitment required • 100% confidential • Military-friendly scheduling
          </p>
        </motion.div>
      </div>
    </section>
  )
}