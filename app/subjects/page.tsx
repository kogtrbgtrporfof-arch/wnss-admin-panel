'use client'

import { useState } from 'react'
import { 
  School, 
  Plus, 
  Calculator, 
  Beaker, 
  Globe2, 
  Book,
  Languages,
  Atom,
  TrendingUp,
  Cpu,
  Heart,
  Music,
  Palette,
  Users
} from 'lucide-react'
import { MetricCard } from '@/components/MetricCard'

interface Subject {
  name: string
  level: 'O' | 'A'
  icon: any
  color: string
  bookCount: number
}

/**
 * Professional Subjects & Curriculum Management
 * Organize academic subjects with visual categorization
 */
export default function SubjectsPage() {
  const [activeLevel, setActiveLevel] = useState<'all' | 'O' | 'A'>('all')

  const oLevelSubjects: Subject[] = [
    { name: 'Mathematics', level: 'O', icon: Calculator, color: 'sky', bookCount: 45 },
    { name: 'English Language', level: 'O', icon: Book, color: 'purple', bookCount: 38 },
    { name: 'Physics', level: 'O', icon: Atom, color: 'blue', bookCount: 32 },
    { name: 'Chemistry', level: 'O', icon: Beaker, color: 'green', bookCount: 28 },
    { name: 'Biology', level: 'O', icon: Heart, color: 'red', bookCount: 30 },
    { name: 'Geography', level: 'O', icon: Globe2, color: 'emerald', bookCount: 25 },
    { name: 'History', level: 'O', icon: Book, color: 'amber', bookCount: 22 },
    { name: 'Computer Science', level: 'O', icon: Cpu, color: 'indigo', bookCount: 20 },
  ]

  const aLevelSubjects: Subject[] = [
    { name: 'Mathematics', level: 'A', icon: Calculator, color: 'sky', bookCount: 35 },
    { name: 'Physics', level: 'A', icon: Atom, color: 'blue', bookCount: 28 },
    { name: 'Chemistry', level: 'A', icon: Beaker, color: 'green', bookCount: 25 },
    { name: 'Biology', level: 'A', icon: Heart, color: 'red', bookCount: 24 },
    { name: 'Economics', level: 'A', icon: TrendingUp, color: 'orange', bookCount: 22 },
    { name: 'Computer Science', level: 'A', icon: Cpu, color: 'indigo', bookCount: 18 },
    { name: 'Literature', level: 'A', icon: Book, color: 'purple', bookCount: 20 },
    { name: 'Geography', level: 'A', icon: Globe2, color: 'emerald', bookCount: 16 },
  ]

  const allSubjects = [...oLevelSubjects, ...aLevelSubjects]
  const filteredSubjects = activeLevel === 'all' 
    ? allSubjects 
    : allSubjects.filter(s => s.level === activeLevel)

  const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border') => {
    const colors: Record<string, Record<string, string>> = {
      sky: { bg: 'bg-sky-100 dark:bg-sky-900/30', text: 'text-sky-600 dark:text-sky-400', border: 'border-sky-200 dark:border-sky-800' },
      purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
      blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
      green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', border: 'border-green-200 dark:border-green-800' },
      red: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', border: 'border-red-200 dark:border-red-800' },
      emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
      amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' },
      indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-800' },
      orange: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' },
    }
    return colors[color]?.[variant] || colors['sky'][variant]
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Subjects & Curriculum
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Organize academic subjects for O-Level and A-Level education
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="O-Level Subjects"
          value={oLevelSubjects.length}
          icon={School}
          subtitle="Ordinary Level curriculum"
          trend="neutral"
        />
        <MetricCard
          title="A-Level Subjects"
          value={aLevelSubjects.length}
          icon={School}
          subtitle="Advanced Level curriculum"
          trend="neutral"
        />
        <MetricCard
          title="Total Books"
          value={allSubjects.reduce((acc, s) => acc + s.bookCount, 0)}
          change={8}
          icon={Book}
          subtitle="Across all subjects"
          trend="up"
        />
      </div>

      {/* Level Filter */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
          Filter:
        </span>
        <button
          onClick={() => setActiveLevel('all')}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${activeLevel === 'all'
              ? 'bg-sky-600 dark:bg-sky-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          All Subjects
        </button>
        <button
          onClick={() => setActiveLevel('O')}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${activeLevel === 'O'
              ? 'bg-blue-600 dark:bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          O-Level Only
        </button>
        <button
          onClick={() => setActiveLevel('A')}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${activeLevel === 'A'
              ? 'bg-purple-600 dark:bg-purple-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          A-Level Only
        </button>
      </div>

      {/* Subjects Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {activeLevel === 'all' ? 'All Subjects' : activeLevel === 'O' ? 'O-Level Subjects' : 'A-Level Subjects'} 
          <span className="text-gray-500 dark:text-gray-400 ml-2">({filteredSubjects.length})</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSubjects.map((subject, index) => {
            const Icon = subject.icon
            return (
              <div
                key={`${subject.name}-${subject.level}-${index}`}
                className={`
                  card card-hover group cursor-pointer
                  border-2 ${getColorClasses(subject.color, 'border')}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    p-3 rounded-lg
                    ${getColorClasses(subject.color, 'bg')}
                    transition-transform duration-200
                    group-hover:scale-110
                  `}>
                    <Icon className={`w-6 h-6 ${getColorClasses(subject.color, 'text')}`} />
                  </div>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${subject.level === 'O'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    }
                  `}>
                    {subject.level}-Level
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {subject.name}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {subject.bookCount} books
                  </span>
                  <span className={`font-medium ${getColorClasses(subject.color, 'text')}`}>
                    Active
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Info Card */}
      <div className="card bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border-sky-200 dark:border-sky-800">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-sky-100 dark:bg-sky-900/40 rounded-lg">
            <School className="w-6 h-6 text-sky-600 dark:text-sky-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Professional Curriculum Organization
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Subjects are organized by academic level (O-Level and A-Level) with color-coded categorization 
              for easy navigation. Each subject contains carefully curated books and resources.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                Visual categorization
              </span>
              <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                Real-time book counts
              </span>
              <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                Easy management
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
