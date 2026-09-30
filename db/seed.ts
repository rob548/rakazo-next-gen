import { getDb } from "../api/queries/connection";
import { blogPosts } from "./schema";

const posts = [
  {
    slug: "why-bots-need-computers",
    title: "Why bots need computers, not just chat",
    excerpt:
      "Chat is a fine interface for answers. Work needs a mouse, a browser, and a file system. Here is the bet Rakazo makes.",
    tag: "engineering",
    readingTime: "6 min",
    publishedAt: new Date("2026-09-22T09:00:00Z"),
    content: `Most AI tools stop at the chat box. You ask, it answers, and then the answer sits there while you do the actual work.

Rakazo starts from a different premise: a teammate is only useful if it can touch the same tools you touch. That means a real browser, a real terminal, a real file system — running in a sandboxed container that belongs to the bot, not to a shared demo environment.

## What a computer unlocks

When the Inbox Manager sweeps your mail, it is not calling an API with a narrow schema. It opens Gmail in a browser, reads threads the way you would, archives newsletters, and parks drafts for your review. When Bug Triage reproduces a report, it drives a headless browser against your staging deploy and attaches the exact steps to the issue.

## The safety model

A bot with a computer is powerful, so the defaults matter. Every action lands in an audit log you own. Approval gates decide what a bot may do alone and what it must ask about first. And because everything is self-hosted, the credentials never leave your machine.

Computers are the bet. Ownership is the guardrail.`,
  },
  {
    slug: "routines-in-plain-markdown",
    title: "Routines in plain Markdown",
    excerpt:
      "Show a bot a workflow once and it saves the routine as a Markdown file you can read, edit, diff, and commit. No black boxes.",
    tag: "product",
    readingTime: "4 min",
    publishedAt: new Date("2026-09-10T09:00:00Z"),
    content: `Automation tools love proprietary formats. Visual graphs you cannot diff, JSON blobs you cannot read, configs locked behind a dashboard.

Rakazo routines are plain Markdown files. Show a bot a workflow once — "every weekday at 6am, sweep the inbox, archive newsletters, park anything that needs my read" — and it writes a routine file you can open in any editor.

## Why text wins

- **Reviewable.** A routine is a pull request like any other change.
- **Portable.** Commit it, share it, fork it. Routines travel with the repo.
- **Honest.** If you cannot read what your bot does every morning, you do not really know what your bot does every morning.

The file is the interface. Everything else is a convenience layer on top.`,
  },
  {
    slug: "approval-gates-and-audit-logs",
    title: "Approval gates that actually hold",
    excerpt:
      "Autonomy without accountability is a liability. How Rakazo decides what a bot may do alone — and proves what it did.",
    tag: "security",
    readingTime: "5 min",
    publishedAt: new Date("2026-08-28T09:00:00Z"),
    content: `The question everyone asks about AI teammates is the right one: what stops it from doing something I did not want?

Rakazo's answer is boring on purpose. Every bot runs with an explicit permission set: what it may do alone, and what it must ask about. Sending a reply you pre-approved the shape of — fine. Sending a contract — it asks, with a diff and a summary, and it waits.

## The audit log is the product

Every action lands in an append-only audit log on your machine. Not a vendor dashboard. Your machine, your file, your retention policy.

When the Expense Manager files a report, the log shows the nine receipts it matched, the one it was unsure about, and the moment you approved the guess. Accountability is not a feature we bolted on. It is the reason people trust the bots with real work.`,
  },
  {
    slug: "any-model-your-key",
    title: "Any model, your key, your spend",
    excerpt:
      "Point each bot at Claude, GPT, Grok, or a local model. The cheap one triages, the smart one writes. Here is how model routing works.",
    tag: "engineering",
    readingTime: "5 min",
    publishedAt: new Date("2026-08-14T09:00:00Z"),
    content: `Lock-in is the quiet tax of AI tooling. The platform picks the model, the platform picks the price, and you find out at the end of the month.

Rakazo inverts it. You bring your own keys — Claude, GPT, Grok, or a local model through OpenRouter — and you assign models per bot.

## Route by job, not by brand

The Inbox Manager triages hundreds of threads a day. That is a cheap-model job. The Chief of Staff writes your Monday briefing in your voice. That is a smart-model job. Splitting them cuts most teams' model spend by more than half in our testing.

Your keys, your model, your invoice. We never see any of it — that is the point of self-hosting.`,
  },
];

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  for (const post of posts) {
    await db
      .insert(blogPosts)
      .values(post)
      .onDuplicateKeyUpdate({ set: { title: post.title } });
  }
  console.log(`Seeded ${posts.length} blog posts.`);

  console.log("Done.");
  process.exit(0); // close MySQL connection pool
}

seed();
