import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Meta,
  Line,
} from "@once-ui-system/core";
import { JsonLd } from "@/components";
import { home, about, person, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Imran Hussain | Laravel & PHP Developer in Lahore, Pakistan";
  const description = "Laravel & PHP full-stack engineer in Lahore, Pakistan. 3+ years building SaaS backends, REST APIs and Stripe Connect billing. Open to remote roles.";
  return {
    title,
    description,
    alternates: {
      canonical: "https://imranhussainportfolio.com",
    },
    openGraph: {
      title,
      description,
      url: "https://imranhussainportfolio.com",
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

const faqs = [
  {
    question: "Is Imran available for remote Laravel roles?",
    answer:
      "Yes. I am based in Lahore, Pakistan (UTC+5) and available for full-time or contract remote roles with teams across the US, UK, and Europe, providing 4-6 hours of daily timezone overlap.",
  },
  {
    question: "What does Imran specialize in?",
    answer:
      "My primary specialization is backend architecture using Laravel and PHP: multi-tenant SaaS systems, high-volume REST APIs, asynchronous queue pipelines, and reliable webhook handlers.",
  },
  {
    question: "Which payment systems has Imran integrated?",
    answer:
      "I have deep production experience with Stripe and Stripe Connect, including marketplace split payments, recurring subscription lifecycles, proration logic, and idempotent webhook processing.",
  },
  {
    question: "What is Imran's experience with frontend technologies?",
    answer:
      "While backend-focused, I regularly build full-stack interfaces and client dashboards using React, Next.js, and TypeScript, delivering polished, responsive applications end-to-end.",
  },
];

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "https://imranhussainportfolio.com/#person",
              name: person.name,
              jobTitle: "Laravel & PHP Full-Stack Engineer",
              url: baseURL,
              image: `${baseURL}${person.avatar}`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lahore",
                addressCountry: "Pakistan"
              },
              worksFor: {
                "@type": "Organization",
                name: "Applicon Soft"
              },
              knowsAbout: ["Laravel", "PHP", "MySQL", "REST APIs", "Stripe", "Stripe Connect", "React", "Next.js"],
              sameAs: [
                "https://github.com/imranhussainlaravel",
                "https://www.linkedin.com/in/dgeimran"
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://imranhussainportfolio.com/#website",
              name: home.title,
              url: baseURL
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }
          ]
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading as="h1" wrap="balance" variant="display-strong-l">
              Imran Hussain, Laravel & PHP Full-Stack Engineer in Lahore, Pakistan
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="16">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              Open to remote roles. 3+ years building SaaS backends, REST APIs and Stripe Connect billing at Applicon Soft, with React and Next.js frontends on top.
            </Text>
          </RevealFx>
          <RevealFx translateY="8" delay={0.3} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="brand-weak" variant="heading-default-xs" align="center">
              At a glance: Laravel · PHP · MySQL · REST APIs · Stripe Connect · Queues & Webhooks · React / Next.js<br />
              Lahore, Pakistan (UTC+5) · Open to remote roles
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 3]} />
      </RevealFx>
      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </Row>
            <Row flex={3} paddingX="20">
              <Posts range={[1, 2]} columns="2" />
            </Row>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
      <Projects range={[4]} />

      {/* Section: What I do */}
      <Column fillWidth gap="24" paddingX="16" marginTop="32">
        <Row fillWidth horizontal="between" vertical="center">
          <Heading as="h2" variant="display-strong-xs">
            What I do
          </Heading>
          <Line maxWidth={48} />
        </Row>
        <Row fillWidth gap="16" s={{ direction: "column" }}>
          <Column
            flex={1}
            gap="8"
            padding="20"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
          >
            <Text variant="heading-strong-s" onBackground="neutral-strong">
              Backend &amp; API Architecture
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Robust, maintainable REST APIs and backend services using Laravel and PHP. Strict typing, domain-driven organization, Eloquent optimization, and comprehensive automated test suites.
            </Text>
          </Column>
          <Column
            flex={1}
            gap="8"
            padding="20"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
          >
            <Text variant="heading-strong-s" onBackground="neutral-strong">
              SaaS Billing &amp; Stripe Connect
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              End-to-end payment workflows: multi-party split payouts with Stripe Connect, subscription billing with trial/proration lifecycles, and bulletproof webhook handling.
            </Text>
          </Column>
        </Row>
        <Row fillWidth gap="16" s={{ direction: "column" }}>
          <Column
            flex={1}
            gap="8"
            padding="20"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
          >
            <Text variant="heading-strong-s" onBackground="neutral-strong">
              Queues &amp; Webhooks
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Asynchronous job processing with Redis, event-driven pipelines, exponential backoff retries, dead-letter monitoring, and cryptographic webhook signature verification.
            </Text>
          </Column>
          <Column
            flex={1}
            gap="8"
            padding="20"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
          >
            <Text variant="heading-strong-s" onBackground="neutral-strong">
              React &amp; Next.js Dashboards
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              High-performance client frontends and administrative portals built with React, Next.js, and TypeScript, engineered to consume production Laravel APIs cleanly.
            </Text>
          </Column>
        </Row>
      </Column>

      {/* Section: Technologies */}
      <Column fillWidth gap="20" paddingX="16" marginTop="32">
        <Row fillWidth horizontal="between" vertical="center">
          <Heading as="h2" variant="display-strong-xs">
            Technologies
          </Heading>
          <Line maxWidth={48} />
        </Row>
        <Column
          fillWidth
          gap="16"
          padding="24"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
        >
          <Row fillWidth gap="16" s={{ direction: "column" }}>
            <Column flex={1} gap="4">
              <Text variant="label-strong-s" onBackground="brand-strong">Backend</Text>
              <Text variant="body-default-s" onBackground="neutral-medium">
                PHP 8+, Laravel, Eloquent ORM, RESTful API Design, MVC Architecture
              </Text>
            </Column>
            <Column flex={1} gap="4">
              <Text variant="label-strong-s" onBackground="brand-strong">Databases &amp; Cache</Text>
              <Text variant="body-default-s" onBackground="neutral-medium">
                MySQL, PostgreSQL, Redis, Query Optimization, Database Indexing
              </Text>
            </Column>
          </Row>
          <Line background="neutral-alpha-weak" />
          <Row fillWidth gap="16" s={{ direction: "column" }}>
            <Column flex={1} gap="4">
              <Text variant="label-strong-s" onBackground="brand-strong">Payments &amp; Billing</Text>
              <Text variant="body-default-s" onBackground="neutral-medium">
                Stripe, Stripe Connect, Webhooks, Subscription Lifecycles, POS Systems
              </Text>
            </Column>
            <Column flex={1} gap="4">
              <Text variant="label-strong-s" onBackground="brand-strong">Frontend</Text>
              <Text variant="body-default-s" onBackground="neutral-medium">
                React, Next.js, TypeScript, JavaScript (ES6+), HTML5/CSS3, Tailwind CSS
              </Text>
            </Column>
          </Row>
          <Line background="neutral-alpha-weak" />
          <Row fillWidth gap="16" s={{ direction: "column" }}>
            <Column flex={1} gap="4">
              <Text variant="label-strong-s" onBackground="brand-strong">DevOps &amp; Tooling</Text>
              <Text variant="body-default-s" onBackground="neutral-medium">
                Git, GitHub, Docker, Postman, Linux/Nginx, CI/CD, PHPUnit, Laravel Pint
              </Text>
            </Column>
          </Row>
        </Column>
      </Column>

      {/* Section: Experience */}
      <Column fillWidth gap="20" paddingX="16" marginTop="32">
        <Row fillWidth horizontal="between" vertical="center">
          <Heading as="h2" variant="display-strong-xs">
            Experience
          </Heading>
          <Line maxWidth={48} />
        </Row>
        <Column
          fillWidth
          gap="16"
          padding="24"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
        >
          <Row fillWidth horizontal="between" vertical="center" wrap gap="8">
            <Column gap="4">
              <Text variant="heading-strong-s" onBackground="neutral-strong">
                Software Engineer · Applicon Soft
              </Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                Lahore, Pakistan · Full-time
              </Text>
            </Column>
            <Badge background="brand-alpha-weak" textVariant="label-default-xs">
              Apr 2024 – Present
            </Badge>
          </Row>
          <Column gap="8" marginTop="8">
            <Text variant="body-default-s" onBackground="neutral-medium">
              • Architected and shipped production Laravel SaaS platforms and REST APIs powering high-traffic web applications and mobile clients.
            </Text>
            <Text variant="body-default-s" onBackground="neutral-medium">
              • Engineered multi-party marketplace payments and automated subscription billing via Stripe Connect with idempotent webhook handling.
            </Text>
            <Text variant="body-default-s" onBackground="neutral-medium">
              • Optimized MySQL schemas, composite indexes, and Redis queue workers to sustain high write volumes with sub-second API response times.
            </Text>
          </Column>
        </Column>
      </Column>

      {/* Section: Frequently Asked Questions */}
      <Column fillWidth gap="20" paddingX="16" marginTop="32">
        <Row fillWidth horizontal="between" vertical="center">
          <Heading as="h2" variant="display-strong-xs">
            Frequently Asked Questions
          </Heading>
          <Line maxWidth={48} />
        </Row>
        <Column fillWidth gap="12">
          {faqs.map((faq, idx) => (
            <Column
              key={idx}
              fillWidth
              gap="8"
              padding="20"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
            >
              <Text variant="heading-strong-xs" onBackground="neutral-strong">
                {faq.question}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {faq.answer}
              </Text>
            </Column>
          ))}
        </Column>
      </Column>

      <Mailchimp />
    </Column>
  );
}
