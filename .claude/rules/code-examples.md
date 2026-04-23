# Code Examples

Guidelines for the didactic code examples embedded in lesson pages.

## Purpose

Each example must teach exactly one concept. If an example needs a second concept to work, introduce that concept first in the text, or simplify the example.

## Format

```astro
<pre><code class="language-js">
// pt-BR comment explaining the concept
const greeting = "Olá, mundo!";
console.log(greeting); // Olá, mundo!
</code></pre>
```

- Always set `class="language-{lang}"` for syntax highlighting compatibility
- Supported language tokens: `html`, `css`, `js`, `ts`, `jsx`, `tsx`, `bash`, `json`
- Inline output comments (`// output`) are encouraged to show what code produces

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
