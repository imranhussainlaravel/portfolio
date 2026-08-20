import { about, baseURL, person, social } from "@/resources";

/**
 * Person JSON-LD.
 *
 * Once UI's <Schema> component only emits website/article/blogPosting/
 * techArticle/webPage/organization - there is no `person` variant - so the
 * entity that matters most here has to be hand-rolled.
 *
 * This is the single highest-leverage structured-data addition for ranking on
 * a personal name. Search engines and AI assistants resolve "who is X" against
 * an entity, not a page. `sameAs` is what welds the GitHub and LinkedIn
 * profiles onto the same entity as this site, so signals from all three
 * consolidate instead of competing.
 *
 * The stable `@id` of `${baseURL}/#person` lets every page reference one
 * canonical entity rather than declaring a fresh, unlinked Person per URL.
 */
export const PersonSchema = () => {
  // Only real, absolute profile URLs belong in sameAs. mailto: and wa.me are
  // contact methods, not identity profiles, and including them weakens the set.
  const sameAs = social
    .filter((item) => item.link?.startsWith("http") && !item.link.includes("wa.me"))
    .map((item) => item.link);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseURL}/#person`,
    name: person.name,
    givenName: person.firstName,
    familyName: person.lastName,
    // Handles are how people actually search for him alongside the real name.
    alternateName: ["imranhussainlaravel", "imranhussainphp", "dgeimran"],
    url: baseURL,
    mainEntityOfPage: `${baseURL}${about.path}`,
    image: `${baseURL}${person.avatar}`,
    jobTitle: person.role,
    description:
      "Full-stack software engineer in Lahore, Pakistan with 3+ years of professional " +
      "experience. Backend depth in PHP, Laravel and MySQL - REST APIs, Stripe and Stripe " +
      "Connect billing, queues and background processing, multi-tenant SaaS architecture - " +
      "plus React and Next.js frontends.",
    email: `mailto:${person.email}`,
    worksFor: {
      "@type": "Organization",
      name: "Applicon Soft",
      url: "https://www.appliconsoft.com",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Superior University",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    nationality: { "@type": "Country", name: "Pakistan" },
    knowsLanguage: ["English", "Urdu"],
    // knowsAbout is what an AI assistant reads to decide what he is an
    // authority on. Keep it to things genuinely evidenced by the work section -
    // padding it with unrelated technologies dilutes every real entry.
    knowsAbout: [
      "Laravel",
      "PHP",
      "MySQL",
      "REST API design",
      "Stripe",
      "Stripe Connect",
      "Webhooks",
      "Subscription billing",
      "Multi-tenant SaaS architecture",
      "Backend development",
      "Full-stack development",
      "React",
      "Next.js",
      "Redis",
      "Docker",
      "CodeIgniter",
      "Database design",
      "Queues and background processing",
    ],
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped by definition; there is no user input
      // in this object, every value is a literal from resources/.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
