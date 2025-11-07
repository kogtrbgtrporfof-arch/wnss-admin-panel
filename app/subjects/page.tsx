'use client'

import { Card, CardContent, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { School, Plus } from 'lucide-react'

export default function SubjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Subjects</h1>
          <p className="text-gray-500 mt-1">Manage academic subjects and categories</p>
        </div>
        <Button icon={Plus}>
          Add Subject
        </Button>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <School className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Subject Management</h3>
          <p className="text-gray-500 mb-6">
            Organize books by subject, assign icons and colors, and set display order.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-blue-600">O-Level Subjects</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">18</div>
              <div className="text-sm text-green-600">A-Level Subjects</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">32</div>
              <div className="text-sm text-purple-600">Total Subjects</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
