'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BookOpen, 
  School,
  TrendingUp,
  Plus,
  ArrowRight,
  BarChart3,
  Settings,
  Sparkles,
  Activity,
  Database
} from 'lucide-react'
import { supabase, Book } from '@/lib/supabase'
import { MetricCard } from '@/components/MetricCard'
import { Button } from '@/components/ui/Button'

interface DashboardStats {
  totalBooks: number
  activeSubjects: number
  storageUsed: string
  recentActivity: number
}

/**
 * Professional Dashboard
 * Overview of library management with analytics and quick actions
 */
export default function Dashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 0,
    activeSubjects: 12,
    storageUsed: '2.4 GB',
    recentActivity: 48
  })
  const [recentBooks, setRecentBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  async function loadDashboardData() {
    try {
      setLoading(true)

      // Load books count
      const { count: booksCount, error: booksError } = await supabase
        .from('books')
        .select('*', { count: 'exact', head: true })

      if (booksError) throw booksError

      setStats(prev => ({
        ...prev,
        totalBooks: booksCount || 0
      }))

      // Load recent books
      const { data: books, error: booksDataError } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (booksDataError) throw booksDataError
      setRecentBooks(books || [])
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-24"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-sky-600 dark:text-sky-400" />
            Library Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Professional management for educational excellence
          </p>
        </div>
        <Button 
          onClick={() => router.push('/books')}
          className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Book
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Books"
          value={stats.totalBooks}
          change={12}
          icon={BookOpen}
          subtitle="In library catalog"
          trend="up"
        />
        <MetricCard
          title="Active Subjects"
          value={stats.activeSubjects}
          change={3}
          icon={School}
          subtitle="O & A Level categories"
          trend="up"
        />
        <MetricCard
          title="Storage Used"
          value={stats.storageUsed}
          icon={Database}
          subtitle="Of 10 GB available"
          trend="neutral"
        />
        <MetricCard
          title="Recent Activity"
          value={stats.recentActivity}
          change={8}
          icon={Activity}
          subtitle="Actions this week"
          trend="up"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Books - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sky-100 dark:bg-sky-900/40 rounded-lg">
                  <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Recently Added Books
                </h2>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/books')}
                className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              {recentBooks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">No books added yet</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Start building your library catalog
                  </p>
                  <Button 
                    onClick={() => router.push('/books')}
                    className="mt-4"
                    variant="outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Book
                  </Button>
                </div>
              ) : (
                recentBooks.map((book) => (
                  <div 
                    key={book.id} 
                    className="
                      flex items-center justify-between 
                      p-4 rounded-lg
                      bg-gray-50 dark:bg-gray-800
                      hover:bg-gray-100 dark:hover:bg-gray-700
                      transition-colors
                      group cursor-pointer
                    "
                  >
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {book.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {book.author} • {book.subject}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${book.level === 'O' 
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                          : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        }
                      `}>
                        {book.level}-Level
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Quick Actions
              </h2>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/books')}
                className="
                  w-full flex items-center justify-between
                  p-4 rounded-lg
                  bg-sky-50 dark:bg-sky-900/20
                  hover:bg-sky-100 dark:hover:bg-sky-900/30
                  transition-colors group
                "
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Manage Books
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => router.push('/subjects')}
                className="
                  w-full flex items-center justify-between
                  p-4 rounded-lg
                  bg-green-50 dark:bg-green-900/20
                  hover:bg-green-100 dark:hover:bg-green-900/30
                  transition-colors group
                "
              >
                <div className="flex items-center space-x-3">
                  <School className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Manage Subjects
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => router.push('/analytics')}
                className="
                  w-full flex items-center justify-between
                  p-4 rounded-lg
                  bg-amber-50 dark:bg-amber-900/20
                  hover:bg-amber-100 dark:hover:bg-amber-900/30
                  transition-colors group
                "
              >
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    View Analytics
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => router.push('/settings')}
                className="
                  w-full flex items-center justify-between
                  p-4 rounded-lg
                  bg-gray-50 dark:bg-gray-800
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  transition-colors group
                "
              >
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Settings
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="card bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border-sky-200 dark:border-sky-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-sky-100 dark:bg-sky-900/40 rounded-lg">
                <TrendingUp className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                System Status
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Performance</span>
                <span className="font-medium text-green-600 dark:text-green-400">Optimal</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Last Backup</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Uptime</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">99.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
