import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  AvatarGroup,
  Button,
  Carousel,
  Column,
  Flex,
  Heading,
  Text,
  SmartLink,
  Row,
  Avatar,
  Line,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";
import { JsonLd } from "@/components";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  const rawTitle = post.metadata.seoTitle || `${post.metadata.title}: Laravel Case Study`;
  const cleanTitle = rawTitle.replace(/\s*\|\s*Imran Hussain$/i, "");
  const title = cleanTitle;
  const description = post.metadata.summary;
  const image = post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`;
  const url = `https://imranhussainportfolio.com${work.path}/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.metadata.publishedAt,
      modifiedTime: post.metadata.publishedAt,
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

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
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
                  name: "Work",
                  item: `${baseURL}/work`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.metadata.title,
                  item: `${baseURL}/work/${post.slug}`,
                },
              ],
            },
            {
              "@type": "CreativeWork",
              "@id": `${baseURL}/work/${post.slug}#case-study`,
              name: post.metadata.title,
              headline: post.metadata.seoTitle || post.metadata.title,
              description: post.metadata.summary,
              url: `${baseURL}/work/${post.slug}`,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              author: { "@id": `${baseURL}/#person` },
              publisher: { "@id": `${baseURL}/#person` },
              image: post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
              about: ["Laravel", "PHP", "MySQL", "REST APIs", "SaaS Architecture"],
            },
          ],
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
        {post.metadata.link && (
          <Row marginTop="8">
            <Button
              href={post.metadata.link}
              suffixIcon="arrowUpRightFromSquare"
              size="s"
              variant="secondary"
            >
              Visit live site
            </Button>
          </Row>
        )}
      </Column>

      {/* At a glance block (Audit 4.12 & Section 6) */}
      <Column maxWidth="s" fillWidth paddingX="16">
        <Row
          fillWidth
          gap="16"
          padding="16"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
          wrap
          horizontal="between"
        >
          <Column gap="4" minWidth="120">
            <Text variant="label-default-xs" onBackground="neutral-weak">Role</Text>
            <Text variant="body-default-s" onBackground="neutral-strong">Backend / Full-Stack Engineer</Text>
          </Column>
          <Column gap="4" minWidth="120">
            <Text variant="label-default-xs" onBackground="neutral-weak">Stack</Text>
            <Text variant="body-default-s" onBackground="neutral-strong">Laravel · PHP · MySQL · APIs</Text>
          </Column>
          <Column gap="4" minWidth="100">
            <Text variant="label-default-xs" onBackground="neutral-weak">Type</Text>
            <Text variant="body-default-s" onBackground="neutral-strong">{post.metadata.tag || "Production SaaS"}</Text>
          </Column>
          {post.metadata.link && (
            <Column gap="4" minWidth="100">
              <Text variant="label-default-xs" onBackground="neutral-weak">Live Project</Text>
              <SmartLink href={post.metadata.link} target="_blank" rel="noopener noreferrer">
                <Text variant="body-default-s" onBackground="brand-strong">Visit Site ↗</Text>
              </SmartLink>
            </Column>
          )}
        </Row>
      </Column>

      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {/* aspectRatio 1919 / 837 matches the project cards - see the note in
          ProjectCard. It was 16 / 9, which cropped ~23% off the width of every
          ~2.29:1 screenshot and cut the sidebars out of the shot.
          Deliberately NOT media-frame-3d: the cards use the tilted stage to
          catch the eye while browsing, but this is the page someone opens to
          actually read the case study, so the screenshot stays flat and full
          bleed. Decoration earns its place in the index, not in the detail. */}
      {post.metadata.images.length > 0 && (
        <Carousel
          className="media-frame media-frame-fill"
          priority
          aspectRatio="1919 / 837"
          sizes="(max-width: 960px) 100vw, 960px"
          items={post.metadata.images.map((image) => ({
            slide: image,
            alt: post.metadata.title,
          }))}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line style={{ maxWidth: 40 }} />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
        <Row marginTop="16">
          <SmartLink href="/blog">
            <Text variant="label-default-m" onBackground="brand-strong">
              Read engineering deep dives on the blog →
            </Text>
          </SmartLink>
        </Row>
      </Column>
      <ScrollToHash />
    </Column>
  );
}
