import { Reveal, SectionHeader } from '@/components/Reveal';

/**
 * S1 · The problem — AI tools that rent you back your own work.
 * Editorial 5/7 split: narrative left, ruled grievance ledger right.
 */

const GRIEVANCES = [
  {
    id: 'rent.01',
    title: 'Your data lives on their servers',
    body: 'Every email the assistant reads, every file it touches — copied into somebody else’s cloud, under somebody else’s retention policy.',
  },
  {
    id: 'rent.02',
    title: 'Your workflows live in their formats',
    body: 'Automations built in a proprietary graph editor are not yours. Cancel the subscription and the work you taught the tool evaporates.',
  },
  {
    id: 'rent.03',
    title: 'Your bill is set by their pricing page',
    body: 'Seat counts, usage tiers, model markups. The more useful the tool becomes, the more it costs to keep your own workflow running.',
  },
];

export default function Problem() {
  return (
    <section className="border-t border-hairline bg-paper py-24 md:py-36">
      <div className="mx-auto grid max-w-site gap-14 px-6 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-5">
          <SectionHeader
            kicker="// THE PROBLEM"
            title={
              <>
                Most AI tools rent you back{' '}
                <span className="font-normal italic text-ember">your own</span> work.
              </>
            }
          />
          <Reveal delay={0.2}>
            <div className="mt-8 space-y-5 text-[16.5px] leading-[1.65] text-ink-soft">
              <p>
                The pitch is always the same: hand over your inbox, your calendar, your
                files — and a helpful assistant will live in our data center and take care
                of it. For a monthly fee. Per seat. Forever.
              </p>
              <p>
                It works, until you read the terms. The assistant remembers your business
                on hardware you don’t control. The routines you spent months refining are
                stored in a format you can’t export. And the day the pricing changes, your
                options are pay up or start over.
              </p>
              <p>
                That isn’t a teammate. That’s a landlord for your own processes. We built
                Rakazo because we wanted the opposite arrangement.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:pt-2">
          <Reveal delay={0.1}>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-faint">
              // the rental agreement, itemized
            </p>
          </Reveal>
          <div className="mt-5 border-t border-hairline">
            {GRIEVANCES.map((g, i) => (
              <Reveal key={g.id} delay={0.12 + i * 0.08}>
                <div className="grid gap-2 border-b border-hairline py-7 md:grid-cols-[110px_1fr] md:gap-6">
                  <span className="font-mono text-[12.5px] text-ember">{g.id}</span>
                  <div>
                    <h3 className="font-sans text-[19px] font-semibold tracking-[-0.01em] text-ink">
                      {g.title}
                    </h3>
                    <p className="mt-2 max-w-[520px] text-[15.5px] leading-[1.6] text-ink-soft">
                      {g.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <p className="mt-6 font-mono text-[12.5px] leading-[1.7] text-ink-faint">
              total due: your independence · renews: monthly · cancellation fee: everything
              you built on it
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
