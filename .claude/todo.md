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

---

# Planejamento de conteúdo

Plano de aulas por módulo. Cada aula vira um arquivo MDX dentro de `src/content/lessons/<modulo>/<slug>.mdx` e é registrada em `src/data/course.ts`.

## Convenções

### URLs
- **Todas as aulas em subrotas.** Não há aula no root do módulo.
- **O root do módulo redireciona para a primeira aula** (ex.: `/html` → `/html/introducao`).
- **Redirect dinâmico via `course.ts`.** Uma rota `src/pages/[module]/index.astro` com `getStaticPaths()` lê `course.ts`, gera um arquivo HTML por módulo no build com meta refresh para a primeira lesson daquele módulo. Adicionar/remover módulos não exige editar `astro.config.mjs`.
- **Slugs em pt-BR sem acentos** (`introducao`, `seletores`, `funcoes`). Termos técnicos universais ficam no original (`jsx`, `dom-selecao`, `flexbox`, `grid`, `props`, `fetch`, `async-await`, `vitest`, `playwright`, `mocks`, `arrays`, `strings`, `promises`, `generics`, `context`).

### Conteúdo
- **Pasta por módulo:** `src/content/lessons/<modulo>/<slug>.mdx`.
- **Conteúdo das aulas em pt-BR**, identificadores e nomes de arquivo seguem `language.md`.
- **Aula de "Resumo do módulo"** (`resumo.mdx`) ao fim de cada módulo.

### Migração inicial (aprovada)
- Mover `src/content/lessons/how-the-web-works.mdx` → `src/content/lessons/how-the-web-works/introducao.mdx`.
- Atualizar `src/data/course.ts` para usar a nova href `/how-the-web-works/introducao`.
- Ajustar a rota dinâmica em `src/pages/[...slug].astro` se necessário para casar com a nova estrutura de pastas.

---

## Módulo 01 · Web — Fundamentos

Pasta: `src/content/lessons/how-the-web-works/`
Root `/how-the-web-works` redireciona para `/how-the-web-works/introducao`.

1. **Como a web funciona** (`/how-the-web-works/introducao` → `introducao.mdx`) — Visão geral do que acontece entre digitar uma URL e a página aparecer na tela. Apresenta os personagens (cliente, servidor, DNS, HTTP, navegador) que serão detalhados nas aulas seguintes e mostra o caminho completo em ordem cronológica.
2. **DNS — do nome ao endereço** (`/how-the-web-works/dns` → `dns.mdx`) — Como nomes como `example.com` viram endereços IP. Hierarquia de servidores DNS (raiz, TLD, autoritativo), o papel do resolver, cache, e os tipos de registro mais comuns (A, AAAA, CNAME, MX).
3. **HTTP — pedido e resposta** (`/how-the-web-works/http` → `http.mdx`) — A linguagem que cliente e servidor usam para conversar. Estrutura de uma requisição e de uma resposta, métodos (GET, POST, PUT, DELETE), códigos de status (2xx, 3xx, 4xx, 5xx) e cabeçalhos importantes.
4. **HTTPS — conversa criptografada** (`/how-the-web-works/https` → `https.mdx`) — O que muda quando aparece o `s`. TLS em alto nível, certificados, autoridades certificadoras, cadeia de confiança. O que HTTPS protege e o que ele não protege.
5. **Cliente e servidor** (`/how-the-web-works/cliente-servidor` → `cliente-servidor.mdx`) — O que roda no navegador e o que roda no servidor. Por que essa divisão existe, como ela aparece em qualquer aplicação web e o que cada lado é bom (e ruim) em fazer.
6. **Como o navegador renderiza** (`/how-the-web-works/renderizacao` → `renderizacao.mdx`) — De bytes até pixels. Parsing do HTML, construção do DOM e do CSSOM, render tree, layout, paint e composição. Onde o JavaScript entra nesse pipeline.
7. **Hospedagem e domínios** (`/how-the-web-works/hospedagem` → `hospedagem.mdx`) — Onde os arquivos do site moram. Diferença entre hospedagem estática, dinâmica e CDN; o papel do registrador de domínios; como apontar um domínio para um servidor.
8. **Resumo do módulo** (`/how-the-web-works/resumo` → `resumo.mdx`) — Checklist consolidado: o caminho completo de uma requisição, vocabulário essencial (DNS, HTTP, TLS, render pipeline), o que esperar de cliente vs. servidor.

