import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const DOC_SECTIONS = [
  { id: 'quickstart', label: 'Quickstart' },
  { id: 'step-01', label: '01 install', sub: true },
  { id: 'step-02', label: '02 keys', sub: true },
  { id: 'step-03', label: '03 first bot', sub: true },
  { id: 'step-04', label: '04 routines', sub: true },
  { id: 'step-05', label: '05 approvals', sub: true },
] as const;

const COMING_SOON = ['Concepts', 'Routines', 'Sandboxes', 'Keys & vault', 'Audit log', 'CLI reference'];

/** S1 · docs sidebar — sticky, hairline right border, scroll-spy active bar. */
export default function DocsSidebar() {
  const [active, setActive] = useState<string>('quickstart');

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const pos = window.scrollY + window.innerHeight * 0.42;
      let current: string = DOC_SECTIONS[0].id;
      for (const s of DOC_SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= pos) current = s.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside className="sticky top-24 hidden self-start border-r border-hairline py-12 pr-8 lg:block">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint"
      >
        DOCS
      </motion.p>
      <nav className="mt-5" aria-label="docs">
        <ul className="space-y-1">
          {DOC_SECTIONS.map((s, i) => {
            const isActive = active === s.id;
            return (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.04, ease: EASE }}
              >
                <a
                  href={`#${s.id}`}
                  onClick={go(s.id)}
                  className={cn(
                    'relative block py-1.5 pl-4 font-sans text-[14px] transition-colors',
                    'sub' in s && s.sub ? 'text-[13px]' : 'font-medium',
                    isActive ? 'font-medium text-ink' : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="docs-nav-bar"
                      transition={{ duration: 0.25, ease: EASE }}
                      className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 bg-ember"
                      aria-hidden
                    />
                  )}
                  {s.label}
                </a>
              </motion.li>
            );
          })}
        </ul>
        <ul className="mt-6 space-y-1 border-t border-hairline pt-5">
          {COMING_SOON.map((label, i) => (
            <motion.li
              key={label}
              id={label === 'Concepts' ? 'nav-concepts' : undefined}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.35 + i * 0.04, ease: EASE }}
              className="scroll-mt-32"
            >
              <span className="block cursor-default py-1.5 pl-4 font-sans text-[14px] text-ink-faint">
                {label}
              </span>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.6, ease: EASE }}
          >
            <Link
              to="/faq"
              className="block py-1.5 pl-4 font-sans text-[14px] text-ink-soft transition-colors hover:text-ember"
            >
              FAQ →
            </Link>
          </motion.li>
        </ul>
      </nav>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-10 border-t border-hairline pt-5"
      >
        <p className="pl-4 font-mono text-[12px] text-ink-faint">v0.9.2-beta</p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="mt-2 block pl-4 font-mono text-[12px] text-ink-faint underline-offset-4 transition-colors hover:text-ember hover:underline"
        >
          edit this page → github
        </a>
      </motion.div>
    </aside>
  );
}
