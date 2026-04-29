# Page Structure

Every lesson is a single MDX file in `src/content/lessons/<module-slug>/<NN-slug>.mdx`. There are no per-lesson `.astro` files — `src/pages/[...slug].astro` is the only lesson route, and it consumes the content collection.

## URL convention

- `/<module-slug>/<lesson-slug>` — every lesson lives at this depth (e.g., `/html/tags`, `/how-the-web-works/dns`).
- `/<module-slug>` — redirects to the first lesson of the module (configured in `src/data/modules.ts` via `firstLessonSlug`).
- The filename uses a numeric prefix for filesystem ordering (`03-tags.mdx`); the URL **strips** the prefix (`/html/tags`).

## Source of truth

| What | Where |
|---|---|
| Lesson title, description, hero, quiz, order | MDX frontmatter |
| Lesson body | MDX content |
| Module color, label, number, name, card visuals, first-lesson slug | `src/data/modules.ts` |
| Course shape (modules + ordered lessons), navigation helpers | `src/data/course.ts` (derives async from collection + `modules.ts`) |
| URL of the lesson | filename + folder, normalized by `[...slug].astro` |

To add a new lesson, **only the MDX file is touched**. The sidebar, breadcrumb, prev/next, sitemap, and TOC all populate themselves.

## Frontmatter schema

Defined in `src/content.config.ts` and validated by Zod:

```yaml
---
title: "HTML em geral"            # required
description: "Frase curta..."     # required, used in <meta description> + breadcrumb fallback
order: 1                          # required, ordering within the module
hero:                             # optional — renders the lesson hero
  titleBefore: "HTML como"
  titleAccent: "fundação"
  titleAfter: "semântica."
quiz:                             # optional — renders <LessonQuiz> automatically
  - question: "O que..."
    options:
      - "A primeira"
      - "A segunda"
    correct: 0
comingSoon: true                  # optional — renders the placeholder, body is ignored
---
```

## Authoring a new lesson — workflow

1. Pick the module folder (`src/content/lessons/<module-slug>/`).
2. Pick the next available numeric prefix (look at the existing files).
3. Create `NN-<slug>.mdx` with the frontmatter above.
4. Write the body as plain markdown. There is no need to import a layout, a section component, or a quiz component — the catch-all route handles all of that.

A complete lesson:

````mdx
---
title: "Tags, elementos e atributos"
description: "Como escrever marcação válida..."
order: 3
hero:
  titleBefore: "Tags,"
  titleAccent: "elementos"
  titleAfter: "e atributos."
quiz:
  - question: "Qual atributo identifica unicamente um elemento?"
    options: ["class", "id", "name", "role"]
    correct: 1
---

Parágrafo de introdução em pt-BR, sem nenhum wrapper. O layout aplica `.lesson-prose` automaticamente.

Pode ter dois ou três parágrafos antes da primeira seção.

## Tags básicas

Texto da seção. O número `01` aparece automaticamente via CSS counter, e o anchor `#tags-basicas` é gerado pelo `rehype-slug` a partir do título.

```html title="Estrutura mínima de um documento."
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <p>Olá, mundo</p>
  </body>
</html>
```

Outro parágrafo da seção.

## Atributos

Conteúdo da próxima seção…

## Resumo

- Recapitulação em bullet points.
- O número `04` aparecerá no eyebrow desta seção também — todas as `##` são numeradas.
````

## What the layout adds

`src/pages/[...slug].astro` and `src/layouts/LessonLayout.astro` together apply automatically:

- The lesson hero (when `hero` is set in frontmatter)
- The `.lesson-prose` wrapper around `<Content />`
- `<Content components={{ h2: SectionHeading, pre: MdxPre }} />` — every `##` becomes the styled section header (with auto-numbered eyebrow), every fenced block becomes the dark-framed code card with copy button
- The breadcrumb (`aprenda frontend / <module> / <lesson title>`)
- The course sidebar (lg+) with current module/lesson highlighted
- The right-rail TOC (xl+) — built from `render(lesson).headings`, filtering `depth === 2`, with scroll-spy
- The prev/next nav at the bottom — derived from the collection in course order
- The quiz section, when `quiz:` is set in frontmatter

You don't write any of these in the MDX.

## Section conventions

- Every `##` becomes a numbered section. There is no way to skip the number on a single section — embrace consistency.
- Avoid `###` unless you really need a subsection. The lesson should be a flat list of sections under the page title (`<h1>`, rendered in the hero).
- Don't add explicit `id` to headings. `rehype-slug` slugifies the text. If you change a heading's text, the anchor changes — that's expected.

## Stub lessons

For a not-yet-written lesson, set `comingSoon: true` in frontmatter and leave the body empty:

```mdx
---
title: "Tipografia e cores"
description: "..."
order: 9
comingSoon: true
---
```

`[...slug].astro` renders a placeholder paragraph. The lesson still appears in the sidebar/footer/redirects so URLs work end to end.

## Heading hierarchy

- `<h1>` — the lesson title, rendered by `LessonLayout` from `hero.title*`.
- `<h2>` — section title, written as `##` in MDX. Auto-numbered, anchored, in the right TOC.
- `<h3>` — subsection inside a section. Use sparingly. Not in the TOC.
- Never skip levels.

## What to avoid

- Importing `LessonSection`, `LessonQuiz`, or `CodeBlock` in MDX. None of those should exist after the refactor — the layout handles their roles.
- Adding entries to `src/data/course.ts` by hand. The course is derived from the collection.
- Writing a `.astro` file under `src/pages/<module>/...` for a lesson. Only the catch-all route exists.
- Manually wrapping content in `<div class="lesson-prose">`. The layout already does this.
- Manually generating the TOC, sidebar, breadcrumb, or prev/next.
- Forward references to modules later in the curriculum (a brief "você vai ver isso no módulo de React" is fine; full code samples are not).
