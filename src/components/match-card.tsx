import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Match } from '@/lib/api';

const getStatusBadge = (status: string) => {
  const lowercaseStatus = status.toLowerCase();
  switch (lowercaseStatus) {
    case "live":
      return (
        <Badge className="bg-primary relative">
          <span className="relative flex items-center">
            <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full mr-1 animate-pulse"></span>
            LIVE
          </span>
        </Badge>
      );
    case "upcoming":
    case "not started":
      return <Badge variant="outline" className="border-secondary text-secondary-foreground">Upcoming</Badge>;
    case "completed":
    case "finished":
      return <Badge variant="secondary">Completed</Badge>;
    default:
      return null;
  }
};

export default function MatchCard({ match }: { match: Match }) {
  // Function to get scores for all innings
  const getAllTeamScores = (teamId: string) => {
    const scores = [];
    const scoreData = teamId === match.team_a ? match.team_a_score : match.team_b_score;

    if (!scoreData) return null;

    // Get all innings scores
    Object.entries(scoreData).forEach(([inning, score]) => {
      if (score && typeof score === 'object' && 'score' in score && 'wicket' in score && 'over' in score) {
        scores.push(`${score.score}/${score.wicket} (${score.over})`);
      }
    });

    return scores.length > 0 ? scores.join(' | ') : null;
  };

  // Determine if a team is currently batting
  const isTeamBatting = (teamId: string) => {
    return match.batting_team === teamId;
  };

  // Get match status details
  const getMatchStatusDetails = () => {
    const lowercaseStatus = match.match_status.toLowerCase();
    
    switch (lowercaseStatus) {
      case "live":
        // For live matches, show need_run_ball or toss details
        if (match.need_run_ball) {
          return match.need_run_ball;
        }
        return match.toss || "Live Match";
      
      case "completed":
      case "finished":
        // For completed matches, show result
        return match.result || "Match Completed";
      
      case "upcoming":
      case "not started":
      default:
        return match.matchs;
    }
  };

  // Determine if this is a live match
  const isLiveMatch = match.match_status.toLowerCase() === "live";

  return (
    <Link 
      href={`/match/${match.match_id}`} 
      className="modern-card block rounded-lg overflow-hidden"
    >
      <div className="p-4 flex flex-col relative">
        {/* Tournament and status header */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-border/30">
          <span className="text-sm text-muted-foreground truncate font-medium">
            {match.tournament_name}
          </span>
          {getStatusBadge(match.match_status)}
        </div>

        {/* Teams and scores section */}
        <div className="mb-4">
          {/* Team A */}
          <div className="flex items-center space-x-3 mb-3">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full overflow-hidden bg-muted/50 border border-border ${isTeamBatting(match.team_a) ? 'ring-2 ring-primary' : ''}`}>
                <Image 
                  src={match.team_a_img} 
                  alt={match.team_a_short} 
                  width={40} 
                  height={40}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="rounded-full"
                />
              </div>
              {isTeamBatting(match.team_a) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
              )}
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold text-sm">
                {match.team_a_short}
              </h3>
              {isTeamBatting(match.team_a) ? (
                <p className="text-xs font-bold text-primary">
                  {getAllTeamScores(match.team_a) || 'Yet to bat'}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {getAllTeamScores(match.team_a) || 'Yet to bat'}
                </p>
              )}
            </div>
          </div>

          {/* Team B */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full overflow-hidden bg-muted/50 border border-border ${isTeamBatting(match.team_b) ? 'ring-2 ring-primary' : ''}`}>
                <Image 
                  src={match.team_b_img} 
                  alt={match.team_b_short} 
                  width={40} 
                  height={40}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="rounded-full"
                />
              </div>
              {isTeamBatting(match.team_b) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
              )}
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold text-sm">
                {match.team_b_short}
              </h3>
              {isTeamBatting(match.team_b) ? (
                <p className="text-xs font-bold text-primary">
                  {getAllTeamScores(match.team_b) || 'Yet to bat'}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {getAllTeamScores(match.team_b) || 'Yet to bat'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Match details */}
        <div className="bg-muted/30 p-2 rounded-md mb-2">
          <div className="text-xs text-muted-foreground mb-1">
            {match.match_time} | {match.match_date}
          </div>
          <div className={`text-xs font-medium ${isLiveMatch ? 'text-primary' : 'text-foreground'}`}>
            {getMatchStatusDetails()}
          </div>
        </div>

        {/* Venue */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground truncate flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {match.venue}
          </p>
        </div>
      </div>
    </Link>
  );
}
