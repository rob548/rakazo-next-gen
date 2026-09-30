import { motion } from 'framer-motion';
import { ArrowRightLeft, Check, FileText, Flag, GitPullRequest, Mail } from 'lucide-react';
import type {
  ArtifactPreview,
  Bot,
  BotStatus,
  ChecklistItem as ChecklistItemType,
} from '@/data/bots';
import { bots } from '@/data/bots';
import { cn } from '@/lib/utils';

export type RosterState = 'working' | 'waiting' | 'done' | 'idle';

export function PresenceDot({ status, className }: { status: BotStatus; className?: string }) {
  return (
    <span
      className={cn(
        'inline-block h-2 w-2 rounded-full',
        status === 'online' && 'bg-phosphor',
        status === 'waiting' && 'bg-amber',
        status === 'idle' && 'bg-bone-dim',
        className,
      )}
    />
  );
}

/* -------------------------------- avatar tile --------------------------------- */

/**
 * The 3D character, staged on a rounded tile with a bot-color glow.
 * Characters are never circle-cropped — they're the brand.
 */
export function AvatarTile({
  bot,
  state = 'idle',
  size = 'md',
  className,
}: {
  bot: Bot;
  state?: RosterState;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const dims = {
    xs: 'h-5 w-5 rounded-[6px]',
    sm: 'h-8 w-8 rounded-lg',
    md: 'h-10 w-10 rounded-xl',
    lg: 'h-14 w-14 rounded-2xl',
  }[size];

  const glow =
    state === 'working'
      ? `0 0 0 1.5px ${bot.color}, 0 0 18px 2px ${bot.color}59`
      : state === 'waiting'
        ? `0 0 0 1.5px #F59E0B, 0 0 16px 2px #F59E0B40`
        : `0 4px 14px -4px ${bot.color}66`;

  return (
    <span className={cn('relative inline-block shrink-0', className)}>
      {state === 'waiting' && (
        <span className="absolute -inset-1 animate-ping rounded-xl border border-amber/60" aria-hidden />
      )}
      <span
        className={cn(
          'relative flex items-center justify-center overflow-hidden border border-hairline-dark bg-carbon-3',
          dims,
          state === 'working' && 'animate-bob',
          state === 'idle' && 'opacity-60',
        )}
        style={{ boxShadow: glow }}
      >
        {/* radial glow behind the character */}
        <span
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 68%, ${bot.color}40, transparent 72%)` }}
          aria-hidden
        />
        <img src={bot.avatar} alt="" className="relative h-[92%] w-[92%] object-contain" />
      </span>
      {state === 'done' && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-carbon bg-phosphor text-carbon"
        >
          <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
        </motion.span>
      )}
    </span>
  );
}

/* --------------------------------- roster row --------------------------------- */

const STATE_LABEL: Record<RosterState, (bot: Bot) => string> = {
  working: (b) => b.statusLine.replace(/^online · /, ''),
  waiting: () => 'waiting · needs approval',
  done: () => 'done · nothing pending',
  idle: (b) => b.statusLine,
};

export function BotRosterItem({
  bot,
  active,
  state,
  onClick,
}: {
  bot: Bot;
  active: boolean;
  state: RosterState;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`open chat with ${bot.name}`}
      className={cn(
        'flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-left transition-colors duration-200',
        active ? 'border-ember bg-carbon-3' : 'border-transparent hover:bg-carbon-3/60',
      )}
    >
      <AvatarTile bot={bot} state={state} size="md" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold text-bone">{bot.name}</span>
        <span
          className={cn(
            'block truncate font-mono text-[11.5px]',
            state === 'working' && 'text-ember-bright',
            state === 'waiting' && 'text-amber',
            state === 'done' && 'text-phosphor',
            state === 'idle' && 'text-bone-dim',
          )}
        >
          {state === 'working' && <span className="mr-1 inline-block h-1 w-1 animate-pulse rounded-full bg-ember" />}
          {STATE_LABEL[state](bot)}
        </span>
      </span>
    </button>
  );
}

/* --------------------------------- chat pieces -------------------------------- */

export function ChatBubbleUser({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
      className="ml-auto max-w-[85%] rounded-xl bg-carbon-3 px-4 py-2.5 text-[14px] leading-relaxed text-bone"
    >
      {text}
    </motion.div>
  );
}

/** A bot-to-bot delegation, rendered as a system beat with a violet chip. */
export function HandoffBubble({ handoff, toName }: { handoff: NonNullable<Bot['handoff']>; toName: string }) {
  const fromBot = bots.find((b) => b.id === handoff.from);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-fit max-w-[92%]"
    >
      <div className="rounded-xl border border-ember/40 bg-ember/10 px-4 py-3">
        <div className="mb-1.5 flex items-center gap-2">
          {fromBot && <AvatarTile bot={fromBot} state="idle" size="xs" />}
          <span className="inline-flex items-center gap-1 rounded-full border border-ember/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ember-bright">
            <ArrowRightLeft className="h-2.5 w-2.5" />
            handoff
          </span>
          <span className="font-mono text-[11px] text-bone-dim">
            {handoff.from} → {toName.toLowerCase().replace(/ /g, '-')} · {handoff.time}
          </span>
        </div>
        <p className="text-[13.5px] italic leading-relaxed text-bone/90">“{handoff.text}”</p>
      </div>
    </motion.div>
  );
}

export function ChatBubbleBot({
  bot,
  time,
  children,
}: {
  bot: Bot;
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mr-auto max-w-[92%]">
      <div className="mb-1.5 flex items-center gap-2">
        <AvatarTile bot={bot} state="idle" size="xs" />
        <span className="font-mono text-[11.5px] text-bone-dim">
          {bot.name.toLowerCase().replace(/ /g, '-')} · {time}
        </span>
      </div>
      <div className="rounded-xl border border-hairline-dark px-4 py-3 text-[14px] leading-relaxed text-bone/90">
        {children}
      </div>
    </div>
  );
}

export function ChecklistCard({
  items,
  visibleCount,
}: {
  items: ChecklistItemType[];
  /** how many rows have "ticked in" so far */
  visibleCount: number;
}) {
  return (
    <div className="mt-3 space-y-1.5 rounded-lg border border-hairline-dark bg-carbon-3/60 p-3 font-mono text-[12.5px]">
      {items.slice(0, visibleCount).map((item, i) => (
        <motion.div
          key={item.text}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="flex items-center gap-2.5"
        >
          {item.icon === 'check' ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.12 }}
              className="text-phosphor"
            >
              <Check className="h-3.5 w-3.5" />
            </motion.span>
          ) : (
            <span className="text-amber">
              <Flag className="h-3.5 w-3.5" />
            </span>
          )}
          <span className={cn(item.amber ? 'text-amber' : 'text-bone-dim', 'relative')}>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="absolute inset-x-0 top-1/2 h-px origin-left bg-current opacity-60"
            />
            <span className="opacity-90">{item.text}</span>
          </span>
          <span className="sr-only">{`row ${i + 1}`}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------ structured cards ------------------------------ */

const ARTIFACT_ICON = { email: Mail, report: FileText, pr: GitPullRequest } as const;

/** Durable work product, previewed in the thread — a draft, a report, a PR. */
export function ArtifactCard({ artifact }: { artifact: ArtifactPreview }) {
  const Icon = ARTIFACT_ICON[artifact.kind];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="mt-3 overflow-hidden rounded-lg border border-hairline-dark border-l-2 border-l-phosphor bg-carbon-3/60"
    >
      <div className="flex items-center gap-2 border-b border-hairline-dark px-3.5 py-2">
        <Icon className="h-3.5 w-3.5 text-phosphor" />
        <span className="font-mono text-[12.5px] text-bone">{artifact.title}</span>
        <span className="ml-auto rounded-full border border-phosphor/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-phosphor">
          {artifact.held}
        </span>
      </div>
      <p className="truncate px-3.5 py-2.5 font-mono text-[12px] italic text-bone-dim">{artifact.preview}</p>
    </motion.div>
  );
}

/** The standing approval policy, rendered as one candid mono line. */
export function RulesLine({ rules }: { rules: string }) {
  const segments = rules.split(' · ');
  const dots = ['bg-phosphor', 'bg-amber', 'bg-ember'];
  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] text-bone-dim/80">
      {segments.map((seg, i) => (
        <span key={seg} className="inline-flex items-center gap-1.5">
          <span className={cn('h-1 w-1 rounded-full', dots[i % dots.length])} />
          {seg}
        </span>
      ))}
    </div>
  );
}

export function ApprovalCard({
  summary,
  detail,
  rules,
  resolved,
  onResolve,
}: {
  summary: string;
  detail: string;
  rules?: string;
  resolved: 'approved' | 'denied' | null;
  onResolve: (r: 'approved' | 'denied') => void;
}) {
  return (
    <div className="relative mt-3 overflow-hidden rounded-lg border border-hairline-dark border-l-2 border-l-amber bg-carbon-3/60 p-3.5">
      <p className="font-mono text-[12.5px] text-bone">{summary}</p>
      <p className="mt-1 font-mono text-[11.5px] text-bone-dim">{detail}</p>
      {!resolved ? (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onResolve('approved')}
            className="rounded-full border border-phosphor px-4 py-1 font-mono text-[12px] text-phosphor transition-colors hover:bg-phosphor/10"
          >
            Approve
          </button>
          <button
            onClick={() => onResolve('denied')}
            className="rounded-full border border-hairline-dark px-4 py-1 font-mono text-[12px] text-bone-dim transition-colors hover:border-bone-dim hover:text-bone"
          >
            Deny
          </button>
        </div>
      ) : (
        <motion.span
          initial={{ scale: 1.6, opacity: 0, rotate: -14 }}
          animate={{ scale: 1, opacity: 1, rotate: -6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 16 }}
          className={cn(
            'pointer-events-none absolute right-4 top-3 rounded border-2 px-3 py-1 font-mono text-[13px] font-semibold uppercase tracking-[0.18em]',
            resolved === 'approved' ? 'border-phosphor text-phosphor' : 'border-ember text-ember',
          )}
        >
          {resolved}
        </motion.span>
      )}
      {rules && <RulesLine rules={rules} />}
    </div>
  );
}
