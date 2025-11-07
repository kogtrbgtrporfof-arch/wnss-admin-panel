'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Lock } from 'lucide-react'
import { DEMO_USERS, setCurrentUser } from '@/lib/roles'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    if (password === 'WNSS2026') {
      // Set authentication token in localStorage
      localStorage.setItem('authToken', 'true')
      // Set default user as Super Admin
      setCurrentUser(DEMO_USERS[0])
      router.push('/')
    } else {
      setError('Invalid password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <Lock className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">WNSS Library Admin</h1>
            <p className="text-gray-500 text-center">Enter your password to access the admin panel</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              icon={Lock}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') handleLogin()
              }}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button 
              onClick={handleLogin}
              className="w-full"
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
