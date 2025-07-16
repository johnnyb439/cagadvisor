import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Cleared Advisory</h3>
            <p className="text-sm">
              Securing careers, one clearance at a time. The premier platform for cleared professionals.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs" className="hover:text-white">Browse Jobs</Link></li>
              <li><Link href="/profile" className="hover:text-white">Create Profile</Link></li>
              <li><Link href="#" className="hover:text-white">Career Resources</Link></li>
              <li><Link href="#" className="hover:text-white">Salary Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/employer/dashboard" className="hover:text-white">Post Jobs</Link></li>
              <li><Link href="#" className="hover:text-white">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white">Success Stories</Link></li>
              <li><Link href="#" className="hover:text-white">API Access</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">About Us</Link></li>
              <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 Cleared Advisory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}