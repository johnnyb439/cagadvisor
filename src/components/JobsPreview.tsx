import Link from 'next/link'
import { MapPin, DollarSign, Clock, ArrowRight } from 'lucide-react'

export default function JobsPreview() {
  const featuredJobs = [
    {
      title: 'Senior Software Engineer',
      company: 'Lockheed Martin',
      location: 'Bethesda, MD',
      clearance: 'TS/SCI',
      salary: '$140k - $180k',
      type: 'Full-time',
      posted: '2 days ago',
      description: 'Lead development of mission-critical systems supporting national security initiatives.',
    },
    {
      title: 'Cybersecurity Analyst',
      company: 'Booz Allen Hamilton',
      location: 'McLean, VA',
      clearance: 'Secret',
      salary: '$120k - $150k',
      type: 'Full-time',
      posted: '3 days ago',
      description: 'Protect critical infrastructure and data assets. Conduct security assessments and incident response.',
    },
    {
      title: 'Cloud Solutions Architect',
      company: 'Amazon Web Services',
      location: 'Arlington, VA',
      clearance: 'Top Secret',
      salary: '$160k - $200k',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Design and implement secure cloud solutions for government clients. AWS certifications preferred.',
    },
  ]

  const getClearanceBadgeClass = (clearance: string) => {
    if (clearance.includes('SCI')) return 'clearance-badge sci'
    if (clearance.includes('Top Secret')) return 'clearance-badge topsecret'
    if (clearance === 'Secret') return 'clearance-badge secret'
    return 'clearance-badge public'
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Opportunities
          </h2>
          <p className="text-xl text-gray-600">
            Top positions from verified employers actively seeking cleared professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredJobs.map((job, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <span className={getClearanceBadgeClass(job.clearance)}>
                    {job.clearance}
                  </span>
                </div>
                <p className="text-gray-700 font-medium">{job.company}</p>
              </div>

              <p className="text-gray-600 mb-4">{job.description}</p>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{job.posted}</span>
                </div>
              </div>

              <button className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition">
                One-Click Apply
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/jobs" 
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
          >
            View All Jobs
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}