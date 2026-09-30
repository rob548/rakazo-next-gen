import { Link } from 'react-router-dom';

const cols = [
  {
    title: 'Product',
    links: [
      { to: '/product', label: 'How it works' },
      { to: '/bots', label: 'Bot templates' },
      { to: '/self-host', label: 'Self-host' },
      { to: '/changelog', label: 'Changelog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { to: '/docs', label: 'Docs' },
      { to: '/blog', label: 'Blog' },
      { to: '/about', label: 'About' },
      { to: '/faq', label: 'FAQ' },
      { to: '/open-source', label: 'Open source' },
      { href: 'https://github.com', label: 'GitHub' },
    ],
  },
  {
    title: 'Community',
    links: [
      { href: 'https://github.com', label: 'Discussions' },
      { href: 'https://github.com', label: 'Issues' },
      { to: '/open-source', label: 'Contributing' },
      { href: 'mailto:support@rakazo.dev', label: 'Support' },
    ],
  },
];

const languages = ['English', 'Deutsch', '한국어', '简体中文'];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline-dark bg-carbon text-bone">
      <div className="mx-auto max-w-site px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="" className="h-[22px] w-[22px]" />
              <span className="font-display text-[20px] font-semibold">rakazo</span>
            </Link>
            <p className="mt-5 max-w-[280px] font-mono text-[12.5px] leading-relaxed text-bone-dim">
              © 2026 Inbox Zero Inc.
              <br />
              Apache-2.0 · no pricing page, just the repo.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-bone-dim">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {'to' in l ? (
                      <Link to={l.to!} className="text-[14.5px] text-bone/80 transition-colors hover:text-ember">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} target="_blank" rel="noreferrer" className="text-[14.5px] text-bone/80 transition-colors hover:text-ember">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hairline-dark pt-6 font-mono text-[12px] text-bone-dim">
          {languages.map((l, i) => (
            <span key={l} className={i === 0 ? 'text-bone' : undefined}>{l}</span>
          ))}
          <span className="ml-auto hidden sm:inline">about · privacy · support</span>
        </div>
      </div>
      {/* oversized watermark, clipped to bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none select-none text-center font-display text-[18vw] font-semibold leading-[0.75] text-bone/[0.04] -mb-[6vw]"
      >
        rakazo
      </div>
    </footer>
  );
}
