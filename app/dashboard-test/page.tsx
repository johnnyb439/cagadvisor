'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Briefcase, 
  Award, 
  FileText, 
  Target, 
  Calendar,
  Bell,
  LogOut,
  ChevronRight,
  BookOpen,
  MessageSquare,
  FolderOpen
} from 'lucide-react'
import Link from 'next/link'
import Analytics from '@/components/dashboard/Analytics'
import GoalTracking from '@/components/dashboard/GoalTracking'
import PersonalizedRecommendations from '@/components/dashboard/PersonalizedRecommendations'
import DraggableQuickActions from '@/components/dashboard/DraggableQuickActions'

export default function DashboardTestPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAllActivities, setShowAllActivities] = useState(false)

  // Mock user data for testing
  const mockUser = {
    name: 'Test User',
    email: 'test@test.com',
    clearanceLevel: 'SECRET'
  }

  const stats = [
    { label: 'Profile Completion', value: '75%', icon: User, color: 'text-dynamic-green', href: '/profile' },
    { label: 'Jobs Applied', value: '12', icon: Briefcase, color: 'text-dynamic-blue', href: '/dashboard/applications' },
    { label: 'Certifications', value: '3', icon: Award, color: 'text-emerald-green', href: '/dashboard/certifications' },
    { label: 'Mock Interviews', value: '5', icon: Target, color: 'text-sky-blue', href: '/mock-interview' }
  ]

  const activities = [
    { 
      type: 'application', 
      title: 'Applied to Network Administrator at TechCorp', 
      subtitle: 'Application submitted and under review',
      time: '2 hours ago',
      status: 'pending',
      icon: Briefcase
    },
    { 
      type: 'interview', 
      title: 'Completed mock interview for Systems Admin', 
      subtitle: 'Score: 85/100 - Great performance!',
      time: '1 day ago',
      status: 'completed',
      icon: Target
    },
    { 
      type: 'goal', 
      title: 'Goal Achieved: Complete 5 Mock Interviews', 
      subtitle: "You've improved your interview skills significantly",
      time: '2 days ago',
      status: 'completed',
      icon: Target
    },
    { 
      type: 'certification', 
      title: 'Added Security+ certification', 
      subtitle: 'Certification verified and added to profile',
      time: '3 days ago',
      status: 'completed',
      icon: Award
    }
  ]

  const recommendedJobs = [
    { title: 'Cloud Engineer', company: 'AWS Federal', clearance: 'SECRET', match: '92%' },
    { title: 'DevOps Engineer', company: 'Federal Cloud Systems', clearance: 'SECRET', match: '88%' },
    { title: 'Network Security Engineer', company: 'Secure Federal Networks', clearance: 'TS', match: '85%' }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'analytics', label: 'Analytics', icon: Target },
    { id: 'goals', label: 'Goals', icon: Award },
    { id: 'recommendations', label: 'Recommendations', icon: BookOpen }
  ]

  const displayedActivities = showAllActivities ? activities : activities.slice(0, 2)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ops-charcoal">
      {/* Header */}
      <div className="bg-white dark:bg-command-black shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {mockUser.name}!
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Clearance Level: {mockUser.clearanceLevel}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell size={24} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <Link 
                href="/"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <LogOut size={18} className="mr-2" />
                Exit Dashboard Test
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-command-black shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-dynamic-green text-dynamic-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon size={18} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Link
                    href={stat.href}
                    className="block bg-white dark:bg-command-black rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon size={24} className={stat.color} />
                      <ChevronRight size={20} className="text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-2 bg-white dark:bg-command-black rounded-lg shadow-md p-6"
              >
                <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {displayedActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${
                        activity.status === 'completed' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'
                      }`}>
                        <activity.icon size={20} className={
                          activity.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                        } />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{activity.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activity.subtitle}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {activities.length > 2 && (
                  <button
                    onClick={() => setShowAllActivities(!showAllActivities)}
                    className="mt-4 text-dynamic-green hover:text-emerald-green text-sm font-medium"
                  >
                    {showAllActivities ? 'Show Less' : `Show ${activities.length - 2} More`}
                  </button>
                )}
              </motion.div>

              {/* Recommended Jobs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-white dark:bg-command-black rounded-lg shadow-md p-6"
              >
                <h2 className="text-lg font-semibold mb-6">Recommended Jobs</h2>
                <div className="space-y-4">
                  {recommendedJobs.map((job, index) => (
                    <Link 
                      key={index}
                      href="/jobs"
                      className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-dynamic-green transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">{job.title}</h3>
                        <span className="text-dynamic-green font-semibold text-sm">{job.match}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{job.company}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Required: {job.clearance}
                      </p>
                    </Link>
                  ))}
                  <Link
                    href="/jobs"
                    className="block text-center py-2 text-dynamic-green hover:text-emerald-green text-sm font-medium"
                  >
                    View All Jobs →
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <DraggableQuickActions />
          </div>
        )}

        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'goals' && <GoalTracking />}
        {activeTab === 'recommendations' && <PersonalizedRecommendations />}
      </div>
    </div>
  )
}