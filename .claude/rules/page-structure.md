# Page Structure

How lesson pages are organized. All lessons use the same `LessonLayout` and share a small set of components — adding a new lesson is mostly a data + content task.

## URL convention

- `/{module-slug}` — module landing / first lesson (e.g., `/how-the-web-works`, `/html`)
- `/{module-slug}/{lesson-slug}` — sub-lesson within a module (e.g., `/html/tags`, `/html/semantica`)

The page file mirrors the URL: `/html/tags` → `src/pages/html/tags.astro`.

## Source of truth

The course structure lives in `src/data/course.ts`:

- Each `CourseModule` has metadata (`number`, `label`, `color`, `rootHref`) and an array of `lessons`
- Each `Lesson` has `slug`, `title`, `href`, and an optional `hero` (`titleBefore`, `titleAccent`, `titleAfter`, `description`)
- `LessonLayout` reads this file to render the sidebar, breadcrumb, hero and prev/next

**Edit `course.ts` before creating a new page.**

## Adding a new lesson — workflow

1. Add a `Lesson` entry to the module's `lessons` array in `src/data/course.ts`.
   - Include the `hero` block when the lesson should render a title + description above the content.
2. Create the page at `src/pages/{href}.astro`.
3. Render `<LessonLayout currentHref="/the/href">` — that's the only required prop.
4. Inside the layout slot, write the lesson body using `LessonSection` and `CodeBlock`.

Example minimum page:

```astro
---
import LessonLayout from "../layouts/LessonLayout.astro";
import LessonSection from "../components/LessonSection.astro";
---

<LessonLayout currentHref="/html/tags">
  <div class="lesson-prose">
    <p>Introdução em 2-4 parágrafos.</p>
  </div>

  <LessonSection number="01" title="Tags básicas" id="tags-basicas">
    <p>Conteúdo da seção em pt-BR.</p>
  </LessonSection>

  <LessonSection title="Resumo" id="resumo">
    <ul>
      <li>Recap do que foi visto.</li>
    </ul>
  </LessonSection>
</LessonLayout>
```

## Required body structure

Inside the layout slot:

1. **Introduction** — a `<div class="lesson-prose">` with 2–4 paragraphs framing the topic, before any `LessonSection`
2. **Sections** — one `<LessonSection>` per sub-topic, in pedagogical order
3. **Summary** — a final `<LessonSection title="Resumo">` (no `number`) recapping the key points

The hero, breadcrumb, sidebar, TOC and prev/next nav are rendered automatically by `LessonLayout` — never duplicate them in pages.

## Section anatomy

```astro
<LessonSection number="03" title="HTTP — a conversa" id="http">
  <p>Explicação em pt-BR.</p>

  <CodeBlock
    lang="bash"
    code={httpRequest}
    caption="Legenda opcional do exemplo."
  />

  <ul>
    <li>Item de lista</li>
  </ul>
</LessonSection>
```

- `title` — required, rendered as `<h2>`
- `id` — required for sections that should appear in the right-side TOC and the URL hash
- `number` — optional mono prefix (`01`, `02`, …); omit on the Resumo section

## Body copy

All prose inside `LessonSection` is auto-styled by `.lesson-prose`:

- Paragraphs and lists (max width 62ch)
- Ordered lists with mono `01 02 …` markers
- Unordered lists with `◦` bullet
- Inline `<code>` with subtle gray background
- `<em>` renders in Instrument Serif italic
- `<strong>` for important terms
- `<h3>` for subsections within a section (use sparingly)

The introduction block (above the first section) is plain prose, so wrap it manually in `<div class="lesson-prose">`.

## Code examples

Use `<CodeBlock lang="..." code={...} caption="..." />` from `src/components/CodeBlock.astro`. See `code-examples.md` for content guidelines (what to put inside the code).

## Heading hierarchy

- `<h1>` — page title, rendered by `LessonLayout` from the lesson `hero`
- `<h2>` — section title, rendered by `<LessonSection title="...">`
- `<h3>` — subsection inside a section's body
- Never skip levels

## Navigation aids (automatic)

`LessonLayout` renders:

- **Breadcrumb** at the top — `aprenda frontend / {module name} / {lesson title}`
- **Sidebar** (lg+) — full course tree from `course.ts`, current module/lesson highlighted
- **TOC** (xl+) — built at runtime from `<section id="...">` `<h2>` titles, with scroll-spy
- **Prev / next lesson** — derived from the lesson's position in `course.ts`

You don't write any of these in the page.

## What to avoid

- Walls of text without code — alternate explanation and example
- Exercises that require external tools not yet introduced in the course
- Forward references to modules not yet covered (a brief "você vai ver isso no módulo de React" is fine)
- Hardcoding hero, breadcrumb, sidebar or nav inside pages — that lives in `course.ts`
- Forgetting `id` on a section that should appear in the right TOC
