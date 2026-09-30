import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';

/**
 * S6 · About CTA — to /open-source + GitHub.
 * Centered word-split headline in the editorial print style.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function AboutCta() {
  return (
    <section className="border-t border-hairline bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-site px-6 text-center md:px-10">
        <Reveal>
          <p className="font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] text-ember">
            // WHAT'S NEXT
          </p>
        </Reveal>
        <h2 className="mt-5 font-display text-[clamp(32px,5vw,54px)] font-medium leading-[1.08] tracking-[-0.015em] text-ink">
          {'Own your teammates.'.split(' ').map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: EASE }}
              >
                {word}
                {'\u00A0'}
              </motion.span>
            </span>
          ))}
        </h2>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-[1.6] text-ink-soft">
            The philosophy page says it plainer than we can here — and the repo says it
            plainest of all.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/open-source">
              <Button variant="primary-light">Read the philosophy</Button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Button variant="ghost-light">
                <Github className="h-4 w-4" /> Star the repo
              </Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
