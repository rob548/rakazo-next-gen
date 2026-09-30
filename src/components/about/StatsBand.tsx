import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { Reveal, SectionHeader } from '@/components/Reveal';

/**
 * S5 · Stats band — dark command-center surface, count-up numbers.
 * Carbon stays dark in both themes; nav inverts over it via data-nav-dark.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function CountUp({ to, format }: { to: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(val)}
    </span>
  );
}

const STATS = [
  {
    value: 3200,
    format: (n: number) => `${Math.round(n).toLocaleString('en-US')}+`,
    label: 'github stars — and counting slowly, honestly',
  },
  {
    value: 8,
    format: (n: number) => `${Math.round(n)}`,
    label: 'bot templates in the roster, from inbox to bug triage',
  },
  {
    value: 100,
    format: (n: number) => `${Math.round(n)}%`,
    label: 'of the code in the open, apache-2.0, no exceptions',
  },
  {
    value: 0,
    format: (n: number) => `${Math.round(n)}`,
    label: 'telemetry calls home, ever. we checked. it was easy',
  },
];

export default function StatsBand() {
  return (
    <section data-nav-dark className="relative overflow-hidden bg-carbon py-28 md:py-36">
      <div
        aria-hidden
        className="dot-grid-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
      />
      <div className="relative mx-auto max-w-site px-6 md:px-10">
        <SectionHeader
          dark
          center
          kicker="// BY THE NUMBERS"
          title={
            <>
              Small team. <span className="font-normal italic text-ember">Real</span> numbers.
            </>
          }
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[12px] border border-hairline-dark bg-hairline-dark sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col gap-4 bg-carbon-2 p-8">
                <span className="font-display text-[clamp(38px,4vw,52px)] font-medium leading-none tracking-[-0.02em] text-bone">
                  <CountUp to={s.value} format={s.format} />
                </span>
                <span className="font-mono text-[12px] leading-[1.7] text-bone-dim">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
