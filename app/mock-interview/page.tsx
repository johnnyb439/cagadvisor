'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bot, Mic, MicOff, Send, RefreshCw, CheckCircle, AlertCircle, Volume2, VolumeX, X } from 'lucide-react'
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
const orderByDifficulty = <T,>(array: T[]): T[] => {
  if (array.length === 0) return [];
  
  // For a 15-question array, divide into difficulty groups
  // Easy (0-4), Medium (5-9), Hard (10-14)
  const easy = array.slice(0, 5);
  const medium = array.slice(5, 10);
  const hard = array.slice(10);
  
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
  return [...shuffleGroup(easy), ...shuffleGroup(medium), ...shuffleGroup(hard)];
}

export default function MockInterviewPage() {
  const [selectedTier, setSelectedTier] = useState<InterviewTier | null>(null)
  const [selectedRole, setSelectedRole] = useState<InterviewRole | null>(null)
  const [isInterviewing, setIsInterviewing] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [exampleAnswer, setExampleAnswer] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState<InterviewQuestion[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showProTip, setShowProTip] = useState(true)

  const startInterview = () => {
    if (selectedRole) {
      setIsInterviewing(true)
      // Order questions by progressive difficulty
      if (selectedRole === 'helpdesk' || selectedRole === 'isp' || selectedRole === 'osp' || selectedRole === 'fiber' || selectedRole === 'network' || selectedRole === 'systems') {
        const questions = interviewQuestions[selectedRole] || [];
        const ordered = orderByDifficulty(questions);
        setShuffledQuestions(ordered);
        setQuestionIndex(0);
        setQuestionCount(1);
        setCurrentQuestion(ordered[0]);
      }
    }
  }

  const generateQuestion = () => {
    if ((selectedRole === 'helpdesk' || selectedRole === 'isp' || selectedRole === 'osp' || selectedRole === 'fiber' || selectedRole === 'network' || selectedRole === 'systems') && shuffledQuestions.length > 0) {
      // Get next question from shuffled array
      const nextIndex = questionIndex + 1;
      if (nextIndex < shuffledQuestions.length) {
        setQuestionIndex(nextIndex);
        setCurrentQuestion(shuffledQuestions[nextIndex]);
        setUserAnswer('');
        setShowAnswer(false);
        setExampleAnswer('');
        setQuestionCount(prev => prev + 1);
      }
    }
  }

  const submitAnswer = () => {
    if (currentQuestion) {
      setShowAnswer(true)
      setExampleAnswer(currentQuestion.answer)
    }
  }

  const nextQuestion = () => {
    stopSpeaking() // Stop any ongoing speech
    if (questionCount < 16) {
      generateQuestion()
    } else {
      setIsInterviewing(false)
      setShowAnswer(false)
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
    stopSpeaking()
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

  // Ensure question loads when interview starts
  useEffect(() => {
    if (isInterviewing && (selectedRole === 'helpdesk' || selectedRole === 'isp' || selectedRole === 'osp' || selectedRole === 'fiber' || selectedRole === 'network' || selectedRole === 'systems') && !currentQuestion && shuffledQuestions.length === 0) {
      // This will be handled by startInterview now
      const questions = interviewQuestions[selectedRole] || [];
      const ordered = orderByDifficulty(questions);
      setShuffledQuestions(ordered);
      setQuestionIndex(0);
      setQuestionCount(1);
      setCurrentQuestion(ordered[0]);
    }
  }, [isInterviewing, selectedRole, currentQuestion, shuffledQuestions]);

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

        {!isInterviewing && !selectedTier && (
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

        {selectedTier && !selectedRole && !isInterviewing && (
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
                          setIsInterviewing(true);
                          // Order questions by progressive difficulty
                          if (role.id === 'helpdesk' || role.id === 'isp' || role.id === 'osp' || role.id === 'fiber' || role.id === 'network' || role.id === 'systems') {
                            const questions = interviewQuestions[role.id] || [];
                            const ordered = orderByDifficulty(questions);
                            setShuffledQuestions(ordered);
                            setQuestionIndex(0);
                            setQuestionCount(1);
                            setCurrentQuestion(ordered[0]);
                          }
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
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-montserrat font-semibold">Question {questionCount} of 16</h3>
                <button
                  onClick={resetInterview}
                  className="text-intel-gray hover:text-command-black transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
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
                  {userAnswer && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-2">Your Answer:</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{userAnswer}</p>
                    </div>
                  )}
                  
                  <div className="p-4 bg-emerald-green/10 border border-emerald-green/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-emerald-green">✓ Example Answer:</h4>
                      <button
                        onClick={() => toggleSpeak(exampleAnswer)}
                        className="flex items-center px-3 py-1 rounded-lg transition-colors bg-emerald-green/20 hover:bg-emerald-green/30 text-emerald-green"
                        title={isSpeaking ? "Stop reading" : "Read answer aloud"}
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-4 h-4 mr-1" />
                            <span className="text-xs">Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4 mr-1" />
                            <span className="text-xs">Read Aloud</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
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
            
            {questionCount >= 16 && !isInterviewing && (
              <div className="text-center">
                <h3 className="text-2xl font-montserrat font-bold mb-4">Interview Complete!</h3>
                <p className="text-intel-gray mb-6">Great job! You've completed the mock interview. Review the example answers to improve your responses.</p>
                <button onClick={resetInterview} className="btn-primary">
                  Start New Interview
                </button>
              </div>
            )}
          </motion.div>
        )}

        {showProTip && (
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
                <h4 className="font-semibold text-dynamic-green mb-1">Pro Tip</h4>
                <p className="text-sm">
                  Practice multiple times to build confidence. Questions are arranged in progressive difficulty—starting with easier ones to build your confidence, then gradually increasing in complexity. The final 2-3 questions are intentionally challenging to test if you're ready for Tier 2 growth. After submitting your answer, you'll see an example of a strong response to help you understand what interviewers are looking for. Remember: in technical interviews, there are no wrong answers—only opportunities to demonstrate stronger problem-solving approaches and deeper technical understanding.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}