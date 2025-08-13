'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, Users, Building, Shield, Rocket, Target, Award, Mail, Phone, Briefcase, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function PilotLandingPage() {
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState<'candidate' | 'employer'>('candidate')
  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/pilot/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          userType,
          companyName: userType === 'employer' ? companyName : undefined,
          contactName: userType === 'employer' ? contactName : undefined,
          phone: userType === 'employer' ? phone : undefined,
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setSubmitted(true)
        // Reset form
        setTimeout(() => {
          setEmail('')
          setCompanyName('')
          setContactName('')
          setPhone('')
          setSubmitted(false)
        }, 5000)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Unable to submit. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const benefits = {
    candidate: [
      { icon: Shield, title: 'Clearance-Focused', description: 'Jobs that require your security clearance level' },
      { icon: Target, title: 'AI Mock Interviews', description: 'Practice with 270+ technical questions' },
      { icon: Award, title: 'Career Growth', description: 'Access to exclusive cleared opportunities' },
      { icon: Rocket, title: 'Fast Track', description: 'Direct connections to hiring managers' }
    ],
    employer: [
      { icon: Users, title: 'Pre-Vetted Talent', description: 'Access cleared professionals ready to work' },
      { icon: Shield, title: 'Verified Clearances', description: 'Self-reported clearance levels with audit trail' },
      { icon: Target, title: 'Reduced Time-to-Hire', description: 'Connect with qualified candidates faster' },
      { icon: Award, title: 'Pilot Benefits', description: 'Exclusive early access pricing and features' }
    ]
  }

  const stats = [
    { value: '50+', label: 'Cleared Companies' },
    { value: '500+', label: 'Active Candidates' },
    { value: '270+', label: 'Interview Questions' },
    { value: '90%', label: 'Placement Success' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-command-black to-ops-charcoal">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-dynamic-green/10 border border-dynamic-green/30 rounded-full mb-6">
              <Rocket className="w-4 h-4 text-dynamic-green mr-2" />
              <span className="text-dynamic-green text-sm font-semibold">Pilot Program Now Open</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Join the <span className="text-dynamic-green">ClearedAdvisor</span>
              <br />Pilot Program
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Be among the first to experience the future of cleared professional recruitment. 
              Limited spots available for candidates and employers.
            </p>

            {/* User Type Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 flex">
                <button
                  onClick={() => setUserType('candidate')}
                  className={`px-6 py-3 rounded-md font-semibold transition-all ${
                    userType === 'candidate'
                      ? 'bg-dynamic-green text-ops-charcoal'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Users className="inline-block w-4 h-4 mr-2" />
                  I'm a Candidate
                </button>
                <button
                  onClick={() => setUserType('employer')}
                  className={`px-6 py-3 rounded-md font-semibold transition-all ${
                    userType === 'employer'
                      ? 'bg-dynamic-green text-ops-charcoal'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Building className="inline-block w-4 h-4 mr-2" />
                  I'm an Employer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-dynamic-green mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Why Join the Pilot Program?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits[userType].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-dynamic-green/50 transition-colors"
                >
                  <benefit.icon className="w-10 h-10 text-dynamic-green mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Email Capture Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              {userType === 'candidate' 
                ? 'Get Early Access to Cleared Opportunities'
                : 'Find Pre-Vetted Cleared Talent'}
            </h2>
            
            <p className="text-gray-400 text-center mb-8">
              {userType === 'candidate'
                ? 'Be the first to know when we launch. Get exclusive access to jobs requiring security clearances.'
                : 'Join our pilot program and get early access to our database of cleared professionals.'}
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {userType === 'employer' && (
                  <>
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          id="companyName"
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dynamic-green"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium text-gray-300 mb-2">
                        Contact Name
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          id="contactName"
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dynamic-green"
                          placeholder="Your name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dynamic-green"
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dynamic-green"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-dynamic-green text-ops-charcoal font-bold py-3 px-6 rounded-lg hover:bg-mint-green transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Join Pilot Program
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-dynamic-green mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-gray-400">
                  We've received your information and will be in touch soon with next steps.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-8">
            Join our pilot program today or explore our current features
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center px-6 py-3 bg-dynamic-green text-ops-charcoal font-bold rounded-lg hover:bg-mint-green transition-colors"
            >
              <Users className="w-5 h-5 mr-2" />
              Register as Candidate
            </Link>
            <Link
              href="/register/company"
              className="inline-flex items-center px-6 py-3 border-2 border-dynamic-green text-dynamic-green font-bold rounded-lg hover:bg-dynamic-green hover:text-ops-charcoal transition-colors"
            >
              <Building className="w-5 h-5 mr-2" />
              Register as Company
            </Link>
            <Link
              href="/mock-interview"
              className="inline-flex items-center px-6 py-3 border-2 border-gray-600 text-gray-300 font-bold rounded-lg hover:border-gray-500 hover:text-white transition-colors"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Try Mock Interview
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}