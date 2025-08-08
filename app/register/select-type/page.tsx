'use client'

import { motion } from 'framer-motion'
import { User, Building2, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import BinaryBackground from '@/components/BinaryBackground'

export default function SelectAccountType() {
  const candidateFeatures = [
    'Apply to cleared positions',
    'Upload and manage resumes',
    'Track career goals',
    'Practice mock interviews',
    'Access career resources',
    'Get salary insights'
  ]

  const companyFeatures = [
    'Post cleared job openings',
    'Search verified candidates',
    'Access cleared talent pool',
    'Direct candidate messaging',
    'Track applications',
    'Company profile page'
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center py-20">
      <BinaryBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
            Choose Your <span className="gradient-text">Account Type</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the account type that best fits your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Candidate Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group"
          >
            <Link href="/register">
              <div className="h-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mb-6">
                  <User className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">
                  I'm a Candidate
                </h2>
                
                <p className="text-gray-300 mb-6">
                  Looking for cleared IT positions and career advancement opportunities
                </p>
                
                <div className="space-y-3 mb-8">
                  {candidateFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-semibold">Get Started</span>
                  <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Company Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group"
          >
            <Link href="/register/company">
              <div className="h-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg mb-6">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-montserrat font-bold text-white mb-4">
                  I'm a Company
                </h2>
                
                <p className="text-gray-300 mb-6">
                  Seeking cleared IT professionals for government contracts
                </p>
                
                <div className="space-y-3 mb-8">
                  {companyFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-semibold">Get Started</span>
                  <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Verified Clearances</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Trusted by 500+ Companies</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}