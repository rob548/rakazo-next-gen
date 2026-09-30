import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../../../api/router';

/** Post shapes inferred from the tRPC router — never hand-written. */
type RouterOutputs = inferRouterOutputs<AppRouter>;

export type BlogPostListItem = RouterOutputs['blog']['list'][number];
export type BlogPostFull = RouterOutputs['blog']['bySlug'];
