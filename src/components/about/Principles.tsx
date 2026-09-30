import { KeyRound, FileText, ScrollText } from 'lucide-react';
import { Reveal, SectionHeader } from '@/components/Reveal';

/**
 * S2 · The principles — ownership, plain text, accountability.
 * Three editorial ruled cards with mono index and hover lift.
 */

const PRINCIPLES = [
  {
    id: '01',
    icon: KeyRound,
    title: 'Ownership',
    body: 'The computer is yours. Bots run on your hardware or your VPS, with your API keys, under your rules. Uninstall and nothing about your setup was ever hostage.',
    meta: 'your machine · your keys · your data',
  },
  {
    id: '02',
    icon: FileText,
    title: 'Plain text',
    body: 'Routines are Markdown. Memory is files. The audit log is greppable. If you can’t read what your bot does all day, you don’t actually know what it does.',
    meta: '*.md · *.txt · *.log — diffable forever',
  },
  {
    id: '03',
    icon: ScrollText,
    title: 'Accountability',
    body: 'Autonomy needs receipts. Approval gates decide what a bot may do alone, and every action lands in an append-only log you own. Trust is earned in writing.',
    meta: 'approvals on · audit log append-only',
  },
];

export default function Principles() {
  return (
    <section className="border-t border-hairline bg-paper-deep py-24 md:py-36">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeader
          kicker="// PRINCIPLES"
          title={
            <>
              Three rules we don’t <span className="font-normal italic text-ember">bend</span>.
            </>
          }
          sub="Every feature in Rakazo gets checked against these. If a change weakens one of them, the change doesn’t ship."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} className="h-full">
              <article className="group flex h-full flex-col rounded-[10px] border border-hairline bg-paper p-7 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-hard">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12.5px] text-ember">{p.id}</span>
                  <p.icon
                    className="h-5 w-5 text-ink-faint transition-colors group-hover:text-ember"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-6 font-sans text-[21px] font-semibold tracking-[-0.01em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-[15.5px] leading-[1.6] text-ink-soft">{p.body}</p>
                <p className="mt-6 border-t border-hairline pt-4 font-mono text-[11.5px] tracking-[0.04em] text-ink-faint">
                  {p.meta}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
