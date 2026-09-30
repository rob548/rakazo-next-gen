import { motion } from 'framer-motion';
import { Reveal, SectionHeader } from '@/components/Reveal';
import { cn } from '@/lib/utils';

/**
 * S3 · Comparison table — the page's centerpiece, on paper-deep.
 * Header row first, then rows wipe in clip-path left→right (0.09s stagger);
 * ✓ glyphs pop with a spring after their row lands; Rakazo column carries the
 * ember border. Row hover: paper fill + feature name turns ember.
 * Sticky first column, horizontal scroll + right-edge fade on mobile.
 *
 * The shared ComparisonTable component stays generic (used on Home); this
 * centerpiece variant adds the design's per-row choreography on top of the
 * same visual language.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface Row {
  feature: string;
  rakazo: string;
  grokBot: string;
  dots: string;
}

const rows: Row[] = [
  { feature: 'Self-hosted', rakazo: '✓', grokBot: '—', dots: '—' },
  { feature: 'Open source', rakazo: '✓ Apache-2.0', grokBot: '—', dots: '—' },
  { feature: 'Any model (Claude, GPT, Grok, local)', rakazo: '✓', grokBot: 'xAI models only', dots: 'OpenAI models only' },
  { feature: 'Credentials on your machine', rakazo: '✓', grokBot: '—', dots: '—' },
  { feature: 'Memory you can inspect & export', rakazo: '✓ markdown files', grokBot: 'not inspectable', dots: 'managed, not exportable' },
  { feature: 'Sandboxed computer per bot', rakazo: '✓', grokBot: 'one shared computer', dots: 'shared cloud env' },
  { feature: 'Approvals + append-only audit log', rakazo: '✓', grokBot: 'partial', dots: 'partial' },
  { feature: 'Account required', rakazo: 'none', grokBot: 'Cursor account', dots: 'OpenAI account' },
  { feature: 'Price', rakazo: 'free (your tokens)', grokBot: '~$200/mo standalone*', dots: 'Pro / Business gated' },
];

const cols: { key: keyof Omit<Row, 'feature'>; label: string }[] = [
  { key: 'rakazo', label: 'Rakazo' },
  { key: 'grokBot', label: 'Grok Bot' },
  { key: 'dots', label: 'OpenAI Dots' },
];

function Cell({ value, rowDelay }: { value: string; rowDelay: number }) {
  if (value.startsWith('✓')) {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[12.5px]">
        <motion.span
          className="text-[14px] text-ink"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 500, damping: 20, delay: rowDelay + 0.1 }}
        >
          ✓
        </motion.span>
        {value.length > 1 && <span>{value.slice(2)}</span>}
      </span>
    );
  }
  if (value === '—') return <span className="font-mono text-ink-faint">—</span>;
  return <span className="font-mono text-[12.5px]">{value}</span>;
}

export default function ComparisonSection() {
  return (
    <section className="bg-paper-deep py-24 md:py-36">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeader
          kicker="// HONEST MATH"
          title={
            <>
              How Rakazo <em className="font-normal text-ember">stacks up.</em>
            </>
          }
          sub="Alternatives are good products. They're just asking you to rent what Rakazo lets you own."
        />

        <div className="relative mt-14">
          {/* right-edge fade for horizontal scroll on mobile */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-paper-deep to-transparent md:hidden" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-[14px] text-ink">
              <thead>
                <motion.tr
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="border-b border-hairline"
                >
                  <th className="sticky left-0 bg-paper-deep py-3 pr-4 text-left font-mono text-[12px] font-normal uppercase tracking-[0.14em] text-ink-faint">
                    &nbsp;
                  </th>
                  {cols.map((c) => (
                    <th
                      key={c.key}
                      className={cn(
                        'px-4 py-3 text-left font-sans text-[14px] font-semibold',
                        c.key === 'rakazo' && 'border-x border-t border-ember bg-ember-soft/40 text-ember',
                      )}
                    >
                      {c.label}
                    </th>
                  ))}
                </motion.tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => {
                  const rowDelay = 0.15 + ri * 0.09;
                  const last = ri === rows.length - 1;
                  return (
                    <motion.tr
                      key={row.feature}
                      initial={{ clipPath: 'inset(0 100% 0 0)' }}
                      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.55, delay: rowDelay, ease: EASE }}
                      className="group border-b border-hairline transition-colors hover:bg-paper"
                    >
                      <td className="sticky left-0 bg-paper-deep py-3.5 pr-4 font-sans text-[14.5px] font-medium text-ink transition-colors group-hover:bg-paper group-hover:text-ember">
                        {row.feature}
                      </td>
                      {cols.map((c) => (
                        <td
                          key={c.key}
                          className={cn(
                            'px-4 py-3.5 text-ink-soft',
                            c.key === 'rakazo' &&
                              cn('border-x border-ember bg-ember-soft/40 text-ink', last && 'border-b'),
                          )}
                        >
                          <Cell value={row[c.key]} rowDelay={rowDelay} />
                        </td>
                      ))}
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-6 font-mono text-[12px] text-ink-faint">
            facts checked oct 2026 — vendor pages change fast. *grok bot is early beta; standalone
            pricing or bundled with SuperGrok / Cursor plans. tell us if we got something wrong →{' '}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-ember underline-offset-4 hover:underline"
            >
              github issues
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
