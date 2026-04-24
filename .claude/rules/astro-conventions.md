# Astro Conventions

## File structure

```
src/
  pages/       # one .astro file per route — subdirectories allowed for sub-lessons (e.g., html/tags.astro → /html/tags)
  layouts/     # Layout.astro (site shell) + LessonLayout.astro (lesson pages)
  components/  # reusable .astro components (Nav, Footer, Sidebar, Toc, CodeBlock, LessonSection, etc.)
  data/        # static data shared across pages (e.g., course.ts — the course structure)
  styles/      # global.css with Tailwind import + design tokens
```

## Pages

- One `.astro` file per route. Sub-lesson routes (`/html/tags`) live in matching subdirectories (`src/pages/html/tags.astro`)
- Lesson pages use `<LessonLayout currentHref="...">` — no page-level `<html>` tags, no manual hero/sidebar/breadcrumb/nav
- Non-lesson pages (the homepage) use `<Layout title="...">` directly
- The lesson `currentHref` must match an entry in `src/data/course.ts`
- No client-side JS in page shells (`<script>` tags belong inside reusable components when needed)

## Components

- PascalCase filenames: `Nav.astro`, `CodeBlock.astro`, `LessonCard.astro`
- Keep components focused — one responsibility per file
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

## Layouts

- `Layout.astro` owns `<html>`, `<head>` and `<body>`. It includes `Nav.astro` at the top and `Footer.astro` at the bottom. Used by the homepage and any non-lesson page.
- `LessonLayout.astro` wraps `Layout` and adds the lesson chrome: left `Sidebar` (course tree), `Breadcrumb`, hero, content slot, `LessonNav` (prev/next), right `Toc`. Reads everything from `src/data/course.ts` based on the `currentHref` prop.
- Navigation (`Nav.astro`) is included only in `Layout.astro` — never duplicate it in pages.
- `Layout.astro` accepts a `title` prop and appends the site name: `<title>{title} | Aprenda Frontend</title>`.

## Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` — use utility classes directly in markup
- Global stylesheet at `src/styles/global.css` with `@import "tailwindcss"` — imported in the shared layout
- CSS custom properties for design tokens (colors, spacing) defined in `global.css` using `@theme` when needed
- Avoid scoped `<style>` blocks unless a component has complex styles that can't be expressed cleanly with utilities
- No CSS-in-JS, no other CSS frameworks

## No framework components at site level

React, Vue, and Svelte are taught as course *content* — they are not used to build the site itself. All site components are `.astro` files.
