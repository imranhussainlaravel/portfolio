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
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseURL}/#website`,
        "url": `${baseURL}/`,
        "name": "Imran Hussain",
        "inLanguage": "en",
        "publisher": { "@id": `${baseURL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${baseURL}/#person`,
        "name": person.name,
        "givenName": person.firstName,
        "familyName": person.lastName,
        "alternateName": ["imranhussainlaravel", "imranhussainphp", "dgeimran"],
        "url": `${baseURL}/`,
        "mainEntityOfPage": `${baseURL}${about.path}`,
        "image": `${baseURL}${person.avatar}`,
        "jobTitle": "Software Engineer (Laravel & PHP)",
        "description":
          "Software engineer in Lahore, Pakistan building Laravel and PHP SaaS backends, REST APIs and Stripe Connect billing.",
        "email": `mailto:${person.email}`,
        "worksFor": {
          "@type": "Organization",
          "name": "Applicon Soft",
          "url": "https://www.appliconsoft.com",
        },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Superior University",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lahore",
            "addressCountry": "PK",
          },
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Lahore",
          "addressRegion": "Punjab",
          "addressCountry": "PK",
        },
        "nationality": { "@type": "Country", name: "Pakistan" },
        "knowsLanguage": ["English", "Urdu"],
        "knowsAbout": [
          "Laravel",
          "PHP",
          "MySQL",
          "REST APIs",
          "Stripe Connect",
          "Multi-tenant SaaS",
          "Queues and webhooks",
          "React",
          "Next.js",
          "Redis",
          "Docker",
        ],
        "sameAs": sameAs,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
};
