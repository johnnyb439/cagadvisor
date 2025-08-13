'use client'

import { useState } from 'react'
import { AlertCircle, Bug, CheckCircle } from 'lucide-react'

export default function TestErrorBoundary() {
  const [shouldError, setShouldError] = useState(false)
  const [testType, setTestType] = useState<'throw' | 'async' | 'render'>('throw')

  // Component that throws an error
  const ErrorComponent = () => {
    if (shouldError) {
      if (testType === 'throw') {
        throw new Error('Test error: This component intentionally crashed!')
      }
      if (testType === 'render') {
        // @ts-ignore - Intentional error for testing
        return <div>{undefined.map(item => item)}</div>
      }
    }
    return (
      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <div className="flex items-center text-green-600 dark:text-green-400">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span>Component is working normally!</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Error Boundary Test
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Test the error boundary by triggering different types of errors
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <AlertCircle className="w-5 h-5 mr-3 text-yellow-600 dark:text-yellow-400" />
          <div className="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>Testing Mode:</strong> This component is for testing error boundaries.
            Click the button below to trigger an error and see how it's handled gracefully.
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Error Type:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setTestType('throw')}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                testType === 'throw'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Throw Error
            </button>
            <button
              onClick={() => setTestType('render')}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                testType === 'render'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Render Error
            </button>
            <button
              onClick={() => setTestType('async')}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                testType === 'async'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              disabled
            >
              Async Error (Coming)
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setShouldError(!shouldError)}
          className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
            shouldError
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          <Bug className="w-5 h-5 mr-2" />
          {shouldError ? 'Fix Component' : 'Trigger Error'}
        </button>

        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Component Status:</p>
          <ErrorComponent />
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
          How to verify:
        </h3>
        <ol className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-decimal list-inside">
          <li>Click "Trigger Error" to crash the component</li>
          <li>Notice the error is caught and displayed gracefully</li>
          <li>Click "Try Again" in the error UI to recover</li>
          <li>Or click "Fix Component" to restore normal operation</li>
        </ol>
      </div>
    </div>
  )
}