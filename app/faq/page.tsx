'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Shield, DollarSign, Clock, Briefcase, GraduationCap, Users, HelpCircle } from 'lucide-react'

const faqCategories = [
  {
    title: "Security Clearance",
    icon: Shield,
    questions: [
      {
        q: "What is a security clearance and why is it valuable?",
        a: "A security clearance is a government authorization that allows access to classified information. It's valuable because it opens doors to high-paying contractor positions, with cleared professionals earning 15-30% more than their non-cleared counterparts."
      },
      {
        q: "How long does it take to get a security clearance?",
        a: "SECRET clearances typically take 3-6 months, while TS/SCI can take 9-18 months. Having an active clearance makes you immediately employable, which is why cleared professionals are in such high demand."
      },
      {
        q: "Can I get a clearance on my own?",
        a: "No, clearances must be sponsored by a government agency or cleared contractor. However, some companies will sponsor clearances for the right candidates, especially those with military experience or in-demand skills."
      },
      {
        q: "What's the difference between SECRET and TS/SCI?",
        a: "SECRET clearance allows access to information that could cause serious damage to national security. TS/SCI (Top Secret/Sensitive Compartmented Information) is the highest level, requiring more extensive background checks and allowing access to the most sensitive information."
      }
    ]
  },
  {
    title: "Career & Salary",
    icon: DollarSign,
    questions: [
      {
        q: "How much can I earn with a security clearance?",
        a: "Entry-level cleared IT professionals typically start at $65,000-$85,000. With experience and certifications, salaries range from $95,000-$180,000+. Specialized roles like cloud architects or cybersecurity engineers can exceed $200,000."
      },
      {
        q: "What are the most in-demand cleared IT roles?",
        a: "Cloud Engineers, DevSecOps Engineers, Cybersecurity Analysts, Systems Administrators, and Network Engineers are consistently in high demand. Emerging areas include AI/ML specialists and Zero Trust architects."
      },
      {
        q: "Do I need a degree to work in cleared IT?",
        a: "While helpful, a degree isn't always required. Many cleared positions value certifications (Security+, CISSP, AWS) and experience over formal education. Military experience often substitutes for degree requirements."
      },
      {
        q: "What certifications should I get?",
        a: "Start with CompTIA Security+ (required for DoD 8570 compliance). Then pursue role-specific certs: AWS/Azure for cloud, CCNA for networking, or CISSP for security leadership roles."
      }
    ]
  },
  {
    title: "Job Search Process",
    icon: Briefcase,
    questions: [
      {
        q: "How long does it typically take to find a cleared job?",
        a: "With an active clearance and relevant skills, most professionals find positions within 30-45 days. We've helped clients receive offers in as little as 2 weeks."
      },
      {
        q: "Where are most cleared jobs located?",
        a: "The DMV area (DC, Maryland, Northern Virginia) has the highest concentration, followed by Colorado Springs, San Antonio, Huntsville, and Tampa. Remote opportunities are increasing but still limited."
      },
      {
        q: "How do I translate military experience for civilian roles?",
        a: "Focus on technical skills, leadership experience, and project outcomes rather than military jargon. Highlight certifications, systems you've worked with, and quantifiable achievements."
      },
      {
        q: "What's the difference between W2 and 1099 contracts?",
        a: "W2 contractors are employees with benefits and tax withholding. 1099 contractors are independent, handling their own taxes but often earning 20-30% more. Most cleared positions are W2 due to facility access requirements."
      }
    ]
  },
  {
    title: "Working with CAG",
    icon: Users,
    questions: [
      {
        q: "How does CAG help cleared professionals?",
        a: "We provide personalized career coaching, resume optimization, interview preparation, salary negotiation, and direct connections to hiring managers at top defense contractors."
      },
      {
        q: "What makes CAG different from other recruiters?",
        a: "We specialize exclusively in cleared professionals, have deep relationships with prime contractors, and our team includes former cleared professionals who understand the unique challenges you face."
      },
      {
        q: "Is there a cost for your services?",
        a: "Our career coaching services are free for candidates. We're compensated by employers when we successfully place professionals, so our incentive is your success."
      },
      {
        q: "How do I get started with CAG?",
        a: "Start with our free skills assessment, then schedule a consultation. We'll review your background, discuss goals, and create a personalized action plan to accelerate your career."
      }
    ]
  }
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [activeQuestions, setActiveQuestions] = useState<number[]>([])

  const toggleQuestion = (index: number) => {
    setActiveQuestions(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about security clearances and cleared careers
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-cyan-400">500+</p>
              <p className="text-gray-400 text-sm">Professionals Placed</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-400">$120K</p>
              <p className="text-gray-400 text-sm">Average Salary</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-purple-400">30</p>
              <p className="text-gray-400 text-sm">Days to Hire</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-orange-400">95%</p>
              <p className="text-gray-400 text-sm">Success Rate</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-white mb-4">Categories</h2>
                <div className="space-y-2">
                  {faqCategories.map((category, index) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setActiveCategory(index)
                          setActiveQuestions([])
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center ${
                          activeCategory === index
                            ? 'bg-cyan-500/20 border border-cyan-500 text-white'
                            : 'bg-gray-900/30 border border-gray-700 text-gray-300 hover:bg-gray-800/50'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span>{category.title}</span>
                        <span className="ml-auto text-sm bg-gray-700 px-2 py-1 rounded">
                          {category.questions.length}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="lg:col-span-2">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  {(() => {
                    const Icon = faqCategories[activeCategory].icon
                    return <Icon className="w-6 h-6 mr-3 text-cyan-400" />
                  })()}
                  {faqCategories[activeCategory].title}
                </h2>

                {faqCategories[activeCategory].questions.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-800/70 transition-colors"
                    >
                      <span className="text-white font-medium pr-4">{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          activeQuestions.includes(index) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {activeQuestions.includes(index) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 text-gray-300 border-t border-gray-700 pt-4">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-8 text-center">
            <HelpCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Schedule a free consultation with our cleared career experts. We'll answer your specific questions and create a personalized roadmap for your success.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
              Schedule Free Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}