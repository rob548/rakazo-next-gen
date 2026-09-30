/**
 * Page-specific drawer content for the Bots roster: a two-sentence pitch and a
 * 5-line sample Markdown routine per template. Threads, tools, avatars and
 * status lines come from `@/data/bots` (consumed as-is).
 */
export interface DrawerContent {
  pitch: string;
  routineFile: string;
  routine: string[];
}

export const drawerContent: Record<string, DrawerContent> = {
  'chief-of-staff': {
    pitch:
      'One brain across your calendar, inbox, and follow-ups, keeping the day coherent while you do the actual work. It interviews you about your priorities once, then protects them like a chief of staff who never sleeps.',
    routineFile: 'routines/chief-of-staff.md',
    routine: [
      '- sweep calendar conflicts at 7am weekdays',
      '- decline low-signal invites with a polite note',
      '- block 90m focus time before any new meeting',
      '- draft the friday briefing from the week\'s threads',
      '- escalate double-bookings, never resolve them silently',
    ],
  },
  'sales-outbound': {
    pitch:
      'Researches every account before it writes a word, drafts sequences in your voice, and logs everything to the CRM without being asked. It never sprays and never prays — and angry replies always land in your drafts, not the prospect\'s inbox.',
    routineFile: 'routines/sales-outbound.md',
    routine: [
      '- pull new pipeline accounts each morning',
      '- research each account before drafting anything',
      '- draft follow-ups keyed to the last reply',
      '- log every touch to the crm',
      '- hold hostile replies for human review, always',
    ],
  },
  'inbox-manager': {
    pitch:
      'Sweeps newsletters, drafts replies to anything that looks human, and flags the handful of threads that actually need you. You keep the final send — it never ships a reply you haven\'t seen unless you tell it to.',
    routineFile: 'routines/inbox-manager.md',
    routine: [
      '- archive newsletters and notifications hourly',
      '- draft replies to anything from a human',
      '- flag senders on the vip list immediately',
      '- never send without approval unless scope says auto',
      '- summarize the sweep in one morning note',
    ],
  },
  'account-manager': {
    pitch:
      'Watches every account\'s pulse — usage, tickets, renewal dates — and drafts check-ins before silence becomes churn. Renewals never sneak up because it started worrying about them ninety days early.',
    routineFile: 'routines/account-manager.md',
    routine: [
      '- scan health scores for every account daily',
      '- flag usage drops over 25% week-over-week',
      '- draft renewal check-ins 90 days out',
      '- reference the last support ticket in every draft',
      '- escalate churn risk to you, not the customer',
    ],
  },
  'talent-scout': {
    pitch:
      'Reads two hundred profiles so you interview four. It screens inbound against your rubric, drafts outreach in your voice, and sends polite rejections so the pipeline stays warm instead of haunted.',
    routineFile: 'routines/talent-scout.md',
    routine: [
      '- screen inbound applications against the rubric',
      '- shortlist at most 5 candidates per role',
      '- write a one-paragraph summary per shortlist',
      '- send polite rejections to everyone else',
      '- never contact a candidate without your sign-off',
    ],
  },
  'expense-manager': {
    pitch:
      'Chases receipts, matches transactions, and categorizes spend before the month closes itself into a mess. Anything above the auto-approve line — or anything just plain weird — gets escalated, not paid.',
    routineFile: 'routines/expense-manager.md',
    routine: [
      '- match new transactions to receipts daily',
      '- ping owners for missing receipts after 48h',
      '- categorize spend against the chart of accounts',
      '- escalate anything above the auto-approve line',
      '- close the week every monday with a summary',
    ],
  },
  'bug-triage': {
    pitch:
      'Labels, reproduces, and routes every incoming issue so the queue stays honest. It escalates p0s to on-call immediately and never closes anything without a human saying so.',
    routineFile: 'routines/bug-triage.md',
    routine: [
      '- label new issues by component',
      '- attempt repro in a sandbox with steps attached',
      '- route to the owning team\'s board',
      '- escalate p0 to on-call immediately',
      '- never close without human sign-off',
    ],
  },
  'paid-media': {
    pitch:
      'Watches spend like a hawk across every campaign, pauses what\'s bleeding, and drafts creative variants before fatigue shows up in the numbers. Budget moves above your threshold wait for your approval.',
    routineFile: 'routines/paid-media.md',
    routine: [
      '- check spend against pacing every 4 hours',
      '- pause ad sets past the cpa ceiling',
      '- draft 2 creative variants when fatigue rises',
      '- reallocate budget only within approved pools',
      '- draft the weekly report every friday',
    ],
  },
};
