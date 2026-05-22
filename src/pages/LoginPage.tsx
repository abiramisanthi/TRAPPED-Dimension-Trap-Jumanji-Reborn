import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGameStore } from '@/lib/gameStore';
import { Eye, EyeOff } from 'lucide-react';
import CinematicAuthShell from '@/components/CinematicAuthShell';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const { login } = useGameStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('All fields are required'); return; }
    const ok = login(email, password);
    if (ok) navigate('/dashboard');
    else setError('Invalid email or password');
  };

  return (
    <CinematicAuthShell
      title="PLAY NOW"
      subtitle="Log in to enter the portal, roll your character, and start the first dimension in the correct story order."
      footer={
        <p className="mt-6 text-center text-sm font-body text-muted-foreground">
          New here? <Link to="/register" className="text-primary transition-colors hover:text-foreground">Create account</Link>
        </p>
      }
    >
      <div className="mb-6">
        <p className="font-display text-xs tracking-[0.35em] text-primary">SECURE PLAYER LOGIN</p>
        <h2 className="mt-3 text-2xl font-bold text-foreground text-glow">ENTER THE DIMENSION</h2>
        <p className="mt-2 text-sm font-body leading-relaxed text-muted-foreground">A cinematic survival run starts here with your profile, your character, and your progression saved in one place.</p>
      </div>

      {error && <div className="mb-4 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-sm font-body text-destructive">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-2 block text-xs font-display tracking-[0.3em] text-muted-foreground">EMAIL</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-2xl border border-border bg-secondary/80 px-4 py-3.5 font-body text-sm text-foreground outline-none transition-colors focus:border-primary" />
        </div>
        <div>
          <label className="mb-2 block text-xs font-display tracking-[0.3em] text-muted-foreground">PASSWORD</label>
          <div className="relative">
            <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-2xl border border-border bg-secondary/80 px-4 py-3.5 pr-12 font-body text-sm text-foreground outline-none transition-colors focus:border-primary" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <button type="submit" className="mt-2 rounded-2xl bg-portal py-4 font-display text-sm font-bold tracking-[0.3em] text-portal-foreground transition-all hover:scale-[1.01] hover:bg-portal/90 box-glow-portal">
          PLAY NOW
        </button>
      </form>
    </CinematicAuthShell>
  );
};

export default LoginPage;
