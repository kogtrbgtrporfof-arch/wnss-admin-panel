'use client'

import { Card, CardContent, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Settings, User, Lock, Bell, BookOpen } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Configure your admin panel preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Update your profile information, email, and password.
            </p>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Security</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Manage password, two-factor authentication, and security alerts.
            </p>
            <Button variant="outline" className="w-full">
              Security Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Configure how you receive notifications and alerts.
            </p>
            <Button variant="outline" className="w-full">
              Notification Preferences
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Library Preferences</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Set default book categories, featured books, and display options.
            </p>
            <Button variant="outline" className="w-full">
              Library Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
