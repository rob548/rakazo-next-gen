import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Reveal, SectionHeader } from '@/components/Reveal';
import { cn } from '@/lib/utils';

/**
 * S6 · Chapter 04 — Approvals & audit. Interactive approval card on the left:
 * clicking Approve/Deny stamps the card and appends a row to the append-only
 * audit log panel on the right in real time.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface LogRow {
  id: number;
  time: string;
  text: string;
  fresh?: boolean;
}

const seedRows: LogRow[] = [
  { id: 3, time: '14:20:11', text: 'research task started · vendor contracts' },
  { id: 2, time: '09:44:02', text: 'approval granted · by you · via mobile' },
  { id: 1, time: '06:00:02', text: 'morning sweep complete · 41 actions' },
];

function now() {
  return new Date().toTimeString().slice(0, 8);
}

export default function ApprovalsChapter() {
  const [stamp, setStamp] = useState<'approved' | 'denied' | null>(null);
  const [rows, setRows] = useState<LogRow[]>(seedRows);

  const decide = (verdict: 'approved' | 'denied') => {
    if (stamp) return;
    setStamp(verdict);
    const text =
      verdict === 'approved'
        ? 'approval granted · by you · via web'
        : 'approval denied · by you · via web';
    setRows((r) => [{ id: Date.now(), time: now(), text, fresh: true }, ...r]);
  };

  return (
    <section className="bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeader
          kicker="// CHAPTER 04 · APPROVALS & AUDIT"
          title={
            <>
              Approvals <em className="font-normal text-ember">that hold.</em>
            </>
          }
          sub="Bots ask before anything irreversible. The log is append-only, on your disk, and the bot can't touch it."
        />

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-2">
          {/* approval card */}
          <Reveal>
            <motion.div
              initial={{ rotate: -2 }}
              whileInView={{ rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative rounded-[12px] border border-hairline border-l-2 border-l-amber bg-paper-deep p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber">
                approval needed · expires in 58m
              </p>
              <p className="mt-3 font-sans text-[18px] font-semibold tracking-[-0.01em] text-ink">
                send q3 pricing reply to acme corp?
              </p>
              {/* diff-style excerpt */}
              <div className="mt-4 space-y-1.5 rounded-[10px] border border-hairline bg-paper p-4 font-mono text-[12.5px] leading-[1.6]">
                <p className="text-ink-faint line-through decoration-ember/60">
                  - happy to discuss rates on a call
                </p>
                <p className="text-ink">
                  + locking the q3 rate for your renewal — details inline
                </p>
              </div>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => decide('approved')}
                  disabled={!!stamp}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-5 py-2 font-mono text-[13px] transition-colors',
                    stamp
                      ? 'border-hairline text-ink-faint'
                      : 'border-phosphor/70 text-ink hover:bg-phosphor/15',
                  )}
                >
                  <Check className="h-3.5 w-3.5" /> Approve
                </button>
                <button
                  onClick={() => decide('denied')}
                  disabled={!!stamp}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-5 py-2 font-mono text-[13px] transition-colors',
                    stamp
                      ? 'border-hairline text-ink-faint'
                      : 'border-hairline text-ink-soft hover:border-ember hover:text-ember',
                  )}
                >
                  <X className="h-3.5 w-3.5" /> Deny
                </button>
              </div>

              {/* stamp */}
              <AnimatePresence>
                {stamp && (
                  <motion.div
                    key={stamp}
                    initial={{ scale: 1.4, rotate: -8, opacity: 0 }}
                    animate={{ scale: 1, rotate: -8, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className={cn(
                      'pointer-events-none absolute right-5 top-5 rounded-md border-2 px-3 py-1 font-mono text-[13px] font-semibold uppercase tracking-[0.14em]',
                      stamp === 'approved'
                        ? 'border-phosphor text-phosphor'
                        : 'border-ember text-ember',
                    )}
                  >
                    {stamp}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <p className="mt-4 font-mono text-[11.5px] text-ink-faint">
              try it — the log on the right appends in real time ↓
            </p>
            <Reveal delay={0.2}>
              <img
                src="/arch-diagram.svg"
                alt="architecture: your machine, sandboxed containers, model providers"
                className="mt-6 w-full max-w-[360px] rounded-[10px] border border-hairline opacity-90"
                loading="lazy"
              />
            </Reveal>
          </Reveal>

          {/* audit log panel */}
          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-[14px] border border-hairline-dark bg-carbon-2">
              <div className="flex items-center justify-between border-b border-hairline-dark px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-ember" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                    <span className="h-2.5 w-2.5 rounded-full bg-phosphor" />
                  </div>
                  <span className="font-mono text-[12px] text-bone-dim">audit.log — append-only</span>
                </div>
                <span className="font-mono text-[11px] text-bone-dim">sha-chained</span>
              </div>
              <div className="max-h-[300px] space-y-0 overflow-y-auto p-4">
                <AnimatePresence initial={false}>
                  {rows.map((r) => (
                    <motion.p
                      key={r.id}
                      initial={{ opacity: 0, y: -14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="border-b border-hairline-dark/60 py-2.5 font-mono text-[12.5px] last:border-b-0"
                    >
                      <motion.span
                        initial={r.fresh ? { color: '#22D3EE' } : false}
                        animate={{ color: '#9AA0BD' }}
                        transition={{ duration: 0.3, delay: r.fresh ? 0.3 : 0 }}
                      >
                        [{r.time}] {r.text}
                      </motion.span>
                    </motion.p>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
