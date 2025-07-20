'use client'

import { useState } from 'react'
import { Plus, Users, Briefcase, Clock, TrendingUp, ChevronRight, MoreVertical, Eye } from 'lucide-react'

interface Candidate {
  id: string
  name: string
  clearance: string
  experience: string
  matchScore: number
  appliedDate: string
  status: 'new' | 'reviewing' | 'interview' | 'offer' | 'rejected'
}

interface JobPosting {
  id: string
  title: string
  applicants: number
  new: number
  posted: string
  status: 'active' | 'paused' | 'closed'
}

export default function EmployerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'candidates' | 'analytics'>('overview')

  const stats = {
    activeJobs: 12,
    totalApplications: 248,
    newThisWeek: 37,
    avgTimeToHire: 14,
  }

  const recentCandidates: Candidate[] = [
    { id: '1', name: 'Sarah Johnson', clearance: 'TS/SCI', experience: '8 years', matchScore: 95, appliedDate: '2 hours ago', status: 'new' },
    { id: '2', name: 'Michael Chen', clearance: 'Secret', experience: '5 years', matchScore: 87, appliedDate: '5 hours ago', status: 'new' },
    { id: '3', name: 'Emily Davis', clearance: 'TS/SCI + Poly', experience: '10 years', matchScore: 98, appliedDate: '1 day ago', status: 'reviewing' },
    { id: '4', name: 'Robert Martinez', clearance: 'Top Secret', experience: '6 years', matchScore: 91, appliedDate: '2 days ago', status: 'interview' },
  ]

  const jobPostings: JobPosting[] = [
    { id: '1', title: 'Senior Software Engineer', applicants: 42, new: 8, posted: '2 weeks ago', status: 'active' },
    { id: '2', title: 'Cybersecurity Analyst', applicants: 31, new: 5, posted: '3 weeks ago', status: 'active' },
    { id: '3', title: 'Cloud Solutions Architect', applicants: 28, new: 3, posted: '1 month ago', status: 'active' },
    { id: '4', title: 'Data Scientist', applicants: 19, new: 0, posted: '1 month ago', status: 'paused' },
  ]

  const getClearanceBadgeClass = (clearance: string) => {
    if (clearance.includes('Poly')) return 'clearance-badge sci'
    if (clearance.includes('SCI')) return 'clearance-badge sci'
    if (clearance.includes('Top Secret')) return 'clearance-badge topsecret'
    if (clearance === 'Secret') return 'clearance-badge secret'
    return 'clearance-badge public'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
      case 'reviewing': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
      case 'interview': return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300'
      case 'offer': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
      case 'rejected': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Employer Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Welcome back, Lockheed Martin</p>
            </div>
            <button className="bg-primary-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center gap-2 text-sm sm:text-base">
              <Plus className="h-4 sm:h-5 w-4 sm:w-5" />
              Post New Job
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <Briefcase className="h-6 sm:h-8 w-6 sm:w-8 text-primary-600" />
              <span className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">+8.3%</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.activeJobs}</p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Active Jobs</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <Users className="h-6 sm:h-8 w-6 sm:w-8 text-primary-600" />
              <span className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">+15.2%</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalApplications}</p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Total Applications</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <TrendingUp className="h-6 sm:h-8 w-6 sm:w-8 text-primary-600" />
              <span className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">New</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.newThisWeek}</p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">New This Week</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <Clock className="h-6 sm:h-8 w-6 sm:w-8 text-primary-600" />
              <span className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">-2 days</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.avgTimeToHire} days</p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Avg. Time to Hire</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Candidates</h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentCandidates.map((candidate) => (
                  <div key={candidate.id} className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{candidate.name}</h3>
                          <span className={getClearanceBadgeClass(candidate.clearance)}>
                            {candidate.clearance}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                            {candidate.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <span>{candidate.experience} experience</span>
                          <span className="hidden sm:inline">•</span>
                          <span>Applied {candidate.appliedDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="text-center">
                          <p className="text-xl sm:text-2xl font-bold text-primary-600">{candidate.matchScore}%</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">match</p>
                        </div>
                        <button className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                          <ChevronRight className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400 dark:text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View All Candidates →
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">Active Job Postings</h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {jobPostings.map((job) => (
                  <div key={job.id} className="p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">{job.title}</h3>
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <MoreVertical className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <span>{job.applicants} applicants</span>
                      {job.new > 0 && (
                        <span className="text-primary-600 font-medium">+{job.new} new</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-500">Posted {job.posted}</span>
                      <button className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Manage All Jobs →
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-4 sm:p-6 mt-4 sm:mt-6 text-white">
              <h3 className="font-semibold mb-2 text-base sm:text-lg">Upgrade to Pro</h3>
              <p className="text-xs sm:text-sm opacity-90 mb-3 sm:mb-4">
                Get advanced analytics, unlimited job posts, and priority support.
              </p>
              <button className="bg-white text-primary-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-100 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}