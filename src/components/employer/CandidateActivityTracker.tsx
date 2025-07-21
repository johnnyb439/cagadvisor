'use client'

import { useState } from 'react'
import { Clock, Phone, Mail, FileText, Calendar, CheckCircle, AlertCircle, MessageSquare, Send, Plus } from 'lucide-react'

interface Activity {
  id: string
  type: 'contacted' | 'interviewed' | 'submitted' | 'hired' | 'rejected' | 'note' | 'email' | 'phone'
  title: string
  description: string
  timestamp: string
  recruiter: string
  icon: any
  color: string
}

interface Candidate {
  id: string
  name: string
  clearance: string
  status: 'active' | 'submitted' | 'interviewing' | 'offer' | 'hired' | 'rejected'
}

export default function CandidateActivityTracker({ candidateId }: { candidateId?: string }) {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      type: 'contacted',
      title: 'Initial Contact',
      description: 'Reached out via LinkedIn regarding Senior Software Engineer position',
      timestamp: '2024-01-15T10:30:00Z',
      recruiter: 'Veronika',
      icon: Mail,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: '2',
      type: 'phone',
      title: 'Phone Screen',
      description: 'Completed 30-min phone screen. Strong technical background, interested in position.',
      timestamp: '2024-01-17T14:00:00Z',
      recruiter: 'Veronika',
      icon: Phone,
      color: 'text-green-600 bg-green-50 dark:bg-green-900/20'
    },
    {
      id: '3',
      type: 'submitted',
      title: 'Submitted to Client',
      description: 'Resume submitted to Lockheed Martin for review',
      timestamp: '2024-01-18T09:00:00Z',
      recruiter: 'Veronika',
      icon: Send,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: '4',
      type: 'interviewed',
      title: 'Technical Interview',
      description: 'Completed technical interview with hiring manager. Feedback pending.',
      timestamp: '2024-01-22T15:00:00Z',
      recruiter: 'Veronika',
      icon: Calendar,
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
    }
  ])

  const [newActivity, setNewActivity] = useState({
    type: 'note',
    description: ''
  })

  const [showAddForm, setShowAddForm] = useState(false)

  const candidate: Candidate = {
    id: '1',
    name: 'Sarah Johnson',
    clearance: 'TS/SCI',
    status: 'interviewing'
  }

  const activityTypes = [
    { value: 'note', label: 'Note', icon: MessageSquare },
    { value: 'contacted', label: 'Contacted', icon: Mail },
    { value: 'phone', label: 'Phone Call', icon: Phone },
    { value: 'interviewed', label: 'Interview', icon: Calendar },
    { value: 'submitted', label: 'Submitted', icon: Send },
  ]

  const getActivityIcon = (type: string) => {
    const activityType = activityTypes.find(t => t.value === type)
    return activityType?.icon || MessageSquare
  }

  const getActivityColor = (type: string) => {
    const colors: Record<string, string> = {
      note: 'text-gray-600 bg-gray-50 dark:bg-gray-900/20',
      contacted: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
      phone: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      interviewed: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20',
      submitted: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
      hired: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
      rejected: 'text-red-600 bg-red-50 dark:bg-red-900/20',
      email: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
    }
    return colors[type] || colors.note
  }

  const handleAddActivity = () => {
    if (!newActivity.description.trim()) return

    const activity: Activity = {
      id: Date.now().toString(),
      type: newActivity.type as any,
      title: activityTypes.find(t => t.value === newActivity.type)?.label || 'Note',
      description: newActivity.description,
      timestamp: new Date().toISOString(),
      recruiter: 'Veronika',
      icon: getActivityIcon(newActivity.type),
      color: getActivityColor(newActivity.type)
    }

    setActivities([activity, ...activities])
    setNewActivity({ type: 'note', description: '' })
    setShowAddForm(false)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)} days ago`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Activity Timeline</h2>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm"
          >
            <Plus className="h-4 w-4" />
            Add Activity
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium text-gray-900 dark:text-gray-100">{candidate.name}</span>
          <span className="clearance-badge topsecret">{candidate.clearance}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            candidate.status === 'interviewing' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300' : ''
          }`}>
            {candidate.status}
          </span>
        </div>
      </div>

      {showAddForm && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
          <div className="space-y-3">
            <div className="flex gap-3">
              <select
                value={newActivity.type}
                onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {activityTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Add a note or description..."
                value={newActivity.description}
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddActivity()}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                onClick={handleAddActivity}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          
          <div className="space-y-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="relative flex gap-4">
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${activity.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1 pt-2">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{activity.title}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      by {activity.recruiter}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Showing all activities for this candidate
          </p>
        </div>
      </div>
    </div>
  )
}