## Módulo 02 · HTML — Estrutura

Pasta: `src/content/lessons/html/`
Root `/html` redireciona para `/html/introducao`.

1. **HTML em geral** (`/html/introducao` → `introducao.mdx`) — O que é HTML, por que existe e como o navegador transforma marcação em uma árvore (DOM). O papel do HTML na trinca HTML/CSS/JS e por que ele é a base.
2. **Anatomia de um documento** (`/html/anatomia-documento` → `anatomia-documento.mdx`) — A estrutura mínima de uma página: `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`. Metadados essenciais no `<head>`: `charset`, `viewport`, `title`, `description`, ícone.
3. **Tags, elementos e atributos** (`/html/tags` → `tags.mdx`) — Como escrever marcação válida: tags de abertura e fechamento, aninhamento correto, elementos vazios, atributos globais (`id`, `class`, `data-*`) e atributos específicos.
4. **Texto e conteúdo** (`/html/texto` → `texto.mdx`) — Cabeçalhos `<h1>`–`<h6>`, parágrafos, ênfase (`<strong>`, `<em>`), listas ordenadas e não ordenadas, citações, código inline e quebras de linha.
5. **Links** (`/html/links` → `links.mdx`) — A âncora `<a>` e o atributo `href`. Links relativos vs. absolutos, links para âncoras na própria página, abrir em nova aba e quando usar `rel="noopener"`.
6. **Imagens e mídia** (`/html/imagens-midia` → `imagens-midia.mdx`) — `<img>` com `alt`, dimensões, `loading="lazy"`, formatos modernos (`webp`, `avif`). Vídeo e áudio com `<video>` e `<audio>`.
7. **HTML semântico** (`/html/semantica` → `semantica.mdx`) — Por que `<div>` em todo lugar não é suficiente. `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>` e o que cada um significa para navegadores e leitores de tela.
8. **Formulários** (`/html/formularios` → `formularios.mdx`) — `<form>`, `<input>` e seus tipos, `<label>`, `<select>`, `<textarea>`, `<button>`. Validação nativa com `required`, `pattern`, `minlength`, `type="email"`.
9. **Acessibilidade básica** (`/html/acessibilidade` → `acessibilidade.mdx`) — Como escrever HTML que funcione para todo mundo. `alt` descritivo, labels associados a inputs, foco visível, contraste mínimo e quando recorrer a roles ARIA.
10. **Resumo do módulo** (`/html/resumo` → `resumo.mdx`) — Checklist final para qualquer página HTML: doctype, charset, viewport, title, semântica correta, alt em imagens, labels em inputs, hierarquia de cabeçalhos.

## Módulo 03 · CSS — Aparência

Pasta: `src/content/lessons/css/`
Root `/css` redireciona para `/css/introducao`.

