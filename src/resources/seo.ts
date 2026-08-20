/**
 * Per-route keyword sets.
 *
 * HONEST CAVEAT, so nobody over-invests here later: Google has ignored the
 * `<meta name="keywords">` tag since 2009 and says so publicly. Bing and Yandex
 * give it minimal weight. This file is cheap and harmless, but it is NOT what
 * makes pages rank - titles, descriptions, on-page copy, the Person schema in
 * components/PersonSchema.tsx, and inbound links do that work.
 *
 * The real value of writing these down is editorial: it forces one explicit
 * list of what each page is actually *about*, which then guides the title,
 * the description, and the headings.
 *
 * Terms are grouped by how winnable they are:
 *   TIER 1 - name + qualifier. Low competition, high intent, realistically #1.
 *   TIER 2 - role + location. Moderate competition, realistically top-10.
 *   TIER 3 - technical long-tail. Won through blog posts, not through meta tags.
 *
 * Bare "software engineer" / "full stack developer" are deliberately absent.
 * Those are among the most contested queries on the web and no personal
 * portfolio ranks for them; including them dilutes the set for no gain.
 */

const NAME_TERMS = [
  "Imran Hussain",
  "Imran Hussain developer",
  "Imran Hussain Laravel",
  "Imran Hussain PHP",
  "Imran Hussain full stack",
  "Imran Hussain software engineer",
  "Imran Hussain Lahore",
  "imranhussainlaravel",
  "imranhussainphp",
];

const ROLE_TERMS = [
  "Laravel developer Lahore",
  "Laravel developer Pakistan",
  "PHP developer Lahore",
  "full stack developer Lahore",
  "full stack Laravel developer",
  "Laravel backend engineer",
  "SaaS backend developer",
  "remote Laravel developer",
];

const TECH_TERMS = [
  "Laravel REST API development",
  "Laravel Stripe integration",
  "Stripe Connect Laravel",
  "Laravel subscription billing",
  "Laravel webhook handling",
  "multi-tenant SaaS Laravel",
  "Laravel queues and jobs",
  "MySQL database design",
  "Laravel React Next.js",
  "CodeIgniter to Laravel",
];

export const keywords: Record<string, string[]> = {
  "/": [...NAME_TERMS, ...ROLE_TERMS, ...TECH_TERMS.slice(0, 5)],
  "/about": [...NAME_TERMS, ...ROLE_TERMS, "Laravel engineer CV", "hire Laravel developer"],
  "/work": [
    ...NAME_TERMS.slice(0, 5),
    "Laravel portfolio projects",
    "SaaS case study Laravel",
    "Stripe billing case study",
    ...TECH_TERMS,
  ],
  "/blog": [
    ...NAME_TERMS.slice(0, 4),
    "Laravel blog",
    "Laravel tutorials",
    "backend architecture blog",
    ...TECH_TERMS,
  ],
};

/** Fallback for dynamic routes that build their own list from post metadata. */
export const baseKeywords = [...NAME_TERMS.slice(0, 5), ...TECH_TERMS.slice(0, 6)];
