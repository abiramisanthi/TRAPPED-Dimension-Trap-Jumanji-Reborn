import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Play, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

import { CHARACTERS, DIMENSIONS, useGameStore } from '@/lib/gameStore';

const DimensionPlayPage = () => {
  const {
    activeDimensionId,
    completeDimension,
    currentUser,
    isAuthenticated,
    isDimensionUnlocked,
    startDimension,
  } = useGameStore();
  const navigate = useNavigate();
  const { dimensionId } = useParams<{ dimensionId: string }>();

  const dimension = DIMENSIONS.find((entry) => entry.id === dimensionId);
  const currentCharacter = CHARACTERS.find((entry) => entry.id === currentUser?.characterId) || CHARACTERS[0];
  const zoneNumber = dimension ? DIMENSIONS.findIndex((entry) => entry.id === dimension.id) + 1 : 0;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!dimension) {
      navigate('/dimensions');
      return;
    }

    if (!isDimensionUnlocked(dimension.id)) {
      toast.error('This zone is locked until the previous one is cleared.');
      navigate('/dimensions');
      return;
    }

    if (activeDimensionId !== dimension.id) {
      startDimension(dimension.id);
    }
  }, [activeDimensionId, dimension, isAuthenticated, isDimensionUnlocked, navigate, startDimension]);

  if (!dimension || !currentUser) return null;

  const handleMissionComplete = () => {
    completeDimension(dimension.id);
    toast.success(`${dimension.name} cleared. The next dimension is now unlocked.`);
    navigate('/dimensions');
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <section className="relative min-h-screen overflow-hidden px-4 pb-12 pt-24">
        <img src={dimension.image} alt={dimension.name} className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/78 to-background/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />

        <div className="relative z-10 container mx-auto grid min-h-[calc(100vh-8rem)] gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <Link to="/dimensions" className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/30 px-4 py-2 text-xs font-display tracking-[0.25em] text-foreground backdrop-blur-sm transition-colors hover:border-primary/40">
              <ArrowLeft className="h-4 w-4" /> BACK TO DIMENSIONS
            </Link>

            <p className="font-display text-xs tracking-[0.45em] text-primary">ZONE {zoneNumber} LIVE</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-foreground text-glow lg:text-6xl">{dimension.name}</h1>
            <p className="mt-5 max-w-xl text-base font-body leading-relaxed text-secondary-foreground">{dimension.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-3 rounded-2xl bg-portal px-6 py-4 text-sm font-display font-bold tracking-[0.25em] text-portal-foreground box-glow-portal">
                <Play className="h-4 w-4" /> MISSION LIVE
              </button>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/10 px-5 py-4 text-sm font-display tracking-[0.25em] text-primary">
                3 LIVES PER PLAYER
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2rem] border border-border bg-card/75 p-6 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="h-28 w-24 overflow-hidden rounded-2xl border border-border bg-secondary">
                <img src={currentCharacter.image} alt={currentCharacter.name} className="h-full w-full object-cover object-top" loading="lazy" width={512} height={768} />
              </div>
              <div>
                <p className="font-display text-xs tracking-[0.35em] text-primary">ASSIGNED CHARACTER</p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">{currentCharacter.name}</h2>
                <p className="mt-1 text-sm font-body text-muted-foreground">{currentCharacter.class} from {currentCharacter.dimension}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm font-body text-secondary-foreground">
              <div className="rounded-2xl border border-border bg-secondary/35 p-4">
                <p className="font-display text-xs tracking-[0.3em] text-primary">POWER</p>
                <p className="mt-2 leading-relaxed">{currentCharacter.power}</p>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/35 p-4">
                <p className="font-display text-xs tracking-[0.3em] text-primary">WEAKNESS</p>
                <p className="mt-2 leading-relaxed">{currentCharacter.weakness}</p>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/35 p-4">
                <p className="font-display text-xs tracking-[0.3em] text-primary">STORY ORDER</p>
                <p className="mt-2 leading-relaxed">This mission is now the active playable chapter. Finish it here to unlock the next dimension instead of getting stuck on a fake loading message.</p>
              </div>
            </div>

            <button onClick={handleMissionComplete} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-5 py-4 text-sm font-display font-bold tracking-[0.25em] text-primary-foreground transition-transform hover:scale-[1.01] box-glow">
              <CheckCircle2 className="h-4 w-4" /> COMPLETE ZONE & UNLOCK NEXT
            </button>

            <div className="mt-4 flex items-start gap-2 text-xs font-body leading-relaxed text-muted-foreground">
              <ShieldAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              This flow now respects your order: only cleared zones open the next movie chapter.
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DimensionPlayPage;