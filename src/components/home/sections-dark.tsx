import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion';
import { Reveal, SectionHeader } from '@/components/Reveal';
import Terminal from '@/components/demo/Terminal';
import Accordion from '@/components/demo/Accordion';
import ComparisonTable from '@/components/demo/ComparisonTable';
import { Button } from '@/components/Button';
import { toast } from '@/components/demo/Toast';
import { homeFaq } from '@/data/faq';
import { comparisonRows } from '@/data/changelog';
import { Copy, Github } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ------------------------------ S8 · self-host -------------------------------- */

export function SelfHost() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 12]);

  return (
    <section ref={ref} data-nav-dark className="relative overflow-hidden bg-carbon py-28 md:py-40">
      <motion.div style={{ y: gridY }} className="dot-grid-dark pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-site items-center gap-14 px-6 md:px-10 lg:grid-cols-[5fr_7fr]">
        <div>
          <SectionHeader
            dark
            kicker="// SELF-HOSTED"
            title={
              <>
                Run it before your <em className="font-normal text-ember">coffee's done.</em>
              </>
            }
            sub="One command, your keys, your data. If you can run Docker, you can run Rakazo."
          />
          <Reveal delay={0.2}>
            <ol className="mt-9 space-y-3 font-mono text-[13.5px] text-bone-dim">
              <li><span className="mr-3 text-ember">01</span>install the CLI</li>
              <li><span className="mr-3 text-ember">02</span>add your model key</li>
              <li><span className="mr-3 text-ember">03</span>hire your first bot</li>
            </ol>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Terminal
            loop
            copyText="npx rakazo init"
            lines={[
              { text: 'npx rakazo init', kind: 'prompt' },
              { text: '▸ checking docker… ok', kind: 'out', delay: 300 },
              { text: '▸ pulling sandbox image… ok', kind: 'out', delay: 300 },
              { text: '▸ where should bots store memory? ~/rakazo', kind: 'out', delay: 300 },
              { text: '▸ add a model key (claude, gpt, grok, openrouter): █', kind: 'warn', delay: 300 },
              { text: '✓ rakazo is running — http://localhost:3141', kind: 'success', delay: 500 },
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- S9 · stats ---------------------------------- */

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
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
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats() {
  const items = [
    { num: <Counter to={3} suffix="k" />, label: 'github stars', sub: '' },
    { num: 'Apache-2.0', label: 'license', sub: '' },
    { num: <Counter to={100} suffix="%" />, label: 'open source', sub: 'no seats, no gates' },
    { num: <Counter to={1} />, label: 'command to self-host', sub: 'your machine' },
  ];
  return (
    <section data-nav-dark className="border-t border-hairline-dark bg-carbon py-16">
      <div className="mx-auto grid max-w-site grid-cols-2 gap-y-10 px-6 md:grid-cols-4 md:px-10">
        {items.map((s, i) => (
          <div key={s.label} className="relative px-4 text-center md:px-8">
            {i > 0 && (
              <motion.span
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: EASE }}
                className="absolute left-0 top-1/2 hidden h-14 w-px -translate-y-1/2 origin-top bg-hairline-dark md:block"
              />
            )}
            <p className="font-display text-[40px] font-medium leading-none text-bone md:text-[56px]">{s.num}</p>
            <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.12em] text-bone-dim">{s.label}</p>
            {s.sub && <p className="mt-1 font-mono text-[11px] text-bone-dim/60">{s.sub}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- S10 · open source ------------------------------- */

export function OpenSourceSplit() {
  const selfHostRows = [
    'Docker runner',
    'BYO keys',
    'routines, memory & audit log',
    'unlimited bots',
    'community support',
  ];
  const cloudRows = ['managed sandboxes', 'your keys, your model spend', 'no migration, same workspace'];

  return (
    <section className="bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeader
          center
          kicker="// OPEN SOURCE"
          title={
            <>
              No pricing page. <em className="font-normal text-ember">Just the repo.</em>
            </>
          }
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* self-host card */}
          <Reveal y={48}>
            <div className="flex h-full flex-col rounded-[10px] border-[1.5px] border-ink bg-paper p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-[21px] font-semibold tracking-[-0.01em]">Self-host</h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                  available today
                </span>
              </div>
              <ul className="mt-6 flex-1 space-y-2.5 font-mono text-[13px] text-ink-soft">
                {selfHostRows.map((r, i) => (
                  <Reveal key={r} delay={0.3 + i * 0.06} y={10}>
                    <li className="flex items-center gap-2.5">
                      <span className="text-ember">✓</span> {r}
                    </li>
                  </Reveal>
                ))}
              </ul>
              <Link to="/docs" className="mt-8">
                <Button variant="primary-light" className="w-full justify-center">
                  Get started
                </Button>
              </Link>
            </div>
          </Reveal>
          {/* cloud card */}
          <Reveal y={48} delay={0.15}>
            <div className="flex h-full flex-col rounded-[10px] border border-dashed border-hairline bg-paper p-7 opacity-70">
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-[21px] font-semibold tracking-[-0.01em]">Cloud</h3>
                <motion.span
                  whileHover={{ rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 0.4 }}
                  className="rounded-full border border-amber px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-amber"
                >
                  coming soon
                </motion.span>
              </div>
              <ul className="mt-6 flex-1 space-y-2.5 font-mono text-[13px] text-ink-soft">
                {cloudRows.map((r, i) => (
                  <Reveal key={r} delay={0.45 + i * 0.06} y={10}>
                    <li className="flex items-center gap-2.5">
                      <span className="text-ink-faint">◦</span> {r}
                    </li>
                  </Reveal>
                ))}
              </ul>
              <Link to="/open-source#waitlist" className="mt-8">
                <Button
                  variant="ghost-light"
                  className="w-full justify-center"
                >
                  Join the waitlist
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <p className="mt-8 text-center font-mono text-[12px] text-ink-faint">
            {'// same repo, same workspace. cloud is a convenience, not a gate.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------- S11 · comparison teaser --------------------------- */

export function ComparisonTeaser() {
  return (
    <section className="bg-paper pb-24 md:pb-36">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <Reveal>
          <ComparisonTable rows={comparisonRows} />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-center">
            <Link to="/open-source" className="font-mono text-[13px] text-ember underline-offset-4 hover:underline">
              full breakdown → /open-source
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- S12 · mini faq ------------------------------ */

export function MiniFaq() {
  return (
    <section className="bg-paper-deep py-24 md:py-32">
      <div className="mx-auto max-w-[760px] px-6">
        <SectionHeader
          center
          kicker="// FAQ"
          title={
            <>
              Fair <em className="font-normal text-ember">questions.</em>
            </>
          }
        />
        <Reveal delay={0.15} className="mt-10">
          <Accordion entries={homeFaq} />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-center">
            <Link to="/faq" className="font-mono text-[13px] text-ember underline-offset-4 hover:underline">
              all questions → /faq
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- S13 · final cta ------------------------------ */

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const wmY = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const [chipFlash, setChipFlash] = useState(false);

  const copyCmd = () => {
    navigator.clipboard?.writeText('npx rakazo init').catch(() => {});
    toast('copied — paste it in your terminal');
    setChipFlash(true);
    window.setTimeout(() => setChipFlash(false), 600);
  };

  const words = ['Meet', 'your', 'first', 'bot.'];

  return (
    <section ref={ref} data-nav-dark className="relative overflow-hidden bg-carbon py-32 md:py-44">
      {/* watermark */}
      <motion.div
        aria-hidden
        style={{ y: wmY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="font-display text-[16vw] font-normal italic leading-none text-bone/[0.05]">
          actually yours
        </span>
      </motion.div>
      <div className="relative mx-auto max-w-site px-6 text-center md:px-10">
        <h2 className="font-display text-[clamp(40px,7vw,72px)] font-medium leading-[1.05] tracking-[-0.015em] text-bone">
          {words.map((w, i) => (
            <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.8, delay: 0.08 * i, ease: EASE }}
              >
                {w}
                {i < words.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          ))}
        </h2>
        <Reveal delay={0.35}>
          <p className="mt-5 text-[17px] text-bone-dim">
            ten minutes from now it could be sweeping your inbox.
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/docs">
              <Button variant="primary-dark">Get started</Button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Button variant="ghost-dark">
                <Github className="h-4 w-4" /> View on GitHub
              </Button>
            </a>
            <button
              onClick={copyCmd}
              aria-label="copy npx rakazo init"
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 font-mono text-[13px] transition-colors duration-300 ${
                chipFlash ? 'border-ember text-ember' : 'border-hairline-dark text-bone-dim hover:border-bone-dim hover:text-bone'
              }`}
            >
              $ npx rakazo init <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
