'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, CheckCircle, AlertCircle, Copy, Check, Info } from 'lucide-react'

interface InsightData {
  overallScore: number
  keywordsFound: string[]
  missingKeywords: string[]
  strengths: string[]
  suggestions: string[]
}

interface ResumeInsightsPanelProps {
  insights: InsightData | null
  isAnalyzing: boolean
}

export default function ResumeInsightsPanel({ insights, isAnalyzing }: ResumeInsightsPanelProps) {
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null)
  const [showScoreTooltip, setShowScoreTooltip] = useState(false)

  const copyToClipboard = async (keyword: string) => {
    try {
      await navigator.clipboard.writeText(keyword)
      setCopiedKeyword(keyword)
      setTimeout(() => setCopiedKeyword(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-600'
    if (score >= 60) return 'bg-yellow-600'
    return 'bg-red-600'
  }

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">AI Resume Insights</h3>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing your resume...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!insights) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-lg shadow-sm p-6 mb-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">AI Resume Insights</h3>
      </div>

      {/* Overall Score */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-medium text-gray-900">Overall Match Score</h4>
          <div 
            className="relative"
            onMouseEnter={() => setShowScoreTooltip(true)}
            onMouseLeave={() => setShowScoreTooltip(false)}
          >
            <span className={`text-3xl font-bold ${getScoreColor(insights.overallScore)}`}>
              {insights.overallScore}%
            </span>
            <Info className="w-4 h-4 text-gray-400 inline-block ml-2 cursor-help" />
            
            {showScoreTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                  <div className="border-4 border-transparent border-t-gray-900"></div>
                </div>
                Your match score is based on keyword alignment,<br />
                role-specific skills, and resume structure.
              </div>
            )}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${insights.overallScore}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${getScoreBgColor(insights.overallScore)}`}
          />
        </div>
      </div>

      {/* Keywords Found */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          Keywords Found
        </h4>
        <div className="flex flex-wrap gap-2">
          {insights.keywordsFound.map((keyword, index) => (
            <motion.button
              key={keyword}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => copyToClipboard(keyword)}
              className="group relative px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors cursor-pointer"
            >
              {keyword}
              <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {copiedKeyword === keyword ? (
                  <Check className="w-3 h-3 text-green-600" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-400" />
                )}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Missing Keywords */}
      {insights.missingKeywords.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            Suggested Keywords to Add
          </h4>
          <div className="flex flex-wrap gap-2">
            {insights.missingKeywords.map((keyword, index) => (
              <motion.button
                key={keyword}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => copyToClipboard(keyword)}
                className="group relative px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium hover:bg-yellow-100 transition-colors cursor-pointer"
              >
                {keyword}
                <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {copiedKeyword === keyword ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-gray-400" />
                  )}
                </span>
              </motion.button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Click any keyword to copy to clipboard</p>
        </div>
      )}

      {/* Strengths */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-3">Resume Strengths</h4>
        <ul className="space-y-2">
          {insights.strengths.map((strength, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start"
            >
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{strength}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Suggestions */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-3">Improvement Suggestions</h4>
        <ul className="space-y-2">
          {insights.suggestions.map((suggestion, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start"
            >
              <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{suggestion}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}