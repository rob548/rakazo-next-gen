import { motion } from 'framer-motion';
import { WindowDots } from '@/components/demo/Terminal';
import CodePanel from '@/components/docs/CodePanel';
import Callout from '@/components/docs/Callout';
import { Reveal } from '@/components/Reveal';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function StepShell({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-hairline pt-12 mt-16">
      <Reveal y={24}>
        <p className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-ember">
          {label}
        </p>
        <h3 className="mt-3 font-sans text-[22px] font-semibold tracking-[-0.01em] text-ink">
          {title}
        </h3>
      </Reveal>
      <div className="mt-5 space-y-6">{children}</div>
    </section>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <Reveal y={24}>
      <p className="text-[16px] leading-[1.65] text-ink-soft">{children}</p>
    </Reveal>
  );
}

/* ------------------------- step 3 · interview mock ------------------------- */

const interviewRows = [
  { from: 'bot', text: 'which senders are always important?' },
  { from: 'you', text: 'my team, investors, and anything with “invoice”.' },
  { from: 'bot', text: 'when should i run the morning sweep?' },
  { from: 'you', text: 'weekdays, before 8am.' },
  { from: 'bot', text: 'what should i never touch?' },
  { from: 'you', text: 'the “legal” folder. read-only.' },
];

function InterviewMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="overflow-hidden rounded-[14px] border border-hairline-dark bg-carbon-3"
    >
      <div className="flex items-center gap-3 border-b border-hairline-dark px-4 py-3">
        <WindowDots />
        <span className="font-mono text-[12px] text-bone-dim">interview — inbox-manager</span>
      </div>
      <div className="space-y-3 p-5 font-mono text-[13px] leading-[1.6]">
        {interviewRows.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
            className={r.from === 'you' ? 'pl-6' : ''}
          >
            <span className={r.from === 'bot' ? 'mr-2 text-ember' : 'mr-2 text-phosphor'}>
              {r.from === 'bot' ? 'bot ▸' : 'you ›'}
            </span>
            <span className={r.from === 'bot' ? 'text-bone' : 'text-bone-dim'}>{r.text}</span>
          </motion.div>
        ))}
        <p className="pt-1 text-[12px] text-bone-dim/60">+ 3 more questions … (~3 min total)</p>
      </div>
    </motion.div>
  );
}

/* ------------------------------ the guide body ----------------------------- */

