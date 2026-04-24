# Code Examples

Guidelines for the didactic code examples embedded in lesson pages.

## Purpose

Each example must teach exactly one concept. If an example needs a second concept to work, introduce that concept first in the text, or simplify the example.

## Format

Use the `<CodeBlock />` component from `src/components/CodeBlock.astro` — it renders the canonical `<pre><code class="language-X">` shape inside a styled dark frame with a language badge and an optional caption.

```astro
<CodeBlock
  lang="js"
  code={`// cria uma saudação e imprime no console
const greeting = "Olá, mundo!";
console.log(greeting); // Olá, mundo!`}
  caption="Variável declarada com const, impressa no console."
/>
```

- `lang` — `html | css | js | ts | jsx | tsx | bash | json`
- `code` — multi-line template literal; rendered as plain text inside the code block
- `caption` — optional figcaption rendered below in italic

Inline output comments (`// output`) are encouraged to show what the code produces.

## Content of examples

- Code identifiers in English (variable names, function names, etc.)
- Inline comments in pt-BR when they explain the *lesson* (not internal logic)
- String literals and user-facing text within examples can be in pt-BR to feel natural to the student
- Never use `foo`, `bar`, `baz` — use names that reflect what the variable holds

## Length

- Aim for 5–20 lines per example
- Longer examples (e.g., a full React component) are acceptable only when the lesson explicitly builds a complete piece — annotate it section by section with comments

## Progression

- First example in a section: minimal, no distractions
- Subsequent examples: build on the previous one incrementally
- Avoid jumping from "hello world" to a complex real-world pattern in one step

## What to avoid

- Deprecated syntax (e.g., `var`, `XMLHttpRequest`) unless the lesson explicitly contrasts old vs. new
- Patterns that would be bad practice in production (exceptions: lessons on refactoring or testing anti-patterns)
- Copy-pasted boilerplate that students don't need to understand yet
