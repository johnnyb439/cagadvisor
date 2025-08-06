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
          {/* FORCED UPDATE - Green Banner with Today's Date */}
          <div style={{backgroundColor: '#10b981', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '20px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99999}}>
            🚀 LIVE UPDATE: Today is {today} - Branch: suspicious-murdock 🚀
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