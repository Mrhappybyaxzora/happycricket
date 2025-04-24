"use client"
import { useState, useEffect } from 'react';
import { fetchHomeList, Match } from '@/lib/api';
import MatchCard from '@/components/match-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Calendar, CheckCircle, BarChart } from "lucide-react";

function MatchSection({ 
  title, 
  matches, 
  emptyMessage 
}: { 
  title: string, 
  matches: Match[], 
  emptyMessage: string 
}) {
  return (
    <div className="mb-10 animate-fade-in">
      <h2 className="text-xl font-semibold mb-5 text-primary flex items-center">
        <span className="w-1 h-5 bg-primary rounded mr-2"></span>
        {title}
      </h2>
      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {matches.map((match) => (
            <div key={match.match_id} className="animate-fade-in opacity-0">
              <MatchCard match={match} />
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 bg-muted/30 rounded-lg text-center animate-fade-in">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}

function MatchesList() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const fetchedMatches = await fetchHomeList();
        setMatches(fetchedMatches);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load matches'));
        setIsLoading(false);
      }
    };

    loadMatches();
    const intervalId = setInterval(loadMatches, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="relative flex flex-col items-center">
        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-4 text-primary font-medium">Loading matches...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="p-8 glass-effect animate-fade-in text-center max-w-lg mx-auto rounded-lg">
      <div className="text-destructive font-medium mb-4">Failed to load matches: {error.message}</div>
      <button 
        onClick={() => window.location.reload()} 
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  const liveMatches = matches.filter(match => 
    match.match_status.toLowerCase() === 'live'
  );

  const upcomingMatches = matches.filter(match => 
    ['upcoming', 'not started'].includes(match.match_status.toLowerCase())
  );

  const completedMatches = matches.filter(match => 
    ['completed', 'finished'].includes(match.match_status.toLowerCase())
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs defaultValue="all" className="w-full animate-fade-in" onValueChange={handleTabChange}>
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-4xl mx-auto mb-4 sm:mb-8 relative">
        <TabsList className="w-full flex flex-row justify-between p-0.5 sm:p-1 gap-0.5 sm:gap-1 relative rounded-lg bg-card border border-border">
          <TabsTrigger 
            value="all" 
            className="flex items-center justify-center gap-1 py-1.5 px-2 text-xs sm:text-sm rounded-md transition-colors data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-muted"
          >
            <BarChart className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-medium">All</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="live" 
            className="flex items-center justify-center gap-1 py-1.5 px-2 text-xs sm:text-sm rounded-md transition-colors data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-muted"
          >
            <Activity className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-medium">Live</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="upcoming" 
            className="flex items-center justify-center gap-1 py-1.5 px-2 text-xs sm:text-sm rounded-md transition-colors data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-muted"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-medium">Upcoming</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="completed" 
            className="flex items-center justify-center gap-1 py-1.5 px-2 text-xs sm:text-sm rounded-md transition-colors data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-muted"
          >
            <CheckCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-medium">Done</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="all" className="animate-fade-in">
        <MatchSection 
          title="Live Matches" 
          matches={liveMatches} 
          emptyMessage="No live matches at the moment" 
        />
        <MatchSection 
          title="Upcoming Matches" 
          matches={upcomingMatches} 
          emptyMessage="No upcoming matches" 
        />
        <MatchSection 
          title="Completed Matches" 
          matches={completedMatches} 
          emptyMessage="No completed matches" 
        />
      </TabsContent>

      <TabsContent value="live" className="animate-fade-in">
        <MatchSection 
          title="Live Matches" 
          matches={liveMatches} 
          emptyMessage="No live matches at the moment" 
        />
      </TabsContent>

      <TabsContent value="upcoming" className="animate-fade-in">
        <MatchSection 
          title="Upcoming Matches" 
          matches={upcomingMatches} 
          emptyMessage="No upcoming matches" 
        />
      </TabsContent>

      <TabsContent value="completed" className="animate-fade-in">
        <MatchSection 
          title="Completed Matches" 
          matches={completedMatches} 
          emptyMessage="No completed matches" 
        />
      </TabsContent>
    </Tabs>
  );
}

export default function MatchesPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold mb-3">
          Cricket Matches
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          View live scores, upcoming and completed matches
        </p>
      </div>
      <MatchesList />
    </main>
  );
} 