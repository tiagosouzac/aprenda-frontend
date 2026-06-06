# Aprenda Frontend

Um curso introdutório e progressivo de desenvolvimento frontend, em português — da web ao React com TypeScript. Texto, exemplos de código e um quiz de verificação em cada aula.

**🔗 Ao vivo:** [aprenda-frontend.tiagocastro.dev](https://aprenda-frontend.tiagocastro.dev)

![Aprenda Frontend](./public/og.png)

---

## Sobre

Um site de conteúdo educacional com **99 aulas** organizadas em **9 módulos**, pensado para quem está começando do zero. Cada módulo assume apenas o que veio antes, e o fio condutor é a construção de um blog — refeito a cada nova tecnologia aprendida.

| Módulo | Conteúdo |
|---|---|
| Introdução | Visão geral do curso e do projeto |
| Como a web funciona | DNS, HTTP/HTTPS, renderização, cliente × servidor |
| HTML | Estrutura, semântica, formulários, acessibilidade |
| CSS | Seletores, box model, flexbox, grid, responsivo |
| JavaScript | Variáveis, funções, DOM, eventos, async/await, fetch |
| TypeScript | Tipos, interfaces, genéricos, modo strict |
| React | JSX, componentes, props tipadas, estado, efeitos, contexto |
| Testes | Vitest, Testing Library, Playwright |
| Próximos passos | Frameworks, full-stack, ferramentas e carreira |

## Stack

- **[Astro](https://astro.build)** — site estático; conteúdo em _content collections_
- **TypeScript** — em todo script e componente
- **Tailwind CSS v4** — via `@tailwindcss/vite`
- **MDX** — aulas escritas como Markdown com frontmatter validado por Zod
- **Shiki** — destaque de sintaxe nos exemplos de código
- Fontes auto-hospedadas (`@fontsource`) — sem requisição de rede ao Google Fonts
- Deploy contínuo no **GitHub Pages** via GitHub Actions

Sem framework de UI no site — React aparece apenas como _conteúdo_ do curso, não na construção das páginas.

## Decisões de arquitetura

- **Aula = um arquivo MDX.** Cada aula vive em `src/content/lessons/<módulo>/NN-slug.mdx`. Não há `.astro` por aula: a rota catch-all `src/pages/[...slug].astro` renderiza todas, trocando `h2`/`pre` por componentes de seção e blocos de código estilizados.
- **Fonte única de dados.** Metadados visuais de cada módulo ficam em `src/data/modules.ts`; `src/data/course.ts` combina isso com a collection. Sidebar, breadcrumb, navegação prev/next, TOC, redirects e sitemap se populam sozinhos — adicionar uma aula toca **somente** o MDX.
- **Numeração e âncoras automáticas.** Seções são numeradas por _CSS counter_ e ancoradas por `rehype-slug`; o TOC é construído em build a partir dos headings.
- **Quiz no frontmatter.** Cada aula pode declarar um `quiz:` (validado por Zod); o componente embaralha questões e alternativas e guarda o progresso em `localStorage`.

A documentação completa de convenções está em [`.claude/`](./.claude) (instruções de projeto, regras de conteúdo, voz editorial e design system).

## Rodando localmente

Requer **Node 22.12+**.

```bash
npm install        # instala dependências
npm run dev        # servidor de desenvolvimento em localhost:4321
npm run build      # build de produção em ./dist
npm run preview    # pré-visualiza o build
npm run og         # regenera a imagem social (public/og.png)
```

## Configuração do MCP (opcional)

O projeto usa o [Context7 MCP](https://context7.com) durante o desenvolvimento. Copie o exemplo e adicione sua própria chave:

```bash
cp .mcp.json.example .mcp.json
# edite .mcp.json e preencha CONTEXT7_API_KEY
```

`.mcp.json` é ignorado pelo git — nunca versione sua chave.

## Estrutura

```
src/
  pages/              # index, 404 e a rota catch-all [...slug] das aulas
  layouts/            # Layout (shell) + LessonLayout (chrome de aula)
  components/         # componentes .astro reutilizáveis
  content/lessons/    # um MDX por aula, em NN-slug.mdx
  data/               # modules.ts (metadados) + course.ts (helpers)
  lib/                # transformer Shiki para títulos de código
  styles/             # global.css (tokens + Tailwind)
scripts/
  generate-og.mjs     # gera a imagem social com satori + resvg
```

## Licença

Código sob licença MIT. Conteúdo das aulas © Tiago Castro.
