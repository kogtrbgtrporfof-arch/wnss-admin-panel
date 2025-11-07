import { InputHTMLAttributes, forwardRef } from 'react'
import { LucideIcon } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: LucideIcon
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          )}
          <input
            ref={ref}
            className={`
              w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              disabled:bg-gray-50 disabled:text-gray-500
              ${Icon ? 'pl-10' : 'pl-3'}
              ${error ? 'border-red-300' : 'border-gray-300'}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
