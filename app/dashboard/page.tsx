'use client'

import { useEffect, useState } from 'react'
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
import { useRouter } from 'next/navigation'
// Removed NextAuth
import Analytics from '@/components/dashboard/Analytics'
import GoalTracking from '@/components/dashboard/GoalTracking'
import PersonalizedRecommendations from '@/components/dashboard/PersonalizedRecommendations'
import DraggableQuickActions from '@/components/dashboard/DraggableQuickActions'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showAllActivities, setShowAllActivities] = useState(false)

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      const userData = JSON.parse(currentUser)
      // Redirect company users to company dashboard
      if (userData.isCompany) {
        router.push('/dashboard/company')
        return
      }
      setUser(userData)
    } else {
      router.push('/login')
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    router.push('/login')
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-ops-charcoal py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dynamic-green"></div>
      </div>
    )
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

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-ops-charcoal py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-command-black rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-montserrat font-bold mb-1">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Clearance Level: <span className="text-dynamic-green font-semibold">{user?.clearanceLevel || 'Not specified'}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <LogOut size={20} className="mr-2" />
              Log Out
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white dark:bg-command-black rounded-lg shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon size={24} className={stat.color} />
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white dark:bg-command-black rounded-lg shadow-md p-2 mb-8"
        >
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'goals', label: 'Goals' },
              { id: 'recommendations', label: 'Recommendations' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-dynamic-green text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions - Draggable */}
            <DraggableQuickActions />

            {/* Activity Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white dark:bg-command-black rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-montserrat font-bold">Activity Timeline</h2>
                <button
                  onClick={() => setShowAllActivities(!showAllActivities)}
                  className="text-sm text-dynamic-green hover:text-emerald-green transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="space-y-6 relative">
                {/* Vertical line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                
                {activities.slice(0, showAllActivities ? activities.length : 4).map((activity, index) => (
                  <div key={index} className="flex items-start relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      activity.status === 'pending' ? 'bg-orange-100 dark:bg-orange-900/20' :
                      activity.status === 'completed' ? 'bg-green-100 dark:bg-green-900/20' :
                      'bg-blue-100 dark:bg-blue-900/20'
                    }`}>
                      <activity.icon size={20} className={
                        activity.status === 'pending' ? 'text-orange-500' :
                        activity.status === 'completed' ? 'text-dynamic-green' :
                        'text-dynamic-blue'
                      } />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-gray-800 dark:text-gray-200 font-semibold">{activity.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activity.subtitle}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 flex items-center">
                            <Calendar size={12} className="mr-1" />
                            {activity.time}
                          </p>
                        </div>
                        {activity.status && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            activity.status === 'pending' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                            activity.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                            'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                          }`}>
                            {activity.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Job Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white dark:bg-command-black rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-montserrat font-bold mb-6">Job Matches</h2>
              <div className="space-y-4">
                {recommendedJobs.map((job, index) => (
                  <Link
                    key={index}
                    href="/jobs"
                    className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{job.title}</h3>
                      <span className="text-sm text-dynamic-green font-semibold">{job.match}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{job.company}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Requires: {job.clearance}</p>
                  </Link>
                ))}
              </div>
              <Link
                href="/jobs"
                className="mt-4 flex items-center text-dynamic-green hover:text-emerald-green transition-colors"
              >
                View all matches
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white dark:bg-command-black rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-montserrat font-bold mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="text-dynamic-blue mr-3 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Virtual Career Fair</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">March 15, 2025 • 2:00 PM EST</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="text-dynamic-blue mr-3 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Resume Workshop</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">March 20, 2025 • 6:00 PM EST</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-r from-dynamic-green to-dynamic-blue rounded-lg p-6 text-white"
            >
              <div className="flex items-center mb-4">
                <Bell size={24} className="mr-3" />
                <h3 className="font-semibold">Job Alerts Active</h3>
              </div>
              <p className="text-sm mb-4">
                You're receiving alerts for Network Admin and Cloud Engineer positions.
              </p>
              <button className="text-sm underline hover:no-underline">
                Manage Preferences
              </button>
            </motion.div>
          </div>
        </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <Analytics />
        )}

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <GoalTracking />
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <PersonalizedRecommendations />
        )}
      </div>
    </section>
  )
}