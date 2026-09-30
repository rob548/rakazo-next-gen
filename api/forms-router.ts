import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import {
  countWaitlistEntries,
  createContactMessage,
  createWaitlistEntry,
} from "./queries/forms";

export const formsRouter = createRouter({
  joinWaitlist: publicQuery
    .input(
      z.object({
        email: z.string().email().max(320),
        name: z.string().max(255).optional(),
        useCase: z.string().max(2000).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      await createWaitlistEntry(input);
      return { ok: true as const };
    }),
  waitlistCount: publicQuery.query(() => countWaitlistEntries()),
  sendContact: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email().max(320),
        message: z.string().min(1).max(5000),
      }),
    )
    .mutation(async ({ input }) => {
      await createContactMessage(input);
      return { ok: true as const };
    }),
});
