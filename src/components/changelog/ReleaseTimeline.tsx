import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Filter } from './FilterChips';
import type { Release } from './releases';
import { releases, tagStyles } from './releases';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function ReleaseEntry({
  release,
  filter,
  pairIndex,
}: {
  release: Release;
  filter: Filter;
  pairIndex: number;
}) {
  const rows =
    filter === 'ALL' ? release.changes : release.changes.filter((c) => c.tag === filter);

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
      transition={{ duration: 0.55, delay: pairIndex * 0.12, ease: EASE }}
      className="group relative pl-12"
      id={release.anchor}
    >
      {/* node dot — pops with a spring, grows on hover (12px → 16px) */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ type: 'spring', stiffness: 320, damping: 16, duration: 0.4 }}
        className="absolute left-[-5px] top-[10px] h-3 w-3 rounded-full bg-ember transition-transform duration-200 group-hover:scale-[1.333]"
        aria-hidden
      />
      <div className="rounded-[10px] px-4 py-5 -mx-4 transition-colors duration-200 group-hover:bg-paper-deep">
        <p className="font-mono text-[12px] text-ink-faint">{release.date}</p>
        <h3 className="mt-1.5 flex items-baseline gap-3 font-display text-[28px] font-medium leading-none tracking-[-0.01em] text-ink">
          <a href={`#${release.anchor}`} className="scroll-mt-32 hover:text-ember">
            {release.version}
          </a>
          <span className="font-display text-[19px] font-normal italic text-ink-soft">
            “{release.codename}”
          </span>
          <a
            href={`#${release.anchor}`}
            aria-label={`link to ${release.version}`}
            className="font-mono text-[14px] text-ink-faint opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            §
          </a>
        </h3>
        <ul className="mt-4 space-y-2.5">
          <AnimatePresence initial={false}>
            {rows.map((c, ci) => (
              <motion.li
                layout="position"
                key={c.text}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                transition={{ duration: 0.3, delay: ci * 0.04, ease: EASE }}
                className="flex items-start gap-3"
              >
                <span
                  className={cn(
                    'mt-[3px] inline-block shrink-0 rounded-full px-2 py-[2px] font-mono text-[10px] font-semibold uppercase tracking-[0.1em]',
                    tagStyles[c.tag],
                  )}
                >
                  {c.tag}
                </span>
                <span className="text-[15px] leading-[1.6] text-ink-soft">{c.text}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </motion.article>
  );
}

/** S3 · release timeline — entries hang off the ruled spine, newest first. */
export default function ReleaseTimeline({ filter }: { filter: Filter }) {
  const visible =
    filter === 'ALL' ? releases : releases.filter((r) => r.changes.some((c) => c.tag === filter));

  return (
    <div className="relative pb-32 pt-14">
      <div className="flex flex-col gap-10">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((r, i) => (
            <ReleaseEntry key={r.version} release={r} filter={filter} pairIndex={Math.floor(i / 2)} />
          ))}
        </AnimatePresence>
      </div>
      {visible.length === 0 && (
        <p className="pl-12 font-mono text-[13px] text-ink-faint">// nothing with that tag yet.</p>
      )}
    </div>
  );
}
