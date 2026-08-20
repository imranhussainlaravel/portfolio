import { baseURL } from "@/resources";

/**
 * Robots policy.
 *
 * The previous version emitted a bare `User-Agent: *` with no directives at all.
 * That is legal and most crawlers treat it as "crawl everything", but it states
 * nothing explicitly, and some AI crawlers treat an absent Allow as a reason to
 * be conservative. Everything below is now explicit.
 *
 * AI crawlers are allowed ON PURPOSE. There are two distinct kinds and they do
 * different jobs, so both are listed:
 *
 *   - Training crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended,
 *     Applebot-Extended, meta-externalagent) feed model training corpora. They
 *     do not send traffic back, but they are how a name becomes something a
 *     model knows about.
 *   - Retrieval/citation crawlers (OAI-SearchBot, ChatGPT-User, Claude-User,
 *     Claude-SearchBot, PerplexityBot, Perplexity-User) fetch pages at answer
 *     time and cite them. These DO drive referral traffic and are the ones that
 *     matter for "someone asks an assistant who Imran Hussain is".
 *
 * If you ever want to stop feeding training corpora while keeping citations,
 * move the training group to `disallow: "/"` and leave the retrieval group.
 */
const AI_CRAWLERS = [
  // Retrieval + citation (recommended to keep allowed - these send traffic back)
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  // Training corpora
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "meta-externalagent",
  "FacebookBot",
  "cohere-ai",
  "YouBot",
  "Diffbot",
  "Timpibot",
  "omgili",
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /api/* is OG-image generation and RSS plumbing - no indexable content,
        // and letting crawlers hammer the OG generator wastes render budget.
        disallow: ["/api/"],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
    host: baseURL,
  };
}
