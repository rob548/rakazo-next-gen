import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { Button } from '@/components/Button';

/**
 * S1 · Open source hero manifesto — "No pricing page. Just the repo."
 * Three H1 lines word-split in sequence (0.5s apart), each with an ember
 * hairline rule drawing underneath (scaleX, 0.6s expo).
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function ManifestoLine({
  text,
  delay,
  italic = false,
}: {
  text: string;
  delay: number;
  italic?: boolean;
}) {
  return (
    <span className="relative block w-fit">
      <span className={italic ? 'font-normal italic text-ember' : ''}>
        {text.split(' ').map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
            >
              {word}
              {i < text.split(' ').length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </span>
      <motion.span
        aria-hidden
        className="absolute -bottom-1 left-0 h-px w-full origin-left bg-ember/70"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.35, ease: EASE }}
      />
    </span>
  );
}

export default function Manifesto() {
  const scrollToLicense = () => {
    document.getElementById('license')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden
        className="dot-grid-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black_25%,transparent_90%)]"
      />
      <div className="relative mx-auto max-w-[980px] px-6 pb-28 pt-40 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] text-ember"
        >
          // OPEN SOURCE
        </motion.p>
        <h1 className="mt-6 font-display text-[clamp(40px,7vw,72px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
          <ManifestoLine text="No pricing page." delay={0.2} />
          <ManifestoLine text="No seat limits." delay={0.7} />
          <ManifestoLine text="Just the repo." delay={1.2} italic />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.7, ease: EASE }}
          className="mt-8 max-w-[560px] text-[18px] leading-[1.6] text-ink-soft"
        >
          Rakazo is Apache-2.0. Every bot, every routine, every line. Fork it, audit it, run it
          forever — the repo is the product.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.85, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="primary-light">
              <Github className="h-4 w-4" /> View on GitHub
              <span className="rounded-full bg-paper/15 px-2 py-0.5 font-mono text-[11px]">
                ★ 3k
              </span>
            </Button>
          </a>
          <Button variant="ghost-light" onClick={scrollToLicense}>
            Read the license
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
