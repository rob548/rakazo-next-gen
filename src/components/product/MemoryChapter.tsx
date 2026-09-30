import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FolderOpen, FileText } from 'lucide-react';
import { Reveal, SectionHeader } from '@/components/Reveal';
import { cn } from '@/lib/utils';

/**
 * S3 · Chapter 01 — Memory. 7/5 split: dark memory file tree visual on the
 * left, copy on the right. Hovering a file swaps the preview (0.25s crossfade),
 * phosphor cursor blinks at the end of the open file.
 */

const files = [
  {
    path: 'people/nora.md',
    group: 'people/',
    name: 'nora.md',
    lines: [
      '# nora — head of procurement, acme',
      '- prefers short replies, no greetings',
      '- decides on pricing, not her team',
    ],
  },
  {
    path: 'preferences/reply-tone.md',
    group: 'preferences/',
    name: 'reply-tone.md',
    lines: [
      '# reply tone',
      '- direct, warm, lowercase ok',
      '- never say "circling back"',
    ],
  },
  {
    path: 'decisions/2026-q1-pricing.md',
    group: 'decisions/',
    name: '2026-q1-pricing.md',
    lines: [
      '# q1 pricing call',
      '- q3 rate locked for acme renewals',
      '- approved by you · 09:44, from phone',
    ],
  },
];

export default function MemoryChapter() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-paper py-24 md:py-36">
      <div className="mx-auto grid max-w-site items-center gap-14 px-6 md:px-10 lg:grid-cols-[7fr_5fr]">
        {/* visual — dark memory file tree */}
        <Reveal className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-[14px] border border-hairline-dark bg-carbon-2">
            <div className="flex items-center gap-3 border-b border-hairline-dark px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ember" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                <span className="h-2.5 w-2.5 rounded-full bg-phosphor" />
              </div>
              <span className="font-mono text-[12px] text-bone-dim">~/rakazo/memory</span>
            </div>
            <div className="grid md:grid-cols-[1fr_1.2fr]">
              {/* tree */}
              <div className="border-b border-hairline-dark p-4 md:border-b-0 md:border-r">
                <p className="flex items-center gap-2 px-2 py-1.5 font-mono text-[12.5px] text-bone">
                  <FolderOpen className="h-3.5 w-3.5 text-ember" /> memory/
                </p>
                {files.map((f, i) => (
                  <Reveal key={f.path} delay={0.1 + i * 0.06} y={12}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className={cn(
                        'mt-1 flex w-full items-center gap-2 rounded-md px-2 py-2 pl-6 text-left font-mono text-[12.5px] transition-colors',
                        active === i
                          ? 'bg-carbon-3 text-phosphor'
                          : 'text-bone-dim hover:bg-carbon-3/60 hover:text-bone',
                      )}
                    >
                      <FileText className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        <span className="text-bone-dim/70">{f.group}</span>
                        {f.name}
                      </span>
                    </button>
                  </Reveal>
                ))}
                <p className="mt-4 px-2 font-mono text-[11px] leading-relaxed text-bone-dim/70">
                  plain markdown files. read them, edit them, delete them — they're on your disk.
                </p>
              </div>
              {/* preview */}
              <div className="relative min-h-[190px] bg-carbon-3/50 p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="font-mono text-[11px] text-bone-dim">{files[active].path}</p>
                    <div className="mt-3 space-y-2 font-mono text-[13px] leading-[1.55]">
                      {files[active].lines.map((l, li) => (
                        <p key={l} className={li === 0 ? 'text-ember' : 'text-bone'}>
                          {l}
                        </p>
                      ))}
                      <span className="block-cursor inline-block text-phosphor" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <SectionHeader
            kicker="// CHAPTER 01 · MEMORY"
            title={
              <>
                It remembers so <em className="font-normal text-ember">you don't have to.</em>
              </>
            }
            sub="Every bot keeps long-term memory on your disk: decisions made, preferences learned, context from every thread. Plain files you can read, edit, or delete."
          />
        </div>
      </div>
    </section>
  );
}
