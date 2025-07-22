'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Users, Shield, Award, Target, ChevronRight, Quote } from 'lucide-react'

interface AudienceSegment {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  stats: string
  testimonial: {
    quote: string
    author: string
    role: string
  }
  benefits: string[]
  href: string
  color: string
}

export default function TargetAudienceCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  
  const segments: AudienceSegment[] = [
    {
      id: 'national-guard',
      title: 'National Guard Members',
      icon: Shield,
      description: 'Leverage your clearance and military experience for lucrative civilian careers',
      stats: 'Serving 10,000+ Guard Members',
      testimonial: {
        quote: "Cleared Advisory helped me transition from weekend warrior to six-figure IT professional.",
        author: "SSG Michael R.",
        role: "Now Senior DevOps Engineer"
      },
      benefits: [
        'Part-time to full-time transition support',
        'Clearance maintenance guidance',
        'Remote work opportunities'
      ],
      href: '/features#national-guard',
      color: 'primary'
    },
    {
      id: 'reservists',
      title: 'Reservists',
      icon: Users,
      description: 'Transform your reserve service into high-paying cleared contractor positions',
      stats: '8,500+ Reservists Placed',
      testimonial: {
        quote: "From Navy Reserve to Cloud Architect - a 70% salary increase in 6 months!",
        author: "Lt. Sarah M.",
        role: "Cloud Solutions Architect"
      },
      benefits: [
        'Flexible scheduling options',
        'Contract negotiation support',
        'Security+ certification prep'
      ],
      href: '/features#reservists',
      color: 'blue'
    },
    {
      id: 'transitioning-military',
      title: 'Transitioning Military',
      icon: Award,
      description: 'Seamless transition from active duty to cleared civilian opportunities',
      stats: '15,000+ Veterans Transitioned',
      testimonial: {
        quote: "TAP was just the start. Cleared Advisory got me the job I actually wanted.",
        author: "MSgt James T.",
        role: "Cybersecurity Manager"
      },
      benefits: [
        'SkillBridge partnership programs',
        'Resume translation services',
        'Interview preparation workshops'
      ],
      href: '/features#transitioning',
      color: 'green'
    },
    {
      id: 'cleared-professionals',
      title: 'Veterans & Cleared Professionals',
      icon: Target,
      description: 'Advance your cleared career with premium opportunities and higher compensation',
      stats: '25,000+ Professionals Advanced',
      testimonial: {
        quote: "Moved from $120k to $185k by finding the right cleared position.",
        author: "David K.",
        role: "TS/SCI Program Manager"
      },
      benefits: [
        'Executive placement services',
        'Poly preparation resources',
        'Salary negotiation coaching'
      ],
      href: '/features#veterans',
      color: 'purple'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, {
      bg: string
      border: string
      icon: string
      hover: string
      button: string
    }> = {
      primary: {
        bg: 'bg-primary-50 dark:bg-primary-900/20',
        border: 'border-primary-200 dark:border-primary-800',
        icon: 'text-primary-600 dark:text-primary-400',
        hover: 'hover:border-primary-400 dark:hover:border-primary-600',
        button: 'bg-primary-600 hover:bg-primary-700'
      },
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        icon: 'text-blue-600 dark:text-blue-400',
        hover: 'hover:border-blue-400 dark:hover:border-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        icon: 'text-green-600 dark:text-green-400',
        hover: 'hover:border-green-400 dark:hover:border-green-600',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800',
        icon: 'text-purple-600 dark:text-purple-400',
        hover: 'hover:border-purple-400 dark:hover:border-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    }
    return colors[color] || colors.primary
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Who We Serve
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We specialize in helping cleared professionals navigate the complex world of government IT contracting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {segments.map((segment) => {
            const colors = getColorClasses(segment.color)
            const Icon = segment.icon
            const isHovered = hoveredCard === segment.id

            return (
              <Link
                key={segment.id}
                href={segment.href}
                className={`block group`}
                onMouseEnter={() => setHoveredCard(segment.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`
                    relative h-full p-6 rounded-xl border-2 transition-all duration-300
                    ${colors.bg} ${colors.border} ${colors.hover}
                    transform hover:scale-105 hover:shadow-xl
                  `}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-lg ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-8 w-8 ${colors.icon}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {segment.title}
                  </h3>

                  {/* Stats Badge */}
                  <div className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                    <Users className="h-4 w-4 mr-1" />
                    {segment.stats}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {segment.description}
                  </p>

                  {/* Expandable Content */}
                  <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'max-h-96' : 'max-h-0'}`}>
                    {/* Mini Testimonial */}
                    <div className="mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <Quote className="h-4 w-4 text-gray-400 mb-2" />
                      <p className="text-sm italic text-gray-600 dark:text-gray-400 mb-2">
                        "{segment.testimonial.quote}"
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        — {segment.testimonial.author}, {segment.testimonial.role}
                      </p>
                    </div>

                    {/* Benefits */}
                    <ul className="space-y-2 mb-4">
                      {segment.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                          <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className={`flex items-center text-sm font-medium ${colors.icon} group-hover:translate-x-1 transition-transform`}>
                    Learn More
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Mobile-friendly "See All" Button */}
        <div className="text-center mt-12 lg:hidden">
          <Link
            href="/features"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Explore All Features
            <ChevronRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}