import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Copy } from 'lucide-react';
import { SectionHeader } from '@/components/Reveal';
import { toast } from '@/components/demo/Toast';
import { cn } from '@/lib/utils';

/**
 * S4 · Chapter 02 — Routines. paper-deep, 5/7 split (copy left).
 * Dark editor panel with syntax tinting; each list item underlines in ember
 * sequentially (0.3s apart) once 70% visible. Copy button copies the markdown.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const MARKDOWN = `# morning sweep — weekdays 6am
- archive newsletters + receipts older than 48h
- draft replies to anything from a human
- flag emails from @acme.com as urgent
- never: send drafts without approval`;

const lines = [
  { text: '# morning sweep — weekdays 6am', kind: 'heading' as const },
  { text: '- archive newsletters + receipts older than 48h', kind: 'bullet' as const },
  { text: '- draft replies to anything from a human', kind: 'bullet' as const },
  { text: '- flag emails from @acme.com as urgent', kind: 'bullet' as const },
  { text: '- never: send drafts without approval', kind: 'never' as const },
];

export default function RoutinesChapter() {
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { amount: 0.7, once: true });

  const copy = () => {
    navigator.clipboard?.writeText(MARKDOWN).catch(() => {});
    toast('copied — paste it in your editor');
  };

  return (
    <section className="bg-paper-deep py-24 md:py-36">
      <div className="mx-auto grid max-w-site items-center gap-14 px-6 md:px-10 lg:grid-cols-[5fr_7fr]">
        {/* copy */}
        <div>
          <SectionHeader
            kicker="// CHAPTER 02 · ROUTINES"
            title={
              <>
                Readable <em className="font-normal text-ember">routines.</em>
              </>
            }
            sub="A routine is a Markdown file. If you can read a README, you can audit what your bot does every morning. Change the file, change the behavior — no dashboard spelunking."
          />
        </div>

        {/* visual — dark editor panel */}
        <motion.div
          initial={{ opacity: 0, x: 56 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div
            ref={panelRef}
            className="overflow-hidden rounded-[14px] border border-hairline-dark bg-carbon-3"
          >
            <div className="flex items-center justify-between border-b border-hairline-dark px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-ember" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                  <span className="h-2.5 w-2.5 rounded-full bg-phosphor" />
                </div>
                <span className="font-mono text-[12px] text-bone-dim">routines/morning-sweep.md</span>
              </div>
              <button
                onClick={copy}
                aria-label="copy routine markdown"
                className="rounded-md p-1.5 text-bone-dim transition-colors hover:bg-carbon-2 hover:text-bone"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-2.5 p-6 font-mono text-[13.5px] leading-[1.6] md:p-7">
              {lines.map((l, i) => (
                <p
                  key={l.text}
                  className={cn(
                    l.kind === 'heading' && 'text-[15px] font-semibold text-ember',
                    l.kind === 'bullet' && 'text-bone',
                    l.kind === 'never' && 'text-amber',
                  )}
                >
                  <span className="relative inline-block">
                    {l.text}
                    {l.kind !== 'heading' && (
                      <motion.span
                        aria-hidden
                        className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-ember"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + (i - 1) * 0.3, ease: EASE }}
                      />
                    )}
                  </span>
                </p>
              ))}
            </div>
          </div>
          <p className="mt-4 font-mono text-[12px] text-ink-faint">
            plain markdown · version controlled · diffable
          </p>
        </motion.div>
      </div>
    </section>
  );
}
