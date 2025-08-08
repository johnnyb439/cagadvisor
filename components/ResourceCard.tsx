'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, Clock, Eye, Star, FileText, 
  PlayCircle, ChevronDown, Check,
  FileIcon, FileSpreadsheet, FilePdf
} from 'lucide-react'

interface ResourceCardProps {
  resource: {
    id: string
    title: string
    description: string
    type: string
    category: string
    readTime?: string
    featured?: boolean
    downloadable?: boolean
    downloadPath?: string
    interactive?: boolean
    videoUrl?: string
    views?: number
    rating?: number
    date?: string
  }
  onDownload: (path: string, format: string) => void
  onOpenCalculator?: () => void
  onReadMore: (resource: any) => void
}

const downloadFormats = [
  { value: 'pdf', label: 'PDF', icon: FilePdf, description: 'Universal format, works everywhere' },
  { value: 'docx', label: 'Word', icon: FileText, description: 'Microsoft Word document' },
  { value: 'rtf', label: 'RTF', icon: FileSpreadsheet, description: 'Rich Text Format (Mac compatible)' },
  { value: 'txt', label: 'Text', icon: FileIcon, description: 'Plain text file' }
]

export default function ResourceCard({ resource, onDownload, onOpenCalculator, onReadMore }: ResourceCardProps) {
  const [showFormatMenu, setShowFormatMenu] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState('pdf')
  const [downloading, setDownloading] = useState(false)

  const handleDownload = (format: string) => {
    setDownloading(true)
    setSelectedFormat(format)
    
    // Simulate download process
    setTimeout(() => {
      onDownload(resource.downloadPath || '', format)
      setDownloading(false)
      setShowFormatMenu(false)
    }, 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col"
    >
      {/* Card Header */}
      <div className="p-6 flex-1 flex flex-col">
        {resource.featured && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            FEATURED
          </div>
        )}
        
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
            {resource.title}
          </h3>
          {resource.rating && (
            <div className="flex items-center text-sm text-yellow-500 ml-2 shrink-0">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1">{resource.rating}</span>
            </div>
          )}
        </div>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
          {resource.description}
        </p>
        
        {/* Metadata Row */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 capitalize">
            {resource.type}
          </span>
          {resource.views && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Eye className="w-4 h-4 mr-1" />
              {resource.views.toLocaleString()}
            </div>
          )}
        </div>

        {/* Time and Icons Row */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          {resource.readTime && (
            <>
              <Clock className="w-4 h-4 mr-1" />
              <span className="mr-3">{resource.readTime}</span>
            </>
          )}
          <div className="ml-auto flex items-center gap-2">
            {resource.downloadable && <Download className="w-4 h-4" />}
            {resource.type === 'video' && <PlayCircle className="w-4 h-4" />}
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="p-6 pt-0 mt-auto">
        {resource.downloadable ? (
          <div className="relative">
            <button
              onClick={() => setShowFormatMenu(!showFormatMenu)}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 font-medium"
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                  <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
            
            {/* Format Selection Dropdown */}
            <AnimatePresence>
              {showFormatMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bottom-full mb-2 left-0 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-10"
                >
                  <div className="p-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2">Choose format:</p>
                    {downloadFormats.map((format) => {
                      const Icon = format.icon
                      return (
                        <button
                          key={format.value}
                          onClick={() => handleDownload(format.value)}
                          className="w-full flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-left"
                        >
                          <Icon className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {format.label}
                              </span>
                              {selectedFormat === format.value && (
                                <Check className="w-4 h-4 ml-2 text-green-500" />
                              )}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {format.description}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : resource.interactive && resource.id === 'clearance-timeline' ? (
          <button 
            onClick={onOpenCalculator}
            className="w-full px-4 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Open Calculator
          </button>
        ) : resource.type === 'video' ? (
          <button className="w-full px-4 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium flex items-center justify-center">
            <PlayCircle className="w-4 h-4 mr-2" />
            Watch Video
          </button>
        ) : (
          <button 
            onClick={() => onReadMore(resource)}
            className="w-full px-4 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Read More
          </button>
        )}
      </div>
    </motion.div>
  )
}