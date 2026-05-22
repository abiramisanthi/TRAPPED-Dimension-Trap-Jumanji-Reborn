import { useState } from 'react';
import { useGameStore, CHARACTERS } from '@/lib/gameStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, LogOut, Plus } from 'lucide-react';
import { toast } from 'sonner';

const TeamPage = () => {
  const { currentUser, team, isAuthenticated, createTeam, joinTeam, leaveTeam } = useGameStore();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [tab, setTab] = useState<'create' | 'join'>('create');

  useEffect(() => { if (!isAuthenticated) navigate('/login'); }, [isAuthenticated, navigate]);
  if (!currentUser) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    createTeam(teamName);
    toast.success('Team created!');
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;
    const ok = joinTeam(inviteCode);
    if (ok) toast.success('Joined team!');
    else toast.error('Invalid invite code');
  };

  const copyCode = () => {
    if (team) { navigator.clipboard.writeText(team.inviteCode); toast.success('Invite code copied!'); }
  };

  return (
    <div className="min-h-screen bg-gradient-dark px-4 pt-24 pb-12">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-8 text-3xl font-bold text-foreground text-glow">TEAM</h1>

          {team ? (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-gradient-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">{team.name}</h2>
                    <p className="text-sm font-body text-muted-foreground">{team.members.length}/4 members</p>
                  </div>
                  <button onClick={leaveTeam} className="flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-body text-muted-foreground transition-colors hover:border-destructive hover:text-destructive">
                    <LogOut className="h-4 w-4" /> Leave
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-md bg-secondary p-3">
                  <span className="text-xs font-display tracking-wider text-muted-foreground">INVITE CODE:</span>
                  <span className="font-display font-bold text-primary">{team.inviteCode}</span>
                  <button onClick={copyCode} className="ml-auto text-muted-foreground transition-colors hover:text-foreground">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-display tracking-wider text-muted-foreground">MEMBERS</p>
                {team.members.map((m, i) => (
                  <div key={m.id || i} className="flex items-center gap-4 rounded-xl border border-border bg-gradient-card p-4">
                    <div className="h-14 w-14 overflow-hidden rounded-xl border border-border bg-secondary">
                      <img
                        src={(CHARACTERS.find((character) => character.id === m.characterId) || CHARACTERS[0]).image}
                        alt={m.name}
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                        width={512}
                        height={768}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-body font-semibold text-foreground">{m.name}</p>
                      <p className="text-xs font-body text-muted-foreground">Level {m.level} • {m.xp} XP • {(CHARACTERS.find((character) => character.id === m.characterId) || CHARACTERS[0]).class}</p>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <span className="text-sm">❤️</span>
                      <span className="text-sm font-body font-semibold">{m.lives}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex rounded-lg border border-border bg-secondary p-1">
                <button onClick={() => setTab('create')} className={`flex-1 rounded-md py-2.5 text-sm font-display font-semibold tracking-wider transition-all ${tab === 'create' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                  CREATE
                </button>
                <button onClick={() => setTab('join')} className={`flex-1 rounded-md py-2.5 text-sm font-display font-semibold tracking-wider transition-all ${tab === 'join' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                  JOIN
                </button>
              </div>

              {tab === 'create' ? (
                <form onSubmit={handleCreate} className="rounded-xl border border-border bg-gradient-card p-6">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-secondary text-3xl"><Plus className="h-8 w-8 text-primary" /></div>
                  <h2 className="mb-1 font-display text-lg font-bold text-foreground">CREATE A TEAM</h2>
                  <p className="mb-6 text-sm font-body text-muted-foreground">Name your squad and invite up to 3 friends.</p>
                  <label className="mb-1 block text-xs font-display tracking-wider text-muted-foreground">TEAM NAME</label>
                  <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="e.g. The Survivors" className="mb-4 w-full rounded-md border border-border bg-secondary px-4 py-3 font-body text-sm text-foreground outline-none focus:border-primary" />
                  <button type="submit" className="w-full rounded-md bg-gradient-primary py-3 font-display text-sm font-bold tracking-wider text-primary-foreground box-glow">CREATE TEAM</button>
                </form>
              ) : (
                <form onSubmit={handleJoin} className="rounded-xl border border-border bg-gradient-card p-6">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-secondary text-3xl"><Users className="h-8 w-8 text-accent" /></div>
                  <h2 className="mb-1 font-display text-lg font-bold text-foreground">JOIN A TEAM</h2>
                  <p className="mb-6 text-sm font-body text-muted-foreground">Enter the invite code shared by your friend.</p>
                  <label className="mb-1 block text-xs font-display tracking-wider text-muted-foreground">INVITE CODE</label>
                  <input type="text" value={inviteCode} onChange={e => setInviteCode(e.target.value.toUpperCase())} placeholder="e.g. A1B2C3" className="mb-4 w-full rounded-md border border-border bg-secondary px-4 py-3 font-display text-sm tracking-widest text-foreground outline-none focus:border-primary" />
                  <button type="submit" className="w-full rounded-md bg-gradient-primary py-3 font-display text-sm font-bold tracking-wider text-primary-foreground box-glow">JOIN TEAM</button>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TeamPage;
