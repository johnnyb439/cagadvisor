'use client'

import { useState } from 'react'
import { CheckCircle, Award, Stamp, User } from 'lucide-react'

interface InterviewMarkerProps {
  interviewerName?: string
  interviewerTitle?: string
  companyName?: string
  date?: string
}

export default function InterviewMarker({
  interviewerName = 'Sarah Johnson',
  interviewerTitle = 'Senior Hiring Manager',
  companyName = 'Lockheed Martin',
  date = new Date().toLocaleDateString()
}: InterviewMarkerProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleReveal = () => {
    if (!isRevealed) {
      setIsAnimating(true)
      setTimeout(() => {
        setIsRevealed(true)
        setIsAnimating(false)
      }, 600)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 p-4 sm:p-6 max-w-md mx-auto">
      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">Interview Approval</h3>
      
      <div className="relative">
        {/* Button */}
        <button
          onClick={handleReveal}
          disabled={isRevealed}
          className={`
            w-full py-4 px-6 rounded-lg font-semibold text-white
            transition-all duration-300 transform
            ${isRevealed 
              ? 'bg-green-600 cursor-default' 
              : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'
            }
            ${isAnimating ? 'animate-pulse' : ''}
          `}
        >
          {isRevealed ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Interview Approved!</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Award className="h-5 w-5" />
              <span>Click to Reveal Interviewer Approval</span>
            </div>
          )}
        </button>

        {/* Signature/Mark Reveal */}
        <div
          className={`
            mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg
            border-2 border-dashed border-blue-300 dark:border-blue-600
            transition-all duration-1000 transform
            ${isRevealed 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-4 pointer-events-none'
            }
          `}
        >
          {/* Stamp/Seal Effect */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 transform rotate-12">
              <div className="bg-red-600 text-white rounded-full p-3 shadow-lg">
                <Stamp className="h-8 w-8" />
              </div>
            </div>

            {/* Interviewer Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-bold text-base sm:text-lg text-gray-900 dark:text-gray-100">{interviewerName}</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{interviewerTitle}</p>
                </div>
              </div>

              {/* Signature */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="font-handwriting text-2xl sm:text-3xl text-blue-800 dark:text-blue-400 transform -rotate-2">
                  {interviewerName}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {companyName} • {date}
                </p>
              </div>

              {/* Approval Message */}
              <div className="mt-3 sm:mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <p className="text-xs sm:text-sm text-green-800 dark:text-green-300 font-medium">
                  ✓ Candidate approved for next round
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Security clearance verified • Technical skills validated
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated particles when revealing */}
        {isAnimating && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: '1s'
                }}
              >
                <div className="h-2 w-2 bg-blue-400 rounded-full" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      {!isRevealed && (
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3 sm:mt-4 text-center">
          Press the button to reveal the hiring manager&apos;s approval mark
        </p>
      )}
    </div>
  )
}