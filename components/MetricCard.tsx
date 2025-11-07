'use client'

import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon: LucideIcon
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral'
}

/**
 * Professional Metric Card Component
 * Displays KPIs with trend indicators and icons
 */
export function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  subtitle,
  trend = 'neutral'
}: MetricCardProps) {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600 dark:text-green-400'
    if (trend === 'down') return 'text-red-600 dark:text-red-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  const getTrendBg = () => {
    if (trend === 'up') return 'bg-green-50 dark:bg-green-900/20'
    if (trend === 'down') return 'bg-red-50 dark:bg-red-900/20'
    return 'bg-gray-50 dark:bg-gray-800'
  }

  return (
    <div className="card card-hover group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${getTrendColor()}`}>
              {trend === 'up' && <TrendingUp className="w-4 h-4 mr-1" />}
              {trend === 'down' && <TrendingDown className="w-4 h-4 mr-1" />}
              <span className="font-medium">
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                vs last month
              </span>
            </div>
          )}

          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`
          p-3 rounded-lg 
          ${getTrendBg()}
          transition-transform duration-200
          group-hover:scale-110
        `}>
          <Icon className={`w-6 h-6 ${getTrendColor()}`} />
        </div>
      </div>
    </div>
  )
}
