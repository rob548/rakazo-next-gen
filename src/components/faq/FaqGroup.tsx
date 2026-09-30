import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { FaqGroupData } from '@/components/faq/faqContent';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/**
 * One FAQ group: mono kicker header with a hairline draw, then hairline-separated
 * accordion rows. One open at a time per group; rows FLIP on search filtering and
 * the mono index renumbers against the filtered list.
 */
export default function FaqGroup({ group }: { group: FaqGroupData }) {
  const [openQ, setOpenQ] = useState<string | null>(null);

  return (
    <div>
      {/* group header with hairline draw */}
      <div className="flex items-baseline justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] text-ember"
        >
          {group.label}
        </motion.h2>
        <span className="font-mono text-[11px] text-ink-faint">
          {String(group.entries.length).padStart(2, '0')}
        </span>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mt-3 h-px origin-left bg-ink"
        aria-hidden
      />

      <div className="mt-2">
        <AnimatePresence initial={false} mode="popLayout">
          {group.entries.map((e, i) => {
            const open = openQ === e.q;
            return (
              <motion.div
                key={e.q}
                layout
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                viewport={{ once: true, amount: 0.4, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
                className="border-b border-hairline"
              >
                <button
                  onClick={() => setOpenQ(open ? null : e.q)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-4 py-5 text-left"
                >
                  <span className="w-9 shrink-0 font-mono text-[12px] text-ink-faint">
                    {group.letter}.{String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-sans text-[16.5px] font-semibold tracking-[-0.01em] text-ink">
                    {e.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[20px] leading-none text-ink-faint"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.25 }}
                        className="max-w-[620px] pb-6 pl-[52px] pr-8 text-[15px] leading-[1.65] text-ink-soft"
                      >
                        {e.a}
                        {e.link && (
                          <>
                            {' '}
                            <Link
                              to={e.link.to}
                              className="font-medium text-ember underline-offset-4 hover:underline"
                            >
                              {e.link.text}
                            </Link>
                          </>
                        )}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
