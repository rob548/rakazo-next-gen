import { motion } from 'framer-motion';
import { Reveal, SectionHeader } from '@/components/Reveal';

/**
 * S2 · License explainer — "Apache-2.0, in plain words". Three hairline cards
 * with mono tag lines that highlight ember on hover.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cards = [
  {
    tag: 'use',
    title: 'Use it anywhere',
    copy: 'personal, commercial, inside your company, inside your product.',
  },
  {
    tag: 'modify',
    title: 'Change everything',
    copy: "modify, fork, rebrand. attribution in the license file, that's it.",
  },
  {
    tag: 'patents',
    title: 'Patent grant included',
    copy: 'apache-2.0 protects you with an explicit patent grant. mit vibes, grown-up paperwork.',
  },
];

export default function License() {
  return (
    <section id="license" className="scroll-mt-20 bg-paper py-24">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeader
          kicker="// THE LICENSE"
          title={
            <>
              Apache-2.0, <em className="font-normal text-ember">in plain words.</em>
            </>
          }
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.tag}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              className="group rounded-[10px] border border-hairline bg-paper p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hard"
            >
              <motion.p
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: EASE }}
                className="w-fit origin-left font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-faint transition-colors duration-200 group-hover:text-ember"
              >
                {c.tag}
              </motion.p>
              <h3 className="mt-3 font-sans text-[19px] font-semibold tracking-[-0.01em] text-ink">
                {c.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-ink-soft">{c.copy}</p>
            </motion.div>
          ))}
        </div>
        <Reveal delay={0.3}>
          <p className="mt-8 font-mono text-[12px] text-ink-faint">
            LICENSE — 189 lines · no CLA · no trademarks on forks of the name
          </p>
        </Reveal>
      </div>
    </section>
  );
}
