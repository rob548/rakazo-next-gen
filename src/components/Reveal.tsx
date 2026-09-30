import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/** Standard scroll reveal: slide up + fade, triggered at ~80% viewport. */
export function Reveal({ children, delay = 0, y = 40, className, once = true }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2, margin: '0px 0px -18% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Section header pattern: mono kicker → Fraunces H2 → subcopy. */
export function SectionHeader({
  kicker,
  title,
  sub,
  dark = false,
  center = false,
  className,
}: {
  kicker: string;
  title: ReactNode;
  sub?: ReactNode;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && 'text-center', className)}>
      <Reveal>
        <p
          className={cn(
            'font-mono text-[12.5px] font-medium uppercase tracking-[0.14em]',
            dark ? 'text-phosphor' : 'text-ember',
          )}
        >
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            'mt-4 font-display text-[clamp(30px,4.5vw,52px)] font-medium leading-[1.08] tracking-[-0.015em]',
            dark ? 'text-bone' : 'text-ink',
          )}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              'mt-4 max-w-[560px] text-[17px] leading-[1.6]',
              dark ? 'text-bone-dim' : 'text-ink-soft',
              center && 'mx-auto',
            )}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
