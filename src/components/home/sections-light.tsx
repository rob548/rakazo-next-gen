import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal, SectionHeader } from '@/components/Reveal';
import { bots } from '@/data/bots';
import { modelMarquee as models, sandboxMarquee as sandboxes } from '@/data/changelog';

/* ------------------------------- S4 · marquee -------------------------------- */

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="group relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={`flex w-max items-center gap-8 whitespace-nowrap font-mono text-[14px] text-bone/70 group-hover:[animation-play-state:paused] ${
          reverse ? 'animate-marquee-rev' : 'animate-marquee'
        }`}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            {item} <span className="text-ember/60">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function BringYourOwn() {
  return (
    <section data-nav-dark className="border-t border-hairline-dark bg-carbon py-14">
      <Reveal>
        <p className="text-center font-mono text-[12px] uppercase tracking-[0.14em] text-bone-dim">
          your keys · your model · your sandbox
        </p>
      </Reveal>
      <Reveal delay={0.1} className="mt-6">
        <MarqueeRow items={models} />
        <MarqueeRow items={sandboxes} reverse />
      </Reveal>
    </section>
  );
}

/* ------------------------------ S5 · how it works ----------------------------- */

const steps = [
  {
    n: '1.',
    title: 'Give it a job',
    copy: 'Start from a template. The bot interviews you about how you work, then writes its own routine.',
    foot: 'routines/morning-sweep.md',
  },
  {
    n: '2.',
    title: 'Hand over the keys',
    copy: 'Sign in to the tools it needs. Credentials live on your machine — never on our servers.',
    foot: '~/.rakazo/vault',
  },
  {
    n: '3.',
    title: 'Stay in the loop',
    copy: 'It works in its own sandboxed computer and asks before anything irreversible. Every action lands in an audit log.',
    foot: 'audit.log — 1,204 entries',
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="bg-paper py-24 md:py-36">
      <div ref={ref} className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeader
          kicker="// HOW IT WORKS"
          title={
            <>
              Hire like a manager, <em className="font-normal text-ember">not a sysadmin.</em>
            </>
          }
        />
        <motion.div style={{ scaleX: lineScale }} className="mt-8 h-px origin-left bg-hairline" />
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={0.12 * i} y={48}>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '60%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-display text-[56px] font-medium leading-none text-ember"
                >
                  {s.n}
                </motion.span>
              </div>
              <h3 className="mt-5 font-sans text-[21px] font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-2.5 text-[15.5px] leading-[1.6] text-ink-soft">{s.copy}</p>
              <p className="mt-4 font-mono text-[12px] text-ink-faint">{s.foot}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- S5b · five objects explainer ------------------------ */

const objects = [
  {
    n: '01',
    name: 'Bots',
    line: 'named teammates with a job, a memory, and a face. not sessions — staff.',
    foot: 'roster, not chat list',
  },
  {
    n: '02',
    name: 'Chats',
    line: 'where you talk to them. persistent, per bot, picked up where you left off.',
    foot: 'a thread per relationship',
  },
  {
    n: '03',
    name: 'Prompts',
    line: 'one-off instructions. "pull the Q3 numbers" needs no ceremony.',
    foot: 'say it once, it happens once',
  },
  {
    n: '04',
    name: 'Tools',
    line: 'the accounts you sign them into. scoped tokens, vault-held, revocable.',
    foot: 'their logins, not yours',
  },
  {
    n: '05',
    name: 'Artifacts',
    line: 'the durable work they produce — drafts, reports, PRs. files you keep.',
    foot: 'work product, not chat scrollback',
  },
];

export function FiveObjects() {
  return (
    <section className="border-t border-hairline bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeader
          kicker="// MENTAL MODEL"
          title={
            <>
              Five objects, <em className="font-normal text-ember">not fifty concepts.</em>
            </>
          }
          sub="Everything in Rakazo is one of these. If you can count to five, you understand the whole system."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
          {objects.map((o, i) => (
            <Reveal key={o.n} delay={0.08 * i} y={24} className="h-full">
              <div className="group flex h-full flex-col bg-paper p-6 transition-colors hover:bg-paper-deep">
                <span className="font-mono text-[12px] text-ink-faint transition-colors group-hover:text-ember">
                  {o.n}
                </span>
                <h3 className="mt-4 font-sans text-[20px] font-semibold tracking-[-0.01em] text-ink">
                  {o.name}
                </h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.6] text-ink-soft">{o.line}</p>
                <p className="mt-5 border-t border-hairline pt-3 font-mono text-[11.5px] text-ink-faint">
                  {o.foot}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- S6 · security / arch ----------------------------- */

export function Security() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 70%'] });
  const dash = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  const bullets = [
    'credentials never leave the vault',
    'every action logged, append-only',
    'approvals required for irreversible steps',
  ];

  return (
    <section className="bg-paper-deep py-24 md:py-36">
      <div ref={ref} className="mx-auto grid max-w-site items-center gap-14 px-6 md:px-10 lg:grid-cols-[5fr_7fr]">
        <div>
          <SectionHeader
            kicker="// SECURITY"
            title={
              <>
                Your machine. Your keys. <em className="font-normal text-ember">Your rules.</em>
              </>
            }
            sub="Run Rakazo on your own hardware. Bots work inside sandboxed containers with only the access you grant. Approvals hold, and the audit log can't be edited by the bot."
          />
          <ul className="mt-8 space-y-3">
            {bullets.map((b, i) => (
              <Reveal key={b} delay={0.1 * i} y={16}>
                <li className="flex items-baseline gap-3 font-mono text-[13.5px] text-ink">
                  <span className="text-ember">▸</span>
                  {b}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={0.15}>
          <motion.figure
            initial={{ rotate: 1.5 }}
            whileInView={{ rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[10px] border border-hairline bg-paper p-3"
          >
            {/* blueprint corner ticks */}
            <span className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-ink" />
            <span className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-ink" />
            <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-ink" />
            <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-ink" />
            <motion.img
              src="/arch-diagram.svg"
              alt="Architecture diagram: your machine, sandboxed containers, model providers"
              className="w-full"
              style={{ opacity: dash }}
            />
            <figcaption className="mt-2 text-center font-mono text-[11.5px] text-ink-faint">
              fig. 01 — trust boundaries
            </figcaption>
          </motion.figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ S7 · templates -------------------------------- */

export function Templates() {
  return (
    <section className="bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            kicker="// BOT TEMPLATES"
            title={
              <>
                Give each bot <em className="font-normal text-ember">a job.</em>
              </>
            }
            sub="Eight starting points. Each one interviews you, writes its own routine, and gets to work."
          />
          <Reveal delay={0.2}>
            <Link
              to="/bots"
              className="font-mono text-[13px] text-ember underline-offset-4 hover:underline"
            >
              browse all 8 templates →
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bots.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/bots"
                className="group flex h-full flex-col rounded-[10px] border border-hairline bg-paper p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hard"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-hairline bg-paper-deep" style={{ boxShadow: `0 4px 14px -4px ${b.color}66` }}>
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
                <div className="mt-4 flex items-center justify-between">
                  <span className="truncate font-mono text-[11px] text-ink-faint">
                    tools: {b.tools.slice(0, 3).join(' · ')}
                  </span>
                  <ArrowRight className="h-4 w-4 -translate-x-2 text-ember opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
