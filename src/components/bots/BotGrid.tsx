import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Bot } from '@/data/bots';
import { toast } from '@/components/demo/Toast';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function BotGrid({
  items,
  query,
  onSelect,
}: {
  items: Bot[];
  query: string;
  onSelect: (bot: Bot) => void;
}) {
  return (
    <div className="mx-auto max-w-site px-6 py-16 md:px-10">
      {items.length > 0 ? (
        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((b, i) => (
              <motion.div
                key={b.id}
                layout
                initial={{ opacity: 0, y: 36, rotate: i % 2 === 0 ? -1 : 1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                viewport={{ once: true, amount: 0.2, margin: '0px 0px -18% 0px' }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: EASE }}
              >
                <button
                  onClick={() => onSelect(b)}
                  aria-label={`open ${b.name} template details`}
                  className="group flex h-full w-full flex-col rounded-[10px] border border-hairline bg-paper p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hard"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-hairline bg-paper-deep" style={{ boxShadow: `0 6px 18px -6px ${b.color}66` }}>
                      <img src={b.avatar} alt="" className="h-[88%] w-[88%] object-contain" />
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
                      {b.dept}
                    </span>
                  </div>
                  <h3 className="mt-4 font-sans text-[19px] font-semibold tracking-[-0.01em] text-ink">
                    {b.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[14px] leading-[1.55] text-ink-soft">{b.tagline}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="truncate font-mono text-[11px] text-ink-faint">
                      tools: {b.tools.join(' · ')}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 -translate-x-2 text-ember opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mx-auto max-w-[520px] rounded-[10px] border border-dashed border-hairline px-8 py-14 text-center"
        >
          <p className="font-mono text-[13px] leading-[1.7] text-ink-faint">
            no bots match “{query}” — hire one anyway?
          </p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => toast('blank interview queued — the bot asks the questions')}
            className="mt-6 rounded-full border border-hairline px-6 py-3 font-sans text-[14.5px] font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-ink/[0.04]"
          >
            Start blank interview
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
