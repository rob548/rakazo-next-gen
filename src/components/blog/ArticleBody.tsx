import type { ReactNode } from 'react';
import { Fragment } from 'react';

/**
 * Minimal renderer for stored plain-text / markdown-ish post content.
 * - blocks split on blank lines
 * - `## ` lines → H2
 * - blocks where every line starts with `- ` → list
 * - `**bold**` inline → <strong>
 * No extra dependencies on purpose.
 */

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export default function ArticleBody({ content }: { content: string }) {
  const blocks = content
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div>
      {blocks.map((block, i) => {
        if (block.startsWith('## ')) {
          return (
            <h2
              key={i}
              className="mb-5 mt-12 font-display text-[clamp(24px,3vw,32px)] font-medium leading-[1.15] tracking-[-0.015em] text-ink"
            >
              {block.slice(3)}
            </h2>
          );
        }

        const lines = block.split('\n').map((l) => l.trim());
        if (lines.every((l) => l.startsWith('- '))) {
          return (
            <ul key={i} className="mb-7 space-y-3 border-l-2 border-ember/50 pl-5">
              {lines.map((l, j) => (
                <li key={j} className="text-[16.5px] leading-[1.65] text-ink-soft">
                  {renderInline(l.slice(2))}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="mb-7 text-[16.5px] leading-[1.7] text-ink-soft">
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}
