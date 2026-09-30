import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function WordSplit({ words, delay = 0 }: { words: { text: string; italic?: boolean }[]; delay?: number }) {
  return (
    <>
      {words.map((w, i) => (
        <span key={w.text} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={w.italic ? 'inline-block font-normal italic text-ember' : 'inline-block'}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.85, delay: delay + i * 0.08, ease: EASE }}
          >
            {w.text}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** S1 · hero — "What's new." Calm editorial opener for the release ledger. */
export default function ChangelogHero() {
  return (
    <div className="-mt-16 pt-40 pb-20">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        className="font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] text-ember"
      >
        // CHANGELOG
      </motion.p>
      <h1 className="mt-5 font-display text-[clamp(40px,7vw,64px)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
        <WordSplit words={[{ text: "What's" }, { text: 'new.', italic: true }]} delay={0.2} />
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
        className="mt-5 max-w-[560px] text-[17px] leading-[1.6] text-ink-soft"
      >
        Every release, in plain language. Newest first. The same file lives in the repo as{' '}
        <code className="font-mono text-[14.5px] text-ink">CHANGELOG.md</code>.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-6 font-mono text-[12.5px] text-ink-faint"
      >
        v0.9.2 latest · beta · updated weekly-ish
      </motion.p>
    </div>
  );
}
