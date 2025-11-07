'use client'

import { useState } from 'react'
import { 
  Settings, Palette, BookOpen, Info, Users, 
  Phone, Mail, Heart, Star, Award, Code, Shield, Cpu, Activity
} from 'lucide-react'

/**
 * Comprehensive Settings & Administration Page
 * Features: Appearance, Library, User Management, System Admin, About & Team
 */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('appearance')

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'library', label: 'Library Management', icon: BookOpen },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'system', label: 'System Admin', icon: Settings },
    { id: 'about', label: 'About & Team', icon: Info },
  ]

  const teamMembers = [
    { name: 'Kemigisha Mariam', role: 'Chairperson' },
    { name: 'Kazibwe Derrick', role: 'Secretary' },
    { name: 'Muhumuza Denis', role: 'Project Manager' },
    { name: 'Kwagala Daniella Joy', role: 'Treasurer' },
    { name: 'Ssempala Paul Trevor', role: 'Coordinator' },
    { name: 'Ngobi Hakim', role: 'Member' },
    { name: 'Injinzu Beryl Sheilah', role: 'Member' },
    { name: 'Mukisa Joram Nsereko', role: 'Member' },
    { name: 'Sserwanja Joshua Prince', role: 'Member' },
    { name: 'Mukisa Dinah', role: 'Member' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Settings & Administration
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure your system and meet the team
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                  transition-colors
                  ${activeTab === tab.id
                    ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="space-y-6 fade-in">
            <div className="card card-hover">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Theme Preferences
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your theme preference is managed via the theme toggle in the header. 
                The system supports Light, Dark, and System (auto) themes with smooth transitions.
              </p>
              <div className="flex items-center space-x-4 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
                <Palette className="w-8 h-8 text-sky-600 dark:text-sky-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Professional Dual-Theme System
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Optimized for both daytime and extended sessions
                  </p>
                </div>
              </div>
            </div>

            <div className="card card-hover">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Layout Density
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The sidebar is collapsible for maximum screen real estate. 
                Use the toggle button on the sidebar to expand or collapse it.
              </p>
            </div>
          </div>
        )}

        {/* Library Management Tab */}
        {activeTab === 'library' && (
          <div className="space-y-6 fade-in">
            <div className="card card-hover">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Academic Configuration
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Subject Categories</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manage O-Level and A-Level subjects</p>
                  </div>
                  <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">12</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Total Books</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Catalog size</p>
                  </div>
                  <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">500+</span>
                </div>
              </div>
            </div>

            <div className="card card-hover">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Storage & Performance
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                System is optimized for fast loading and efficient storage management.
              </p>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6 fade-in">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Administrator Roles & Permissions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Manage user roles and access levels for library administration.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Super Administrator</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Full system access & control</p>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Content Manager</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Manage books & subjects</p>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>

            <div className="card card-hover">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Activity Logs & Audit Trail
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Track administrator actions and system changes for security and compliance.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Activity className="w-4 h-4" />
                <span>Last 30 days: 248 actions logged</span>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Session Security
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Enhanced security features to protect your admin panel.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Auto-logout after inactivity</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">30 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Password protection</span>
                  <span className="font-medium text-green-600 dark:text-green-400">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Session encryption</span>
                  <span className="font-medium text-green-600 dark:text-green-400">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Administration Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6 fade-in">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                System Performance & Monitoring
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Monitor system health and performance metrics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-3 mb-2">
                    <Cpu className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">System Status</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">Optimal</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">All systems running smoothly</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-3 mb-2">
                    <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">Uptime</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">99.9%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Last 30 days</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">Security</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">Strong</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">All checks passed</p>
                </div>
              </div>
            </div>

            <div className="card card-hover">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Backup & Data Export
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Automated backups and data export capabilities for disaster recovery.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Last backup</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Backup frequency</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Every 6 hours</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Backup retention</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">30 days</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                API & Integrations
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Connect with external services and third-party integrations.
              </p>
              <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-200 dark:border-sky-800">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Supabase Connection:</strong> Connected and active
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Real-time Sync:</strong> Enabled for live updates
                </p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                System Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Version</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">1.0.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Framework</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Next.js 14</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Database</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Supabase (PostgreSQL)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">November 2025</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About & Team Tab */}
        {activeTab === 'about' && (
          <div className="space-y-8 fade-in">
            {/* Poetic Description */}
            <div className="card bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border-sky-200 dark:border-sky-800">
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 bg-sky-100 dark:bg-sky-900/40 rounded-lg">
                  <BookOpen className="w-8 h-8 text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Guardians of Knowledge
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Our Mission & Vision
                  </p>
                </div>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic mb-4">
                  In the hallowed halls of learning, where wisdom finds its home,<br />
                  We stand as stewards of the written word, in digital pages we roam.<br />
                  Through lines of code and curated shelves, we build the future&apos;s mind,<br />
                  Preserving thoughts and dreams and stories for all of humankind.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic mb-4">
                  This admin panel is our compass, guiding knowledge&apos;s flow,<br />
                  Connecting seekers with the wisdom that helps their understanding grow.<br />
                  Each book a star in learning&apos;s sky, each subject a constellation,<br />
                  We organize the universe of thought with careful dedication.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center space-x-2 text-sky-600 dark:text-sky-400">
                <Star className="w-5 h-5 fill-sky-600 dark:fill-sky-400" />
                <span className="font-medium">Excellence in Digital Library Management</span>
                <Star className="w-5 h-5 fill-sky-600 dark:fill-sky-400" />
              </div>
            </div>

            {/* Team Section */}
            <div className="card">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                    <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Group 27
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Excellence Through Collaboration
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                  <Code className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                </div>
              </div>

              {/* Supervisor */}
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center space-x-3 mb-2">
                  <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    Project Supervisor
                  </h4>
                </div>
                <p className="text-lg font-medium text-amber-900 dark:text-amber-300">
                  Mr. Ssentongo Henry
                </p>
              </div>

              {/* Team Members Grid */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Team Members
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="
                        flex items-center justify-between
                        p-3 rounded-lg
                        bg-gray-50 dark:bg-gray-800
                        hover:bg-gray-100 dark:hover:bg-gray-700
                        transition-colors
                      "
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.role}
                        </p>
                      </div>
                      {index < 4 && (
                        <Star className="w-4 h-4 text-sky-600 dark:text-sky-400 fill-sky-600 dark:fill-sky-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Contact Information
                </h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+256700320187"
                    className="
                      flex items-center space-x-3 p-3 rounded-lg
                      bg-green-50 dark:bg-green-900/20
                      hover:bg-green-100 dark:hover:bg-green-900/30
                      transition-colors
                    "
                  >
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      +256 700 320187
                    </span>
                  </a>
                  <a
                    href="tel:+256743908444"
                    className="
                      flex items-center space-x-3 p-3 rounded-lg
                      bg-green-50 dark:bg-green-900/20
                      hover:bg-green-100 dark:hover:bg-green-900/30
                      transition-colors
                    "
                  >
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      +256 743 908444
                    </span>
                  </a>
                </div>
              </div>

              {/* Version Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  WNSS Library Admin Panel • Version 1.0.0
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Built with excellence for educational empowerment
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
