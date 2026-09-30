import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ChangeTag } from './releases';
import { chipTextStyles } from './releases';

export type Filter = 'ALL' | ChangeTag;

const chips: { id: Filter; label: string }[] = [
  { id: 'ALL', label: 'ALL' },
  { id: 'NEW', label: 'NEW' },
  { id: 'IMPROVED', label: 'IMPROVED' },
  { id: 'FIXED', label: 'FIXED' },
  { id: 'BREAKING', label: 'BREAKING' },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** S2 · sticky filter chips. Active = ink pill; filters the timeline live. */
export default function FilterChips({
  filter,
  onChange,
}: {
  filter: Filter;
  onChange: (f: Filter) => void;
}) {
  return (
    <div className="sticky top-16 z-30 border-b border-hairline bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[860px] flex-wrap items-center gap-2 px-6 py-3.5 md:px-10">
        <span className="mr-2 hidden font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint sm:inline">
          filter ▸
        </span>
        {chips.map((c, i) => {
          const active = filter === c.id;
          return (
            <motion.button
              key={c.id}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.05 * i, ease: EASE }}
              onClick={() => onChange(c.id)}
              aria-pressed={active}
              className={cn(
                'rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-200',
                active
                  ? 'border-ink bg-ink text-paper'
                  : cn(
                      'border-hairline bg-transparent hover:border-ink',
                      c.id === 'ALL' ? 'text-ink-soft' : chipTextStyles[c.id as ChangeTag],
                    ),
              )}
            >
              {c.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
