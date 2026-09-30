import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Globe, Monitor, MousePointer2, Plus, ScreenShare, SendHorizonal, TerminalSquare } from 'lucide-react';
import type { Bot } from '@/data/bots';
import { demoBots } from '@/data/bots';
import {
  ApprovalCard,
  ArtifactCard,
  AvatarTile,
  BotRosterItem,
  ChatBubbleBot,
  ChatBubbleUser,
  ChecklistCard,
  HandoffBubble,
  type RosterState,
} from '@/components/demo/ChatDemo';
import { toast } from '@/components/demo/Toast';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ---------------------------------- playback ---------------------------------- */

interface Playback {
  handoffVisible: boolean;
  userVisible: boolean;
  msg1: string;
  msg1Done: boolean;
  checklistCount: number;
  artifactVisible: boolean;
  approvalVisible: boolean;
  msg2: string;
  done: boolean;
}

const IDLE: Playback = {
  handoffVisible: false,
  userVisible: false,
  msg1: '',
  msg1Done: false,
  checklistCount: 0,
  artifactVisible: false,
  approvalVisible: false,
  msg2: '',
  done: false,
};

/** thread contract: optional user trigger first, then the main bot beat, then an optional follow-up */
function splitThread(bot: Bot) {
  const msgs = bot.thread;
  const userMsg = msgs[0]?.from === 'user' ? msgs[0] : undefined;
  const botMsg = msgs[userMsg ? 1 : 0];
  const followUp = msgs[userMsg ? 2 : 1];
  return { userMsg, botMsg, followUp };
}

function usePlayback(bot: Bot, playing: boolean, resetKey: number): Playback {
  const [state, setState] = useState<Playback>(IDLE);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setState(IDLE);
    if (!playing) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const { userMsg, botMsg, followUp } = splitThread(bot);
    if (!botMsg) return;

    if (reduced) {
      setState({
        handoffVisible: !!bot.handoff,
        userVisible: !!userMsg,
        msg1: botMsg.text,
        msg1Done: true,
        checklistCount: botMsg.checklist?.length ?? 0,
        artifactVisible: !!botMsg.artifact,
        approvalVisible: !!botMsg.approval,
        msg2: followUp?.text ?? '',
        done: true,
      });
      return;
    }

    const t = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms));
    };
    const type = (text: string, key: 'msg1' | 'msg2', start: number) => {
      for (let c = 1; c <= text.length; c++) {
        const txt = text.slice(0, c);
        t(() => setState((s) => ({ ...s, [key]: txt })), start + c * 32);
      }
      return start + text.length * 32;
    };

    let at = 400;
    if (bot.handoff) {
      t(() => setState((s) => ({ ...s, handoffVisible: true })), at);
      at += 1000;
    }
    if (userMsg) {
      t(() => setState((s) => ({ ...s, userVisible: true })), at);
      at += 600;
    }

    at = type(botMsg.text, 'msg1', at) + 120;
    t(() => setState((s) => ({ ...s, msg1Done: true })), at);
    at += 250;

    const rows = botMsg.checklist?.length ?? 0;
    for (let r = 1; r <= rows; r++) {
      t(() => setState((s) => ({ ...s, checklistCount: r })), at + r * 350);
    }
    at += rows * 350 + 200;

    if (botMsg.artifact) {
      t(() => setState((s) => ({ ...s, artifactVisible: true })), at);
      at += 500;
    }
    if (botMsg.approval) {
      t(() => setState((s) => ({ ...s, approvalVisible: true })), at);
      at += 400;
    }

    if (followUp) {
      at = type(followUp.text, 'msg2', at) + 200;
    }
    t(() => setState((s) => ({ ...s, done: true })), at);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bot.id, playing, resetKey]);

  return state;
}

/* ------------------------------- roster states -------------------------------- */

function rosterState(
  bot: Bot,
  activeId: string,
  playback: Playback,
  resolved: boolean,
): RosterState {
  if (bot.id === activeId) {
    if (playback.approvalVisible) return resolved ? 'done' : 'waiting';
    if (playback.done) return 'done';
    if (playback.handoffVisible || playback.userVisible || playback.msg1) return 'working';
    return 'idle';
  }
  if (bot.status === 'online') return 'working';
  if (bot.status === 'waiting') return 'waiting';
  return 'idle';
}

/* --------------------------------- right panel -------------------------------- */

