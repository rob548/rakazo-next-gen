import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AccordionEntry {
  q: string;
  a: string;
}

/**
 * FAQ accordion: hairline rows, mono index, + rotates 45° on open,
 * one open at a time. 0.35s expo height animation.
 */
export default function Accordion({
  entries,
  dark = false,
  className,
}: {
  entries: AccordionEntry[];
  dark?: boolean;
  className?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'border-t',
        dark ? 'border-hairline-dark' : 'border-hairline',
        className,
      )}
    >
      {entries.map((e, i) => {
        const open = openIdx === i;
        return (
          <div key={e.q} className={cn('border-b', dark ? 'border-hairline-dark' : 'border-hairline')}>
            <button
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center gap-4 py-5 text-left"
            >
              <span className={cn('font-mono text-[12px]', dark ? 'text-bone-dim' : 'text-ink-faint')}>
                Q.{String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'flex-1 font-sans text-[16.5px] font-semibold tracking-[-0.01em]',
                  dark ? 'text-bone' : 'text-ink',
                )}
              >
                {e.q}
              </span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className={cn('text-[20px] leading-none', dark ? 'text-bone-dim' : 'text-ink-faint')}
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
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.25 }}
                    className={cn(
                      'max-w-[620px] pb-6 pl-12 pr-8 text-[15px] leading-[1.65]',
                      dark ? 'text-bone-dim' : 'text-ink-soft',
                    )}
                  >
                    {e.a}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
