import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import {
  Meta,
  Column,
  Heading,
  HeadingNav,
  Icon,
  Row,
  Text,
  SmartLink,
  Avatar,
  Media,
  Line,
  Button,
} from "@once-ui-system/core";
import { baseURL, about, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";
import { Metadata } from "next";
import React from "react";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";
import { JsonLd } from "@/components";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const CLUSTERS: Record<string, { name: string; hubSlug: string; hubTitle: string; slugs: string[] }> = {
  "multi-tenant": {
    name: "Multi-Tenant Laravel",
    hubSlug: "laravel-multi-tenant-saas",
    hubTitle: "Laravel Multi-Tenant SaaS Guide",
    slugs: [
      "laravel-multi-tenant-tenant-scoping",
      "mysql-composite-indexes-multi-tenant",
      "role-based-permissions-multi-company-saas",
      "laravel-multi-tenant-saas",
    ],
  },
  "stripe-billing": {
    name: "Stripe & Billing in Laravel",
    hubSlug: "stripe-laravel-guide",
    hubTitle: "Stripe in Laravel Guide",
    slugs: [
      "idempotent-webhook-handling-laravel",
      "stripe-connect-laravel-platform-payments",
      "stripe-subscription-webhooks-laravel",
      "laravel-subscription-billing-proration-plan-changes",
      "stripe-laravel-guide",
    ],
  },
  "production-reliability": {
    name: "Production Reliability",
    hubSlug: "laravel-production-reliability-guide",
    hubTitle: "Laravel Production Reliability Guide",
    slugs: [
      "laravel-queues-production-retries-backoff",
      "laravel-rest-api-design-for-react-frontends",
      "laravel-third-party-api-integration-resilience",
      "codeigniter-to-laravel-strangler-migration",
      "laravel-production-reliability-guide",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "blog", "posts"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  const title = post.metadata.seoTitle || post.metadata.title;
  const description = post.metadata.summary;
  const image = post.metadata.image || `/api/og/generate?title=${encodeURIComponent(title)}`;
  const url = `https://imranhussainportfolio.com${blog.path}/${post.slug}`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.metadata.publishedAt,
      modifiedTime: post.metadata.dateModified || post.metadata.publishedAt,
      authors: [person.name],
      images: [{ url: image, alt: title, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Blog({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const currentCluster = Object.values(CLUSTERS).find((c) => c.slugs.includes(post.slug));
  const clusterSlugs = currentCluster
    ? currentCluster.slugs.filter((s) => s !== post.slug)
    : [];

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Row fillWidth>
      <Row style={{ maxWidth: "12rem" }} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@graph": [
                {
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
                      name: "Blog",
                      item: `${baseURL}/blog`,
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: post.metadata.title,
                      item: `${baseURL}/blog/${post.slug}`,
                    },
                  ],
                },
                {
                  "@type": "BlogPosting",
                  "@id": `${baseURL}/blog/${post.slug}#article`,
                  headline: post.metadata.title,
                  description: post.metadata.summary,
                  datePublished: post.metadata.publishedAt,
                  dateModified: post.metadata.dateModified || post.metadata.publishedAt,
                  author: { "@id": `${baseURL}/#person` },
                  publisher: { "@id": `${baseURL}/#person` },
                  image: post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `${baseURL}${blog.path}/${post.slug}`,
                  },
                  keywords: ["Laravel", "PHP", "MySQL", "Backend Architecture", "APIs"],
                },
              ],
            }}
          />
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href="/blog">
              <Text variant="label-strong-m">Blog</Text>
            </SmartLink>
            <Column horizontal="center" gap="4" marginBottom="12">
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)} · {readingTime} min read
              </Text>
              {post.metadata.dateModified && post.metadata.dateModified !== post.metadata.publishedAt && (
                <Text variant="body-default-xs" onBackground="brand-weak">
                  Updated {formatDate(post.metadata.dateModified)}
                </Text>
              )}
            </Column>
            <Heading variant="display-strong-m">{post.metadata.title}</Heading>
            {post.metadata.subtitle && (
              <Text 
                variant="body-default-l" 
                onBackground="neutral-weak" 
                align="center"
                style={{ fontStyle: 'italic' }}
              >
                {post.metadata.subtitle}
              </Text>
            )}
          </Column>
          <Row marginBottom="32" horizontal="center">
            <SmartLink href="/about" unstyled>
              <Row gap="16" vertical="center">
                <Avatar size="s" src={person.avatar} />
                <Text variant="label-default-m" onBackground="brand-weak">
                  {person.name}
                </Text>
              </Row>
            </SmartLink>
          </Row>
          {post.metadata.image && (
            <Media
              src={post.metadata.image}
              alt={post.metadata.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 100vw, 768px"
              className="media-frame"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}
          <Column as="article" maxWidth="s">
            <CustomMDX source={post.content} />
          </Column>
          
          <ShareSection 
            title={post.metadata.title} 
            url={`${baseURL}${blog.path}/${post.slug}`} 
          />

          {/* Standout CTA Block (Audit 4.20) */}
          <Column
            fillWidth
            maxWidth="s"
            gap="16"
            padding="24"
            radius="l"
            background="surface"
            border="brand-alpha-weak"
            marginTop="24"
            marginBottom="16"
            horizontal="center"
            align="center"
          >
            <Heading as="h3" variant="heading-strong-m" align="center">
              Looking for a Laravel &amp; PHP Engineer?
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center">
              I build robust backends, multi-tenant architectures, and Stripe billing pipelines. Open to remote engineering roles and contract work.
            </Text>
            <Row gap="12" wrap horizontal="center" marginTop="8">
              <Button href="/imran-hussain-laravel-software-engineer-cv.pdf" variant="secondary" size="s">
                Download CV
              </Button>
              <Button href={`mailto:${person.email}`} variant="primary" size="s" prefixIcon="email">
                Get in touch
              </Button>
            </Row>
          </Column>

          <Column fillWidth gap="24" horizontal="center" marginTop="40">
            <Line style={{ maxWidth: 40 }} />
            <Row fillWidth horizontal="between" vertical="center" wrap gap="8">
              <Heading as="h2" id="more-on-topic" variant="heading-strong-xl">
                {currentCluster ? `More on ${currentCluster.name}` : "Recent posts"}
              </Heading>
              {currentCluster && (
                <SmartLink href={`/blog/${currentCluster.hubSlug}`}>
                  <Text variant="label-default-s" onBackground="brand-strong">
                    {currentCluster.hubTitle} →
                  </Text>
                </SmartLink>
              )}
            </Row>
            <Posts
              include={clusterSlugs.length > 0 ? clusterSlugs : undefined}
              exclude={[post.slug]}
              range={[1, 3]}
              columns="2"
              thumbnail
              direction="column"
            />
          </Column>
          <ScrollToHash />
        </Column>
      </Row>
      <Column
        style={{ maxWidth: "12rem" }}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        m={{ hide: true }}
      >
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}
