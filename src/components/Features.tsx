import { Shield, Zap, Search, BarChart, Lock, Users, MessageSquare, Trophy } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Clearance Profile System',
      description: 'Comprehensive profiles with verification levels from self-reported to government-verified. Track expiration dates and polygraph status.',
    },
    {
      icon: Zap,
      title: 'One-Click Apply',
      description: 'Apply instantly with pre-filled clearance info, resume, and custom cover letters. Track application status in real-time.',
    },
    {
      icon: Search,
      title: 'Smart Job Matching',
      description: 'AI-powered matching algorithm considers clearance level, location, skills, and salary expectations for perfect job fits.',
    },
    {
      icon: BarChart,
      title: 'Analytics & Insights',
      description: 'Track profile views, application success rates, and get salary benchmarking data specific to your clearance level.',
    },
    {
      icon: Lock,
      title: 'Security First',
      description: 'Military-grade encryption, GDPR/CCPA compliant, with automatic data purging and comprehensive audit trails.',
    },
    {
      icon: Users,
      title: 'Employer Dashboard',
      description: 'Kanban-style applicant tracking, bulk actions, team collaboration, and direct ATS integration.',
    },
    {
      icon: MessageSquare,
      title: 'Secure Communication',
      description: 'End-to-end encrypted messaging, video interview scheduling, and automated reminders.',
    },
    {
      icon: Trophy,
      title: 'Career Advancement',
      description: 'AI-powered resume optimization, interview prep, skill recommendations, and mentorship matching.',
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Everything You Need to Advance Your Cleared Career
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
            Built specifically for the unique needs of security-cleared professionals and the organizations that need them.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white p-5 sm:p-6 rounded-lg shadow-sm border hover:shadow-md transition">
                <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary-600 mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}