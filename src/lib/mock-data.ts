export const mockMatches = [
  {
    id: "match1",
    tournament: "ICC T20 World Cup 2023",
    format: "T20",
    team1: {
      name: "India",
      short: "IND",
      score: "184/6 (20)",
    },
    team2: {
      name: "Australia",
      short: "AUS",
      score: "165/9 (20)",
    },
    status: "completed",
    result: "India won by 19 runs",
    venue: "Melbourne Cricket Ground, Melbourne",
    date: "March 15, 2023",
    time: "19:00 IST",
  },
  {
    id: "match2",
    tournament: "IPL 2023",
    format: "T20",
    team1: {
      name: "Chennai Super Kings",
      short: "CSK",
      score: "156/4 (16.2)",
    },
    team2: {
      name: "Mumbai Indians",
      short: "MI",
      score: "155/7 (20)",
    },
    status: "completed",
    result: "Chennai Super Kings won by 6 wickets",
    venue: "Wankhede Stadium, Mumbai",
    date: "March 16, 2023",
    time: "19:30 IST",
  },
  {
    id: "match3",
    tournament: "ICC T20 World Cup 2023",
    format: "T20",
    team1: {
      name: "England",
      short: "ENG",
      score: "112/5 (13.2)",
    },
    team2: {
      name: "South Africa",
      short: "SA",
      score: "189/6 (20)",
    },
    status: "live",
    currentStatus: "England need 78 runs in 40 balls",
    currentRunRate: "8.4",
    requiredRunRate: "11.7",
    venue: "Lord's, London",
    date: "March 17, 2023",
    time: "15:30 IST",
    lastBall: "4",
    lastOver: "1 4 0 W 2 1",
  },
  {
    id: "match4",
    tournament: "ICC T20 World Cup 2023",
    format: "T20",
    team1: {
      name: "New Zealand",
      short: "NZ",
      score: "",
    },
    team2: {
      name: "Pakistan",
      short: "PAK",
      score: "",
    },
    status: "upcoming",
    venue: "Sydney Cricket Ground, Sydney",
    date: "March 18, 2023",
    time: "13:30 IST",
  },
  {
    id: "match5",
    tournament: "IPL 2023",
    format: "T20",
    team1: {
      name: "Royal Challengers Bangalore",
      short: "RCB",
      score: "145/6 (17)",
    },
    team2: {
      name: "Rajasthan Royals",
      short: "RR",
      score: "123/4 (15)",
    },
    status: "live",
    currentStatus: "Rajasthan Royals need 23 runs in 18 balls",
    currentRunRate: "8.2",
    requiredRunRate: "7.6",
    venue: "M. Chinnaswamy Stadium, Bangalore",
    date: "March 17, 2023",
    time: "19:30 IST",
  },
  {
    id: "match6",
    tournament: "IPL 2023",
    format: "T20",
    team1: {
      name: "Delhi Capitals",
      short: "DC",
      score: "",
    },
    team2: {
      name: "Punjab Kings",
      short: "PBKS",
      score: "",
    },
    status: "upcoming",
    venue: "Arun Jaitley Stadium, Delhi",
    date: "March 19, 2023",
    time: "15:30 IST",
  },
]

