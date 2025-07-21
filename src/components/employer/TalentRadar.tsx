'use client'

import { useState } from 'react'
import { Radar, MapPin, Shield, Briefcase, Star, ChevronRight, Filter } from 'lucide-react'

interface MatchedCandidate {
  id: string
  name: string
  clearance: string
  location: string
  experience: string
  skills: string[]
  matchScore: number
  matchReasons: {
    clearance: boolean
    location: boolean
    skills: boolean
    experience: boolean
  }
  availability: 'immediate' | '2-weeks' | '30-days' | 'passive'
  lastActive: string
}

export default function TalentRadar() {
  const [selectedJob, setSelectedJob] = useState('senior-software-engineer')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    minMatch: 80,
    clearanceLevel: 'all',
    availability: 'all',
    location: 'all'
  })

  const jobs = [
    { id: 'senior-software-engineer', title: 'Senior Software Engineer', location: 'McLean, VA', clearance: 'TS/SCI' },
    { id: 'cloud-architect', title: 'Cloud Solutions Architect', location: 'Colorado Springs, CO', clearance: 'Secret' },
    { id: 'cyber-analyst', title: 'Cybersecurity Analyst', location: 'Fort Meade, MD', clearance: 'TS/SCI + Poly' }
  ]

  const matchedCandidates: MatchedCandidate[] = [
    {
      id: '1',
      name: 'Michael Chen',
      clearance: 'TS/SCI',
      location: 'Arlington, VA',
      experience: '8 years',
      skills: ['Java', 'Python', 'Kubernetes', 'AWS'],
      matchScore: 96,
      matchReasons: { clearance: true, location: true, skills: true, experience: true },
      availability: 'immediate',
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Emily Rodriguez',
      clearance: 'TS/SCI + CI Poly',
      location: 'Alexandria, VA',
      experience: '10 years',
      skills: ['React', 'Node.js', 'Docker', 'Azure'],
      matchScore: 94,
      matchReasons: { clearance: true, location: true, skills: true, experience: true },
      availability: '2-weeks',
      lastActive: '1 day ago'
    },
    {
      id: '3',
      name: 'James Wilson',
      clearance: 'Secret',
      location: 'Reston, VA',
      experience: '5 years',
      skills: ['Python', 'Django', 'PostgreSQL', 'Linux'],
      matchScore: 87,
      matchReasons: { clearance: false, location: true, skills: true, experience: true },
      availability: '30-days',
      lastActive: '3 days ago'
    },
    {
      id: '4',
      name: 'Sarah Thompson',
      clearance: 'TS/SCI',
      location: 'Baltimore, MD',
      experience: '7 years',
      skills: ['Go', 'Terraform', 'GCP', 'Kubernetes'],
      matchScore: 85,
      matchReasons: { clearance: true, location: false, skills: true, experience: true },
      availability: 'passive',
      lastActive: '1 week ago'
    }
  ]

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'immediate': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
      case '2-weeks': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
      case '30-days': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
      case 'passive': return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Radar className="h-6 w-6 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Talent Radar</h2>
        </div>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Matching candidates for:
        </label>
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          {jobs.map(job => (
            <option key={job.id} value={job.id}>
              {job.title} - {job.location} ({job.clearance})
            </option>
          ))}
        </select>
      </div>

      {filterOpen && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Minimum Match Score: {filters.minMatch}%
            </label>
            <input
              type="range"
              min="50"
              max="100"
              value={filters.minMatch}
              onChange={(e) => setFilters({...filters, minMatch: parseInt(e.target.value)})}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <select
              value={filters.clearanceLevel}
              onChange={(e) => setFilters({...filters, clearanceLevel: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
            >
              <option value="all">All Clearances</option>
              <option value="ts-sci">TS/SCI+</option>
              <option value="top-secret">Top Secret+</option>
              <option value="secret">Secret+</option>
            </select>
            <select
              value={filters.availability}
              onChange={(e) => setFilters({...filters, availability: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
            >
              <option value="all">All Availability</option>
              <option value="immediate">Immediate</option>
              <option value="2-weeks">2 Weeks</option>
              <option value="30-days">30 Days</option>
            </select>
            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
            >
              <option value="all">All Locations</option>
              <option value="dmv">DC Metro</option>
              <option value="colorado">Colorado</option>
              <option value="texas">Texas</option>
            </select>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {matchedCandidates.filter(c => c.matchScore >= filters.minMatch).map((candidate) => (
          <div key={candidate.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{candidate.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(candidate.availability)}`}>
                    {candidate.availability}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Active {candidate.lastActive}</span>
                </div>
                
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    {candidate.clearance}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {candidate.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {candidate.experience}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                        +{candidate.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 mt-3 text-xs">
                  {Object.entries(candidate.matchReasons).map(([reason, matches]) => (
                    <span key={reason} className={`flex items-center gap-1 ${matches ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
                      {matches ? '✓' : '×'} {reason}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="relative h-16 w-16">
                    <svg className="h-16 w-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${candidate.matchScore * 1.76} 176`}
                        className="text-primary-600"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{candidate.matchScore}%</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Found {matchedCandidates.filter(c => c.matchScore >= filters.minMatch).length} candidates matching your criteria
        </p>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          Export Results →
        </button>
      </div>
    </div>
  )
}