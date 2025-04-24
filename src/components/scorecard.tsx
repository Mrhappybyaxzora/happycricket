import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Match } from "@/lib/api"
import { mockScorecard } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface ScorecardProps {
  match: Match
}

export default function Scorecard({ match }: ScorecardProps) {
  const scorecard = mockScorecard[match.match_id] || { team1: null, team2: null }

  // Determine which team is currently batting (for live matches)
  const battingTeam = match.batting_team

  if (!scorecard.team1 || !scorecard.team2) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Scorecard not available</p>
      </div>
    )
  }

  return (
    <Tabs defaultValue="team1" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger
          value="team1"
          className={cn(battingTeam === match.team_a && match.match_status.toLowerCase() === "live" && "relative", "transition-colors")}
        >
          {match.team_a_short}
          {battingTeam === match.team_a && match.match_status.toLowerCase() === "live" && (
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          )}
        </TabsTrigger>
        <TabsTrigger
          value="team2"
          className={cn(battingTeam === match.team_b && match.match_status.toLowerCase() === "live" && "relative", "transition-colors")}
        >
          {match.team_b_short}
          {battingTeam === match.team_b && match.match_status.toLowerCase() === "live" && (
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="team1">
        <div className="space-y-6">
          <div
            className={cn(
              "rounded-md border",
              battingTeam === match.team_a && match.match_status.toLowerCase() === "live" && "border-l-4 border-primary",
            )}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batter</TableHead>
                  <TableHead className="text-right">R</TableHead>
                  <TableHead className="text-right">B</TableHead>
                  <TableHead className="text-right">4s</TableHead>
                  <TableHead className="text-right">6s</TableHead>
                  <TableHead className="text-right">SR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scorecard.team1.batting.map((batter) => (
                  <TableRow key={batter.name}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{batter.name}</p>
                        <p className="text-xs text-muted-foreground">{batter.dismissal}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{batter.runs}</TableCell>
                    <TableCell className="text-right">{batter.balls}</TableCell>
                    <TableCell className="text-right">{batter.fours}</TableCell>
                    <TableCell className="text-right">{batter.sixes}</TableCell>
                    <TableCell className="text-right">{batter.strikeRate}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Extras</span>
                      <span>{scorecard.team1.extras}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold">
                      <span>Total</span>
                      <span>{scorecard.team1.total}</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bowler</TableHead>
                  <TableHead className="text-right">O</TableHead>
                  <TableHead className="text-right">M</TableHead>
                  <TableHead className="text-right">R</TableHead>
                  <TableHead className="text-right">W</TableHead>
                  <TableHead className="text-right">Econ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scorecard.team1.bowling.map((bowler) => (
                  <TableRow key={bowler.name}>
                    <TableCell>
                      <p className="font-medium">{bowler.name}</p>
                    </TableCell>
                    <TableCell className="text-right">{bowler.overs}</TableCell>
                    <TableCell className="text-right">{bowler.maidens}</TableCell>
                    <TableCell className="text-right">{bowler.runs}</TableCell>
                    <TableCell className="text-right font-medium">{bowler.wickets}</TableCell>
                    <TableCell className="text-right">{bowler.economy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="team2">
        <div className="space-y-6">
          <div
            className={cn(
              "rounded-md border",
              battingTeam === match.team_b && match.match_status.toLowerCase() === "live" && "border-l-4 border-primary",
            )}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batter</TableHead>
                  <TableHead className="text-right">R</TableHead>
                  <TableHead className="text-right">B</TableHead>
                  <TableHead className="text-right">4s</TableHead>
                  <TableHead className="text-right">6s</TableHead>
                  <TableHead className="text-right">SR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scorecard.team2.batting.map((batter) => (
                  <TableRow key={batter.name}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{batter.name}</p>
                        <p className="text-xs text-muted-foreground">{batter.dismissal}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{batter.runs}</TableCell>
                    <TableCell className="text-right">{batter.balls}</TableCell>
                    <TableCell className="text-right">{batter.fours}</TableCell>
                    <TableCell className="text-right">{batter.sixes}</TableCell>
                    <TableCell className="text-right">{batter.strikeRate}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Extras</span>
                      <span>{scorecard.team2.extras}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold">
                      <span>Total</span>
                      <span>{scorecard.team2.total}</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bowler</TableHead>
                  <TableHead className="text-right">O</TableHead>
                  <TableHead className="text-right">M</TableHead>
                  <TableHead className="text-right">R</TableHead>
                  <TableHead className="text-right">W</TableHead>
                  <TableHead className="text-right">Econ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scorecard.team2.bowling.map((bowler) => (
                  <TableRow key={bowler.name}>
                    <TableCell>
                      <p className="font-medium">{bowler.name}</p>
                    </TableCell>
                    <TableCell className="text-right">{bowler.overs}</TableCell>
                    <TableCell className="text-right">{bowler.maidens}</TableCell>
                    <TableCell className="text-right">{bowler.runs}</TableCell>
                    <TableCell className="text-right font-medium">{bowler.wickets}</TableCell>
                    <TableCell className="text-right">{bowler.economy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

