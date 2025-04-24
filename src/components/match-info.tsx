import React, { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { fetchMatchDetails, fetchMatchInfo } from '@/lib/api'
import { useSpeakOnChange } from '@/hooks/useSpeakOnChange'
import { Volume2, VolumeX } from 'lucide-react';
import LivePlayersCard from './LivePlayersCard'
import MatchTitle from './MatchTitle'
import { usePathname } from 'next/navigation'

import MatchDetailsCard from './MatchDetailsCard'
import OddsProbabilityCard from './OddsProbabilityCard'
import ProbabilityTabsCard from './ProbabilityTabsCard'

// Define a more flexible type to handle different match object structures
type MatchInfoProps = {
  match: {
    match_id: number | string;
    [key: string]: any;
  }
}

interface LiveMatchData {
  match_id: number | string
  series_id?: number
  match_type?: string
  match_over?: string
  min_rate?: number | string
  max_rate?: number | string
  fav_team?: string
  toss?: string
  result?: string
  first_circle?: string
  s_ovr?: string
  s_min?: number | string
  s_max?: number | string
  team_a?: string
  team_a_short?: string
  team_a_score?: {
    1: {
      score: number
      wicket: number
      over: string
    }
  }
  team_b?: string
  team_b_short?: string
  team_b_score?: {
    1: {
      score: number
      wicket: number
      over: string
    }
  }
  batsman?: Array<{
    name: string
    run: number
    ball: number
    fours: number
    sixes: number
    strike_rate: string
    strike_status: number
  }>
  bolwer?: {
    name: string
    run: number
    wicket: number
    over: string
    economy: string
  }
  projected_score?: Array<{
    over: number;
    cur_rate: string;
    cur_rate_score: number;
    cur_rate_1: string;
    cur_rate_1_score: number;
    cur_rate_2: string;
    cur_rate_2_score: number;
    cur_rate_3: string;
    cur_rate_3_score: number;
  }>;
  [key: string]: any
}

export default function MatchInfo({ match }: MatchInfoProps) {
  // Extract match_id from the route or props using usePathname (client side only)
  const pathname = usePathname();
  
  const matchId = useMemo(() => {
    // Get the id from the URL path (ensures same value on client and server)
    const segments = pathname.split('/');
    const pathMatchId = segments[segments.length - 1];
    
    // If the pathMatchId is valid, use it, otherwise fall back to props
    const id = !isNaN(Number(pathMatchId)) ? Number(pathMatchId) : Number(match.match_id);
    return id;
  }, [pathname, match.match_id]);

  const [liveMatchInfo, setLiveMatchInfo] = useState<LiveMatchData>({
    match_id: matchId,
    ...match
  });
  const [staticMatchInfo, setStaticMatchInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [ttsEnabled, setTtsEnabled] = useState(true);

  useSpeakOnChange(liveMatchInfo.first_circle, ttsEnabled && Boolean(liveMatchInfo.first_circle), val => {
    console.log('[TTS] Speaking first_circle:', val);
    return `${val}`;
  });

  // Fetch only specific updates to avoid full page reload
  const fetchPartialMatchUpdates = async () => {
    try {
      setLoading(true);
      // Use a more specific endpoint for partial updates
      const partialUpdate = await fetchMatchDetails(`${matchId}`);

      if (partialUpdate) {
        // Merge all fields from partialUpdate
        setLiveMatchInfo(prev => ({
          ...prev,
          ...partialUpdate,
        }));
      }
    } catch (err) {
      setError('Error updating match information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch static match info once on mount
  useEffect(() => {
    const fetchStaticInfo = async () => {
      try {
        const info = await fetchMatchInfo(`${matchId}`);
        setStaticMatchInfo(info);
      } catch (err) {
        setError('Error fetching static match info');
        console.error(err);
      }
    };
    fetchStaticInfo();
  }, [matchId]);

  // Poll for updates at a reasonable interval
  useEffect(() => {
    const updateInterval = setInterval(fetchPartialMatchUpdates, 30000); // Every 30 seconds
    return () => clearInterval(updateInterval);
  }, [matchId]);

  // Render match info card
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6">

      <div>
        {/* Main Match Title (refactored to MatchTitle component) */}
        <MatchTitle
          teamA={liveMatchInfo.team_a}
          teamAShort={liveMatchInfo.team_a_short}
          teamAImg={liveMatchInfo.team_a_img}
          teamB={liveMatchInfo.team_b}
          teamBShort={liveMatchInfo.team_b_short}
          teamBImg={liveMatchInfo.team_b_img}
          matchType={liveMatchInfo.match_type}
          seriesName={liveMatchInfo.series_name}
        />
      </div>

      {/* Latest Update Box - Moved to top */}
      <Card className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-none shadow-xl overflow-hidden">
        <CardContent className="p-3 sm:p-5 relative">
          {/* Pulsing glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded-md opacity-30 animate-pulse"></div>
          
          {/* Speaker toggle icon */}
          <Button
            aria-label={ttsEnabled ? 'Disable speech' : 'Enable speech'}
            onClick={() => setTtsEnabled((v) => !v)}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 pointer-events-auto bg-slate-800/50 hover:bg-slate-700/50 z-10"
            size="sm"
            type="button"
          >
            {ttsEnabled ? (
              <Volume2 className="h-4 w-4 text-primary" />
            ) : (
              <VolumeX className="h-4 w-4 text-slate-400" />
            )}
          </Button>
          
          <div className="text-center py-3 sm:py-6">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-1 sm:mb-2">LATEST UPDATE</div>
            <div
              key={liveMatchInfo.first_circle}
              className={cn(
                "text-center text-lg sm:text-2xl md:text-3xl font-bold tracking-wider transition-all duration-500 ease-in-out overflow-hidden text-ellipsis break-words px-2",
                liveMatchInfo.first_circle
                  ? "text-primary"
                  : "text-slate-400"
              )}
            >
              {liveMatchInfo.first_circle || 'No Update Available'}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs Section with improved styling to match design */}
      <div className="w-full overflow-x-auto pb-1">
        <Tabs defaultValue="live" className="w-full">
          <div className="w-full max-w-full overflow-x-auto mb-4 pb-1">
            <TabsList className="mb-2 w-full min-w-[600px] sm:min-w-0 bg-slate-800/60 p-1 rounded-xl flex space-x-1 sm:space-x-2">
              <TabsTrigger 
                value="live" 
                className="flex-1 py-2 px-2 sm:py-2.5 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs sm:text-sm font-medium transition-all"
              >
                Live
              </TabsTrigger>
              <TabsTrigger 
                value="match-info" 
                className="flex-1 py-2 px-2 sm:py-2.5 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all"
              >
                Match Info
              </TabsTrigger>
              <TabsTrigger 
                value="scorecard" 
                className="flex-1 py-2 px-2 sm:py-2.5 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs sm:text-sm font-medium transition-all"
              >
                Scorecard
              </TabsTrigger>
              <TabsTrigger 
                value="playing-xi" 
                className="flex-1 py-2 px-2 sm:py-2.5 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all"
              >
                Playing XI
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Live Tab Content */}
          <TabsContent value="live" className="animate-in fade-in-50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Left column - match data */}
              <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                {/* Compact Key Stats Row */}
                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-none shadow-xl overflow-hidden">
                  <CardContent className="p-0">
                    <dl className="w-full grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-700/30">
                      <div className="p-2 sm:p-4 flex flex-col justify-center items-center">
                        <dt className="text-xs font-medium text-slate-400">CRR</dt>
                        <dd className="mt-1 text-base sm:text-xl font-bold text-slate-50 truncate max-w-full">{liveMatchInfo.currRate ?? liveMatchInfo.curr_rate ?? liveMatchInfo.current_run_rate ?? '-'}</dd>
                      </div>
                      <div className="p-2 sm:p-4 flex flex-col justify-center items-center">
                        <dt className="text-xs font-medium text-slate-400">RRR</dt>
                        <dd className="mt-1 text-base sm:text-xl font-bold text-slate-50 truncate max-w-full">{liveMatchInfo.reqRate ?? liveMatchInfo.req_rate ?? liveMatchInfo.required_run_rate ?? '-'}</dd>
                      </div>
                      <div className="p-2 sm:p-4 flex flex-col justify-center items-center">
                        <dt className="text-xs font-medium text-slate-400">Partnership</dt>
                        <dd className="mt-1 text-base sm:text-xl font-bold text-slate-50 truncate max-w-full">
                          {liveMatchInfo.partnership?.runs ?? liveMatchInfo.partnership_runs ?? '-'}
                          {liveMatchInfo.partnership?.balls ? ` (${liveMatchInfo.partnership.balls})` : ''}
                        </dd>
                      </div>
                      <div className="p-2 sm:p-4 flex flex-col justify-center items-center">
                        <dt className="text-xs font-medium text-slate-400">Last Wicket</dt>
                        <dd className="mt-1 text-base sm:text-xl font-bold text-slate-50 truncate max-w-full">{liveMatchInfo.last_wicket ?? '-'}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                {/* Live Players */}
                <LivePlayersCard
                  batsman={liveMatchInfo.batsman ?? []}
                  bowler={liveMatchInfo.bolwer ?? null}
                />
              </div>

              {/* Right column - odds and probabilities */}
              <div className="lg:col-span-4 space-y-4 sm:space-y-6">
                {/* Current Performance Section - Stylized Score Card */}
                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-none shadow-xl overflow-hidden">
                  <CardHeader className="pb-2 pt-3 px-3 sm:pt-4 sm:px-4">
                    <CardTitle className="text-slate-100 text-sm sm:text-lg">Current Score</CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
                    <div className="grid grid-cols-2 gap-3 sm:gap-6">
                      <div className="bg-slate-800/50 rounded-lg p-2 sm:p-3">
                        <dt className="text-xs sm:text-sm font-medium text-slate-400 truncate">
                          {liveMatchInfo.team_a_short}
                        </dt>
                        <dd className="mt-1 sm:mt-2 text-lg sm:text-2xl font-bold text-slate-50 truncate">
                          {liveMatchInfo.team_a_score?.[1]?.score || 0}-
                          {liveMatchInfo.team_a_score?.[1]?.wicket || 0}
                          <span className="text-xs sm:text-sm font-normal text-slate-400 ml-1">{`(${liveMatchInfo.team_a_score?.[1]?.over || '0.0'})`}</span>
                        </dd>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-2 sm:p-3">
                        <dt className="text-xs sm:text-sm font-medium text-slate-400 truncate">
                          {liveMatchInfo.team_b_short}
                        </dt>
                        <dd className="mt-1 sm:mt-2 text-lg sm:text-2xl font-bold text-slate-50 truncate">
                          {liveMatchInfo.team_b_score?.[1]?.score || 0}-
                          {liveMatchInfo.team_b_score?.[1]?.wicket || 0}
                          <span className="text-xs sm:text-sm font-normal text-slate-400 ml-1">{`(${liveMatchInfo.team_b_score?.[1]?.over || '0.0'})`}</span>
                        </dd>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Probability & Betting Cards */}
                <ProbabilityTabsCard
                  favTeam={liveMatchInfo.fav_team}
                  minRate={liveMatchInfo.min_rate}
                  maxRate={liveMatchInfo.max_rate}
                  sessionOver={liveMatchInfo.s_ovr}
                  sessionMin={liveMatchInfo.s_min}
                  sessionMax={liveMatchInfo.s_max}
                  teamA={liveMatchInfo.team_a_short}
                  teamB={liveMatchInfo.team_b_short}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="match-info">

            {/* Match Info tab content with improved scrolling for tables */}
            <div className="space-y-6">
              {/* Head to Head Section */}
              {staticMatchInfo && staticMatchInfo.head_to_head && (
                <Card className="mb-6 overflow-hidden">
                  <CardHeader className="pb-2 pt-3 px-3 sm:pt-4 sm:px-4">
                    <CardTitle className="text-sm sm:text-lg">Head to Head</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    <div className="mb-3">
                      <span className="font-medium">{staticMatchInfo.team_a_short} Wins:</span> {staticMatchInfo.head_to_head.team_a_win_count} &nbsp;|&nbsp;
                      <span className="font-medium">{staticMatchInfo.team_b_short} Wins:</span> {staticMatchInfo.head_to_head.team_b_win_count}
                    </div>
                    <div className="overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4">
                      <table className="min-w-full text-xs">
                        <thead>
                          <tr className="bg-muted">
                            <th className="px-2 py-1.5 text-left">Match</th>
                            <th className="px-2 py-1.5 text-left">Result</th>
                            <th className="px-2 py-1.5 text-left">{staticMatchInfo.team_a_short}</th>
                            <th className="px-2 py-1.5 text-left">{staticMatchInfo.team_b_short}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {staticMatchInfo.head_to_head.matches?.map((m: any, idx: number) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-muted/30' : ''}>
                              <td className="px-2 py-1.5">{m.matchs}</td>
                              <td className="px-2 py-1.5">{m.result}</td>
                              <td className="px-2 py-1.5">{m.team_a_score} ({m.team_a_over} ov)</td>
                              <td className="px-2 py-1.5">{m.team_b_score} ({m.team_b_over} ov)</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}


              {/* Forms Section (from staticMatchInfo) */}
              {staticMatchInfo && staticMatchInfo.forms && (
                <Card>
                  <CardHeader className="pb-2 pt-3 px-3 sm:pt-4 sm:px-4">
                    <CardTitle className="text-sm sm:text-lg">Recent Form</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{staticMatchInfo.team_a_short}</div>
                        <div className="text-sm">{staticMatchInfo.forms.team_a?.join(' ')}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{staticMatchInfo.team_b_short}</div>
                        <div className="text-sm">{staticMatchInfo.forms.team_b?.join(' ')}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Team Comparison Section */}
              {staticMatchInfo && staticMatchInfo.team_comparison && (
                <Card className="mb-6">
                  <CardHeader className="pb-2 pt-3 px-3 sm:pt-4 sm:px-4">
                    <CardTitle className="text-sm sm:text-lg">Team Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{staticMatchInfo.team_a_short}</div>
                        <div className="text-sm">High: {staticMatchInfo.team_comparison.team_a_high_score}</div>
                        <div className="text-sm">Low: {staticMatchInfo.team_comparison.team_a_low_score}</div>
                        <div className="text-sm">Avg: {staticMatchInfo.team_comparison.team_a_avg_score}</div>
                        <div className="text-sm">Wins: {staticMatchInfo.team_comparison.team_a_win}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{staticMatchInfo.team_b_short}</div>
                        <div className="text-sm">High: {staticMatchInfo.team_comparison.team_b_high_score}</div>
                        <div className="text-sm">Low: {staticMatchInfo.team_comparison.team_b_low_score}</div>
                        <div className="text-sm">Avg: {staticMatchInfo.team_comparison.team_b_avg_score}</div>
                        <div className="text-sm">Wins: {staticMatchInfo.team_comparison.team_b_win}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Venue Scoring Pattern Section */}
              {staticMatchInfo && staticMatchInfo.venue_scoring_pattern && (
                <Card className="mb-6">
                  <CardHeader className="pb-2 pt-3 px-3 sm:pt-4 sm:px-4">
                    <CardTitle className="text-sm sm:text-lg">Venue Scoring Pattern</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
                      <div>High Score: {staticMatchInfo.venue_scoring_pattern.high_score}</div>
                      <div>Low Score: {staticMatchInfo.venue_scoring_pattern.low_score}</div>
                      <div>1st Inn Avg: {staticMatchInfo.venue_scoring_pattern.first_avg_score}</div>
                      <div>2nd Inn Avg: {staticMatchInfo.venue_scoring_pattern.second_avg_score}</div>
                      <div>1st Bat Win: {staticMatchInfo.venue_scoring_pattern.first_win_batting} ({staticMatchInfo.venue_scoring_pattern.first_win_batting_per}%)</div>
                      <div>2nd Bat Win: {staticMatchInfo.venue_scoring_pattern.second_win_batting} ({staticMatchInfo.venue_scoring_pattern.second_win_batting_per}%)</div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Venue Weather Section */}
              {staticMatchInfo && staticMatchInfo.venue_weather && (
                <Card className="mb-6">
                  <CardHeader className="pb-2 pt-3 px-3 sm:pt-4 sm:px-4">
                    <CardTitle className="text-sm sm:text-lg">Venue Weather</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-sm">
                      {staticMatchInfo.venue_weather.weather_icon && (
                        <img src={staticMatchInfo.venue_weather.weather_icon} alt="Weather" className="w-8 h-8 sm:w-10 sm:h-10" />
                      )}
                      <div>
                        <div>{staticMatchInfo.venue_weather.weather}</div>
                        <div>Temp: {staticMatchInfo.venue_weather.temp_c}°C / {staticMatchInfo.venue_weather.temp_f}°F</div>
                        <div>Wind: {staticMatchInfo.venue_weather.wind_mph} mph ({staticMatchInfo.venue_weather.wind_kph} kph) {staticMatchInfo.venue_weather.wind_dir}</div>
                        <div>Humidity: {staticMatchInfo.venue_weather.humidity}%</div>
                        <div>Cloud: {staticMatchInfo.venue_weather.cloud}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          {/* Scorecard Tab Content */}
          <TabsContent value="scorecard">
            <div className="text-center text-muted-foreground py-8">Scorecard will be shown here.</div>
          </TabsContent>
          {/* Playing XI Tab Content */}
          <TabsContent value="playing-xi">
            <div className="text-center text-muted-foreground py-8">Playing XI will be shown here.</div>
          </TabsContent>
        </Tabs>
      </div>




    </div>
  )
}

