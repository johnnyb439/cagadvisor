'use client'

import { useState } from 'react'
import { Shield, CheckCircle, AlertCircle, XCircle, Clock, Search } from 'lucide-react'

interface ClearanceStatus {
  status: 'active' | 'inactive' | 'in-scope' | 'expired' | 'pending' | 'unknown'
  level: string
  lastInvestigation: string
  expirationDate: string
  adjudicationDate: string
  investigationType: string
}

export default function ClearanceVerification() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<ClearanceStatus | null>(null)

  const verifyClearance = async () => {
    setLoading(true)
    // Simulate API call - in production this would connect to DISS/JPAS
    setTimeout(() => {
      setVerificationResult({
        status: 'active',
        level: 'TS/SCI',
        lastInvestigation: '2022-03-15',
        expirationDate: '2027-03-15',
        adjudicationDate: '2022-04-20',
        investigationType: 'T5R'
      })
      setLoading(false)
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 dark:bg-green-900/20'
      case 'in-scope': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
      case 'inactive': return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20'
      case 'expired': return 'text-red-600 bg-red-50 dark:bg-red-900/20'
      case 'pending': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-5 w-5" />
      case 'in-scope': return <Clock className="h-5 w-5" />
      case 'expired': return <XCircle className="h-5 w-5" />
      case 'pending': return <AlertCircle className="h-5 w-5" />
      default: return <AlertCircle className="h-5 w-5" />
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-6 w-6 text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Clearance Verification</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter candidate SSN (last 4) or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={verifyClearance}
            disabled={!searchQuery || loading}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Verifying...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Verify
              </>
            )}
          </button>
        </div>

        {verificationResult && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(verificationResult.status)}`}>
                  {getStatusIcon(verificationResult.status)}
                  {verificationResult.status.toUpperCase()}
                </span>
                <span className="clearance-badge sci">{verificationResult.level}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Investigation: {verificationResult.investigationType}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Last Investigation</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {new Date(verificationResult.lastInvestigation).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Adjudication Date</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {new Date(verificationResult.adjudicationDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Expiration Date</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {new Date(verificationResult.expirationDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Time Remaining</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {Math.floor((new Date(verificationResult.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Verification provided through DISS/JPAS integration. Last updated: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}