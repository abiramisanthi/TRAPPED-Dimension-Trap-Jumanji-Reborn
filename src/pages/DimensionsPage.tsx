import { useGameStore, DIMENSIONS } from '@/lib/gameStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock, Play } from 'lucide-react';
import { toast } from 'sonner';

const difficultyColor: Record<string, string> = {
  Easy: 'text-accent', Medium: 'text-foreground', Hard: 'text-primary', Nightmare: 'text-secondary-foreground',
};

const DimensionsPage = () => {
  const { currentUser, isAuthenticated, isDimensionUnlocked, startDimension } = useGameStore();
  const navigate = useNavigate();
  useEffect(() => { if (!isAuthenticated) navigate('/login'); }, [isAuthenticated, navigate]);

  if (!currentUser) return null;

  const completedDimensionIds = currentUser.completedDimensionIds;

  return (
    <div className="min-h-screen bg-gradient-dark px-4 pt-24 pb-12">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-3xl font-bold text-foreground text-glow">10 DIMENSIONS</h1>
          <p className="mb-8 text-sm font-body text-muted-foreground">Only one dimension unlocks at a time. Clear the current mission to open the next movie chapter.</p>

          <div className="grid gap-4 sm:grid-cols-2">
            {DIMENSIONS.map((dim, i) => (
              (() => {
                const unlocked = isDimensionUnlocked(dim.id);
                const completed = completedDimensionIds.includes(dim.id);

                return (
                  <motion.div
                    key={dim.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={`group relative overflow-hidden rounded-xl border bg-gradient-card ${unlocked ? 'border-border' : 'border-border/40 opacity-50'}`}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={dim.image} alt={dim.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" width={768} height={512} />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                      {!unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/65">
                          <Lock className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute left-3 top-3 rounded-full border border-border/80 bg-background/75 px-3 py-1 text-[10px] font-display font-bold tracking-[0.25em] text-foreground backdrop-blur-sm">
                        ZONE {i + 1}
                      </div>
                      {completed && (
                        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-display font-bold tracking-[0.25em] text-accent backdrop-blur-sm">
                          <CheckCircle2 className="h-3 w-3" /> CLEARED
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-sm font-bold text-foreground">{dim.name}</h2>
                        <span className={`text-[10px] font-display font-semibold ${difficultyColor[dim.difficulty]}`}>{dim.difficulty}</span>
                      </div>
                      <p className="mt-2 text-xs font-body leading-relaxed text-muted-foreground line-clamp-3">{dim.description}</p>
                      <button
                        onClick={() => {
                          if (!unlocked) {
                            toast.error('Finish the previous dimension first.');
                            return;
                          }

                          const started = startDimension(dim.id);

                          if (!started) {
                            toast.error('This mission is still locked in the story order.');
                            return;
                          }

                          navigate(`/play/${dim.id}`);
                        }}
                        disabled={!unlocked}
                        className={`mt-4 flex items-center gap-2 rounded-md px-5 py-2.5 font-display text-xs font-bold tracking-wider transition-all ${
                          unlocked ? 'bg-gradient-primary text-primary-foreground hover:scale-[1.02] box-glow' : 'cursor-not-allowed bg-secondary text-muted-foreground'
                        }`}
                      >
                        {unlocked ? <><Play className="h-3 w-3" /> ENTER MISSION</> : <><Lock className="h-3 w-3" /> LOCKED</>}
                      </button>
                    </div>
                  </motion.div>
                );
              })()
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DimensionsPage;
