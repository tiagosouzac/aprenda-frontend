# Outline — Módulo 08: Próximos Passos — Horizonte

**Fio condutor**: O blog foi construído do zero — HTML puro, CSS, JS, TypeScript, React e testes. Este módulo usa o blog como ponto de partida para mostrar o que vem depois: onde fazer o deploy, o que React ainda não resolve (e frameworks que resolvem), como comunicar com um backend, e como desenvolver uma carreira nessa área.

**Tom**: diferente dos módulos anteriores — menos código, mais orientação. Cada lição é um mapa de decisões, não um tutorial. O objetivo é que o estudante saiba o que aprender a seguir e por quê.

---

## Lição 1: Recapitulando

### Seções (H2)

#### O que foi construído
- Módulo a módulo, o blog cresceu: estrutura HTML → estilo CSS → comportamento JS → tipos TS → componentes React → testes
- Cada módulo adicionou uma camada, mas o produto era o mesmo — mostra como as tecnologias se compõem
- O estudante agora entende o que acontece em cada camada quando abre qualquer site
- **Código**: diagrama das camadas do blog (HTML + CSS + JS + TS + React + Testes)

#### O que cada módulo permite fazer agora
- Web: ler erros de rede, entender headers, debugar com o devtools
- HTML: estruturar qualquer conteúdo de forma semântica e acessível
- CSS: criar layouts responsivos, temáticos e componíveis
- JavaScript: adicionar comportamento, consumir APIs, organizar em módulos
- TypeScript: detectar erros antes de rodar, refatorar com segurança
- React: construir UIs declarativas com estado e componentes reutilizáveis
- Testes: mudar código com confiança

#### O que ainda não foi visto
- Renderização no servidor (SSR, SSG)
- Backend e banco de dados
- Deploy e CI/CD
- Este módulo é o mapa — cada lição aponta para onde aprofundar

---

## Lição 2: Fazendo o deploy do blog

### Seções (H2)

#### Build para produção
- `npm run build`: Vite compila, minifica e gera os arquivos em `dist/`
- `npm run preview`: visualizar a build de produção localmente antes do deploy
- O que está em `dist/`: HTML, CSS e JS otimizados — é isso que vai pro servidor
- **Código**: output de `npm run build` — ver o tamanho dos arquivos gerados

#### Vercel — deploy em dois comandos
- `npm install -g vercel && vercel`: autenticar, conectar o projeto, deploy
- Cada push para o repositório faz um novo deploy automaticamente
- Pull requests recebem preview URLs — testar antes de mesclar
- **Código**: `vercel.json` mínimo para o blog React (SPA com fallback para `index.html`)

#### Netlify e Cloudflare Pages
- Netlify: arrastar a pasta `dist/` no dashboard — deploy instantâneo; ou conectar ao Git
- Cloudflare Pages: CDN global, build integrado, analytics básico gratuito
- As três opções são equivalentes para sites estáticos — diferem em extras (functions, analytics, edge)
- **Código**: `netlify.toml` e `_redirects` para SPA routing no Netlify

