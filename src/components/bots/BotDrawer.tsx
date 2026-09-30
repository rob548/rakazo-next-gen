import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, X } from 'lucide-react';
import type { Bot } from '@/data/bots';
import { drawerContent } from '@/components/bots/drawerContent';
import { ArtifactCard, ChatBubbleBot, ChatBubbleUser, ChecklistCard, ApprovalCard, HandoffBubble } from '@/components/demo/ChatDemo';
import { WindowDots } from '@/components/demo/Terminal';
import { toast } from '@/components/demo/Toast';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** Mini dark editor panel: 5-line markdown routine, lines highlight in sequence. */
function RoutinePanel({ bot, open }: { bot: Bot; open: boolean }) {
  const content = drawerContent[bot.id];
  if (!content) return null;
  const copy = () => {
    navigator.clipboard?.writeText(content.routine.join('\n')).catch(() => {});
    toast('copied routine — paste it in ~/rakazo');
  };
  return (
    <div className="overflow-hidden rounded-xl border border-hairline-dark bg-carbon-2">
      <div className="flex items-center justify-between border-b border-hairline-dark px-4 py-2.5">
        <div className="flex items-center gap-3">
          <WindowDots />
          <span className="font-mono text-[11.5px] text-bone-dim">{content.routineFile}</span>
        </div>
        <button
          onClick={copy}
          aria-label="copy routine"
          className="inline-flex items-center gap-1.5 rounded-full border border-hairline-dark px-2.5 py-1 font-mono text-[11px] text-bone-dim transition-colors hover:border-bone-dim hover:text-bone"
        >
          <Copy className="h-3 w-3" /> copy
        </button>
      </div>
      <div className="space-y-1.5 px-4 py-4 font-mono text-[13px] leading-[1.55]">
        {content.routine.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0.25, x: -6 }}
            animate={open ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.12, ease: EASE }}
            className="flex items-baseline gap-2 text-bone"
          >
            <motion.span
              initial={{ backgroundColor: 'rgba(110,231,160,0)' }}
              animate={open ? { backgroundColor: ['rgba(110,231,160,0)', 'rgba(110,231,160,0.14)', 'rgba(110,231,160,0)'] } : {}}
              transition={{ duration: 0.9, delay: 0.35 + i * 0.12 }}
              className="rounded px-1 -mx-1"
            >
              {line}
            </motion.span>
          </motion.p>
        ))}
      </div>
    </div>
  );
}

/** The bot's sample thread, rendered with the shared chat components. */
function SampleThread({ bot }: { bot: Bot }) {
  const [resolved, setResolved] = useState<'approved' | 'denied' | null>(null);
  useEffect(() => setResolved(null), [bot.id]);
  return (
    <div className="space-y-4 rounded-xl border border-hairline-dark bg-carbon-2/60 p-4">
      {bot.handoff && <HandoffBubble handoff={bot.handoff} toName={bot.name} />}
      {bot.thread.map((m) =>
        m.from === 'user' ? (
          <ChatBubbleUser key={m.id} text={m.text} />
        ) : (
          <ChatBubbleBot key={m.id} bot={bot} time={m.time}>
            <p>{m.text}</p>
            {m.checklist && <ChecklistCard items={m.checklist} visibleCount={m.checklist.length} />}
            {m.artifact && <ArtifactCard artifact={m.artifact} />}
            {m.approval && (
              <ApprovalCard
                summary={m.approval.summary}
                detail={m.approval.detail}
                rules={m.approval.rules}
                resolved={resolved}
                onResolve={setResolved}
              />
            )}
          </ChatBubbleBot>
        ),
      )}
    </div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.15 + i * 0.08, ease: EASE },
  }),
};

function DrawerSection({
  index,
  open,
  label,
  children,
}: {
  index: number;
  open: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      custom={index}
      variants={sectionVariants}
      initial="hidden"
      animate={open ? 'show' : 'hidden'}
    >
      <p className="mb-3 font-mono text-[11.5px] uppercase tracking-[0.14em] text-phosphor">
        {label}
      </p>
      {children}
    </motion.section>
  );
}

export default function BotDrawer({
  bot,
  onClose,
}: {
  bot: Bot | null;
  onClose: () => void;
}) {
  const open = bot !== null;

  // esc to close + page scroll lock while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const content = bot ? drawerContent[bot.id] : undefined;

  return (
    <AnimatePresence>
      {bot && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-carbon/60"
            aria-hidden
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={`${bot.name} template details`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-y-0 right-0 z-[70] flex w-[min(560px,100vw)] flex-col border-l border-hairline-dark bg-carbon text-bone"
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4 border-b border-hairline-dark px-6 py-5">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-hairline-dark bg-carbon-3" style={{ boxShadow: `0 4px 14px -4px ${bot.color}66` }}>
                  <img src={bot.avatar} alt="" className="h-[90%] w-[90%] object-contain" />
                </span>
                <div>
                  <h2 className="font-display text-[28px] font-medium leading-tight tracking-[-0.015em]">
                    {bot.name}
                  </h2>
                  <p className="mt-1 font-mono text-[11.5px] text-bone-dim">
                    <span className="mr-2 rounded-full border border-hairline-dark px-2 py-0.5 uppercase tracking-[0.12em] text-bone-dim">
                      {bot.dept}
                    </span>
                    template · ready to interview
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="close drawer"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline-dark text-bone-dim transition-colors hover:border-bone-dim hover:text-bone"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* scrollable body */}
            <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
              <DrawerSection index={0} open={open} label="// the pitch">
                <p className="text-[15px] leading-[1.65] text-bone-dim">{content?.pitch}</p>
              </DrawerSection>

              <DrawerSection index={1} open={open} label="// sample routine">
                <RoutinePanel bot={bot} open={open} />
              </DrawerSection>

              <DrawerSection index={2} open={open} label="// a thread it would have">
                <SampleThread bot={bot} />
              </DrawerSection>

              <DrawerSection index={3} open={open} label="// tools it expects">
                <div className="flex flex-wrap gap-2">
                  {bot.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-hairline-dark bg-carbon-2 px-3 py-1.5 font-mono text-[12px] text-bone-dim"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </DrawerSection>
            </div>

            {/* footer CTAs */}
            <div
              className={cn(
                'flex flex-wrap items-center gap-3 border-t border-hairline-dark px-6 py-5',
              )}
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => toast('install rakazo to hire this bot')}
                className="rounded-full border border-ember bg-ember px-6 py-3 font-sans text-[14.5px] font-semibold text-carbon transition-colors duration-250 hover:bg-ember-bright"
              >
                Use this template
              </motion.button>
              <Link
                to="/docs"
                onClick={onClose}
                className="rounded-full border border-hairline-dark px-6 py-3 font-sans text-[14.5px] font-semibold text-bone transition-colors duration-250 hover:border-bone hover:bg-bone/[0.04]"
              >
                Read the quickstart
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
