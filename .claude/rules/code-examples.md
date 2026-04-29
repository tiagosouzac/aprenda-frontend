# Code Examples

Guidelines for the didactic code examples embedded in lesson pages.

## Purpose

Each example must teach exactly one concept. If an example needs a second concept to work, introduce that concept first in the text, or simplify the example.

## Format

Use a standard fenced code block with the language tag and an optional `title="..."` meta. The MDX pipeline routes the resulting `<pre>` through `src/components/MdxPre.astro`, which renders the dark-framed card with a language badge, a copy button, and (when present) an italic figcaption with the title.

````mdx
```js title="Variável declarada com const, impressa no console."
// cria uma saudação e imprime no console
const greeting = "Olá, mundo!";
console.log(greeting); // Olá, mundo!
```
````

How it works:

- The fence's language (`js`, `ts`, `bash`, `html`, `css`, `tsx`, `jsx`, `json`, `http`) feeds Shiki's highlighter (via Astro's default `shikiConfig`) and shows up as the badge in the top-left of the frame.
- The `title="..."` meta is forwarded to `<pre data-title="...">` by a small Shiki transformer (`src/lib/shiki-code-title.ts`), then read by `MdxPre.astro` and rendered as `<figcaption>`.
- A copy button is wired in `MdxPre.astro` and works on every figure with class `code-block-figure` — no per-block setup.

Do not import or write `<CodeBlock />`. The component was removed during the refactor; use the fence syntax above instead.

## Content of examples

- Code identifiers in English (variable names, function names, etc.).
- Inline comments in pt-BR when they explain the *lesson* (not internal logic).
- String literals and user-facing text within examples can be in pt-BR to feel natural to the student.
- Never use `foo`, `bar`, `baz` — use names that reflect what the variable holds.
- Captions are plain text, rendered in italic. Inline `<code>` formatting inside a caption is **not** parsed — it appears as literal backticks. Phrase the caption to read well without code formatting.

## Length

- Aim for 5–20 lines per example.
- Longer examples (e.g., a full React component) are acceptable only when the lesson explicitly builds a complete piece — annotate it section by section with comments.

## Progression

- First example in a section: minimal, no distractions.
- Subsequent examples: build on the previous one incrementally.
- Avoid jumping from "hello world" to a complex real-world pattern in one step.

## What to avoid

- Deprecated syntax (e.g., `var`, `XMLHttpRequest`) unless the lesson explicitly contrasts old vs. new.
- Patterns that would be bad practice in production (exceptions: lessons on refactoring or testing anti-patterns).
- Copy-pasted boilerplate that students don't need to understand yet.
- The legacy `<CodeBlock lang="..." code={template} caption="..." />` syntax. Removed.
- `export const someTemplate = ` at the top of an MDX to feed `<CodeBlock code={...} />`. Use a fenced block with the code inline instead.
