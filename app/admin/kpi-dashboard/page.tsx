'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, Building, Briefcase, TrendingUp, 
  Calendar, Target, Activity, BarChart3,
  Download, RefreshCw, Filter, Clock, Shield
} from 'lucide-react'

interface KPIMetrics {
  totalCandidates: number
  totalEmployers: number
  weeklySignups: number
  monthlySignups: number
  clearanceLevels: {
    none: number
    publicTrust: number
    secret: number
    topSecret: number
    tsSci: number
  }
  mockInterviews: {
    total: number
    byCategory: {
      helpdesk: number
      isp: number
      osp: number
      fiber: number
      network: number
      systems: number
    }
  }
  conversionRates: {
    visitorToSignup: number
    signupToActive: number
    candidateToPlacement: number
  }
  growthRate: {
    weekly: number
    monthly: number
  }
}

export default function KPIDashboard() {
  const [metrics, setMetrics] = useState<KPIMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('week')
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [error, setError] = useState<string | null>(null)

  // Simulate fetching KPI data
  useEffect(() => {
    fetchKPIData()
    const interval = setInterval(fetchKPIData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [dateRange])

  const fetchKPIData = async () => {
    setLoading(true)
    setError(null)
    try {
      // In production, this would fetch from your API
      // For now, using simulated data
      const simulatedMetrics: KPIMetrics = {
        totalCandidates: 523,
        totalEmployers: 47,
        weeklySignups: 42,
        monthlySignups: 186,
        clearanceLevels: {
          none: 89,
          publicTrust: 124,
          secret: 201,
          topSecret: 87,
          tsSci: 22
        },
        mockInterviews: {
          total: 1247,
          byCategory: {
            helpdesk: 342,
            isp: 289,
            osp: 198,
            fiber: 156,
            network: 145,
            systems: 117
          }
        },
        conversionRates: {
          visitorToSignup: 12.5,
          signupToActive: 68.3,
          candidateToPlacement: 23.7
        },
        growthRate: {
          weekly: 8.5,
          monthly: 34.2
        }
      }
      
      setMetrics(simulatedMetrics)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Failed to fetch KPI data:', err)
      setError('Failed to load KPI data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    if (!metrics) return
    
    const csvContent = `
ClearedAdvisor KPI Report - ${new Date().toLocaleDateString()}

Overview Metrics
Total Candidates,${metrics.totalCandidates}
Total Employers,${metrics.totalEmployers}
Weekly Signups,${metrics.weeklySignups}
Monthly Signups,${metrics.monthlySignups}

Clearance Distribution
None,${metrics.clearanceLevels.none}
Public Trust,${metrics.clearanceLevels.publicTrust}
Secret,${metrics.clearanceLevels.secret}
Top Secret,${metrics.clearanceLevels.topSecret}
TS/SCI,${metrics.clearanceLevels.tsSci}

Mock Interview Usage
Total Sessions,${metrics.mockInterviews.total}
Helpdesk,${metrics.mockInterviews.byCategory.helpdesk}
ISP,${metrics.mockInterviews.byCategory.isp}
OSP,${metrics.mockInterviews.byCategory.osp}
Fiber Optics,${metrics.mockInterviews.byCategory.fiber}
Network,${metrics.mockInterviews.byCategory.network}
Systems,${metrics.mockInterviews.byCategory.systems}

Conversion Rates
Visitor to Signup,${metrics.conversionRates.visitorToSignup}%
Signup to Active,${metrics.conversionRates.signupToActive}%
Candidate to Placement,${metrics.conversionRates.candidateToPlacement}%

Growth Metrics
Weekly Growth,${metrics.growthRate.weekly}%
Monthly Growth,${metrics.growthRate.monthly}%
`.trim()

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kpi-report-${Date.now()}.csv`
    a.click()
  }

  const kpiCards = [
    {
      title: 'Total Users',
      value: metrics?.totalCandidates ? metrics.totalCandidates + metrics.totalEmployers : 0,
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Weekly Signups',
      value: metrics?.weeklySignups || 0,
      change: `+${metrics?.growthRate.weekly || 0}%`,
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Mock Interviews',
      value: metrics?.mockInterviews.total || 0,
      change: '+23.4%',
      icon: Briefcase,
      color: 'bg-purple-500'
    },
    {
      title: 'Placement Rate',
      value: `${metrics?.conversionRates.candidateToPlacement || 0}%`,
      change: '+2.3%',
      icon: Target,
      color: 'bg-orange-500'
    }
  ]

  if (loading && !metrics) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-ops-charcoal flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-dynamic-green animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading KPI data...</p>
        </div>
      </div>
    )
  }

  if (error && !metrics) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-ops-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-4 mb-4 inline-block">
            <Activity className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Unable to Load Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchKPIData}
            className="px-4 py-2 bg-dynamic-green text-ops-charcoal font-semibold rounded-lg hover:bg-mint-green transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ops-charcoal py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">KPI Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track pilot program performance metrics
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Updated: {lastUpdated.toLocaleTimeString()}
            </div>
            
            <button
              onClick={fetchKPIData}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              disabled={loading}
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${loading ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={exportToCSV}
              className="flex items-center px-4 py-2 bg-dynamic-green text-ops-charcoal font-semibold rounded-lg hover:bg-mint-green transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="flex gap-2 mb-6">
          {['day', 'week', 'month', 'quarter'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                dateRange === range
                  ? 'bg-dynamic-green text-ops-charcoal'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((kpi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 ${kpi.color} bg-opacity-10 rounded-lg`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color.replace('bg-', 'text-')}`} />
                </div>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {kpi.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {kpi.value.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{kpi.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Clearance Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-dynamic-green" />
              Clearance Distribution
            </h2>
            
            {metrics && (
              <div className="space-y-3">
                {Object.entries(metrics.clearanceLevels).map(([level, count]) => {
                  const percentage = (count / metrics.totalCandidates) * 100
                  const displayName = level === 'tsSci' ? 'TS/SCI' : 
                    level.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                  
                  return (
                    <div key={level}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{displayName}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-dynamic-green h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>

          {/* Mock Interview Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-dynamic-green" />
              Mock Interview Usage
            </h2>
            
            {metrics && (
              <div className="space-y-3">
                {Object.entries(metrics.mockInterviews.byCategory).map(([category, count]) => {
                  const percentage = (count / metrics.mockInterviews.total) * 100
                  const displayName = category.toUpperCase()
                  
                  return (
                    <div key={category}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{displayName}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>

          {/* Conversion Funnel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-dynamic-green" />
              Conversion Funnel
            </h2>
            
            {metrics && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Visitor → Signup</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    {metrics.conversionRates.visitorToSignup}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Signup → Active</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    {metrics.conversionRates.signupToActive}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Candidate → Placement</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    {metrics.conversionRates.candidateToPlacement}%
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Growth Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-dynamic-green" />
              Growth Metrics
            </h2>
            
            {metrics && (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    +{metrics.growthRate.weekly}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Weekly Growth</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    +{metrics.growthRate.monthly}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Monthly Growth</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}