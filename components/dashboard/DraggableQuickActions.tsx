'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Briefcase, Target, BookOpen, FileText, Award,
  MessageSquare, FolderOpen, Users, GripVertical,
  Settings, Plus, X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: string
  href: string
  visible: boolean
}

const defaultActions: QuickAction[] = [
  {
    id: 'browse-jobs',
    title: 'Browse Jobs',
    description: 'View cleared positions',
    icon: Briefcase,
    color: 'text-dynamic-green',
    href: '/jobs',
    visible: true
  },
  {
    id: 'mock-interview',
    title: 'Practice Interview',
    description: 'AI-powered prep',
    icon: Target,
    color: 'text-dynamic-blue',
    href: '/mock-interview',
    visible: true
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'Career guides',
    icon: BookOpen,
    color: 'text-emerald-green',
    href: '/resources',
    visible: true
  },
  {
    id: 'resume',
    title: 'Update Resume',
    description: 'Military translation',
    icon: FileText,
    color: 'text-sky-blue',
    href: '/dashboard/resume',
    visible: true
  },
  {
    id: 'applications',
    title: 'Track Applications',
    description: 'Manage job applications',
    icon: Briefcase,
    color: 'text-orange-500',
    href: '/dashboard/applications',
    visible: true
  },
  {
    id: 'certifications',
    title: 'Certifications',
    description: 'Track credentials',
    icon: Award,
    color: 'text-purple-500',
    href: '/dashboard/certifications',
    visible: true
  },
  {
    id: 'messages',
    title: 'Messages',
    description: 'Chat with recruiters',
    icon: MessageSquare,
    color: 'text-cyan-500',
    href: '/dashboard/messages',
    visible: true
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Manage files',
    icon: FolderOpen,
    color: 'text-blue-500',
    href: '/dashboard/documents',
    visible: true
  }
]

function SortableAction({ action, isDragging }: { action: QuickAction; isDragging: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: action.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? 'z-50' : 'z-10'}`}
    >
      <Link
        href={action.href}
        className="block h-full"
        onClick={(e) => {
          if (isDragging) {
            e.preventDefault()
          }
        }}
      >
        <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors h-full relative group">
          <div
            {...attributes}
            {...listeners}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={16} className="text-gray-400" />
          </div>
          <action.icon className={`${action.color} mr-3 flex-shrink-0`} size={24} />
          <div className="min-w-0">
            <p className="font-semibold truncate">{action.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{action.description}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function DraggableQuickActions() {
  const [actions, setActions] = useState<QuickAction[]>(defaultActions)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isCustomizing, setIsCustomizing] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    // Load saved layout from localStorage
    const savedLayout = localStorage.getItem('quickActionsLayout')
    if (savedLayout) {
      try {
        const parsed = JSON.parse(savedLayout)
        setActions(parsed)
      } catch (e) {
        console.error('Failed to parse saved layout:', e)
      }
    }
  }, [])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setActions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)

        const newItems = arrayMove(items, oldIndex, newIndex)
        
        // Save to localStorage
        localStorage.setItem('quickActionsLayout', JSON.stringify(newItems))
        
        return newItems
      })
    }

    setActiveId(null)
  }

  const toggleActionVisibility = (actionId: string) => {
    setActions((items) => {
      const newItems = items.map((item) =>
        item.id === actionId ? { ...item, visible: !item.visible } : item
      )
      localStorage.setItem('quickActionsLayout', JSON.stringify(newItems))
      return newItems
    })
  }

  const resetLayout = () => {
    setActions(defaultActions)
    localStorage.removeItem('quickActionsLayout')
    setIsCustomizing(false)
  }

  const visibleActions = actions.filter((action) => action.visible)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white dark:bg-command-black rounded-lg shadow-md p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-montserrat font-bold">Quick Actions</h2>
        <div className="flex gap-2">
          {isCustomizing && (
            <button
              onClick={resetLayout}
              className="text-sm px-3 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              Reset
            </button>
          )}
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className={`flex items-center px-3 py-1 rounded-lg transition-colors text-sm ${
              isCustomizing
                ? 'bg-dynamic-green text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Settings size={16} className="mr-1" />
            {isCustomizing ? 'Done' : 'Customize'}
          </button>
        </div>
      </div>

      {isCustomizing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Drag to reorder • Click to toggle visibility • Changes save automatically
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => toggleActionVisibility(action.id)}
                className={`flex items-center p-2 rounded-lg text-sm transition-all ${
                  action.visible
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    : 'bg-gray-200 dark:bg-gray-900 text-gray-400 dark:text-gray-600 line-through'
                }`}
              >
                {React.createElement(action.icon, { size: 16, className: "mr-2" })}
                <span className="truncate">{action.title}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={visibleActions.map((action) => action.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatePresence>
              {visibleActions.map((action) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <SortableAction
                    action={action}
                    isDragging={activeId === action.id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div className="opacity-80">
              {(() => {
                const action = actions.find((a) => a.id === activeId)
                if (!action) return null
                return (
                  <div className="flex items-center p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                    {React.createElement(action.icon, { className: `${action.color} mr-3`, size: 24 })}
                    <div>
                      <p className="font-semibold">{action.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                    </div>
                  </div>
                )
              })()}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {isCustomizing && visibleActions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No actions visible. Click on actions above to show them.</p>
        </div>
      )}
    </motion.div>
  )
}