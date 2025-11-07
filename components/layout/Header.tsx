'use client'

import { Bell, Search, User, Menu } from 'lucide-react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  
  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard'
    if (pathname === '/books') return 'Books'
    if (pathname === '/subjects') return 'Subjects'
    if (pathname === '/analytics') return 'Analytics'
    if (pathname === '/settings') return 'Settings'
    return 'WNSS Library Admin'
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{getPageTitle()}</h1>
        <p className="text-gray-500 text-sm">Welcome to WNSS Library Admin</p>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="w-80">
          <Input
            icon={Search}
            placeholder="Search books, requests, users..."
            className="w-full"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-700" />
          </div>
        </div>
      </div>
    </header>
  )
}
