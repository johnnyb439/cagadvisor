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
          {/* Transparent Banner with Today's Date */}
          <div style={{backgroundColor: 'rgba(16, 185, 129, 0.3)', backdropFilter: 'blur(10px)', color: '#047857', padding: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40, borderBottom: '2px solid rgba(16, 185, 129, 0.5)'}}>
            🚀 LIVE: {today} - suspicious-murdock 🚀
          </div>
          <Navbar />
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