#### Domínio personalizado
- Comprar o domínio → apontar os nameservers para o provedor de hosting
- Ou: manter o domínio no registrador e apontar um registro CNAME para o serviço
- HTTPS é automático em todos os três serviços (Let's Encrypt)
- **Código**: configuração de registro DNS para apontar `artigo.dev` para Vercel

---

## Lição 3: Frameworks frontend

### Seções (H2)

#### Quando React puro não basta
- O blog React é uma SPA (Single Page Application): um HTML, tudo carregado no cliente
- Problemas: SEO ruim (robôs veem HTML vazio), lento no primeiro carregamento, sem geração de rotas
- Frameworks resolvem: roteamento, SSR (renderizar no servidor), SSG (gerar HTML em build time)
- **Código**: diff do HTML enviado pelo servidor — SPA React vazio vs. Next.js com conteúdo

#### Next.js — o mais usado com React
- App Router: rotas são pastas em `app/` — `app/artigos/[slug]/page.tsx`
- Server Components: componentes que rodam no servidor — sem JS no cliente, acesso direto ao banco
- SSG e SSR: gerar páginas estáticas em build ou renderizar por requisição
- O blog seria ideal para SSG: artigos não mudam entre deploys
- **Código**: `app/artigos/[slug]/page.tsx` equivalente ao `ArticlePage` do módulo React

#### Astro — para sites de conteúdo
- Astro gera HTML estático por padrão — zero JS no cliente a menos que você peça
- Islands architecture: componentes interativos são ilhas de JS num oceano de HTML estático
- Ideal para: blogs, documentação, sites de marketing — exatamente o que o blog é
- **Código**: a mesma `ArticlePage` como componente `.astro` — comparar com a versão React

#### Vue com Nuxt e Svelte com SvelteKit
- Vue: modelo mental similar ao React mas com templates HTML, reatividade por objeto
- Nuxt: framework para Vue como Next.js é para React — SSR, SSG, roteamento baseado em arquivos
- Svelte: compila para JS sem runtime — componentes simples, sem virtual DOM
- SvelteKit: o framework de Svelte — estrutura similar ao Next.js
- **Código**: o mesmo `ArticleCard` em Vue (SFC) e em Svelte — comparar sintaxe

---

## Lição 4: Outras bibliotecas de UI

### Seções (H2)

#### Por que existem alternativas ao React
- React domina o mercado mas não é a única opção
- Diferentes modelos mentais, diferentes tradeoffs de performance e ergonomia
- Conhecer as alternativas ajuda a entender o que React faz de especial — e o que não faz
- **Código**: nenhum — contexto histórico das bibliotecas

#### Vue
- Templates HTML com lógica em atributos especiais (`v-if`, `v-for`, `@click`)
- Reatividade baseada em proxies — `reactive()` e `ref()` em vez de `useState()`
- Composição similar ao React (Composition API) ou mais declarativa (Options API)
- **Código**: `ArticleCard.vue` com `<template>`, `<script setup>` e `<style scoped>`

#### Svelte
- Compila os componentes para JS puro — sem framework no browser
- Reatividade declarativa: `let curtidas = 0` é reativo automaticamente
- Tamanho de bundle menor, performance melhor em muitos benchmarks
- **Código**: `LikeButton.svelte` — ver como a reatividade sem `useState` parece

#### Solid
- API similar ao React (`createSignal` ≈ `useState`) mas sem virtual DOM
- Reatividade granular: atualiza exatamente o nó que mudou, não o componente inteiro
- Curva de aprendizado menor para quem vem do React
- **Código**: `createSignal` no Solid vs. `useState` no React — mesma lógica, sintaxe similar

---

## Lição 5: Backend para devs frontend

### Seções (H2)

#### O que é o backend e por que interessa ao dev frontend
- O blog tem um `artigos.json` estático — em produção, os dados viriam de um banco de dados
- Backend: recebe requisições HTTP, processa lógica, acessa banco, devolve dados
- Dev frontend precisa entender backend o suficiente para trabalhar com APIs e debugar problemas
- **Código**: diagrama de um backend real — browser → API → banco de dados → resposta

#### Node.js e o JavaScript no servidor
- O mesmo JS que roda no browser pode rodar no servidor com Node.js
- APIs com Express: `app.get("/artigos", (req, res) => { res.json(artigos) })`
- Frameworks modernos: Fastify (mais rápido que Express), Hono (TypeScript nativo, edge-friendly)
- **Código**: servidor Express mínimo que serve os `artigos.json` — o "backend" do blog

#### APIs REST e GraphQL
- REST: endpoints por recurso — `GET /artigos`, `POST /artigos`, `GET /artigos/:slug`
- GraphQL: um endpoint, o cliente especifica os campos que quer — menos over-fetching
- Para o blog: REST é suficiente; GraphQL faz sentido quando o cliente precisa de dados muito específicos
- **Código**: contrato da API REST do blog — rotas, métodos, formato de resposta

#### Banco de dados — o básico
- SQL (PostgreSQL, MySQL, SQLite): dados estruturados em tabelas com relações — artigos, autores, tags
- NoSQL (MongoDB): documentos JSON — mais flexível, menos garantias relacionais
- Para aprender: PostgreSQL + Prisma (ORM TypeScript-first) é o stack mais moderno
- **Código**: schema Prisma para o blog — `model Artigo`, `model Autor`, `model Tag`

---

## Lição 6: Ferramentas de build

### Seções (H2)

#### O que uma ferramenta de build faz
- Transforma TypeScript em JavaScript, JSX em JS, módulos ES em um bundle
- Minifica, otimiza, divide em chunks — entrega o menor pacote possível
- Hot Module Replacement (HMR): atualizar o browser sem reload ao salvar
- O estudante já usou Vite — este módulo explica o que está acontecendo sob o capô
- **Código**: antes e depois de um build — `src/utils.ts` (TypeScript + ESM) vs. `dist/assets/index-abc123.js` (JS minificado)

#### Vite
- Usa ESM nativo no dev — sem bundling, cada módulo é servido individualmente (rápido)
- Em produção: Rollup para bundling — chunks otimizados
- `vite.config.ts`: configuração de plugins, aliases, proxy para API
- **Código**: `vite.config.ts` do blog com alias `@/` para `src/` e proxy para API local

#### esbuild e Rollup
- esbuild: o mais rápido — escrito em Go; Vite usa esbuild internamente para transpilação
- Rollup: otimizado para libraries (tree-shaking agressivo); Vite usa Rollup para produção
- **Código**: nenhum — diagrama de quem usa quem

#### Webpack — legado mas onipresente
- O bundler que dominou por uma década — configuração complexa mas controle total
- Ainda comum em projetos grandes e legados (Create React App usava Webpack)
- Não configurar do zero em novos projetos — mas reconhecer quando encontrar
- **Código**: `webpack.config.js` mínimo — só para reconhecer a estrutura

---

## Lição 7: Linting, formatação e tipagem estrita

### Seções (H2)

#### ESLint — encontrar problemas antes de rodar
- Análise estática: regras sobre padrões que causam bugs ou problemas de manutenção
- Plugins essenciais: `eslint-plugin-react`, `eslint-plugin-react-hooks`, `@typescript-eslint`
- `npx eslint .`: rodar manualmente; ou integrar ao editor e ao CI
- **Código**: `.eslintrc.json` para o blog React com TS — regras básicas e plugins

#### Biome — o alternativo moderno
- ESLint + Prettier em uma ferramenta, muito mais rápido (escrito em Rust)
- `npx @biomejs/biome check .`: lint e format juntos
- Configuração menor que ESLint + Prettier
- **Código**: `biome.json` equivalente ao setup de ESLint + Prettier do blog

#### Prettier — formatação consistente
- Formata automaticamente — sem discussões de estilo no code review
- Integração com editor: formatar ao salvar
- `.prettierrc`: configuração mínima (aspas simples, ponto e vírgula, largura de linha)
- **Código**: `.prettierrc` + `.eslintrc.json` configurados para não conflitarem entre si

#### `tsconfig.json` e strict mode
- Revisitar o `tsconfig.json` com o vocabulário do módulo TypeScript
- `strict: true` como ponto de partida — o que cada flag individual significa
- `noUnusedLocals`, `noUnusedParameters`: evitar código morto
- **Código**: `tsconfig.json` de produção para o blog com todas as flags recomendadas

---

## Lição 8: CI/CD e deploy automatizado

### Seções (H2)

#### O que é CI/CD
- CI (Continuous Integration): a cada push, rodar testes e linting automaticamente
- CD (Continuous Delivery/Deployment): se CI passa, fazer deploy automaticamente
- Benefício: saber em minutos se um PR quebrou algo, não em horas no code review
- **Código**: diagrama do pipeline: push → GitHub Actions → lint → typecheck → test → build → deploy

#### GitHub Actions
- Workflow em YAML na pasta `.github/workflows/`
- Eventos: `push`, `pull_request`, `schedule`
- Steps: `actions/checkout`, `actions/setup-node`, `npm ci`, `npm test`
- **Código**: `.github/workflows/ci.yml` que roda lint, type-check, tests e build para o blog

#### Deploy automático com Vercel + GitHub
- Conectar o repositório no painel da Vercel — deploy a cada push para `main`
- Preview deployments para cada PR — URL única para revisar antes de mesclar
- Variáveis de ambiente no painel da Vercel — não commitar segredos no repositório
- **Código**: `vercel.json` do blog com configuração de rotas SPA

---

## Lição 9: Performance

### Seções (H2)

#### Core Web Vitals — as métricas que importam
- LCP (Largest Contentful Paint): quando o maior elemento visível carregou — mede velocidade percebida
- INP (Interaction to Next Paint): tempo entre interação e resposta visual — mede responsividade
- CLS (Cumulative Layout Shift): quanto o layout se moveu — mede estabilidade visual
- **Código**: executar Lighthouse no blog e ler o relatório

#### Lazy loading e code splitting
- `loading="lazy"` em imagens: browser carrega apenas quando perto da viewport
- `React.lazy(() => import('./ArticlePage'))`: carrega o componente só quando necessário
- Vite divide o bundle automaticamente — mas você pode controlar com `import()` dinâmico
- **Código**: `React.lazy` + `Suspense` para carregar `ArticlePage` sob demanda

#### Otimização de imagens
- Servir no formato correto: WebP ou AVIF em vez de JPEG/PNG
- Servir no tamanho correto: não enviar imagem 2000px para um container de 400px
- Ferramentas: Squoosh (online), Sharp (Node.js), CDN de imagens (Cloudinary, Vercel Images)
- **Código**: comparação de tamanho para a imagem de capa do blog em JPEG vs. WebP vs. AVIF

---

## Lição 10: Onde aprender mais

### Seções (H2)

#### Documentação oficial — o melhor recurso
- MDN Web Docs: a referência definitiva para HTML, CSS e JS — sempre atualizada
- React Docs: `react.dev` — a documentação oficial moderna com exemplos interativos
- TypeScript Handbook: `typescriptlang.org/docs/handbook` — completo e bem organizado
- Hábito: antes de buscar tutorial, ler a documentação oficial
- **Código**: nenhum — lista com links e o que cada recurso cobre melhor

#### Comunidades em pt-BR
- Tableless, Frontend Brasil, Dev.to pt-BR: artigos em português
- Discord e Slack de comunidades brasileiras de frontend
- Twitter/X: devs brasileiros que compartilham conteúdo técnico de qualidade
- **Código**: nenhum — lista de comunidades

#### Como filtrar conteúdo desatualizado
- JavaScript e React evoluem rápido — artigo de 2018 sobre React pode estar obsoleto
- Verificar a data de publicação — mais de 2 anos: verificar na documentação oficial
- Preferir documentação oficial a tutoriais; preferir tutoriais recentes a antigos
- Sinais de desatualização: `componentDidMount`, `class Component`, `require()`, `var`
- **Código**: nenhum — guia de leitura crítica de tutoriais

---

## Lição 11: Caminhos de carreira

### Seções (H2)

#### Perfis de frontend
- Frontend especialista: CSS, acessibilidade, performance, design systems
- Full-stack: frontend + Node.js + banco de dados — o mais pedido no mercado
- UI Engineer: entre design e engenharia — componentes, design tokens, Figma para código
- DevRel: documentação, palestras, tutoriais — como este curso — não apenas escrever código

#### O que o mercado pede
- React é o requisito mais comum — seguido por TypeScript
- Testes: Vitest + Testing Library no frontend, mas varia por empresa
- Git e GitHub: essencial para qualquer vaga
- Comunicação: explicar escolhas técnicas, dar e receber feedback em code review
- **Código**: nenhum — análise de 5 vagas reais (sem nomes de empresa) com o que pedem

#### Como construir um portfólio
- O blog deste curso já é um projeto — publicar, apontar domínio, listar no GitHub
- Projetos que mostram habilidade: código limpo, testes, deploy funcionando, README claro
- Não precisa de 10 projetos — 2 ou 3 bem feitos valem mais
- Contribuir para open source: encontrar uma boa primeira issue em projetos que você usa
- **Código**: checklist para o blog antes de publicar no portfólio


---

## Lição 12: Encerramento

### Seções (H2)

#### O que foi construído
- O blog `artigo.dev` em sete versões progressivas: HTML → CSS → JS → TS → React → Testes
- Tabela: módulo / o que o blog ganhou
- Cada tecnologia resolve um problema criado pela camada anterior — a dependência é intencional

#### O que cada tecnologia resolve
- HTML: estrutura que o browser processa; CSS: aparência; JS: comportamento; TS: segurança; React: estado declarativo; Testes: confiança
- A sequência não é arbitrária — é a ordem em que cada camada depende da anterior

#### O próximo passo
- O módulo de próximos passos cobre frameworks, ferramentas e caminhos em detalhe
- A decisão mais importante agora não é qual framework estudar — é publicar o blog
- Um projeto publicado com README claro demonstra mais do que qualquer lista de tecnologias
