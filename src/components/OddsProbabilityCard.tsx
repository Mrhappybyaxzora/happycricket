import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface OddsProbabilityCardProps {
  favTeam?: string;
  minRate?: string | number;
  maxRate?: string | number;
  sessionOver?: string;
  sessionMin?: string | number;
  sessionMax?: string | number;
  currRate?: string | number;
  reqRate?: string | number;
}

const OddsProbabilityCard: React.FC<OddsProbabilityCardProps> = ({
  favTeam, minRate, maxRate, sessionOver, sessionMin, sessionMax, currRate, reqRate
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Probability & Odds</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Odds/Match Rates + Session Over */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Fav</dt>
                <dd className="mt-1 text-lg font-bold">{favTeam}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Min Rate</dt>
                <dd className={cn(
                  "mt-1 text-lg font-bold",
                  Number(minRate) < 2 ? "text-green-600" : "text-red-600"
                )}>{minRate}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Max Rate</dt>
                <dd className={cn(
                  "mt-1 text-lg font-bold",
                  Number(maxRate) < 2 ? "text-green-600" : "text-red-600"
                )}>{maxRate}</dd>
              </div>
            </div>
            {sessionOver && (
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Session Over</dt>
                  <dd className="mt-1 text-lg font-bold">{sessionOver}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Min</dt>
                  <dd className="mt-1 text-lg font-bold">{sessionMin || '-'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Max</dt>
                  <dd className="mt-1 text-lg font-bold">{sessionMax || '-'}</dd>
                </div>
              </div>
            )}
          </div>

          {/* Probability (Current/Required Run Rate) */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-sm text-muted-foreground">Current Run Rate</span>
              <span className="text-2xl font-bold">{currRate ?? '-'}</span>
            </div>
            {reqRate !== undefined && (
              <div className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground">Required Run Rate</span>
                <span className="text-2xl font-bold">{reqRate}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OddsProbabilityCard;
