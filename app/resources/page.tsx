'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, Download, FileText, Shield, Briefcase, TrendingUp, 
  ChevronRight, Clock, Search, Filter, Video, Star, Eye,
  CheckCircle, Calendar, Users, Award, PlayCircle, X
} from 'lucide-react'
import Link from 'next/link'
import BinaryBackground from '@/components/BinaryBackground'
import ResourceCard from '@/components/ResourceCard'

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  readTime?: string;
  featured?: boolean;
  downloadable?: boolean;
  downloadPath?: string;
  interactive?: boolean;
  videoUrl?: string;
  views?: number;
  rating?: number;
  date?: string;
  content?: string;
  sections?: { title: string; content: string }[];
}

// Extended resources with all categories
const allResources: ResourceItem[] = [
  // Getting Started
  {
    id: 'clearance-101',
    title: 'Clearance 101: Complete Guide',
    description: 'Everything you need to know about security clearances',
    type: 'guide',
    category: 'Getting Started',
    readTime: '15 min',
    featured: true,
    views: 1543,
    rating: 4.9,
    sections: [
      {
        title: 'What is a Security Clearance?',
        content: 'A security clearance is a status granted to individuals allowing them access to classified information. The process involves a thorough background investigation to ensure the individual is trustworthy and reliable.'
      },
      {
        title: 'Types of Security Clearances',
        content: 'There are three main levels of security clearance:\n\n• **Confidential**: The lowest level, for information that could damage national security if disclosed.\n• **Secret**: Mid-level clearance for information that could cause serious damage to national security.\n• **Top Secret**: The highest level, for information that could cause exceptionally grave damage to national security.'
      },
      {
        title: 'The Investigation Process',
        content: 'The security clearance process involves:\n\n1. **Application**: Complete the SF-86 form with detailed personal history\n2. **Investigation**: Background check including finances, foreign contacts, and criminal history\n3. **Adjudication**: Final determination based on investigation results\n4. **Periodic Reinvestigation**: Regular reviews to maintain clearance'
      },
      {
        title: 'Timeline Expectations',
        content: 'Processing times vary:\n\n• **Secret Clearance**: 3-6 months average\n• **Top Secret**: 6-12 months average\n• **Interim Clearance**: May be granted within 1-2 months for urgent needs'
      },
      {
        title: 'Maintaining Your Clearance',
        content: 'To maintain your clearance:\n\n• Report foreign travel and contacts\n• Keep finances in good order\n• Avoid criminal activities\n• Report significant life changes\n• Complete periodic reinvestigations on time'
      }
    ]
  },
  {
    id: 'military-transition',
    title: 'Military to Civilian IT Transition Roadmap',
    description: 'Step-by-step guide for transitioning service members',
    type: 'guide',
    category: 'Getting Started',
    readTime: '20 min',
    views: 892,
    rating: 4.8,
    sections: [
      {
        title: 'Translating Military Skills',
        content: 'Your military experience is incredibly valuable in the civilian IT sector:\n\n• **Leadership**: Team management and project leadership\n• **Security Mindset**: Understanding of security protocols and compliance\n• **Problem Solving**: Quick decision-making under pressure\n• **Communication**: Clear and concise briefing skills\n• **Discipline**: Strong work ethic and attention to detail'
      },
      {
        title: 'Key Certifications to Pursue',
        content: 'Focus on certifications that complement your clearance:\n\n1. **CompTIA Security+**: Required for many DoD positions\n2. **CISSP**: Advanced security certification\n3. **Cloud Certifications**: AWS, Azure, or GCP\n4. **Project Management**: PMP or Agile certifications\n5. **Specialized Tech**: Based on your interest area'
      },
      {
        title: 'Timeline and Action Steps',
        content: '**6 Months Before Separation**:\n• Start networking and attending job fairs\n• Begin certification studies\n• Update resume with civilian terminology\n\n**3 Months Before**:\n• Apply for positions\n• Practice interviewing\n• Connect with veteran hiring programs\n\n**Post-Separation**:\n• Leverage veteran benefits for education\n• Join professional organizations\n• Continue skill development'
      }
    ]
  },
  {
    id: 'gov-contracting',
    title: 'Understanding Government Contracting',
    description: 'Basics of the cleared contractor ecosystem',
    type: 'article',
    category: 'Getting Started',
    readTime: '10 min',
    views: 567,
    rating: 4.7
  },
  {
    id: 'clearance-process-video',
    title: 'The Security Clearance Process Explained',
    description: 'Video walkthrough of the entire clearance process',
    type: 'video',
    category: 'Getting Started',
    videoUrl: '#',
    readTime: '12 min video',
    views: 2341,
    rating: 4.9
  },

  // Career Development
  {
    id: 'it-certifications',
    title: 'Top 10 IT Certifications for Cleared Professionals',
    description: 'Most valuable certifications in the cleared space',
    type: 'guide',
    category: 'Career Development',
    readTime: '12 min',
    views: 1234,
    rating: 4.8
  },
  {
    id: 'resume-worksheet',
    title: 'Resume Translation Worksheet',
    description: 'Convert military experience to civilian terms',
    type: 'template',
    category: 'Career Development',
    downloadable: true,
    downloadPath: '/downloads/templates/resume-translation-worksheet.txt',
    views: 3456,
    rating: 5.0
  },
  {
    id: 'interview-checklist',
    title: 'Interview Success Checklist',
    description: 'Prepare for cleared IT interviews like a pro',
    type: 'checklist',
    category: 'Career Development',
    downloadable: true,
    downloadPath: '/downloads/checklists/interview-success-checklist.txt',
    views: 2789,
    rating: 4.9
  },
  {
    id: 'career-path-video',
    title: 'Cleared IT Career Paths',
    description: 'Video guide to different career trajectories',
    type: 'video',
    category: 'Career Development',
    videoUrl: '#',
    readTime: '18 min video',
    views: 1567,
    rating: 4.7
  },

  // Industry Insights
  {
    id: 'salary-guide',
    title: '2025 Cleared IT Salary Guide',
    description: 'Current compensation trends by clearance level',
    type: 'report',
    category: 'Industry Insights',
    readTime: '25 min',
    featured: true,
    views: 4532,
    rating: 4.9
  },
  {
    id: 'hot-skills',
    title: 'Hot Skills in Cleared IT',
    description: 'Most in-demand skills for 2025 and beyond',
    type: 'article',
    category: 'Industry Insights',
    readTime: '8 min',
    views: 2134,
    rating: 4.8
  },
  {
    id: 'defense-contractors',
    title: 'Major Defense Contractors Guide',
    description: 'Overview of top employers in the cleared space',
    type: 'guide',
    category: 'Industry Insights',
    readTime: '18 min',
    views: 1876,
    rating: 4.7
  },

  // Tools & Templates
  {
    id: 'clearance-timeline',
    title: 'Clearance Timeline Calculator',
    description: 'Estimate your investigation timeline',
    type: 'tool',
    category: 'Tools & Templates',
    interactive: true,
    views: 5678,
    rating: 4.9
  },
  {
    id: 'network-tracker',
    title: 'Network Tracker Spreadsheet',
    description: 'Organize your professional connections',
    type: 'template',
    category: 'Tools & Templates',
    downloadable: true,
    views: 1234,
    rating: 4.6
  },
  {
    id: 'goal-workbook',
    title: 'Goal Setting Workbook',
    description: 'Plan your cleared career journey',
    type: 'workbook',
    category: 'Tools & Templates',
    downloadable: true,
    views: 987,
    rating: 4.7
  },

  // Certification Prep (New Category)
  {
    id: 'security-plus-guide',
    title: 'Security+ Certification Study Guide',
    description: 'Complete prep guide for CompTIA Security+',
    type: 'guide',
    category: 'Certification Prep',
    readTime: '45 min',
    featured: true,
    views: 3421,
    rating: 4.9
  },
  {
    id: 'cissp-roadmap',
    title: 'CISSP Certification Roadmap',
    description: 'Path to achieving your CISSP certification',
    type: 'guide',
    category: 'Certification Prep',
    readTime: '30 min',
    views: 2156,
    rating: 4.8
  },
  {
    id: 'cert-comparison',
    title: 'Certification Comparison Chart',
    description: 'Compare IT certifications for cleared professionals',
    type: 'comparison',
    category: 'Certification Prep',
    downloadable: true,
    views: 1879,
    rating: 4.7
  },

  // Interview Prep (New Category)
  {
    id: 'technical-questions',
    title: '50 Technical Interview Questions',
    description: 'Common technical questions for cleared IT roles',
    type: 'guide',
    category: 'Interview Prep',
    readTime: '35 min',
    views: 4123,
    rating: 4.9
  },
  {
    id: 'behavioral-guide',
    title: 'Behavioral Interview Mastery',
    description: 'Ace the soft skills portion of your interview',
    type: 'guide',
    category: 'Interview Prep',
    readTime: '25 min',
    views: 2876,
    rating: 4.8
  },
  {
    id: 'mock-interview-video',
    title: 'Mock Interview Examples',
    description: 'Watch real cleared IT interview scenarios',
    type: 'video',
    category: 'Interview Prep',
    videoUrl: '#',
    readTime: '40 min video',
    views: 3245,
    rating: 4.9
  }
]

