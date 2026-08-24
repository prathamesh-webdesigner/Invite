import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Templates', to: '/templates' },
  { label: 'Categories', to: '/templates#categories' },
  { label: 'How It Works', to: '/#how-it-works' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="InviteCraft home">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-sm">
            <Sparkles size={18} className="text-white" />
          </span>
          <span className="font-semibold text-lg text-ink tracking-tight">InviteCraft</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? 'text-primary' : 'text-ink/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm font-medium text-ink/80 hover:text-primary transition-colors px-3 py-2">
            Login
          </button>
          <button
            onClick={() => navigate('/templates')}
            className="text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors rounded-lg px-4 py-2.5 shadow-sm hover:shadow-md"
          >
            Get Started
          </button>
        </div>

        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-white px-4 py-4 flex flex-col gap-1 animate-fade-in">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-ink/80 hover:text-primary py-2.5 px-2 rounded-lg hover:bg-lightblue transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-line">
            <button className="text-sm font-medium text-ink/80 py-2.5 px-2 text-left">Login</button>
            <button
              onClick={() => { setOpen(false); navigate('/templates'); }}
              className="text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors rounded-lg px-4 py-2.5"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
