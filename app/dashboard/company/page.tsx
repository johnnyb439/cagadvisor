'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, Briefcase, Users, TrendingUp, Plus, Search, 
  Eye, MessageSquare, Calendar, Filter, BarChart3, 
  DollarSign, Clock, UserCheck, FileText, Star
} from 'lucide-react'
import Link from 'next/link'
import BinaryBackground from '@/components/BinaryBackground'

export default function CompanyDashboard() {
  const [companyData, setCompanyData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Get company data from localStorage
    const data = localStorage.getItem('company')
    if (data) {
      setCompanyData(JSON.parse(data))
    }
  }, [])

  // Mock data for demonstration
  const jobPostings = [
    {
      id: 1,
      title: 'Senior Network Engineer',
      clearance: 'TS/SCI',
      posted: '2 days ago',
      views: 245,
      applications: 12,
      status: 'active'
    },
    {
      id: 2,
      title: 'Cloud Architect',
      clearance: 'SECRET',
      posted: '1 week ago',
      views: 189,
      applications: 8,
      status: 'active'
    },
    {
      id: 3,
      title: 'Cybersecurity Analyst',
      clearance: 'TS',
      posted: '2 weeks ago',
      views: 412,
      applications: 23,
      status: 'closed'
    }
  ]

  const recentCandidates = [
    {
      id: 1,
      name: 'John D.',
      clearance: 'TS/SCI',
      experience: '8 years',
      skills: ['AWS', 'Python', 'DevOps'],
      matchScore: 95
    },
    {
      id: 2,
      name: 'Sarah M.',
      clearance: 'SECRET',
      experience: '5 years',
      skills: ['Network Security', 'CISSP'],
      matchScore: 88
    },
    {
      id: 3,
      name: 'Mike R.',
      clearance: 'TS',
      experience: '10 years',
      skills: ['Cloud Architecture', 'Kubernetes'],
      matchScore: 92
    }
  ]

  const stats = {
    activeJobs: 2,
    totalApplications: 43,
    avgTimeToHire: 21,
    candidateResponse: 78
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-ops-charcoal py-20">
      <BinaryBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-montserrat font-bold text-gray-900 dark:text-white mb-2">
                Company Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {companyData?.companyName || 'Company'}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-4">
              <Link href="/dashboard/company/post-job" className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Link>
              <button className="btn-secondary">
                <Search className="w-4 h-4 mr-2" />
                Search Candidates
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.activeJobs}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Active Jobs</p>
            <p className="text-sm text-green-500 mt-2">+2 this month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalApplications}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Total Applications</p>
            <p className="text-sm text-green-500 mt-2">+15% vs last month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.avgTimeToHire} days
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Avg Time to Hire</p>
            <p className="text-sm text-blue-500 mt-2">-3 days improvement</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.candidateResponse}%
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Response Rate</p>
            <p className="text-sm text-green-500 mt-2">Above average</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md mb-6">
          <div className="border-b dark:border-gray-700">
            <div className="flex space-x-8 px-6">
              {['overview', 'jobs', 'candidates', 'messages'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 border-b-2 transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Recent Job Postings */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Your Job Postings
                  </h3>
                  <div className="space-y-4">
                    {jobPostings.map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {job.title}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span>{job.clearance}</span>
                            <span>•</span>
                            <span>{job.posted}</span>
                            <span>•</span>
                            <span className={job.status === 'active' ? 'text-green-500' : 'text-gray-500'}>
                              {job.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Eye className="w-4 h-4 mr-1" />
                              <span>{job.views}</span>
                            </div>
                            <p className="text-xs text-gray-500">views</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Users className="w-4 h-4 mr-1" />
                              <span>{job.applications}</span>
                            </div>
                            <p className="text-xs text-gray-500">applicants</p>
                          </div>
                          <button className="btn-secondary py-2 px-4 text-sm">
                            Manage
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Matched Candidates */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Top Matched Candidates
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recentCandidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {candidate.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {candidate.clearance} • {candidate.experience}
                            </p>
                          </div>
                          <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-sm">
                            <Star className="w-3 h-3 mr-1" />
                            {candidate.matchScore}%
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {candidate.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 text-sm btn-secondary py-2">
                            View Profile
                          </button>
                          <button className="flex-1 text-sm btn-primary py-2">
                            Message
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Manage Job Postings
                  </h3>
                  <button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Detailed job management interface coming soon...
                </p>
              </div>
            )}

            {/* Candidates Tab */}
            {activeTab === 'candidates' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Candidate Pipeline
                  </h3>
                  <button className="btn-secondary">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced candidate search and filtering coming soon...
                </p>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Messages
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Direct messaging with candidates coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}