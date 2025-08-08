'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { MapPin, DollarSign, Shield, Clock, ChevronLeft, ChevronRight, Heart, X } from 'lucide-react'
import Link from 'next/link'

interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  clearance: string
  type: string
  posted: string
  hot?: boolean
  description?: string
}

const jobsData: Job[] = [
  {
    id: 1,
    title: "Senior Cloud Engineer",
    company: "Lockheed Martin",
    location: "McLean, VA",
    salary: "$145,000 - $165,000",
    clearance: "TS/SCI",
    type: "Full-Time",
    posted: "2 days ago",
    hot: true,
    description: "Lead cloud infrastructure initiatives for critical defense systems."
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
    hot: true,
    description: "Implement secure CI/CD pipelines for classified environments."
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
    description: "Protect critical infrastructure from advanced persistent threats."
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
    description: "Manage secure networks for military installations."
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
    hot: true,
    description: "Support mission-critical systems for federal agencies."
  }
]

export default function SwipeableJobCards() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [rejectedJobs, setRejectedJobs] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const currentJob = jobsData[currentIndex]
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5])

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setSavedJobs([...savedJobs, currentJob.id])
    } else {
      setRejectedJobs([...rejectedJobs, currentJob.id])
    }
    
    if (currentIndex < jobsData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100
    if (Math.abs(info.offset.x) > threshold) {
      handleSwipe(info.offset.x > 0 ? 'right' : 'left')
    }
  }

  if (currentIndex >= jobsData.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">All Caught Up!</h3>
          <p className="text-gray-400">You&apos;ve reviewed all available jobs</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-400">{savedJobs.length}</p>
            <p className="text-sm text-gray-400">Saved Jobs</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-red-400">{rejectedJobs.length}</p>
            <p className="text-sm text-gray-400">Passed</p>
          </div>
        </div>
        
        <button
          onClick={() => {
            setCurrentIndex(0)
            setSavedJobs([])
            setRejectedJobs([])
          }}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
        >
          Start Over
        </button>
      </div>
    )
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Instructions */}
      <div className="text-center mb-6">
        <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Swipe left to pass
          <span className="mx-2">•</span>
          Swipe right to save
          <ChevronRight className="w-4 h-4" />
        </p>
      </div>

      {/* Card Stack Preview */}
      <div className="relative h-[500px] flex items-center justify-center">
        {/* Background cards */}
        {currentIndex + 2 < jobsData.length && (
          <div className="absolute w-full max-w-sm scale-[0.85] opacity-40 translate-y-4">
            <div className="bg-gray-800/30 rounded-2xl p-6 h-[450px]" />
          </div>
        )}
        {currentIndex + 1 < jobsData.length && (
          <div className="absolute w-full max-w-sm scale-[0.92] opacity-60 translate-y-2">
            <div className="bg-gray-800/50 rounded-2xl p-6 h-[450px]" />
          </div>
        )}

        {/* Current Card */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={{ x: 0 }}
          style={{ x, rotate, opacity }}
          className="absolute w-full max-w-sm cursor-grab active:cursor-grabbing"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 h-[450px] flex flex-col">
            {/* Hot Badge */}
            {currentJob.hot && (
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                HOT
              </div>
            )}

            {/* Swipe Indicators */}
            <motion.div
              className="absolute top-8 left-8 bg-red-500 text-white px-4 py-2 rounded-lg font-bold rotate-[-20deg]"
              style={{ opacity: useTransform(x, [-200, -100, 0], [1, 1, 0]) }}
            >
              PASS
            </motion.div>
            <motion.div
              className="absolute top-8 right-8 bg-green-500 text-white px-4 py-2 rounded-lg font-bold rotate-[20deg]"
              style={{ opacity: useTransform(x, [0, 100, 200], [0, 1, 1]) }}
            >
              SAVE
            </motion.div>

            {/* Job Content */}
            <div className="flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-2">{currentJob.title}</h3>
                <p className="text-lg text-cyan-400 font-semibold">{currentJob.company}</p>
              </div>

              <p className="text-gray-300 mb-6 flex-1">{currentJob.description}</p>

              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-cyan-400" />
                  <span>{currentJob.location}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <DollarSign className="w-5 h-5 mr-3 text-green-400" />
                  <span className="font-semibold">{currentJob.salary}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Shield className="w-5 h-5 mr-3 text-blue-400" />
                  <span>{currentJob.clearance}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-3 text-purple-400" />
                  <span>{currentJob.posted}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                  {currentJob.type}
                </span>
                <Link 
                  href={`/jobs/${currentJob.id}`}
                  className="text-cyan-400 text-sm font-medium hover:text-cyan-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center text-red-400 hover:bg-gray-700/50 transition-colors border border-gray-700"
          aria-label="Pass"
        >
          <X className="w-8 h-8" />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center text-green-400 hover:bg-gray-700/50 transition-colors border border-gray-700"
          aria-label="Save"
        >
          <Heart className="w-8 h-8" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm mb-2">
          {currentIndex + 1} of {jobsData.length} jobs
        </p>
        <div className="w-full max-w-xs mx-auto h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / jobsData.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}