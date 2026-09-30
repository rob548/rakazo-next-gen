import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { trpc } from '@/providers/trpc';
import { Reveal, SectionHeader } from '@/components/Reveal';
import { Button } from '@/components/Button';
import { toast } from '@/components/demo/Toast';
import { cn } from '@/lib/utils';

/**
 * Cloud waitlist — full-bleed carbon band on the Open source page.
 * Live counter (trpc.forms.waitlistCount) + join form
 * (trpc.forms.joinWaitlist) with zod client validation.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const waitlistSchema = z.object({
  email: z.string().trim().email('that email does not parse — check it'),
  name: z.string().trim().max(255).optional(),
  useCase: z.string().trim().max(2000).optional(),
});

export const WAITLIST_STORAGE_KEY = 'rakazo:waitlist-joined';

export function markWaitlistJoined(email: string) {
  try {
    window.localStorage.setItem(WAITLIST_STORAGE_KEY, email.trim().toLowerCase());
  } catch {
    /* storage unavailable — join state simply won't persist */
  }
}

export function hasWaitlistJoined(email?: string | null) {
  if (!email) return false;
  try {
    return window.localStorage.getItem(WAITLIST_STORAGE_KEY) === email.trim().toLowerCase();
  } catch {
    return false;
  }
}

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {val.toLocaleString('en-US')}
    </span>
  );
}

const inputClass = cn(
  'w-full rounded-[10px] border border-hairline-dark bg-carbon-3 px-4 py-3',
  'font-mono text-[13.5px] text-bone placeholder:text-bone-dim/60',
  'transition-colors duration-200 focus:border-ember focus:outline-none',
);

export default function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [useCase, setUseCase] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);

  const utils = trpc.useUtils();
  const count = trpc.forms.waitlistCount.useQuery(undefined, {
    staleTime: 1000 * 30,
    retry: false,
  });

  const join = trpc.forms.joinWaitlist.useMutation({
    onSuccess: async (_data, vars) => {
      setJoined(true);
      setFieldError(null);
      markWaitlistJoined(vars.email);
      await utils.forms.waitlistCount.invalidate();
    },
    onError: () => {
      toast("couldn't join the waitlist — try again");
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = waitlistSchema.safeParse({
      email,
      name: name || undefined,
      useCase: useCase || undefined,
    });
    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? 'check the fields and try again');
      return;
    }
    setFieldError(null);
    join.mutate(parsed.data);
  };

  return (
    <section id="waitlist" data-nav-dark className="relative overflow-hidden bg-carbon py-28 md:py-36">
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-site px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[7fr_5fr]">
          {/* left — pitch */}
          <div>
            <SectionHeader
              dark
              kicker="// CLOUD WAITLIST"
              title={
                <>
                  Cloud is coming. <em className="font-normal text-ember">Be first.</em>
                </>
              }
              sub="Managed sandboxes, your keys, same repo. No pricing page yet — just a line, and the line is forming."
            />
            <Reveal delay={0.24}>
              <p className="mt-8 flex items-center gap-2.5 font-mono text-[13px] text-bone-dim">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-phosphor" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-phosphor" />
                </span>
                {typeof count.data === 'number' ? (
                  <>
                    <span className="font-display text-[18px] text-bone">
                      <CountUp to={count.data} />
                    </span>{' '}
                    builders in line
                  </>
                ) : count.isLoading ? (
                  <span className="inline-block h-4 w-40 animate-pulse rounded bg-carbon-3" aria-hidden />
                ) : (
                  'the line is forming — get in it'
                )}
              </p>
            </Reveal>
          </div>

          {/* right — form panel */}
          <Reveal delay={0.15} y={32}>
            <div className="rounded-[12px] border border-hairline-dark bg-carbon-2">
              {/* panel title bar */}
              <div className="flex items-center gap-2 border-b border-hairline-dark px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ember" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                <span className="h-2.5 w-2.5 rounded-full bg-phosphor" />
                <span className="ml-3 font-mono text-[12px] text-bone-dim">~/rakazo/cloud — waitlist</span>
              </div>

              <div className="p-6 md:p-7">
                {joined ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex flex-col items-start gap-4 py-4"
                    role="status"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-phosphor/50 bg-phosphor/10">
                      <Check className="h-5 w-5 text-phosphor" />
                    </span>
                    <p className="font-display text-[24px] font-medium leading-[1.15] tracking-[-0.01em] text-bone">
                      you're in — <em className="font-normal text-phosphor">we'll email you.</em>
                    </p>
                    <p className="font-mono text-[12.5px] leading-relaxed text-bone-dim">
                      $ position secured · no spam, one email when cloud opens
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} noValidate className="space-y-4">
                    <div>
                      <label htmlFor="waitlist-email" className="mb-1.5 block font-mono text-[11.5px] uppercase tracking-[0.14em] text-bone-dim">
                        email *
                      </label>
                      <input
                        id="waitlist-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className={inputClass}
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="waitlist-name" className="mb-1.5 block font-mono text-[11.5px] uppercase tracking-[0.14em] text-bone-dim">
                        name <span className="text-bone-dim/50">(optional)</span>
                      </label>
                      <input
                        id="waitlist-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="ada lovelace"
                        className={inputClass}
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="waitlist-usecase" className="mb-1.5 block font-mono text-[11.5px] uppercase tracking-[0.14em] text-bone-dim">
                        what would your bot do? <span className="text-bone-dim/50">(optional)</span>
                      </label>
                      <textarea
                        id="waitlist-usecase"
                        value={useCase}
                        onChange={(e) => setUseCase(e.target.value)}
                        placeholder="triage support mail, run the morning standup notes…"
                        rows={3}
                        className={cn(inputClass, 'resize-none')}
                      />
                    </div>

                    {fieldError && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-mono text-[12px] text-amber"
                        role="alert"
                      >
                        ! {fieldError}
                      </motion.p>
                    )}

                    <Button
                      type="submit"
                      variant="primary-dark"
                      disabled={join.isPending}
                      className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {join.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> joining…
                        </>
                      ) : (
                        <>
                          Join the waitlist <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <p className="text-center font-mono text-[11px] text-bone-dim/70">
                      apache-2.0 forever — cloud is just the lazy way in
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
