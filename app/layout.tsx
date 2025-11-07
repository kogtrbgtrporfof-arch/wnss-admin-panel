import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthGuard from '@/components/AuthGuard'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WNSS Library - Admin Panel',
  description: 'Comprehensive admin panel for WNSS Digital Library management - Professional library management system for academic excellence',
  keywords: ['WNSS', 'library', 'admin panel', 'digital library', 'book management', 'education'],
  authors: [{ name: 'Group 27', url: 'https://wnss-library.netlify.app' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </ThemeProvider>
      </body>
    </html>
  )
}
