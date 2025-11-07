'use client'

import { Card, CardContent, CardHeader } from '../../components/ui/Card'
import { BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Library usage statistics and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg mr-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                <p className="text-2xl font-semibold text-gray-900">1,248</p>
                <p className="text-sm text-green-600">+12% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg mr-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">892</p>
                <p className="text-sm text-green-600">+8% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg mr-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Popular Subject</p>
                <p className="text-2xl font-semibold text-gray-900">Mathematics</p>
                <p className="text-sm text-gray-600">284 downloads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h3>
          <p className="text-gray-500">
            Detailed charts and analytics dashboard coming soon. Track book popularity, user engagement, and library performance metrics.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
