'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

interface DifficultySelectorProps {
  onSelect: (tier: number) => void
}

const difficultyLevels = [
  {
    tier: 1,
    title: 'Entry Level',
    description: 'Basic help desk & troubleshooting',
    skills: ['Password resets', 'Basic hardware', 'Ticketing systems'],
    color: 'from-green-400 to-green-600',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    tier: 2,
    title: 'Junior IT Support',
    description: 'Intermediate technical support',
    skills: ['Network basics', 'OS troubleshooting', 'User management'],
    color: 'from-blue-400 to-blue-600',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    tier: 3,
    title: 'Mid-Level',
    description: 'Systems administration & security',
    skills: ['Server management', 'Security protocols', 'Scripting'],
    color: 'from-purple-400 to-purple-600',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    tier: 4,
    title: 'Senior IT Professional',
    description: 'Advanced infrastructure & cloud',
    skills: ['Cloud architecture', 'DevOps', 'Enterprise solutions'],
    color: 'from-orange-400 to-orange-600',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    tier: 5,
    title: 'Expert/Architect',
    description: 'Complex problem-solving & design',
    skills: ['System design', 'Security architecture', 'Strategic planning'],
    color: 'from-red-400 to-red-600',
    borderColor: 'border-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
  },
]

export default function DifficultySelector({ onSelect }: DifficultySelectorProps) {
  const [selectedTier, setSelectedTier] = useState<number | null>(null)

  const handleSelect = (tier: number) => {
    setSelectedTier(tier)
    setTimeout(() => {
      onSelect(tier)
    }, 300) // Small delay for visual feedback
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Select Interview Difficulty
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose a difficulty level that matches your experience
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {difficultyLevels.map((level) => (
          <button
            key={level.tier}
            onClick={() => handleSelect(level.tier)}
            className={`
              relative p-4 rounded-lg border-2 transition-all duration-200
              ${selectedTier === level.tier
                ? `${level.borderColor} ${level.bgColor} scale-105 shadow-lg`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
              }
              bg-white dark:bg-gray-800 
            `}
          >
            {/* Tier number with gradient background */}
            <div className={`
              w-12 h-12 rounded-full bg-gradient-to-br ${level.color} 
              flex items-center justify-center mx-auto mb-3
              text-white font-bold text-xl
            `}>
              {level.tier}
            </div>

            {/* Selected indicator */}
            {selectedTier === level.tier && (
              <div className="absolute top-2 right-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            )}

            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {level.title}
            </h3>
            
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              {level.description}
            </p>

            <div className="space-y-1">
              {level.skills.map((skill, index) => (
                <div
                  key={index}
                  className="text-xs text-gray-500 dark:text-gray-500"
                >
                  • {skill}
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          The AI interviewer will adapt questions to your selected difficulty level
        </p>
      </div>
    </div>
  )
}