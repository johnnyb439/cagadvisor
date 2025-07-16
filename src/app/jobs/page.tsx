'use client'

import { useState } from 'react'
import { Search, MapPin, DollarSign, Clock, Filter, Briefcase } from 'lucide-react'

interface Job {
  id: string
  title: string
  company: string
  location: string
  clearance: string
  salary: string
  type: string
  posted: string
  description: string
  skills: string[]
  matchScore?: number
}

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClearance, setSelectedClearance] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Lockheed Martin',
      location: 'Bethesda, MD',
      clearance: 'TS/SCI',
      salary: '$140k - $180k',
      type: 'Full-time',
      posted: '2 days ago',
      description: 'Lead development of mission-critical systems supporting national security initiatives. Work with cutting-edge technologies in a collaborative environment.',
      skills: ['Java', 'Python', 'AWS', 'Kubernetes'],
      matchScore: 95,
    },
    {
      id: '2',
      title: 'Cybersecurity Analyst',
      company: 'Booz Allen Hamilton',
      location: 'McLean, VA',
      clearance: 'Secret',
      salary: '$120k - $150k',
      type: 'Full-time',
      posted: '3 days ago',
      description: 'Protect critical infrastructure and data assets. Conduct security assessments, implement controls, and respond to incidents.',
      skills: ['SIEM', 'Incident Response', 'Network Security', 'Python'],
      matchScore: 87,
    },
    {
      id: '3',
      title: 'Cloud Solutions Architect',
      company: 'Amazon Web Services',
      location: 'Arlington, VA',
      clearance: 'Top Secret',
      salary: '$160k - $200k',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Design and implement secure cloud solutions for government clients. AWS certifications preferred.',
      skills: ['AWS', 'Terraform', 'Docker', 'CI/CD'],
      matchScore: 91,
    },
    {
      id: '4',
      title: 'Data Scientist',
      company: 'Palantir Technologies',
      location: 'Washington, DC',
      clearance: 'TS/SCI + Poly',
      salary: '$150k - $190k',
      type: 'Full-time',
      posted: '4 days ago',
      description: 'Apply machine learning and analytics to solve complex national security challenges.',
      skills: ['Python', 'R', 'Machine Learning', 'SQL'],
      matchScore: 89,
    },
    {
      id: '5',
      title: 'Systems Administrator',
      company: 'SAIC',
      location: 'Colorado Springs, CO',
      clearance: 'Secret',
      salary: '$90k - $120k',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Maintain and optimize critical IT infrastructure for defense applications.',
      skills: ['Linux', 'Windows Server', 'VMware', 'Networking'],
      matchScore: 82,
    },
  ]

  const getClearanceBadgeClass = (clearance: string) => {
    if (clearance.includes('Poly')) return 'clearance-badge sci'
    if (clearance.includes('SCI')) return 'clearance-badge sci'
    if (clearance.includes('Top Secret')) return 'clearance-badge topsecret'
    if (clearance === 'Secret') return 'clearance-badge secret'
    return 'clearance-badge public'
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesClearance = selectedClearance === 'all' || job.clearance.includes(selectedClearance)
    const matchesLocation = selectedLocation === 'all' || job.location.includes(selectedLocation)
    
    return matchesSearch && matchesClearance && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find Your Next Mission</h1>
          <p className="text-xl opacity-90">Discover opportunities that match your clearance and expertise</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, company, or skills..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={selectedClearance}
              onChange={(e) => setSelectedClearance(e.target.value)}
            >
              <option value="all">All Clearance Levels</option>
              <option value="Public Trust">Public Trust</option>
              <option value="Secret">Secret</option>
              <option value="Top Secret">Top Secret</option>
              <option value="TS/SCI">TS/SCI</option>
              <option value="Poly">With Polygraph</option>
            </select>
            
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="Washington, DC">Washington, DC</option>
              <option value="VA">Northern Virginia</option>
              <option value="MD">Maryland</option>
              <option value="Colorado Springs">Colorado Springs</option>
              <option value="San Antonio">San Antonio</option>
            </select>
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
            <button className="flex items-center gap-2 hover:text-primary-600">
              <Filter className="h-4 w-4" />
              More Filters
            </button>
            <span className="text-gray-400">|</span>
            <span>{filteredJobs.length} jobs found</span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Briefcase className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-700 font-medium">{job.company}</p>
                    </div>
                    <span className={getClearanceBadgeClass(job.clearance)}>
                      {job.clearance}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {job.matchScore && (
                    <div className="text-right mb-2">
                      <p className="text-2xl font-bold text-primary-600">{job.matchScore}%</p>
                      <p className="text-sm text-gray-600">match</p>
                    </div>
                  )}
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition whitespace-nowrap">
                    One-Click Apply
                  </button>
                  <button className="text-primary-600 hover:text-primary-700 text-sm">
                    Save Job
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <p className="text-gray-600">No jobs found matching your criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}