export const mockCommentary = {
  match3: [
    {
      over: "13.2",
      type: "boundary",
      text: "FOUR! Bairstow smashes it through the covers!",
      detail:
        "Fuller delivery outside off, Bairstow gets down on one knee and drives it through the covers for a boundary.",
    },
    {
      over: "13.1",
      type: "dot",
      text: "No run. Defended back to the bowler.",
      detail: "Good length delivery on middle, Bairstow defends it back to the bowler.",
    },
    {
      over: "12.6",
      type: "single",
      text: "Single taken. End of the over.",
      detail: "Pushed to mid-off for a quick single. England are 107/5 after 12 overs.",
    },
    {
      over: "12.5",
      type: "wicket",
      text: "WICKET! Moeen Ali is caught at long-on!",
      detail:
        "Moeen Ali c Markram b Shamsi 23(18). Tried to go big but didn't get enough on it. South Africa are firmly in control now.",
    },
    {
      over: "12.4",
      type: "six",
      text: "SIX! Moeen Ali goes big!",
      detail: "Tossed up delivery, Moeen gets to the pitch and launches it over long-on for a maximum!",
    },
    {
      over: "12.3",
      type: "single",
      text: "Single taken.",
      detail: "Worked to midwicket for a single.",
    },
    {
      over: "12.2",
      type: "dot",
      text: "No run. Good yorker.",
      detail: "Excellent yorker on the stumps, Moeen digs it out.",
    },
    {
      over: "12.1",
      type: "boundary",
      text: "FOUR! Moeen finds the gap!",
      detail: "Short delivery outside off, Moeen cuts it past point for a boundary.",
    },
  ],
  match5: [
    {
      over: "15.0",
      type: "single",
      text: "Single taken. End of the over.",
      detail: "Pushed to cover for a quick single. Rajasthan Royals are 123/4 after 15 overs.",
    },
    {
      over: "14.5",
      type: "boundary",
      text: "FOUR! Samson finds the gap!",
      detail: "Short delivery outside off, Samson cuts it past point for a boundary.",
    },
    {
      over: "14.4",
      type: "dot",
      text: "No run. Good yorker.",
      detail: "Excellent yorker on the stumps, Samson digs it out.",
    },
    {
      over: "14.3",
      type: "single",
      text: "Single taken.",
      detail: "Worked to midwicket for a single.",
    },
    {
      over: "14.2",
      type: "wicket",
      text: "WICKET! Hetmyer is caught behind!",
      detail: "Hetmyer c Karthik b Siraj 32(22). Slight edge and Karthik takes a good catch. Big wicket for RCB!",
    },
  ],
}

export interface BattingStats {
  name: string
  dismissal: string
  runs: number
  balls: number
  fours: number
  sixes: number
  strikeRate: number
}

export interface BowlingStats {
  name: string
  overs: string
  maidens: number
  runs: number
  wickets: number
  economy: number
}

export interface TeamScorecard {
  batting: BattingStats[]
  bowling: BowlingStats[]
  extras: string
  total: string
}

export interface Scorecard {
  team1: TeamScorecard | null
  team2: TeamScorecard | null
}

