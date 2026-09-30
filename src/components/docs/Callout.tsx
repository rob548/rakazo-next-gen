import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Docs callout: TIP (amber) / NOTE (ember). The left border draws
 * scaleY 0→1 over 0.4s when the callout enters the viewport.
 */
export default function Callout({
  label,
  tone,
  children,
  className,
}: {
  label: string;
  tone: 'tip' | 'note';
  children: ReactNode;
  className?: string;
}) {
  const color = tone === 'tip' ? 'bg-amber' : 'bg-ember';
  const labelColor = tone === 'tip' ? 'text-[#8A6414]' : 'text-ember';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative py-1 pl-5', className)}
    >
      <motion.span
        aria-hidden
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn('absolute inset-y-0 left-0 w-[2px] origin-top', color)}
      />
      <p className={cn('font-mono text-[11px] font-semibold uppercase tracking-[0.14em]', labelColor)}>
        {label}
      </p>
      <div className="mt-1.5 text-[15px] leading-[1.65] text-ink-soft">{children}</div>
    </motion.div>
  );
}
