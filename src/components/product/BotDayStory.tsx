import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * S2 · "A bot's day" — pinned scroll story.
 * Full-bleed carbon section; GSAP ScrollTrigger pins the stage for ~180vh
 * while scroll progress drives five beats. Pure GSAP in this tree — no
 * Framer Motion (library isolation). Reduced motion: no pin, beats stacked.
 */

const BEATS = [
  { time: '06:00', label: 'Morning sweep fires' },
  { time: '09:41', label: 'It hits a judgment call' },
  { time: '09:44', label: 'You answer from your phone' },
  { time: '14:20', label: 'It keeps working' },
  { time: '18:00', label: 'The day lands in the log' },
];

function BeatFrame({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

/** Beat 1 — routine header + checklist strike-in */
function BeatSweep() {
  const rows = [
    { icon: '✓', text: 'archived 31 newsletters + receipts', cls: 'text-phosphor' },
    { icon: '✓', text: 'drafted 7 replies', cls: 'text-phosphor' },
    { icon: '⚑', text: '2 need you', cls: 'text-amber' },
  ];
  return (
    <div className="p-6 md:p-8">
      <p className="font-mono text-[12px] text-bone-dim">
        <span className="text-ember">routines/</span>morning-sweep.md
        <span className="ml-3 rounded-full border border-hairline-dark px-2 py-0.5 text-[10.5px] uppercase tracking-[0.12em]">
          weekdays 6am
        </span>
      </p>
      <div className="mt-6 space-y-3.5">
        {rows.map((r, i) => (
          <div key={r.text} className="beat0-row flex items-center gap-3 font-mono text-[14px]">
            <span className={r.cls}>{r.icon}</span>
            <span className="relative text-bone">
              {r.text}
              <span
                className="beat0-strike absolute left-0 top-1/2 h-px w-full origin-left scale-x-0 bg-bone-dim"
                data-i={i}
              />
            </span>
          </div>
        ))}
      </div>
      <p className="mt-6 font-mono text-[12px] text-bone-dim">sweep complete · inbox zero-ish</p>
    </div>
  );
}

/** Beat 2 — approval card, softly pulsing buttons */
function BeatApproval() {
  return (
    <div className="flex h-full items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-[380px] rounded-[12px] border-l-2 border-amber bg-carbon-2 p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber">
          approval needed
        </p>
        <p className="mt-3 font-sans text-[15px] font-semibold text-bone">
          Reply to acme's procurement thread?
        </p>
        <p className="mt-1.5 font-mono text-[12px] text-bone-dim">mentions pricing · irreversible: send</p>
        <div className="mt-5 flex gap-3">
          <span className="animate-pulse rounded-full border border-phosphor px-4 py-1.5 font-mono text-[12.5px] text-phosphor">
            Approve
          </span>
          <span className="animate-pulse rounded-full border border-hairline-dark px-4 py-1.5 font-mono text-[12.5px] text-bone-dim [animation-delay:300ms]">
            Deny
          </span>
        </div>
      </div>
    </div>
  );
}

/** Beat 3 — compact mobile-style chat */
function BeatPhone() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-[320px] rounded-[18px] border border-hairline-dark bg-carbon-2 p-4">
        <p className="border-b border-hairline-dark pb-2.5 text-center font-mono text-[11px] text-bone-dim">
          rakazo · mobile
        </p>
        <div className="mt-4 space-y-3">
          <div className="beat2-bubble ml-auto w-fit max-w-[85%] rounded-[12px] bg-carbon-3 px-3.5 py-2.5 text-[13.5px] text-bone">
            approve — use the q3 rate
          </div>
          <div className="beat2-bubble w-fit max-w-[85%] rounded-[12px] border border-hairline-dark px-3.5 py-2.5 text-[13.5px] text-bone">
            <span className="mb-1 flex items-center gap-2 font-mono text-[10.5px] text-bone-dim">
              <img src="/avatars/avatar-inbox-manager.png" alt="" className="h-4 w-4 rounded-[4px] object-contain" />
              inbox-manager · 09:44
            </span>
            sent. <span className="text-phosphor">logged.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Beat 4 — terminal streaming research output */
function BeatTerminal() {
  const lines = [
    { text: '$ researching vendor contracts…', cls: 'text-phosphor' },
    { text: '▸ reading acme-msa-2025.pdf (14 pages)', cls: 'text-bone-dim' },
    { text: '▸ comparing q3 rate vs. renewal clause 4.2', cls: 'text-bone-dim' },
    { text: '▸ drafting summary → memory/decisions/', cls: 'text-bone-dim' },
    { text: '✓ 3 contracts summarized · 1 discrepancy flagged', cls: 'text-phosphor' },
  ];
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-2 border-b border-hairline-dark pb-3 font-mono text-[11.5px]">
        <span className="rounded-md bg-carbon-3 px-2.5 py-1 text-bone">terminal</span>
        <span className="px-2.5 py-1 text-bone-dim">browser</span>
        <span className="px-2.5 py-1 text-bone-dim">chat</span>
      </div>
      <div className="mt-5 space-y-2.5 font-mono text-[13.5px] leading-[1.55]">
        {lines.map((l) => (
          <p key={l.text} className={`beat3-line ${l.cls}`}>
            {l.text}
          </p>
        ))}
        <span className="beat3-line block-cursor inline-block text-phosphor" />
      </div>
    </div>
  );
}

/** Beat 5 — audit log rows scrolling up */
function BeatLog() {
  const rows = [
    '[17:58:41] drafted reply · nora@ · held for review',
    '[17:59:03] archived 2 receipts · finance label',
    '[17:59:44] calendar check · no conflicts tomorrow',
    '[18:00:02] sweep complete · 41 actions · 2 approvals · 0 errors',
    '[18:00:02] log sealed · sha 9f2c…e41a',
  ];
  return (
    <div className="flex h-full flex-col p-6 md:p-8">
      <p className="font-mono text-[12px] text-bone-dim">
        audit.log <span className="ml-2 text-ember">append-only</span>
      </p>
      <div className="relative mt-4 flex-1 overflow-hidden">
        <div className="beat4-track space-y-3">
          {rows.map((r, i) => (
            <p
              key={r}
              className={`font-mono text-[12.5px] ${i === rows.length - 2 ? 'text-phosphor' : 'text-bone-dim'}`}
            >
              {r}
            </p>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-carbon-3 to-transparent" />
      </div>
    </div>
  );
}

const beatContent = [
  <BeatSweep key="0" />,
  <BeatApproval key="1" />,
  <BeatPhone key="2" />,
  <BeatTerminal key="3" />,
  <BeatLog key="4" />,
];

export default function BotDayStory() {
  const rootRef = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useLayoutEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const beats = gsap.utils.toArray<HTMLElement>('.story-beat');
      const railItems = gsap.utils.toArray<HTMLElement>('.rail-item');
      const SEG = 1;
      const TOTAL = BEATS.length * SEG;

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=180%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // hairline progress bar fills down the rail with scroll
      tl.fromTo(
        '.rail-progress',
        { scaleY: 0 },
        { scaleY: 1, duration: TOTAL, ease: 'none' },
        0,
      );

      BEATS.forEach((_, i) => {
        const t = i * SEG;
        // beat crossfade in (opacity + y 24px)
        tl.fromTo(beats[i], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3 }, t + 0.02);
        // rail timestamp lights up phosphor while its beat is active
        tl.set(railItems[i], { color: '#22D3EE' }, t + 0.02);
        if (i < BEATS.length - 1) {
          tl.to(beats[i], { opacity: 0, y: -24, duration: 0.28, ease: 'power2.in' }, t + 0.72);
          tl.set(railItems[i], { color: '#9AA0BD' }, t + 0.72);
        }
      });

      // beat 1: checklist strikes in
      gsap.utils.toArray<HTMLElement>('.beat0-strike').forEach((el, i) => {
        tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.12, ease: 'none' }, 0.18 + i * 0.14);
      });
      tl.from('.beat0-row', { opacity: 0, x: 12, stagger: 0.12, duration: 0.18 }, 0.08);

      // beat 3: chat bubbles pop in
      tl.from('.beat2-bubble', { opacity: 0, y: 14, scale: 0.94, stagger: 0.16, duration: 0.2 }, 2.1);

      // beat 4: terminal lines stream
      tl.from('.beat3-line', { opacity: 0, stagger: 0.12, duration: 0.1 }, 3.1);

      // beat 5: log rows scroll up
      tl.fromTo('.beat4-track', { y: 56 }, { y: -8, duration: 0.7, ease: 'none' }, 4.1);
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section ref={rootRef} data-nav-dark className="relative overflow-hidden bg-carbon">
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto flex min-h-[100dvh] max-w-site flex-col justify-center px-6 py-20 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[240px_1fr]">
          {/* left rail — vertical timeline */}
          <div className="order-2 lg:order-1">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-bone-dim">
              // A bot's day
            </p>
            <div className="relative mt-6 flex gap-5 lg:gap-6">
              {/* rail line + progress */}
              <div className="relative hidden w-px self-stretch bg-hairline-dark lg:block">
                <div className="rail-progress absolute inset-0 origin-top scale-y-0 bg-phosphor" />
              </div>
              <ol className="flex flex-row flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-7">
                {BEATS.map((b) => (
                  <li key={b.time} className="rail-item font-mono text-bone-dim">
                    <span className="text-[15px] tabular-nums">{b.time}</span>
                    <span className="mt-1 hidden text-[11.5px] leading-snug lg:block">{b.label}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-8 hidden items-center gap-2 font-mono text-[11.5px] text-bone-dim lg:flex">
              <img src="/avatars/avatar-inbox-manager.png" alt="" className="h-5 w-5 rounded-md object-contain" />
              scroll — a day in the life of inbox-manager
            </p>
          </div>

          {/* right — dark mini-app frame whose content swaps per beat */}
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-[14px] border border-hairline-dark bg-carbon-3">
              <div className="flex items-center justify-between border-b border-hairline-dark px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-ember" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                  <span className="h-2.5 w-2.5 rounded-full bg-phosphor" />
                </div>
                <span className="font-mono text-[12px] text-bone-dim">inbox-manager — desktop</span>
                <span className="font-mono text-[11px] text-phosphor">● online</span>
              </div>
              <div className={reduced ? 'divide-y divide-hairline-dark' : 'relative h-[380px] md:h-[420px]'}>
                {beatContent.map((beat, i) =>
                  reduced ? (
                    <div key={i}>
                      <p className="bg-carbon-2 px-6 py-2 font-mono text-[11px] text-bone-dim">
                        {BEATS[i].time} — {BEATS[i].label}
                      </p>
                      {beat}
                    </div>
                  ) : (
                    <div key={i} className="story-beat absolute inset-0 opacity-0">
                      <BeatFrame>{beat}</BeatFrame>
                    </div>
                  ),
                )}
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 font-mono text-[11.5px] text-bone-dim lg:hidden">
              <img src="/avatars/avatar-inbox-manager.png" alt="" className="h-5 w-5 rounded-md object-contain" />
              scroll — a day in the life of inbox-manager
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
