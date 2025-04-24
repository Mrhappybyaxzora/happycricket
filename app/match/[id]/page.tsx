"use client";

import { useEffect, useState } from 'react';
import { fetchMatchDetails } from '@/lib/api';
import MatchInfo from '@/components/match-info';



import React from "react";

type MatchDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default function MatchDetailsPage({ params }: MatchDetailsPageProps) {
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;
  const [matchDetails, setMatchDetails] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setIsLoading(true);
        const details = await fetchMatchDetails(`${id}`);
        setMatchDetails(details);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch match details'));
        setIsLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

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

  return (
    <div className="container mx-auto px-4 py-6">
    
      <MatchInfo match={matchDetails} />
    </div>
  );
}