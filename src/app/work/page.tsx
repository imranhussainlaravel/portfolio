import { Column, Heading, Meta } from "@once-ui-system/core";
import { JsonLd } from "@/components";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Laravel Case Studies & SaaS Projects | Imran Hussain";
  const description = "Case studies of Laravel SaaS platforms, REST APIs, Stripe billing and POS systems built by Imran Hussain. Backend architecture, decisions and lessons.";
  return {
    title,
    description,
    alternates: {
      canonical: "https://imranhussainportfolio.com/work",
    },
    openGraph: {
      title,
      description,
      url: "https://imranhussainportfolio.com/work",
      type: "website",
      images: [
        {
          url: `/api/og/generate?title=${encodeURIComponent(title)}`,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og/generate?title=${encodeURIComponent(title)}`],
    },
  };
}

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: baseURL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: work.title,
              item: `${baseURL}${work.path}`,
            },
          ],
        }}
      />
      <Heading as="h1" marginBottom="l" variant="heading-strong-xl" align="center">
        Laravel case studies and SaaS projects
      </Heading>
      <Projects />
    </Column>
  );
}
