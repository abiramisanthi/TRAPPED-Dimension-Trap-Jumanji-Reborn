import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Users, Skull, ChevronRight, Star, Gamepad2, Shield } from 'lucide-react';
import heroImg from '@/assets/hero-character.jpg';
import zoneHorrorMansion from '@/assets/horror-mansion.jpg';
import zoneZombieCity from '@/assets/zone-zombie-city.jpg';
import zoneDinoJungle from '@/assets/zone-dino-jungle.jpg';
import zoneAlienPlanet from '@/assets/zone-alien-planet.jpg';
import zoneFrozenWorld from '@/assets/zone-frozen-world.jpg';
import zoneUnderwater from '@/assets/zone-underwater.jpg';
import zoneDarkDimension from '@/assets/zone-dark-dimension.jpg';
import zoneAncientTemple from '@/assets/zone-ancient-temple.jpg';
import zoneCyberpunk from '@/assets/zone-cyberpunk.jpg';
import zoneFinalBoss from '@/assets/zone-final-boss.jpg';

const scenes = [
  { name: 'Horror Mansion', img: zoneHorrorMansion },
  { name: 'Zombie City', img: zoneZombieCity },
  { name: 'Dinosaur Jungle', img: zoneDinoJungle },
  { name: 'Alien Planet', img: zoneAlienPlanet },
  { name: 'Frozen World', img: zoneFrozenWorld },
  { name: 'Ocean World', img: zoneUnderwater },
  { name: 'Dark Dimension', img: zoneDarkDimension },
  { name: 'Ancient Temple', img: zoneAncientTemple },
  { name: 'Cyberpunk City', img: zoneCyberpunk },
  { name: 'Final Boss', img: zoneFinalBoss },
];

const tags = ['Action', 'Adventure', 'Survival', 'Multiplayer'];

const features = [
  { title: '4 Players', desc: 'Create a private room or match worldwide. Exactly 4 survivors per team.', icon: Users },
  { title: 'Dice Roll', desc: 'A cinematic assignment sequence drops each player into a balanced role with a power and a weakness.', icon: Gamepad2 },
  { title: '3 Lives Per Zone', desc: 'Lose all 3 and you fall into ghost mode until your team rescues or revives you.', icon: Skull },
  { title: 'Escape Together', desc: 'Beat all 10 zones and confront Dr. Kane for a different ending based on your choices.', icon: Shield },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Dimension Trap" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto flex min-h-screen flex-col justify-end px-4 pb-16 pt-32 lg:flex-row lg:items-end lg:justify-between lg:pb-20">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="mb-1 font-body text-sm text-muted-foreground">FREE TO PLAY</p>
            <h1 className="mb-2 font-display text-5xl font-black leading-none tracking-tight text-foreground lg:text-7xl">
              <span className="text-glow">DIMENSION</span><br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">TRAP</span>
            </h1>
            <p className="mb-1 font-display text-lg tracking-widest text-accent text-glow-accent">JUMANJI REBORN</p>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />)}
              </div>
              <span className="text-xs font-body text-muted-foreground">4.9 · 2.4M Downloads</span>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {tags.map(t => (
                <span key={t} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-body text-muted-foreground backdrop-blur-sm">{t}</span>
              ))}
            </div>

            <p className="mb-6 max-w-md text-sm font-body leading-relaxed text-secondary-foreground">
              Four friends sucked into 10 cinematic dimensions by Dr. Elias Kane's forbidden experiment. 
              Jumanji-style dice rolls assign your character. Survive together or be <span className="text-primary font-semibold">Trapped Forever</span>.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/login"
                className="group flex items-center gap-3 rounded-lg bg-portal px-8 py-4 text-sm font-display font-bold tracking-wider text-portal-foreground transition-all hover:scale-105 hover:bg-portal/90 box-glow-portal"
              >
                <Gamepad2 className="h-5 w-5" />
                PLAY NOW — IT'S FREE
              </Link>
              <button className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 px-6 py-4 text-sm font-display font-semibold tracking-wider text-foreground backdrop-blur-sm transition-all hover:border-primary/50">
                <Play className="h-4 w-4 text-primary" />
                WATCH TRAILER
              </button>
            </div>

            <div className="mt-8 flex gap-8">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-display text-xl font-bold text-foreground">24.8K</p>
                  <p className="text-xs font-body text-muted-foreground">Online Now</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skull className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-display text-xl font-bold text-foreground">142K</p>
                  <p className="text-xs font-body text-muted-foreground">Deaths Today</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right scenes gallery */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-col gap-2 lg:mt-0 lg:w-80"
          >
            <p className="text-xs font-display font-semibold tracking-widest text-muted-foreground">
              SCENES — 10 DIMENSIONS
            </p>
            <div className="max-h-[400px] space-y-2 overflow-y-auto pr-1 scrollbar-thin">
              {scenes.map((scene, i) => (
                <motion.div
                  key={scene.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="group flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 bg-card/50 p-2 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/80"
                >
                  <img src={scene.img} alt={scene.name} className="h-12 w-20 rounded-md object-cover" loading="lazy" width={768} height={512} />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-body font-semibold text-foreground">{scene.name}</p>
                    <p className="text-[10px] font-body text-muted-foreground">Zone {i + 1}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10 text-center font-display text-2xl font-bold text-foreground text-glow">
          SURVIVE 10 CINEMATIC DIMENSIONS
        </motion.h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {scenes.slice(0, 5).map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl border border-border"
            >
              <img src={s.img} alt={s.name} className="h-40 w-full object-cover transition-transform group-hover:scale-110" loading="lazy" width={768} height={512} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-0 p-3">
                <p className="font-display text-xs font-bold text-foreground">{s.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {scenes.slice(5).map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl border border-border"
            >
              <img src={s.img} alt={s.name} className="h-40 w-full object-cover transition-transform group-hover:scale-110" loading="lazy" width={768} height={512} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-0 p-3">
                <p className="font-display text-xs font-bold text-foreground">{s.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-gradient-card p-6 text-center"
            >
              <Icon className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 text-base font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm font-body text-muted-foreground">{f.desc}</p>
            </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
