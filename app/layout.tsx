import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LiveChat from '@/components/LiveChat'
import { AuthProvider } from '@/components/providers/AuthProvider'

export const metadata: Metadata = {
  title: 'Cleared Advisory Group - Your Gateway to Cleared IT Opportunities',
  description: 'Bridging the gap for National Guard, Reservists, Veterans, and cleared professionals seeking government contracting opportunities.',
  keywords: 'security clearance, government contracting, IT jobs, military transition, cleared jobs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-command-black">
        <AuthProvider>
          {/* Green Banner with Today's Date */}
          <div className="bg-green-600 text-white py-2 px-4 text-center font-semibold fixed top-0 left-0 right-0 z-50">
            Today is {today} - Synced via suspicious-murdock branch
          </div>
          <div className="pt-10">
            <Navbar />
          </div>
          <main className="pt-20">
            {children}
          </main>
          <Footer />
          <LiveChat />
        </AuthProvider>
      </body>
    </html>
  )
}