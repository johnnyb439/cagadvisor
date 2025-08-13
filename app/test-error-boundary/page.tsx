'use client'

import TestErrorBoundary from '@/components/TestErrorBoundary'
import { ComponentErrorBoundary } from '@/components/ErrorBoundary'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TestErrorBoundaryPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ops-charcoal py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Error Boundary Testing Page
        </h1>
        
        <div className="space-y-8">
          <ComponentErrorBoundary>
            <TestErrorBoundary />
          </ComponentErrorBoundary>
          
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              About Error Boundaries
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                Error boundaries have been implemented throughout the site to catch JavaScript errors 
                anywhere in the component tree, log those errors, and display a fallback UI instead 
                of crashing the entire application.
              </p>
              <p>
                <strong>Where they are active:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Main application layout (catches all page errors)</li>
                <li>Individual page components</li>
                <li>Critical features like Mock Interview</li>
                <li>Form components and data displays</li>
              </ul>
              <p>
                <strong>Benefits:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Prevents white screen of death</li>
                <li>Provides user-friendly error messages</li>
                <li>Allows recovery without page refresh</li>
                <li>Logs errors for debugging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}