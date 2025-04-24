"use client"

import Link from "next/link"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Card,
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRight, CheckCircle2, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/SessionProvider"

// Component that uses search params - isolated to handle Suspense properly
function RegistrationSuccess() {
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered")
  
  if (!registered) return null
  
  return (
    <Alert className="bg-green-500/20 text-green-400 border border-green-500/40 animate-fade-in backdrop-blur-sm">
      <div className="flex gap-2 items-center">
        <CheckCircle2 className="h-5 w-5 text-green-400" />
        <AlertDescription className="text-green-400">
          Account created successfully! Please log in.
        </AlertDescription>
      </div>
    </Alert>
  )
}

// Login form component without search params
function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear errors when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
    
    // Clear general error when any field changes
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: "" }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      valid = false
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    }
    
    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      // Use our local auth system instead of NextAuth
      await login(formData.email, formData.password)
      
      // Successful login - redirect to homepage
      router.push("/")
    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        general: error.message || "Invalid email or password. Please try again."
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-background/80 to-background"></div>
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-radial from-blue-500/20 to-transparent opacity-40 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-radial from-primary/20 to-transparent opacity-40 blur-3xl"></div>
        
        {/* Circuit pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('/circuit-pattern.svg')] bg-repeat"></div>
        
        {/* Animated elements */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-8 min-h-screen relative z-10">
        {/* Left side branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col items-center lg:items-start lg:pr-12 max-w-md">
          {/* Logo and branding */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="relative w-12 h-12 bg-primary rounded-xl overflow-hidden flex items-center justify-center shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-3xl text-white">
                  <span className="text-primary">Happy</span>Cricket
                </span>
              </div>
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-white">Welcome <span className="text-primary">Back!</span></h1>
          <p className="text-white/70 text-lg mb-8 max-w-sm">
            Sign in to access your personalized cricket analytics, match predictions, and exclusive content.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8 w-full">
            {/* Feature highlights */}
            {[
              { title: "AI Predictions", desc: "98% accuracy" },
              { title: "Live Analysis", desc: "Real-time updates" },
              { title: "Match Insights", desc: "Advanced statistics" },
              { title: "Player Metrics", desc: "Performance tracking" }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <h3 className="font-medium text-white">{feature.title}</h3>
                <p className="text-sm text-white/60">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10 w-full">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-4 w-4 fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              ))}
            </div>
            <p className="text-white/80 text-sm italic mb-3">"The predictions are incredibly accurate. This platform has completely changed how I watch cricket matches!"</p>
            <p className="text-white font-medium text-sm">Rahul Sharma</p>
            <p className="text-white/60 text-xs">Cricket Enthusiast</p>
          </div>
        </div>
        
        {/* Right side login form */}
        <div className="w-full max-w-md lg:w-1/2 space-y-6">
          {/* Registration success alert will be rendered by RegistrationSuccess component */}
          <Suspense fallback={null}>
            <RegistrationSuccess />
          </Suspense>
          
          <Card className="border-white/10 shadow-xl backdrop-blur-sm bg-white/5">
            <CardHeader className="space-y-1 pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/20 rounded-full">
                  <LogIn className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl text-white">Sign In</CardTitle>
              </div>
              <CardDescription className="text-white/60">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                {errors.general && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-md text-sm animate-shake">
                    {errors.general}
                  </div>
                )}
              
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-white/80">Email Address</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 h-11 bg-white/5 border-white/10 text-white focus:border-primary"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <span className="inline-block h-1 w-1 rounded-full bg-red-400"></span>
                      {errors.email}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-white/80">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:text-primary/80 font-medium">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-11 bg-white/5 border-white/10 text-white focus:border-primary"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                    
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-white/40 hover:text-white/60"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <span className="inline-block h-1 w-1 rounded-full bg-red-400"></span>
                      {errors.password}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-2">
                <Button 
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-white animate-dot1"></div>
                      <div className="h-2 w-2 rounded-full bg-white animate-dot2"></div>
                      <div className="h-2 w-2 rounded-full bg-white animate-dot3"></div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Sign In</span> 
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
                <p className="text-center text-sm text-white/60">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-primary hover:text-primary/80 font-medium">
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Loading state for the login form
function LoginFormLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse space-y-4 w-full max-w-md">
        <div className="h-8 bg-white/5 rounded w-1/3 mx-auto"></div>
        <div className="h-96 bg-white/5 rounded"></div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormLoading />}>
      <LoginForm />
    </Suspense>
  )
} 