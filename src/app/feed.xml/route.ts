import RSS from "rss";
import { baseURL, blog, person } from "@/resources";
import { getPosts } from "@/utils/utils";

export async function GET() {
  const feed = new RSS({
    title: blog.title,
    description: blog.description,
    generator: "RSS for Node",
    feed_url: `${baseURL}/feed.xml`,
    site_url: baseURL,
    image_url: `${baseURL}${person.avatar}`,
    managingEditor: person.email,
    webMaster: person.email,
    copyright: `Copyright ${new Date().getFullYear()}, ${person.name}`,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const posts = getPosts(["src", "app", "blog", "posts"]);

  posts.forEach((post) => {
    feed.item({
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `${baseURL}/blog/${post.slug}`,
      author: person.name,
      date: post.metadata.publishedAt,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
