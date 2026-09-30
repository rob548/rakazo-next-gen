import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
import { WindowDots } from '@/components/demo/Terminal';
import { toast } from '@/components/demo/Toast';
import { cn } from '@/lib/utils';

export interface CodeLine {
  text: string;
  kind?: 'prompt' | 'out' | 'success' | 'warn' | 'comment' | 'key' | 'value';
}

const lineColor: Record<NonNullable<CodeLine['kind']>, string> = {
  prompt: 'text-bone',
  out: 'text-bone-dim',
  success: 'text-phosphor',
  warn: 'text-amber',
  comment: 'text-bone-dim/70',
  key: 'text-sky-dim',
  value: 'text-bone',
};

interface CodePanelProps {
  title: string;
  lines: CodeLine[];
  copyText?: string;
  className?: string;
}

/**
 * Docs code panel: dark carbon-3 window, all content visible immediately
 * (docs = reference, no typing). Slides up 32px + fades at ~85% viewport;
 * copy button flashes ember and fires a toast.
 */
export default function CodePanel({ title, lines, copyText, className }: CodePanelProps) {
  const [flash, setFlash] = useState(false);

  const copy = () => {
    const text = copyText ?? lines.map((l) => l.text).join('\n');
    navigator.clipboard?.writeText(text).catch(() => {});
    toast('copied — paste it in your terminal');
    setFlash(true);
    window.setTimeout(() => setFlash(false), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('overflow-hidden rounded-[14px] border border-hairline-dark bg-carbon-3', className)}
    >
      <div className="flex items-center justify-between border-b border-hairline-dark px-4 py-3">
        <div className="flex items-center gap-3">
          <WindowDots />
          <span className="font-mono text-[12px] text-bone-dim">{title}</span>
        </div>
        <button
          onClick={copy}
          aria-label={`copy ${title}`}
          className={cn(
            'rounded-md p-1.5 transition-colors duration-300',
            flash ? 'bg-ember text-carbon' : 'text-bone-dim hover:bg-carbon-2 hover:text-bone',
          )}
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="p-5 font-mono text-[13.5px] leading-[1.7]">
        {lines.map((line, li) => {
          const kind = line.kind ?? 'prompt';
          return (
            <div key={li} className={cn('whitespace-pre-wrap', lineColor[kind])}>
              {kind === 'prompt' && <span className="mr-2 text-phosphor">$</span>}
              {line.text}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
