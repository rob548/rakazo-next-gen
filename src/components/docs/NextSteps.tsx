import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cards = [
  {
    to: '/product',
    title: 'Concepts',
    sub: 'memory, routines, computers — the mental model',
  },
  {
    to: '/self-host',
    title: 'Self-host guide',
    sub: 'providers, config, troubleshooting → /self-host',
  },
  {
    to: '/faq',
    title: 'FAQ',
    sub: 'fair questions → /faq',
  },
];

/** S5 · next steps — three ruled link cards at the foot of the content. */
export default function NextSteps() {
  return (
    <div className="mb-24 mt-16 grid gap-4 border-t border-hairline pt-12 sm:grid-cols-3">
      {cards.map((c, i) => (
        <motion.div
          key={c.to}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
        >
          <Link
            to={c.to}
            className="group flex h-full flex-col rounded-[10px] border border-hairline bg-paper p-5 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-hard"
          >
            <span className="flex items-center justify-between">
              <span className="font-sans text-[16px] font-semibold tracking-[-0.01em] text-ink group-hover:text-ember">
                {c.title}
              </span>
              <ArrowRight className="h-4 w-4 -translate-x-1 text-ink-faint opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-ember group-hover:opacity-100" />
            </span>
            <span className="mt-2 font-mono text-[12px] leading-[1.6] text-ink-faint">{c.sub}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
