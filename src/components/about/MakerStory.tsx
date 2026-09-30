import { Reveal, SectionHeader } from '@/components/Reveal';

/**
 * S3 · The maker story — built by Inbox Zero Inc., open source Apache-2.0.
 * Editorial 4/8 split with a mono fact card.
 */

const FACTS: Array<[string, string]> = [
  ['built by', 'inbox zero inc.'],
  ['license', 'apache-2.0 — all of it'],
  ['first commit', 'early 2025'],
  ['business model', 'none. the repo is the product'],
  ['telemetry', 'zero calls home'],
];

export default function MakerStory() {
  return (
    <section className="border-t border-hairline bg-paper py-24 md:py-36">
      <div className="mx-auto grid max-w-site gap-14 px-6 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-5">
          <SectionHeader
            kicker="// THE MAKERS"
            title={
              <>
                Built by people who were <span className="font-normal italic text-ember">drowning</span>{' '}
                first.
              </>
            }
          />
          <Reveal delay={0.2}>
            <div className="mt-8 space-y-5 text-[16.5px] leading-[1.65] text-ink-soft">
              <p>
                Rakazo comes from Inbox Zero Inc. — a small company that got known for
                helping people climb out of their email. The tool worked, but the pattern
                behind it was bigger than inboxes: everyone we talked to had three or four
                jobs’ worth of busywork stacked on top of their actual job.
              </p>
              <p>
                So we started giving bots real computers instead of narrow API hooks. They
                swept inboxes, then triaged bugs, then filed expenses. Every time, the
                thing that made it work wasn’t a smarter model — it was that the bot had a
                machine, a routine it could reread, and a log it had to answer to.
              </p>
              <p>
                We open-sourced the whole thing under Apache-2.0 because the alternative
                felt wrong. Software that runs your business should belong to you — the
                code, the credentials, and the receipts. That’s not a slogan. It’s the
                license.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:pt-2">
          <Reveal delay={0.15}>
            <div className="rounded-[10px] border border-hairline bg-paper-deep p-7 md:p-9">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-faint">
                // company file
              </p>
              <dl className="mt-6 border-t border-hairline">
                {FACTS.map(([k, v], i) => (
                  <Reveal key={k} delay={0.2 + i * 0.06}>
                    <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-hairline py-4 md:grid-cols-[180px_1fr]">
                      <dt className="font-mono text-[12.5px] text-ink-faint">{k}</dt>
                      <dd className="font-mono text-[13px] text-ink">{v}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <Reveal delay={0.55}>
                <p className="mt-6 text-[15.5px] leading-[1.65] text-ink-soft">
                  No growth hacks, no engagement loops, no “premium tier” gatekeeping the
                  good parts. The whole product is a repository you can read in an
                  afternoon — and we think that’s the most honest pitch on the internet.
                </p>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
