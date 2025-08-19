'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Check, X, Trash2 } from 'lucide-react'

interface ResumeCardProps {
  currentResume: {
    name: string
    size: string
    uploadDate: string
    isDefault: boolean
  } | null
  onUpload: (file: File) => void
  onDelete: () => void
  onSetDefault: (value: boolean) => void
  isUploading: boolean
}

export default function ResumeCard({
  currentResume,
  onUpload,
  onDelete,
  onSetDefault,
  isUploading
}: ResumeCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget === e.target) {
      setIsDragging(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    if (file.type === 'application/pdf' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      onUpload(file)
    } else {
      alert('Please upload a PDF or DOCX file')
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    onDelete()
    setShowDeleteModal(false)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Resume</h2>
        
        {currentResume ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{currentResume.name}</p>
                  <p className="text-sm text-gray-600">
                    {currentResume.size} • Uploaded {currentResume.uploadDate}
                  </p>
                </div>
              </div>
              <Check className="w-5 h-5 text-green-600" />
            </div>

            {/* Delete button */}
            <button
              onClick={handleDeleteClick}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Resume</span>
            </button>

            {/* Default checkbox */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentResume.isDefault}
                onChange={(e) => onSetDefault(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Use as default for all applications
                {currentResume.isDefault && (
                  <span className="text-xs text-gray-500 ml-2">
                    (Set {new Date().toLocaleDateString()})
                  </span>
                )}
              </span>
            </label>
          </div>
        ) : (
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
              ${isUploading ? 'opacity-50 pointer-events-none' : 'hover:border-gray-400'}
            `}
          >
            <input
              type="file"
              id="resume-upload"
              accept=".pdf,.docx"
              onChange={handleFileInputChange}
              className="hidden"
              disabled={isUploading}
            />
            
            <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-blue-600' : 'text-gray-400'}`} />
            
            <label htmlFor="resume-upload" className="cursor-pointer">
              <p className="text-base font-medium text-gray-900 mb-1">
                {isDragging ? 'Drop your resume here' : 'Upload your resume'}
              </p>
              <p className="text-sm text-gray-600">
                Drag and drop or <span className="text-blue-600 hover:underline">browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Supports PDF and DOCX files up to 10MB
              </p>
            </label>

            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-sm text-gray-600">Uploading...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
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
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Resume</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to permanently delete this resume? This action cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Resume
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}