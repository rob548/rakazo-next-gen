import { authRouter } from "./auth-router";
import { blogRouter } from "./blog-router";
import { formsRouter } from "./forms-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  blog: blogRouter,
  forms: formsRouter,
});

export type AppRouter = typeof appRouter;
