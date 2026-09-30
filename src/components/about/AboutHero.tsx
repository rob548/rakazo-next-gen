import { motion } from 'framer-motion';

/**
 * About hero — "Software should work *for* you."
 * Word-split clip reveal with an ember rule drawing under the accent line.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface Word {
  text: string;
  italic?: boolean;
}

function HeadlineLine({
  words,
  delay,
  underline = false,
}: {
  words: Word[];
  delay: number;
  underline?: boolean;
}) {
  return (
    <span className="relative block w-fit">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={
              w.italic ? 'inline-block font-normal italic text-ember' : 'inline-block'
            }
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
          >
            {w.text}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
      {underline && (
        <motion.span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-left bg-ember/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.4, ease: EASE }}
        />
      )}
    </span>
  );
}

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden
        className="dot-grid-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black_25%,transparent_90%)]"
      />
      <div className="relative mx-auto max-w-[980px] px-6 pb-24 pt-24 md:pb-28 md:pt-32 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] text-ember"
        >
          // ABOUT
        </motion.p>
        <h1 className="mt-6 font-display text-[clamp(40px,7vw,76px)] font-medium leading-[1.04] tracking-[-0.02em] text-ink">
          <HeadlineLine words={[{ text: 'Software' }, { text: 'should' }]} delay={0.2} />
          <HeadlineLine
            words={[{ text: 'work' }, { text: 'for', italic: true }, { text: 'you.' }]}
            delay={0.55}
            underline
          />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
          className="mt-8 max-w-[580px] text-[18px] leading-[1.6] text-ink-soft"
        >
          Rakazo is an open-source crew of AI teammates that run on your machine, do real
          work on real computers, and answer to you. This is the short, honest version of
          why it exists.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.35, ease: EASE }}
          className="mt-10 font-mono text-[12.5px] tracking-[0.06em] text-ink-faint"
        >
          est. 2025 · inbox zero inc. · apache-2.0 · no investors to impress
        </motion.p>
      </div>
    </section>
  );
}
