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
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'reviewing': return 'bg-yellow-100 text-yellow-800'
      case 'interview': return 'bg-purple-100 text-purple-800'
      case 'offer': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
              <p className="text-gray-600">Welcome back, Lockheed Martin</p>
            </div>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Post New Job
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="h-8 w-8 text-primary-600" />
              <span className="text-sm text-green-600 font-medium">+8.3%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
            <p className="text-gray-600">Active Jobs</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-primary-600" />
              <span className="text-sm text-green-600 font-medium">+15.2%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
            <p className="text-gray-600">Total Applications</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-primary-600" />
              <span className="text-sm text-green-600 font-medium">New</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.newThisWeek}</p>
            <p className="text-gray-600">New This Week</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-primary-600" />
              <span className="text-sm text-red-600 font-medium">-2 days</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.avgTimeToHire} days</p>
            <p className="text-gray-600">Avg. Time to Hire</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Recent Candidates</h2>
              </div>
              <div className="divide-y">
                {recentCandidates.map((candidate) => (
                  <div key={candidate.id} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                          <span className={getClearanceBadgeClass(candidate.clearance)}>
                            {candidate.clearance}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                            {candidate.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{candidate.experience} experience</span>
                          <span>•</span>
                          <span>Applied {candidate.appliedDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary-600">{candidate.matchScore}%</p>
                          <p className="text-xs text-gray-600">match</p>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View All Candidates →
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Active Job Postings</h2>
              </div>
              <div className="divide-y">
                {jobPostings.map((job) => (
                  <div key={job.id} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{job.applicants} applicants</span>
                      {job.new > 0 && (
                        <span className="text-primary-600 font-medium">+{job.new} new</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">Posted {job.posted}</span>
                      <button className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Manage All Jobs →
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 mt-6 text-white">
              <h3 className="font-semibold mb-2">Upgrade to Pro</h3>
              <p className="text-sm opacity-90 mb-4">
                Get advanced analytics, unlimited job posts, and priority support.
              </p>
              <button className="bg-white text-primary-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}