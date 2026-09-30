# SEO Implementation Plan & Changelog

## Step 0: Audit & Plan

**Repo State:**
- **Framework**: Next.js 16 (App Router)
- **Metadata**: Set via `generateMetadata` (using a custom `Meta.generate` utility) and `site.config.ts` / `content.tsx`. The `keywords` meta tag is injected dynamically.
- **Content Storage**: MDX with `gray-matter` for blog posts and case studies. Structured JSON/TS for main pages (`src/resources/content.tsx`).
- **Images**: Custom `<Avatar>` from `@once-ui-system/core` and standard setups.
- **Hosting**: Likely Vercel/Node.

**Current Routes & Metadata:**
| Route | Title | H1/Main Heading | Canonical / OG / JSON-LD |
|---|---|---|---|
| `/` | Imran Hussain - Full-Stack Engineer \| Laravel & PHP | Full-stack delivery, backend depth... | Missing absolute Canonical. Missing `Person` JSON-LD (currently has `webPage` with `author`). Meta keywords present. |
| `/about` | About - Imran Hussain | About - Imran Hussain (Implicit) | Missing absolute Canonical. Missing ProfilePage schema. Meta keywords present. |
| `/work` | Laravel & SaaS Projects | Laravel & SaaS Projects | Missing absolute Canonical. Meta keywords present. |
| `/blog` | Notes on Laravel, APIs... | Notes on Laravel, APIs... | Missing absolute Canonical. Meta keywords present. |
| `/work/[slug]` | (Dynamic) | (Dynamic) | Needs specific case study titles, `CreativeWork` schema, no meta keywords. |
| `/blog/[slug]` | (Dynamic) | (Dynamic) | Needs `BlogPosting` schema, specific SEO metadata, no meta keywords. |

**Action Plan:**
1. **Metadata (`site.config.ts`, `content.tsx`, `page.tsx`)**: Remove `keywords` from all `generateMetadata` blocks. Update titles and descriptions using `seo-research-output.md`. Ensure `metadataBase` is set.
2. **On-page Content**: Update `home.headline`, `home.subline`, `about.intro`, etc., in `content.tsx`. Ensure correct H1 usage.
3. **Structured Data**: Create a reusable `<JsonLd />` component and implement schema for `Person`, `WebSite`, `ProfilePage`, `BlogPosting`, etc.
4. **Sitemap & Robots**: Already mostly correct in `robots.ts` and `sitemap.ts`, verify absolute URLs.
5. **Performance**: Audit images in components, adjust `next/image` sizes to avoid `w=3840`.
6. **Blog / Work Scaffolding**: Create the 6 posts and update case study outlines in MDX files.
7. **Playwright verification**: Add tests to ensure SEO requirements.
