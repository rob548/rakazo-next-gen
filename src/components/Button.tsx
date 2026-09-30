import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type Variant = 'primary-light' | 'primary-dark' | 'ghost-light' | 'ghost-dark';

const styles: Record<Variant, string> = {
  // ink fill on light backgrounds
  'primary-light':
    'bg-ink text-paper hover:bg-ember border border-ink hover:border-ember',
  // ember fill on dark backgrounds
  'primary-dark':
    'bg-ember text-carbon hover:bg-ember-bright hover:shadow-hard-bone border border-ember',
  'ghost-light':
    'bg-transparent text-ink border border-hairline hover:border-ink hover:bg-ink/[0.04]',
  'ghost-dark':
    'bg-transparent text-bone border border-hairline-dark hover:border-bone hover:bg-bone/[0.04]',
};

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = 'primary-light', className, children, ...rest }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.3, 0, 0.2, 1] }}
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-[14.5px] font-semibold tracking-[0.01em] transition-colors duration-250 ease-snap',
        styles[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
