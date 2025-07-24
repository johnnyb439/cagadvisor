'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, ArrowRight, ChevronDown, ChevronUp, Target } from 'lucide-react'
import Link from 'next/link'

interface JobMatch {
  id: string
  title: string
  company: string
  location: string
  clearanceRequired: string
  matchPercentage: number
  improvementTips: string[]
  jobUrl: string
}

interface ResumeToJobMatcherProps {
  jobMatches: JobMatch[]
  isAnalyzing: boolean
}

export default function ResumeToJobMatcher({ jobMatches, isAnalyzing }: ResumeToJobMatcherProps) {
  const [matchCount, setMatchCount] = useState<'top3' | 'top5' | 'all'>('top3')
  const [expandedTips, setExpandedTips] = useState<string[]>([])

  const getDisplayCount = () => {
    switch (matchCount) {
      case 'top3': return 3
      case 'top5': return 5
      case 'all': return jobMatches.length
    }
  }

  const toggleTips = (jobId: string) => {
    setExpandedTips(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50 border-green-200'
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Resume-to-Job Matcher</h3>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Finding matching jobs...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!jobMatches || jobMatches.length === 0) return null

  const displayedMatches = jobMatches.slice(0, getDisplayCount())

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Target className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Resume-to-Job Matcher</h3>
        </div>
        
        {/* Match count toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Show:</span>
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMatchCount('top3')}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                matchCount === 'top3' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Top 3
            </button>
            <button
              onClick={() => setMatchCount('top5')}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                matchCount === 'top5' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Top 5
            </button>
            <button
              onClick={() => setMatchCount('all')}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                matchCount === 'all' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {displayedMatches.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{job.title}</h4>
                <p className="text-sm text-gray-600">
                  {job.company} • {job.location}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {job.clearanceRequired} clearance required
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getMatchColor(job.matchPercentage)}`}>
                  {job.matchPercentage}% match
                </div>
                <Link
                  href={job.jobUrl}
                  className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>View Job</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Improvement tips */}
            <div className="mt-3">
              <button
                onClick={() => toggleTips(job.id)}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                <span>Improvement tips</span>
                {expandedTips.includes(job.id) ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              
              {expandedTips.includes(job.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pl-6"
                >
                  <ul className="space-y-1">
                    {job.improvementTips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-gray-600 flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {jobMatches.length > getDisplayCount() && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Showing {getDisplayCount()} of {jobMatches.length} matches
        </p>
      )}
    </motion.div>
  )
}