export const mockScorecard: Record<string, Scorecard> = {
  match1: {
    team1: {
      batting: [
        {
          name: "Rohit Sharma",
          dismissal: "c Smith b Starc",
          runs: 42,
          balls: 30,
          fours: 4,
          sixes: 2,
          strikeRate: 140.0,
        },
        { name: "KL Rahul", dismissal: "b Hazlewood", runs: 35, balls: 28, fours: 3, sixes: 1, strikeRate: 125.0 },
        {
          name: "Virat Kohli",
          dismissal: "c Carey b Cummins",
          runs: 57,
          balls: 40,
          fours: 5,
          sixes: 2,
          strikeRate: 142.5,
        },
        {
          name: "Suryakumar Yadav",
          dismissal: "c Maxwell b Starc",
          runs: 25,
          balls: 14,
          fours: 2,
          sixes: 2,
          strikeRate: 178.57,
        },
        { name: "Hardik Pandya", dismissal: "not out", runs: 15, balls: 6, fours: 1, sixes: 1, strikeRate: 250.0 },
        { name: "Rishabh Pant", dismissal: "run out", runs: 8, balls: 2, fours: 2, sixes: 0, strikeRate: 400.0 },
      ],
      bowling: [
        { name: "Mitchell Starc", overs: "4.0", maidens: 0, runs: 42, wickets: 2, economy: 10.5 },
        { name: "Josh Hazlewood", overs: "4.0", maidens: 0, runs: 32, wickets: 1, economy: 8.0 },
        { name: "Pat Cummins", overs: "4.0", maidens: 0, runs: 36, wickets: 1, economy: 9.0 },
        { name: "Adam Zampa", overs: "4.0", maidens: 0, runs: 38, wickets: 0, economy: 9.5 },
        { name: "Glenn Maxwell", overs: "4.0", maidens: 0, runs: 34, wickets: 1, economy: 8.5 },
      ],
      extras: "2 (1 w, 1 nb)",
      total: "184/6 (20 overs)",
    },
    team2: {
      batting: [
        { name: "David Warner", dismissal: "b Bumrah", runs: 28, balls: 21, fours: 3, sixes: 1, strikeRate: 133.33 },
        { name: "Aaron Finch", dismissal: "lbw b Shami", runs: 15, balls: 12, fours: 2, sixes: 0, strikeRate: 125.0 },
        {
          name: "Mitchell Marsh",
          dismissal: "c Kohli b Chahal",
          runs: 37,
          balls: 28,
          fours: 3,
          sixes: 2,
          strikeRate: 132.14,
        },
        { name: "Glenn Maxwell", dismissal: "b Bumrah", runs: 32, balls: 18, fours: 2, sixes: 3, strikeRate: 177.78 },
        {
          name: "Steve Smith",
          dismissal: "c Rahul b Shami",
          runs: 24,
          balls: 20,
          fours: 2,
          sixes: 0,
          strikeRate: 120.0,
        },
        {
          name: "Marcus Stoinis",
          dismissal: "c Pant b Bumrah",
          runs: 18,
          balls: 12,
          fours: 1,
          sixes: 1,
          strikeRate: 150.0,
        },
        { name: "Tim David", dismissal: "not out", runs: 8, balls: 5, fours: 1, sixes: 0, strikeRate: 160.0 },
        { name: "Pat Cummins", dismissal: "run out", runs: 2, balls: 2, fours: 0, sixes: 0, strikeRate: 100.0 },
        {
          name: "Mitchell Starc",
          dismissal: "c Pandya b Shami",
          runs: 0,
          balls: 1,
          fours: 0,
          sixes: 0,
          strikeRate: 0.0,
        },
      ],
      bowling: [
        { name: "Jasprit Bumrah", overs: "4.0", maidens: 0, runs: 25, wickets: 3, economy: 6.25 },
        { name: "Mohammed Shami", overs: "4.0", maidens: 0, runs: 32, wickets: 3, economy: 8.0 },
        { name: "Bhuvneshwar Kumar", overs: "4.0", maidens: 0, runs: 38, wickets: 0, economy: 9.5 },
        { name: "Yuzvendra Chahal", overs: "4.0", maidens: 0, runs: 35, wickets: 1, economy: 8.75 },
        { name: "Hardik Pandya", overs: "4.0", maidens: 0, runs: 33, wickets: 1, economy: 8.25 },
      ],
      extras: "1 (1 w)",
      total: "165/9 (20 overs)",
    },
  },
  match3: {
    team1: {
      batting: [
        {
          name: "Jos Buttler",
          dismissal: "c de Kock b Rabada",
          runs: 18,
          balls: 15,
          fours: 2,
          sixes: 1,
          strikeRate: 120.0,
        },
        { name: "Jason Roy", dismissal: "b Nortje", runs: 22, balls: 18, fours: 3, sixes: 0, strikeRate: 122.22 },
        {
          name: "Dawid Malan",
          dismissal: "c Miller b Maharaj",
          runs: 15,
          balls: 12,
          fours: 1,
          sixes: 1,
          strikeRate: 125.0,
        },
        { name: "Jonny Bairstow", dismissal: "not out", runs: 42, balls: 28, fours: 4, sixes: 1, strikeRate: 150.0 },
        {
          name: "Moeen Ali",
          dismissal: "c Markram b Shamsi",
          runs: 23,
          balls: 18,
          fours: 1,
          sixes: 2,
          strikeRate: 127.78,
        },
      ],
      bowling: [
        { name: "Kagiso Rabada", overs: "4.0", maidens: 0, runs: 35, wickets: 2, economy: 8.75 },
        { name: "Anrich Nortje", overs: "4.0", maidens: 0, runs: 32, wickets: 1, economy: 8.0 },
        { name: "Lungi Ngidi", overs: "4.0", maidens: 0, runs: 45, wickets: 0, economy: 11.25 },
        { name: "Keshav Maharaj", overs: "4.0", maidens: 0, runs: 38, wickets: 2, economy: 9.5 },
        { name: "Tabraiz Shamsi", overs: "4.0", maidens: 0, runs: 37, wickets: 1, economy: 9.25 },
      ],
      extras: "2 (1 w, 1 nb)",
      total: "112/5 (13.2 overs)",
    },
    team2: {
      batting: [
        {
          name: "Quinton de Kock",
          dismissal: "c Buttler b Archer",
          runs: 42,
          balls: 30,
          fours: 5,
          sixes: 1,
          strikeRate: 140.0,
        },
        { name: "Reeza Hendricks", dismissal: "b Woakes", runs: 28, balls: 22, fours: 3, sixes: 1, strikeRate: 127.27 },
        {
          name: "Aiden Markram",
          dismissal: "c Roy b Rashid",
          runs: 35,
          balls: 25,
          fours: 2,
          sixes: 2,
          strikeRate: 140.0,
        },
        {
          name: "Temba Bavuma",
          dismissal: "c Malan b Archer",
          runs: 18,
          balls: 15,
          fours: 1,
          sixes: 1,
          strikeRate: 120.0,
        },
        { name: "David Miller", dismissal: "not out", runs: 38, balls: 20, fours: 2, sixes: 3, strikeRate: 190.0 },
        {
          name: "Heinrich Klaasen",
          dismissal: "c Bairstow b Jordan",
          runs: 22,
          balls: 10,
          fours: 2,
          sixes: 1,
          strikeRate: 220.0,
        },
        { name: "Marco Jansen", dismissal: "not out", runs: 5, balls: 3, fours: 0, sixes: 0, strikeRate: 166.67 },
      ],
      bowling: [
        { name: "Jofra Archer", overs: "4.0", maidens: 0, runs: 32, wickets: 2, economy: 8.0 },
        { name: "Chris Woakes", overs: "4.0", maidens: 0, runs: 38, wickets: 1, economy: 9.5 },
        { name: "Mark Wood", overs: "4.0", maidens: 0, runs: 45, wickets: 0, economy: 11.25 },
        { name: "Adil Rashid", overs: "4.0", maidens: 0, runs: 36, wickets: 1, economy: 9.0 },
        { name: "Chris Jordan", overs: "4.0", maidens: 0, runs: 36, wickets: 2, economy: 9.0 },
      ],
      extras: "1 (1 w)",
      total: "189/6 (20 overs)",
    },
  },
  match5: {
    team1: {
      batting: [
        {
          name: "Virat Kohli",
          dismissal: "c Samson b Boult",
          runs: 38,
          balls: 32,
          fours: 4,
          sixes: 1,
          strikeRate: 118.75,
        },
        { name: "Faf du Plessis", dismissal: "b Chahal", runs: 25, balls: 20, fours: 3, sixes: 0, strikeRate: 125.0 },
        {
          name: "Glenn Maxwell",
          dismissal: "c Buttler b Ashwin",
          runs: 32,
          balls: 18,
          fours: 2,
          sixes: 3,
          strikeRate: 177.78,
        },
        { name: "Dinesh Karthik", dismissal: "not out", runs: 28, balls: 15, fours: 3, sixes: 1, strikeRate: 186.67 },
        {
          name: "Shahbaz Ahmed",
          dismissal: "c Parag b Boult",
          runs: 12,
          balls: 10,
          fours: 1,
          sixes: 0,
          strikeRate: 120.0,
        },
        { name: "Wanindu Hasaranga", dismissal: "run out", runs: 8, balls: 5, fours: 1, sixes: 0, strikeRate: 160.0 },
      ],
      bowling: [
        { name: "Trent Boult", overs: "4.0", maidens: 0, runs: 28, wickets: 2, economy: 7.0 },
        { name: "Prasidh Krishna", overs: "3.0", maidens: 0, runs: 32, wickets: 0, economy: 10.67 },
        { name: "Yuzvendra Chahal", overs: "4.0", maidens: 0, runs: 25, wickets: 1, economy: 6.25 },
        { name: "R Ashwin", overs: "4.0", maidens: 0, runs: 35, wickets: 1, economy: 8.75 },
        { name: "Obed McCoy", overs: "2.0", maidens: 0, runs: 23, wickets: 1, economy: 11.5 },
      ],
      extras: "2 (1 w, 1 nb)",
      total: "145/6 (17 overs)",
    },
    team2: {
      batting: [
        { name: "Jos Buttler", dismissal: "b Siraj", runs: 28, balls: 22, fours: 3, sixes: 1, strikeRate: 127.27 },
        {
          name: "Yashasvi Jaiswal",
          dismissal: "c Kohli b Hasaranga",
          runs: 15,
          balls: 12,
          fours: 2,
          sixes: 0,
          strikeRate: 125.0,
        },
        { name: "Sanju Samson", dismissal: "not out", runs: 42, balls: 30, fours: 4, sixes: 2, strikeRate: 140.0 },
        { name: "Devdutt Padikkal", dismissal: "b Hasaranga", runs: 5, balls: 8, fours: 0, sixes: 0, strikeRate: 62.5 },
        {
          name: "Shimron Hetmyer",
          dismissal: "c Karthik b Siraj",
          runs: 32,
          balls: 22,
          fours: 3,
          sixes: 2,
          strikeRate: 145.45,
        },
      ],
      bowling: [
        { name: "Mohammed Siraj", overs: "4.0", maidens: 0, runs: 28, wickets: 2, economy: 7.0 },
        { name: "Josh Hazlewood", overs: "3.0", maidens: 0, runs: 25, wickets: 0, economy: 8.33 },
        { name: "Wanindu Hasaranga", overs: "4.0", maidens: 0, runs: 22, wickets: 2, economy: 5.5 },
        { name: "Harshal Patel", overs: "3.0", maidens: 0, runs: 32, wickets: 0, economy: 10.67 },
        { name: "Shahbaz Ahmed", overs: "1.0", maidens: 0, runs: 15, wickets: 0, economy: 15.0 },
      ],
      extras: "1 (1 w)",
      total: "123/4 (15 overs)",
    },
  },
}

