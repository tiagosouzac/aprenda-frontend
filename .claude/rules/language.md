# Language Rules

## Code language: English

All code identifiers must be written in English:

- Variable names: `userName`, `isLoading`, `fetchUserData`
- Function names: `handleClick`, `formatDate`, `validateInput`
- Component names: `NavBar`, `CodeBlock`, `LessonCard`
- CSS class names: `.hero-title`, `.code-example`, `.nav-link`
- File names: `layout.astro`, `code-block.astro`, `nav.astro`
- Git commit messages
- Code comments that explain logic (not content)
- TypeScript types, interfaces, enums: `UserRole`, `LessonConfig`
- Astro frontmatter variables and imports

## Content language: Portuguese (pt-BR)

All user-facing content must be written in Brazilian Portuguese:

- Page text, headings, paragraphs
- Navigation labels and button text
- Code example comments that explain *what* the example teaches (not internal logic)
- Alt text for images
- Error messages shown to users
- Inline explanations within `<pre><code>` blocks (e.g., `// cria um array`)
- `<title>` and `<meta description>` tags
- ARIA labels and accessibility text

## Examples

```astro
---
// ✅ frontmatter: English identifiers
const pageTitle = "HTML";
const lessonSections = ["Estrutura", "Semântica", "Formulários"];
---

<!-- ✅ content: pt-BR -->
<h1>Introdução ao HTML</h1>
<p>Aprenda como estruturar documentos web com HTML.</p>

<!-- ✅ code example comment: pt-BR (explains the lesson) -->
<pre><code>
// cria um elemento e adiciona ao DOM
const el = document.createElement('p');
document.body.appendChild(el);
</code></pre>
```

## Rationale

The course audience is Brazilian Portuguese speakers. Using English in code mirrors real-world professional practice — production codebases are almost always written in English — while keeping all explanations and content in pt-BR ensures accessibility for beginners.
