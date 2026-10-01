import { Column, Heading, Text, Flex, SmartLink } from "@once-ui-system/core";

export default function NotFound() {
  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        Page Not Found
      </Heading>
      <Text onBackground="neutral-weak">The page you are looking for does not exist.</Text>
      <Flex gap="24" marginTop="32">
        <SmartLink href="/">Home</SmartLink>
        <SmartLink href="/work">Work</SmartLink>
        <SmartLink href="/blog">Blog</SmartLink>
      </Flex>
    </Column>
  );
}
