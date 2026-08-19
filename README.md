# Imran Hussain — Portfolio

Personal portfolio site for Imran Hussain, Laravel / PHP Software Engineer.

Built on [Magic Portfolio](https://once-ui.com/products/magic-portfolio) (Once UI) with
Next.js 16, React 19, and TypeScript. Fully static — **no backend or database required.**

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the production build
```

## Where the content lives

Everything you'd normally want to change is in one of these places:

| What | File |
| --- | --- |
| Name, role, email, socials, bio, work history, education, skills | `src/resources/content.tsx` |
| Domain, enabled routes, theme colors, fonts, effects | `src/resources/once-ui.config.ts` |
| Icons available for skill tags and socials | `src/resources/icons.ts` |
| Profile photo | `public/images/avatar.jpg` |
| Social share (OG) image | `public/images/og/home.jpg` |

### Adding a project

Drop a new `.mdx` file into `src/app/work/projects/`. It appears on `/work` and on the home page
automatically. Projects are sorted by `publishedAt`, newest first.

```mdx
---
title: "Project name"
subtitle: "One-line descriptor"
publishedAt: "2025-06-15"
summary: "Shown on the project card in listings."
tag: "Professional Project"
images:
  - "/images/projects/<slug>/cover-01.jpg"
link: "https://optional-live-url.com"
---

Markdown body — this becomes the case study page at /work/<filename>.
```

### Adding a blog post

Same idea — drop an `.mdx` file into `src/app/blog/posts/`. Frontmatter uses `title`, `summary`,
`publishedAt`, and optionally `tag` and `images`.

### Project cover images

Covers live in `public/images/projects/<slug>/`. The current ones are generated title cards. Swap
in real screenshots whenever you have them — just keep the same file paths, or update the `images`
array in the project's frontmatter.

## Routes

`/`, `/about`, `/work`, `/blog` are enabled. `/gallery` is turned off in
`src/resources/once-ui.config.ts` and its page and stock images have been removed. To bring it
back, re-enable the route, restore a `src/app/gallery/page.tsx`, and populate `gallery.images` in
`content.tsx`.

## Password-protecting a page

Add the route to `protectedRoutes` in `src/resources/once-ui.config.ts` and set
`PAGE_ACCESS_PASSWORD` in a `.env` file (see `.env.example`).

## Deploying

Any Next.js host works — Vercel is the path of least resistance. Before going live, confirm
`baseURL` in `src/resources/once-ui.config.ts` matches the real domain, since it feeds the sitemap,
robots.txt, and all SEO meta tags.

## Attribution

The template's footer credit and branding assets (`public/trademarks/`) were removed at the owner's
request. Note that the Magic Portfolio template ships under **CC BY-NC 4.0** (see `LICENSE`), which
makes attribution a condition of use — an Once UI Pro license waives that requirement. Worth
resolving before the site goes public.
