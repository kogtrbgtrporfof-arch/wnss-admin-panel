'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, Check, X, BookOpen, Users, AlertCircle, CheckCircle } from 'lucide-react'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  time: string
  read: boolean
}

/**
 * Notifications Dropdown Component
 * Displays system notifications with mark as read functionality
 */
export function Notifications() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'New book added',
      message: 'Advanced Mathematics has been successfully added to the library.',
      time: '5 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'System update',
      message: 'The admin panel has been updated to version 1.0.1.',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'Storage warning',
      message: 'You are using 85% of your storage quota.',
      time: '2 hours ago',
      read: false
    },
    {
      id: '4',
      type: 'success',
      title: 'Book updated',
      message: 'Physics Fundamentals has been updated successfully.',
      time: '1 day ago',
      read: true
    },
  ])

  const dropdownRef = useRef<HTMLDivElement>(null)
  const unreadCount = notifications.filter(n => !n.read).length

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
      default:
        return <Bell className="w-5 h-5 text-sky-600 dark:text-sky-400" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20'
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-900/20'
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20'
      default:
        return 'bg-sky-50 dark:bg-sky-900/20'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          relative p-2 
          text-gray-600 dark:text-gray-400
          hover:text-gray-900 dark:hover:text-gray-100
          hover:bg-gray-100 dark:hover:bg-gray-800
          rounded-lg transition-colors
        "
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="
            absolute -top-1 -right-1
            w-5 h-5
            bg-red-600 dark:bg-red-500
            text-white
            text-xs font-bold
            rounded-full
            flex items-center justify-center
            border-2 border-white dark:border-gray-900
          ">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="
          absolute right-0 mt-2 w-96
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          rounded-lg shadow-lg
          z-50
          animate-fadeIn
        ">
          {/* Header */}
          <div className="
            flex items-center justify-between
            p-4 border-b border-gray-200 dark:border-gray-700
          ">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="
                  text-sm text-sky-600 dark:text-sky-400
                  hover:text-sky-700 dark:hover:text-sky-300
                  font-medium
                "
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  No notifications
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  You're all caught up!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`
                      p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50
                      transition-colors relative group
                      ${!notification.read ? 'bg-sky-50/50 dark:bg-sky-900/10' : ''}
                    `}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                        {getIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-sky-600 dark:bg-sky-400 rounded-full ml-2 mt-1.5" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          {notification.time}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="
                              p-1.5 text-gray-400 hover:text-green-600 dark:hover:text-green-400
                              hover:bg-green-50 dark:hover:bg-green-900/20
                              rounded transition-colors
                            "
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="
                            p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400
                            hover:bg-red-50 dark:hover:bg-red-900/20
                            rounded transition-colors
                          "
                          title="Delete"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="
              p-3 border-t border-gray-200 dark:border-gray-700
              text-center
            ">
              <button className="
                text-sm text-sky-600 dark:text-sky-400
                hover:text-sky-700 dark:hover:text-sky-300
                font-medium
              ">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
