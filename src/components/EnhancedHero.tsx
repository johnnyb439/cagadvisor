'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Briefcase, Brain, Calendar, CheckCircle, Users, ArrowRight } from 'lucide-react'

export default function EnhancedHero() {
  const [veteransPlaced, setVeteransPlaced] = useState(0)
  
  // Animate the veterans placed counter
  useEffect(() => {
    const target = 500
    const increment = target / 50
    const timer = setInterval(() => {
      setVeteransPlaced(prev => {
        if (prev >= target) {
          clearInterval(timer)
          return target
        }
        return Math.ceil(prev + increment)
      })
    }, 30)
    return () => clearInterval(timer)
  }, [])

  const benefits = [
    { icon: Brain, text: "AI-Powered Interview Prep" },
    { icon: Briefcase, text: "Direct Access to Cleared Employers" },
    { icon: Users, text: "Personalized Career Coaching" }
  ]

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-700/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-24 lg:py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in-down">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm font-medium">
              <span className="text-green-400 font-bold">{veteransPlaced}+</span> Veterans Placed in Cleared Jobs
            </span>
          </div>

          {/* Main Headline - Larger Typography */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
            Your Gateway to
            <span className="block text-primary-400 mt-2">Cleared IT Opportunities</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Bridging the gap for National Guard, Reservists, Veterans, and cleared professionals seeking premium government contracting roles
          </p>

          {/* CTA Buttons - Updated with correct routes */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-400">
            <Link
              href="/jobs"
              className="group bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
            >
              Browse Cleared Jobs
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/interview"
              className="group bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
            >
              Try AI Mock Interview
              <Brain className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </Link>
            
            <Link
              href="/auth/register"
              className="group border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
            >
              Get Started Free
              <Calendar className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </Link>
          </div>

          {/* Benefits Bullet Points */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up animation-delay-600">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center space-x-3 text-left">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-primary-400" />
                </div>
                <span className="text-gray-300 font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Video Preview (placeholder for now) */}
          <div className="mt-16 animate-fade-in-up animation-delay-800">
            <div className="relative max-w-3xl mx-auto">
              <div className="aspect-video bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group cursor-pointer hover:border-primary-400 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4v12l10-6z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-sm text-gray-400">
                  Watch: How Cleared Advisory Transforms Careers (2 min)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}