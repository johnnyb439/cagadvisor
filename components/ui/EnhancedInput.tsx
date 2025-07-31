'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'

interface EnhancedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 
              border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-white 
              rounded-lg 
              focus:outline-none focus:border-dynamic-green dark:focus:border-dynamic-green
              focus:ring-2 focus:ring-dynamic-green/20
              transition-all duration-200
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}
        </div>
      </div>
    )
  }
)

EnhancedInput.displayName = 'EnhancedInput'

export default EnhancedInput