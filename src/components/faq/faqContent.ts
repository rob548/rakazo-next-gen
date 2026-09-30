/**
 * FAQ content per /design/faq.md — 16 questions across 5 groups, candid voice.
 * (src/data/faq.ts carries a shorter 13-entry set with different copy; the page
 * design specifies this exact list, so it lives with the page.)
 */
export interface FaqItem {
  q: string;
  a: string;
  /** optional trailing link rendered after the answer */
  link?: { text: string; to: string };
}

export interface FaqGroupData {
  id: string;
  /** mono index prefix, e.g. `G.01` */
  letter: string;
  label: string;
  entries: FaqItem[];
}

export const faqGroups: FaqGroupData[] = [
  {
    id: 'general',
    letter: 'G',
    label: 'General',
    entries: [
      {
        q: 'What is Rakazo?',
        a: 'An open-source platform for persistent AI teammates. Each bot gets its own conversations, memory, routines, and a sandboxed computer. You give it a job; it works and reports back.',
      },
      {
        q: 'Is it really free?',
        a: 'Apache-2.0, self-hosting free forever. You pay your model provider for tokens. Cloud, when it ships, is paid convenience — never a gate.',
      },
      {
        q: 'Who makes it?',
        a: 'Inbox Zero Inc., started by Elie Steinbock. The repo, roadmap, and decisions are public.',
      },
      {
        q: 'Is it production-ready?',
        a: "It's beta. Teams run it daily, but expect sharp edges — the changelog shows what's settling.",
      },
      {
        q: 'How is Rakazo different from OpenAI Dots?',
        a: "Dots are managed and gated — ChatGPT Pro or Business Premium, OpenAI models, OpenAI's machines. Rakazo is self-hosted and open: your models, your machines, your rules. Memory and routines are Markdown files you own, not state you're renting.",
      },
      {
        q: 'Can my bots share one computer?',
        a: "They could — but they don't by default. Each Rakazo bot gets its own sandboxed container, so a bad prompt or a compromised tool stays inside one blast radius. Sharing is a choice you make, not the default you're given.",
      },
    ],
  },
  {
    id: 'security',
    letter: 'S',
    label: 'Security & data',
    entries: [
      {
        q: 'Where do my credentials live?',
        a: "Encrypted vault on your machine. Bots get scoped access inside their sandbox. Nothing syncs to us — there is no 'us' to sync to.",
      },
      {
        q: 'Can a bot email someone without asking?',
        a: 'Only if you set send_email: auto. Default is ask. Irreversible actions always require approval unless you explicitly loosen it.',
      },
      {
        q: "What's in the audit log?",
        a: 'Every action: what, when, which tool, what it cost, what you approved. Append-only, on your disk, plain text.',
      },
      {
        q: 'Can the bot edit its own routine or the log?',
        a: "Routines: yes, with diffs you review. Audit log: never — it's append-only by design.",
      },
    ],
  },
  {
    id: 'self-hosting',
    letter: 'H',
    label: 'Self-hosting',
    entries: [
      {
        q: 'What do I need to run it?',
        a: 'Docker, a model key, 4 GB free RAM. macOS, Linux, or Windows with WSL2.',
        link: { text: 'Full walkthrough → /self-host', to: '/self-host' },
      },
      {
        q: 'Can I move a workspace to another machine?',
        a: "It's a folder. rsync it, git it, back it up however you like.",
      },
      {
        q: 'Does it phone home?',
        a: 'No telemetry by default. One opt-in anonymous counter (installs), off with a single flag.',
      },
    ],
  },
  {
    id: 'models',
    letter: 'M',
    label: 'Models & cost',
    entries: [
      {
        q: 'Which models work?',
        a: 'Claude, GPT, Grok, Gemini, anything on OpenRouter, or local models. Per-bot, swappable anytime.',
      },
      {
        q: 'What does a bot cost to run?',
        a: 'Depends on the job. A daily inbox sweep is cents. A bot browsing all day is dollars. The audit log tracks token spend per bot.',
      },
      {
        q: 'Can different bots use different models?',
        a: "Yes — cheap model for triage, strong model for drafting. One line in the bot's config.",
      },
    ],
  },
  {
    id: 'cloud',
    letter: 'C',
    label: 'Cloud',
    entries: [
      {
        q: 'When is cloud coming?',
        a: "When it's boring. Managed sandboxes, your keys, your model spend, and zero migration — same workspace, same files.",
      },
      {
        q: 'Will self-hosting ever be paywalled?',
        a: "No. Apache-2.0 doesn't work retroactively and we wouldn't want it to.",
      },
    ],
  },
];

export const totalQuestions = faqGroups.reduce((n, g) => n + g.entries.length, 0);
