'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  BookOpen, 
  Users, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  Plus,
  ArrowUp,
  ArrowDown,
  Settings 
} from 'lucide-react';
import { supabase, Book } from '@/lib/supabase';

interface DashboardStats {
  totalBooks: number
  activeUsers: number
  booksGrowth: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 0,
    activeUsers: 0,
    booksGrowth: 0
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

      setStats({
        totalBooks: booksCount || 0,
        activeUsers: 1248, // Mock data - you can replace with real user count
        booksGrowth: 12 // Mock growth percentage
      })

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

  const statCards = [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      change: stats.booksGrowth,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      change: 5,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome to WNSS Library Admin Panel</p>
          </div>
        </div>
        
        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome to WNSS Library Admin Panel</p>
        </div>
        <Button icon={Plus}>
          Add New Book
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          const isPositive = stat.change >= 0
          
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                      {stat.value.toLocaleString()}
                    </p>
                    <div className={`flex items-center mt-1 text-sm ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isPositive ? (
                        <ArrowUp className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 mr-1" />
                      )}
                      <span>{Math.abs(stat.change)}% from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Recent Books */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Books</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBooks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No books added yet</p>
                </div>
              ) : (
                recentBooks.map((book) => (
                  <div key={book.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{book.title}</p>
                      <p className="text-sm text-gray-500 truncate">{book.author} • {book.subject}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      book.level === 'O' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {book.level}-Level
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <BookOpen className="w-5 h-5 mb-1" />
              <span>Add Book</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <TrendingUp className="w-5 h-5 mb-1" />
              <span>Analytics</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Settings className="w-5 h-5 mb-1" />
              <span>Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
