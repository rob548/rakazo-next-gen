import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, Send } from 'lucide-react';
import { z } from 'zod';
import { trpc } from '@/providers/trpc';
import { Reveal, SectionHeader } from '@/components/Reveal';
import { Button } from '@/components/Button';
import { toast } from '@/components/demo/Toast';
import { cn } from '@/lib/utils';

/**
 * Talk to a human — light editorial contact section on the FAQ page.
 * Submits via trpc.forms.sendContact with zod client validation.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const contactSchema = z.object({
  name: z.string().trim().min(1, 'we need a name to reply to'),
  email: z.string().trim().email('that email does not parse — check it'),
  message: z.string().trim().min(1, 'say something — even "hi" works'),
});

const inputClass = cn(
  'w-full rounded-[10px] border border-hairline bg-transparent px-4 py-3',
  'font-sans text-[15px] text-ink placeholder:text-ink-faint',
  'transition-colors duration-200 focus:border-ember focus:outline-none',
);

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const send = trpc.forms.sendContact.useMutation({
    onSuccess: () => {
      setSent(true);
      setFieldError(null);
    },
    onError: () => {
      toast("couldn't send that — try again");
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse({ name, email, message });
    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? 'check the fields and try again');
      return;
    }
    setFieldError(null);
    send.mutate(parsed.data);
  };

  return (
    <section id="contact" className="border-t border-hairline bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-site gap-14 px-6 md:px-10 lg:grid-cols-[5fr_7fr]">
        {/* left — header */}
        <div>
          <SectionHeader
            kicker="// TALK TO A HUMAN"
            title={
              <>
                The FAQ only goes so far. <em className="font-normal text-ember">Ask us.</em>
              </>
            }
            sub="Licensing edge cases, security reviews, weird sandbox setups — write it down and a person (assisted by a very good inbox bot) replies."
          />
          <Reveal delay={0.24}>
            <p className="mt-8 border-l-2 border-ember pl-4 font-mono text-[12.5px] leading-relaxed text-ink-faint">
              median response: same day.
              <br />
              we run our own inbox manager.
            </p>
          </Reveal>
        </div>

        {/* right — form */}
        <Reveal delay={0.15} y={32}>
          <div className="rounded-[14px] border border-hairline bg-paper-deep p-6 md:p-8">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col items-start gap-4 py-6"
                role="status"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ember bg-ember-soft/40">
                  <Check className="h-5 w-5 text-ember" />
                </span>
                <p className="font-display text-[24px] font-medium leading-[1.15] tracking-[-0.01em] text-ink">
                  message sent — <em className="font-normal text-ember">talk soon.</em>
                </p>
                <p className="font-mono text-[12.5px] leading-relaxed text-ink-faint">
                  $ queued · replies land in your inbox, not a ticket portal
                </p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-faint">
                      name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ada lovelace"
                      className={inputClass}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-faint">
                      email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className={inputClass}
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-faint">
                    message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="what's on your mind?"
                    rows={6}
                    className={cn(inputClass, 'resize-y')}
                  />
                </div>

                {fieldError && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-[12px] text-ember"
                    role="alert"
                  >
                    ! {fieldError}
                  </motion.p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Button
                    type="submit"
                    variant="primary-light"
                    disabled={send.isPending}
                    className="disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {send.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> sending…
                      </>
                    ) : (
                      <>
                        Send it <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="font-mono text-[11px] text-ink-faint">
                    no ticket numbers. no "dear valued user".
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
