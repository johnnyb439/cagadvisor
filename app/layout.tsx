import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LiveChat from '@/components/LiveChat'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import MobileNavigation from '@/components/MobileNavigation'
import SwipeIndicator from '@/components/SwipeIndicator'
import OfflineIndicator from '@/components/OfflineIndicator'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
// Removed AuthProvider import

export const metadata: Metadata = {
  title: 'Cleared Advisory Group - Your Gateway to Cleared IT Opportunities',
  description: 'Bridging the gap for National Guard, Reservists, Veterans, and cleared professionals seeking government contracting opportunities.',
  keywords: 'security clearance, government contracting, IT jobs, military transition, cleared jobs',
  manifest: '/manifest.json',
  themeColor: '#10B981',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-command-black">
        <ErrorBoundary>
          <ServiceWorkerRegistration />
          <OfflineIndicator />
          <Navbar />
          <MobileNavigation />
          <SwipeIndicator />
          <main className="pt-20">
            <ErrorBoundary showDetails={false}>
              {children}
            </ErrorBoundary>
          </main>
          <Footer />
          <LiveChat />
        </ErrorBoundary>
      </body>
    </html>
  )
}