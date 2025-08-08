'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, Briefcase, Users, TrendingUp, Plus, Search, 
  Eye, MessageSquare, Calendar, Filter, BarChart3, 
  DollarSign, Clock, UserCheck, FileText, Star, ArrowUp,
  ArrowDown, Activity, Target, Zap, Award, Globe,
  PieChart, TrendingDown, AlertCircle, CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import BinaryBackground from '@/components/BinaryBackground'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RePieChart, 
  Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadialBarChart, RadialBar, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'

export default function CompanyDashboard() {
  const [companyData, setCompanyData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [animatedStats, setAnimatedStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    avgTimeToHire: 0,
    candidateResponse: 0
  })

  useEffect(() => {
    // Get company data from localStorage
    const data = localStorage.getItem('company')
    if (data) {
      setCompanyData(JSON.parse(data))
    }

    // Animate statistics
    const timer = setTimeout(() => {
      setAnimatedStats({
        activeJobs: 5,
        totalApplications: 43,
        avgTimeToHire: 21,
        candidateResponse: 78
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Chart Data
  const applicationTrends = [
    { month: 'Jan', applications: 65, hires: 8 },
    { month: 'Feb', applications: 78, hires: 12 },
    { month: 'Mar', applications: 90, hires: 15 },
    { month: 'Apr', applications: 81, hires: 10 },
    { month: 'May', applications: 56, hires: 7 },
    { month: 'Jun', applications: 85, hires: 14 },
    { month: 'Jul', applications: 93, hires: 16 }
  ]

  const clearanceDistribution = [
    { name: 'SECRET', value: 35, color: '#3B82F6' },
    { name: 'TS', value: 25, color: '#10B981' },
    { name: 'TS/SCI', value: 30, color: '#6366F1' },
    { name: 'Public Trust', value: 10, color: '#F59E0B' }
  ]

  const departmentData = [
    { name: 'Engineering', applications: 120, openings: 8 },
    { name: 'Cybersecurity', applications: 95, openings: 5 },
    { name: 'Cloud Ops', applications: 78, openings: 4 },
    { name: 'Data Science', applications: 65, openings: 3 },
    { name: 'DevOps', applications: 88, openings: 6 }
  ]

  const skillsRadar = [
    { skill: 'AWS', candidates: 86, required: 90 },
    { skill: 'Security+', candidates: 92, required: 85 },
    { skill: 'Python', candidates: 78, required: 80 },
    { skill: 'Kubernetes', candidates: 65, required: 70 },
    { skill: 'CISSP', candidates: 45, required: 60 },
    { skill: 'DevOps', candidates: 72, required: 75 }
  ]

  const performanceMetrics = [
    { name: 'Quality of Hire', value: 85, fill: '#10B981' },
    { name: 'Time to Fill', value: 72, fill: '#3B82F6' },
    { name: 'Cost per Hire', value: 68, fill: '#4F46E5' },
    { name: 'Retention Rate', value: 91, fill: '#F59E0B' }
  ]

  // Mock data for demonstration
  const jobPostings = [
    {
      id: 1,
      title: 'Senior Network Engineer',
      clearance: 'TS/SCI',
      posted: '2 days ago',
      views: 245,
      applications: 12,
      status: 'active',
      urgency: 'high',
      budget: '$130K-$160K'
    },
    {
      id: 2,
      title: 'Cloud Architect',
      clearance: 'SECRET',
      posted: '1 week ago',
      views: 189,
      applications: 8,
      status: 'active',
      urgency: 'medium',
      budget: '$140K-$180K'
    },
    {
      id: 3,
      title: 'Cybersecurity Analyst',
      clearance: 'TS',
      posted: '2 weeks ago',
      views: 412,
      applications: 23,
      status: 'interviewing',
      urgency: 'low',
      budget: '$95K-$120K'
    }
  ]

  const recentActivity = [
    { type: 'application', message: 'New application for Cloud Architect', time: '5 min ago', icon: FileText },
    { type: 'message', message: 'John D. sent a message', time: '1 hour ago', icon: MessageSquare },
    { type: 'milestone', message: 'Senior Network Engineer reached 10 applications', time: '2 hours ago', icon: Award },
    { type: 'interview', message: 'Interview scheduled with Sarah M.', time: '3 hours ago', icon: Calendar }
  ]

  const topCandidates = [
    {
      id: 1,
      name: 'John D.',
      clearance: 'TS/SCI',
      experience: '8 years',
      skills: ['AWS', 'Python', 'DevOps'],
      matchScore: 95,
      status: 'available',
      salary: '$145K'
    },
    {
      id: 2,
      name: 'Sarah M.',
      clearance: 'SECRET',
      experience: '5 years',
      skills: ['Network Security', 'CISSP'],
      matchScore: 88,
      status: 'interviewing',
      salary: '$115K'
    },
    {
      id: 3,
      name: 'Mike R.',
      clearance: 'TS',
      experience: '10 years',
      skills: ['Cloud Architecture', 'Kubernetes'],
      matchScore: 92,
      status: 'available',
      salary: '$165K'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500'
      case 'interviewing': return 'text-blue-500'
      case 'closed': return 'text-gray-500'
      default: return 'text-gray-500'
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-ops-charcoal dark:to-command-black py-20">
      <BinaryBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-slate-700 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-montserrat font-bold mb-2"
                >
                  Welcome back, {companyData?.companyName || 'TechCorp Defense'} 👋
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-blue-100"
                >
                  Your recruitment pipeline is performing 23% better than last month
                </motion.p>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 md:mt-0 flex gap-4"
              >
                <Link href="/dashboard/company/post-job" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Post New Job
                </Link>
                <button className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all transform hover:scale-105 border border-white/30">
                  <Search className="w-4 h-4 inline mr-2" />
                  Search Talent
                </button>
              </motion.div>
            </div>

            {/* Quick Stats Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
            >
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Today's Views</p>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-200" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">New Applications</p>
                    <p className="text-2xl font-bold">18</p>
                  </div>
                  <FileText className="w-8 h-8 text-green-200" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Interviews Today</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <Calendar className="w-8 h-8 text-indigo-200" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Response Rate</p>
                    <p className="text-2xl font-bold">94%</p>
                  </div>
                  <Zap className="w-8 h-8 text-yellow-200" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Period Selector */}
        <div className="flex justify-end mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-1 inline-flex">
            {['week', 'month', 'quarter', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md capitalize transition-all ${
                  selectedPeriod === period
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="w-10 h-10 text-blue-200" />
              <motion.span 
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {animatedStats.activeJobs}
              </motion.span>
            </div>
            <p className="text-blue-100">Active Jobs</p>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>+2 this month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-green-200" />
              <motion.span 
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {animatedStats.totalApplications}
              </motion.span>
            </div>
            <p className="text-green-100">Total Applications</p>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+15% vs last month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-10 h-10 text-indigo-200" />
              <motion.span 
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {animatedStats.avgTimeToHire}
              </motion.span>
            </div>
            <p className="text-indigo-100">Days to Hire</p>
            <div className="flex items-center mt-2 text-sm">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span>-3 days faster</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <Target className="w-10 h-10 text-orange-200" />
              <motion.span 
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {animatedStats.candidateResponse}%
              </motion.span>
            </div>
            <p className="text-orange-100">Response Rate</p>
            <div className="flex items-center mt-2 text-sm">
              <Award className="w-4 h-4 mr-1" />
              <span>Above average</span>
            </div>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Application Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Application Trends
              </h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={applicationTrends}>
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Area type="monotone" dataKey="applications" stroke="#3B82F6" fillOpacity={1} fill="url(#colorApplications)" strokeWidth={2} />
                <Area type="monotone" dataKey="hires" stroke="#10B981" fillOpacity={1} fill="url(#colorHires)" strokeWidth={2} />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Clearance Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Clearance Distribution
              </h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={clearanceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {clearanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Department Performance & Skills Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Department Performance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Department Performance
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Bar dataKey="applications" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="openings" fill="#10B981" radius={[8, 8, 0, 0]} />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Skills Match Radar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Skills Match Analysis
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={skillsRadar}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="skill" stroke="#9CA3AF" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9CA3AF" />
                <Radar name="Available" dataKey="candidates" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Radar name="Required" dataKey="required" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recruitment KPIs
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative inline-flex">
                  <ResponsiveContainer width={100} height={100}>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[metric]}>
                      <RadialBar dataKey="value" fill={metric.fill} cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{metric.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & Job Postings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'application' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      activity.type === 'message' ? 'bg-green-100 dark:bg-green-900/30' :
                      activity.type === 'milestone' ? 'bg-indigo-100 dark:bg-indigo-900/30' :
                      'bg-orange-100 dark:bg-orange-900/30'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        activity.type === 'application' ? 'text-blue-600 dark:text-blue-400' :
                        activity.type === 'message' ? 'text-green-600 dark:text-green-400' :
                        activity.type === 'milestone' ? 'text-indigo-600 dark:text-indigo-400' :
                        'text-orange-600 dark:text-orange-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Active Job Postings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Active Job Postings
              </h3>
              <Link href="/dashboard/company/jobs" className="text-blue-500 hover:text-blue-600 text-sm">
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              {jobPostings.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{job.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyBadge(job.urgency)}`}>
                          {job.urgency} priority
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {job.clearance}
                        </span>
                        <span>{job.budget}</span>
                        <span className={getStatusColor(job.status)}>
                          • {job.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Eye className="w-4 h-4 mr-1" />
                          <span className="font-semibold">{job.views}</span>
                        </div>
                        <p className="text-xs text-gray-500">views</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4 mr-1" />
                          <span className="font-semibold">{job.applications}</span>
                        </div>
                        <p className="text-xs text-gray-500">applicants</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                        Manage
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Candidates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              🌟 Top Matched Candidates This Week
            </h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All Candidates →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-lg p-5 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {candidate.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {candidate.clearance} • {candidate.experience}
                    </p>
                  </div>
                  <div className="flex items-center bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    <Star className="w-3 h-3 mr-1" />
                    {candidate.matchScore}%
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    candidate.status === 'available' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {candidate.status}
                  </span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {candidate.salary}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {candidate.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gradient-to-r from-blue-100 to-slate-100 dark:from-blue-900/30 dark:to-slate-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 text-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all font-medium">
                    View Profile
                  </button>
                  <button className="flex-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-medium">
                    Message
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}