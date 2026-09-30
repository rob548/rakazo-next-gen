import { desc, eq } from "drizzle-orm";
import * as schema from "@db/schema";
import { getDb } from "./connection";

export async function listBlogPosts() {
  return getDb()
    .select()
    .from(schema.blogPosts)
    .orderBy(desc(schema.blogPosts.publishedAt));
}

export async function findBlogPostBySlug(slug: string) {
  const rows = await getDb()
    .select()
    .from(schema.blogPosts)
    .where(eq(schema.blogPosts.slug, slug))
    .limit(1);
  return rows.at(0);
}
