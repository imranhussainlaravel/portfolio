import type { MetadataRoute } from "next";
import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

/**
 * Sitemap.
 *
 * priority is relative WITHIN this site only - it tells a crawler which of your
 * own pages to favour when it has limited budget, and says nothing about how you
 * rank against anyone else. The ordering here is deliberate: /about carries the
 * Person schema and is the page that should win for the name query, so it sits
 * level with the homepage rather than below it.
 *
 * lastModified for posts uses the real publish date rather than build time.
 * Stamping every URL with "now" on each deploy is a known way to get lastmod
 * ignored entirely, because it is trivially detectable as untrustworthy.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const PRIORITY: Record<string, number> = {
    "/": 1.0,
    "/about": 1.0,
    "/work": 0.9,
    "/blog": 0.8,
  };

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: PRIORITY[route] ?? 0.5,
  }));

  return [...routes, ...works, ...blogs];
}
