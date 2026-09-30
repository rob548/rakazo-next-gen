import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Copy } from 'lucide-react';
import { toast } from '@/components/demo/Toast';
import { tickerLines } from '@/data/bots';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function SplitLine({
  text,
  italic = false,
  delay = 0,
}: {
  text: string;
  italic?: boolean;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className={italic ? 'inline-block font-normal italic text-ember' : 'inline-block'}
          initial={{ y: '110%', rotate: 3 }}
          animate={{ y: '0%', rotate: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.05, ease: EASE }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

function Ticker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setIdx((i) => (i + 1) % tickerLines.length), 3500);
    return () => window.clearInterval(t);
  }, []);
  return (
    <div className="relative mt-14 h-5 font-mono text-[12px] text-ink-faint">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-x-0 text-center"
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-ember align-middle" />
          {tickerLines[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const [chipFlash, setChipFlash] = useState(false);

  const copyCmd = () => {
    navigator.clipboard?.writeText('npx rakazo init').catch(() => {});
    toast('copied — paste it in your terminal');
    setChipFlash(true);
    window.setTimeout(() => setChipFlash(false), 600);
  };

  return (
    <section ref={ref} className="relative -mt-16 overflow-hidden bg-paper">
      {/* blueprint dot-grid, fading toward the bottom */}
      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="dot-grid-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]"
      />
      <div className="relative mx-auto max-w-[860px] px-6 pb-24 pt-40 text-center md:px-10">
        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2.5 rounded-full border border-hairline px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-soft"
        >
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-ember" />
          ◆ apache-2.0 · self-hosted · beta
        </motion.div>

        {/* H1 */}
        <h1 className="mt-8 font-display text-[clamp(44px,7.5vw,88px)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
          <SplitLine text="AI teammates you" delay={0.15} />
          <SplitLine text="actually own" italic delay={0.55} />
        </h1>

        {/* subcopy */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
          className="mx-auto mt-6 max-w-[560px] text-[18px] leading-[1.6] text-ink-soft"
        >
          Rakazo is the open source answer to Grok Bot and OpenAI Dots — persistent AI teammates
          that run on <em className="not-italic text-ink">your</em> machines, with{' '}
          <em className="not-italic text-ink">your</em> models, under{' '}
          <em className="not-italic text-ink">your</em> rules.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/docs"
            className="rounded-full bg-ink px-6 py-3 font-sans text-[14.5px] font-semibold text-paper transition-colors duration-250 hover:bg-ember"
          >
            Get started
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3 font-sans text-[14.5px] font-semibold text-ink transition-colors hover:border-ink"
          >
            <Github className="h-4 w-4" /> View on GitHub <span className="font-mono text-[12px] text-ink-faint">★ 3k</span>
          </a>
          <button
            onClick={copyCmd}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 font-mono text-[13px] text-ink-soft transition-colors duration-300 ${
              chipFlash ? 'border-ember' : 'border-hairline hover:border-ink'
            }`}
            aria-label="copy npx rakazo init"
          >
            $ npx rakazo init <Copy className="h-3.5 w-3.5" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Ticker />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="relative pb-8 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint"
      >
        <span className="inline-block animate-bob">scroll ↓</span>
      </motion.div>
    </section>
  );
}
