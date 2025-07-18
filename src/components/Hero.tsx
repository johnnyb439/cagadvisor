import Link from 'next/link'
import { ArrowRight, Shield, Briefcase, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Your Security Clearance is Your
            <span className="text-primary-600 dark:text-primary-400"> Superpower</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 px-4 sm:px-0">
            Connect with top employers seeking cleared professionals. 
            Fast-track your career with our intelligent matching system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/auth/register" 
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center gap-2"
            >
              Get Started - It's Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/employer/dashboard" 
              className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 dark:hover:bg-gray-700 transition"
            >
              I'm Hiring
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 dark:text-gray-100">Verified Clearances</h3>
              <p className="text-gray-600 dark:text-gray-400">Multi-level verification system ensures authenticity</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Briefcase className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 dark:text-gray-100">One-Click Apply</h3>
              <p className="text-gray-600 dark:text-gray-400">Apply to multiple positions with a single profile</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 dark:text-gray-100">Smart Matching</h3>
              <p className="text-gray-600 dark:text-gray-400">AI-powered job matching based on clearance and skills</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}