1. **CSS em geral** (`/css/introducao` → `introducao.mdx`) — O que é CSS, como ele se conecta ao HTML (inline, `<style>`, `<link>`) e por que separar conteúdo de aparência. Como o navegador combina HTML e CSS para pintar a tela.
2. **Seletores** (`/css/seletores` → `seletores.mdx`) — Por tag, classe, id, atributo, descendente, filho, irmão. Pseudo-classes (`:hover`, `:focus`, `:nth-child`) e pseudo-elementos (`::before`, `::after`).
3. **Especificidade e cascata** (`/css/cascata` → `cascata.mdx`) — Como o navegador decide qual regra ganha quando duas se aplicam. Cálculo da especificidade, ordem das fontes, herança e por que `!important` quase sempre é sintoma de um problema maior.
4. **Modelo de caixa** (`/css/modelo-de-caixa` → `modelo-de-caixa.mdx`) — Conteúdo, padding, border, margin. `box-sizing: border-box` e por que praticamente todo projeto adota como padrão. Margens colapsando.
5. **Display e fluxo** (`/css/display-fluxo` → `display-fluxo.mdx`) — `block`, `inline`, `inline-block`. Como elementos se posicionam por padrão antes de qualquer layout especial. Quando essa base já basta.
6. **Posicionamento** (`/css/posicionamento` → `posicionamento.mdx`) — `static`, `relative`, `absolute`, `fixed`, `sticky`. Quando usar cada um, o que é stacking context e como `z-index` realmente funciona.
7. **Flexbox** (`/css/flexbox` → `flexbox.mdx`) — Layout em uma dimensão. `display: flex`, eixos principal e cruzado, `justify-content`, `align-items`, `gap`, `flex-grow`/`shrink`/`basis`.
8. **Grid** (`/css/grid` → `grid.mdx`) — Layout em duas dimensões. `display: grid`, definição de linhas e colunas, `grid-template-areas`, `gap`, posicionamento explícito de itens e grids implícitos.
9. **Tipografia e cores** (`/css/tipografia-cores` → `tipografia-cores.mdx`) — `font-family`, `font-size`, `line-height`, `letter-spacing`. Unidades (`px`, `rem`, `em`, `%`) e formatos de cor (hex, rgb, hsl, oklch). Web fonts.
10. **Design responsivo** (`/css/responsivo` → `responsivo.mdx`) — Mobile-first, media queries, container queries (visão geral). Funções `clamp()`, `min()`, `max()` para tipografia e espaçamentos fluidos. Imagens responsivas.
11. **Custom properties** (`/css/variaveis` → `variaveis.mdx`) — Variáveis CSS (`--cor-primaria`), escopo, herança, fallback. Uso prático em design tokens, tematização e modo escuro.
12. **Resumo do módulo** (`/css/resumo` → `resumo.mdx`) — Checklist final: reset/normalize, mobile-first, hierarquia de seletores enxuta, uso consciente de Flexbox vs. Grid, tokens com custom properties.

## Módulo 04 · JavaScript — Comportamento

Pasta: `src/content/lessons/javascript/`
Root `/javascript` redireciona para `/javascript/introducao`.

1. **JavaScript em geral** (`/javascript/introducao` → `introducao.mdx`) — O que é JS, onde ele roda, breve história e por que se tornou a linguagem da web. O modelo mental: HTML estrutura, CSS pinta, JS faz acontecer.
2. **Como rodar JavaScript** (`/javascript/executando` → `executando.mdx`) — Console do navegador, `<script>` em uma página HTML (`defer`, `async`, módulos), e Node.js para rodar fora do navegador.
3. **Variáveis e tipos** (`/javascript/variaveis-tipos` → `variaveis-tipos.mdx`) — `let`, `const` e por que `var` foi substituído. Tipos primitivos: string, number, boolean, null, undefined, symbol, bigint. Coerção e armadilhas.
4. **Operadores e expressões** (`/javascript/operadores` → `operadores.mdx`) — Aritméticos, comparação (`===` vs. `==`), lógicos (`&&`, `||`, `??`), ternário, atribuição. Curto-circuito.
5. **Controle de fluxo** (`/javascript/controle-fluxo` → `controle-fluxo.mdx`) — `if`/`else`, `switch`, `for`, `while`, `for...of`, `for...in`. Quando usar cada um e por que `for...of` é o padrão moderno para iterar arrays.
6. **Funções** (`/javascript/funcoes` → `funcoes.mdx`) — Declaração, expressão, arrow function. Parâmetros, valores padrão, rest, retorno. Escopo léxico e closures em alto nível.
7. **Arrays** (`/javascript/arrays` → `arrays.mdx`) — Criação, acesso, iteração. Métodos imutáveis (`map`, `filter`, `reduce`, `find`, `some`, `every`) e métodos mutáveis (`push`, `pop`, `splice`).
8. **Objetos** (`/javascript/objetos` → `objetos.mdx`) — Criação literal, acesso por ponto e por colchete, desestruturação, spread, métodos. Referência vs. valor.
9. **Strings** (`/javascript/strings` → `strings.mdx`) — Template literals, métodos comuns (`split`, `replace`, `includes`, `slice`, `trim`). Interpolação e multilinha.
10. **DOM — selecionando elementos** (`/javascript/dom-selecao` → `dom-selecao.mdx`) — `document.querySelector`, `querySelectorAll`, `getElementById`. Como navegar pela árvore com `parentElement`, `children`, `closest`.
11. **DOM — manipulando elementos** (`/javascript/dom-manipulacao` → `dom-manipulacao.mdx`) — Mudar texto e atributos, alternar classes (`classList`), criar e inserir nós, remover nós. Diferença entre `innerHTML` e `textContent`.
12. **Eventos** (`/javascript/eventos` → `eventos.mdx`) — `addEventListener`, tipos de evento, objeto `event`, `preventDefault`, propagação (capture/bubble) e delegação de eventos.
13. **Assíncrono — promises** (`/javascript/promises` → `promises.mdx`) — Por que código assíncrono existe. Callbacks, callback hell, promises, `then`/`catch`/`finally`, `Promise.all` e `Promise.race`.
14. **Assíncrono — async/await** (`/javascript/async-await` → `async-await.mdx`) — Sintaxe moderna para promises. Tratamento de erros com `try`/`catch`. Quando uma função é `async` e o que isso significa.
15. **Fetch — falando com servidores** (`/javascript/fetch` → `fetch.mdx`) — Requisições HTTP no navegador com `fetch`. Leitura de resposta JSON, envio de dados via POST, tratamento de erros, cancelamento.
16. **Módulos** (`/javascript/modulos` → `modulos.mdx`) — `import` e `export`, ESM vs. CommonJS, default vs. named exports, organização de código em arquivos e pastas.
17. **Resumo do módulo** (`/javascript/resumo` → `resumo.mdx`) — Checklist final: `const` por padrão, `===` sempre, imutabilidade nos arrays/objetos quando possível, `async/await` em vez de `.then()` aninhado.

