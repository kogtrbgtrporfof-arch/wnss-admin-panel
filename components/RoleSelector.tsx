'use client'

import { useState, useEffect } from 'react'
import { User, Shield, Eye } from 'lucide-react'
import { getCurrentUser, setCurrentUser, DEMO_USERS, UserRole, getUserPermissions } from '@/lib/roles'

/**
 * Role Selector Component
 * Allows switching between user roles for testing
 */
export function RoleSelector() {
  const [currentUser, setCurrentUserState] = useState(getCurrentUser())
  const [isOpen, setIsOpen] = useState(false)

  const selectRole = (user: typeof DEMO_USERS[0]) => {
    setCurrentUser(user)
    setCurrentUserState(user)
    setIsOpen(false)
    // Reload page to apply permissions
    window.location.reload()
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return <Shield className="w-4 h-4" />
      case 'content_manager':
        return <User className="w-4 h-4" />
      case 'viewer':
        return <Eye className="w-4 h-4" />
    }
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return 'bg-gradient-to-br from-sky-400 to-blue-600'
      case 'content_manager':
        return 'bg-gradient-to-br from-green-400 to-emerald-600'
      case 'viewer':
        return 'bg-gradient-to-br from-gray-400 to-gray-600'
    }
  }

  const getRoleName = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin'
      case 'content_manager':
        return 'Content Manager'
      case 'viewer':
        return 'Viewer'
    }
  }

  if (!currentUser) return null

  const permissions = getUserPermissions(currentUser.role)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center space-x-3 
          px-3 py-2 rounded-lg
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition-colors
          border border-gray-200 dark:border-gray-700
          focus-ring
        "
      >
        <div className={`w-8 h-8 ${getRoleColor(currentUser.role)} rounded-full flex items-center justify-center shadow-md`}>
          {getRoleIcon(currentUser.role)}
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {currentUser.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {getRoleName(currentUser.role)}
          </p>
        </div>
      </button>

      {isOpen && (
        <div className="
          absolute right-0 mt-2 w-80
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          rounded-lg shadow-lg
          z-50
          animate-fadeIn
        ">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Switch Role (Demo)
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Test different permission levels
            </p>
          </div>

          <div className="p-2">
            {DEMO_USERS.map((user) => (
              <button
                key={user.id}
                onClick={() => selectRole(user)}
                className={`
                  w-full p-3 rounded-lg text-left
                  hover:bg-gray-50 dark:hover:bg-gray-700
                  transition-colors
                  ${currentUser.id === user.id ? 'bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800' : ''}
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${getRoleColor(user.role)} rounded-full flex items-center justify-center`}>
                    {getRoleIcon(user.role)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                  {currentUser.id === user.id && (
                    <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                      Active
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Current Permissions:
            </h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Manage Books</span>
                <span className={permissions.canManageBooks ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {permissions.canManageBooks ? '✓' : '✗'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Manage Subjects</span>
                <span className={permissions.canManageSubjects ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {permissions.canManageSubjects ? '✓' : '✗'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Manage Users</span>
                <span className={permissions.canManageUsers ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {permissions.canManageUsers ? '✓' : '✗'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Access Settings</span>
                <span className={permissions.canAccessSettings ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {permissions.canAccessSettings ? '✓' : '✗'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
