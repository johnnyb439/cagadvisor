'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Circle, ArrowRight, ArrowLeft, Trophy, Target, TrendingUp } from 'lucide-react'

const questions = [
  {
    id: 1,
    question: "What is your current clearance level?",
    options: ["No Clearance", "SECRET", "TS", "TS/SCI", "TS/SCI w/ Poly"],
    weight: 3
  },
  {
    id: 2,
    question: "Years of IT experience?",
    options: ["0-2 years", "3-5 years", "6-10 years", "10+ years"],
    weight: 2
  },
  {
    id: 3,
    question: "Primary technical expertise?",
    options: ["Cloud/DevOps", "Cybersecurity", "Network Admin", "Software Development", "Data/Analytics"],
    weight: 2
  },
  {
    id: 4,
    question: "Highest certification level?",
    options: ["None", "CompTIA (A+, Net+, Sec+)", "Associate (AWS/Azure)", "Professional/Expert", "CISSP/CCNP/Similar"],
    weight: 2
  },
  {
    id: 5,
    question: "Military experience?",
    options: ["Active Duty", "Veteran", "Reserve/Guard", "No Military"],
    weight: 1
  }
]

const careerMatches = {
  high: {
    title: "Senior Cloud Architect",
    salary: "$150,000 - $180,000",
    demand: "Extremely High",
    icon: Trophy,
    color: "from-yellow-400 to-orange-400"
  },
  medium: {
    title: "Systems Administrator",
    salary: "$95,000 - $120,000",
    demand: "High",
    icon: Target,
    color: "from-blue-400 to-cyan-400"
  },
  entry: {
    title: "IT Support Specialist",
    salary: "$65,000 - $85,000",
    demand: "Moderate",
    icon: TrendingUp,
    color: "from-green-400 to-emerald-400"
  }
}

export default function SkillsAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResults = () => {
    let totalScore = 0
    answers.forEach((answer, index) => {
      totalScore += (answer + 1) * questions[index].weight
    })
    setScore(totalScore)
    setShowResults(true)
  }

  const getCareerMatch = () => {
    if (score >= 35) return careerMatches.high
    if (score >= 20) return careerMatches.medium
    return careerMatches.entry
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setScore(0)
  }

  if (showResults) {
    const match = getCareerMatch()
    const Icon = match.icon

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 max-w-2xl mx-auto"
      >
        <div className="text-center">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${match.color} flex items-center justify-center`}>
            <Icon className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">Your Career Match</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            {match.title}
          </p>
          
          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Expected Salary</p>
              <p className="text-xl font-semibold text-green-400">{match.salary}</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Market Demand</p>
              <p className="text-xl font-semibold text-cyan-400">{match.demand}</p>
            </div>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
            <p className="text-gray-300">
              Based on your assessment, you&apos;re well-positioned for cleared IT roles. 
              We can help you optimize your profile and connect with top employers.
            </p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Retake Assessment
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all">
              Get Personalized Plan
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              {questions[currentQuestion].question}
            </h3>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center ${
                    answers[currentQuestion] === index
                      ? 'bg-cyan-500/20 border-cyan-500 text-white'
                      : 'bg-gray-900/30 border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  {answers[currentQuestion] === index ? (
                    <CheckCircle className="w-5 h-5 mr-3 text-cyan-400" />
                  ) : (
                    <Circle className="w-5 h-5 mr-3 text-gray-500" />
                  )}
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              answers[currentQuestion] === undefined
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}