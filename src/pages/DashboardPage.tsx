import { useGameStore, CHARACTERS } from '@/lib/gameStore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shield, Swords, Star, Map, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { currentUser, team, isAuthenticated, selectCharacter } = useGameStore();
  const navigate = useNavigate();
  const [showCharSelect, setShowCharSelect] = useState(false);

  useEffect(() => { if (!isAuthenticated) navigate('/login'); }, [isAuthenticated, navigate]);
  if (!currentUser) return null;

  const currentChar = CHARACTERS.find(c => c.id === currentUser.characterId) || CHARACTERS[0];

  const statCards = [
    { icon: Heart, label: 'Lives', value: currentUser.lives, color: 'text-primary' },
    { icon: Star, label: 'Level', value: currentUser.level, color: 'text-accent' },
    { icon: Swords, label: 'XP', value: currentUser.xp, color: 'text-foreground' },
    { icon: Shield, label: 'Team', value: team ? team.name : 'None', color: 'text-muted-foreground' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark px-4 pt-24 pb-12">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* Character + Header Section */}
          <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* Character portrait */}
            <div className="relative group cursor-pointer" onClick={() => setShowCharSelect(true)}>
              <div className="relative h-48 w-36 overflow-hidden rounded-2xl border-2 border-border bg-gradient-card transition-all group-hover:border-primary/60 group-hover:box-glow">
                <img
                  src={currentChar.image}
                  alt={currentChar.name}
                  className="h-full w-full object-cover object-top"
                  width={512}
                  height={768}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3">
                  <p className="font-display text-xs font-bold text-primary">{currentChar.name}</p>
                  <p className="text-[10px] font-body text-muted-foreground">{currentChar.class}</p>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-border bg-secondary px-3 py-0.5 text-[10px] font-body text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                Change
              </div>
            </div>

            {/* Player info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground text-glow">{currentUser.name}</h1>
              <p className="text-sm font-body text-muted-foreground">{currentUser.email}</p>
              <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
                <span className="rounded-full bg-primary/15 px-3 py-0.5 font-display text-xs text-primary">{currentChar.class}</span>
                <span className="rounded-full bg-accent/15 px-3 py-0.5 font-display text-xs text-accent">{currentChar.dimension}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {statCards.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-xl border border-border bg-gradient-card p-5">
                  <Icon className={`h-5 w-5 ${s.color}`} />
                  <p className="mt-3 font-display text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs font-body text-muted-foreground">{s.label}</p>
                </div>
              );
            })}
          </div>

          {/* Quick actions */}
          <div className="grid gap-4 md:grid-cols-2">
            <Link to="/dimensions" className="group flex items-center gap-4 rounded-xl border border-border bg-gradient-card p-6 transition-all hover:border-primary/40">
              <Map className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-display text-sm font-bold text-foreground">EXPLORE DIMENSIONS</h3>
                <p className="text-sm font-body text-muted-foreground">Enter the Horror Mansion and begin your journey</p>
              </div>
            </Link>
            <Link to="/team" className="group flex items-center gap-4 rounded-xl border border-border bg-gradient-card p-6 transition-all hover:border-primary/40">
              <Users className="h-8 w-8 text-accent" />
              <div>
                <h3 className="font-display text-sm font-bold text-foreground">{team ? 'MANAGE TEAM' : 'CREATE TEAM'}</h3>
                <p className="text-sm font-body text-muted-foreground">{team ? `${team.members.length} members in ${team.name}` : 'Build your squad of 4 survivors'}</p>
              </div>
            </Link>
          </div>

          {/* Team members with characters */}
          {team && (
            <div className="mt-8">
              <h2 className="mb-4 font-display text-sm font-bold text-foreground">YOUR SQUAD</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {team.members.map((member) => {
                  const memberChar = CHARACTERS.find(c => c.id === member.characterId) || CHARACTERS[0];
                  return (
                    <div key={member.id} className="rounded-xl border border-border bg-gradient-card overflow-hidden">
                      <div className="h-32 overflow-hidden">
                        <img src={memberChar.image} alt={member.name} className="h-full w-full object-cover object-top" loading="lazy" width={512} height={768} />
                      </div>
                      <div className="p-3">
                        <p className="font-display text-xs font-bold text-foreground">{member.name}</p>
                        <p className="text-[10px] font-body text-muted-foreground">Lv.{member.level} · {memberChar.class}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Character Selection Modal */}
      <AnimatePresence>
        {showCharSelect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowCharSelect(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl rounded-2xl border border-border bg-gradient-card p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-6 text-center font-display text-lg font-bold text-foreground text-glow">SELECT YOUR CHARACTER</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {CHARACTERS.map((char) => {
                  const selected = char.id === currentUser.characterId;
                  return (
                    <button
                      key={char.id}
                      onClick={() => { selectCharacter(char.id); setShowCharSelect(false); }}
                      className={`group relative overflow-hidden rounded-xl border-2 transition-all ${
                        selected ? 'border-primary box-glow' : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <div className="h-40 overflow-hidden">
                        <img src={char.image} alt={char.name} className="h-full w-full object-cover object-top transition-transform group-hover:scale-105" loading="lazy" width={512} height={768} />
                      </div>
                      <div className="bg-gradient-to-t from-background to-transparent p-3">
                        <p className="font-display text-xs font-bold text-foreground">{char.name}</p>
                        <p className="text-[10px] font-body text-muted-foreground">{char.class}</p>
                        <p className="text-[10px] font-body text-accent">{char.dimension}</p>
                      </div>
                      {selected && (
                        <div className="absolute top-2 right-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                          ACTIVE
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
