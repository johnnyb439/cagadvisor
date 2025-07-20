'use client'

import { useState } from 'react'
import { Shield, Award, Calendar, AlertCircle, Upload, Check, X, Edit, TrendingUp, Eye } from 'lucide-react'

interface VerificationLevel {
  level: 'self' | 'document' | 'employer' | 'government'
  label: string
  description: string
  badge: string
  color: string
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'clearance' | 'documents' | 'activity'>('overview')

  const verificationLevels: VerificationLevel[] = [
    { level: 'self', label: 'Self-Reported', description: 'Basic information provided', badge: 'Bronze', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
    { level: 'document', label: 'Document Uploaded', description: 'SF86 or clearance certificate', badge: 'Silver', color: 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300' },
    { level: 'employer', label: 'Employer Verified', description: 'Confirmed by previous employer', badge: 'Gold', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30' },
    { level: 'government', label: 'Government Verified', description: 'Official verification', badge: 'Platinum', color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' },
  ]

  const currentVerification = 'employer'

  const profileData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Arlington, VA',
    clearance: {
      level: 'Top Secret/SCI',
      status: 'Active',
      polygraph: 'CI Poly',
      polygraphDate: 'March 2023',
      adjudicationDate: 'March 2022',
      expirationDate: 'March 2027',
      sponsoringAgency: 'DOD',
      investigationType: 'T5R',
    },
    skills: ['Java', 'Python', 'AWS', 'Kubernetes', 'React', 'TypeScript'],
    experience: '8 years',
    education: 'B.S. Computer Science - Virginia Tech',
    profileViews: 127,
    applicationsSent: 8,
    matchingJobs: 24,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                JD
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{profileData.name}</h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{profileData.clearance.level} • {profileData.location}</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300">
              <Edit className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          {['overview', 'clearance', 'documents', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-4 px-2 font-medium capitalize transition ${
                activeTab === tab
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 dark:text-gray-100">Profile Summary</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Email</label>
                    <p className="font-medium dark:text-gray-200">{profileData.email}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Phone</label>
                    <p className="font-medium dark:text-gray-200">{profileData.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Location</label>
                    <p className="font-medium dark:text-gray-200">{profileData.location}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Experience</label>
                    <p className="font-medium dark:text-gray-200">{profileData.experience}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Education</label>
                    <p className="font-medium dark:text-gray-200">{profileData.education}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 dark:text-gray-100">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm">
                      {skill}
                    </span>
                  ))}
                  <button className="px-2 sm:px-3 py-1 border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-full text-xs sm:text-sm hover:border-gray-400 dark:hover:border-gray-500">
                    + Add Skill
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Profile Statistics</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">Profile Views</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profileData.profileViews}</p>
                      <p className="text-sm text-green-600 dark:text-green-400">+15% this week</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">Applications</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profileData.applicationsSent}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">3 in review</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">Job Matches</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profileData.matchingJobs}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">New daily</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
                <h3 className="font-semibold mb-2">Go Premium</h3>
                <p className="text-sm opacity-90 mb-4">
                  Get unlimited applications, priority matching, and direct employer contact.
                </p>
                <button className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clearance' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold dark:text-gray-100">Clearance Information</h2>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      verificationLevels.find(v => v.level === currentVerification)?.color
                    }`}>
                      {verificationLevels.find(v => v.level === currentVerification)?.badge} Verified
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Clearance Level</label>
                    <p className="font-medium text-lg dark:text-gray-200">{profileData.clearance.level}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Status</label>
                    <p className="font-medium text-lg flex items-center gap-2 dark:text-gray-200">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {profileData.clearance.status}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Polygraph Type</label>
                    <p className="font-medium dark:text-gray-200">{profileData.clearance.polygraph}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Polygraph Date</label>
                    <p className="font-medium dark:text-gray-200">{profileData.clearance.polygraphDate}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Adjudication Date</label>
                    <p className="font-medium dark:text-gray-200">{profileData.clearance.adjudicationDate}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Expiration Date</label>
                    <p className="font-medium flex items-center gap-2 dark:text-gray-200">
                      {profileData.clearance.expirationDate}
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">
                        3 years remaining
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Sponsoring Agency</label>
                    <p className="font-medium dark:text-gray-200">{profileData.clearance.sponsoringAgency}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Investigation Type</label>
                    <p className="font-medium dark:text-gray-200">{profileData.clearance.investigationType}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-blue-900 dark:text-blue-200 font-medium">Keep your clearance information updated</p>
                    <p className="text-blue-700 dark:text-blue-300">
                      Accurate clearance data helps match you with the right opportunities and speeds up the application process.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold mb-4 dark:text-gray-100">Verification Status</h3>
                <div className="space-y-3">
                  {verificationLevels.map((level, index) => (
                    <div key={level.level} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        verificationLevels.findIndex(v => v.level === currentVerification) >= index
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                      }`}>
                        {verificationLevels.findIndex(v => v.level === currentVerification) >= index ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm dark:text-gray-200">{level.label}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{level.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-primary-600 dark:bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition text-sm">
                  Upgrade Verification
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-lg font-semibold mb-6 dark:text-gray-100">Documents</h2>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
              <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">Drop files here or click to upload</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Upload SF86, clearance certificates, or other verification documents</p>
              <button className="mt-4 bg-primary-600 dark:bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition">
                Select Files
              </button>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-6 dark:text-gray-100">Recent Activity</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">Your recent profile activity will appear here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}