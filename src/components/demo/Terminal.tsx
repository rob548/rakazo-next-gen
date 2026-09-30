import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Copy } from 'lucide-react';
import { toast } from '@/components/demo/Toast';
import { cn } from '@/lib/utils';

export interface TermLine {
  text: string;
  kind?: 'prompt' | 'out' | 'success' | 'warn';
  /** ms delay before this line starts printing */
  delay?: number;
}

function TrafficDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-ember" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber" />
      <span className="h-2.5 w-2.5 rounded-full bg-phosphor" />
    </div>
  );
}

export function WindowDots() {
  return <TrafficDots />;
}

interface TerminalProps {
  lines: TermLine[];
  title?: string;
  copyText?: string;
  loop?: boolean;
  className?: string;
  /** ms per character for prompt lines */
  typeSpeed?: number;
}

/**
 * Terminal window: carbon-3 body, mono text, prompts in phosphor,
 * output in bone-dim, highlights in amber. Types sequentially when
 * 60% visible. Copy button copies the full command block.
 */
export default function Terminal({
  lines,
  title = '~/rakazo',
  copyText,
  loop = false,
  className,
  typeSpeed = 34,
}: TerminalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: !loop });
  const [display, setDisplay] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(lines.map((l) => l.text));
      setDone(true);
      return;
    }

    const run = () => {
      setDisplay([]);
      setDone(false);
      let total = 200;
      lines.forEach((line, li) => {
        total += line.delay ?? (line.kind === 'prompt' || !line.kind ? 0 : 150);
        const startAt = total;
        const chars = line.text.length;
        const speed = line.kind === 'out' || line.kind === 'success' || line.kind === 'warn' ? 8 : typeSpeed;
        for (let c = 0; c <= chars; c++) {
          timers.current.push(
            window.setTimeout(() => {
              setDisplay((prev) => {
                const next = [...prev];
                next[li] = line.text.slice(0, c);
                return next;
              });
            }, startAt + c * speed),
          );
        }
        total = startAt + chars * speed + 120;
      });
      timers.current.push(
        window.setTimeout(() => {
          setDone(true);
          if (loop) timers.current.push(window.setTimeout(run, 3800));
        }, total + 300),
      );
    };
    run();
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, loop]);

  const copy = () => {
    const text = copyText ?? lines.map((l) => l.text).join('\n');
    navigator.clipboard?.writeText(text).catch(() => {});
    toast('copied — paste it in your terminal');
  };

  const colorFor = (kind?: TermLine['kind']) =>
    kind === 'success'
      ? 'text-phosphor'
      : kind === 'warn'
        ? 'text-amber'
        : kind === 'out'
          ? 'text-bone-dim'
          : 'text-bone';

  return (
    <div ref={ref} className={cn('overflow-hidden rounded-[14px] border border-hairline-dark bg-carbon-3', className)}>
      <div className="flex items-center justify-between border-b border-hairline-dark px-4 py-3">
        <div className="flex items-center gap-3">
          <TrafficDots />
          <span className="font-mono text-[12px] text-bone-dim">{title}</span>
        </div>
        <button
          onClick={copy}
          aria-label="copy terminal commands"
          className="rounded-md p-1.5 text-bone-dim transition-colors hover:bg-carbon-2 hover:text-bone"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="min-h-[210px] p-5 font-mono text-[13.5px] leading-[1.55]">
        {lines.map((line, li) => {
          const text = display[li];
          if (text === undefined) return <div key={li} className="h-[1.55em]" />;
          const isPrompt = !line.kind || line.kind === 'prompt';
          const isLast = li === lines.length - 1 && !done;
          return (
            <div key={li} className={cn('whitespace-pre-wrap', colorFor(line.kind))}>
              {isPrompt && <span className="mr-2 text-phosphor">$</span>}
              {text}
              {(isLast || (isPrompt && display[li + 1] === undefined && text.length === line.text.length)) &&
                !done && <span className="animate-cursor-blink text-phosphor">▌</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
