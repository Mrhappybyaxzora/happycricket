import axios from 'axios';

const API_KEY = 'e2c5f7a19b3d4e6a8f0c2d7b5a1e3f9g';

const BASE_URL = 'https://api.crictez.in/v7';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
   // 'Content-Type': 'form-urlencoded',
    'Accept': 'application/json'
  }
});

export interface ScoreDetails {
  score: number;
  wicket: number;
  ball: number;
  over: string;
}

export interface NeedRunBall {
  run: number;
  ball: number;
}

export interface Match {
  match_id: string;
  match_status: string;
  team_a_short: string;
  team_b_short: string;
  team_a_img: string;
  team_b_img: string;
  match_date: string;
  match_time: string;
  venue: string;
  tournament_name: string;
  team_a_score: Record<number, ScoreDetails>;
  team_b_score: Record<number, ScoreDetails>;
  current_inning: number;
  batting_team: string;
  team_a: string;
  team_b: string;
  series: string;
  matchs: string;
  need_run_ball?: string;
  toss?: string;
  result?: string;
}

export const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.data || [];
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};

export const fetchHomeList = async (): Promise<Match[]> => {
  try {
    const response = await api.get(`/homeList/${API_KEY}`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching home list:', error);
    throw error;
  }
};

export const fetchLiveMatchList = async (): Promise<Match[]> => {
  try {
    const response = await api.get(`/liveMatchList/${API_KEY}`);
    const matches = response.data.data || [];
    return matches.map((match: any) => {
      // Ensure score objects are properly formatted
      const team_a_score: Record<number, ScoreDetails> = {};
      const team_b_score: Record<number, ScoreDetails> = {};

      // Process team A scores
      if (match.team_a_score) {
        Object.entries(match.team_a_score).forEach(([inning, score]: [string, any]) => {
          if (score && typeof score === 'object') {
            team_a_score[Number(inning)] = {
              score: Number(score.score || 0),
              wicket: Number(score.wicket || 0),
              ball: Number(score.ball || 0),
              over: String(score.over || '0.0')
            };
          }
        });
      }

      // Process team B scores
      if (match.team_b_score) {
        Object.entries(match.team_b_score).forEach(([inning, score]: [string, any]) => {
          if (score && typeof score === 'object') {
            team_b_score[Number(inning)] = {
              score: Number(score.score || 0),
              wicket: Number(score.wicket || 0),
              ball: Number(score.ball || 0),
              over: String(score.over || '0.0')
            };
          }
        });
      }

      return {
        ...match,
        team_a_score,
        team_b_score,
        current_inning: Number(match.current_inning || 1)
      };
    });
  } catch (error) {
    console.error('Error fetching live match list:', error);
    throw error;
  }
};

export const fetchMatchDetails = async (matchPath: string) => {
  try {
    // Extract match ID from the path, removing any leading slash
    const matchId = matchPath.replace(/^\//, '')

    const formData = new URLSearchParams()
    formData.append('match_id', matchId)

    const response = await api.post(`/liveMatch/${API_KEY}`, formData);
    const data = response.data.data || null;

    // Transform data to ensure consistent typing
    if (data) {
      return {
        ...data,
        team_a_score: transformScores(data.team_a_score),
        team_b_score: transformScores(data.team_b_score)
      };
    }

    return null;
  } catch (error) {
    console.error(`Error fetching match details for ${matchPath}:`, error);
    throw error;
  }
};


export const fetchMatchInfo = async (matchPath: string) => {
  try {
    // Extract match ID from the path, removing any leading slash
    const matchId = matchPath.replace(/^\//, '')

    const formData = new URLSearchParams()
    formData.append('match_id', matchId)

    const response = await api.post(`/matchInfo/${API_KEY}`, formData);
    const data = response.data.data || null;
    
    return data;
  } catch (error) {
    console.error(`Error fetching match details for ${matchPath}:`, error);
    throw error;
  }
};

// Helper function to transform score objects
const transformScores = (scores?: Record<number, any>): Record<number, ScoreDetails> => {
  if (!scores) return {};

  const transformedScores: Record<number, ScoreDetails> = {};
  Object.entries(scores).forEach(([inning, score]) => {
    if (score && typeof score === 'object') {
      transformedScores[Number(inning)] = {
        score: Number(score.score || 0),
        wicket: Number(score.wicket || 0),
        ball: Number(score.ball || 0),
        over: String(score.over || '0.0')
      };
    }
  });

  return transformedScores;
};
