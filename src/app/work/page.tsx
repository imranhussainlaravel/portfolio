import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work, keywords } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  // work.title is the on-page H1; the search-result title carries the name too.
  return {
    ...Meta.generate({
      title: `${work.title} - ${person.name}`,
      description: work.description,
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
      path: work.path,
    }),
    keywords: keywords["/work"],
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
