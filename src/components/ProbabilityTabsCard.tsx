import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronUp, ChevronDown, TrendingUp, BadgePercent, DollarSign } from 'lucide-react';

interface ProbabilityTabsCardProps {
  favTeam?: string;
  minRate?: string | number;
  maxRate?: string | number;
  sessionOver?: string;
  sessionMin?: string | number;
  sessionMax?: string | number;
  teamA?: string;
  teamB?: string;
}

const ProbabilityTabsCard: React.FC<ProbabilityTabsCardProps> = ({
  favTeam, minRate, maxRate, sessionOver, sessionMin, sessionMax, teamA, teamB
}) => {
  const [tab, setTab] = useState('percentage');

  // Calculate percentages from rates (if available and numeric)
  let percentA: number | null = null;
  let percentB: number | null = null;
  const min = typeof minRate === 'string' ? parseFloat(minRate) : minRate;
  const max = typeof maxRate === 'string' ? parseFloat(maxRate) : maxRate;
  if (min && max && !isNaN(Number(min)) && !isNaN(Number(max))) {
    // Odds-based probability: percentA = 100 * (max/(min+max)), percentB = 100 * (min/(min+max))
    percentA = Math.round((Number(max) / (Number(min) + Number(max))) * 100);
    percentB = 100 - percentA;
  }

  // Calculate if rates are trending up or down
  const isMinRateHigh = Number(minRate) > 1.5;
  const isMaxRateHigh = Number(maxRate) > 1.5;

  return (
    <Card className="w-full bg-gradient-to-br from-slate-900 to-slate-800 border-none shadow-xl">
      <CardHeader className="pb-1 px-3 pt-3 sm:px-4 sm:pt-4">
        <CardTitle className="flex items-center text-slate-50 text-sm sm:text-base">
          <TrendingUp className="h-4 w-4 mr-1.5 text-primary" />
          Match Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-3 grid grid-cols-2 w-full bg-slate-800/60 gap-2 p-1 rounded-xl">
            <TabsTrigger 
              value="percentage" 
              className="py-1.5 px-2 rounded-lg text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              <BadgePercent className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Win Probability</span>
              <span className="inline sm:hidden">Win %</span>
            </TabsTrigger>
            <TabsTrigger 
              value="odds" 
              className="py-1.5 px-2 rounded-lg text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              <DollarSign className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Betting Odds</span>
              <span className="inline sm:hidden">Odds</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Percentage Tab */}
          <TabsContent value="percentage" className="animate-in fade-in-50 w-full">
            <div className="flex flex-col gap-2 p-1">
              {/* Progress bar style percent comparison */}
              <div className="flex items-center justify-between mb-1 w-full">
                <span className="font-medium text-slate-100 text-xs flex items-center truncate max-w-[45%]">
                  {teamA || 'Team A'}
                  {percentA !== null && percentA > 50 && <span className="ml-1 text-green-400 flex-shrink-0 text-xs">●</span>}
                </span>
                <span className="font-bold text-slate-100 text-sm flex-shrink-0">{percentA !== null ? percentA + '%' : '-'}</span>
              </div>
              <div className="w-full h-4 bg-slate-700/50 rounded-full overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-400 h-4 rounded-l-full transition-all duration-700"
                  style={{ width: percentA !== null ? `${percentA}%` : '50%' }}
                />
                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-r-full transition-all duration-700"
                  style={{ width: percentB !== null ? `${percentB}%` : '50%' }}
                />
              </div>
              <div className="flex items-center justify-between mt-1 w-full">
                <span className="font-medium text-slate-100 text-xs flex items-center truncate max-w-[45%]">
                  {teamB || 'Team B'}
                  {percentB !== null && percentB > 50 && <span className="ml-1 text-blue-400 flex-shrink-0 text-xs">●</span>}
                </span>
                <span className="font-bold text-slate-100 text-sm flex-shrink-0">{percentB !== null ? percentB + '%' : '-'}</span>
              </div>
            </div>
          </TabsContent>
          
          {/* Odds View Tab */}
          <TabsContent value="odds" className="animate-in fade-in-50 w-full">
            <div className="flex flex-col gap-3">
              {/* Main betting odds card */}
              <div className="relative bg-gradient-to-br from-slate-800/70 to-slate-700/40 rounded-lg p-2.5 sm:p-3 backdrop-blur overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl transform -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex flex-col gap-2.5 sm:gap-3 relative z-10">
                  {/* Favorite team indicator */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-slate-900/60 p-1 rounded-lg mr-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-slate-400 text-xs">Favorite</span>
                        <h3 className="text-slate-100 font-medium text-xs sm:text-sm truncate max-w-[100px] sm:max-w-[120px]">{favTeam || 'N/A'}</h3>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400">Based on odds</div>
                  </div>
                  
                  {/* Odds indicators */}
                  <div className="grid grid-cols-2 gap-2 mt-0.5 sm:mt-1">
                    <div className="bg-slate-900/50 p-2 rounded-lg backdrop-blur">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-slate-400 text-[10px]">Min Rate</span>
                        {isMinRateHigh ? (
                          <ChevronUp className="h-3 w-3 text-red-400" />
                        ) : (
                          <ChevronDown className="h-3 w-3 text-green-400" />
                        )}
                      </div>
                      <div className="text-lg font-bold text-slate-100">{minRate || '-'}</div>
                      <div className={`text-[10px] mt-0.5 ${isMinRateHigh ? 'text-red-400' : 'text-green-400'}`}>
                        {isMinRateHigh ? 'High' : 'Low'} risk
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/50 p-2 rounded-lg backdrop-blur">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-slate-400 text-[10px]">Max Rate</span>
                        {isMaxRateHigh ? (
                          <ChevronUp className="h-3 w-3 text-red-400" />
                        ) : (
                          <ChevronDown className="h-3 w-3 text-green-400" />
                        )}
                      </div>
                      <div className="text-lg font-bold text-slate-100">{maxRate || '-'}</div>
                      <div className={`text-[10px] mt-0.5 ${isMaxRateHigh ? 'text-red-400' : 'text-green-400'}`}>
                        {isMaxRateHigh ? 'High' : 'Low'} odds
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Session Data Card */}
              {sessionOver && (
                <div className="bg-slate-800/40 rounded-lg p-2 backdrop-blur">
                  <div className="flex items-center mb-1.5">
                    <div className="bg-primary/20 rounded-full h-5 w-5 flex items-center justify-center mr-1.5 flex-shrink-0">
                      <span className="text-primary text-[10px] font-bold">S</span>
                    </div>
                    <span className="text-slate-100 font-medium text-xs truncate">{sessionOver}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-[10px] text-slate-400 mb-0.5">Min Score</div>
                      <div className="bg-slate-900/30 rounded py-1 px-2 text-center">
                        <span className="text-sm font-medium text-slate-100">{sessionMin || '-'}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 mb-0.5">Max Score</div>
                      <div className="bg-slate-900/30 rounded py-1 px-2 text-center">
                        <span className="text-sm font-medium text-slate-100">{sessionMax || '-'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-[10px] text-slate-400 mt-1.5 text-center">
                    Projected range for {sessionOver}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProbabilityTabsCard;
