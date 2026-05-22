import { useGameStore } from '@/lib/gameStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Users, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const revivePacks = [
  { id: 'single', name: '1 Extra Life', lives: 1, price: '₹149', icon: Heart, color: 'text-primary', popular: false },
  { id: 'triple', name: '3 Extra Lives', lives: 3, price: '₹399', icon: Zap, color: 'text-accent', popular: true },
  { id: 'team-rescue', name: 'Team Rescue Pack', lives: 4, price: '₹799', icon: Users, color: 'text-green-400', popular: false, bonus: 'Revives all + team power-up' },
];

const cosmetics = [
  { name: 'Shadow Skin', price: '₹199', type: 'Character Skin' },
  { name: 'Neon Blade', price: '₹149', type: 'Weapon Skin' },
  { name: 'Deep Voice Pack', price: '₹99', type: 'Voice Pack' },
  { name: 'Season Pass', price: '₹599/mo', type: 'VIP · 1 free revive/month' },
];

const StorePage = () => {
  const { isAuthenticated, currentUser, buyLives } = useGameStore();
  const navigate = useNavigate();

  useEffect(() => { if (!isAuthenticated) navigate('/login'); }, [isAuthenticated, navigate]);
  if (!currentUser) return null;

  const handleBuy = (lives: number, name: string) => {
    buyLives(lives);
    toast.success(`Purchased ${name}! +${lives} lives`);
  };

  return (
    <div className="min-h-screen bg-gradient-dark px-4 pt-24 pb-12">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-3xl font-bold text-foreground text-glow">REVIVE STORE</h1>
          <p className="mb-8 text-sm font-body text-muted-foreground">
            Lives remaining: <span className="font-semibold text-primary">{currentUser.lives}</span> · Don't get <span className="text-primary">Trapped Forever</span>
          </p>

          {/* Revive Packs */}
          <h2 className="mb-4 font-display text-sm font-bold tracking-widest text-muted-foreground">REVIVE PACKS</h2>
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {revivePacks.map((pkg, i) => {
              const Icon = pkg.icon;
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-xl border p-6 transition-all hover:scale-[1.02] ${
                    pkg.popular ? 'border-accent bg-accent/5' : 'border-border bg-gradient-card'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-display font-bold text-accent-foreground">
                      BEST VALUE
                    </span>
                  )}
                  <Icon className={`h-8 w-8 ${pkg.color}`} />
                  <h3 className="mt-4 font-display text-sm font-bold text-foreground">{pkg.name}</h3>
                  <p className="mt-1 text-sm font-body text-muted-foreground">+{pkg.lives} lives</p>
                  {pkg.bonus && <p className="mt-1 text-xs font-body text-green-400">{pkg.bonus}</p>}
                  <p className="mt-4 font-display text-2xl font-bold text-foreground">{pkg.price}</p>
                  <button
                    onClick={() => handleBuy(pkg.lives, pkg.name)}
                    className={`mt-4 w-full rounded-md py-2.5 font-display text-xs font-bold tracking-wider transition-all ${
                      pkg.popular
                        ? 'bg-accent text-accent-foreground hover:bg-accent/90 box-glow-accent'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    BUY NOW
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Cosmetics */}
          <h2 className="mb-4 font-display text-sm font-bold tracking-widest text-muted-foreground">COSMETICS & SEASON PASS</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cosmetics.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="rounded-xl border border-border bg-gradient-card p-5"
              >
                <Sparkles className="h-5 w-5 text-accent" />
                <h3 className="mt-3 font-display text-xs font-bold text-foreground">{item.name}</h3>
                <p className="text-[10px] font-body text-muted-foreground">{item.type}</p>
                <p className="mt-2 font-display text-lg font-bold text-foreground">{item.price}</p>
                <button className="mt-3 w-full rounded-md bg-secondary py-2 text-xs font-display font-bold text-foreground transition-all hover:bg-secondary/80">
                  VIEW
                </button>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs font-body text-muted-foreground">
            Simulated store · No real transactions
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default StorePage;
