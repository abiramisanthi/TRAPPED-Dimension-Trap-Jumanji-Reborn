import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Play } from 'lucide-react';

import portalScene from '@/assets/login-portal-scene.jpg';
import zoneHorrorMansion from '@/assets/horror-mansion.jpg';
import zoneZombieCity from '@/assets/zone-zombie-city.jpg';
import zoneCyberpunk from '@/assets/zone-cyberpunk.jpg';
import zoneUnderwater from '@/assets/zone-underwater.jpg';

interface CinematicAuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

const sceneCards = [
  { title: 'Danger Room', image: zoneHorrorMansion, label: 'Join room' },
  { title: 'Dimension Genesis', image: zoneZombieCity, label: 'Join room' },
  { title: 'Underground Lab', image: zoneCyberpunk, label: 'Join room' },
  { title: 'The Last Stand', image: zoneUnderwater, label: 'Join room' },
];

const CinematicAuthShell = ({ title, subtitle, children, footer }: CinematicAuthShellProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Full-page background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/80 z-10" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-border/40">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            <span className="font-display text-sm font-bold tracking-[0.3em] text-foreground">TRAPPED</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-body text-muted-foreground">Get Started</span>
          <span className="text-xs font-body text-muted-foreground">More Info</span>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-12">
          {/* Left: Portal scene + form */}
          <div className="flex flex-col gap-8">
            {/* Hero portal image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-border/50"
            >
              <img
                src={portalScene}
                alt="Dimensional portal gateway"
                className="h-[340px] w-full object-cover sm:h-[420px] lg:h-[480px]"
                width={1024}
                height={1536}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="font-display text-xs tracking-[0.45em] text-primary">DIMENSION TRAP</p>
                <h1 className="mt-2 text-3xl font-black leading-tight text-foreground text-glow sm:text-4xl lg:text-5xl">
                  {title}
                </h1>
                <p className="mt-3 max-w-lg text-sm font-body leading-relaxed text-secondary-foreground">
                  {subtitle}
                </p>
              </div>
            </motion.div>

            {/* Auth form card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-border/60 bg-card/80 p-6 backdrop-blur-xl sm:p-8"
            >
              {children}
              {footer}
            </motion.div>

            {/* Team choice section */}
            <div className="text-center">
              <p className="text-sm font-body text-muted-foreground">You can choose which team you want to play for</p>
              <div className="mt-4 flex justify-center gap-4">
                <button className="rounded-full border border-portal/40 bg-portal/10 px-8 py-2.5 font-display text-xs tracking-[0.25em] text-portal transition-colors hover:bg-portal/20">
                  Good
                </button>
                <button className="rounded-full border border-primary/40 bg-primary/10 px-8 py-2.5 font-display text-xs tracking-[0.25em] text-primary transition-colors hover:bg-primary/20">
                  Evil
                </button>
              </div>
            </div>
          </div>

          {/* Right: Scene cards */}
          <div className="flex flex-col gap-3">
            <p className="font-display text-xs tracking-[0.3em] text-muted-foreground mb-2">ACTIVE DIMENSIONS</p>
            {sceneCards.map((scene, index) => (
              <motion.div
                key={scene.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60"
              >
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    width={640}
                    height={360}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <p className="text-xs font-display font-bold text-foreground">{scene.title}</p>
                    </div>
                    <button className="rounded-lg bg-portal/80 px-3 py-1.5 text-[10px] font-display tracking-wider text-portal-foreground transition-colors hover:bg-portal">
                      {scene.label}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicAuthShell;
