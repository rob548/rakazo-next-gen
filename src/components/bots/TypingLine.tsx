import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const PHRASES = ['> what should this bot never do?', '> when should it escalate?'];

/**
 * Decorative mono typing loop: types a phrase, holds, deletes, types the next.
 * Pauses offscreen; renders statically under prefers-reduced-motion.
 */
export default function TypingLine({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [text, setText] = useState('');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setText(PHRASES[0]);
      return;
    }
    if (!inView) return;

    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const current = PHRASES[phrase];
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char >= current.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1600);
          return;
        }
        timer = window.setTimeout(tick, 42);
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char <= 0) {
          deleting = false;
          phrase = (phrase + 1) % PHRASES.length;
          timer = window.setTimeout(tick, 500);
          return;
        }
        timer = window.setTimeout(tick, 18);
      }
    };
    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [inView]);

  return (
    <span ref={ref} className={className} aria-hidden>
      <span className="block-cursor">{text || ' '}</span>
    </span>
  );
}
