import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { Match } from "@/lib/api"

interface LiveScoreProps {
  match: Match
  className?: string
}

export default function LiveScore({ match, className }: LiveScoreProps) {
  // Determine which team is currently batting (for live matches)
  const battingTeam = match.batting_team

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className={cn("p-6", match.match_status.toLowerCase() === "live" && "border-l-4 border-red-500")}>
        <div className="flex justify-between items-center mb-4">
          {match.match_status.toLowerCase() === "live" && (
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              <Badge className="bg-red-500">LIVE</Badge>
            </div>
          )}
          {match.match_status.toLowerCase() === "completed" && <Badge variant="secondary">Completed</Badge>}
          {match.match_status.toLowerCase() === "upcoming" && <Badge variant="outline">Upcoming</Badge>}
          <span className="text-sm text-muted-foreground">{match.series}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg transition-colors",
                battingTeam === match.team_a && "bg-primary/10",
              )}
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={match.team_a_img}
                  alt={match.team_a_short}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{match.team_a_short}</h3>
                {match.match_status.toLowerCase() !== "upcoming" && match.team_a_score && <p className="text-2xl font-bold">{`${match.team_a_score[match.current_inning]?.score}/${match.team_a_score[match.current_inning]?.wicket} (${match.team_a_score[match.current_inning]?.over})`}</p>}
                {battingTeam === match.team_a && (
                  <Badge variant="outline" className="mt-1">
                    Batting
                  </Badge>
                )}
              </div>
            </div>

            <div
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg transition-colors",
                battingTeam === match.team_b && "bg-primary/10",
              )}
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={match.team_b_img}
                  alt={match.team_b_short}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{match.team_b_short}</h3>
                {match.match_status.toLowerCase() !== "upcoming" && match.team_b_score && <p className="text-2xl font-bold">{`${match.team_b_score[match.current_inning]?.score}/${match.team_b_score[match.current_inning]?.wicket} (${match.team_b_score[match.current_inning]?.over})`}</p>}
                {battingTeam === match.team_b && (
                  <Badge variant="outline" className="mt-1">
                    Batting
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            {match.match_status.toLowerCase() === "upcoming" ? (
              <div>
                <p className="text-lg">Match starts at {match.match_time}</p>
                <p className="text-muted-foreground">{match.match_date}</p>
                <p className="text-muted-foreground mt-2">{match.venue}</p>
              </div>
            ) : match.match_status.toLowerCase() === "completed" ? (
              <div>
                <p className="text-lg font-medium">{match.result}</p>
                <p className="text-muted-foreground mt-2">{match.venue}</p>
              </div>
            ) : (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-lg font-medium mb-2">{match.need_run_ball || match.toss || "Live Match"}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current Run Rate:</span>
                    <span className="font-bold">-</span>
                  </div>
                  {false && (
                    <div className="flex justify-between">
                      <span>Required Run Rate:</span>
                      <span className="font-bold">-</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Last Ball:</span>
                    <span className="font-bold">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Over:</span>
                    <span className="font-mono">1 4 0 W 2 1</span>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 text-sm">{match.venue}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

