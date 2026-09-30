import { useState } from 'react';
import type { FormEvent } from 'react';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/Button';
import { toast } from '@/components/demo/Toast';

/** S4 · subscribe band — one email per release, or watch the repo. */
export default function Subscribe() {
  const [email, setEmail] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      toast('that doesn’t look like an email');
      return;
    }
    setEmail('');
    toast("you're on the list — first email ships with v1.0");
  };

  return (
    <section className="border-t border-hairline bg-paper-deep py-28">
      <Reveal className="mx-auto max-w-[640px] px-6 text-center" y={32}>
        <h2 className="font-display text-[clamp(28px,4vw,36px)] font-medium leading-[1.1] tracking-[-0.015em] text-ink">
          Releases, <em className="font-normal text-ember">monthly-ish.</em>
        </h2>
        <p className="mt-4 text-[16px] leading-[1.6] text-ink-soft">
          One email per release, or watch the repo — same information, your choice.
        </p>
        <form
          onSubmit={submit}
          className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <span className="group relative flex-1 sm:max-w-[280px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@work.com"
              aria-label="email address"
              className="w-full border border-hairline bg-paper px-4 py-3 font-mono text-[13.5px] text-ink placeholder:text-ink-faint focus:outline-none rounded-full"
            />
            <span
              aria-hidden
              className="absolute inset-x-4 bottom-0 h-[2px] origin-left scale-x-0 bg-ember transition-transform duration-200 group-focus-within:scale-x-100"
            />
          </span>
          <Button type="submit" variant="primary-light">
            Subscribe
          </Button>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button type="button" variant="ghost-light" className="w-full justify-center sm:w-auto">
              Watch on GitHub
            </Button>
          </a>
        </form>
      </Reveal>
    </section>
  );
}
