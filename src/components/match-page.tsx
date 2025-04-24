"use client"

import { useState, useEffect } from 'react';
import { fetchMatchDetails, Match } from '@/lib/api';
import MatchDetails from '@/components/match-details';

interface MatchPageProps {
  matchId: string;
}

export default function MatchPage({ matchId }: MatchPageProps) {
  const [matchDetails, setMatchDetails] = useState<Match | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setIsLoading(true);
              console.log(matchId)
        
        const details = await fetchMatchDetails(matchId);
        setMatchDetails(details);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch match details'));
        setIsLoading(false);
      }
    };

    fetchMatch();
  }, [matchId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-muted-foreground">Loading match details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!matchDetails) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-muted-foreground">Match details not available</p>
      </div>
    );
  }

  return <MatchDetails match={matchDetails} />;
}
