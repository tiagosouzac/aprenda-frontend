# aprenda-frontend

A frontend development introductory course built with Astro. The site teaches how the web works, HTML, CSS, JavaScript, TypeScript, React, and automated testing — finishing with a curated next-steps guide.

## Project goal

Teach complete beginners the fundamentals of frontend development in a progressive, hands-on way. Each topic builds on the previous one, culminating in React with TypeScript.

## Site structure

| Route | Content |
|---|---|
| `/` | Home — course overview and navigation links to all modules |
| `/how-the-web-works` | How the web works — browsers, HTTP, DNS, rendering pipeline |
| `/html` | HTML — document structure, semantic elements, forms |
| `/css` | CSS — selectors, box model, flexbox, grid, responsive design |
| `/javascript` | JavaScript — variables, functions, DOM, events, async |
| `/typescript` | TypeScript — types, interfaces, generics, TS in practice |
| `/react` | React — components, props, state, hooks, TypeScript with React |
| `/testing` | Automated testing — unit, integration, and e2e fundamentals |
| `/next-steps` | Next steps — what to learn next, frameworks, and recommendations |

Module roots redirect to the first lesson of each module (defined in `src/data/modules.ts`). Lesson pages are generated from MDX files in `src/content/lessons/<module-slug>/<NN-slug>.mdx` via the catch-all route `src/pages/[...slug].astro`.

## Stack

- **Astro** (v6) — static site generator; routes live in `src/pages/`, lessons live in the `lessons` content collection
- **TypeScript** — all scripts and components use `.ts`/`.tsx`
- **Tailwind CSS** (v4) — utility-class styling via `@tailwindcss/vite`; global stylesheet at `src/styles/global.css`
- **MDX** — lesson content authored as Markdown with optional JSX
- No UI framework beyond Astro (no React at the Astro level — React is taught as course content, not used to build the site)

## Conventions

- **One MDX file per lesson** under `src/content/lessons/<module-slug>/<NN-slug>.mdx`. The `NN-` prefix orders the file in the directory; the URL slug strips it (`01-introducao.mdx` → `/<module>/introducao`).
- **No `.astro` pages for lessons.** All lessons are routed through `src/pages/[...slug].astro`, which calls `render(lesson)` and applies `Content components` to swap `h2` and `pre` for `SectionHeading` and `MdxPre`.
- **Module metadata** (color, label, number, card visuals, redirect target) lives in `src/data/modules.ts`. **Lesson data** (title, description, order, hero, quiz, comingSoon) lives in the MDX frontmatter. Together they're combined by `src/data/course.ts` async helpers (`getCourseModules`, `findLesson`, `findAdjacentLessons`).
- **Sidebar, Nav, Footer, ModulesSection, redirects** all read from `modules.ts` + the collection — never from a hardcoded list.
- **Section anchors come from `## headings`.** `rehype-slug` (default in Astro) generates the `id`. The TOC is built at build time from `render(lesson).headings` — no manual `id` props.
- **Section numbering is automatic** via CSS counter on `.lesson-prose h2`. Authors don't pass numbers manually.
- **Code examples use fenced code blocks** with `title="..."` meta — see `rules/code-examples.md`.
- **Quizzes live in frontmatter** as a `quiz:` array (Zod-validated) — see `rules/page-structure.md`.
- **Stub lessons** declare `comingSoon: true` and have an empty body — `[...slug].astro` renders the placeholder.
- Keep pages self-contained; avoid heavy client-side JS in the site shell.

## Content outline

### Home (`/`)
- Brief description of what frontend development is
- Why learn these technologies and in what order
- Card grid linking to each module with a short description

### How the web works (`/how-the-web-works`)
- What happens when you type a URL and press Enter
- DNS resolution
- HTTP/HTTPS — requests, responses, status codes, headers
- How browsers render a page (parsing HTML → CSSOM → render tree → paint)
- Client vs. server — what runs where
- Brief intro to web servers and hosting

### HTML (`/html`)
- What HTML is and how browsers parse it
- Document structure (`<!DOCTYPE>`, `<head>`, `<body>`)
- Semantic elements (`<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`)
- Forms and inputs
- Accessibility basics (alt text, labels, ARIA roles)

### CSS (`/css`)
- Selectors, specificity, cascade
- Box model
- Flexbox layout
- CSS Grid
- Responsive design with media queries
- CSS custom properties (variables)

### JavaScript (`/javascript`)
- Variables (`var`, `let`, `const`)
- Data types and operators
- Functions and arrow functions
- DOM manipulation
- Events
- Fetch API and async/await

### TypeScript (`/typescript`)
- Why TypeScript exists
- Basic types and type annotations
- Interfaces and type aliases
- Generics
- Strict mode
- Integrating TS in a project

### React (`/react`)
- What React is and why it exists
- JSX
- Components (function components)
- Props and prop types with TypeScript
- State with `useState`
- Side effects with `useEffect`
- Building a small example app

### Automated testing (`/testing`)
- Why tests matter and what they protect against
- Types of tests: unit, integration, end-to-end
- Testing JavaScript with Vitest (unit tests, assertions)
- Testing React components with Testing Library
- End-to-end testing with Playwright (brief intro)
- What to test and what not to test

### Next steps (`/next-steps`)
- Recap of what was covered in the course
- Suggested learning path after completing these fundamentals
- Frontend frameworks worth exploring: Next.js, Astro, Vue, Svelte
- Backend and full-stack: Node.js, databases, REST vs. GraphQL
- Tooling: build tools (Vite), linting (ESLint), formatting (Prettier), CI/CD
- Where to find good resources: documentation, communities, courses
- Career paths: frontend, full-stack, UI engineering

## Development

```bash
npm run dev      # start dev server at localhost:4321
npm run build    # production build
npm run preview  # preview production build
```
