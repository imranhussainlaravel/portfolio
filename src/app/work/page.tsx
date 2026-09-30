import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
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
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Projects />
    </Column>
  );
}
