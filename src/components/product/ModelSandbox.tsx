import { motion } from 'framer-motion';
import { Reveal, SectionHeader } from '@/components/Reveal';
import { modelMarquee, sandboxMarquee } from '@/data/changelog';

/**
 * S7 · Models & sandboxes — "Bring your own everything". paper-deep, two half
 * panels of icon-less mono tiles. Tiles stagger in a wave (row-by-row), hover
 * lifts -2px and draws an ember border.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function TileGrid({ items, baseDelay }: { items: string[]; baseDelay: number }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((name, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: baseDelay + i * 0.05, ease: EASE }}
          whileHover={{ y: -2 }}
          className="group relative rounded-[10px] border border-hairline bg-paper px-4 py-3.5 text-center font-mono text-[13px] text-ink-soft transition-colors hover:text-ink"
        >
          {name}
          {/* ember border draw on hover */}
          <span className="pointer-events-none absolute inset-0 rounded-[10px] border border-ember opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </motion.div>
      ))}
    </div>
  );
}

export default function ModelSandbox() {
  return (
    <section className="bg-paper-deep py-24 md:py-36">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeader
          center
          kicker="// BRING YOUR OWN"
          title={
            <>
              Bring your own <em className="font-normal text-ember">everything.</em>
            </>
          }
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[10px] border border-hairline bg-paper p-7">
              <h3 className="font-sans text-[20px] font-semibold tracking-[-0.01em] text-ink">
                Any model, your key
              </h3>
              <TileGrid items={modelMarquee} baseDelay={0.1} />
              <p className="mt-6 font-mono text-[12px] text-ink-faint">
                per-bot model choice, per-bot spend. swap anytime.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="h-full rounded-[10px] border border-hairline bg-paper p-7">
              <h3 className="font-sans text-[20px] font-semibold tracking-[-0.01em] text-ink">
                Any sandbox
              </h3>
              <TileGrid items={sandboxMarquee} baseDelay={0.2} />
              <p className="mt-6 font-mono text-[12px] text-ink-faint">
                bots compute where you say. local docker by default.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
