import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The ruled timeline spine: a 2px hairline that draws downward from the
 * hero through the release list, scrubbed by whole-page scroll progress.
 * GSAP is isolated to this component — no framer-motion inside.
 */
export default function Spine({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
  const spineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const spine = spineRef.current;
      const container = containerRef.current;
      if (!spine || !container) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(spine, { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        spine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 0.5,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-[max(24px,calc(50%_-_430px_+_24px))] z-0 w-[2px] md:left-[max(40px,calc(50%_-_430px_+_40px))]"
    >
      <div ref={spineRef} className="h-full w-full origin-top bg-hairline" style={{ transform: 'scaleY(0)' }} />
    </div>
  );
}
