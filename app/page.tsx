"use client"
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { SafeLinkButton } from "@/components/ui/safe-link-button";
import { ChevronRight, Bot, Activity, Trophy, Clock, Shield, TrendingUp, Check, Star, Zap, BarChart3, Share2, Users, Calendar, Sparkles, Smartphone, Server, Instagram, Twitter, Facebook, Globe, Newspaper, Rss, Info, Tv, PieChart, Award, Database, Brain, BrainCircuit, Mail, Phone, MapPin, Youtube, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigationLoading } from '@/components/navigation-loading-provider';

// Dynamically import heavy components
const BackgroundAnimation = dynamic(() => import('@/components/background-animation').then(mod => mod.BackgroundAnimation), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-gradient-to-br from-blue-950/40 via-background to-primary/20"></div>
});

const ScrollProgressBar = dynamic(() => import('@/components/scroll-progress-bar').then(mod => mod.ScrollProgressBar), {
  ssr: false
});

const CricketQuizComponent = dynamic(() => import('@/components/cricket-quiz').then(mod => mod.CricketQuiz), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-card rounded-xl border border-border animate-pulse"></div>
});

const AiAnalysisTyping = dynamic(() => import('@/components/ai-analysis-typing').then(mod => mod.AiAnalysisTyping), {
  ssr: false
});

// Simpler components kept inline to avoid extra network requests
// Testimonial card component
const TestimonialCard = ({ quote, author, role }) => (
  <div className="bg-card p-6 rounded-xl shadow-md border border-border/60 flex flex-col h-full">
    <div className="flex-1">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>
      <p className="italic text-foreground/90 mb-4">"{quote}"</p>
    </div>
    <div>
      <p className="font-semibold">{author}</p>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  </div>
);

