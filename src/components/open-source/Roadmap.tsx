import { motion } from 'framer-motion';
import { Reveal, SectionHeader } from '@/components/Reveal';
import { cn } from '@/lib/utils';

/**
 * S4 · Roadmap — full-bleed carbon. Three columns tagged NOW / NEXT / LATER,
 * mono rows with hairline separators cascading in with a typing feel.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const columns = [
  {
    tag: 'NOW',
    pill: 'border-phosphor/60 text-phosphor',
    glow: 'hover:shadow-[0_0_18px_rgba(110,231,160,0.25)]',
    items: [
      'electron desktop app polish',
      'mobile parity (expo)',
      'routine marketplace in the repo',
    ],
  },
  {
    tag: 'NEXT',
    pill: 'border-amber/60 text-amber',
    glow: 'hover:shadow-[0_0_18px_rgba(232,180,74,0.22)]',
    items: [
      'cloud beta (managed sandboxes, your keys)',
      'team workspaces (shared audit logs)',
      'voice approvals',
    ],
  },
  {
    tag: 'LATER',
    pill: 'border-hairline-dark text-bone-dim',
    glow: 'hover:shadow-[0_0_18px_rgba(237,230,214,0.12)]',
    items: ['multi-bot handoffs', 'sandbox snapshots', 'enterprise sso for the cloud tier'],
  },
];

export default function Roadmap() {
  return (
    <section data-nav-dark className="relative overflow-hidden bg-carbon py-28 md:py-36">
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-site px-6 md:px-10">
        <SectionHeader
          dark
          kicker="// ROADMAP"
          title={
            <>
              Where this is going — <em className="font-normal text-ember">public, and short on promises.</em>
            </>
          }
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {columns.map((col, ci) => (
            <motion.div
              key={col.tag}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: ci * 0.15, ease: EASE }}
              className="rounded-[12px] border border-hairline-dark bg-carbon-2 p-6"
            >
              <span
                className={cn(
                  'inline-block rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-shadow duration-300',
                  col.pill,
                  col.glow,
                )}
              >
                {col.tag}
              </span>
              <ul className="mt-5 border-t border-hairline-dark">
                {col.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 + ci * 0.15 + i * 0.05, ease: EASE }}
                    className="border-b border-hairline-dark py-3 font-mono text-[13px] leading-relaxed text-bone-dim"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <Reveal delay={0.35}>
          <p className="mt-8 font-mono text-[12px] text-bone-dim">
            {'// roadmap lives in the repo. dates are ranges, not promises.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
