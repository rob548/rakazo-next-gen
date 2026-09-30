import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';

/** Loading skeleton — ruled rows pulsing in the editorial layout. */
export function BlogSkeleton() {
  return (
    <div aria-busy="true" aria-label="loading posts">
      {/* featured skeleton */}
      <div className="animate-pulse rounded-[10px] border border-hairline bg-paper-deep p-8 md:p-12">
        <div className="h-5 w-48 rounded-full bg-hairline" />
        <div className="mt-8 h-9 w-3/4 rounded bg-hairline" />
        <div className="mt-4 h-9 w-1/2 rounded bg-hairline" />
        <div className="mt-6 h-4 w-full max-w-[520px] rounded bg-hairline" />
        <div className="mt-3 h-4 w-2/3 max-w-[440px] rounded bg-hairline" />
      </div>
      {/* ruled row skeletons */}
      <div className="mt-12 border-t border-hairline">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="grid animate-pulse gap-3 border-b border-hairline py-8 md:grid-cols-[130px_1fr_auto] md:gap-8 md:px-4"
          >
            <div className="h-4 w-20 rounded bg-hairline" />
            <div>
              <div className="h-6 w-2/3 rounded bg-hairline" />
              <div className="mt-3 h-4 w-full max-w-[480px] rounded bg-hairline" />
            </div>
            <div className="h-6 w-16 rounded-full bg-hairline" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Empty state — no posts published yet. */
export function BlogEmpty() {
  return (
    <div className="rounded-[10px] border border-dashed border-hairline py-20 text-center">
      <p className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-ember">
        // EMPTY WORKSHOP
      </p>
      <p className="mt-5 font-display text-[28px] font-medium tracking-[-0.015em] text-ink">
        No posts yet.
      </p>
      <p className="mx-auto mt-3 max-w-[420px] text-[15.5px] leading-[1.6] text-ink-soft">
        The first field note is still being written. Check back soon — we ship more often
        than we blog.
      </p>
    </div>
  );
}

/** Error state — query failed. */
export function BlogError() {
  return (
    <div className="rounded-[10px] border border-hairline bg-paper-deep py-20 text-center">
      <p className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-ember">
        // SIGNAL LOST
      </p>
      <p className="mt-5 font-display text-[28px] font-medium tracking-[-0.015em] text-ink">
        The workshop didn’t answer.
      </p>
      <p className="mx-auto mt-3 max-w-[420px] text-[15.5px] leading-[1.6] text-ink-soft">
        Something went wrong fetching the posts. Refresh the page — or read the source
        instead, it never goes down.
      </p>
      <div className="mt-8 flex justify-center">
        <Link to="/open-source">
          <Button variant="ghost-light">Browse the repo instead</Button>
        </Link>
      </div>
    </div>
  );
}