// Animated feature card
const FeatureCard = ({ title, description, icon: Icon, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef} 
      className={`transform transition-all duration-500 ease-out bg-card rounded-lg p-6 shadow-md border border-border/50 hover:shadow-lg hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const AnimatedStat = ({ value, label, icon: Icon, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = parseInt(value);
          const duration = 2000;
          let startTimestamp = null;
          
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * (end - start) + start));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          
          setTimeout(() => {
            window.requestAnimationFrame(step);
          }, delay);
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [value, delay]);
  
  return (
    <div ref={counterRef} className="flex flex-col items-center p-5 bg-card rounded-xl border border-border/60 shadow-md animate-fade-in">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="text-3xl font-bold mb-2">{count}+</div>
      <div className="text-sm text-muted-foreground text-center">{label}</div>
    </div>
  );
};

export default function Home() {
  const { stopLoading } = useNavigationLoading();
  
  // Use effect to stop loading when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      stopLoading();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [stopLoading]);
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden" suppressHydrationWarning>
      {/* Scroll Progress Indicator */}
      <ScrollProgressBar />
      
      {/* Replace wave background with subtle gradient animation */}
      <BackgroundAnimation />
      
      {/* Header with Video Section */}
      <section className="py-16 pb-24 relative border-b border-border/40 bg-black">
        <div className="container mx-auto px-4 relative z-20">
          {/* Removed AI Intelligence Strip as requested */}
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Left: Text Content */}
            <div className="w-full md:w-2/5 space-y-5">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 text-sm font-medium text-primary-foreground bg-primary rounded-full mb-2 animate-pulse-soft">
                  AI-Powered Cricket Analytics
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Happycricket.com
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Experience the future of cricket analytics with our AI-driven platform delivering real-time predictions, match insights, and player performance metrics.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <SafeLinkButton href="/matches" size="lg" className="relative overflow-hidden group">
                  Live Predictions
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </SafeLinkButton>
                <SafeLinkButton href="/signup" size="lg" variant="outline" className="relative overflow-hidden group bg-transparent border-white/20 text-white hover:bg-white/10">
                  Get Started
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </SafeLinkButton>
              </div>
              
              {/* Feature highlights in a more modern grid */}
              <div className="pt-5 grid grid-cols-3 gap-3">
                {[
                  { icon: Bot, text: "AI Predictions", desc: "98% accuracy" },
                  { icon: Activity, text: "Live Analysis", desc: "Real-time data" },
                  { icon: Trophy, text: "Win Probability", desc: "Advanced models" }
                ].map((feature, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-3 rounded-lg bg-card/50 border border-border/30">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium text-sm">{feature.text}</span>
                    <span className="text-xs text-muted-foreground">{feature.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right: Video - Fixed to ensure complete display */}
            <div className="w-full md:w-2/5 relative">
              <div className="w-full aspect-square max-w-md mx-auto rounded-xl overflow-hidden shadow-lg video-container-glow">
                {/* Removed decorative borders as requested */}
                
                {/* Video without controls - Using object-fit:contain to show full video */}
                <video 
                  src="/video.mp4"
                  className="w-full h-full object-contain bg-black relative z-0"
                  autoPlay
                  playsInline
                  muted
                  loop
                  disablePictureInPicture
                ></video>
                
                {/* Small badge in the corner */}
                <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium text-white bg-primary/80 rounded backdrop-blur-sm z-20">
                  HappyCricket AI
                </div>
              </div>
              
              {/* Floating indicator below video */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-card rounded-full shadow-lg border border-border flex items-center gap-2 z-20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs whitespace-nowrap">Match prediction active</span>
              </div>
            </div>
          </div>
          
          {/* Stats Counter Bar - Updated design */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { value: "5M+", label: "Active Users" },
              { value: "98%", label: "AI Accuracy" },
              { value: "10K+", label: "Matches Analyzed" },
              { value: "24/7", label: "Live Updates" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-lg bg-card/50 border border-border/30">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fantasy Cricket Coming Soon Section - Now moved up and style updated */}
      <section id="fantasy-cricket" className="py-16 relative border-b border-border/40">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="w-24 h-24 bg-primary/30 rounded-full absolute top-10 left-10 animate-ping-slow"></div>
          <div className="w-32 h-32 bg-blue-500/20 rounded-full absolute bottom-10 right-10 animate-pulse-slow"></div>
          <div className="w-16 h-16 bg-primary/20 rounded-full absolute top-1/2 right-1/4 animate-bounce-slow"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
            {/* Left side content */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block px-3 py-1 bg-primary text-primary-foreground font-medium rounded-full text-sm">
                Coming Soon
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Fantasy Cricket Challenge</h2>
              <p className="text-white/80 text-lg">
                Create your dream team, compete with friends, and win exciting prizes! Our fantasy cricket platform will allow you to showcase your cricket knowledge and strategy.
              </p>
              
              <div className="space-y-4 pt-2">
                {/* Features list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { text: "Create custom teams", icon: Users },
                    { text: "Win big prizes", icon: Trophy },
                    { text: "Real-time scoring", icon: Activity },
                    { text: "Global leaderboards", icon: TrendingUp }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <feature.icon className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-white/90 text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
                
                {/* Email signup */}
                <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30 backdrop-blur-sm">
                  <p className="text-white/90 text-sm mb-3">
                    Be the first to know when we launch! Sign up for early access.
                  </p>
                  <div className="flex gap-2">
                    <Input 
                      type="email" 
                      placeholder="Your email address" 
                      className="bg-blue-950/50 border-blue-500/30 text-white placeholder:text-white/40" 
                    />
                    <Button className="bg-primary hover:bg-primary/90">
                      Notify Me
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Trophy illustration */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative p-6">
                {/* Large trophy icon */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center shadow-xl animate-pulse-slow">
                  <Trophy className="w-16 h-16 md:w-20 md:h-20 text-white" />
                </div>
                
                {/* Decoration circles */}
                <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-primary/30 -z-10 animate-ping-slow"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 rounded-full bg-blue-500/30 -z-10 animate-pulse-slow"></div>
                
                {/* Floating labels */}
                <div className="absolute top-1/4 -right-4 bg-card px-3 py-1 rounded-full text-xs font-medium shadow-lg border border-border animate-bounce-subtle">
                  Create Teams
                </div>
                <div className="absolute bottom-1/4 -left-4 bg-card px-3 py-1 rounded-full text-xs font-medium shadow-lg border border-border animate-bounce-subtle delay-300">
                  Win Prizes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Now directly connected to header without visual separation */}
      <section className="py-14 relative border-b border-border/40 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 text-white">Why Cricket Fans Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-white/70">Advanced features powered by AI technology to enhance your cricket experience</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Activity, title: "Live Analysis", desc: "Ball-by-ball updates with AI-driven insights" },
              { icon: Bot, title: "AI Predictions", desc: "Match outcome predictions with 98% accuracy" },
              { icon: Shield, title: "Team Comparisons", desc: "Head-to-head stats and historical performance" },
              { icon: Trophy, title: "Tournament Coverage", desc: "All major cricket tournaments worldwide" },
              { icon: Clock, title: "Match Reminders", desc: "Never miss a match with smart notifications" },
              { icon: BarChart3, title: "Player Stats", desc: "Comprehensive player statistics and rankings" },
              { icon: TrendingUp, title: "Form Analysis", desc: "Player and team form trends and predictions" },
              { icon: Zap, title: "Instant Updates", desc: "Lightning-fast score updates and alerts" }
            ].map((feature, i) => (
              <div key={i} className="bg-blue-950/30 backdrop-blur-sm p-5 rounded-lg border border-blue-900/50 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* AI Predictions Help Section - New section with black background */}
      <section className="py-16 relative border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">How Our AI Helps You Win</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI-powered predictions give you the edge in cricket analysis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-lg border border-border/60 shadow-sm">
              <div className="flex flex-col md:flex-row gap-5 items-start">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <Bot className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">AI Match Predictions</h3>
                  <p className="text-muted-foreground mb-4">
                    Our AI analyzes thousands of data points including player form, head-to-head records, pitch conditions, 
                    and historical performance to provide accurate match predictions with up to 98% accuracy.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Player Data", "Weather Analysis", "Pitch Conditions", "Team Form"].map((tag, i) => (
                      <span key={i} className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary/90 rounded-full border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border/60 shadow-sm">
              <div className="flex flex-col md:flex-row gap-5 items-start">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <BarChart3 className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Live Win Probability</h3>
                  <p className="text-muted-foreground mb-4">
                    Watch as our AI calculates real-time win probabilities for each team as the match progresses, 
                    factoring in current score, required run rate, wickets in hand, and historical chase records.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Real-time Updates", "Dynamic Modeling", "Chase Analysis", "Pressure Metrics"].map((tag, i) => (
                      <span key={i} className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary/90 rounded-full border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border/60 shadow-sm">
              <div className="flex flex-col md:flex-row gap-5 items-start">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Player Performance Forecasts</h3>
                  <p className="text-muted-foreground mb-4">
                    Our AI predicts how individual players will perform in upcoming matches based on their current form, 
                    past performance against specific opponents, and performance on similar pitches.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Form Analysis", "Match-up Data", "Venue Performance", "Consistency Metrics"].map((tag, i) => (
                      <span key={i} className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary/90 rounded-full border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border/60 shadow-sm">
              <div className="flex flex-col md:flex-row gap-5 items-start">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <BrainCircuit className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Strategic Insights</h3>
                  <p className="text-muted-foreground mb-4">
                    Get detailed insights on team strategies, potential bowling match-ups, batting order optimization, 
                    and other tactical decisions that can influence match outcomes.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Tactical Analysis", "Match-ups", "Battlefield Map", "Pressure Points"].map((tag, i) => (
                      <span key={i} className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary/90 rounded-full border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Added FAQ Section */}
      <section className="py-16 relative border-b border-border/40 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 text-white">Frequently Asked Questions</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Get answers to the most common questions about our cricket prediction platform
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { 
                question: "How accurate are the AI predictions?", 
                answer: "Our AI predictions boast an industry-leading 98% accuracy rate. We achieve this through advanced machine learning algorithms that analyze vast amounts of historical data, player statistics, pitch conditions, and weather factors."
              },
              { 
                question: "How quickly are live scores updated?", 
                answer: "Our platform updates live scores in real-time with less than 1-second delay from the actual match. We utilize direct data feeds from official sources to ensure the fastest and most reliable updates."
              },
              { 
                question: "Can I get notifications for specific matches?", 
                answer: "Yes, you can set up custom notifications for your favorite teams and tournaments. Our platform allows you to receive alerts for match start times, important moments, and final results."
              },
              { 
                question: "Is historical match data available?", 
                answer: "Absolutely! We maintain a comprehensive database of cricket matches going back decades. You can access detailed statistics, head-to-head records, and performance analytics for teams and players."
              },
              { 
                question: "How does the AI analyze player performance?", 
                answer: "Our AI system analyzes over 200 different performance metrics for each player, including traditional statistics like batting average and bowling economy, plus advanced metrics such as pressure handling, performance against specific opponents, and situational effectiveness."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-blue-950/30 backdrop-blur-sm rounded-lg border border-blue-900/50 overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer list-none">
                    <h3 className="font-semibold text-lg text-white">{faq.question}</h3>
                    <div className="transition-transform duration-300 group-open:rotate-180">
                      <ChevronRight className="h-5 w-5 text-white/70" />
                    </div>
                  </summary>
                  <div className="p-5 pt-6 text-white/70 border-t border-blue-900/30 animate-in slide-in-from-top-5 duration-300 ease-in-out">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Added How It Works Section */}
      <section className="py-16 relative border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">How Our AI Cricket System Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the technology behind our advanced cricket analytics platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Data Collection",
                desc: "Our system collects real-time data from multiple sources including official feeds, ball tracking systems, and statistical databases.",
                icon: Database
              },
              {
                step: "02",
                title: "AI Processing",
                desc: "Advanced machine learning algorithms analyze the data, identifying patterns and making predictions based on historical outcomes.",
                icon: Brain
              },
              {
                step: "03",
                title: "Insight Delivery",
                desc: "Actionable insights and predictions are delivered to you in real-time through our intuitive and user-friendly interface.",
                icon: BrainCircuit
              }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-card rounded-xl p-6 border border-border/60 h-full">
                  <div className="text-5xl font-bold text-primary/20 absolute top-3 right-3">{step.step}</div>
                  <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ChevronRight className="h-8 w-8 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Added Testimonials Section */}
      <section className="py-16 relative border-b border-border/40 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 text-white">What Our Users Say</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Hear from cricket enthusiasts who rely on our platform for predictions and insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: "The prediction accuracy is simply mind-blowing. I've been using HappyCricket for my fantasy league and it's given me the edge over everyone else.",
                author: "Rahul Sharma",
                role: "Fantasy Cricket Player"
              },
              {
                quote: "As a cricket analyst, I rely on accurate data. HappyCricket provides insights that I couldn't find anywhere else. It's revolutionized my approach.",
                author: "James Anderson",
                role: "Cricket Analyst"
              },
              {
                quote: "I love how the app notifies me of key moments in matches. The live analysis makes watching games so much more interesting and engaging.",
                author: "Priya Patel",
                role: "Cricket Fan"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-blue-950/30 backdrop-blur-sm rounded-lg border border-blue-900/50 p-6 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 relative border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <h2 className="text-3xl font-bold">Experience Cricket Like Never Before</h2>
            <p className="text-lg text-muted-foreground">
              Join cricket fans worldwide who rely on HappyCricket for real-time scores, insights, and AI-powered analysis.
            </p>
            <div className="pt-3">
              <SafeLinkButton href="/matches" size="lg">
                Explore Live Matches <ChevronRight className="ml-1 h-4 w-4" />
              </SafeLinkButton>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Join Community Section with Black Background */}
      <section className="py-16 relative border-b border-border/40 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-white">Join Our Cricket Community</h2>
                <p className="text-white/70">
                  Connect with fellow cricket enthusiasts, share your insights, and be part of the fastest-growing cricket analytics community.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: Users, text: "25,000+ Active Members" },
                    { icon: Globe, text: "Global Community" },
                    { icon: Rss, text: "Daily Updates" },
                    { icon: Trophy, text: "Exclusive Tournaments" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-blue-900/20 px-3 py-2 rounded-full border border-blue-500/20">
                      <item.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm text-white/80">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                    Join Our Discord <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 bg-blue-900/20 rounded-xl p-6 border border-blue-500/20 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Subscribe to Weekly Cricket Insights</h3>
                <p className="text-white/70 mb-5">Get weekly match predictions and expert analysis delivered to your inbox.</p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Input 
                      type="email" 
                      placeholder="Your email address" 
                      className="bg-blue-950/40 border-blue-500/30 text-white placeholder:text-white/40 focus-visible:ring-primary/50" 
                    />
                    <Button className="bg-primary hover:bg-primary/90">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-white/50">By subscribing, you agree to our Privacy Policy and consent to receive updates from HappyCricket.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  { label: "Fantasy Cricket", href: "#fantasy-cricket" }
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
    </div>
  );
}
