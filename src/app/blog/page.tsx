import { Column, Heading, Text, Meta } from "@once-ui-system/core";
import { JsonLd } from "@/components";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Laravel & PHP Technical Blog | Imran Hussain";
  const description = "Technical articles, tutorials, and deep dives on Laravel, PHP, MySQL, and backend architecture by software engineer Imran Hussain.";
  return {
    title,
    description,
    alternates: {
      canonical: "https://imranhussainportfolio.com/blog",
    },
    openGraph: {
      title,
      description,
      url: "https://imranhussainportfolio.com/blog",
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

export default function Blog() {
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
              name: blog.title,
              item: `${baseURL}${blog.path}`,
            },
          ],
        }}
      />
      <Column marginLeft="24" marginBottom="l">
        <Heading as="h1" variant="heading-strong-xl" marginBottom="8">
          {blog.title}
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Technical articles, tutorials, and deep dives. I write about building SaaS backends with Laravel, PHP, and MySQL, handling Stripe payments, and designing multi-tenant platforms.
        </Text>
      </Column>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        <Mailchimp marginBottom="l" />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Earlier posts
        </Heading>
        <Posts range={[4]} columns="2" />
      </Column>
    </Column>
  );
}
