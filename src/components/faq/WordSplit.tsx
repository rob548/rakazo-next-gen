import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export interface SplitWord {
  text: string;
  italic?: boolean;
  ember?: boolean;
}

/**
 * Word-level headline reveal: y 110% → 0 inside an overflow clip,
 * 0.06s stagger. Matches the global motion spec without GSAP.
 */
export default function WordSplit({
  words,
  className,
  wordClassName,
  delay = 0,
  inView = false,
}: {
  words: SplitWord[];
  className?: string;
  wordClassName?: string;
  delay?: number;
  /** use whileInView trigger instead of mount animation */
  inView?: boolean;
}) {
  return (
    <span className={cn('inline', className)}>
      {words.map((w, i) => (
        <span
          key={`${w.text}-${i}`}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className={cn(
              'inline-block',
              w.italic && 'font-normal italic',
              w.ember && 'text-ember',
              wordClassName,
            )}
            initial={{ y: '110%' }}
            {...(inView
              ? { whileInView: { y: '0%' }, viewport: { once: true, amount: 0.7 } }
              : { animate: { y: '0%' } })}
            transition={{ duration: 0.85, delay: delay + i * 0.06, ease: EASE }}
          >
            {w.text}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