export interface MatchInfo {
  series: string
  match: string
  venue: string
  date: string
  time: string
  toss: string
  umpires: string[]
  thirdUmpire: string
  matchReferee: string
  weather: string
  pitch: string
}

export const mockMatchInfo: Record<string, MatchInfo> = {
  match1: {
    series: "ICC T20 World Cup 2023",
    match: "Final",
    venue: "Melbourne Cricket Ground, Melbourne",
    date: "March 15, 2023",
    time: "19:00 IST",
    toss: "Australia won the toss and elected to field",
    umpires: ["Kumar Dharmasena", "Richard Kettleborough"],
    thirdUmpire: "Nitin Menon",
    matchReferee: "Ranjan Madugalle",
    weather: "Clear, 22°C",
    pitch: "Good batting surface with some assistance for spinners",
  },
  match2: {
    series: "IPL 2023",
    match: "Match 12",
    venue: "Wankhede Stadium, Mumbai",
    date: "March 16, 2023",
    time: "19:30 IST",
    toss: "Mumbai Indians won the toss and elected to bat",
    umpires: ["Anil Chaudhary", "Virender Sharma"],
    thirdUmpire: "K.N. Ananthapadmanabhan",
    matchReferee: "Javagal Srinath",
    weather: "Partly cloudy, 28°C",
    pitch: "Batting friendly with even bounce",
  },
  match3: {
    series: "ICC T20 World Cup 2023",
    match: "Semi-Final 1",
    venue: "Lord's, London",
    date: "March 17, 2023",
    time: "15:30 IST",
    toss: "England won the toss and elected to field",
    umpires: ["Chris Gaffaney", "Joel Wilson"],
    thirdUmpire: "Paul Reiffel",
    matchReferee: "Jeff Crowe",
    weather: "Overcast, 18°C",
    pitch: "Good pace and bounce, might assist seamers early on",
  },
  match5: {
    series: "IPL 2023",
    match: "Match 15",
    venue: "M. Chinnaswamy Stadium, Bangalore",
    date: "March 17, 2023",
    time: "19:30 IST",
    toss: "Rajasthan Royals won the toss and elected to field",
    umpires: ["Nitin Menon", "S. Ravi"],
    thirdUmpire: "C. Shamshuddin",
    matchReferee: "Manu Nayyar",
    weather: "Clear, 24°C",
    pitch: "Batting friendly with short boundaries, high-scoring match expected",
  },
}

