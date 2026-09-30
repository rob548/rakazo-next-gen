import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
import { WindowDots } from '@/components/demo/Terminal';
import { toast } from '@/components/demo/Toast';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const SNIPPET = `Set up Rakazo on this machine: install the CLI,
add my model key, and hire an inbox-manager bot.
Docs: rakazo.com/docs`;

/** S4 · "set up with your agent" — the quietest best idea, kept. */
export default function AgentSnippet() {
  const [flash, setFlash] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(SNIPPET).catch(() => {});
    toast('copied — paste it into your agent');
    setFlash(true);
    window.setTimeout(() => setFlash(false), 600);
  };

  return (
    <section className="mt-16 rounded-[14px] border border-hairline bg-paper-deep px-6 py-16 md:px-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <h3 className="font-display text-[clamp(24px,3vw,30px)] font-medium leading-[1.15] tracking-[-0.01em] text-ink">
          Or let your agent <em className="font-normal text-ember">read the docs</em> for you.
        </h3>
        <p className="mt-3 max-w-[520px] text-[15.5px] leading-[1.6] text-ink-soft">
          Paste this into Claude Code, Cursor, or any coding agent — it installs and configures
          Rakazo for you.
        </p>
        <div className="mt-7 overflow-hidden rounded-[12px] border border-hairline-dark bg-carbon-3">
          <div className="flex items-center justify-between border-b border-hairline-dark px-4 py-3">
            <div className="flex items-center gap-3">
              <WindowDots />
              <span className="font-mono text-[12px] text-bone-dim">prompt — your agent</span>
            </div>
          </div>
          <div className="flex items-start justify-between gap-4 p-5">
            <pre className="flex-1 whitespace-pre-wrap font-mono text-[13.5px] leading-[1.7] text-bone">
              <span className="mr-2 select-none text-phosphor">$</span>
              {SNIPPET}
            </pre>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <motion.button
            onClick={copy}
            whileTap={{ scale: 0.97 }}
            className={`inline-flex items-center gap-2 rounded-full border border-ember px-6 py-3 font-sans text-[14.5px] font-semibold transition-colors duration-250 ${
              flash ? 'bg-ember-bright text-carbon' : 'bg-ember text-carbon hover:bg-ember-bright'
            }`}
          >
            <Copy className="h-4 w-4" /> {flash ? 'copied' : 'Copy the prompt'}
          </motion.button>
          <p className="font-mono text-[12px] text-ink-faint">
            {'// the original homepage’s quietest best idea — kept.'}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
