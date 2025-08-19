'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Clock, RotateCcw, Eye, Edit3, X } from 'lucide-react'

interface ResumeVersion {
  id: string
  filename: string
  uploadDate: string
  version: number
  notes?: string
  size: string
}

interface ResumeVersionListProps {
  versions: ResumeVersion[]
  onRestore: (versionId: string) => void
  onPreview: (versionId: string) => void
  onUpdateNotes: (versionId: string, notes: string) => void
}

export default function ResumeVersionList({
  versions,
  onRestore,
  onPreview,
  onUpdateNotes
}: ResumeVersionListProps) {
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [tempNotes, setTempNotes] = useState('')
  const [showPreviewModal, setShowPreviewModal] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const handleEditNotes = (version: ResumeVersion) => {
    setEditingNotes(version.id)
    setTempNotes(version.notes || '')
  }

  const handleSaveNotes = (versionId: string) => {
    onUpdateNotes(versionId, tempNotes)
    setEditingNotes(null)
    setTempNotes('')
  }

  const handleCancelNotes = () => {
    setEditingNotes(null)
    setTempNotes('')
  }

  const handlePreview = (versionId: string) => {
    setShowPreviewModal(versionId)
    onPreview(versionId)
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-gray-600" />
          Version History
        </h3>
        
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {versions.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">
              No previous versions available
            </p>
          ) : (
            versions.map((version, index) => (
              <motion.div
                key={version.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {version.filename}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                        <span>Version {version.version}</span>
                        <span>•</span>
                        <span>{formatDate(version.uploadDate)}</span>
                        <span>•</span>
                        <span>{version.size}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes section */}
                <div className="mt-3 mb-3">
                  {editingNotes === version.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="Add notes (e.g., Used for TechCorp interview)"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
                        rows={2}
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSaveNotes(version.id)}
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelNotes}
                          className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => handleEditNotes(version)}
                      className="cursor-pointer group/notes"
                    >
                      {version.notes ? (
                        <p className="text-xs text-gray-600 italic flex items-center">
                          <span className="flex-1">{version.notes}</span>
                          <Edit3 className="w-3 h-3 ml-2 opacity-0 group-hover/notes:opacity-100 transition-opacity" />
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center">
                          <span>Add notes</span>
                          <Edit3 className="w-3 h-3 ml-2" />
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onRestore(version.id)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restore</span>
                  </button>
                  <button
                    onClick={() => handlePreview(version.id)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Preview</span>
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
                <button
                  onClick={() => setShowPreviewModal(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                <p className="text-gray-500">
                  Resume preview will be displayed here
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}