import { Reveal, SectionHeader } from '@/components/Reveal';

/**
 * S4 · Timeline — 2025 first commit → 2026 today.
 * Ruled rows: mono date column, ember marker, milestone copy.
 */

const MILESTONES = [
  {
    date: '2025 · 03',
    title: 'First commit',
    body: 'A script that could read an inbox, a sandboxed browser, and one strong opinion: the bot should work for you, not the other way around.',
  },
  {
    date: '2025 · 07',
    title: 'Bots get computers',
    body: 'Each bot moves into its own container — real browser, real terminal, real file system. Work stops being a chat transcript and starts being done.',
  },
  {
    date: '2025 · 11',
    title: 'Routines + receipts',
    body: 'Routines land as plain Markdown files. Approval gates and the append-only audit log ship the same week — autonomy with paperwork.',
  },
  {
    date: '2026 · 02',
    title: 'Apache-2.0, public',
    body: 'The repo goes open. No pricing page, no waitlist, no “contact sales.” The roster grows to eight bot templates.',
  },
  {
    date: '2026 · today',
    title: 'You, reading this',
    body: 'The roadmap is the issue tracker and the pull requests are the plan. This part of the timeline is unwritten on purpose.',
  },
];

export default function Timeline() {
  return (
    <section className="border-t border-hairline bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeader
          kicker="// SO FAR"
          title={
            <>
              A short history, told <span className="font-normal italic text-ember">honestly</span>.
            </>
          }
          sub="No pivots, no near-death funding stories. Just steady shipping in one direction."
        />
        <div className="mt-14 border-t border-hairline">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.date} delay={i * 0.06}>
              <div className="grid gap-3 border-b border-hairline py-8 md:grid-cols-[160px_28px_1fr] md:gap-6">
                <span className="font-mono text-[13px] tracking-[0.04em] text-ember">
                  {m.date}
                </span>
                <span
                  aria-hidden
                  className="mt-[7px] hidden h-1.5 w-1.5 rounded-full bg-ember md:block"
                />
                <div>
                  <h3 className="font-sans text-[19px] font-semibold tracking-[-0.01em] text-ink">
                    {m.title}
                  </h3>
                  <p className="mt-2 max-w-[620px] text-[15.5px] leading-[1.6] text-ink-soft">
                    {m.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
