import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Accepts both API and legacy types. All fields optional for maximum compatibility.
interface Batsman {
  name?: string;
  run?: number;
  ball?: number;
  fours?: number;
  sixes?: number;
  strike_rate?: string;
  strike_status?: number;
  player_id?: number;
  img?: string;
}


// Accepts both API and legacy types. All fields optional for maximum compatibility.
interface Bowler {
  name?: string;
  run?: string | number;
  wicket?: string | number;
  over?: string;
  economy?: string;
  player_id?: number;
  img?: string;
  maiden?: string | number;
}


interface LivePlayersCardProps {
  batsman?: Batsman[];
  bowler?: Bowler | null;
}

const LivePlayersCard: React.FC<LivePlayersCardProps> = ({ batsman, bowler }) => {
  if ((!batsman || batsman.length === 0) && !bowler) return null;
  return (
    <Card className="mb-2 overflow-hidden">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col gap-6 w-full">
          {batsman && batsman.length > 0 && (
            <div>
              <div className="font-semibold mb-2 text-base sm:text-lg">Batsmen</div>
              <div className="overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4">
                <table className="w-full min-w-full border rounded overflow-hidden text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-muted text-muted-foreground">
                      <th className="px-2 py-1.5 text-left font-medium">Name</th>
                      <th className="px-2 py-1.5 text-center font-medium">R</th>
                      <th className="px-2 py-1.5 text-center font-medium">B</th>
                      <th className="px-2 py-1.5 text-center font-medium">4s</th>
                      <th className="px-2 py-1.5 text-center font-medium">6s</th>
                      <th className="px-2 py-1.5 text-center font-medium">SR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batsman.map((b, idx) => (
                      <tr key={b.player_id || idx} className={b.strike_status ? "font-bold bg-primary/10" : ""}>
                        <td className="px-2 py-1.5 text-left whitespace-nowrap">
                          <span className="inline-flex items-center gap-2">
                            {b.img && <img src={b.img} alt={b.name} className="w-6 h-6 rounded-full object-cover" />}
                            {b.name}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 text-center">{b.run}</td>
                        <td className="px-2 py-1.5 text-center">{b.ball}</td>
                        <td className="px-2 py-1.5 text-center">{b.fours}</td>
                        <td className="px-2 py-1.5 text-center">{b.sixes}</td>
                        <td className="px-2 py-1.5 text-center">{b.strike_rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {bowler && (
            <div>
              <div className="font-semibold mb-2 text-base sm:text-lg">Bowler</div>
              <div className="overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4">
                <table className="w-full min-w-full border rounded overflow-hidden text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-muted text-muted-foreground">
                      <th className="px-2 py-1.5 text-left font-medium">Name</th>
                      <th className="px-2 py-1.5 text-center font-medium">O</th>
                      <th className="px-2 py-1.5 text-center font-medium">R</th>
                      <th className="px-2 py-1.5 text-center font-medium">W</th>
                      <th className="px-2 py-1.5 text-center font-medium">Eco</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 py-1.5 text-left whitespace-nowrap">
                        <span className="inline-flex items-center gap-2">
                          {bowler.img && <img src={bowler.img} alt={bowler.name} className="w-6 h-6 rounded-full object-cover" />}
                          {bowler.name}
                        </span>
                      </td>
                      <td className="px-2 py-1.5 text-center">{bowler.over}</td>
                      <td className="px-2 py-1.5 text-center">{bowler.run}</td>
                      <td className="px-2 py-1.5 text-center">{bowler.wicket}</td>
                      <td className="px-2 py-1.5 text-center">{bowler.economy}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LivePlayersCard;
