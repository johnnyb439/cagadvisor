import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import EnhancedHeader from '@/components/EnhancedHeader'
import EnhancedFooter from '@/components/EnhancedFooter'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cleared Advisory - Connect Cleared Professionals with Opportunities',
  description: 'The premier platform connecting security-cleared professionals with top employers. Fast-track your career with intelligent job matching.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <EnhancedHeader />
          <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
            {children}
          </main>
          <EnhancedFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}