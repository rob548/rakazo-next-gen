import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Github, Terminal, Sun, Moon, LogOut } from 'lucide-react';
import { toast } from '@/components/demo/Toast';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { LOGIN_PATH } from '@/const';
import { cn } from '@/lib/utils';

export const NAV_LINKS = [
  { to: '/product', label: 'Product' },
  { to: '/bots', label: 'Bots' },
  { to: '/self-host', label: 'Self-host' },
  { to: '/open-source', label: 'Open source' },
  { to: '/docs', label: 'Docs' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/changelog', label: 'Changelog' },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
      // invert while any [data-nav-dark] section crosses the 64px nav band
      const sections = document.querySelectorAll('[data-nav-dark]');
      let overDark = false;
      sections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < 64 && r.bottom > 8) overDark = true;
      });
      setDark(overDark);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const copyInstall = () => {
    navigator.clipboard?.writeText('npm i -g rakazo').catch(() => {});
    toast('copied — paste it in your terminal');
  };

  return (
    <>
      <motion.header
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-300',
          scrolled
            ? dark
              ? 'border-b border-hairline-dark bg-carbon/80 backdrop-blur-md'
              : 'border-b border-hairline bg-paper/85 backdrop-blur-md'
            : 'border-b border-transparent',
          dark ? 'text-bone' : 'text-ink',
        )}
      >
        <div className="mx-auto flex h-full max-w-site items-center justify-between px-6 md:px-10">
          {/* logo */}
          <Link to="/" className="flex items-center gap-2.5" aria-label="rakazo home">
            <motion.img
              src="/logo.svg"
              alt=""
              className="h-[22px] w-[22px]"
              initial={{ rotate: -8 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            />
            <span className="font-display text-[20px] font-semibold tracking-[-0.01em]">rakazo</span>
          </Link>

          {/* center links */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="primary">
            {NAV_LINKS.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE }}
              >
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    cn(
                      'group relative inline-block font-sans text-[14px] font-medium transition-transform duration-200 hover:-translate-y-[2px]',
                      dark ? 'text-bone-dim hover:text-bone' : 'text-ink-soft hover:text-ink',
                      isActive && (dark ? 'text-bone' : 'text-ink'),
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ember" />
                      )}
                      {l.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-ember transition-all duration-200 group-hover:w-full" />
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* right actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className={cn(
                'hidden items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[12px] transition-colors sm:inline-flex',
                dark
                  ? 'border-hairline-dark text-bone-dim hover:border-bone-dim'
                  : 'border-hairline text-ink-soft hover:border-ink',
              )}
            >
              <Github className="h-3.5 w-3.5" /> ★ 3k
            </a>
            <button
              onClick={copyInstall}
              aria-label="copy install command"
              title="copy npm i -g rakazo"
              className={cn(
                'hidden h-8 w-8 items-center justify-center rounded-full border font-mono text-[13px] transition-colors sm:inline-flex',
                dark
                  ? 'border-hairline-dark text-bone-dim hover:border-ember hover:text-ember'
                  : 'border-hairline text-ink-soft hover:border-ember hover:text-ember',
              )}
            >
              <Terminal className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'switch to light mode' : 'switch to dark mode'}
              title={theme === 'dark' ? 'light mode' : 'dark mode'}
              className={cn(
                'inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors',
                dark
                  ? 'border-hairline-dark text-bone-dim hover:border-ember hover:text-ember'
                  : 'border-hairline text-ink-soft hover:border-ember hover:text-ember',
              )}
            >
              {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            {/* AUTH-SLOT: auth-aware account area (useAuth) */}
            {isLoading ? (
              <span
                className={cn(
                  'hidden h-8 w-20 animate-pulse rounded-full sm:inline-block',
                  dark ? 'bg-carbon-3' : 'bg-paper-deep',
                )}
                aria-hidden
              />
            ) : isAuthenticated && user ? (
              <span className="hidden items-center gap-2 sm:inline-flex">
                <Link
                  to="/account"
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-sans text-[13px] font-semibold transition-colors',
                    dark
                      ? 'border-hairline-dark text-bone hover:border-ember'
                      : 'border-hairline text-ink hover:border-ember',
                  )}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt="" className="h-4.5 w-4.5 rounded-full" />
                  ) : (
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-ember font-mono text-[9px] text-carbon">
                      {(user.name ?? 'R').slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  {user.name ?? 'Account'}
                </Link>
                <button
                  onClick={() => logout()}
                  aria-label="log out"
                  title="log out"
                  className={cn(
                    'inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors',
                    dark
                      ? 'border-hairline-dark text-bone-dim hover:border-ember hover:text-ember'
                      : 'border-hairline text-ink-soft hover:border-ember hover:text-ember',
                  )}
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </span>
            ) : (
              <Link
                to={LOGIN_PATH}
                className={cn(
                  'hidden rounded-full px-5 py-2 font-sans text-[14px] font-semibold transition-colors sm:inline-block',
                  dark ? 'bg-ember text-carbon hover:bg-ember-bright' : 'bg-ink text-paper hover:bg-ember',
                )}
              >
                Sign in
              </Link>
            )}
            <button
              className="inline-flex h-9 w-9 items-center justify-center lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'close menu' : 'open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-carbon pt-24 text-bone lg:hidden"
          >
            <nav className="flex flex-col gap-2 px-8" aria-label="mobile">
              {[{ to: '/', label: 'Home' }, ...NAV_LINKS].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.06 * i, duration: 0.35, ease: EASE }}
                >
                  <Link
                    to={l.to}
                    className="flex items-baseline gap-4 border-b border-hairline-dark py-4"
                  >
                    <span className="font-mono text-[12px] text-ember">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-[28px] font-medium">{l.label}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.06 * (NAV_LINKS.length + 1), duration: 0.35, ease: EASE }}
              >
                {isAuthenticated && user ? (
                  <Link
                    to="/account"
                    className="flex items-baseline gap-4 border-b border-hairline-dark py-4"
                  >
                    <span className="font-mono text-[12px] text-ember">{String(NAV_LINKS.length + 2).padStart(2, '0')}</span>
                    <span className="font-display text-[28px] font-medium">Account</span>
                  </Link>
                ) : (
                  <Link
                    to={LOGIN_PATH}
                    className="flex items-baseline gap-4 border-b border-hairline-dark py-4"
                  >
                    <span className="font-mono text-[12px] text-ember">{String(NAV_LINKS.length + 2).padStart(2, '0')}</span>
                    <span className="font-display text-[28px] font-medium">Sign in</span>
                  </Link>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
