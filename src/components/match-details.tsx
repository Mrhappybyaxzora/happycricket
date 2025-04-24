"use client"

import React from 'react';
import { Match } from '@/lib/api';
import MatchInfo from '@/components/match-info';
import Timeline from '@/components/timeline';
import Scorecard from '@/components/scorecard';
import Commentary from '@/components/commentary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MatchDetailsProps {
  match: Match;
}

export default function MatchDetails({ match }: MatchDetailsProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <MatchInfo match={match} />
      
      <Tabs defaultValue="timeline" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
          <TabsTrigger value="commentary">Commentary</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <Timeline match={match} />
        </TabsContent>

        <TabsContent value="scorecard">
          <Scorecard match={match} />
        </TabsContent>

        <TabsContent value="commentary">
          <Commentary matchId={match.match_id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
