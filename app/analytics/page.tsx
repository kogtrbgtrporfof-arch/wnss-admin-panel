'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MetricCard } from '@/components/MetricCard'
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  BookOpen,
  Calendar,
  FileDown,
  Eye,
  Star,
  Award
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

/**
 * Professional Analytics Hub
 * Data-driven insights for library management
 */
export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')

  // Sample data for charts
  const usageData = [
    { name: 'Mon', downloads: 45, views: 120 },
    { name: 'Tue', downloads: 52, views: 145 },
    { name: 'Wed', downloads: 48, views: 132 },
    { name: 'Thu', downloads: 61, views: 168 },
    { name: 'Fri', downloads: 55, views: 152 },
    { name: 'Sat', downloads: 38, views: 98 },
    { name: 'Sun', downloads: 42, views: 110 },
  ]

  const subjectData = [
    { name: 'Mathematics', value: 284, color: '#0ea5e9' },
    { name: 'Physics', value: 198, color: '#8b5cf6' },
    { name: 'Chemistry', value: 176, color: '#10b981' },
    { name: 'Biology', value: 164, color: '#f59e0b' },
    { name: 'English', value: 142, color: '#ef4444' },
    { name: 'Others', value: 284, color: '#6b7280' },
  ]

  const topBooks = [
    { title: 'Advanced Mathematics', downloads: 234, views: 1240, rating: 4.8 },
    { title: 'Physics Fundamentals', downloads: 198, views: 1105, rating: 4.7 },
    { title: 'Chemistry Basics', downloads: 176, views: 982, rating: 4.6 },
    { title: 'Biology Guide', downloads: 164, views: 876, rating: 4.5 },
    { title: 'English Literature', downloads: 142, views: 745, rating: 4.4 },
  ]

  const levelDistribution = [
    { name: 'O-Level', value: 620, color: '#3b82f6' },
    { name: 'A-Level', value: 628, color: '#8b5cf6' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Analytics & Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track library performance and user engagement
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                timeRange === 'week'
                  ? 'bg-sky-600 dark:bg-sky-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                timeRange === 'month'
                  ? 'bg-sky-600 dark:bg-sky-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                timeRange === 'year'
                  ? 'bg-sky-600 dark:bg-sky-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Year
            </button>
          </div>
          <Button variant="outline" className="hidden md:flex">
            <FileDown className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Downloads"
          value="1,248"
          change={12}
          icon={Download}
          subtitle="This month"
          trend="up"
        />
        <MetricCard
          title="Page Views"
          value="3,456"
          change={8}
          icon={Eye}
          subtitle="This month"
          trend="up"
        />
        <MetricCard
          title="Avg. Rating"
          value="4.6"
          change={2}
          icon={Star}
          subtitle="Out of 5.0"
          trend="up"
        />
        <MetricCard
          title="Top Subject"
          value="Math"
          icon={Award}
          subtitle="284 downloads"
          trend="neutral"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trends */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-sky-100 dark:bg-sky-900/40 rounded-lg">
                <TrendingUp className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Usage Trends
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Downloads vs Page Views
                </p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="downloads" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                name="Downloads"
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Views"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Distribution */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Popular Subjects
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  By downloads
                </p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subjectData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Level Distribution & Top Books */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Level Distribution */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Level Distribution
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                O-Level vs A-Level
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={levelDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {levelDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Books */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
              <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Top Performing Books
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Most popular this month
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {topBooks.map((book, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {book.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {book.downloads} downloads • {book.views} views
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {book.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
