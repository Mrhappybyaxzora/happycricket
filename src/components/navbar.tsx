"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, LogIn, UserPlus, Home, Calendar, Info, TrendingUp, Settings, User, Trophy, X } from "lucide-react"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from '@/components/SessionProvider'
import { useNavigationLoading } from './navigation-loading-provider'
import { useState } from "react"

// Define navigation links
// NOTE: Do not add "Points Table" link here as it causes hydration errors
const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/matches", label: "Matches", icon: Calendar },
  { href: "/fantasy", label: "Fantasy Cricket", icon: Trophy },
  // Deliberately not including points-table to avoid hydration issues
]

const authLinks = [
  { href: "/login", label: "Login", icon: LogIn },
  { href: "/signup", label: "Sign Up", icon: UserPlus },
]

// Interface for NavLink props with optional onClick
interface NavLinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  [x: string]: any;
}

// Enhanced Link component that triggers loading animation
function NavLink({ href, className, children, onClick, ...props }: NavLinkProps) {
  const { startLoading } = useNavigationLoading();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger for external links
    if (!href.startsWith('/') && !href.startsWith('#')) return;
    
    // Don't trigger for anchor links on the same page
    if (href.startsWith('#') && window.location.pathname === window.location.pathname) return;
    
    // Execute any additional onClick handler if provided
    if (onClick) onClick(e);
    
    // Just trigger loading indicator - let the navigation happen naturally
    startLoading();
  };
  
  return (
    <Link 
      href={href} 
      className={className} 
      onClick={handleClick} 
      data-navigation="true"
      {...props}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  
  // Function to close the mobile menu
  const closeMenu = () => {
    setIsOpen(false)
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 h-16 flex items-center justify-between mx-auto">
        {/* Logo - centered on mobile, left-aligned on larger screens */}
        <div className="flex md:w-1/4 justify-start">
          <NavLink href="/" className="flex items-center transition-all hover:opacity-80">
            <span className="font-bold text-xl md:text-2xl">
              <span className="text-primary">Happy</span>Cricket
            </span>
          </NavLink>
        </div>
        
        {/* Nav links - centered and hidden on mobile, visible on larger screens */}
        <nav className="hidden md:flex md:w-2/4 items-center justify-center space-x-8">
          {/* Render only the defined nav links - no additional links should be added here */}
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className={`relative py-1 transition-colors font-medium hover:text-primary ${
                pathname === link.href 
                  ? "text-primary" 
                  : "text-foreground/80"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-7 left-0 w-full h-0.5 bg-primary"></span>
              )}
            </NavLink>
          ))}
          {/* NOTE: Do not add Points Table link here as it causes hydration errors */}
        </nav>
        
        {/* Actions area - right-aligned */}
        <div className="flex md:w-1/4 items-center justify-end space-x-2">
          {/* Auth Buttons - hidden on mobile, visible on desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <NavLink href="/profile" className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-white hover:bg-primary/20">
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                </span>
                {user.name?.charAt(0) || <User className="h-4 w-4" />}
              </NavLink>
            ) : (
              <>
                <NavLink href="/login" className="text-sm font-medium text-white px-3 py-1 rounded-md border border-transparent hover:bg-slate-800">
                  Login
                </NavLink>
                <NavLink href="/signup" className="text-sm font-medium text-white bg-primary hover:bg-primary/90 px-3 py-1 rounded-md">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle Menu"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-[280px] sm:w-[320px] border-l border-border flex flex-col h-full">
              <SheetHeader className="p-6 border-b bg-primary/5 text-left relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4"
                  onClick={closeMenu}
                >
                  <X className="h-4 w-4" />
                </Button>
                <SheetTitle className="text-xl font-bold">
                  <span className="text-primary">Happy</span>Cricket
                </SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">
                  Live cricket scores and predictions
                </SheetDescription>
              </SheetHeader>
                
              {/* Navigation Links */}
              <div className="flex-1 overflow-auto py-6">
                <div className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Navigation
                </div>
                <nav className="flex flex-col px-2 space-y-1">
                  {navLinks.map((link, index) => (
                    <NavLink
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 animate-in slide-in-from-right-5 fade-in-50 
                        ${
                        pathname === link.href 
                          ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                          : "hover:bg-muted text-foreground/80"
                      }`}
                      style={{ animationDelay: `${index * 75}ms` }}
                    >
                      <link.icon className="h-5 w-5 mr-3" />
                      <span className="text-base">{link.label}</span>
                      {pathname === link.href && (
                        <span className="ml-auto">
                          <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </span>
                      )}
                    </NavLink>
                  ))}
                </nav>

                <div className="px-3 mb-2 mt-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Account
                </div>
                <nav className="flex flex-col px-2 space-y-1">
                  {authLinks.map((link, index) => (
                    <NavLink
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 animate-in slide-in-from-right-5 fade-in-50
                        ${
                        pathname === link.href 
                          ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                          : "hover:bg-muted text-foreground/80"
                      }`}
                      style={{ animationDelay: `${(index + navLinks.length) * 75}ms` }}
                    >
                      <link.icon className="h-5 w-5 mr-3" />
                      <span className="text-base">{link.label}</span>
                      {pathname === link.href && (
                        <span className="ml-auto">
                          <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </span>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Version info at bottom */}
              <div className="p-4 border-t border-border bg-card/50">
                <p className="text-xs text-center text-muted-foreground">
                  HappyCricket © 2023 | v1.0.0
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

