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

Each page is a standalone lesson with explanations, code examples, and exercises where appropriate.

## Stack

- **Astro** (v6) — static site generator; pages live in `src/pages/`
- **TypeScript** — all scripts and components use `.ts`/`.tsx`
- **Tailwind CSS** (v4) — utility-class styling via `@tailwindcss/vite`; global stylesheet at `src/styles/global.css`
- No UI framework beyond Astro (no React at the Astro level — React is taught as course content, not used to build the site)

## Conventions

- One `.astro` file per route under `src/pages/`
- Shared layout in `src/layouts/Layout.astro` — all pages use it
- Navigation component in `src/components/Nav.astro` — included in the layout
- Code examples inline in the page, wrapped in `<pre><code>` blocks
- Keep pages self-contained; avoid heavy client-side JS in the site shell

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
