'use client'

import { Search, ChevronRight } from 'lucide-react'
import { Input } from '../ui/Input'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '../ThemeToggle'
import { Notifications } from '../Notifications'
import { RoleSelector } from '../RoleSelector'

/**
 * Professional Header Component
 * Features: Breadcrumbs, Search, Theme Toggle, Notifications, User Menu
 */
export default function Header() {
  const pathname = usePathname()
  
  const getPageInfo = () => {
    const routes: Record<string, { title: string; subtitle: string; breadcrumbs: string[] }> = {
      '/dashboard': { 
        title: 'Dashboard', 
        subtitle: 'Overview of your library management',
        breadcrumbs: ['Home', 'Dashboard']
      },
      '/books': { 
        title: 'Books Management', 
        subtitle: 'Manage your book catalog',
        breadcrumbs: ['Home', 'Books']
      },
      '/subjects': { 
        title: 'Subjects & Curriculum', 
        subtitle: 'Organize academic subjects',
        breadcrumbs: ['Home', 'Subjects']
      },
      '/analytics': { 
        title: 'Analytics & Reports', 
        subtitle: 'Data-driven insights',
        breadcrumbs: ['Home', 'Analytics']
      },
      '/settings': { 
        title: 'Settings & Administration', 
        subtitle: 'Configure your system',
        breadcrumbs: ['Home', 'Settings']
      },
    }
    
    return routes[pathname] || { 
      title: 'WNSS Library Admin', 
      subtitle: 'Professional library management',
      breadcrumbs: ['Home']
    }
  }

  const pageInfo = getPageInfo()

  return (
    <header className="
      h-16 
      bg-white dark:bg-[rgb(var(--surface))]
      border-b border-gray-200 dark:border-gray-700
      flex items-center justify-between 
      px-6
      theme-aware
      sticky top-0 z-40
      backdrop-blur-sm bg-white/95 dark:bg-[rgb(var(--surface))]/95
    ">
      {/* Page Info with Breadcrumbs */}
      <div className="flex-1 min-w-0">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
          {pageInfo.breadcrumbs.map((crumb, index) => (
            <div key={crumb} className="flex items-center">
              {index > 0 && <ChevronRight className="w-3 h-3 mx-1" />}
              <span className={index === pageInfo.breadcrumbs.length - 1 ? 'text-gray-900 dark:text-gray-100 font-medium' : ''}>
                {crumb}
              </span>
            </div>
          ))}
        </div>
        
        {/* Page Title */}
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
          {pageInfo.title}
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        {/* Search Bar - hidden on mobile */}
        <div className="hidden md:block w-64 lg:w-80">
          <Input
            icon={Search}
            placeholder="Search library..."
            className="w-full bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
          />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Dropdown */}
        <Notifications />

        {/* Role Selector with User Menu */}
        <RoleSelector />
      </div>
    </header>
  )
}