export default function Quickstart() {
  return (
    <>
      {/* S2 · quickstart header */}
      <header id="quickstart" className="scroll-mt-28 pb-4 pt-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] text-ember"
        >
          // QUICKSTART · ~10 MIN
        </motion.p>
        <h1 className="mt-4 font-display text-[clamp(34px,5vw,48px)] font-medium leading-[1.08] tracking-[-0.015em] text-ink">
          {'From zero to a working bot.'.split(' ').map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease: EASE }}
              >
                {w}
                {'\u00A0'}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5, ease: EASE }}
          className="mt-5 text-[16.5px] leading-[1.65] text-ink-soft"
        >
          Five steps. By the end you'll have a bot with its own computer, a routine it wrote itself,
          and an audit log of everything it did. No account, no cloud — just your machine.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-6 flex flex-wrap items-center gap-4"
        >
          <p className="font-mono text-[12.5px] text-ink-faint">docker 24+ · a model key · 4gb ram</p>
          <span className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
            10 min read
          </span>
        </motion.div>
      </header>

      {/* S3 · steps 01–05 */}
      <StepShell id="step-01" label="STEP 01 — INSTALL" title="Install & init">
        <Paragraph>
          One command. The CLI checks Docker, pulls the sandbox image, and asks where bots should
          keep their memory. Everything it creates is a plain folder on your disk.
        </Paragraph>
        <CodePanel
          title="~/ — terminal"
          copyText="npx rakazo init"
          lines={[
            { text: 'npx rakazo init', kind: 'prompt' },
            { text: '▸ checking docker… ok', kind: 'out' },
            { text: '▸ pulling sandbox image… ok', kind: 'out' },
            { text: '▸ memory directory: ~/rakazo', kind: 'out' },
            { text: '✓ rakazo is installed', kind: 'success' },
          ]}
        />
        <Callout label="TIP" tone="tip">
          no docker? <code className="font-mono text-[13.5px] text-ink">brew install colima && colima start</code>{' '}
          — colima is a drop-in runtime the CLI detects automatically.
        </Callout>
      </StepShell>

      <StepShell id="step-02" label="STEP 02 — KEYS" title="Add a model key">
        <Paragraph>
          Bring a key from Claude, GPT, Grok, or OpenRouter — or point at a local model through
          Ollama. Rakazo never sees your keys; they go straight to an encrypted vault on this
          machine.
        </Paragraph>
        <CodePanel
          title="~/ — terminal"
          copyText="rakazo keys add claude"
          lines={[
            { text: 'rakazo keys add claude', kind: 'prompt' },
            { text: '▸ paste key: ••••••••••••••••', kind: 'out' },
            { text: '✓ stored in ~/.rakazo/vault (encrypted)', kind: 'success' },
          ]}
        />
        <Callout label="NOTE" tone="note">
          keys live in <code className="font-mono text-[13.5px] text-ink">~/.rakazo/vault</code>,
          encrypted at rest. <code className="font-mono text-[13.5px] text-ink">rakazo keys list</code>{' '}
          shows fingerprints, never values.
        </Callout>
      </StepShell>

      <StepShell id="step-03" label="STEP 03 — FIRST BOT" title="Hire your first bot">
        <Paragraph>
          Pick a template and hire it. The bot interviews you — six questions, about three minutes —
          then writes its own routine and opens its computer. You're not configuring software;
          you're onboarding a hire.
        </Paragraph>
        <CodePanel
          title="~/ — terminal"
          copyText="rakazo bots hire inbox-manager"
          lines={[
            { text: 'rakazo bots hire inbox-manager', kind: 'prompt' },
            { text: '▸ interview: 6 questions (~3 min)', kind: 'out' },
            { text: '▸ wrote routines/morning-sweep.md', kind: 'out' },
            { text: '✓ inbox-manager is online', kind: 'success' },
          ]}
        />
        <InterviewMock />
      </StepShell>

      <StepShell id="step-04" label="STEP 04 — ROUTINES" title="Read the routine it wrote">
        <Paragraph>
          The interview becomes a Markdown file with cron frontmatter. Edit this file and the bot's
          next run changes. That's the whole mechanism — no dashboard, no drag-and-drop builder.
        </Paragraph>
        <CodePanel
          title="~/rakazo/routines/morning-sweep.md"
          lines={[
            { text: '# morning-sweep', kind: 'key' },
            { text: 'schedule: weekdays 07:00', kind: 'warn' },
            { text: '', kind: 'out' },
            { text: '- archive newsletters older than 3 days', kind: 'out' },
            { text: '- draft replies to anything from vip senders', kind: 'out' },
            { text: '- flag receipts for the expense bot', kind: 'out' },
            { text: '- post a 3-line summary to #general', kind: 'out' },
          ]}
        />
      </StepShell>

      <StepShell id="step-05" label="STEP 05 — APPROVALS" title="Set your approvals">
        <Paragraph>
          Approvals decide what a bot can do alone. <code className="font-mono text-[14px] text-ink">ask</code>{' '}
          pauses for your sign-off, <code className="font-mono text-[14px] text-ink">auto</code> lets
          it run, <code className="font-mono text-[14px] text-ink">never</code> is a hard wall. Every
          decision lands in an append-only audit log the bot can't edit.
        </Paragraph>
        <CodePanel
          title="~/rakazo/rakazo.yaml"
          lines={[
            { text: 'approvals:', kind: 'key' },
            { text: '  send_email: ask      # drafts it, you send it', kind: 'out' },
            { text: '  spend_money: never   # not even a request', kind: 'out' },
            { text: '  delete_files: ask', kind: 'out' },
            { text: 'audit_log: append-only', kind: 'key' },
          ]}
        />
        <Reveal y={24}>
          <p className="font-mono text-[13px] text-ink-faint">
            deeper mental model:{' '}
            <a href="#nav-concepts" className="text-ember underline-offset-4 hover:underline">
              concepts → approvals
            </a>
          </p>
        </Reveal>
      </StepShell>
    </>
  );
}
