'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

interface LayoutProps {
  children: ReactNode
}

/**
 * Professional Layout Component
 * Main application layout with sidebar, header, and content area
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[rgb(var(--background))] theme-aware">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="
          flex-1 overflow-auto 
          p-4 md:p-6 lg:p-8
          bg-gray-50 dark:bg-[rgb(var(--background))]
          theme-aware
        ">
          <div className="max-w-[1920px] mx-auto fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
