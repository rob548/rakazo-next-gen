export type ChangeTag = 'NEW' | 'IMPROVED' | 'FIXED' | 'BREAKING';

export interface ChangeRow {
  tag: ChangeTag;
  text: string;
}

export interface Release {
  version: string;
  codename: string;
  date: string;
  anchor: string;
  changes: ChangeRow[];
}

/**
 * Release entries for the /changelog timeline. Newest first.
 * (Page-specific shape: the shared src/data/changelog.ts feeds the
 * home comparison table and doesn't carry per-change tags.)
 */
export const releases: Release[] = [
  {
    version: 'v0.9.2',
    codename: 'paper trail',
    date: '2026-03-14',
    anchor: 'v0-9-2',
    changes: [
      { tag: 'NEW', text: 'Audit log diffs: compare any two days to see exactly what changed.' },
      { tag: 'IMPROVED', text: 'Sandbox boot time down 40% with image pre-warming.' },
      { tag: 'FIXED', text: 'Routines no longer skip daylight-saving mornings.' },
    ],
  },
  {
    version: 'v0.9.0',
    codename: 'second opinion',
    date: '2026-02-28',
    anchor: 'v0-9-0',
    changes: [
      { tag: 'NEW', text: 'Approvals from mobile: approve or deny from the expo app.' },
      { tag: 'NEW', text: 'Per-bot model overrides in one line of config.' },
      { tag: 'BREAKING', text: '`rakazo.yml` renamed to `rakazo.yaml` — auto-migrates on first run.' },
    ],
  },
  {
    version: 'v0.8.4',
    codename: 'quiet hours',
    date: '2026-02-10',
    anchor: 'v0-8-4',
    changes: [
      { tag: 'NEW', text: 'Do-not-disturb windows per bot — it holds non-urgent work until morning.' },
      { tag: 'IMPROVED', text: 'Memory files now dedupe across bots in a workspace.' },
      { tag: 'FIXED', text: 'Browser sandbox no longer leaks cookies between bots.' },
    ],
  },
  {
    version: 'v0.8.0',
    codename: 'first day',
    date: '2026-01-22',
    anchor: 'v0-8-0',
    changes: [
      { tag: 'NEW', text: 'Template interview: bots ask 6 questions and write their own routine.' },
      { tag: 'NEW', text: 'E2B and Daytona sandbox providers.' },
      { tag: 'IMPROVED', text: 'Vault re-encrypts on key rotation without downtime.' },
    ],
  },
];

export const tagStyles: Record<ChangeTag, string> = {
  NEW: 'bg-phosphor/20 text-phosphor',
  IMPROVED: 'bg-amber/15 text-amber',
  FIXED: 'bg-ink-faint/15 text-ink-soft',
  BREAKING: 'bg-ember/10 text-ember',
};

export const chipTextStyles: Record<ChangeTag, string> = {
  NEW: 'text-[#1E7A4B]',
  IMPROVED: 'text-[#8A6414]',
  FIXED: 'text-ink-faint',
  BREAKING: 'text-ember',
};
