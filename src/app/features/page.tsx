import JobHeatMap from '@/components/JobHeatMap'
import InterviewMarker from '@/components/InterviewMarker'
import VideoInterview from '@/components/VideoInterview'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 sm:mb-8 text-center">
          New Features Demo
        </h1>
        
        {/* Job Heat Map Section */}
        <section className="mb-12">
          <JobHeatMap userClearance="Secret" />
        </section>

        {/* Interview Marker Section */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 text-center">
              Interview Approval System
            </h2>
            <InterviewMarker 
              interviewerName="Michael Chen"
              interviewerTitle="Engineering Director"
              companyName="Raytheon Technologies"
            />
          </div>
        </section>

        {/* Video Interview Section */}
        <section className="mb-12">
          <VideoInterview 
            jobTitle="Senior Network Engineer - TS/SCI"
            company="Lockheed Martin"
            interviewerName="Sarah Johnson"
            userRole="Network Engineer"
            userExperience="Senior"
          />
        </section>

        {/* Feature Descriptions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 dark:text-gray-100">Job Heat Map</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              Visualize job opportunities across different locations based on your security clearance level.
            </p>
            <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <li>Green markers show positions you qualify for</li>
              <li>Gray markers indicate jobs requiring higher clearance</li>
              <li>Larger circles represent more job opportunities</li>
              <li>Click on any location for detailed information</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 dark:text-gray-100">Interview Approval Marker</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              A unique way for hiring managers to digitally approve candidates after interviews.
            </p>
            <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <li>Interactive reveal animation</li>
              <li>Digital signature with timestamp</li>
              <li>Official approval stamp effect</li>
              <li>Clearance verification confirmation</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 dark:text-gray-100">Video Interview Platform</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              Complete asynchronous video interviews at your convenience for cleared positions.
            </p>
            <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <li>Pre-recorded questions from hiring managers</li>
              <li>Timed responses with progress tracking</li>
              <li>Practice mode and re-recording options</li>
              <li>Secure environment for classified discussions</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}