const categories = [
  'All Resources',
  'Getting Started',
  'Career Development',
  'Industry Insights',
  'Tools & Templates',
  'Certification Prep',
  'Interview Prep'
]

const resourceTypes = ['All Types', 'guide', 'article', 'video', 'template', 'tool', 'checklist', 'report', 'workbook', 'comparison']

// Clearance Timeline Calculator Component
const ClearanceCalculator = ({ onClose }: { onClose: () => void }) => {
  const [clearanceType, setClearanceType] = useState('secret')
  const [hasInterim, setHasInterim] = useState(false)
  const [hasPriorInvestigation, setHasPriorInvestigation] = useState(false)
  const [complexity, setComplexity] = useState('standard')

  const calculateTimeline = () => {
    let baseTime = clearanceType === 'secret' ? 3 : 9 // months
    
    if (hasPriorInvestigation) baseTime *= 0.7
    if (complexity === 'complex') baseTime *= 1.5
    
    const interimTime = hasInterim ? 0.5 : 0
    
    return {
      interim: interimTime,
      total: Math.round(baseTime * 10) / 10
    }
  }

  const timeline = calculateTimeline()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-command-black rounded-2xl max-w-lg w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-montserrat font-bold">Clearance Timeline Calculator</h3>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Clearance Level</label>
            <select 
              value={clearanceType} 
              onChange={(e) => setClearanceType(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="secret">Secret</option>
              <option value="topsecret">Top Secret</option>
              <option value="tssci">TS/SCI</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <input
                type="checkbox"
                checked={hasInterim}
                onChange={(e) => setHasInterim(e.target.checked)}
                className="mr-2"
              />
              Interim clearance requested
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <input
                type="checkbox"
                checked={hasPriorInvestigation}
                onChange={(e) => setHasPriorInvestigation(e.target.checked)}
                className="mr-2"
              />
              Prior investigation within 5 years
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Case Complexity</label>
            <select 
              value={complexity} 
              onChange={(e) => setComplexity(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="standard">Standard (no foreign contacts/travel)</option>
              <option value="complex">Complex (foreign contacts/extensive travel)</option>
            </select>
          </div>

          <div className="bg-emerald-green/10 rounded-lg p-6">
            <h4 className="font-semibold mb-4">Estimated Timeline</h4>
            {hasInterim && (
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span>Interim Clearance</span>
                  <span className="font-semibold">{timeline.interim * 4} - {timeline.interim * 6} weeks</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-sky-blue"
                    initial={{ width: 0 }}
                    animate={{ width: '15%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}
            <div>
              <div className="flex justify-between mb-1">
                <span>Full Clearance</span>
                <span className="font-semibold">{Math.round(timeline.total * 0.8)} - {Math.round(timeline.total * 1.2)} months</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-dynamic-green"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Note: These are estimates based on current processing times. Actual timelines may vary based on investigation workload and individual circumstances.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Resources')
  const [selectedType, setSelectedType] = useState('All Types')
  const [showCalculator, setShowCalculator] = useState(false)
  const [subscribedToNewsletter, setSubscribedToNewsletter] = useState(false)
  const [email, setEmail] = useState('')
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null)

  // Filter resources based on search and filters
  const filteredResources = useMemo(() => {
    return allResources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All Resources' || resource.category === selectedCategory
      const matchesType = selectedType === 'All Types' || resource.type === selectedType
      
      return matchesSearch && matchesCategory && matchesType
    })
  }, [searchQuery, selectedCategory, selectedType])

  const handleDownload = (resourceId: string, format: string) => {
    // Use the new API endpoint for downloads
    const downloadUrl = `/api/download?id=${resourceId}&format=${format}`
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = `${resourceId}.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribedToNewsletter(true)
    setTimeout(() => setSubscribedToNewsletter(false), 5000)
  }

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Getting Started': return BookOpen
      case 'Career Development': return TrendingUp
      case 'Industry Insights': return Briefcase
      case 'Tools & Templates': return FileText
      case 'Certification Prep': return Award
      case 'Interview Prep': return Users
      default: return BookOpen
    }
  }

  return (
    <>
      <AnimatePresence>
        {showCalculator && <ClearanceCalculator onClose={() => setShowCalculator(false)} />}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-20 bg-professional-gradient text-white">
        <BinaryBackground />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-green/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-opportunity-orange/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
              Resources & <span className="gradient-text">Knowledge Hub</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Free guides, tools, and insights to accelerate your cleared IT career
            </p>

            {/* Search and Filter Bar */}
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/50"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/50"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                  ))}
                </select>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/50"
                >
                  {resourceTypes.map(type => (
                    <option key={type} value={type} className="bg-gray-800">{type}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4 text-sm text-white/80">
                Showing {filteredResources.length} of {allResources.length} resources
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-white dark:bg-command-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Resources */}
          {filteredResources.some(r => r.featured) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-montserrat font-semibold mb-8">Featured Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
                {filteredResources.filter(r => r.featured).map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onDownload={(_, format) => handleDownload(resource.id, format)}
                    onOpenCalculator={() => setShowCalculator(true)}
                    onReadMore={setSelectedResource}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* All Resources by Category */}
          {categories.slice(1).map((category, categoryIndex) => {
            const categoryResources = filteredResources.filter(r => r.category === category && !r.featured)
            if (categoryResources.length === 0) return null
            
            const Icon = getIconForCategory(category)
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-dynamic-green/10 rounded-lg flex items-center justify-center mr-4">
                    <Icon className="w-6 h-6 text-dynamic-green" />
                  </div>
                  <h2 className="text-2xl font-montserrat font-semibold">{category}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
                  {categoryResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onDownload={(_, format) => handleDownload(resource.id, format)}
                      onOpenCalculator={() => setShowCalculator(true)}
                      onReadMore={setSelectedResource}
                    />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-50 dark:bg-ops-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-command-black rounded-3xl shadow-xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-montserrat font-bold mb-4">
                Get Weekly <span className="gradient-text">Resources</span>
              </h2>
              <p className="text-xl text-intel-gray">
                Exclusive guides, templates, and career tips delivered to your inbox
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-dynamic-green"
                />
                <button type="submit" className="btn-primary">
                  Subscribe
                </button>
              </div>
              
              {subscribedToNewsletter && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center text-dynamic-green font-medium flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Successfully subscribed! Check your email.
                </motion.div>
              )}
            </form>

            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-6">
              Join 5,000+ cleared professionals getting ahead in their careers
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-6">
              Ready to Take the Next Step?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Our experts are ready to help you navigate your unique career path
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary bg-white dark:bg-gray-800 text-command-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                Schedule Consultation
              </Link>
              <Link href="/mock-interview" className="btn-secondary border-white text-white hover:bg-white/10">
                Practice Interviews
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resource Content Modal */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedResource(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-command-black border border-gray-800 rounded-lg max-w-4xl max-h-[80vh] overflow-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-montserrat font-semibold mb-2">{selectedResource.title}</h2>
                  <p className="text-gray-400 dark:text-gray-500">{selectedResource.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {selectedResource.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedResource.readTime}
                      </span>
                    )}
                    {selectedResource.views && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {selectedResource.views} views
                      </span>
                    )}
                    {selectedResource.rating && (
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        {selectedResource.rating}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="prose prose-invert max-w-none">
                {selectedResource.sections ? (
                  selectedResource.sections.map((section, index) => (
                    <div key={index} className="mb-8">
                      <h3 className="text-xl font-semibold text-dynamic-green mb-3">{section.title}</h3>
                      <div className="text-gray-300 dark:text-gray-400 whitespace-pre-line">
                        {section.content.split('\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-2">
                            {paragraph.split(/(\*\*.*?\*\*)/).map((part, partIndex) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={partIndex} className="text-white">{part.slice(2, -2)}</strong>
                              }
                              return part
                            })}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))
                ) : selectedResource.content ? (
                  <div className="text-gray-300 dark:text-gray-400 whitespace-pre-line">{selectedResource.content}</div>
                ) : (
                  <div className="text-gray-400 dark:text-gray-500">
                    <p className="mb-4">This resource is currently being developed. Check back soon for the full content!</p>
                    <p>In the meantime, feel free to:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>Explore our other resources</li>
                      <li>Contact us for personalized guidance</li>
                      <li>Try our mock interview feature</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-800">
                {selectedResource.downloadable && (
                  <button className="btn-primary">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resource
                  </button>
                )}
                <button
                  onClick={() => setSelectedResource(null)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}