'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ResumeCard from '@/components/resume/ResumeCard'
import ResumeVersionList from '@/components/resume/ResumeVersionList'
import ResumeInsightsPanel from '@/components/resume/ResumeInsightsPanel'
import ResumeToJobMatcher from '@/components/resume/ResumeToJobMatcher'
import Toast from '@/components/ui/Toast'

interface Resume {
  id: string
  name: string
  filename: string
  size: string
  uploadDate: string
  isDefault: boolean
  version: number
  notes?: string
}

interface InsightData {
  overallScore: number
  keywordsFound: string[]
  missingKeywords: string[]
  strengths: string[]
  suggestions: string[]
}

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

export default function UpdateResumePage() {
  const [currentResume, setCurrentResume] = useState<Resume | null>(null)
  const [resumeHistory, setResumeHistory] = useState<Resume[]>([])
  const [insights, setInsights] = useState<InsightData | null>(null)
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedResume = localStorage.getItem('currentResume')
    const savedHistory = localStorage.getItem('resumeHistory')
    
    if (savedResume) {
      setCurrentResume(JSON.parse(savedResume))
    }
    if (savedHistory) {
      setResumeHistory(JSON.parse(savedHistory))
    }
  }, [])

  const showNotification = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
  }

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setIsAnalyzing(true)

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const newResume: Resume = {
      id: Date.now().toString(),
      name: file.name,
      filename: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadDate: new Date().toISOString(),
      isDefault: false,
      version: resumeHistory.length + 1,
    }

    // Move current resume to history if exists
    if (currentResume) {
      const updatedHistory = [currentResume, ...resumeHistory].slice(0, 10)
      setResumeHistory(updatedHistory)
      localStorage.setItem('resumeHistory', JSON.stringify(updatedHistory))
    }

    setCurrentResume(newResume)
    localStorage.setItem('currentResume', JSON.stringify(newResume))
    setIsUploading(false)
    showNotification('Resume uploaded successfully!')

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock insights data
    const mockInsights: InsightData = {
      overallScore: 78,
      keywordsFound: ['TypeScript', 'React', 'Node.js', 'AWS', 'Security Clearance', 'Agile', 'Docker'],
      missingKeywords: ['Kubernetes', 'Python', 'CI/CD', 'Jenkins'],
      strengths: [
        'Strong technical skills with modern web technologies',
        'Active security clearance mentioned prominently',
        'Quantifiable achievements with metrics',
        'Clear progression of responsibilities'
      ],
      suggestions: [
        'Add more specific security-related certifications',
        'Include experience with cloud security tools',
        'Expand on leadership and mentoring experience',
        'Add more keywords related to DevOps practices'
      ]
    }

    // Mock job matches
    const mockJobMatches: JobMatch[] = [
      {
        id: '1',
        title: 'Senior Full Stack Developer',
        company: 'Northrop Grumman',
        location: 'McLean, VA',
        clearanceRequired: 'TS/SCI',
        matchPercentage: 87,
        improvementTips: [
          'Add experience with Java Spring Boot',
          'Highlight any polygraph experience',
          'Include more DevOps keywords'
        ],
        jobUrl: '/dashboard/jobs/1'
      },
      {
        id: '2',
        title: 'Cloud Solutions Architect',
        company: 'Booz Allen Hamilton',
        location: 'Arlington, VA',
        clearanceRequired: 'Secret',
        matchPercentage: 75,
        improvementTips: [
          'Add AWS certifications',
          'Include Terraform experience',
          'Mention experience with government cloud environments'
        ],
        jobUrl: '/dashboard/jobs/2'
      },
      {
        id: '3',
        title: 'Software Engineer III',
        company: 'Lockheed Martin',
        location: 'Bethesda, MD',
        clearanceRequired: 'Top Secret',
        matchPercentage: 72,
        improvementTips: [
          'Add C++ experience if applicable',
          'Include embedded systems knowledge',
          'Highlight any DoD project experience'
        ],
        jobUrl: '/dashboard/jobs/3'
      },
      {
        id: '4',
        title: 'DevSecOps Engineer',
        company: 'General Dynamics',
        location: 'Chantilly, VA',
        clearanceRequired: 'TS/SCI',
        matchPercentage: 68,
        improvementTips: [
          'Add security scanning tools experience',
          'Include compliance framework knowledge',
          'Mention container security experience'
        ],
        jobUrl: '/dashboard/jobs/4'
      },
      {
        id: '5',
        title: 'Technical Lead',
        company: 'SAIC',
        location: 'Reston, VA',
        clearanceRequired: 'Secret',
        matchPercentage: 65,
        improvementTips: [
          'Emphasize team leadership experience',
          'Add project management certifications',
          'Include budget management experience'
        ],
        jobUrl: '/dashboard/jobs/5'
      }
    ]

    setInsights(mockInsights)
    setJobMatches(mockJobMatches)
    setIsAnalyzing(false)
  }

  const handleDeleteResume = () => {
    setCurrentResume(null)
    setInsights(null)
    setJobMatches([])
    localStorage.removeItem('currentResume')
    showNotification('Resume deleted successfully')
  }

  const handleSetDefault = (value: boolean) => {
    if (currentResume) {
      const updatedResume = { ...currentResume, isDefault: value }
      setCurrentResume(updatedResume)
      localStorage.setItem('currentResume', JSON.stringify(updatedResume))
      showNotification(value ? 'Resume set as default' : 'Default status removed')
    }
  }

  const handleRestoreVersion = (versionId: string) => {
    const versionToRestore = resumeHistory.find(r => r.id === versionId)
    if (versionToRestore) {
      // Move current to history
      if (currentResume) {
        const updatedHistory = [currentResume, ...resumeHistory.filter(r => r.id !== versionId)]
        setResumeHistory(updatedHistory)
        localStorage.setItem('resumeHistory', JSON.stringify(updatedHistory))
      }

      setCurrentResume(versionToRestore)
      localStorage.setItem('currentResume', JSON.stringify(versionToRestore))
      showNotification('Resume version restored successfully')
      
      // Re-analyze
      setIsAnalyzing(true)
      setTimeout(() => {
        setIsAnalyzing(false)
      }, 2000)
    }
  }

  const handlePreviewVersion = (versionId: string) => {
    // Preview functionality would be implemented here
    console.log('Preview version:', versionId)
  }

  const handleUpdateNotes = (versionId: string, notes: string) => {
    const updatedHistory = resumeHistory.map(resume =>
      resume.id === versionId ? { ...resume, notes } : resume
    )
    setResumeHistory(updatedHistory)
    localStorage.setItem('resumeHistory', JSON.stringify(updatedHistory))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Update Resume</h1>
          <p className="mt-2 text-gray-600">
            Upload and manage your resume to match with cleared jobs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Version History */}
          <div className="lg:col-span-1">
            <ResumeVersionList
              versions={resumeHistory}
              onRestore={handleRestoreVersion}
              onPreview={handlePreviewVersion}
              onUpdateNotes={handleUpdateNotes}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resume Upload Card */}
            <ResumeCard
              currentResume={currentResume}
              onUpload={handleFileUpload}
              onDelete={handleDeleteResume}
              onSetDefault={handleSetDefault}
              isUploading={isUploading}
            />

            {/* AI Insights */}
            <ResumeInsightsPanel
              insights={insights}
              isAnalyzing={isAnalyzing}
            />

            {/* Job Matcher */}
            <div className="mb-6">
              <ResumeToJobMatcher
                jobMatches={jobMatches}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}