function FakeBrowser({ bot, playing }: { bot: Bot; playing: boolean }) {
  const rows = [92, 68, 84, 45, 76, 58, 88, 40, 70];
  return (
    <div>
      <div className="flex items-center gap-2 rounded-t-lg border border-hairline-dark bg-carbon-3 px-3 py-2">
        <Globe className="h-3 w-3 text-bone-dim" />
        <span className="flex-1 truncate rounded bg-carbon px-2 py-1 font-mono text-[11px] text-bone-dim">
          {bot.url}
        </span>
      </div>
      <div className="relative h-[240px] overflow-hidden rounded-b-lg border border-t-0 border-hairline-dark bg-carbon p-3">
        {/* abstract inbox wireframe */}
        <div className="space-y-2.5">
          {rows.map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-[3px] border border-hairline-dark" />
              <span className="h-1.5 rounded-full bg-hairline-dark" style={{ width: `${w * 0.28}%` }} />
              <span className="h-1.5 flex-1 rounded-full bg-carbon-3" style={{ maxWidth: `${w}%` }} />
            </div>
          ))}
        </div>
        {/* ember sweep highlight */}
        {playing && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 animate-sweep-down bg-ember/10" />
        )}
        <div className="absolute bottom-3 right-3">
          <button
            onClick={() => toast('take control works in the real app — this is a demo')}
            className="rounded-full border border-phosphor px-4 py-1.5 font-mono text-[12px] text-phosphor transition-colors hover:bg-phosphor/10"
          >
            Take control
          </button>
        </div>
      </div>
    </div>
  );
}

function FakeTerminal({ bot }: { bot: Bot }) {
  const slug = bot.name.toLowerCase().replace(/ /g, '-');
  return (
    <div className="h-[288px] overflow-hidden rounded-lg border border-hairline-dark bg-carbon-3 p-3 font-mono text-[11.5px] leading-[1.7]">
      <p><span className="text-phosphor">$</span> <span className="text-bone">rakazo attach {slug}</span></p>
      <p className="text-bone-dim">▸ sandbox ready · debian-slim</p>
      <p className="text-bone-dim">▸ scoped tokens injected (vault)</p>
      <p className="text-bone-dim">▸ routine: {bot.routines[0]?.name.toLowerCase()} — scheduled</p>
      <p className="text-phosphor">✓ session live · audit logging on</p>
      <p className="text-bone-dim">$ tail -f audit.log <span className="animate-cursor-blink text-phosphor">▌</span></p>
    </div>
  );
}

function FakeDesktop() {
  return (
    <div className="relative h-[288px] overflow-hidden rounded-lg border border-hairline-dark bg-carbon p-3">
      <div className="dot-grid-dark absolute inset-0" />
      <div className="relative mt-4 space-y-3">
        <div className="h-20 w-3/4 rounded-lg border border-hairline-dark bg-carbon-2" />
        <div className="ml-auto h-14 w-1/2 rounded-lg border border-hairline-dark bg-carbon-2" />
        <div className="h-24 w-2/3 rounded-lg border border-hairline-dark bg-carbon-2" />
      </div>
      <p className="relative mt-4 text-center font-mono text-[11px] text-bone-dim">
        a real desktop. the bot's, not yours.
      </p>
    </div>
  );
}

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={cn(
        'relative h-5 w-9 rounded-full transition-colors duration-200',
        on ? 'bg-phosphor/90' : 'bg-carbon-3 border border-hairline-dark',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-4 w-4 rounded-full bg-carbon transition-transform duration-200',
          on ? 'translate-x-[18px]' : 'translate-x-0.5 bg-bone-dim',
        )}
      />
    </button>
  );
}

function RoutinesList({
  bot,
  states,
  onToggle,
}: {
  bot: Bot;
  states: Record<string, boolean>;
  onToggle: (rid: string) => void;
}) {
  return (
    <div className="mt-4">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-dim">routines</p>
      <div className="space-y-1">
        {bot.routines.map((r) => {
          const on = states[r.id] ?? r.on;
          return (
            <div
              key={r.id}
              className="flex items-center justify-between rounded-lg border border-hairline-dark px-3 py-2.5"
            >
              <div>
                <p className="text-[13px] font-medium text-bone">{r.name}</p>
                <p className="font-mono text-[11px] text-bone-dim">
                  {on ? `${r.schedule} · active` : 'paused'}
                </p>
              </div>
              <Toggle on={on} onClick={() => onToggle(r.id)} label={`toggle ${r.name}`} />
            </div>
          );
        })}
        <button
          onClick={() => toast('routines are markdown files in the real app — this is a demo')}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-hairline-dark px-3 py-2.5 font-mono text-[12px] text-bone-dim transition-colors hover:border-bone-dim hover:text-bone"
        >
          <Plus className="h-3.5 w-3.5" /> add routine
        </button>
      </div>
    </div>
  );
}

