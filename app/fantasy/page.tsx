"use client"

import { useState, useEffect, useRef } from 'react'
import { 
  Trophy, Users, Calendar, TrendingUp, Activity, 
  Zap, Gift, Star, ChevronRight, Bot, Award, 
  Shield, PieChart, BarChart3, BellRing, Target,
  Crown, Gem, MessageSquare, ArrowRight, Twitter,
  Facebook, Instagram, Youtube, Mail, Phone, MapPin,
  Globe, Rss
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { useNavigationLoading } from '@/components/navigation-loading-provider'

// Interactive feature card component
const FeatureCard = ({ icon: Icon, title, description, color = "primary" }) => {
  return (
    <div className="group relative border border-border/40 rounded-xl bg-background/50 backdrop-blur-sm overflow-hidden hover:shadow-lg transition-all duration-500 ease-out">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-primary/80 to-primary group-hover:w-full transition-all duration-700 ease-out"></div>
      
      <div className="p-6 relative z-10">
        <div className="mb-4 w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-500">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

// Step card component with animated number
const StepCard = ({ number, title, description, icon: Icon }) => {
  return (
    <div className="relative p-6 rounded-xl border border-border/40 overflow-hidden bg-background/50 backdrop-blur-sm group hover:border-primary/40 transition-all duration-500">
      <div className="absolute -right-6 -top-6 text-[120px] font-bold text-primary/5 group-hover:text-primary/10 transition-colors duration-500">
        {number}
      </div>
      <div className="relative z-10 space-y-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default function FantasyCricketPage() {
  const { stopLoading } = useNavigationLoading();
  const [showChatBot, setShowChatBot] = useState(false);
  const heroRef = useRef(null);
  
  // Parallax scroll effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
        heroRef.current.style.opacity = 1 - (scrollY * 0.002);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      stopLoading();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [stopLoading]);

  return (
    <main className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Hero Section - Black Background */}
      <section className="relative h-[90vh] md:h-[80vh] flex items-center overflow-hidden bg-black border-b border-border/40">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/20 blur-[100px] top-[20%] left-[10%] animate-blob"></div>
            <div className="absolute w-[250px] h-[250px] rounded-full bg-blue-600/20 blur-[100px] top-[60%] right-[10%] animate-blob animation-delay-2000"></div>
            <div className="absolute w-[200px] h-[200px] rounded-full bg-primary/10 blur-[100px] bottom-[10%] left-[30%] animate-blob animation-delay-4000"></div>
          </div>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>
        
        {/* Floating cricket ball graphic */}
        <div className="absolute top-1/3 right-[10%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-20 animate-spin-very-slow pointer-events-none">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"></div>
          <div className="absolute inset-[30px] rounded-full border border-primary/20"></div>
          <div className="absolute inset-[60px] rounded-full border border-primary/10"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[100px] h-[100px] rounded-full bg-primary/30 animate-pulse-slow"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center" ref={heroRef}>
            <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/20 border border-primary/30 text-primary">
              <span className="animate-pulse-slow mr-2">●</span>
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="inline-block">
                Fantasy
              </span>
              {" "}
              <span className="inline-block">Cricket</span>
              <span className="block mt-2">Challenge</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Build your dream team, compete with friends, and win incredible prizes with our 
              AI-powered fantasy cricket platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <div className="relative w-full sm:w-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white py-6 px-4 min-w-[300px] rounded-lg focus:border-primary focus:ring-primary"
                />
              </div>
              <Button className="w-full sm:w-auto text-white bg-primary hover:bg-primary/90 py-6 px-6 transition-all duration-300 ease-out">
                Get Early Access
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              {[
                { icon: Users, text: "10K+ Users Waitlisted" },
                { icon: Trophy, text: "₹10,00,000+ Prize Pool" },
                { icon: Star, text: "Premium Experience" },
                { icon: Shield, text: "100% Secure" }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 text-background overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-current"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-current"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section - Background Effect */}
      <section className="py-12 relative border-b border-border/40">
        {/* Background effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl -top-[400px] -right-[400px]"></div>
          <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl bottom-[10%] -left-[300px]"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                The Ultimate Fantasy Cricket Experience
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with the thrill of cricket to deliver 
              an unmatched fantasy sports experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Users, 
                title: "Create Custom Teams", 
                description: "Build your dream team with your favorite players based on real-life stats and performance metrics."
              },
              { 
                icon: Trophy, 
                title: "Win Amazing Prizes", 
                description: "Compete for substantial cash prizes, exclusive merchandise, and once-in-a-lifetime cricket experiences."
              },
              { 
                icon: Activity, 
                title: "Real-time Scoring", 
                description: "Watch your points accumulate in real time as your players perform in actual matches."
              },
              { 
                icon: BarChart3, 
                title: "Advanced Analytics", 
                description: "Access detailed performance metrics, player statistics, and AI-powered predictions."
              },
              { 
                icon: Target, 
                title: "Multiple Contest Formats", 
                description: "Join head-to-head battles, leagues with friends, or large-scale tournaments with thousands of participants."
              },
              { 
                icon: BellRing, 
                title: "Smart Notifications", 
                description: "Get timely alerts about team selection deadlines, player updates, and live match events."
              }
            ].map((feature, i) => (
              <FeatureCard 
                key={i} 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description} 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Prizes Section - Black Background */}
      <section className="py-12 relative bg-black border-b border-border/40">
        {/* Background subtle glow effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-40 right-20 w-60 h-60 bg-primary/10 blur-3xl rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-60 h-60 bg-blue-600/10 blur-3xl rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Exciting Prizes Await</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Showcase your cricket knowledge and strategy to win these amazing rewards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Cash Prizes",
                icon: Zap,
                description: "Win substantial cash rewards that you can withdraw instantly to your bank account.",
                highlight: "₹10,00,000+"
              },
              {
                title: "Premium Memberships",
                icon: Crown,
                description: "Earn free premium access with advanced analytics, exclusive contests, and personalized insights.",
                highlight: "VIP Access"
              },
              {
                title: "Exclusive Experiences",
                icon: Star,
                description: "Win once-in-a-lifetime experiences like meeting cricket stars and attending matches.",
                highlight: "Priceless"
              }
            ].map((prize, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl border border-blue-900/50 bg-blue-950/30 backdrop-blur-sm transition-all duration-500 hover:shadow-lg hover:border-primary/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="p-8 relative">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                    <prize.icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-white">{prize.title}</h3>
                  <p className="text-white/70 mb-4">{prize.description}</p>
                  
                  <div className="mt-6 inline-block px-4 py-2 bg-primary/10 rounded-lg text-primary font-semibold">
                    {prize.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Strategy Tips Section - Background Effect */}
      <section className="py-12 relative border-b border-border/40">
        {/* Background effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl top-[20%] right-[10%]"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl bottom-[10%] left-[20%]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                Winning Strategies
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Master these techniques to dominate your fantasy cricket leagues
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Research Player Form",
                description: "Analyze recent performances, current form, and match-ups against specific opponents.",
                icon: Activity
              },
              {
                title: "Consider Pitch Conditions",
                description: "Different pitches favor different types of players. Research venue history and conditions.",
                icon: Shield
              },
              {
                title: "Balance Your Team",
                description: "Create a well-balanced team with the right mix of batters, bowlers, all-rounders, and keeper.",
                icon: PieChart
              },
              {
                title: "Captain Selection",
                description: "Your captain scores 2x points, so choose carefully based on recent form and match conditions.",
                icon: Crown
              }
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-5 p-6 rounded-xl border border-border/40 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <tip.icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                  <p className="text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section - Black Background */}
      <section className="py-12 relative bg-black border-b border-border/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-60 h-60 bg-primary/10 blur-3xl rounded-full"></div>
          <div className="absolute bottom-40 left-20 w-60 h-60 bg-blue-600/10 blur-3xl rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Everything you need to know about our fantasy cricket platform
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "When will Fantasy Cricket be launched?",
                answer: "We're working hard to launch our Fantasy Cricket platform in time for the next major cricket tournament. Sign up for early access to be notified as soon as we go live!"
              },
              {
                question: "How do I earn points in Fantasy Cricket?",
                answer: "Points are awarded based on your selected players' real-world performance. You'll earn points for runs scored, wickets taken, catches, stumpings, and other on-field actions by your fantasy team members."
              },
              {
                question: "Is there a cost to join Fantasy Cricket?",
                answer: "We'll offer both free and premium contests. Free contests allow everyone to experience the excitement of fantasy cricket, while premium contests offer higher rewards and more competitive gameplay."
              },
              {
                question: "Can I change my team after the tournament starts?",
                answer: "Yes! Our platform will allow for strategic substitutions between matches, letting you adapt your team based on player form, injuries, and match conditions."
              },
              {
                question: "How are prizes distributed?",
                answer: "Prizes are distributed based on final standings in each contest. The prize pool and distribution structure will be clearly displayed before you join any contest."
              }
            ].map((faq, i) => (
              <div key={i} className="group bg-blue-950/30 border border-blue-900/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="font-semibold text-lg text-white">{faq.question}</h3>
                    <div className="transition-transform duration-300 group-open:rotate-180">
                      <ChevronRight className="h-5 w-5 text-white/70 group-open:text-primary" />
                    </div>
                  </summary>
                  <div className="p-6 pt-0 text-white/70 animate-in slide-in-from-top-5 duration-300">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Background Effect */}
      <section className="py-12 relative border-b border-border/40">
        {/* Background effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl top-[-200px] right-[-100px]"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl bottom-[-100px] left-[-100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-card border border-border/50 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Be the First to Know</h2>
                <p className="text-muted-foreground mb-6">
                  Join our waitlist to get early access when we launch our Fantasy Cricket platform. 
                  Be among the first to create your team and compete for exciting prizes!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="focus:ring-primary" 
                  />
                  <Button className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap">
                    Join Waitlist
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-3">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from HappyCricket.
                </p>
              </div>
              
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-blue-600/40 animate-pulse-slow"></div>
                  <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center">
                    <Trophy className="w-20 h-20 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Chat Bot Icon */}
      <button
        onClick={() => setShowChatBot(!showChatBot)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-transform"
        aria-label="Chat with us"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
      
      {/* Footer */}
      <footer className="mt-auto">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and About */}
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-xl font-bold text-primary">Happy</span>
                <span className="text-xl font-bold">Cricket</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The ultimate platform for cricket fans looking for real-time scores, 
                AI-powered analytics, and comprehensive match coverage.
              </p>
              <div className="flex space-x-4 pt-2">
                {[
                  { icon: Twitter, label: "Twitter" },
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Youtube, label: "YouTube" }
                ].map((social, i) => (
                  <Link 
                    href="#" 
                    key={i} 
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { label: "Home", href: "/" },
                  { label: "Live Matches", href: "/matches" },
                  { label: "Team Rankings", href: "/rankings" },
                  { label: "Cricket News", href: "/news" },
                  { label: "Match Schedule", href: "/schedule" }
                ].map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                {[
                  { label: "Live Score Updates", href: "#" },
                  { label: "AI Match Predictions", href: "#" },
                  { label: "Player Statistics", href: "#" },
                  { label: "Team Performance Analytics", href: "#" },
                  { label: "Historical Data", href: "#" },
                  { label: "Fantasy Cricket", href: "/fantasy" }
                ].map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <span className="text-sm text-muted-foreground">support@happycricket.com</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    123 Cricket Avenue, <br />
                    Mumbai, India 400001
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © 2025 HappyCricket.com. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 