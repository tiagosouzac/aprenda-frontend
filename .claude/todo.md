# Todo — melhorias pendentes

## Alta prioridade

- [x] **Syntax highlighting no `CodeBlock`** — componente usa `class="language-js"` mas nenhuma biblioteca de highlighting está integrada. Código aparece como texto branco uniforme. Resolvido com o componente `<Code>` do Astro (Shiki).
- [x] **Navegação mobile em páginas de aula** — links de módulo ficam `hidden lg:flex`. O botão "módulos" linkava para `#modulos` (âncora que só existe na home). Em mobile, dentro de uma aula, o usuário não conseguia ir para outro módulo. Resolvido com hamburger menu + dropdown.
- [x] **Nested `<main>`** — `Layout.astro` envolvia o slot num `<main>`, e `LessonLayout.astro` colocava outro `<main>` dentro. HTML inválido, quebra semântica e acessibilidade.

## Média prioridade

- [x] **Botão de copiar no `CodeBlock`** — expectativa padrão em qualquer site técnico.
- [x] **Página 404 customizada** — não existia `src/pages/404.astro`.
- [ ] **Open Graph / Twitter Card** — `Layout.astro` tem só `<meta name="description">`. Links compartilhados ficam sem preview. *(deixado para quando o domínio final for definido)*

## Menor prioridade

- [x] **Progresso do aluno** — adicionado botão "Marcar como concluída" nas aulas + indicadores na sidebar, persistidos em `localStorage`.
- [x] **Sitemap** — integração `@astrojs/sitemap` instalada e configurada. *(URL do site precisa ser atualizada em `astro.config.mjs` quando o domínio for definido)*
- [ ] **Links placeholder no footer e nav** — GitHub, Feedback e Changelog apontam para `https://github.com`. *(aguardando URL real do repositório)*
