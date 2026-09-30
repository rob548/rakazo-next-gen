import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const FILTERS = ['ALL', 'SALES', 'OPS', 'ENGINEERING', 'FINANCE', 'PEOPLE'] as const;
export type BotFilter = (typeof FILTERS)[number];

/** Dept values used in src/data/bots.ts mapped onto the design's filter chips. */
export const FILTER_DEPTS: Record<BotFilter, string[]> = {
  ALL: [],
  SALES: ['GROWTH', 'CX'],
  OPS: ['OPS', 'COMMS'],
  ENGINEERING: ['ENG'],
  FINANCE: ['FINANCE'],
  PEOPLE: ['PEOPLE'],
};

export default function FilterBar({
  filter,
  onFilter,
  query,
  onQuery,
  shown,
  total,
}: {
  filter: BotFilter;
  onFilter: (f: BotFilter) => void;
  query: string;
  onQuery: (q: string) => void;
  shown: number;
  total: number;
}) {
  return (
    <div className="sticky top-16 z-40 border-b border-hairline bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-site flex-wrap items-center gap-x-5 gap-y-3 px-6 py-3.5 md:px-10">
        {/* chips */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="filter by department">
          {FILTERS.map((f, i) => {
            const active = filter === f;
            return (
              <motion.button
                key={f}
                role="tab"
                aria-selected={active}
                onClick={() => onFilter(f)}
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.04 * i, ease: EASE }}
                className={cn(
                  'relative rounded-full px-3.5 py-1.5 font-mono text-[11.5px] tracking-[0.12em] transition-colors duration-200',
                  active ? 'text-paper' : 'border border-hairline text-ink-soft hover:border-ink hover:text-ink',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="bot-filter-pill"
                    transition={{ duration: 0.25, ease: EASE }}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                )}
                <span className="relative">{f}</span>
              </motion.button>
            );
          })}
        </div>

        {/* count + search */}
        <div className="ml-auto flex items-center gap-4">
          <span className="hidden font-mono text-[12px] text-ink-faint sm:inline">
            showing {shown}/{total}
          </span>
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
            <span className="sr-only">filter by tool</span>
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="filter by tool… e.g. gmail"
              className="w-[220px] rounded-full border border-hairline bg-transparent py-1.5 pl-8 pr-3 font-mono text-[12px] text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
