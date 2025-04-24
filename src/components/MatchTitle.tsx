import React from 'react';

interface MatchTitleProps {
  teamA: string;
  teamAShort: string;
  teamAImg?: string;
  teamB: string;
  teamBShort: string;
  teamBImg?: string;
  matchType?: string;
  seriesName?: string;
}

const MatchTitle: React.FC<MatchTitleProps> = ({
  teamA,
  teamAShort,
  teamAImg,
  teamB,
  teamBShort,
  teamBImg,
  matchType,
  seriesName,
}) => (
  <div className="mb-2 px-2">
    {seriesName && (
      <div className="text-xs text-center text-muted-foreground mb-1">
        {seriesName} {matchType && `• ${matchType}`}
      </div>
    )}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
      <div className="flex items-center">
        {teamAImg && (
          <img 
            src={teamAImg} 
            alt={teamA} 
            className="inline-block w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover mr-2" 
          />
        )}
        <span className="font-bold text-base sm:text-lg md:text-xl">
          <span className="hidden sm:inline">{teamA}</span>
          <span className="inline sm:hidden">{teamAShort || teamA}</span>
        </span>
      </div>
      
      <span className="mx-1 sm:mx-2 text-xs sm:text-sm text-muted-foreground">vs</span>
      
      <div className="flex items-center">
        {teamBImg && (
          <img 
            src={teamBImg} 
            alt={teamB} 
            className="inline-block w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover mr-2" 
          />
        )}
        <span className="font-bold text-base sm:text-lg md:text-xl">
          <span className="hidden sm:inline">{teamB}</span>
          <span className="inline sm:hidden">{teamBShort || teamB}</span>
        </span>
      </div>
    </div>
  </div>
);

export default MatchTitle;