export interface TimelineEvent {
  time: string
  over: string
  type: "info" | "wicket" | "boundary" | "over" | "milestone" | "six"
  title: string
  description: string
}

export const mockTimeline: Record<string, TimelineEvent[]> = {
  match1: [
    {
      time: "19:00",
      over: "0.0",
      type: "info",
      title: "Match Started",
      description: "India won the toss and elected to bat first.",
    },
    {
      time: "19:15",
      over: "2.4",
      type: "boundary",
      title: "Rohit Sharma hits a boundary",
      description: "Rohit Sharma flicks it off his pads for a beautiful four through midwicket.",
    },
    {
      time: "19:28",
      over: "5.2",
      type: "wicket",
      title: "KL Rahul dismissed",
      description: "KL Rahul b Hazlewood 35(28). Clean bowled by a perfect yorker from Hazlewood.",
    },
    {
      time: "19:45",
      over: "10.0",
      type: "milestone",
      title: "India reach 100",
      description: "India reach 100/1 at the halfway mark. Good platform set for a big total.",
    },
    {
      time: "20:05",
      over: "15.3",
      type: "six",
      title: "Kohli hits a massive six",
      description: "Virat Kohli launches Zampa over long-on for a huge six! That's 85 meters!",
    },
    {
      time: "20:20",
      over: "19.4",
      type: "wicket",
      title: "Kohli departs",
      description: "Virat Kohli c Carey b Cummins 57(40). Excellent innings comes to an end.",
    },
    {
      time: "20:30",
      over: "20.0",
      type: "info",
      title: "End of Innings",
      description: "India finish at 184/6. Australia need 185 to win.",
    },
    {
      time: "20:50",
      over: "3.2",
      type: "wicket",
      title: "Warner dismissed",
      description: "David Warner b Bumrah 28(21). Bumrah strikes with a perfect yorker!",
    },
    {
      time: "21:15",
      over: "10.0",
      type: "milestone",
      title: "Australia reach 100",
      description: "Australia reach 100/3 at the halfway mark. Match evenly poised.",
    },
    {
      time: "21:40",
      over: "17.3",
      type: "wicket",
      title: "Maxwell departs",
      description: "Glenn Maxwell b Bumrah 32(18). Crucial breakthrough for India!",
    },
    {
      time: "22:00",
      over: "20.0",
      type: "info",
      title: "Match Ended",
      description: "India win by 19 runs! Australia finish at 165/9.",
    },
  ],
  match3: [
    {
      time: "15:30",
      over: "0.0",
      type: "info",
      title: "Match Started",
      description: "England won the toss and elected to field first.",
    },
    {
      time: "15:45",
      over: "3.4",
      type: "boundary",
      title: "de Kock hits a boundary",
      description: "Quinton de Kock drives it through the covers for a beautiful four.",
    },
    {
      time: "16:10",
      over: "10.0",
      type: "milestone",
      title: "South Africa reach 100",
      description: "South Africa reach 100/2 at the halfway mark. Good platform set.",
    },
    {
      time: "16:35",
      over: "17.2",
      type: "six",
      title: "Miller hits a massive six",
      description: "David Miller launches Jordan over long-on for a huge six! That's 95 meters!",
    },
    {
      time: "16:50",
      over: "20.0",
      type: "info",
      title: "End of Innings",
      description: "South Africa finish at 189/6. England need 190 to win.",
    },
    {
      time: "17:10",
      over: "2.3",
      type: "wicket",
      title: "Buttler dismissed",
      description: "Jos Buttler c de Kock b Rabada 18(15). Big blow for England!",
    },
    {
      time: "17:30",
      over: "8.4",
      type: "wicket",
      title: "Malan departs",
      description: "Dawid Malan c Miller b Maharaj 15(12). England in trouble now.",
    },
    {
      time: "17:45",
      over: "12.5",
      type: "wicket",
      title: "Moeen Ali dismissed",
      description: "Moeen Ali c Markram b Shamsi 23(18). South Africa firmly in control.",
    },
  ],
  match5: [
    {
      time: "19:30",
      over: "0.0",
      type: "info",
      title: "Match Started",
      description: "Rajasthan Royals won the toss and elected to field first.",
    },
    {
      time: "19:45",
      over: "3.2",
      type: "boundary",
      title: "Kohli hits a boundary",
      description: "Virat Kohli drives it through the covers for a beautiful four.",
    },
    {
      time: "20:00",
      over: "6.4",
      type: "wicket",
      title: "du Plessis dismissed",
      description: "Faf du Plessis b Chahal 25(20). Chahal strikes with a perfect googly!",
    },
    {
      time: "20:15",
      over: "10.0",
      type: "milestone",
      title: "RCB reach 85",
      description: "RCB reach 85/2 at the halfway mark. Looking good for a big total.",
    },
    {
      time: "20:30",
      over: "12.3",
      type: "six",
      title: "Maxwell hits a massive six",
      description: "Glenn Maxwell launches Ashwin over long-on for a huge six! That's 90 meters!",
    },
    {
      time: "20:45",
      over: "17.0",
      type: "info",
      title: "End of Innings",
      description: "RCB finish at 145/6. Rajasthan Royals need 146 to win.",
    },
    {
      time: "21:05",
      over: "3.4",
      type: "wicket",
      title: "Buttler dismissed",
      description: "Jos Buttler b Siraj 28(22). Big blow for Rajasthan!",
    },
    {
      time: "21:25",
      over: "8.2",
      type: "wicket",
      title: "Padikkal departs",
      description: "Devdutt Padikkal b Hasaranga 5(8). Hasaranga strikes with a perfect googly!",
    },
    {
      time: "21:40",
      over: "14.2",
      type: "wicket",
      title: "Hetmyer dismissed",
      description: "Shimron Hetmyer c Karthik b Siraj 32(22). Crucial breakthrough for RCB!",
    },
  ],
}

