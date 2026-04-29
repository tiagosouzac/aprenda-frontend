# Astro Conventions

## File structure

```
src/
  pages/                # only routes for non-lesson pages (index, 404) and the catch-all [...slug] for lessons
  layouts/              # Layout.astro (site shell) + LessonLayout.astro (lesson chrome)
  components/           # reusable .astro components
  content/
    lessons/<module>/   # one MDX per lesson, named NN-slug.mdx
  content.config.ts     # collection schema (title, description, order, hero, quiz, comingSoon)
  data/
    modules.ts          # module visual metadata + redirect targets (single source of truth)
    course.ts           # async helpers that combine collection + modules.ts
  lib/
    shiki-code-title.ts # Shiki transformer that forwards fence `title="..."` meta to data-title
  styles/               # global.css with Tailwind import + design tokens
```

## Pages

- `src/pages/index.astro` — the homepage.
- `src/pages/404.astro` — the 404 page.
- `src/pages/[...slug].astro` — the **only** lesson route. It calls `getCollection('lessons')` in `getStaticPaths()`, renders `<Content components={{ h2: SectionHeading, pre: MdxPre }} />` inside `<LessonLayout>`, and auto-renders the quiz (when frontmatter has `quiz:`) or the coming-soon placeholder (when `comingSoon: true`).
- **Do not create per-lesson `.astro` files.** Authoring a lesson is an MDX-only operation.
- Module landing pages (`/html`, `/css`, …) are pure redirects to the first lesson, configured via `redirects` in `astro.config.ts` and sourced from `src/data/modules.ts`.
- No client-side JS in page shells (`<script>` tags belong inside reusable components when needed).

## Content collection (`lessons`)

- Defined in `src/content.config.ts` with the `glob` loader and Zod schema.
- The schema is the contract for what a lesson can declare in frontmatter — see `rules/page-structure.md` for the full shape.
- `entry.id` is `<module-slug>/<filename-without-extension>` (e.g., `html/03-tags`). The numeric prefix is stripped when computing the URL slug.
- Sorting: `course.ts` reads `entry.data.order` (required); the filename prefix is a fallback for safety. Always set `order` in frontmatter.

## Data layer

- `src/data/modules.ts` is the **only** place where module-level metadata is hardcoded — color, label, number, name, card visuals, `firstLessonSlug`. It also exports `moduleRedirects` consumed by `astro.config.ts`.
- `src/data/course.ts` exports async helpers that hydrate modules with their lessons:
  - `getCourseModules()` — full course tree, sorted, ready for sidebars and grids.
  - `findLesson(href)` — single lesson by URL.
  - `findLessonModule(href)` — the module that contains a lesson.
  - `findAdjacentLessons(href)` — `{ prev, next }` for prev/next nav.
- Every consumer (Sidebar, Nav, Footer, ModulesSection, LessonLayout, [...slug]) reads from these helpers. **Do not maintain a parallel module list anywhere else.**

## Components

- PascalCase filenames: `Nav.astro`, `LessonNav.astro`, `SectionHeading.astro`, `MdxPre.astro`.
- Keep components focused — one responsibility per file.
- Props typed with TypeScript interfaces in the frontmatter:

```astro
---
interface Props {
  title: string;
  href: string;
}
const { title, href } = Astro.props;
---
```

- For MDX component swaps (`Content components={{ h2, pre }}`), props arrive as `Astro.props` with HTML-style keys (e.g., `data-language`, `data-title`). Don't try to camelCase them.

## Layouts

- `Layout.astro` owns `<html>`, `<head>` and `<body>`. It includes `Nav.astro` at the top and `Footer.astro` at the bottom. Used by the homepage and any non-lesson page.
- `LessonLayout.astro` wraps `Layout` and adds the lesson chrome: left `Sidebar` (course tree), `Breadcrumb`, hero, content slot, `LessonNav` (prev/next), right `Toc`. Reads everything from `course.ts` based on the `currentHref` prop, and accepts a `headings: MarkdownHeading[]` prop to feed the TOC.
- Navigation (`Nav.astro`) is included only in `Layout.astro` — never duplicate it in pages.
- `Layout.astro` accepts a `title` prop and appends the site name: `<title>{title} | Aprenda Frontend</title>`.

## TOC

The right-rail TOC is server-rendered. `[...slug].astro` extracts `headings` from `render(lesson)` and forwards them to `LessonLayout`, which passes them to `Toc.astro`. `Toc` filters `depth === 2` and renders the `<ul>` at build time. The only client-side script is the scroll-spy that toggles the active class — no DOM scraping, no `textContent` reads.

## Markdown / MDX

- Fenced code blocks with `title="..."` meta become styled cards via `MdxPre`. See `rules/code-examples.md`.
- `## Section title` becomes a numbered, anchored, TOC-listed section via `SectionHeading` and CSS counter on `.lesson-prose h2`.
- `rehype-slug` is enabled by default in Astro — use the heading text to influence the slug, don't add manual IDs.
- The Shiki transformer in `astro.config.ts` (`shikiConfig.transformers: [transformerCodeTitle]`) is the bridge between fence meta and `data-title`. Don't add a competing remark plugin — Shiki's hast pipeline is the right place.

## Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` — use utility classes directly in markup.
- Global stylesheet at `src/styles/global.css` with `@import "tailwindcss"` — imported in the shared layout.
- CSS custom properties for design tokens (colors, spacing) defined in `global.css` using `@theme` when needed.
- `.lesson-prose` is the prose container for every lesson body. Styles live in `global.css`.
- Avoid scoped `<style>` blocks unless a component has complex styles that can't be expressed cleanly with utilities. Two cases where they're warranted today: keyframes (animations), and stateful classes added by client scripts (e.g., `.quiz-opt.is-selected`).
- For state classes added by scripts, prefer a compound selector in CSS over chained Tailwind utilities — Tailwind utilities at the same specificity tier follow alphabetical order in the generated stylesheet, so a script-added utility may lose to the base utility. A `.parent.is-state` rule beats both.
- No CSS-in-JS, no other CSS frameworks.

## No framework components at site level

React, Vue, and Svelte are taught as course *content* — they are not used to build the site itself. All site components are `.astro` files.
