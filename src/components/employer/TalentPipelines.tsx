'use client'

import { useState } from 'react'
import { Folder, Plus, Users, Search, Filter, Star, MoreVertical, ChevronRight, Trash2, Edit2 } from 'lucide-react'

interface Pipeline {
  id: string
  name: string
  description: string
  candidateCount: number
  clearanceFilter?: string
  skillsFilter?: string[]
  locationFilter?: string
  createdAt: string
  lastUpdated: string
  color: string
}

interface PipelineCandidate {
  id: string
  name: string
  clearance: string
  skills: string[]
  location: string
  addedAt: string
}

export default function TalentPipelines() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: '1',
      name: 'TS/SCI Network Engineers',
      description: 'Senior network engineers with active TS/SCI for DC metro area',
      candidateCount: 24,
      clearanceFilter: 'TS/SCI',
      skillsFilter: ['CCNA', 'CCNP', 'Network Security'],
      locationFilter: 'DC Metro',
      createdAt: '2024-01-01',
      lastUpdated: '2024-01-20',
      color: 'bg-purple-600'
    },
    {
      id: '2',
      name: 'Cloud Architects - Colorado',
      description: 'AWS/Azure certified architects for Colorado Springs projects',
      candidateCount: 18,
      clearanceFilter: 'Secret',
      skillsFilter: ['AWS', 'Azure', 'Terraform'],
      locationFilter: 'Colorado',
      createdAt: '2024-01-05',
      lastUpdated: '2024-01-19',
      color: 'bg-blue-600'
    },
    {
      id: '3',
      name: 'Cyber Analysts - Poly Required',
      description: 'Cybersecurity professionals with polygraph clearance',
      candidateCount: 31,
      clearanceFilter: 'TS/SCI + Poly',
      skillsFilter: ['CISSP', 'Security+', 'Incident Response'],
      locationFilter: 'Fort Meade, MD',
      createdAt: '2023-12-15',
      lastUpdated: '2024-01-18',
      color: 'bg-red-600'
    },
    {
      id: '4',
      name: 'Junior Developers - Entry Level',
      description: 'Recent grads and junior devs with security clearance eligibility',
      candidateCount: 42,
      clearanceFilter: 'Secret',
      skillsFilter: ['Python', 'JavaScript', 'React'],
      locationFilter: 'Remote',
      createdAt: '2023-12-20',
      lastUpdated: '2024-01-17',
      color: 'bg-green-600'
    }
  ])

  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [newPipeline, setNewPipeline] = useState({
    name: '',
    description: '',
    clearanceFilter: '',
    locationFilter: ''
  })

  const sampleCandidates: PipelineCandidate[] = [
    {
      id: '1',
      name: 'Michael Chen',
      clearance: 'TS/SCI',
      skills: ['CCNP', 'Python', 'AWS'],
      location: 'Arlington, VA',
      addedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      clearance: 'TS/SCI + CI Poly',
      skills: ['Network Security', 'Firewall Management', 'CISSP'],
      location: 'Alexandria, VA',
      addedAt: '2024-01-14'
    },
    {
      id: '3',
      name: 'David Park',
      clearance: 'TS/SCI',
      skills: ['CCNA', 'Linux', 'VMware'],
      location: 'Reston, VA',
      addedAt: '2024-01-12'
    }
  ]

  const colors = [
    'bg-purple-600',
    'bg-blue-600',
    'bg-red-600',
    'bg-green-600',
    'bg-yellow-600',
    'bg-indigo-600',
    'bg-pink-600',
    'bg-gray-600'
  ]

  const handleCreatePipeline = () => {
    if (!newPipeline.name.trim()) return

    const pipeline: Pipeline = {
      id: Date.now().toString(),
      name: newPipeline.name,
      description: newPipeline.description,
      candidateCount: 0,
      clearanceFilter: newPipeline.clearanceFilter,
      locationFilter: newPipeline.locationFilter,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      color: colors[pipelines.length % colors.length]
    }

    setPipelines([...pipelines, pipeline])
    setNewPipeline({ name: '', description: '', clearanceFilter: '', locationFilter: '' })
    setShowCreateForm(false)
  }

  const filteredPipelines = pipelines.filter(pipeline =>
    pipeline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pipeline.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Folder className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Talent Pipelines</h2>
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Plus className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search pipelines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {showCreateForm && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Pipeline name..."
                  value={newPipeline.name}
                  onChange={(e) => setNewPipeline({ ...newPipeline, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <textarea
                  placeholder="Description..."
                  value={newPipeline.description}
                  onChange={(e) => setNewPipeline({ ...newPipeline, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                  rows={2}
                />
                <div className="flex gap-2">
                  <select
                    value={newPipeline.clearanceFilter}
                    onChange={(e) => setNewPipeline({ ...newPipeline, clearanceFilter: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
                  >
                    <option value="">All Clearances</option>
                    <option value="Secret">Secret</option>
                    <option value="TS">Top Secret</option>
                    <option value="TS/SCI">TS/SCI</option>
                    <option value="TS/SCI + Poly">TS/SCI + Poly</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Location..."
                    value={newPipeline.locationFilter}
                    onChange={(e) => setNewPipeline({ ...newPipeline, locationFilter: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCreatePipeline}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm"
                  >
                    Create Pipeline
                  </button>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPipelines.map((pipeline) => (
              <div
                key={pipeline.id}
                onClick={() => setSelectedPipeline(pipeline)}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition ${
                  selectedPipeline?.id === pipeline.id ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${pipeline.color}`}></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{pipeline.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{pipeline.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {pipeline.candidateCount} candidates
                        </span>
                        {pipeline.clearanceFilter && (
                          <span>{pipeline.clearanceFilter}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle pipeline options
                    }}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        {selectedPipeline ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{selectedPipeline.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedPipeline.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Edit2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedPipeline.clearanceFilter && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                    {selectedPipeline.clearanceFilter}
                  </span>
                )}
                {selectedPipeline.locationFilter && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                    {selectedPipeline.locationFilter}
                  </span>
                )}
                {selectedPipeline.skillsFilter?.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {sampleCandidates.map((candidate) => (
                <div key={candidate.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">{candidate.name}</h3>
                        <span className="clearance-badge topsecret text-xs">{candidate.clearance}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{candidate.location}</span>
                        <span>•</span>
                        <span>Added {new Date(candidate.addedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {candidate.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full px-4 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition text-sm text-gray-600 dark:text-gray-400">
                + Add Candidates to Pipeline
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Select a pipeline to view candidates</p>
          </div>
        )}
      </div>
    </div>
  )
}