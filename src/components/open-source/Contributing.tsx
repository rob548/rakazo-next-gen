import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { ArrowRight, GitFork, GitPullRequest, Star, GitCommitHorizontal } from 'lucide-react';
import { Reveal, SectionHeader } from '@/components/Reveal';
import { Button } from '@/components/Button';

/**
 * S5 · Contributing — "The repo is the product". paper, 5/7 split. Left copy
 * with mono bullet rows; right dark repo-pulse panel with count-up numbers
 * and sliding commit rows.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function CountUp({ to, format }: { to: number; format?: (v: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {format ? format(val) : val}
    </span>
  );
}

const bullets = [
  'good first issue → label: gfi',
  'discussions for design before big prs',
  'weekly maintainer call, open notes',
];

const commits = [
  'fix: sandbox token expiry edge case',
  'feat: routine dry-run flag',
  'docs: two-page contributing guide',
  'chore: bump e2b provider',
];

const stats = [
  { icon: Star, value: <CountUp to={3041} format={(v) => v.toLocaleString('en-US')} />, label: 'stars' },
  { icon: GitFork, value: <CountUp to={142} />, label: 'forks' },
  { icon: GitPullRequest, value: <CountUp to={31} />, label: 'open prs' },
  { icon: GitCommitHorizontal, value: <span>3h ago</span>, label: 'last commit' },
];

export default function Contributing() {
  return (
    <section className="bg-paper py-24 md:py-36">
      <div className="mx-auto grid max-w-site items-center gap-14 px-6 md:px-10 lg:grid-cols-[5fr_7fr]">
        {/* copy */}
        <div>
          <SectionHeader
            kicker="// CONTRIBUTING"
            title={
              <>
                The repo <em className="font-normal text-ember">is the product.</em>
              </>
            }
            sub="Issues with repro steps get answered. PRs with tests get reviewed. The contributing guide is two pages and one of them is a joke."
          />
          <ul className="mt-8 space-y-0 border-t border-hairline">
            {bullets.map((b, i) => (
              <Reveal key={b} delay={0.2 + i * 0.08} y={14}>
                <li className="border-b border-hairline py-3.5 font-mono text-[13.5px] text-ink-soft">
                  <span className="mr-3 text-ember">▸</span>
                  {b}
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.5}>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="mt-8 inline-block">
              <Button variant="ghost-light">
                good first issues <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </Reveal>
        </div>

        {/* repo pulse panel */}
        <Reveal delay={0.12}>
          <div className="overflow-hidden rounded-[14px] border border-hairline-dark bg-carbon-2">
            <div className="flex items-center gap-3 border-b border-hairline-dark px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ember" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                <span className="h-2.5 w-2.5 rounded-full bg-phosphor" />
              </div>
              <span className="font-mono text-[12px] text-bone-dim">github.com/rakazo/rakazo</span>
            </div>
            <div className="grid grid-cols-2 gap-px bg-hairline-dark sm:grid-cols-4">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: EASE }}
                    className="bg-carbon-2 p-5"
                  >
                    <Icon className="h-4 w-4 text-bone-dim" />
                    <p className="mt-3 font-display text-[26px] font-medium leading-none text-bone">
                      {s.value}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-bone-dim">
                      {s.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
            <div className="border-t border-hairline-dark p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-dim">
                recent commits
              </p>
              <ul className="mt-3 space-y-2.5">
                {commits.map((c, i) => (
                  <motion.li
                    key={c}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.06, ease: EASE }}
                    className="flex items-center gap-2.5 font-mono text-[12.5px] text-bone-dim"
                  >
                    <span className="text-phosphor">◆</span>
                    {c}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
