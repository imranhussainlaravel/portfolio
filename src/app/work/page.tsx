import { Column, Heading, Meta } from "@once-ui-system/core";
import { JsonLd } from "@/components";
import { baseURL, about, person, work, keywords } from "@/resources";
import { Projects } from "@/components/work/Projects";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Laravel Projects & SaaS Case Studies | Imran Hussain";
  const description = "Explore backend case studies by Imran Hussain. See how I built robust Laravel architectures for POS systems, business formation platforms, and time-tracking SaaS.";
  return {
    title,
    description,
    alternates: {
      canonical: `${baseURL}/work`,
    },
    openGraph: {
      title,
      description,
      url: `${baseURL}/work`,
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
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Projects />
    </Column>
  );
}
