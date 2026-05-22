import { Link, useLocation } from 'react-router-dom';
import { useGameStore } from '@/lib/gameStore';
import { Heart, Users, Map, Trophy, ShoppingCart, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useGameStore();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = isAuthenticated
    ? [
        { to: '/dashboard', label: 'Dashboard', icon: Map },
        { to: '/dimensions', label: 'Dimensions', icon: Map },
        { to: '/team', label: 'Team', icon: Users },
        { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
        { to: '/store', label: 'Store', icon: ShoppingCart },
      ]
    : [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-lg font-bold tracking-widest text-primary text-glow">
            TRAPPED
          </span>
          <span className="ml-1 hidden text-[10px] font-body text-muted-foreground sm:inline">DIMENSION TRAP</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium font-body transition-colors ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated && currentUser ? (
            <>
              <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5">
                <Heart className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold font-body text-foreground">{currentUser.lives}</span>
              </div>
              <span className="text-sm font-body text-muted-foreground">{currentUser.name}</span>
              <button onClick={logout} className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="rounded-md px-4 py-2 text-sm font-body font-semibold text-muted-foreground transition-colors hover:text-foreground">
                Sign In
              </Link>
              <Link to="/register" className="rounded-md bg-primary px-4 py-2 text-sm font-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90 box-glow">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground md:hidden">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-body font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
              {isAuthenticated ? (
                <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-body text-primary">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="rounded-md bg-secondary px-4 py-2.5 text-center text-sm font-body font-semibold text-foreground">Sign In</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="rounded-md bg-primary px-4 py-2.5 text-center text-sm font-body font-semibold text-primary-foreground">Register</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
