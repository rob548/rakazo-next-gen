import { count } from "drizzle-orm";
import * as schema from "@db/schema";
import type { InsertContactMessage, InsertWaitlistEntry } from "@db/schema";
import { getDb } from "./connection";

export async function createWaitlistEntry(data: InsertWaitlistEntry) {
  // Idempotent on duplicate email — re-joining just refreshes the row.
  await getDb()
    .insert(schema.waitlistEntries)
    .values(data)
    .onDuplicateKeyUpdate({
      set: { name: data.name ?? null, useCase: data.useCase ?? null },
    });
}

export async function countWaitlistEntries() {
  const rows = await getDb()
    .select({ value: count() })
    .from(schema.waitlistEntries);
  return rows.at(0)?.value ?? 0;
}

export async function createContactMessage(data: InsertContactMessage) {
  await getDb().insert(schema.contactMessages).values(data);
}
