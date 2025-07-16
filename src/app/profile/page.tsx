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
    { level: 'self', label: 'Self-Reported', description: 'Basic information provided', badge: 'Bronze', color: 'text-amber-600 bg-amber-100' },
    { level: 'document', label: 'Document Uploaded', description: 'SF86 or clearance certificate', badge: 'Silver', color: 'text-gray-600 bg-gray-100' },
    { level: 'employer', label: 'Employer Verified', description: 'Confirmed by previous employer', badge: 'Gold', color: 'text-yellow-600 bg-yellow-100' },
    { level: 'government', label: 'Government Verified', description: 'Official verification', badge: 'Platinum', color: 'text-purple-600 bg-purple-100' },
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                <p className="text-gray-600">{profileData.clearance.level} • {profileData.location}</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Edit className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 border-b">
          {['overview', 'clearance', 'documents', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-4 px-2 font-medium capitalize transition ${
                activeTab === tab
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">Profile Summary</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="font-medium">{profileData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <p className="font-medium">{profileData.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Location</label>
                    <p className="font-medium">{profileData.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Experience</label>
                    <p className="font-medium">{profileData.experience}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Education</label>
                    <p className="font-medium">{profileData.education}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                  <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-gray-400">
                    + Add Skill
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">Profile Statistics</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">Profile Views</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{profileData.profileViews}</p>
                      <p className="text-sm text-green-600">+15% this week</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">Applications</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{profileData.applicationsSent}</p>
                      <p className="text-sm text-gray-600">3 in review</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">Job Matches</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{profileData.matchingJobs}</p>
                      <p className="text-sm text-gray-600">New daily</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
                <h3 className="font-semibold mb-2">Go Premium</h3>
                <p className="text-sm opacity-90 mb-4">
                  Get unlimited applications, priority matching, and direct employer contact.
                </p>
                <button className="bg-white text-primary-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clearance' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Clearance Information</h2>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      verificationLevels.find(v => v.level === currentVerification)?.color
                    }`}>
                      {verificationLevels.find(v => v.level === currentVerification)?.badge} Verified
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Clearance Level</label>
                    <p className="font-medium text-lg">{profileData.clearance.level}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Status</label>
                    <p className="font-medium text-lg flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {profileData.clearance.status}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Polygraph Type</label>
                    <p className="font-medium">{profileData.clearance.polygraph}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Polygraph Date</label>
                    <p className="font-medium">{profileData.clearance.polygraphDate}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Adjudication Date</label>
                    <p className="font-medium">{profileData.clearance.adjudicationDate}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Expiration Date</label>
                    <p className="font-medium flex items-center gap-2">
                      {profileData.clearance.expirationDate}
                      <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                        3 years remaining
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Sponsoring Agency</label>
                    <p className="font-medium">{profileData.clearance.sponsoringAgency}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Investigation Type</label>
                    <p className="font-medium">{profileData.clearance.investigationType}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-blue-900 font-medium">Keep your clearance information updated</p>
                    <p className="text-blue-700">
                      Accurate clearance data helps match you with the right opportunities and speeds up the application process.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold mb-4">Verification Status</h3>
                <div className="space-y-3">
                  {verificationLevels.map((level, index) => (
                    <div key={level.level} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        verificationLevels.findIndex(v => v.level === currentVerification) >= index
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {verificationLevels.findIndex(v => v.level === currentVerification) >= index ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{level.label}</p>
                        <p className="text-xs text-gray-600">{level.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition text-sm">
                  Upgrade Verification
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-lg font-semibold mb-6">Documents</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drop files here or click to upload</p>
              <p className="text-sm text-gray-500">Upload SF86, clearance certificates, or other verification documents</p>
              <button className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">
                Select Files
              </button>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <p className="text-gray-600">Your recent profile activity will appear here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}