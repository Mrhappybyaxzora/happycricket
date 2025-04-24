import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Partnership {
  run: number;
  ball: number;
}

interface ProjectedScore {
  over: number;
  cur_rate?: string;
  cur_rate_score?: number;
  cur_rate_1?: string;
  cur_rate_1_score?: number;
  cur_rate_2?: string;
  cur_rate_2_score?: number;
  cur_rate_3?: string;
  cur_rate_3_score?: number;
}

interface LastOver {
  over: number;
  balls: string[];
  runs: number;
}

interface LastWicket {
  player: string;
  run: number;
  ball: number;
}

interface LastBowler {
  player_id: number;
  name: string;
  img?: string;
  over: string;
  run: number;
  maiden: number;
  wicket: number;
  economy: string;
}

interface MatchStatsCardProps {
  powerplay?: string;
  currentInning?: string;
  ballRem?: number;
  needRunBall?: string;
  trailLead?: string;
  partnership?: Partnership;
  yetToBet?: string[];
  cTeamScore?: number;
  currRate?: string;
  projectedScore?: ProjectedScore[];
  lastBowler?: LastBowler;
  lastWicket?: LastWicket;
  target?: number;
  rrRate?: string;
  runNeed?: number;
  last4Overs?: LastOver[];
}

const MatchStatsCard: React.FC<MatchStatsCardProps> = ({
  powerplay,
  currentInning,
  ballRem,
  needRunBall,
  trailLead,
  partnership,
  yetToBet,
  cTeamScore,
  currRate,
  projectedScore,
  lastBowler,
  lastWicket,
  target,
  rrRate,
  runNeed,
  last4Overs
}) => {
  // Only render if at least one prop is present
  if (!powerplay && !currentInning && !ballRem && !needRunBall && !trailLead && !partnership && !yetToBet && !cTeamScore && !currRate && !projectedScore && !lastBowler && !lastWicket && !target && !rrRate && !runNeed && !last4Overs) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Match Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {powerplay && (
            <div><span className="font-medium">Powerplay:</span> {powerplay}</div>
          )}
          {currentInning && (
            <div><span className="font-medium">Current Inning:</span> {currentInning}</div>
          )}
          {ballRem !== undefined && (
            <div><span className="font-medium">Balls Remaining:</span> {ballRem}</div>
          )}
          {needRunBall && (
            <div><span className="font-medium">Chase Status:</span> {needRunBall}</div>
          )}
          {trailLead && (
            <div><span className="font-medium">Trail/Lead:</span> {trailLead}</div>
          )}
          {partnership && (
            <div><span className="font-medium">Partnership:</span> {partnership.run} ({partnership.ball} balls)</div>
          )}
          {yetToBet && yetToBet.length > 0 && (
            <div><span className="font-medium">Yet to Bat:</span> {yetToBet.join(', ')}</div>
          )}
          {cTeamScore !== undefined && (
            <div><span className="font-medium">Current Team Score:</span> {cTeamScore}</div>
          )}
          {currRate && (
            <div><span className="font-medium">Current Rate:</span> {currRate}</div>
          )}
          {projectedScore && projectedScore.length > 0 && (
            <div className="col-span-2">
              <span className="font-medium">Projected Scores:</span>
              <ul className="list-disc ml-6">
                {projectedScore.map((p, idx) => (
                  <li key={idx}>
                    Over {p.over}:
                    {typeof p.cur_rate_score !== 'undefined' && p.cur_rate && (
                      <> {p.cur_rate_score} (CR: {p.cur_rate}),</>
                    )}
                    {typeof p.cur_rate_1_score !== 'undefined' && p.cur_rate_1 && (
                      <> {p.cur_rate_1_score} (CR: {p.cur_rate_1}),</>
                    )}
                    {typeof p.cur_rate_2_score !== 'undefined' && p.cur_rate_2 && (
                      <> {p.cur_rate_2_score} (CR: {p.cur_rate_2}),</>
                    )}
                    {typeof p.cur_rate_3_score !== 'undefined' && p.cur_rate_3 && (
                      <> {p.cur_rate_3_score} (CR: {p.cur_rate_3})</>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {lastBowler && (
            <div className="col-span-2">
              <span className="font-medium">Last Bowler:</span> {lastBowler.name} ({lastBowler.over} ov, {lastBowler.run} runs, {lastBowler.wicket} wickets, Econ: {lastBowler.economy})
            </div>
          )}
          {lastWicket && (
            <div className="col-span-2">
              <span className="font-medium">Last Wicket:</span> {lastWicket.player} ({lastWicket.run} runs, {lastWicket.ball} balls)
            </div>
          )}
          {target !== undefined && (
            <div><span className="font-medium">Target:</span> {target}</div>
          )}
          {rrRate && (
            <div><span className="font-medium">Required Run Rate:</span> {rrRate}</div>
          )}
          {runNeed !== undefined && (
            <div><span className="font-medium">Runs Needed:</span> {runNeed}</div>
          )}
          {last4Overs && last4Overs.length > 0 && (
            <div className="col-span-2">
              <span className="font-medium">Last 4 Overs:</span>
              <ul className="list-disc ml-6">
                {last4Overs.map((o, idx) => (
                  <li key={idx}>
                    Over {o.over}: {o.balls.join(', ')} ({o.runs} runs)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchStatsCard;
