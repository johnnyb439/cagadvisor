'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Bot, Send, RefreshCw, CheckCircle, AlertCircle, Volume2, VolumeX, X, Clock, Trophy, Target, Timer, Pause, Play } from 'lucide-react'
import BinaryBackground from '@/components/BinaryBackground'
import { interviewQuestions, InterviewQuestion } from './interview-data'


type InterviewTier = 'tier1' | 'tier2'
type InterviewRole = string

const interviewRoles = {
  tier1: [
    { id: 'helpdesk', name: 'Help Desk/Service Desk', description: 'Customer support and ticket resolution' },
    { id: 'osp', name: 'OSP (Outside Plant)', description: 'External network infrastructure' },
    { id: 'isp', name: 'ISP (Inside Plant)', description: 'Internal network infrastructure' },
    { id: 'fiber', name: 'Fiber Optics', description: 'Fiber installation and troubleshooting' }
  ],
  tier2: [
    { id: 'network', name: 'Network Administration', description: 'Routers, switches, and network management' },
    { id: 'systems', name: 'Systems Administration', description: 'Exchange, O365, DNS, DHCP management' }
  ]
}

// Available roles with implemented questions
const availableRoles = ['helpdesk', 'isp', 'osp', 'fiber', 'network', 'systems']

// Progressive difficulty ordering with slight randomization within difficulty groups
const orderByDifficulty = <T extends InterviewQuestion>(array: T[]): T[] => {
  if (array.length === 0) return [];
  
  // Assign difficulty levels based on position
  const withDifficulty = array.map((q, index) => {
    let difficulty: 'easy' | 'medium' | 'hard';
    const totalQuestions = array.length;
    const position = index / totalQuestions;
    
    if (position < 0.33) {
      difficulty = 'easy';
    } else if (position < 0.67) {
      difficulty = 'medium';
    } else {
      difficulty = 'hard';
    }
    
    return { ...q, difficulty };
  });
  
  // For a 15-question array, divide into difficulty groups
  const easy = withDifficulty.slice(0, 5);
  const medium = withDifficulty.slice(5, 10);
  const hard = withDifficulty.slice(10);
  
  // Shuffle within each difficulty group for variety
  const shuffleGroup = (group: T[]) => {
    const shuffled = [...group];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  // Return concatenated groups: easy first, then medium, then hard
  return [...shuffleGroup(easy), ...shuffleGroup(medium), ...shuffleGroup(hard)] as T[];
}

// Progress Bar Component
const ProgressBar = ({ current, total, questions }: { current: number, total: number, questions: InterviewQuestion[] }) => {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</span>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{current} of {total}</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => {
          const question = questions[i];
          const difficulty = question?.difficulty || 'easy';
          const isCompleted = i < current - 1;
          const isCurrent = i === current - 1;
          
          return (
            <div
              key={i}
              className="flex-1 relative group"
            >
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-green'
                    : isCurrent
                    ? 'bg-sky-blue animate-pulse'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs whitespace-nowrap bg-gray-800 text-white px-2 py-1 rounded">
                  Q{i + 1} - {difficulty}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Timer Component
const TimerDisplay = ({ timeRemaining, isPaused, onTogglePause }: { 
  timeRemaining: number, 
  isPaused: boolean,
  onTogglePause: () => void 
}) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isWarning = timeRemaining <= 30 && timeRemaining > 10;
  const isCritical = timeRemaining <= 10;
  
  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
      isCritical ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
      isWarning ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
      'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    }`}>
      <Clock className="w-4 h-4" />
      <span className="font-mono font-semibold">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
      <button
        onClick={onTogglePause}
        className="ml-1 hover:opacity-70 transition-opacity"
      >
        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      </button>
    </div>
  );
};

// Difficulty Badge Component
const DifficultyBadge = ({ difficulty }: { difficulty: 'easy' | 'medium' | 'hard' | undefined }) => {
  const config = {
    easy: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', label: 'Easy' },
    medium: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400', label: 'Medium' },
    hard: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', label: 'Hard' }
  };
  
  const style = config[difficulty || 'easy'];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <Target className="w-3 h-3 mr-1" />
      {style.label}
    </span>
  );
};

// Interview Summary Component
const InterviewSummary = ({ 
  stats, 
  onRestart,
  onNewInterview 
}: { 
  stats: {
    totalTime: number;
    questionsAnswered: number;
    totalQuestions: number;
    byDifficulty: { easy: number; medium: number; hard: number };
    averageTimePerQuestion: number;
  };
  onRestart: () => void;
  onNewInterview: () => void;
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card max-w-2xl mx-auto"
    >
      <div className="text-center mb-6">
        <Trophy className="w-16 h-16 text-dynamic-green mx-auto mb-4" />
        <h2 className="text-3xl font-montserrat font-bold mb-2">Interview Complete!</h2>
        <p className="text-intel-gray">Great job completing the mock interview!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-ops-charcoal rounded-lg p-4">
          <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Performance Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Total Time:</span>
              <span className="font-mono font-semibold">{formatTime(stats.totalTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Questions Answered:</span>
              <span className="font-semibold">{stats.questionsAnswered} / {stats.totalQuestions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Avg Time/Question:</span>
              <span className="font-mono font-semibold">{formatTime(stats.averageTimePerQuestion)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-ops-charcoal rounded-lg p-4">
          <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Difficulty Breakdown</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Easy:
              </span>
              <span className="font-semibold">{stats.byDifficulty.easy} completed</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Medium:
              </span>
              <span className="font-semibold">{stats.byDifficulty.medium} completed</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Hard:
              </span>
              <span className="font-semibold">{stats.byDifficulty.hard} completed</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-dynamic-green/10 border border-dynamic-green/30 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-dynamic-green mb-2">Tips for Improvement</h3>
        <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
          {stats.averageTimePerQuestion > 120 && (
            <li>• Try to answer questions more quickly while maintaining quality</li>
          )}
          {stats.byDifficulty.hard < 2 && (
            <li>• Challenge yourself with more difficult questions next time</li>
          )}
          <li>• Review the example answers to understand best practices</li>
          <li>• Practice regularly to build confidence and knowledge</li>
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRestart}
          className="btn-primary flex-1"
        >
          Practice Same Role Again
        </button>
        <button
          onClick={onNewInterview}
          className="btn-secondary flex-1"
        >
          Choose Different Role
        </button>
      </div>
    </motion.div>
  );
};

export default function MockInterviewPage() {
  const [selectedTier, setSelectedTier] = useState<InterviewTier | null>(null)
  const [selectedRole, setSelectedRole] = useState<InterviewRole | null>(null)
  const [isInterviewing, setIsInterviewing] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [exampleAnswer, setExampleAnswer] = useState('')
  const [questionCount, setQuestionCount] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState<InterviewQuestion[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showProTip, setShowProTip] = useState(true)
  
  // Timer states
  const [useTimer, setUseTimer] = useState(false)
  const [timerDuration, setTimerDuration] = useState(120) // 2 minutes default
  const [timeRemaining, setTimeRemaining] = useState(120)
  const [isTimerPaused, setIsTimerPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Stats tracking
  const [interviewStats, setInterviewStats] = useState({
    startTime: Date.now(),
    totalTime: 0,
    questionsAnswered: 0,
    byDifficulty: { easy: 0, medium: 0, hard: 0 }
  })
  const [showSummary, setShowSummary] = useState(false)

  const startInterview = () => {
    if (selectedRole) {
      setIsInterviewing(true)
      setShowSummary(false)
      setInterviewStats({
        startTime: Date.now(),
        totalTime: 0,
        questionsAnswered: 0,
        byDifficulty: { easy: 0, medium: 0, hard: 0 }
      })
      
      // Order questions by progressive difficulty
      if (availableRoles.includes(selectedRole)) {
        const questions = interviewQuestions[selectedRole] || [];
        const ordered = orderByDifficulty(questions);
        setShuffledQuestions(ordered);
        setQuestionIndex(0);
        setQuestionCount(1);
        setCurrentQuestion(ordered[0]);
        
        // Start timer if enabled
        if (useTimer) {
          setTimeRemaining(timerDuration);
          setIsTimerPaused(false);
        }
      }
    }
  }

  // Timer effect
  useEffect(() => {
    if (isInterviewing && useTimer && !isTimerPaused && timeRemaining > 0 && !showAnswer) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Auto-submit when time runs out
            submitAnswer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [isInterviewing, useTimer, isTimerPaused, timeRemaining, showAnswer]);

  const generateQuestion = () => {
    if (availableRoles.includes(selectedRole!) && shuffledQuestions.length > 0) {
      // Get next question from shuffled array
      const nextIndex = questionIndex + 1;
      if (nextIndex < shuffledQuestions.length) {
        setQuestionIndex(nextIndex);
        setCurrentQuestion(shuffledQuestions[nextIndex]);
        setUserAnswer('');
        setShowAnswer(false);
        setExampleAnswer('');
        setQuestionCount(prev => prev + 1);
        
        // Reset timer for new question
        if (useTimer) {
          setTimeRemaining(timerDuration);
          setIsTimerPaused(false);
        }
      }
    }
  }

  const submitAnswer = () => {
    if (currentQuestion) {
      setShowAnswer(true)
      setExampleAnswer(currentQuestion.answer)
      
      // Update stats
      const difficulty = currentQuestion.difficulty || 'easy';
      setInterviewStats(prev => ({
        ...prev,
        questionsAnswered: prev.questionsAnswered + 1,
        byDifficulty: {
          ...prev.byDifficulty,
          [difficulty]: prev.byDifficulty[difficulty] + 1
        }
      }));
      
      // Pause timer
      setIsTimerPaused(true);
    }
  }

  const nextQuestion = () => {
    stopSpeaking() // Stop any ongoing speech
    if (questionCount < 16) {
      generateQuestion()
    } else {
      // Calculate final stats
      const endTime = Date.now();
      const totalTime = Math.floor((endTime - interviewStats.startTime) / 1000);
      setInterviewStats(prev => ({
        ...prev,
        totalTime
      }));
      setIsInterviewing(false)
      setShowAnswer(false)
      setShowSummary(true)
    }
  }

  const resetInterview = () => {
    setSelectedTier(null)
    setSelectedRole(null)
    setIsInterviewing(false)
    setCurrentQuestion(null)
    setUserAnswer('')
    setShowAnswer(false)
    setExampleAnswer('')
    setQuestionCount(0)
    setShuffledQuestions([])
    setQuestionIndex(0)
    setShowSummary(false)
    stopSpeaking()
  }
  
  const restartSameRole = () => {
    setIsInterviewing(false)
    setCurrentQuestion(null)
    setUserAnswer('')
    setShowAnswer(false)
    setExampleAnswer('')
    setQuestionCount(0)
    setShuffledQuestions([])
    setQuestionIndex(0)
    setShowSummary(false)
    stopSpeaking()
    
    // Restart with same role
    setTimeout(() => startInterview(), 100);
  }

  const speakText = (text: string) => {
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      
      // Configure speech settings for more natural sound
      utterance.rate = 0.9 // Slightly slower for more natural pace (0.1 to 10)
      utterance.pitch = 1.1 // Slightly higher pitch for warmth (0 to 2)
      utterance.volume = 0.9 // Slightly lower volume (0 to 1)
      
      // Try to select a more natural voice
      const voices = window.speechSynthesis.getVoices()
      
      // Priority list of more natural-sounding voices
      const preferredVoices = [
        'Microsoft Zira', // Windows natural voice
        'Microsoft David', // Windows natural voice
        'Samantha', // macOS natural voice
        'Alex', // macOS natural voice
        'Google US English', // Chrome natural voice
        'Google UK English Female', // Chrome natural voice
        'Google UK English Male' // Chrome natural voice
      ]
      
      // Find the best available voice
      let selectedVoice = voices.find(voice => 
        preferredVoices.some(preferred => 
          voice.name.includes(preferred)
        )
      )
      
      // If no preferred voice found, try to get any English voice that's not too robotic
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          !voice.name.includes('compact') && // Avoid compact voices (more robotic)
          !voice.name.includes('eSpeak') // Avoid eSpeak (very robotic)
        )
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice
      }
      
      // Set speaking state
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      // Start speaking
      window.speechSynthesis.speak(utterance)
    } else {
      alert('Text-to-speech is not supported in your browser')
    }
  }

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const toggleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking()
    } else {
      speakText(text)
    }
  }

  // Load voices on component mount
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Load voices - some browsers need this
      window.speechSynthesis.getVoices();
      
      // Chrome needs an event listener
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-gray-50 dark:bg-ops-charcoal py-20">
      <BinaryBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-dynamic-green/10 text-dynamic-green px-4 py-2 rounded-full mb-4">
            <Bot className="w-5 h-5 mr-2" />
            <span className="font-semibold">Mock Interview Practice</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
            Practice Makes <span className="gradient-text">Perfect</span>
          </h1>
          <p className="text-xl text-intel-gray">
            Prepare for your cleared IT interview with real questions and example answers
          </p>
        </motion.div>

        {!isInterviewing && !selectedTier && !showSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-montserrat font-semibold text-center mb-8">
              Select Your Experience Level
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setSelectedTier('tier1')}
                className="card hover:border-sky-blue border-2 border-transparent transition-all duration-300"
              >
                <h3 className="text-xl font-montserrat font-semibold mb-2">Tier 1 - Entry Level</h3>
                <p className="text-intel-gray mb-4">Help Desk, OSP, ISP, Fiber Optics</p>
                <p className="text-sm text-dynamic-green">Perfect for those starting their IT journey</p>
              </button>
              
              <button
                onClick={() => setSelectedTier('tier2')}
                className="card hover:border-dynamic-green border-2 border-transparent transition-all duration-300"
              >
                <h3 className="text-xl font-montserrat font-semibold mb-2">Tier 2 - Mid Level</h3>
                <p className="text-intel-gray mb-4">Network Admin, Systems Admin</p>
                <p className="text-sm text-sky-blue">For experienced IT professionals</p>
              </button>
            </div>
          </motion.div>
        )}

        {selectedTier && !selectedRole && !isInterviewing && !showSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <button
              onClick={() => setSelectedTier(null)}
              className="text-intel-gray hover:text-command-black transition-colors"
            >
              ← Back to tier selection
            </button>
            
            <h2 className="text-2xl font-montserrat font-semibold text-center mb-8">
              Select Your Target Role
            </h2>
            
            {/* Timer Settings */}
            <div className="card bg-gray-50 dark:bg-ops-charcoal">
              <h3 className="font-semibold mb-3 flex items-center">
                <Timer className="w-5 h-5 mr-2 text-sky-blue" />
                Timer Settings (Optional)
              </h3>
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useTimer}
                    onChange={(e) => setUseTimer(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">Enable timer for realistic practice</span>
                </label>
                {useTimer && (
                  <select
                    value={timerDuration}
                    onChange={(e) => setTimerDuration(Number(e.target.value))}
                    className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  >
                    <option value={60}>1 minute</option>
                    <option value={90}>1.5 minutes</option>
                    <option value={120}>2 minutes</option>
                    <option value={180}>3 minutes</option>
                  </select>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interviewRoles[selectedTier].map((role) => {
                const isAvailable = availableRoles.includes(role.id);
                return (
                  <button
                    key={role.id}
                    onClick={() => {
                      if (isAvailable) {
                        setSelectedRole(role.id);
                        // Automatically start interview after role selection
                        setTimeout(() => {
                          startInterview();
                        }, 500);
                      }
                    }}
                    disabled={!isAvailable}
                    className={`card border-2 transition-all duration-300 text-left group ${
                      isAvailable 
                        ? 'hover:border-emerald-green border-transparent cursor-pointer' 
                        : 'border-gray-300 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <h3 className="font-montserrat font-semibold mb-1">{role.name}</h3>
                    <p className="text-sm text-intel-gray mb-2">{role.description}</p>
                    {isAvailable ? (
                      <p className="text-sm text-emerald-green font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to start interview →
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        Coming soon...
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
            
          </motion.div>
        )}

        {isInterviewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Progress Bar */}
            <ProgressBar 
              current={questionCount} 
              total={16} 
              questions={shuffledQuestions}
            />
            
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-montserrat font-semibold">Question {questionCount} of 16</h3>
                  <DifficultyBadge difficulty={currentQuestion?.difficulty} />
                </div>
                <div className="flex items-center gap-3">
                  {useTimer && (
                    <TimerDisplay 
                      timeRemaining={timeRemaining}
                      isPaused={isTimerPaused}
                      onTogglePause={() => setIsTimerPaused(!isTimerPaused)}
                    />
                  )}
                  <button
                    onClick={resetInterview}
                    className="text-intel-gray hover:text-command-black transition-colors"
                    title="End Interview"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-ops-charcoal rounded-lg p-4 mb-6">
                <p className="text-lg">{currentQuestion?.question}</p>
              </div>
              
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:border-cyber-cyan dark:focus:border-cyber-cyan focus:outline-none resize-none"
                  rows={6}
                  disabled={showAnswer}
                />
                
                <div className="flex justify-end">
                  <button
                    onClick={submitAnswer}
                    disabled={!userAnswer.trim() || showAnswer}
                    className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                    <Send className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
              
              {showAnswer && exampleAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4"
                >
                  {/* Side-by-side comparison */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Your Answer */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Your Answer
                      </h4>
                      <div className="text-sm text-gray-700 dark:text-gray-300 max-h-64 overflow-y-auto">
                        {userAnswer || <span className="italic text-gray-500">No answer provided</span>}
                      </div>
                    </div>
                    
                    {/* Example Answer */}
                    <div className="bg-emerald-green/10 border border-emerald-green/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-emerald-green flex items-center">
                          <Trophy className="w-4 h-4 mr-2" />
                          Example Answer
                        </h4>
                        <button
                          onClick={() => toggleSpeak(exampleAnswer)}
                          className="flex items-center px-2 py-1 rounded-lg transition-colors bg-emerald-green/20 hover:bg-emerald-green/30 text-emerald-green"
                          title={isSpeaking ? "Stop reading" : "Read answer aloud"}
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2 max-h-64 overflow-y-auto">
                        {exampleAnswer.split('. ').map((sentence, index) => {
                          // Format sentences into bullet points for better readability
                          if (sentence.includes(':')) {
                            const [title, ...content] = sentence.split(':');
                            return (
                              <div key={index} className="mb-2">
                                <span className="font-semibold text-emerald-green">
                                  {title}:
                                </span>
                                <span className="ml-1">{content.join(':')}</span>
                              </div>
                            );
                          } else if (sentence.trim()) {
                            // Check for key technical terms to highlight
                            const highlightedSentence = sentence
                              .replace(/(\d+[-\d]*\s*(dBm|MHz|Mbps|Gbps|ms|GB|MB|KB))/g, '<span class="font-mono font-semibold text-sky-blue">$1</span>')
                              .replace(/(ping|traceroute|ipconfig|nslookup|netstat|diskpart|chkdsk|sfc|dism|bcdedit|bootrec)/gi, '<code class="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">$1</code>')
                              .replace(/(Layer \d|Tier \d|Phase \d|Step \d)/g, '<span class="font-semibold text-dynamic-green">$1</span>')
                              .replace(/(VLAN|DNS|DHCP|TCP|UDP|IP|OSI|QoS|VoIP|IPv4|IPv6|NAT|VPN|SNMP|SSH|RDP|SMB|HTTPS?|FTP|WPA2|WPA3|SSID|MAC|CPU|RAM|SSD|HDD|BIOS|UEFI|POST)/g, '<span class="font-mono text-xs bg-blue-100 dark:bg-blue-900/30 px-1 rounded">$1</span>');
                            
                            return (
                              <div key={index} className="flex items-start">
                                <span className="text-emerald-green mr-2 mt-1">•</span>
                                <span dangerouslySetInnerHTML={{ __html: highlightedSentence + (sentence.endsWith('.') ? '' : '.') }} />
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={nextQuestion}
                      className="btn-primary"
                    >
                      {questionCount < 16 ? 'Next Question' : 'Finish Interview'}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Interview Summary */}
        {showSummary && (
          <InterviewSummary
            stats={{
              totalTime: interviewStats.totalTime,
              questionsAnswered: interviewStats.questionsAnswered,
              totalQuestions: 16,
              byDifficulty: interviewStats.byDifficulty,
              averageTimePerQuestion: Math.floor(interviewStats.totalTime / (interviewStats.questionsAnswered || 1))
            }}
            onRestart={restartSameRole}
            onNewInterview={resetInterview}
          />
        )}

        {showProTip && !isInterviewing && !showSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 p-6 bg-dynamic-green/10 rounded-lg border border-dynamic-green/30 relative"
          >
            <button
              onClick={() => setShowProTip(false)}
              className="absolute top-4 right-4 text-dynamic-green hover:text-emerald-green transition-colors"
              aria-label="Close pro tip"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start pr-8">
              <AlertCircle className="w-5 h-5 text-dynamic-green mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-dynamic-green mb-1">Pro Tips</h4>
                <ul className="text-sm space-y-1">
                  <li>• Questions progress from Easy → Medium → Hard difficulty</li>
                  <li>• Use the timer feature to simulate real interview pressure</li>
                  <li>• Review example answers to understand best practices</li>
                  <li>• Complete all 16 questions to see your performance summary</li>
                  <li>• Practice multiple times to build confidence and knowledge</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}