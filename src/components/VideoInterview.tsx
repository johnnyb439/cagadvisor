'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Video, Camera, StopCircle, RotateCcw, Check, Clock, AlertCircle } from 'lucide-react'

interface VideoInterviewProps {
  jobTitle?: string
  company?: string
  interviewerName?: string
  userRole?: string
  userExperience?: string
}

export default function VideoInterview({
  jobTitle = 'Senior Software Engineer - TS/SCI',
  company = 'Lockheed Martin',
  interviewerName = 'Sarah Johnson',
  userRole = 'Network Engineer',
  userExperience = 'Senior'
}: VideoInterviewProps) {
  const [stage, setStage] = useState<'intro' | 'difficulty' | 'question' | 'recording' | 'review' | 'submitted'>('intro')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [difficulty, setDifficulty] = useState(3)
  const videoRef = useRef<HTMLVideoElement>(null)
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Role-specific questions based on user profile
  const roleQuestions = {
    'Network Engineer': [
      {
        id: 1,
        text: "Describe your experience with network security in classified environments, including firewalls, VPNs, and intrusion detection systems.",
        timeLimit: 120
      },
      {
        id: 2,
        text: "Walk us through how you would troubleshoot a complex network connectivity issue affecting multiple classified systems.",
        timeLimit: 180
      },
      {
        id: 3,
        text: "Explain your approach to implementing zero-trust architecture in a DoD environment.",
        timeLimit: 120
      }
    ],
    'Software Engineer': [
      {
        id: 1,
        text: "Tell us about your experience working in classified environments and how you maintain security protocols.",
        timeLimit: 120
      },
      {
        id: 2,
        text: "Describe a challenging technical problem you solved and how you approached it.",
        timeLimit: 180
      },
      {
        id: 3,
        text: "Why are you interested in this position and what unique value would you bring to our team?",
        timeLimit: 120
      }
    ],
    'Cybersecurity Analyst': [
      {
        id: 1,
        text: "Describe a security incident you've handled and your approach to incident response in a classified environment.",
        timeLimit: 120
      },
      {
        id: 2,
        text: "How do you stay current with emerging threats and vulnerabilities affecting government systems?",
        timeLimit: 180
      },
      {
        id: 3,
        text: "Explain your experience with STIG compliance and security auditing.",
        timeLimit: 120
      }
    ]
  }

  const questions = roleQuestions[userRole as keyof typeof roleQuestions] || roleQuestions['Software Engineer']

  // Difficulty descriptions
  const difficultyLevels = [
    { level: 1, name: 'Entry Level', description: 'Basic technical questions' },
    { level: 2, name: 'Junior', description: 'Fundamental concepts and scenarios' },
    { level: 3, name: 'Mid-Level', description: 'Complex problems and solutions' },
    { level: 4, name: 'Senior', description: 'Architecture and leadership focus' },
    { level: 5, name: 'Expert', description: 'Advanced scenarios and strategy' }
  ]

  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
    }
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
    }
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startInterview = () => {
    setStage('difficulty')
  }

  const startQuestions = () => {
    setStage('question')
    setCurrentQuestion(0)
    // Auto-play video after a short delay
    setTimeout(() => {
      if (videoRef.current) {
        setIsPlaying(true)
        videoRef.current.play().catch(error => {
          console.error('Video playback failed:', error)
          setIsPlaying(false)
        })
      }
    }, 500)
  }

  const playQuestion = () => {
    if (videoRef.current) {
      setIsPlaying(true)
      videoRef.current.play().catch(error => {
        console.error('Video playback failed:', error)
        setIsPlaying(false)
      })
    }
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
  }

  const startRecording = () => {
    setStage('recording')
    setIsRecording(true)
    setRecordingTime(0)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setStage('review')
  }

  const submitAnswer = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setStage('question')
      setRecordingTime(0)
    } else {
      setStage('submitted')
    }
  }

  const retakeAnswer = () => {
    setStage('question')
    setRecordingTime(0)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{userRole} Mock Interview</h2>
        <p className="text-gray-600">Tailored for {userExperience} {userRole} • {company}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Interview Stages */}
      {stage === 'intro' && (
        <div className="text-center py-12">
          <div className="mb-8">
            <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4">
              <Video className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Welcome to Your Video Interview</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              You&apos;ll be asked {questions.length} questions by {interviewerName}. 
              Watch each question carefully, then record your response. 
              You&apos;ll have up to {questions[0].timeLimit / 60} minutes per answer.
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800 text-left">
                <p className="font-semibold mb-1">Before you begin:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ensure you&apos;re in a quiet, secure location</li>
                  <li>Check your camera and microphone</li>
                  <li>You can re-record each answer once</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={startInterview}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Interview
          </button>
        </div>
      )}

      {stage === 'difficulty' && (
        <div className="text-center py-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Select Interview Difficulty</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-2">
              Choose the difficulty level based on your experience as a {userRole}
            </p>
            <p className="text-sm text-blue-600">
              Questions will be tailored to your role and selected difficulty
            </p>
          </div>

          <div className="grid grid-cols-5 gap-4 max-w-3xl mx-auto mb-8">
            {difficultyLevels.map((level) => (
              <button
                key={level.level}
                onClick={() => setDifficulty(level.level)}
                className={`p-6 rounded-lg border-2 transition-all ${
                  difficulty === level.level
                    ? 'border-blue-600 bg-blue-50 scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-3xl font-bold mb-2">{level.level}</div>
                <div className="text-sm font-medium">{level.name}</div>
                <div className="text-xs text-gray-600 mt-1">{level.description}</div>
              </button>
            ))}
          </div>

          <div className="bg-blue-50 rounded-lg p-4 max-w-2xl mx-auto mb-6">
            <p className="text-blue-800">
              <span className="font-semibold">Selected:</span> Level {difficulty} - {difficultyLevels[difficulty - 1].name}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Interview questions will match this difficulty level
            </p>
          </div>

          <button
            onClick={startQuestions}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Continue to Interview
          </button>
        </div>
      )}

      {stage === 'question' && (
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/mac-interviews.mp4"
              onEnded={handleVideoEnd}
              controls={true}
              muted
              playsInline
              preload="auto"
            />
            {!isPlaying && (
              <button
                onClick={playQuestion}
                className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/40 transition-colors"
              >
                <div className="bg-white rounded-full p-4">
                  <Play className="h-8 w-8 text-blue-600" />
                </div>
              </button>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Question {currentQuestion + 1}:</h4>
            <p className="text-blue-800">{questions[currentQuestion].text}</p>
            <p className="text-sm text-blue-600 mt-2">
              Time limit: {questions[currentQuestion].timeLimit / 60} minutes
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0
                  playQuestion()
                }
              }}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Replay Question
            </button>
            <button
              onClick={startRecording}
              className="bg-blue-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Camera className="h-5 w-5" />
              Start Recording
            </button>
          </div>
        </div>
      )}

      {stage === 'recording' && (
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="bg-red-600 rounded-full h-3 w-3 animate-pulse" />
              <span className="text-white font-medium">REC</span>
            </div>
            <div className="text-white text-center">
              <Camera className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg">Recording your answer...</p>
              <p className="text-3xl font-mono mt-2">{formatTime(recordingTime)}</p>
              {recordingTime >= questions[currentQuestion].timeLimit && (
                <p className="text-yellow-400 text-sm mt-2">Time limit reached!</p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 font-medium">{questions[currentQuestion].text}</p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={stopRecording}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2"
            >
              <StopCircle className="h-5 w-5" />
              Stop Recording
            </button>
          </div>
        </div>
      )}

      {stage === 'review' && (
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-white text-center">
              <Check className="h-16 w-16 mx-auto mb-4 text-green-400" />
              <p className="text-lg">Answer recorded successfully!</p>
              <p className="text-sm text-gray-400 mt-2">Duration: {formatTime(recordingTime)}</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={retakeAnswer}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition flex items-center gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Re-record Answer
            </button>
            <button
              onClick={submitAnswer}
              className="bg-green-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-green-700 transition"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Submit Interview'}
            </button>
          </div>
        </div>
      )}

      {stage === 'submitted' && (
        <div className="text-center py-12">
          <div className="mb-8">
            <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Interview Submitted!</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Thank you for completing your video interview. 
              The hiring team at {company} will review your responses and contact you within 3-5 business days.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="font-semibold text-blue-900 mb-3">What happens next?</h4>
            <div className="space-y-2 text-sm text-blue-800 text-left">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5" />
                <span>Your interview will be reviewed by the hiring team</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5" />
                <span>Security clearance verification will be conducted</span>
              </div>
              <div className="flex items-start gap-2">
                <Video className="h-4 w-4 mt-0.5" />
                <span>You may be invited for a follow-up technical interview</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}