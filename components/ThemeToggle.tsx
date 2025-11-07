'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

/**
 * Professional Theme Toggle Component
 * Elegant sun/moon transition with system preference support
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-transparent" />
    )
  }

  const getNextTheme = () => {
    if (theme === 'light') return 'dark'
    if (theme === 'dark') return 'system'
    return 'light'
  }

  const getIcon = () => {
    if (theme === 'light') return <Sun className="w-5 h-5" />
    if (theme === 'dark') return <Moon className="w-5 h-5" />
    return <Monitor className="w-5 h-5" />
  }

  const getLabel = () => {
    if (theme === 'light') return 'Light mode'
    if (theme === 'dark') return 'Dark mode'
    return 'System mode'
  }

  return (
    <button
      onClick={() => setTheme(getNextTheme())}
      className="
        relative w-10 h-10 rounded-lg
        bg-transparent hover:bg-black/5 dark:hover:bg-white/5
        border border-gray-200 dark:border-gray-700
        flex items-center justify-center
        transition-all duration-200
        group focus-ring
      "
      aria-label={`Switch to ${getNextTheme()} theme (current: ${theme})`}
      title={getLabel()}
    >
      <div className="transform transition-transform duration-300 group-hover:scale-110">
        {getIcon()}
      </div>
      
      {/* Tooltip */}
      <div className="
        absolute -bottom-10 left-1/2 -translate-x-1/2
        px-2 py-1 rounded text-xs font-medium
        bg-gray-900 dark:bg-gray-100
        text-white dark:text-gray-900
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        pointer-events-none whitespace-nowrap
        shadow-lg
      ">
        {getLabel()}
      </div>
    </button>
  )
}