## Módulo 05 · TypeScript — Tipos

Pasta: `src/content/lessons/typescript/`
Root `/typescript` redireciona para `/typescript/introducao`.

1. **TypeScript em geral** (`/typescript/introducao` → `introducao.mdx`) — Por que adicionar tipos a JavaScript. O que TS resolve (erros antes de rodar, autocompletar, refactor seguro) e o que ele não resolve.
2. **Configurando TypeScript** (`/typescript/configuracao` → `configuracao.mdx`) — `tsconfig.json` essencial, compilação com `tsc`, `strict` mode, integração com VS Code e com bundlers como Vite.
3. **Tipos básicos** (`/typescript/tipos-basicos` → `tipos-basicos.mdx`) — `string`, `number`, `boolean`, `null`, `undefined`, `any`, `unknown`, `never`. Arrays, tuplas e enums (e quando evitar enum).
4. **Anotações e inferência** (`/typescript/inferencia` → `inferencia.mdx`) — Quando anotar e quando deixar TS inferir. A filosofia "anote nas bordas, infira no meio".
5. **Funções tipadas** (`/typescript/funcoes` → `funcoes.mdx`) — Parâmetros, retornos, parâmetros opcionais, valores padrão, rest. `void` e `never` em retornos. Sobrecargas em alto nível.
6. **Interfaces e type aliases** (`/typescript/interfaces-tipos` → `interfaces-tipos.mdx`) — Diferenças práticas, quando preferir `interface` e quando `type`. Extensão e composição.
7. **Union e intersection types** (`/typescript/unioes-intersecoes` → `unioes-intersecoes.mdx`) — `A | B`, `A & B`. Narrowing com type guards (`typeof`, `in`, `instanceof`) e discriminated unions.
8. **Generics** (`/typescript/generics` → `generics.mdx`) — Por que existem e quando aparecem. Sintaxe `<T>`, restrições com `extends`, generics em funções, tipos e classes.
9. **Tipos utilitários** (`/typescript/tipos-utilitarios` → `tipos-utilitarios.mdx`) — `Partial`, `Required`, `Pick`, `Omit`, `Record`, `ReturnType`, `Awaited`. Como combinar para descrever transformações comuns.
10. **Tipos avançados** (`/typescript/tipos-avancados` → `tipos-avancados.mdx`) — Mapped types, conditional types, template literal types em alto nível. Quando faz sentido se aprofundar.
11. **TypeScript em projetos reais** (`/typescript/projetos-reais` → `projetos-reais.mdx`) — Tipando respostas de API, `as const`, declarações ambientes (`.d.ts`), evitando `any`, lidando com bibliotecas sem tipos.
12. **Resumo do módulo** (`/typescript/resumo` → `resumo.mdx`) — Checklist final: `strict: true`, evitar `any`, preferir inferência, modelar dados com tipos antes de escrever lógica.

