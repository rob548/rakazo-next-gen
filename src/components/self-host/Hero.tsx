import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Copy } from 'lucide-react';
import { toast } from '@/components/demo/Toast';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function CharSplitLine({
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

/** S1 · hero — "The computer is yours." Dark, dot-grid drifting with scroll. */
export default function SelfHostHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -48]);

  const copyCmd = () => {
    navigator.clipboard?.writeText('npx rakazo init').catch(() => {});
    toast('copied — paste it in your terminal');
  };

  return (
    <section ref={ref} data-nav-dark className="relative -mt-16 overflow-hidden bg-carbon">
      {/* blueprint dot-grid, drifting with scroll */}
      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="dot-grid-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_35%,transparent_95%)]"
      />
      <div className="relative mx-auto max-w-[900px] px-6 pb-28 pt-40 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] text-phosphor"
        >
          // SELF-HOSTED
        </motion.p>

        <h1 className="mt-6 font-display text-[clamp(42px,7vw,68px)] font-medium leading-[1.02] tracking-[-0.02em] text-bone">
          <CharSplitLine text="The computer is" delay={0.2} />
          <CharSplitLine text="yours." italic delay={0.6} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
          className="mt-6 max-w-[540px] text-[17.5px] leading-[1.6] text-bone-dim"
        >
          Run Rakazo on your machine. Your keys, your model, your data. If you can run Docker, you
          can run Rakazo.
        </motion.p>

        {/* command chip — scales in, ember border draws left → right */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
          className="group relative mt-10 inline-flex"
        >
          <div className="relative inline-flex items-center gap-4 rounded-[12px] border border-hairline-dark bg-carbon-2 px-6 py-4 transition-shadow duration-300 group-hover:shadow-[0_0_0_4px_rgba(232,80,30,0.14)]">
            <motion.span
              aria-hidden
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
              className="pointer-events-none absolute inset-0 rounded-[12px] border border-ember"
            />
            <span className="font-mono text-[16px] text-bone md:text-[18px]">
              <span className="mr-2 text-phosphor">$</span>npx rakazo init
            </span>
            <button
              onClick={copyCmd}
              aria-label="copy npx rakazo init"
              className="rounded-md p-1.5 text-bone-dim transition-colors hover:bg-carbon-3 hover:text-bone"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.25 }}
          className="mt-5 font-mono text-[12.5px] text-bone-dim"
        >
          {'~4 min install · docker required · macOS, linux, windows (wsl2)'
            .split('·')
            .map((part, i, arr) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.25 + i * 0.08, ease: EASE }}
                className="inline-block"
              >
                {part.trim()}
                {i < arr.length - 1 ? '\u00A0·\u00A0' : ''}
              </motion.span>
            ))}
        </motion.p>
      </div>
    </section>
  );
}
