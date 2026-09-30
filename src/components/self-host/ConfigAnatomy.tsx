import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { WindowDots } from '@/components/demo/Terminal';
import { Reveal, SectionHeader } from '@/components/Reveal';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface YamlLine {
  code: string;
  comment?: string;
  tip: string;
}

const yamlLines: YamlLine[] = [
  {
    code: 'workspace: ~/rakazo',
    comment: '# lives on your disk',
    tip: 'Back up this folder and everything comes with it — memory, routines, logs.',
  },
  {
    code: 'model: claude-sonnet',
    comment: '# per-bot override allowed',
    tip: 'Any bot can pin a different model in its own config file.',
  },
  {
    code: 'sandbox: docker',
    comment: '# e2b | daytona | createos | box',
    tip: 'Swap providers without touching your bots or their memory.',
  },
  {
    code: 'approvals:',
    tip: 'What a bot may do alone: ask pauses for you, auto runs, never is a wall.',
  },
  {
    code: '  send_email: ask',
    comment: '# ask | auto | never',
    tip: '“ask” means the bot drafts the email — you hit send.',
  },
  {
    code: '  spend_money: never',
    tip: 'A hard no. The bot can’t even ask.',
  },
  {
    code: 'audit_log: append-only',
    comment: '# the bot can’t edit this',
    tip: 'Every action, timestamped and checksummed. Tamper-evident by design.',
  },
];

/** Annotated rakazo.yaml panel: lines stagger-type in, comments are hover hotspots. */
function YamlPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [lengths, setLengths] = useState<number[]>(() => yamlLines.map(() => 0));
  const [typed, setTyped] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLengths(yamlLines.map((l) => l.code.length + (l.comment?.length ?? 0)));
      setTyped(true);
      return;
    }
    let t = 250;
    yamlLines.forEach((line, li) => {
      const total = line.code.length + (line.comment ? 1 + line.comment.length : 0);
      const speed = 14;
      for (let c = 0; c <= total; c++) {
        timers.current.push(
          window.setTimeout(() => {
            setLengths((prev) => {
              const n = [...prev];
              n[li] = c;
              return n;
            });
          }, t + c * speed),
        );
      }
      // next line starts 60ms after this one finishes
      t += total * speed + 60;
    });
    timers.current.push(window.setTimeout(() => setTyped(true), t + 100));
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-[14px] border border-hairline-dark bg-carbon-3 shadow-[0_0_60px_rgba(0,0,0,0.25)]"
    >
      <div className="flex items-center gap-3 border-b border-hairline-dark px-4 py-3">
        <WindowDots />
        <span className="font-mono text-[12px] text-bone-dim">~/rakazo/rakazo.yaml</span>
      </div>
      <div className="p-5 font-mono text-[13.5px] leading-[2] md:p-6">
        {yamlLines.map((line, li) => {
          const shown = lengths[li];
          const codeShown = line.code.slice(0, shown);
          const commentShown =
            line.comment && shown > line.code.length
              ? ' ' + line.comment.slice(0, shown - line.code.length - 1)
              : '';
          const isHovered = hovered === li;
          return (
            <div
              key={li}
              className={cn(
                'relative rounded px-2 -mx-2 transition-colors',
                typed && 'cursor-help',
                isHovered && 'bg-carbon-2',
              )}
              tabIndex={typed ? 0 : -1}
              onMouseEnter={() => typed && setHovered(li)}
              onMouseLeave={() => setHovered((h) => (h === li ? null : h))}
              onFocus={() => typed && setHovered(li)}
              onBlur={() => setHovered((h) => (h === li ? null : h))}
            >
              <span className="whitespace-pre-wrap text-bone">{codeShown}</span>
              <span
                className={cn(
                  'whitespace-pre-wrap transition-colors duration-200',
                  isHovered ? 'text-phosphor' : 'text-bone-dim/70',
                )}
              >
                {commentShown}
              </span>
              {/* hotspot dot — pulses ember on hover */}
              <span
                aria-hidden
                className={cn(
                  'ml-2 inline-block h-1.5 w-1.5 rounded-full align-middle transition-opacity',
                  isHovered ? 'animate-pulse-dot bg-ember opacity-100' : 'bg-ember/50 opacity-0',
                  typed && !isHovered && 'opacity-40',
                )}
              />
              {li === yamlLines.length - 1 && !typed && shown < line.code.length + (line.comment?.length ?? 0) && (
                <span className="animate-cursor-blink text-phosphor">▌</span>
              )}
              {/* tooltip card */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="absolute left-2 top-full z-20 mt-1 w-[min(300px,80vw)] rounded-[10px] border border-hairline-dark bg-carbon-2 p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
                    role="tooltip"
                  >
                    <p className="font-mono text-[12px] leading-[1.6] text-bone-dim">{line.tip}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** S5 · config anatomy — "Everything is a file." 5/7 split on paper-deep. */
export default function ConfigAnatomy() {
  return (
    <section className="bg-paper-deep py-24 md:py-32">
      <div className="mx-auto grid max-w-site items-center gap-14 px-6 md:px-10 lg:grid-cols-[5fr_7fr]">
        <div>
          <SectionHeader
            kicker="// CONFIG ANATOMY"
            title={
              <>
                Everything is a <em className="font-normal text-ember">file.</em>
              </>
            }
          />
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-[440px] text-[16.5px] leading-[1.65] text-ink-soft">
              No database to migrate, no dashboard lock-in. A Rakazo workspace is a folder of
              Markdown, YAML, and logs. Git it, rsync it, back it up however you like.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-7 font-mono text-[12.5px] text-ink-faint">
              {'// hover a line — every setting explains itself.'}
            </p>
          </Reveal>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <YamlPanel />
        </motion.div>
      </div>
    </section>
  );
}
