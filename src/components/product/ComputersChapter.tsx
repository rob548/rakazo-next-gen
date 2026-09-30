import { memo, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, TerminalSquare, Monitor } from 'lucide-react';
import { Reveal, SectionHeader } from '@/components/Reveal';
import { cn } from '@/lib/utils';

/**
 * S5 · Chapter 03 — Computers. Full-bleed carbon. Three tabbed panels
 * (Browser / Terminal / Desktop) auto-advance every 4s, pause on hover or
 * interaction. Inner panel loops are isolated memoized micro-components.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ------------------------- inner looping panels ------------------------- */

/** Wireframe gmail viewport with an ember sweep highlight looping down. */
const BrowserPanel = memo(function BrowserPanel() {
  return (
    <div className="relative h-full p-6 md:p-8">
      <div className="overflow-hidden rounded-[10px] border border-hairline-dark bg-carbon-2">
        <div className="flex items-center gap-2 border-b border-hairline-dark px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-hairline-dark" />
          <span className="h-2 w-2 rounded-full bg-hairline-dark" />
          <span className="ml-2 flex-1 rounded-full bg-carbon-3 px-3 py-1 font-mono text-[10.5px] text-bone-dim">
            mail.google.com
          </span>
        </div>
        <div className="relative p-3">
          {/* sweep highlight */}
          <div className="animate-sweep-down pointer-events-none absolute inset-x-3 top-0 h-8 rounded-md border border-ember/60 bg-ember/10" />
          {[72, 48, 88, 60, 40, 76].map((w, i) => (
            <div key={i} className="mb-2.5 flex items-center gap-3 rounded-md px-2 py-1.5 last:mb-0">
              <span className="h-3 w-3 shrink-0 rounded-sm bg-carbon-3" />
              <span className="h-2 rounded-full bg-carbon-3" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 font-mono text-[12px] text-bone-dim">
        it browses like you do — sweep in progress
      </p>
    </div>
  );
});

/** Streaming mono output, appends a line every 700ms then rolls over. */
const TerminalStream = memo(function TerminalStream() {
  const script = [
    '$ npm test',
    '▸ routines/morning-sweep.md … ok',
    '▸ routines/reply-zero.md … ok',
    '▸ approvals/holds … ok',
    '✓ 41 passed · 0 failed',
    '$ watching for changes…',
  ];
  const [shown, setShown] = useState(1);

  useEffect(() => {
    const t = window.setInterval(() => {
      setShown((s) => (s >= script.length ? 1 : s + 1));
    }, 700);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full p-6 md:p-8">
      <div className="h-[210px] overflow-hidden rounded-[10px] border border-hairline-dark bg-carbon-2 p-4 font-mono text-[13px] leading-[1.7]">
        {script.slice(0, shown).map((l, i) => (
          <p
            key={`${l}-${i}`}
            className={
              l.startsWith('$')
                ? 'text-phosphor'
                : l.startsWith('✓')
                  ? 'text-phosphor'
                  : 'text-bone-dim'
            }
          >
            {l}
          </p>
        ))}
        <span className="block-cursor inline-block text-phosphor" />
      </div>
      <p className="mt-4 font-mono text-[12px] text-bone-dim">$ npm test → 41 passed</p>
    </div>
  );
});

/** Abstract window collage with a drifting cursor dot. */
const DesktopPanel = memo(function DesktopPanel() {
  return (
    <div className="relative h-full p-6 md:p-8">
      <div className="relative h-[210px] overflow-hidden rounded-[10px] border border-hairline-dark bg-carbon-2">
        <div className="absolute left-[12%] top-[16%] h-[52%] w-[52%] rounded-md border border-hairline-dark bg-carbon-3/60">
          <div className="h-4 rounded-t-md border-b border-hairline-dark bg-carbon-3" />
        </div>
        <div className="absolute left-[38%] top-[34%] h-[48%] w-[46%] rounded-md border border-bone-dim/40 bg-carbon-3">
          <div className="h-4 rounded-t-md border-b border-hairline-dark bg-carbon-2" />
          <div className="space-y-1.5 p-2.5">
            <span className="block h-1.5 w-4/5 rounded-full bg-hairline-dark" />
            <span className="block h-1.5 w-3/5 rounded-full bg-hairline-dark" />
            <span className="block h-1.5 w-2/3 rounded-full bg-hairline-dark" />
          </div>
        </div>
        {/* drifting cursor */}
        <motion.span
          className="absolute left-0 top-0 h-3 w-3 rounded-full border-2 border-ember"
          animate={{ x: [48, 330, 200, 48], y: [32, 120, 158, 32] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <p className="mt-4 font-mono text-[12px] text-bone-dim">
        a desktop when the job needs one — windows included
      </p>
    </div>
  );
});

/* --------------------------------- tabs ---------------------------------- */

const tabs = [
  { id: 'browser', label: 'Browser', icon: Globe, panel: <BrowserPanel /> },
  { id: 'terminal', label: 'Terminal', icon: TerminalSquare, panel: <TerminalStream /> },
  { id: 'desktop', label: 'Desktop', icon: Monitor, panel: <DesktopPanel /> },
];

export default function ComputersChapter() {
  const [idx, setIdx] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const t = window.setInterval(() => {
      if (!paused.current) setIdx((i) => (i + 1) % tabs.length);
    }, 4000);
    return () => window.clearInterval(t);
  }, []);

  const select = (i: number) => {
    setIdx(i);
    paused.current = true; // interacting stops auto-advance
  };

  return (
    <section data-nav-dark className="relative overflow-hidden bg-carbon py-28 md:py-36">
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-site px-6 md:px-10">
        <SectionHeader
          center
          dark
          kicker="// SANDBOX"
          title={
            <>
              Its own browser, terminal, <em className="font-normal text-ember">and desktop.</em>
            </>
          }
        />

        <Reveal delay={0.15} className="mx-auto mt-12 max-w-[760px]">
          <div
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
            className="overflow-hidden rounded-[14px] border border-hairline-dark bg-carbon-2"
          >
            {/* tab bar */}
            <div className="flex items-center gap-1 border-b border-hairline-dark px-3 pt-3">
              {tabs.map((t, i) => {
                const Icon = t.icon;
                const active = idx === i;
                return (
                  <button
                    key={t.id}
                    onClick={() => select(i)}
                    aria-pressed={active}
                    className={cn(
                      'flex items-center gap-2 rounded-t-[10px] border-x border-t px-4 py-2.5 font-mono text-[12.5px] transition-colors',
                      active
                        ? 'border-hairline-dark bg-carbon-3 text-bone'
                        : 'border-transparent text-bone-dim hover:text-bone',
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t.label}
                  </button>
                );
              })}
            </div>
            {/* panel */}
            <div className="relative h-[300px] bg-carbon-3/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute inset-0"
                >
                  {tabs[idx].panel}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 text-center font-mono text-[12.5px] text-bone-dim">
            runs in docker, e2b, daytona, createos, or box — your choice
          </p>
        </Reveal>
      </div>
    </section>
  );
}
