'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Briefcase, MapPin, DollarSign, Shield, ArrowRight, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

const featuredJobs = [
  {
    id: 1,
    title: "Senior Cloud Engineer",
    company: "Lockheed Martin",
    location: "McLean, VA",
    salary: "$145,000 - $165,000",
    clearance: "TS/SCI",
    type: "Full-Time",
    posted: "2 days ago",
    hot: true
  },
  {
    id: 2,
    title: "DevSecOps Engineer",
    company: "Raytheon Technologies",
    location: "Aurora, CO",
    salary: "$135,000 - $155,000",
    clearance: "SECRET",
    type: "Contract",
    posted: "3 days ago",
    hot: true
  },
  {
    id: 3,
    title: "Cybersecurity Analyst",
    company: "Northrop Grumman",
    location: "Huntsville, AL",
    salary: "$120,000 - $140,000",
    clearance: "TS/SCI w/ Poly",
    type: "Full-Time",
    posted: "1 week ago",
    hot: false
  },
  {
    id: 4,
    title: "Network Administrator",
    company: "General Dynamics",
    location: "San Antonio, TX",
    salary: "$95,000 - $115,000",
    clearance: "SECRET",
    type: "Contract-to-Hire",
    posted: "4 days ago",
    hot: false
  },
  {
    id: 5,
    title: "Systems Administrator",
    company: "Booz Allen Hamilton",
    location: "Washington, DC",
    salary: "$110,000 - $130,000",
    clearance: "TS/SCI",
    type: "Full-Time",
    posted: "1 day ago",
    hot: true
  }
]

export default function FeaturedJobs() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredJobs.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hot Jobs Requiring Clearance
          </h2>
          <p className="text-xl text-gray-300">
            New opportunities added daily from top defense contractors
          </p>
        </motion.div>

        {/* Desktop Carousel */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
          {featuredJobs.slice(currentIndex, currentIndex + 3).concat(
            featuredJobs.slice(0, Math.max(0, (currentIndex + 3) - featuredJobs.length))
          ).map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                {job.hot && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    HOT
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-gray-400 font-medium">{job.company}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                    <span className="text-sm font-semibold">{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Shield className="w-4 h-4 mr-2 text-blue-400" />
                    <span className="text-sm">{job.clearance}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-2 text-purple-400" />
                    <span className="text-sm">{job.posted}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                  <Link 
                    href={`/jobs/${job.id}`}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center group/link"
                  >
                    <span className="text-sm font-medium">View Details</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
              {featuredJobs[currentIndex].hot && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                  HOT
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {featuredJobs[currentIndex].title}
                </h3>
                <p className="text-gray-400 font-medium">{featuredJobs[currentIndex].company}</p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                  <span className="text-sm">{featuredJobs[currentIndex].location}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-sm font-semibold">{featuredJobs[currentIndex].salary}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Shield className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-sm">{featuredJobs[currentIndex].clearance}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                  {featuredJobs[currentIndex].type}
                </span>
                <Link 
                  href={`/jobs/${featuredJobs[currentIndex].id}`}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center"
                >
                  <span className="text-sm font-medium">View Details</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {featuredJobs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-cyan-400' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to job ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Jobs CTA */}
        <div className="text-center mt-10">
          <Link 
            href="/jobs"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 group"
          >
            View All Open Positions
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}