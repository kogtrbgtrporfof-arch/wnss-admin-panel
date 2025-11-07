'use client'

import { useRouter, usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  FileText, 
  BarChart3, 
  Settings,
  LogOut,
  School
} from 'lucide-react'
import { Button } from '../ui/Button'

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Books', href: '/books', icon: BookOpen },
  { name: 'Subjects', href: '/subjects', icon: School },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white h-screen flex flex-col border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-lg">WNSS Library</h1>
            <p className="text-primary-600 text-xs font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-700 text-sm font-medium">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">Administrator</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start" icon={LogOut}>
          Logout
        </Button>
      </div>
    </div>
  )
}
