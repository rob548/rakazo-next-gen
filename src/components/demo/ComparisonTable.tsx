import type { ComparisonRow } from '@/data/changelog';
import { cn } from '@/lib/utils';

/**
 * Comparison table: hairline row rules, highlighted Rakazo column
 * (ember border + tinted fill). Horizontally scrollable on mobile.
 */
export default function ComparisonTable({
  rows,
  dark = false,
  className,
}: {
  rows: ComparisonRow[];
  dark?: boolean;
  className?: string;
}) {
  const cols: { key: keyof Omit<ComparisonRow, 'feature'>; label: string }[] = [
    { key: 'rakazo', label: 'Rakazo' },
    { key: 'grokBot', label: 'Grok Bot' },
    { key: 'lindy', label: 'Lindy' },
    { key: 'zapier', label: 'Zapier Central' },
  ];

  const cellVal = (v: string) => {
    if (v === '✓')
      return <span className={cn('font-mono', dark ? 'text-phosphor' : 'text-ink')}>✓</span>;
    if (v === '—') return <span className={cn('font-mono', dark ? 'text-bone-dim' : 'text-ink-faint')}>—</span>;
    return <span className="font-mono text-[12.5px]">{v}</span>;
  };

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table
        className={cn(
          'w-full min-w-[640px] border-collapse text-[14px]',
          dark ? 'text-bone' : 'text-ink',
        )}
      >
        <thead>
          <tr className={cn('border-b', dark ? 'border-hairline-dark' : 'border-hairline')}>
            <th className={cn('sticky left-0 bg-inherit py-3 pr-4 text-left font-mono text-[12px] font-normal uppercase tracking-[0.14em]', dark ? 'bg-carbon text-bone-dim' : 'bg-paper text-ink-faint')}>
              &nbsp;
            </th>
            {cols.map((c) => (
              <th
                key={c.key}
                className={cn(
                  'px-4 py-3 text-left font-sans text-[14px] font-semibold',
                  c.key === 'rakazo' &&
                    cn('border-x border-t border-ember', dark ? 'bg-carbon-3 text-ember' : 'bg-ember-soft/40 text-ember'),
                )}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={row.feature}
              className={cn('border-b', dark ? 'border-hairline-dark' : 'border-hairline')}
            >
              <td
                className={cn(
                  'sticky left-0 py-3.5 pr-4 font-sans text-[14.5px] font-medium',
                  dark ? 'bg-carbon text-bone' : 'bg-paper text-ink',
                )}
              >
                {row.feature}
              </td>
              {cols.map((c) => (
                <td
                  key={c.key}
                  className={cn(
                    'px-4 py-3.5',
                    dark ? 'text-bone-dim' : 'text-ink-soft',
                    c.key === 'rakazo' &&
                      cn(
                        'border-x border-ember',
                        ri === rows.length - 1 && 'border-b',
                        dark ? 'bg-carbon-3 text-bone' : 'bg-ember-soft/40 text-ink',
                      ),
                  )}
                >
                  {cellVal(row[c.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
