"use client"

import { useAuth } from '@/components/SessionProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, LogOut, Settings, Activity, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // If auth is still loading, wait
    if (loading) return
    
    // If user is not authenticated, redirect to login
    if (!user) {
      router.push('/login')
    } else {
      setIsLoading(false)
    }
  }, [loading, user, router])

  // If loading or redirecting, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black">
        <div className="animate-spin w-10 h-10 border-t-2 border-primary rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="md:col-span-1 bg-slate-800/50 border-slate-700 text-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-primary">User Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center pb-6">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4 border-2 border-primary">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-slate-400 mt-1">{user?.email}</p>
                
                <div className="mt-6 w-full">
                  <Button variant="outline" className="w-full bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700 hover:text-primary">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Stats & Recent Activity */}
            <Card className="md:col-span-2 bg-slate-800/50 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Account Overview
                </CardTitle>
                <CardDescription className="text-slate-400">
                  View your activity and account statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Joined</p>
                    <p className="text-lg font-medium">
                      {new Date().toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Account Status</p>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <p className="text-lg font-medium">Active</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-4 text-primary flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Recent Activity
                </h3>
                
                <div className="space-y-3">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="bg-slate-700/30 rounded-lg p-3 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Viewed match predictions</p>
                        <p className="text-slate-400 text-sm">{new Date(Date.now() - 1000 * 60 * 60 * index).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-4 flex justify-between border-t border-slate-700/50">
                <Button 
                  variant="ghost" 
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
                <Link href="/">
                  <Button variant="default" className="bg-primary hover:bg-primary/80">
                    View Dashboard
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 