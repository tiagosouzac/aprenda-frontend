# Page Structure

Every lesson page must follow this structure to keep the course consistent and scannable.

## Required sections (in order)

1. **Hero** — eyebrow + page title (`<h1>`) + one-sentence description of what the student will learn (see pattern below)
2. **Introduction** — 2–4 paragraphs explaining the concept and why it matters, before any code
3. **Sections** — one `<section>` per major sub-topic, each with an `<h2>` heading
4. **Code examples** — placed inside the relevant section, never standalone at the top
5. **Summary** — brief recap (`<h2>Resumo</h2>`) of the key points covered

## Lesson hero pattern

Every lesson hero uses the same visual frame as the homepage hero (see `design-system.md`).

- **Eyebrow** — three pieces: `/ módulo 0X` in mono · divider · `subtítulo editorial` in italic serif. The eyebrow must carry information the title doesn't (see `copy-voice.md`)
- **Title** — `.font-display` with one word in italic serif (`var(--font-serif)`). Accent lands on the editorial word, never on the technical term
- **Module accent color** — use the module's token (`--color-web`, `--color-html`, etc.) for the dot in the eyebrow and any small markers in the hero. Do not introduce a new color per page
- **Description** — one short paragraph below the title, `text-ink/70` on light background, max ~52ch wide

Example scaffold:

```astro
<section class="relative bg-canvas pt-24 pb-16 lg:pt-32">
  <div class="mx-auto max-w-[1000px] px-6 lg:px-10">
    <div class="flex items-center gap-3 mb-8">
      <span class="mono text-[11px] tracking-[0.18em] uppercase text-mute">
        <span style="color: var(--color-html);">●</span> / módulo 02
      </span>
      <span class="h-px w-10 bg-line"></span>
      <span class="eyebrow text-[15px] text-ink">estrutura semântica</span>
    </div>
    <h1 class="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.98] font-medium tracking-[-0.035em]">
      HTML como
      <span class="font-serif italic font-normal" style="font-family: var(--font-serif);">fundação</span>
      semântica.
    </h1>
    <p class="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-ink/70">
      Uma linha descrevendo o que o aluno vai aprender nesta lição.
    </p>
  </div>
</section>
```

## Section anatomy

```astro
<section>
  <h2>Nome do Subtópico</h2>
  <p>Explanation in pt-BR...</p>

  <pre><code class="language-html">
    <!-- example code here -->
  </code></pre>
</section>
```

## Heading hierarchy

- `<h1>` — page title, once per page
- `<h2>` — major section
- `<h3>` — subsection within a major section
- Never skip levels (no `<h1>` → `<h3>`)

## Code examples

- Wrapped in `<pre><code class="language-{lang}">` — always declare the language
- Short and focused: illustrate one concept at a time
- Include a pt-BR comment explaining what the example shows when it is not obvious
- Prefer realistic over toy examples (real HTML tags, real CSS properties, real JS patterns)

## Navigation aids

- Each page must have a "breadcrumb" or back link to `/` at the top
- At the bottom, a "próxima aula" link pointing to the next module in sequence

## What to avoid

- Walls of text without code — always alternate explanation and example
- Exercises that require external tools not yet introduced in the course
- Forward references to modules not yet covered (exception: a brief "you will learn this in the React module" mention is fine)
