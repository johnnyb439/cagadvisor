'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import VideoPlayerInterview from '@/components/VideoPlayerInterview'
import DifficultySelector from '@/components/DifficultySelector'
import UserInput from '@/components/UserInput'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function InterviewPage() {
  const router = useRouter()
  const [difficultyTier, setDifficultyTier] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [conversationHistory, setConversationHistory] = useState<Message[]>([])
  const [userResponse, setUserResponse] = useState('')
  const [interviewStatus, setInterviewStatus] = useState<'idle' | 'in-progress' | 'finished'>('idle')
  const [currentQuestionText, setCurrentQuestionText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [videoReady, setVideoReady] = useState(false)

  const totalQuestions = 5
  const currentQuestionNumber = Math.floor(conversationHistory.length / 2) + 1

  const startInterview = async (tier: number) => {
    setDifficultyTier(tier)
    setIsLoading(true)
    setError(null)
    setInterviewStatus('in-progress')

    try {
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          difficultyTier: tier,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start interview')
      }

      setVideoUrl(data.videoUrl)
      setCurrentQuestionText(data.questionText)
      setConversationHistory([
        {
          role: 'assistant',
          content: data.questionText,
        },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setInterviewStatus('idle')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUserSubmit = async (response: string) => {
    setUserResponse(response)
    setIsLoading(true)
    setError(null)
    setVideoReady(false)

    // Add user response to conversation history
    const updatedHistory: Message[] = [
      ...conversationHistory,
      {
        role: 'user',
        content: response,
      },
    ]
    setConversationHistory(updatedHistory)

    // Check if this was the last question
    if (currentQuestionNumber >= totalQuestions) {
      setInterviewStatus('finished')
      setIsLoading(false)
      return
    }

    try {
      const apiResponse = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          difficultyTier,
          conversationHistory: updatedHistory,
        }),
      })

      const data = await apiResponse.json()

      if (!apiResponse.ok) {
        throw new Error(data.error || 'Failed to get next question')
      }

      setVideoUrl(data.videoUrl)
      setCurrentQuestionText(data.questionText)
      setConversationHistory([
        ...updatedHistory,
        {
          role: 'assistant',
          content: data.questionText,
        },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVideoEnded = () => {
    setVideoReady(true)
  }

  const restartInterview = () => {
    setDifficultyTier(null)
    setVideoUrl(null)
    setConversationHistory([])
    setUserResponse('')
    setInterviewStatus('idle')
    setCurrentQuestionText('')
    setError(null)
    setVideoReady(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/features"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Features
          </Link>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            AI-Powered Interview Practice
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Practice with our AI interviewer and improve your technical interview skills
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <p className="text-red-800 dark:text-red-300 font-medium">Error</p>
                <p className="text-red-700 dark:text-red-400 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Idle State - Show Difficulty Selector */}
          {interviewStatus === 'idle' && (
            <DifficultySelector onSelect={startInterview} />
          )}

          {/* Loading State */}
          {isLoading && !videoUrl && (
            <div className="text-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Preparing your interview question...
              </p>
            </div>
          )}

          {/* In Progress State */}
          {interviewStatus === 'in-progress' && videoUrl && (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Interview Progress
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {currentQuestionNumber} of {totalQuestions} questions
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Video Player */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-video">
                  <VideoPlayerInterview
                    src={videoUrl}
                    onEnded={handleVideoEnded}
                    className="w-full h-full"
                  />
                </div>
                
                {/* Current Question Text */}
                {currentQuestionText && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Current Question:
                    </p>
                    <p className="text-gray-900 dark:text-gray-100">
                      {currentQuestionText}
                    </p>
                  </div>
                )}
              </div>

              {/* User Input */}
              {videoReady && (
                <UserInput
                  onSubmit={handleUserSubmit}
                  isLoading={isLoading}
                  questionNumber={currentQuestionNumber}
                  totalQuestions={totalQuestions}
                />
              )}

              {/* Waiting for video message */}
              {!videoReady && !isLoading && (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    Please watch the interview question before responding...
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Finished State */}
          {interviewStatus === 'finished' && (
            <div className="text-center py-20">
              <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-4 w-20 h-20 mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Interview Complete!
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                Great job completing the practice interview. Your responses have been recorded
                and you can review them to improve your interview skills.
              </p>

              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Interview Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Difficulty Level:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        Tier {difficultyTier}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Questions Answered:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {totalQuestions}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={restartInterview}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
                  >
                    Start New Interview
                  </button>
                  
                  <Link
                    href="/features"
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Back to Features
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}