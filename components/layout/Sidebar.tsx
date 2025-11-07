'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings,
  LogOut,
  School,
  ChevronLeft,
  ChevronRight,
  Heart
} from 'lucide-react'
import { Button } from '../ui/Button'
import Image from 'next/image'

const menuItems = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard,
    description: 'Overview & metrics'
  },
  { 
    name: 'Books', 
    href: '/books', 
    icon: BookOpen,
    description: 'Manage catalog'
  },
  { 
    name: 'Subjects', 
    href: '/subjects', 
    icon: School,
    description: 'Curriculum organization'
  },
  { 
    name: 'Analytics', 
    href: '/analytics', 
    icon: BarChart3,
    description: 'Insights & reports'
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings,
    description: 'System configuration'
  },
]

/**
 * Professional Sidebar Component
 * Features: Collapsible, Logo integration, Team signature, Active states
 */
export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    router.push('/login')
  }

  return (
    <aside className={`
      ${isCollapsed ? 'w-20' : 'w-64'}
      bg-white dark:bg-[rgb(var(--surface))]
      h-screen flex flex-col 
      border-r border-gray-200 dark:border-gray-700
      theme-aware
      transition-all duration-300
      relative
    `}>
      {/* Logo Section */}
      <div className={`
        ${isCollapsed ? 'p-4' : 'p-6'}
        border-b border-gray-200 dark:border-gray-700
        transition-all duration-300
      `}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          {/* WNSS Logo */}
          <div className="
            w-10 h-10 
            rounded-lg 
            shadow-lg
            relative
            overflow-hidden
            border-2 border-white dark:border-gray-700
          ">
            <Image
              src="/logo.jpg"
              alt="WNSS Library Logo"
              width={40}
              height={40}
              className="object-cover"
              priority
            />
            {/* Subtle glow effect in dark mode */}
            <div className="absolute inset-0 bg-sky-400 dark:bg-sky-500 rounded-lg blur-md opacity-0 dark:opacity-20 -z-10" />
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-gray-900 dark:text-gray-100 text-lg truncate">
                WNSS Library
              </h1>
              <p className="text-sky-600 dark:text-sky-400 text-xs font-medium">
                Admin Panel
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto ${isCollapsed ? 'p-2' : 'p-4'}`}>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => router.push(item.href)}
                  className={`
                    w-full flex items-center 
                    ${isCollapsed ? 'justify-center px-3 py-3' : 'space-x-3 px-3 py-2.5'}
                    rounded-lg 
                    transition-all duration-200
                    group relative
                    ${isActive
                      ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }
                  `}
                  title={isCollapsed ? item.name : ''}
                >
                  <Icon className={`
                    w-5 h-5 
                    ${isActive ? 'text-sky-600 dark:text-sky-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'}
                    transition-colors
                  `} />
                  
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <span className="font-medium text-sm">{item.name}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {item.description}
                      </p>
                    </div>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="
                      absolute left-full ml-2 
                      px-3 py-2 rounded-lg
                      bg-gray-900 dark:bg-gray-100
                      text-white dark:text-gray-900
                      text-sm font-medium
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200
                      pointer-events-none
                      whitespace-nowrap
                      shadow-lg z-50
                    ">
                      {item.name}
                    </div>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Team Signature - Only visible when expanded */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>by</span>
            <span className="font-semibold text-sky-600 dark:text-sky-400">Group 27</span>
          </div>
        </div>
      )}

      {/* User Profile & Logout */}
      <div className={`
        ${isCollapsed ? 'p-2' : 'p-4'}
        border-t border-gray-200 dark:border-gray-700
      `}>
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className={`
            w-full 
            ${isCollapsed ? 'justify-center px-3 py-3' : 'justify-start'}
            text-red-600 dark:text-red-400
            hover:bg-red-50 dark:hover:bg-red-900/20
          `}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="
          absolute -right-3 top-20
          w-6 h-6 
          bg-white dark:bg-gray-700
          border border-gray-200 dark:border-gray-600
          rounded-full
          flex items-center justify-center
          shadow-md
          hover:shadow-lg
          transition-all duration-200
          hover:scale-110
          focus-ring
          z-50
        "
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        )}
      </button>
    </aside>
  )
}
