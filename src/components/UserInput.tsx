'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Send, Loader2 } from 'lucide-react'

interface UserInputProps {
  onSubmit: (response: string) => void
  isLoading?: boolean
  questionNumber?: number
  totalQuestions?: number
}

export default function UserInput({ 
  onSubmit, 
  isLoading = false,
  questionNumber = 1,
  totalQuestions = 5
}: UserInputProps) {
  const [response, setResponse] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const maxChars = 1000

  useEffect(() => {
    setCharCount(response.length)
  }, [response])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (response.trim() && !isLoading) {
      onSubmit(response.trim())
      setResponse('')
    }
  }

  const toggleRecording = () => {
    // Note: Speech-to-text functionality would require additional implementation
    // This is a placeholder for the UI
    setIsRecording(!isRecording)
  }

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Your Response
          </h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Take your time to provide a thoughtful answer
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={response}
            onChange={(e) => {
              setResponse(e.target.value)
              adjustTextareaHeight()
            }}
            onInput={adjustTextareaHeight}
            placeholder="Type your answer here..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     placeholder-gray-400 dark:placeholder-gray-500
                     resize-none overflow-hidden"
            rows={4}
            maxLength={maxChars}
            disabled={isLoading}
          />
          
          {/* Microphone button overlay */}
          <button
            type="button"
            onClick={toggleRecording}
            className={`absolute right-3 top-3 p-2 rounded-lg transition-colors
              ${isRecording 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={isLoading}
            title={isRecording ? 'Stop recording' : 'Start recording'}
          >
            {isRecording ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-sm ${
            charCount > maxChars * 0.9 
              ? 'text-red-600 dark:text-red-400' 
              : 'text-gray-500 dark:text-gray-500'
          }`}>
            {charCount}/{maxChars} characters
          </span>

          <button
            type="submit"
            disabled={!response.trim() || isLoading}
            className={`
              px-6 py-2 rounded-lg font-medium transition-all
              flex items-center gap-2
              ${!response.trim() || isLoading
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md'
              }
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Submit Answer
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {isRecording && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-300 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            Recording in progress... (Speech-to-text coming soon)
          </p>
        </div>
      )}
    </div>
  )
}