## Módulo 06 · React — Componentes

Pasta: `src/content/lessons/react/`
Root `/react` redireciona para `/react/introducao`.

1. **React em geral** (`/react/introducao` → `introducao.mdx`) — O que é React, por que existe e em que ele difere de manipular o DOM diretamente. Modelo declarativo, virtual DOM em alto nível, componentes como blocos de construção.
2. **Configurando um projeto React** (`/react/configuracao` → `configuracao.mdx`) — Vite com template React + TS, estrutura de pastas, `npm run dev`. A primeira página renderizada.
3. **JSX** (`/react/jsx` → `jsx.mdx`) — Sintaxe que mistura HTML e JS. Expressões dentro de chaves, atributos (`className`, `htmlFor`), fragmentos (`<>...</>`), comentários.
4. **Componentes** (`/react/componentes` → `componentes.mdx`) — Função que retorna JSX, exportação e importação, composição de componentes. Convenção de nome em PascalCase.
5. **Props** (`/react/props` → `props.mdx`) — Passando dados de pai para filho. Props como objeto, desestruturação, valores padrão, `children` como prop especial.
6. **Tipando props com TypeScript** (`/react/tipando-props` → `tipando-props.mdx`) — Interface de props, props opcionais, `ReactNode`, tipos de eventos e refs. Padrões comuns.
7. **Estado com `useState`** (`/react/estado` → `estado.mdx`) — O que é estado e por que ele dispara re-renderizações. Sintaxe do hook, atualizações baseadas no estado anterior, regras dos hooks.
8. **Renderização condicional e listas** (`/react/condicional-listas` → `condicional-listas.mdx`) — `&&`, ternário, retorno antecipado. `.map()` para renderizar listas e a importância da `key`.
9. **Eventos em React** (`/react/eventos` → `eventos.mdx`) — `onClick`, `onChange`, `onSubmit`. Tipos de evento sintético, formulários controlados vs. não controlados.
10. **Efeitos com `useEffect`** (`/react/efeitos` → `efeitos.mdx`) — Quando rodar código fora da renderização. Array de dependências, função de cleanup, padrões comuns (timers, subscrições, fetch).
11. **Compartilhando estado entre componentes** (`/react/compartilhando-estado` → `compartilhando-estado.mdx`) — Lifting state up, prop drilling, quando passar callbacks para baixo. Sinais de que o estado está no lugar errado.
12. **Context API** (`/react/context` → `context.mdx`) — Compartilhando estado sem passar props manualmente em vários níveis. Quando faz sentido e quando é exagero.
13. **Buscando dados** (`/react/buscando-dados` → `buscando-dados.mdx`) — `useEffect` + `fetch`, estados de loading/error/success, race conditions. Visão geral de bibliotecas como TanStack Query.
14. **Construindo um componente prático** (`/react/exemplo-pratico` → `exemplo-pratico.mdx`) — Junta props, estado, efeitos e eventos em um componente completo (ex.: lista de tarefas com filtro).
15. **Resumo do módulo** (`/react/resumo` → `resumo.mdx`) — Checklist final: componentes pequenos, estado no nível certo, dependências do `useEffect` honestas, tipagem de props sempre.

## Módulo 07 · Testes — Qualidade

Pasta: `src/content/lessons/testing/`
Root `/testing` redireciona para `/testing/introducao`.

