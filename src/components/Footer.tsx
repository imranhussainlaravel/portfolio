import {
  Button,
  Column,
  Heading,
  IconButton,
  Line,
  Row,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { person, social, routes, about, work, blog } from "@/resources";
import styles from "./Footer.module.scss";

const navLinks = [
  { label: about.label, href: about.path, enabled: routes["/about"] },
  { label: work.label, href: work.path, enabled: routes["/work"] },
  { label: blog.label, href: blog.path, enabled: routes["/blog"] },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Column as="footer" fillWidth horizontal="center" paddingX="l" paddingTop="80">
      <Column maxWidth="m" fillWidth gap="40">
        {/* Call to action */}
        <Row
          fillWidth
          horizontal="between"
          vertical="center"
          gap="24"
          paddingX="24"
          paddingY="32"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
          s={{ direction: "column", horizontal: "center", align: "center" }}
        >
          <Column gap="8" s={{ horizontal: "center", align: "center" }}>
            {/* as="h2" is required: Once UI's Heading defaults to h1, which would
                emit a second <h1> on every page and break heading hierarchy. */}
            <Heading as="h2" variant="heading-strong-l" wrap="balance">
              Let's build something solid
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
              Open to backend and Laravel engineering work. The inbox is always on.
            </Text>
          </Column>
          <Row gap="12" vertical="center" s={{ direction: "column" }}>
            {about.resume?.display && (
              <Button
                href={about.resume.link}
                download={about.resume.filename ?? true}
                prefixIcon="document"
                size="m"
                variant="secondary"
                weight="default"
              >
                {about.resume.label ?? "Download CV"}
              </Button>
            )}
            <Button
              href={`mailto:${person.email}`}
              prefixIcon="email"
              size="m"
              variant="primary"
              weight="strong"
              arrowIcon
            >
              Get in touch
            </Button>
          </Row>
        </Row>

        <Line background="neutral-alpha-weak" />

        {/* Nav + socials */}
        <Row
          fillWidth
          horizontal="between"
          vertical="center"
          gap="24"
          s={{ direction: "column", horizontal: "center", align: "center" }}
        >
          <Row gap="20" vertical="center" wrap className={styles.mobile}>
            {navLinks
              .filter((item) => item.enabled)
              .map((item) => (
                <SmartLink key={item.href} href={item.href} unstyled>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {item.label}
                  </Text>
                </SmartLink>
              ))}
          </Row>
          {/* size="l" (40px) rather than "s" (24px): 24px only just clears the
              WCAG 2.2 AA 24x24 floor and is a cramped thumb target on mobile. */}
          <Row gap="12" vertical="center">
            {social.map(
              (item) =>
                item.link && (
                  <IconButton
                    key={item.name}
                    href={item.link}
                    icon={item.icon}
                    tooltip={item.name}
                    size="l"
                    variant="ghost"
                  />
                ),
            )}
          </Row>
        </Row>

        {/* Legal line */}
        <Row fillWidth horizontal="center" vertical="center" paddingBottom="32">
          <Text variant="body-default-xs" onBackground="neutral-weak">
            © {currentYear} {person.name}. All rights reserved.
          </Text>
        </Row>
      </Column>

      <Row height="80" hide s={{ hide: false }} />
    </Column>
  );
};