/* --------------------------------- chat panel --------------------------------- */

function ChatPanel({
  bot,
  playback,
  resolved,
  onResolve,
  onRestart,
}: {
  bot: Bot;
  playback: Playback;
  resolved: 'approved' | 'denied' | null;
  onResolve: (r: 'approved' | 'denied') => void;
  onRestart: () => void;
}) {
  const { userMsg, botMsg, followUp } = splitThread(bot);
  const [draft, setDraft] = useState('');
  const slug = bot.name.toLowerCase().replace(/ /g, '-');
  const state = playback.approvalVisible && !resolved ? 'waiting' : playback.done ? 'done' : playback.msg1 || playback.handoffVisible || playback.userVisible ? 'working' : 'idle';

  const send = () => {
    if (!draft.trim()) return;
    setDraft('');
    toast('demo mode — the bot is pretending');
  };

  return (
    <div className="flex h-full flex-col">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-hairline-dark px-4 py-3">
        <AvatarTile bot={bot} state={state} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold leading-tight text-bone">{bot.name}</p>
          <p className="truncate font-mono text-[11.5px] text-bone-dim">{bot.statusLine}</p>
        </div>
        {state === 'waiting' && (
          <span className="ml-auto rounded-full border border-amber/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-amber">
            needs you
          </span>
        )}
      </div>

      {/* thread */}
      <div className="min-h-[380px] flex-1 space-y-4 overflow-y-auto p-4">
        {playback.handoffVisible && bot.handoff && (
          <HandoffBubble handoff={bot.handoff} toName={bot.name} />
        )}
        {playback.userVisible && userMsg && <ChatBubbleUser text={userMsg.text} />}
        {playback.msg1 && botMsg && (
          <ChatBubbleBot bot={bot} time={botMsg.time}>
            <p>
              {playback.msg1}
              {!playback.msg1Done && <span className="animate-cursor-blink text-phosphor">▌</span>}
            </p>
            {botMsg.checklist && (
              <ChecklistCard items={botMsg.checklist} visibleCount={playback.checklistCount} />
            )}
            {botMsg.artifact && playback.artifactVisible && (
              <ArtifactCard artifact={botMsg.artifact} />
            )}
            {botMsg.approval && playback.approvalVisible && (
              <ApprovalCard
                summary={botMsg.approval.summary}
                detail={botMsg.approval.detail}
                rules={botMsg.approval.rules}
                resolved={resolved}
                onResolve={onResolve}
              />
            )}
          </ChatBubbleBot>
        )}
        {playback.msg2 && followUp && (
          <ChatBubbleBot bot={bot} time={followUp.time}>
            <p>{playback.msg2}</p>
          </ChatBubbleBot>
        )}
        {!playback.userVisible && !playback.handoffVisible && (
          <p className="pt-16 text-center font-mono text-[12px] text-bone-dim/60">
            // thread loads when the demo scrolls into view
          </p>
        )}
      </div>

      {/* composer */}
      <div className="border-t border-hairline-dark p-3">
        <div className="flex flex-wrap gap-1.5 pb-2.5">
          <button
            onClick={onRestart}
            className="rounded-full border border-hairline-dark px-3 py-1 font-mono text-[11.5px] text-bone-dim transition-colors hover:border-ember hover:text-ember"
          >
            replay
          </button>
          <button
            onClick={() => toast("drafts live in the app — this one's a demo")}
            className="rounded-full border border-hairline-dark px-3 py-1 font-mono text-[11.5px] text-bone-dim transition-colors hover:border-ember hover:text-ember"
          >
            show drafts
          </button>
          <button
            onClick={() => toast('routines are markdown files in the real app — this is a demo')}
            className="rounded-full border border-hairline-dark px-3 py-1 font-mono text-[11.5px] text-bone-dim transition-colors hover:border-ember hover:text-ember"
          >
            add routine
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-hairline-dark bg-carbon px-4 py-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder={`message ${slug}…`}
            aria-label={`message ${slug}`}
            className="flex-1 bg-transparent font-mono text-[12.5px] text-bone placeholder:text-bone-dim/60 focus:outline-none"
          />
          <button onClick={send} aria-label="send message" className="text-bone-dim transition-colors hover:text-ember">
            <SendHorizonal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- three levels of control --------------------------- */

const LEVELS = [
  {
    n: '01',
    name: 'status',
    line: 'watch from the roster',
    detail: 'a dot and a glow tell you the state of play',
    icon: null, // custom pulsing dot
  },
  {
    n: '02',
    name: 'preview',
    line: 'stream their screen',
    detail: 'every click, live — trust but verify',
    icon: ScreenShare,
  },
  {
    n: '03',
    name: 'takeover',
    line: 'take the wheel',
    detail: 'same machine, your hands, any time',
    icon: MousePointer2,
  },
] as const;

function ControlStrip({ playback }: { playback: Playback }) {
  // light up in sequence as the scripted demo plays
  const lit = playback.approvalVisible ? 3 : playback.checklistCount > 0 ? 2 : playback.handoffVisible || playback.userVisible ? 1 : 0;

  return (
    <div className="mt-6">
      <p className="mb-3 text-center font-mono text-[11.5px] text-bone-dim">
        watch a dot, watch the screen, or take the wheel.
      </p>
      <div className="grid gap-2.5 sm:grid-cols-3">
        {LEVELS.map((lvl, i) => {
          const on = lit > i;
          const Icon = lvl.icon;
          return (
            <div
              key={lvl.n}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-500',
                on ? 'border-ember/60 bg-ember/10' : 'border-hairline-dark bg-carbon-2/60 opacity-50',
              )}
            >
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                {i === 0 ? (
                  <>
                    {on && <span className="absolute h-3 w-3 animate-ping rounded-full bg-ember/60" />}
                    <span className={cn('h-2.5 w-2.5 rounded-full', on ? 'bg-ember' : 'bg-bone-dim')} />
                  </>
                ) : i === 1 ? (
                  <span className={cn('relative h-6 w-9 overflow-hidden rounded-[4px] border', on ? 'border-ember/70' : 'border-hairline-dark')}>
                    {on && <span className="absolute inset-x-0 top-0 h-2 animate-sweep-down bg-ember/40" />}
                  </span>
                ) : (
                  Icon && <Icon className={cn('h-4 w-4', on ? 'text-ember-bright' : 'text-bone-dim')} />
                )}
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[11px] uppercase tracking-[0.14em]">
                  <span className={on ? 'text-ember-bright' : 'text-bone-dim'}>{lvl.n}</span>{' '}
                  <span className="text-bone">{lvl.name}</span>
                </span>
                <span className="block truncate font-mono text-[11px] text-bone-dim">
                  {on ? lvl.detail : lvl.line}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------- section ---------------------------------- */

type ComputerTab = 'browser' | 'terminal' | 'desktop';
type MobileTab = 'bots' | 'chat' | 'computer' | 'routines';

export default function LiveDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(windowRef, { amount: 0.35 });

  const [activeId, setActiveId] = useState('inbox-manager');
  const [resetKey, setResetKey] = useState(0);
  const [computerTab, setComputerTab] = useState<ComputerTab>('browser');
  const [mobileTab, setMobileTab] = useState<MobileTab>('chat');
  const [routineStates, setRoutineStates] = useState<Record<string, boolean>>({});
  const [approvalResolved, setApprovalResolved] = useState<Record<string, 'approved' | 'denied'>>({});

  const bot = demoBots.find((b) => b.id === activeId) ?? demoBots[0];
  const playback = usePlayback(bot, inView, resetKey);

  // scrub-driven entrance: scale 0.94→1 + clip reveal over first part of scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 45%'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(6% 3% 6% 3% round 14px)', 'inset(0% 0% 0% 0% round 14px)'],
  );

  const selectBot = (id: string) => {
    setActiveId(id);
    setMobileTab('chat');
  };

  const toggleRoutine = (rid: string) => {
    setRoutineStates((s) => ({ ...s, [rid]: !(s[rid] ?? bot.routines.find((r) => r.id === rid)?.on ?? false) }));
  };

  const rosterEl = (
    <div className="flex h-full flex-col">
      <p className="px-3 pb-2 pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-dim">
        bots ⌄
      </p>
      <div className="flex-1 space-y-0.5 overflow-y-auto px-1.5">
        {demoBots.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.06 * i, duration: 0.35, ease: EASE }}
          >
            <BotRosterItem
              bot={b}
              active={b.id === activeId}
              state={rosterState(b, activeId, playback, !!approvalResolved[bot.id])}
              onClick={() => selectBot(b.id)}
            />
          </motion.div>
        ))}
      </div>
      <div className="p-3">
        <button
          onClick={() => toast('interview mode lives in the app — this is a demo')}
          className="w-full rounded-lg border border-dashed border-hairline-dark px-3 py-2.5 font-mono text-[12px] text-bone-dim transition-colors hover:border-bone-dim hover:text-bone"
        >
          + new bot
        </button>
      </div>
    </div>
  );

  const chatEl = (
    <AnimatePresence mode="wait">
      <motion.div
        key={bot.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="h-full"
      >
        <ChatPanel
          bot={bot}
          playback={playback}
          resolved={approvalResolved[bot.id] ?? null}
          onResolve={(r) => setApprovalResolved((s) => ({ ...s, [bot.id]: r }))}
          onRestart={() => setResetKey((k) => k + 1)}
        />
      </motion.div>
    </AnimatePresence>
  );

  const computerEl = (
    <AnimatePresence mode="wait">
      <motion.div
        key={bot.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-dim">
          {bot.name}'s computer
        </p>
        <div className="mb-3 flex gap-1 rounded-lg border border-hairline-dark bg-carbon p-1">
          {(
            [
              ['browser', Globe],
              ['terminal', TerminalSquare],
              ['desktop', Monitor],
            ] as const
          ).map(([tab, Icon]) => (
            <button
              key={tab}
              onClick={() => setComputerTab(tab)}
              aria-label={`${tab} tab`}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 font-mono text-[11px] capitalize transition-colors',
                computerTab === tab ? 'bg-carbon-3 text-bone' : 'text-bone-dim hover:text-bone',
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab}
            </button>
          ))}
        </div>
        {computerTab === 'browser' && <FakeBrowser bot={bot} playing={inView && playback.checklistCount > 0} />}
        {computerTab === 'terminal' && <FakeTerminal bot={bot} />}
        {computerTab === 'desktop' && <FakeDesktop />}
      </motion.div>
    </AnimatePresence>
  );

  const routinesEl = <RoutinesList bot={bot} states={routineStates} onToggle={toggleRoutine} />;

  return (
    <section ref={sectionRef} data-nav-dark className="relative bg-carbon py-28">
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-site px-6 md:px-10">
        {/* header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] text-phosphor">
              {'// live demo'}
            </p>
            <h2 className="mt-4 font-display text-[clamp(30px,4.5vw,52px)] font-medium leading-[1.08] tracking-[-0.015em] text-bone">
              Pick a bot. <em className="font-normal">Watch it work.</em>
            </h2>
          </div>
          <p className="max-w-[280px] font-mono text-[12px] leading-relaxed text-bone-dim">
            a chief of staff hands off. specialists execute. you approve what matters.
          </p>
        </div>

        {/* app window */}
        <motion.div
          ref={windowRef}
          style={{ scale, clipPath }}
          className="overflow-hidden rounded-[14px] border border-hairline-dark bg-carbon-2 shadow-[inset_0_1px_0_rgba(237,230,214,0.05)]"
        >
          {/* title bar */}
          <div className="flex items-center gap-3 border-b border-hairline-dark px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-ember" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber" />
              <span className="h-2.5 w-2.5 rounded-full bg-phosphor" />
            </div>
            <span className="font-mono text-[12px] text-bone-dim">rakazo — workspace</span>
            <span className="ml-auto hidden font-mono text-[11px] text-bone-dim/60 sm:inline">
              demo build · no real data
            </span>
          </div>

          {/* desktop: 3 columns */}
          <div className="hidden min-h-[560px] lg:grid lg:grid-cols-[240px_1fr_320px]">
            <aside className="border-r border-hairline-dark">{rosterEl}</aside>
            <div className="min-w-0">{chatEl}</div>
            <aside className="border-l border-hairline-dark p-4">
              {computerEl}
              {routinesEl}
            </aside>
          </div>

          {/* mobile: tabbed view */}
          <div className="lg:hidden">
            <div className="flex border-b border-hairline-dark">
              {(['bots', 'chat', 'computer', 'routines'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setMobileTab(t)}
                  className={cn(
                    'flex-1 border-b-2 px-2 py-3 font-mono text-[11.5px] capitalize transition-colors',
                    mobileTab === t ? 'border-ember text-bone' : 'border-transparent text-bone-dim',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileTab + bot.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {mobileTab === 'bots' && rosterEl}
                {mobileTab === 'chat' && <div className="min-h-[480px]">{chatEl}</div>}
                {mobileTab === 'computer' && <div className="p-4">{computerEl}</div>}
                {mobileTab === 'routines' && <div className="p-4 pb-6">{routinesEl}</div>}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* three levels of control */}
        <ControlStrip playback={playback} />
      </div>
    </section>
  );
}
