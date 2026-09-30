import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { findBlogPostBySlug, listBlogPosts } from "./queries/blog";

export const blogRouter = createRouter({
  list: publicQuery.query(() => listBlogPosts()),
  bySlug: publicQuery
    .input(z.object({ slug: z.string().min(1).max(255) }))
    .query(({ input }) => findBlogPostBySlug(input.slug)),
});