export const mockTournaments = [
  {
    id: "t20-world-cup",
    name: "T20 World Cup 2023",
    standings: [
      { team: "India", matches: 7, won: 7, lost: 0, tied: 0, nrr: "+1.28", points: 14 },
      { team: "South Africa", matches: 7, won: 6, lost: 1, tied: 0, nrr: "+1.05", points: 12 },
      { team: "Australia", matches: 7, won: 5, lost: 2, tied: 0, nrr: "+0.97", points: 10 },
      { team: "England", matches: 7, won: 4, lost: 3, tied: 0, nrr: "+0.68", points: 8 },
      { team: "New Zealand", matches: 7, won: 3, lost: 4, tied: 0, nrr: "+0.12", points: 6 },
      { team: "Pakistan", matches: 7, won: 3, lost: 4, tied: 0, nrr: "-0.23", points: 6 },
      { team: "West Indies", matches: 7, won: 2, lost: 5, tied: 0, nrr: "-0.78", points: 4 },
      { team: "Afghanistan", matches: 7, won: 2, lost: 5, tied: 0, nrr: "-0.89", points: 4 },
      { team: "Bangladesh", matches: 7, won: 1, lost: 6, tied: 0, nrr: "-1.25", points: 2 },
      { team: "Sri Lanka", matches: 7, won: 1, lost: 6, tied: 0, nrr: "-1.52", points: 2 },
    ],
  },
  {
    id: "ipl-2023",
    name: "IPL 2023",
    standings: [
      { team: "Chennai Super Kings", matches: 5, won: 4, lost: 1, tied: 0, nrr: "+1.20", points: 8 },
      { team: "Rajasthan Royals", matches: 5, won: 4, lost: 1, tied: 0, nrr: "+0.80", points: 8 },
      { team: "Royal Challengers Bangalore", matches: 5, won: 3, lost: 2, tied: 0, nrr: "+0.35", points: 6 },
      { team: "Gujarat Titans", matches: 5, won: 3, lost: 2, tied: 0, nrr: "+0.25", points: 6 },
      { team: "Lucknow Super Giants", matches: 5, won: 3, lost: 2, tied: 0, nrr: "+0.15", points: 6 },
      { team: "Delhi Capitals", matches: 5, won: 2, lost: 3, tied: 0, nrr: "-0.15", points: 4 },
      { team: "Punjab Kings", matches: 5, won: 2, lost: 3, tied: 0, nrr: "-0.25", points: 4 },
      { team: "Kolkata Knight Riders", matches: 5, won: 2, lost: 3, tied: 0, nrr: "-0.35", points: 4 },
      { team: "Sunrisers Hyderabad", matches: 5, won: 1, lost: 4, tied: 0, nrr: "-0.80", points: 2 },
      { team: "Mumbai Indians", matches: 5, won: 1, lost: 4, tied: 0, nrr: "-1.20", points: 2 },
    ],
  },
  {
    id: "odi-world-cup",
    name: "ODI World Cup 2023",
    standings: [
      { team: "Australia", matches: 9, won: 8, lost: 1, tied: 0, nrr: "+1.58", points: 16 },
      { team: "India", matches: 9, won: 8, lost: 1, tied: 0, nrr: "+1.17", points: 16 },
      { team: "South Africa", matches: 9, won: 7, lost: 2, tied: 0, nrr: "+0.87", points: 14 },
      { team: "England", matches: 9, won: 6, lost: 3, tied: 0, nrr: "+0.72", points: 12 },
      { team: "New Zealand", matches: 9, won: 5, lost: 4, tied: 0, nrr: "+0.48", points: 10 },
      { team: "Pakistan", matches: 9, won: 4, lost: 5, tied: 0, nrr: "-0.13", points: 8 },
      { team: "Bangladesh", matches: 9, won: 3, lost: 6, tied: 0, nrr: "-0.42", points: 6 },
      { team: "Afghanistan", matches: 9, won: 3, lost: 6, tied: 0, nrr: "-0.76", points: 6 },
      { team: "Sri Lanka", matches: 9, won: 2, lost: 7, tied: 0, nrr: "-1.05", points: 4 },
      { team: "West Indies", matches: 9, won: 1, lost: 8, tied: 0, nrr: "-1.57", points: 2 },
    ],
  },
]

