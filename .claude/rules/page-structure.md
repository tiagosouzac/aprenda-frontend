# Page Structure

Every lesson page must follow this structure to keep the course consistent and scannable.

## Required sections (in order)

1. **Hero** — page title (`<h1>`) and a one-sentence description of what the student will learn
2. **Introduction** — 2–4 paragraphs explaining the concept and why it matters, before any code
3. **Sections** — one `<section>` per major sub-topic, each with an `<h2>` heading
4. **Code examples** — placed inside the relevant section, never standalone at the top
5. **Summary** — brief recap (`<h2>Resumo</h2>`) of the key points covered

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
