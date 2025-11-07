import { LucideIcon } from 'lucide-react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: LucideIcon
  label?: string
  error?: string
}

export function Select({ icon: Icon, label, error, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <select
          className={`
            w-full
            ${Icon ? 'pl-10' : 'pl-3'}
            pr-10
            py-2.5
            text-sm
            border
            border-gray-300
            rounded-lg
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            outline-none
            transition-colors
            bg-white
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
