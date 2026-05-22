import { LEADERBOARD, useGameStore } from '@/lib/gameStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';

const rankColors = ['text-yellow-400', 'text-gray-300', 'text-amber-600'];

const LeaderboardPage = () => {
  const { isAuthenticated, team } = useGameStore();
  const navigate = useNavigate();

  useEffect(() => { if (!isAuthenticated) navigate('/login'); }, [isAuthenticated, navigate]);

  const fullBoard = team
    ? [...LEADERBOARD, { rank: 11, team: team.name, score: team.score, members: team.members.length }]
        .sort((a, b) => b.score - a.score)
        .map((entry, i) => ({ ...entry, rank: i + 1 }))
    : LEADERBOARD;

  return (
    <div className="min-h-screen bg-gradient-dark px-4 pt-24 pb-12">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 flex items-center gap-3">
            <Trophy className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-bold text-foreground text-glow">LEADERBOARD</h1>
          </div>

          <div className="space-y-2">
            {fullBoard.map((entry, i) => {
              const isMyTeam = team && entry.team === team.name;
              return (
                <motion.div
                  key={entry.team}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-4 rounded-xl border p-4 transition-all ${
                    isMyTeam ? 'border-primary/50 bg-primary/5' : 'border-border bg-gradient-card'
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center">
                    {entry.rank <= 3 ? (
                      <Medal className={`h-6 w-6 ${rankColors[entry.rank - 1]}`} />
                    ) : (
                      <span className="font-display text-lg font-bold text-muted-foreground">#{entry.rank}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-body font-semibold text-foreground">
                      {entry.team} {isMyTeam && <span className="text-xs text-primary">(You)</span>}
                    </p>
                    <p className="text-xs font-body text-muted-foreground">{entry.members} members</p>
                  </div>
                  <p className="font-display text-lg font-bold text-foreground">{entry.score.toLocaleString()}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
