import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { formatPostDate } from './format';
import type { BlogPostListItem } from './types';

/** Tag pill — mono, ember-soft tint on light surfaces. */
export function TagPill({ tag }: { tag: string }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-hairline bg-ember-soft/40 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
      {tag}
    </span>
  );
}

/** Featured first post — large editorial card. */
export function FeaturedCard({ post }: { post: BlogPostListItem }) {
  return (
    <Reveal>
      <Link
        to={`/blog/${post.slug}`}
        className="group block rounded-[10px] border border-hairline bg-paper-deep p-8 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-hard md:p-12"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <TagPill tag={post.tag} />
            <span className="font-mono text-[12px] text-ink-faint">
              featured · {formatPostDate(post.publishedAt)} · {post.readingTime}
            </span>
          </div>
          <ArrowUpRight
            className="h-5 w-5 text-ink-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
            aria-hidden
          />
        </div>
        <h2 className="mt-6 max-w-[720px] font-display text-[clamp(28px,4vw,44px)] font-medium leading-[1.12] tracking-[-0.015em] text-ink transition-colors group-hover:text-ember">
          {post.title}
        </h2>
        <p className="mt-4 max-w-[640px] text-[16.5px] leading-[1.65] text-ink-soft">
          {post.excerpt}
        </p>
        <p className="mt-8 font-mono text-[12px] tracking-[0.06em] text-ink-faint">
          $ cat /blog/{post.slug}.md
        </p>
      </Link>
    </Reveal>
  );
}

/** Remaining posts — ruled index rows. */
export function PostRow({ post, index }: { post: BlogPostListItem; index: number }) {
  return (
    <Reveal delay={Math.min(index, 6) * 0.05}>
      <Link
        to={`/blog/${post.slug}`}
        className="group grid gap-3 border-b border-hairline py-8 transition-colors duration-200 hover:bg-ink/[0.03] md:grid-cols-[130px_1fr_auto] md:items-start md:gap-8 md:px-4"
      >
        <div className="flex items-center gap-3 md:block">
          <span className="font-mono text-[12px] text-ink-faint">
            {String(index + 2).padStart(2, '0')}
          </span>
          <span className="font-mono text-[12px] text-ink-faint md:mt-2 md:block">
            {formatPostDate(post.publishedAt)}
          </span>
        </div>
        <div>
          <h3 className="font-sans text-[20px] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-ember">
            {post.title}
          </h3>
          <p className="mt-2 max-w-[560px] text-[15px] leading-[1.6] text-ink-soft">
            {post.excerpt}
          </p>
        </div>
        <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-2.5">
          <TagPill tag={post.tag} />
          <span className="font-mono text-[11.5px] text-ink-faint">{post.readingTime}</span>
        </div>
      </Link>
    </Reveal>
  );
}
