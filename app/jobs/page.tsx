'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Shield, DollarSign, Filter, ChevronRight, Layers } from 'lucide-react'
import Link from 'next/link'
import BinaryBackground from '@/components/BinaryBackground'
import SwipeableJobCards from '@/components/SwipeableJobCards'

// Sample job data - in production this would come from a database
const sampleJobs = [
  {
    id: 1,
    title: "Network Administrator",
    company: "TechCorp Defense",
    location: "Arlington, VA",
    clearance: "SECRET",
    salary: "$85,000 - $105,000",
    type: "Full-time",
    posted: "2 days ago",
    description: "Seeking experienced Network Admin for DoD contract. Must have active SECRET clearance."
  },
  {
    id: 2,
    title: "Help Desk Technician",
    company: "CyberShield Solutions",
    location: "Fort Meade, MD",
    clearance: "SECRET",
    salary: "$55,000 - $70,000",
    type: "Full-time",
    posted: "3 days ago",
    description: "Entry-level IT support position. Security+ preferred. Active clearance required."
  },
  {
    id: 3,
    title: "Systems Administrator",
    company: "Federal Systems Inc",
    location: "Remote",
    clearance: "TS/SCI",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    posted: "1 week ago",
    description: "Senior sys admin role supporting intelligence community. Polygraph required."
  },
  {
    id: 4,
    title: "Cloud Engineer",
    company: "AWS Federal",
    location: "Herndon, VA",
    clearance: "SECRET",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    posted: "4 days ago",
    description: "AWS cloud engineer supporting federal clients. Experience with GovCloud required."
  },
  {
    id: 5,
    title: "Cybersecurity Analyst",
    company: "DefenseNet Corp",
    location: "Colorado Springs, CO",
    clearance: "TS",
    salary: "$95,000 - $125,000",
    type: "Full-time",
    posted: "1 day ago",
    description: "SOC analyst position supporting Space Force operations. CISSP preferred."
  }
]

export default function JobsPage() {
  const [jobs, setJobs] = useState(sampleJobs)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [clearanceFilter, setClearanceFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'swipe'>('list')

  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesClearance = !clearanceFilter || job.clearance === clearanceFilter
    
    return matchesSearch && matchesLocation && matchesClearance
  })

  return (
    <section className="relative min-h-screen bg-gray-50 dark:bg-ops-charcoal py-20">
      <BinaryBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
            Cleared IT <span className="gradient-text">Job Board</span>
          </h1>
          <p className="text-xl text-intel-gray">
            Exclusive opportunities for security cleared professionals
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white dark:bg-command-black rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-dynamic-green dark:focus:border-dynamic-green"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-dynamic-green dark:focus:border-dynamic-green"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center"
            >
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Clearance Level</label>
                  <select
                    value={clearanceFilter}
                    onChange={(e) => setClearanceFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-dynamic-green dark:focus:border-dynamic-green"
                  >
                    <option value="">All Clearances</option>
                    <option value="PUBLIC">Public Trust</option>
                    <option value="SECRET">SECRET</option>
                    <option value="TS">TOP SECRET</option>
                    <option value="TS/SCI">TS/SCI</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count and View Toggle */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold">{filteredJobs.length}</span> cleared positions
          </p>
          
          {/* Mobile View Toggle */}
          <div className="flex md:hidden bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md transition-all min-w-[80px] ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('swipe')}
              className={`px-4 py-2 rounded-md transition-all min-w-[80px] ${
                viewMode === 'swipe' 
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Swipe
            </button>
          </div>
        </div>

        {/* Conditional Rendering based on View Mode */}
        {viewMode === 'swipe' && (
          <div className="block md:hidden">
            <SwipeableJobCards />
          </div>
        )}
        
        {/* Job Listings - Show on desktop always, on mobile only in list mode */}
        <div className={`space-y-4 ${viewMode === 'swipe' ? 'hidden md:block' : 'block'}`}>
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-command-black rounded-lg shadow-md p-6 hover-lift cursor-pointer"
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-montserrat font-semibold mb-2">
                    <Link href={`/jobs/${job.id}`} className="hover:text-dynamic-green transition-colors">
                      {job.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{job.company}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin size={16} className="mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-dynamic-green font-semibold">
                      <Shield size={16} className="mr-1" />
                      {job.clearance}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <DollarSign size={16} className="mr-1" />
                      {job.salary}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-between items-end">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mb-4">{job.posted}</span>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="btn-primary flex items-center text-sm"
                  >
                    View Details
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400 mb-4">No jobs found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setLocationFilter('')
                setClearanceFilter('')
              }}
              className="text-dynamic-green hover:text-emerald-green transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* Job Alerts CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-dynamic-green to-dynamic-blue rounded-lg p-8 text-white text-center"
        >
          <h2 className="text-2xl font-montserrat font-bold mb-4">
            Don't Miss Out on New Opportunities
          </h2>
          <p className="mb-6">
            Get notified when new cleared positions matching your skills are posted
          </p>
          <Link href="/contact" className="btn-primary bg-white dark:bg-gray-800 text-command-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            Set Up Job Alerts
          </Link>
        </motion.div>
      </div>
    </section>
  )
}