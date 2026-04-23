# Astro Conventions

## File structure

```
src/
  pages/       # one .astro file per route, flat (no subdirectories)
  layouts/     # Layout.astro — shared shell for all pages
  components/  # reusable .astro components (Nav, CodeBlock, etc.)
```

## Pages

- One `.astro` file per route, named after the route slug (e.g., `how-the-web-works.astro`)
- Every page must use `Layout.astro` via `<Layout title="...">` — no page-level `<html>` tags
- The `title` prop must be in pt-BR (e.g., `title="Como a Web Funciona"`)
- No client-side JS in page shells (`<script>` tags only inside code example blocks as inert text)

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

## Layout

- `Layout.astro` owns `<html>`, `<head>`, and `<body>`
- Navigation is rendered by `Nav.astro`, included inside the layout — never duplicated in pages
- Accepts a `title` prop; appends site name: `<title>{title} | Aprenda Frontend</title>`

## Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` — use utility classes directly in markup
- Global stylesheet at `src/styles/global.css` with `@import "tailwindcss"` — imported in the shared layout
- CSS custom properties for design tokens (colors, spacing) defined in `global.css` using `@theme` when needed
- Avoid scoped `<style>` blocks unless a component has complex styles that can't be expressed cleanly with utilities
- No CSS-in-JS, no other CSS frameworks

## No framework components at site level

React, Vue, and Svelte are taught as course *content* — they are not used to build the site itself. All site components are `.astro` files.
