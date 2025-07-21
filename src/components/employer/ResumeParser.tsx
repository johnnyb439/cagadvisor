'use client'

import { useState } from 'react'
import { Upload, FileText, Sparkles, CheckCircle, AlertCircle } from 'lucide-react'

interface ParsedResume {
  name: string
  clearance: string
  yearsExperience: number
  certifications: string[]
  skills: string[]
  education: string[]
  matchScore: number
  summary: string
  highlights: {
    clearanceMatch: boolean
    certMatch: boolean
    experienceMatch: boolean
    locationMatch: boolean
  }
}

export default function ResumeParser() {
  const [file, setFile] = useState<File | null>(null)
  const [parsing, setParsing] = useState(false)
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const parseResume = async () => {
    if (!file) return
    
    setParsing(true)
    // Simulate AI parsing - in production this would use OpenAI/Claude API
    setTimeout(() => {
      setParsedData({
        name: "Sarah Johnson",
        clearance: "TS/SCI with CI Poly",
        yearsExperience: 8,
        certifications: ["CISSP", "Security+", "CCNA", "AWS Solutions Architect"],
        skills: ["Python", "Kubernetes", "Terraform", "AWS", "Zero Trust Architecture"],
        education: ["MS Computer Science - George Mason University", "BS Cybersecurity - UMGC"],
        matchScore: 92,
        summary: "Experienced cloud security architect with active TS/SCI clearance and strong background in DoD environments. Specializes in zero-trust implementations and cloud-native security solutions.",
        highlights: {
          clearanceMatch: true,
          certMatch: true,
          experienceMatch: true,
          locationMatch: true
        }
      })
      setParsing(false)
    }, 2000)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-6 w-6 text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Smart Resume Parser</h2>
      </div>

      <div className="space-y-4">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {file ? file.name : "Drag and drop a resume or click to browse"}
          </p>
          <input
            type="file"
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition cursor-pointer"
          >
            Select File
          </label>
        </div>

        {file && !parsedData && (
          <button
            onClick={parseResume}
            disabled={parsing}
            className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {parsing ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Analyzing Resume with AI...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Parse Resume
              </>
            )}
          </button>
        )}

        {parsedData && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{parsedData.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary-600">{parsedData.matchScore}%</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">match</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{parsedData.summary}</p>
              
              <div className="flex flex-wrap gap-2">
                <span className="clearance-badge sci">{parsedData.clearance}</span>
                <span className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs font-medium text-gray-700 dark:text-gray-300">
                  {parsedData.yearsExperience} years exp.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  {parsedData.highlights.certMatch ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-yellow-600" />}
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-1">
                  {parsedData.certifications.map((cert, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Key Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {parsedData.skills.slice(0, 5).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm">
                  Add to Talent Pool
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm">
                  View Full Parse
                </button>
              </div>
              <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                Parse Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}