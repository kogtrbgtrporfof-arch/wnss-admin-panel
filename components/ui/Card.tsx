import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={`p-6 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}

export function CardFooter({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={`p-6 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  )
}
