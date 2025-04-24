"use client"

import Link from "next/link"
import { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
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
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, ArrowRight, Info } from "lucide-react"
import { useAuth } from "@/components/SessionProvider"

// Main signup form component - no search params usage
function SignupForm() {
  const router = useRouter()
  const { register } = useAuth()
  
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    termsAgreed: false
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    general: "",
    termsAgreed: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
    
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
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      valid = false
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      valid = false
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      valid = false
    }
    
    // Terms and Policy validation
    if (!formData.termsAgreed) {
      newErrors.termsAgreed = "You must agree to the Terms of Service and Privacy Policy"
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
      // Use local auth system to register user (now this doesn't auto-login)
      await register(formData.name, formData.email, formData.password);
      
      // Redirect to login page with success message
      router.push("/login?registered=true")
    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        general: error.message || "Registration failed. Please try again."
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
        <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-radial from-blue-500/20 to-transparent opacity-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-radial from-primary/20 to-transparent opacity-40 blur-3xl"></div>
        
        {/* Circuit pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('/circuit-pattern.svg')] bg-repeat"></div>
        
        {/* Animated elements */}
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
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
          
          <h1 className="text-4xl font-bold mb-4 text-white">Create Your <span className="text-primary">Account</span></h1>
          <p className="text-white/70 text-lg mb-8 max-w-sm">
            Join thousands of cricket fans and get access to AI-driven analytics, predictions, and exclusive content.
          </p>
          
          {/* Benefits with checkmarks */}
          <div className="space-y-4 mb-8 w-full">
            {[
              "Get real-time match predictions with 98% accuracy",
              "Exclusive access to detailed player statistics",
              "Personalized match notifications and alerts",
              "Join a community of cricket enthusiasts"
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <CheckCircle className="h-3 w-3 text-primary" />
                </div>
                <p className="text-sm text-white/80">{benefit}</p>
              </div>
            ))}
          </div>
          
          {/* App image or screenshot */}
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 w-full">
            <div className="text-white text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Why Sign Up?</h3>
              <p className="text-sm text-white/70 mb-4">
                Our AI-powered system delivers the most accurate predictions in the industry, helping you stay ahead of the game.
              </p>
              <div className="bg-primary/20 rounded-md p-2 text-sm">
                <span className="text-primary font-medium">Pro Tip:</span> 
                <span className="text-white/80"> Enable notifications to receive alerts for your favorite teams.</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side signup form */}
        <div className="w-full max-w-md lg:w-1/2 space-y-6">
          <Card className="border-white/10 shadow-xl backdrop-blur-sm bg-white/5">
            <CardHeader className="space-y-1 pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/20 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl text-white">Create Account</CardTitle>
              </div>
              <CardDescription className="text-white/60">
                Enter your information to create your account
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
                  <Label htmlFor="name" className="text-sm font-medium text-white/80">Full Name</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 h-11 bg-white/5 border-white/10 text-white focus:border-primary"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <User className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <span className="inline-block h-1 w-1 rounded-full bg-red-400"></span>
                      {errors.name}
                    </p>
                  )}
                </div>
                
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
                  <Label htmlFor="password" className="text-sm font-medium text-white/80">Password</Label>
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
                  <p className="text-xs text-white/50 mt-1">
                    Must be at least 8 characters long
                  </p>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-start space-x-2">
                    <input
                      id="termsAgreed"
                      name="termsAgreed"
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-white/30 bg-white/5 text-primary focus:ring-primary/80"
                      checked={formData.termsAgreed}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <label htmlFor="termsAgreed" className="text-xs text-white/70">
                      I agree to the <Link href="/terms" className="text-primary hover:text-primary/80 underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:text-primary/80 underline">Privacy Policy</Link>
                    </label>
                  </div>
                  {errors.termsAgreed && (
                    <p className="text-red-400 text-xs mt-1 ml-6 flex items-center gap-1">
                      <span className="inline-block h-1 w-1 rounded-full bg-red-400"></span>
                      {errors.termsAgreed}
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
                      <span>Create Account</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
                <p className="text-center text-sm text-white/60">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
                    Sign in
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

// Loading state for the signup form
function SignupFormLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse space-y-4 w-full max-w-md">
        <div className="h-8 bg-white/5 rounded w-1/3 mx-auto"></div>
        <div className="h-96 bg-white/5 rounded"></div>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupFormLoading />}>
      <SignupForm />
    </Suspense>
  )
} 