1. **Por que escrever testes** (`/testing/introducao` → `introducao.mdx`) — Confiança para mudar código, refactor seguro, documentação executável, captura de regressões. O que testes resolvem e o que não resolvem.
2. **Tipos de teste** (`/testing/tipos-de-teste` → `tipos-de-teste.mdx`) — Pirâmide de testes: unitário, integração, end-to-end. Tradeoffs de velocidade, custo de manutenção e fidelidade ao comportamento real.
3. **Vitest — primeiros testes** (`/testing/vitest` → `vitest.mdx`) — Instalação, primeiro arquivo `.test.ts`, `describe`, `test`, `expect`. Matchers mais usados (`toBe`, `toEqual`, `toContain`, `toThrow`).
4. **Estruturando testes** (`/testing/estrutura` → `estrutura.mdx`) — Arrange/Act/Assert, nomes que descrevem comportamento esperado, evitar lógica nos testes, isolar setup com `beforeEach`.
5. **Testando funções puras** (`/testing/funcoes-puras` → `funcoes-puras.mdx`) — Casos clássicos: formatação de datas, cálculos, validações. Como pensar em casos felizes, casos limite e entradas inválidas.
6. **Mocks e stubs** (`/testing/mocks` → `mocks.mdx`) — Quando substituir dependências externas (rede, tempo, módulos) e como, com `vi.fn()` e `vi.mock()`. Riscos de mockar demais.
7. **Testando componentes React com Testing Library** (`/testing/testing-library` → `testing-library.mdx`) — Renderização, queries por papel/texto/label, simulação de interação com `userEvent`. Princípio de "testar como o usuário usa".
8. **Testes de integração** (`/testing/integracao` → `integracao.mdx`) — Vários módulos juntos: componente + hook, formulário + API mockada. Quando esse nível compensa mais do que muitos unitários.
9. **End-to-end com Playwright** (`/testing/playwright` → `playwright.mdx`) — O que é E2E, primeiro teste, seletores baseados em papel, espera explícita, screenshots. Quando E2E cabe e quando é caro demais.
10. **O que testar e o que não testar** (`/testing/o-que-testar` → `o-que-testar.mdx`) — Foco em comportamento, não implementação. Sinais de teste frágil. Cobertura como guia, não meta.
11. **Resumo do módulo** (`/testing/resumo` → `resumo.mdx`) — Checklist final: pirâmide saudável, testes que sobrevivem a refactor, mocks com parcimônia, E2E nos fluxos críticos.

## Módulo 08 · Próximos passos — Horizonte

Pasta: `src/content/lessons/next-steps/`
Root `/next-steps` redireciona para `/next-steps/introducao`.

1. **Recapitulando** (`/next-steps/introducao` → `introducao.mdx`) — Mapa do que foi coberto no curso e do que essa base permite construir agora. Como cada módulo se conecta ao próximo passo.
2. **Frameworks frontend** (`/next-steps/frameworks` → `frameworks.mdx`) — Quando subir um nível além do React puro: Next.js, Astro, Remix, SvelteKit. O que cada um traz (roteamento, SSR, SSG, server components).
3. **Outras bibliotecas de UI** (`/next-steps/outras-bibliotecas` → `outras-bibliotecas.mdx`) — Vue, Svelte, Solid, Qwik. Comparação rápida com React em modelo mental e ergonomia.
4. **Estilização avançada** (`/next-steps/estilizacao-avancada` → `estilizacao-avancada.mdx`) — Tailwind CSS, CSS Modules, styled-components, vanilla-extract, Panda. Tradeoffs entre runtime, build time e tamanho do bundle.
5. **Backend para devs frontend** (`/next-steps/backend` → `backend.mdx`) — Node.js, APIs REST, GraphQL, BFF, banco de dados (SQL vs. NoSQL). Quanto saber para conversar com quem cuida do servidor.
6. **Ferramentas de build** (`/next-steps/ferramentas-de-build` → `ferramentas-de-build.mdx`) — Vite, esbuild, webpack, Turbopack. O que cada uma faz, quando se aprofundar e como debugar problemas de build.
7. **Linting, formatação e tipagem estrita** (`/next-steps/lint-formatacao` → `lint-formatacao.mdx`) — ESLint, Biome, Prettier. Configurações que valem a pena adotar do dia 1 em qualquer projeto.
8. **CI/CD e deploy** (`/next-steps/deploy` → `deploy.mdx`) — Vercel, Netlify, Cloudflare Pages, GitHub Actions. Pipeline básico: lint, type-check, test, build, deploy.
9. **Performance** (`/next-steps/performance` → `performance.mdx`) — Core Web Vitals (LCP, INP, CLS), lazy loading, code splitting, otimização de imagens, Lighthouse.
10. **Onde aprender mais** (`/next-steps/recursos` → `recursos.mdx`) — MDN, documentação oficial, comunidades em pt-BR e em inglês, livros e canais. Como filtrar conteúdo desatualizado.
11. **Caminhos de carreira** (`/next-steps/carreira` → `carreira.mdx`) — Frontend, full-stack, UI engineering, DevRel, design engineering. Sinais de que cada caminho pode encaixar com o seu perfil.
