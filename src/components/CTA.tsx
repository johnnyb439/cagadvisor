import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Unlock Your Career Potential?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of cleared professionals who've found their perfect match. 
            Your next opportunity is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register" 
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2"
            >
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/jobs" 
              className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-400 transition"
            >
              Browse Jobs Now
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-75">
            No credit card required • Set up in 2 minutes • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}