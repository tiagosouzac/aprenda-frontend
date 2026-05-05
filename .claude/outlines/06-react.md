# Outline — Módulo 06: React — Componentes

**Fio condutor**: Reconstruir o blog como aplicação React com TypeScript. O mesmo blog dos módulos anteriores — mesma aparência, mesmas funcionalidades — mas agora com componentes reutilizáveis, estado declarativo e React gerenciando o DOM. O estudante vê diretamente o que muda e por que.

**Estado final**: Aplicação React com Vite + TypeScript que replica o blog com componentes `Header`, `ArticleCard`, `ArticleList`, `ArticlePage`, `ThemeToggle` e `LikeButton`. Tema e curtidas gerenciados com `useState` + `localStorage`.

---

## Lição 1: React em geral

### Seções (H2)

#### O problema que React resolve
- Manipular DOM imperativo escala mal: à medida que o estado cresce, rastrear o que precisa mudar fica complexo
- React inverte a abordagem: você descreve como a UI deve parecer dado o estado atual — React faz o DOM corresponder
- Modelo declarativo vs. imperativo: `se curtido, mostrar ❤️` vs. `encontrar o elemento, mudar o src, verificar o estado`
- **Código**: implementar o botão de curtir em DOM puro vs. em React — comparar a diferença de abordagem

#### Componentes como unidade básica
- Um componente é uma função que retorna JSX — uma descrição da UI
- Cada componente gerencia sua própria responsabilidade
- Componentes se compõem: `ArticlePage` usa `Header`, `ArticleBody`, `LikeButton`, `RelatedArticles`
- **Código**: `function ArticleCard() { return <div>...</div> }` — o componente mais simples possível

#### O ciclo de renderização
- Quando o estado muda, React re-executa a função do componente
- O output (JSX) é comparado com o DOM atual — React aplica apenas as diferenças
- Isso é o "virtual DOM": uma representação intermediária que React usa para minimizar operações no DOM real
- **Código**: diagrama do ciclo: estado muda → componente re-renderiza → React reconcilia → DOM atualizado

---

## Lição 2: Configurando um projeto React

### Seções (H2)

#### Criando o projeto com Vite
- `npm create vite@latest blog -- --template react-ts`: cria o projeto com React + TypeScript
- Estrutura gerada: `src/`, `public/`, `index.html`, `vite.config.ts`, `tsconfig.json`
- `npm install && npm run dev`: instalar dependências e rodar o servidor de desenvolvimento
- **Código**: estrutura de pastas do projeto criado + primeiro `npm run dev`

#### A estrutura de arquivos
- `src/main.tsx`: ponto de entrada — monta o componente raiz no DOM
- `src/App.tsx`: componente raiz — ponto de partida para a UI
- `public/`: arquivos estáticos — `artigos.json` vai aqui
- `src/components/`: onde os componentes do blog vão morar
- `src/types/`: interfaces TypeScript do domínio (`Artigo`, `Autor`, etc.)
- **Código**: estrutura de pastas proposta para o blog React

#### `index.html` e o ponto de montagem
- `index.html` tem `<div id="root">` — onde React monta a aplicação
- `main.tsx` chama `createRoot(document.getElementById("root")!).render(<App />)`
- O `!` (non-null assertion) diz ao TS que o elemento certamente existe
- **Código**: `main.tsx` completo do projeto criado — sem modificações, só entender

---

## Lição 3: JSX

### Seções (H2)

#### O que é JSX
- JSX é sintaxe que parece HTML mas é JavaScript — compilado para chamadas `React.createElement()`
- Permite escrever estrutura e lógica no mesmo lugar, de forma declarativa
- Não é HTML: atributos são camelCase, `class` vira `className`, `for` vira `htmlFor`
- **Código**: mesmo elemento em JSX vs. `React.createElement` puro — mostrar que JSX é açúcar sintático

#### Expressões dentro de JSX
- `{expressão}`: qualquer expressão JS dentro de chaves — variáveis, chamadas de função, ternários
- `{artigo.titulo}`: interpolar valor
- `{artigo.publicado ? <Badge>Novo</Badge> : null}`: condicional
- `{artigos.map(a => <ArticleCard key={a.id} artigo={a} />)}`: lista
- Não pode usar declarações (`if`, `for`) diretamente — só expressões
- **Código**: `ArticleCard` com título, autor, tags e data usando expressões JSX

#### Fragmentos
- Um componente deve retornar um único elemento raiz
- `<>...</>`: fragmento — agrupa sem adicionar nó ao DOM
- Alternativa: `<React.Fragment>...</React.Fragment>` — necessário quando precisar de `key`
- **Código**: `ArticleMetadata` que retorna `<><time>...</time><span>...</span></>` sem wrapper

#### Atributos e eventos em JSX
- `className` em vez de `class`
- `htmlFor` em vez de `for` em `<label>`
- Eventos: `onClick`, `onChange`, `onSubmit` — camelCase, recebem uma função
- Estilos inline: `style={{ color: "red", fontSize: 16 }}` — objeto dentro de chaves
- **Código**: botão de curtir com `onClick`, `className` condicional e `aria-label`

---

## Lição 4: Componentes

### Seções (H2)

#### Função que retorna JSX
- Um componente React é uma função com nome em PascalCase que retorna JSX (ou `null`)
- Pode ser exportado como default ou named
- O arquivo `.tsx` é necessário para JSX
- **Código**: criar `ArticleCard.tsx` — o primeiro componente do blog

#### Exportar e importar componentes
- `export function ArticleCard()` ou `export default ArticleCard`
- `import { ArticleCard } from './components/ArticleCard'`
- Preferência do curso: named exports — mais fácil de refactor, import mais explícito
- **Código**: `ArticleCard` exportado e importado em `App.tsx`

#### Compor componentes
- Componentes usam outros componentes como se fossem tags HTML
- `<ArticleCard />`: autofechar quando sem filhos
- `<ArticleList><ArticleCard /></ArticleList>`: quando há filhos
- Cada componente renderiza sua parte — juntos formam a página
- **Código**: `ArticlePage` composta de `Header`, `ArticleHero`, `ArticleBody`, `RelatedArticles`, `Footer`

#### Onde cada componente deve ficar
- `src/components/`: componentes reutilizáveis — `ArticleCard`, `Badge`, `Button`, `ThemeToggle`
- `src/pages/`: componentes de página — `HomePage`, `ArticlePage` (se houver roteamento)
- Nomenclatura: nome do arquivo = nome do componente (`ArticleCard.tsx`)
- **Código**: estrutura de pastas `src/components/` do blog com todos os componentes planejados

---

## Lição 5: Props

### Seções (H2)

#### O que são props
- Props são os parâmetros de um componente — dados passados de pai para filho
- Um componente recebe props como um objeto no primeiro argumento
- Props fluem em uma direção: de cima para baixo (pai → filho)
- **Código**: `ArticleCard` recebendo `titulo` e `descricao` como props

#### Tipando props com TypeScript
- Definir uma `interface Props` ou `type Props` para cada componente
- `function ArticleCard({ titulo, descricao }: Props)`: desestruturação diretamente
- Props opcionais: `descricao?: string`
- **Código**: `interface ArticleCardProps { artigo: Artigo; destaque?: boolean }` + uso no componente

#### Props comuns e `children`
- `children`: conteúdo entre as tags de abertura e fechamento do componente
- Tipo: `React.ReactNode` — aceita JSX, string, número, null, array
- `function Card({ children }: { children: React.ReactNode })`: componente genérico de container
- **Código**: `<Card>` que serve como wrapper estilizado para qualquer conteúdo

#### Valores padrão
- `function ArticleCard({ destaque = false }: Props)`: valor padrão na desestruturação
- Alternativa: `ArticleCard.defaultProps` — legado, não usar com TS
- **Código**: `ArticleCard` com `destaque` default `false` e `imageUrl` com fallback

---

## Lição 6: Tipando props com TypeScript

### Seções (H2)

#### Interfaces de props
- Uma interface por componente, nomeada `ComponenteProps`
- Colocar junto ao arquivo do componente ou em `src/types/`
- `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>`: herdar atributos HTML nativos
- **Código**: `interface LikeButtonProps`, `interface ArticleCardProps`, `interface HeaderProps`

#### Tipos de eventos
- `React.MouseEvent<HTMLButtonElement>`: evento de clique num botão
- `React.ChangeEvent<HTMLInputElement>`: mudança de valor num input
- `React.FormEvent<HTMLFormElement>`: submit de formulário
- **Código**: `onCurtir: (id: string) => void` em `LikeButtonProps`

#### `ReactNode`, `ReactElement`, `JSX.Element`
- `ReactNode`: tudo que pode ser renderizado — o tipo mais amplo para `children`
- `ReactElement`: elemento React específico — retorno de `createElement` ou JSX
- `JSX.Element`: igual a `ReactElement` na prática — convenção
- **Código**: quando usar cada um — `children: ReactNode` vs. retorno de componente `JSX.Element`

#### Props de ref e HTML nativas
- `React.HTMLAttributes<HTMLDivElement>`: todos os atributos HTML de um `<div>`
- `React.ComponentProps<"button">`: shorthand para atributos do elemento
- **Código**: `interface SectionProps extends React.HTMLAttributes<HTMLElement>` — seção com classe e id passáveis externamente

---

## Lição 7: Estado com `useState`

### Seções (H2)

#### O que é estado
- Estado é um valor que, quando muda, faz o componente re-renderizar
- Diferente de uma variável comum: variável comum não dispara re-render
- Cada instância de um componente tem seu próprio estado — independente das outras
- **Código**: contador de curtidas — variável comum (não funciona) vs. `useState` (funciona)

#### Sintaxe do `useState`
- `const [valor, setValor] = useState(valorInicial)`: retorna um par [estado, setter]
- O setter aceita um novo valor ou uma função que recebe o estado anterior
- Nunca mutate o estado diretamente — sempre use o setter
- **Código**: `const [curtido, setCurtido] = useState(false)` no `LikeButton`

#### Atualização baseada no estado anterior
- `setContagem(contagem + 1)`: pode dar errado com múltiplas atualizações no mesmo ciclo
- `setContagem(prev => prev + 1)`: correto — usa o valor mais recente
- Quando usar a forma funcional: sempre que o próximo estado depende do anterior
- **Código**: `setLikes(prev => curtido ? prev - 1 : prev + 1)` no toggle de curtida

#### Estado com objetos e arrays
- Nunca mutar — sempre criar um novo objeto/array
- `setArtigo(prev => ({ ...prev, curtidas: prev.curtidas + 1 }))`: spread para atualizar
- `setLista(prev => [...prev, novoItem])`: adicionar ao array
- `setLista(prev => prev.filter(item => item.id !== id))`: remover do array
- **Código**: estado de lista de artigos com curtidas — adicionar e remover curtida sem mutation

#### Regras dos hooks
- Só chamar hooks no nível mais alto da função — não dentro de ifs, loops ou funções aninhadas
- Só chamar hooks em componentes React ou custom hooks
- A ordem dos hooks deve ser sempre a mesma entre renders — por isso não pode ser condicional
- **Código**: exemplos de uso correto e incorreto — o que acontece quando a regra é quebrada

---

## Lição 8: Renderização condicional e listas

### Seções (H2)

#### Renderização condicional
- `{condição && <Elemento />}`: renderiza somente se condição for verdadeira
- `{condição ? <A /> : <B />}`: ternário para dois casos
- Retorno antecipado: `if (!artigo) return null` no início do componente
- `{condição && <div>}` pode renderizar `0` — cuidado com valores falsy numéricos
- **Código**: badge "Novo" visível apenas para artigos publicados nos últimos 7 dias + fallback quando artigo não carregou

#### Renderizando listas com `.map()`
- `artigos.map(artigo => <ArticleCard key={artigo.id} artigo={artigo} />)`
- O array de JSX deve ter `key` em cada item raiz
- `key` deve ser único e estável — não use o índice quando a lista pode ser reordenada
- **Código**: `ArticleList` que mapeia o array de artigos para `ArticleCard` com keys

#### A prop `key`
- `key` ajuda React a identificar quais itens mudaram, foram adicionados ou removidos
- Key ruim: índice do array — React não consegue rastrear reordenações
- Key boa: `id` único do item — estável e único
- Key não é acessível como prop — se precisar do id, passe separado
- **Código**: lista com keys corretas vs. lista com índices — demonstrar o problema com reordenação

---

## Lição 9: Eventos em React

### Seções (H2)

#### Eventos sintéticos
- React usa um sistema de eventos próprio (SyntheticEvent) — mesma API do DOM, mas normalizado entre browsers
- `onClick`, `onChange`, `onSubmit`, `onKeyDown`, `onFocus`, `onBlur`
- O objeto de evento tem os mesmos campos: `target`, `currentTarget`, `preventDefault()`
- **Código**: `onClick` no `LikeButton` com o tipo correto `React.MouseEvent<HTMLButtonElement>`

#### Formulários controlados
- Controlado: o valor do input é controlado pelo estado React — `value={estado}` + `onChange={handler}`
- Não controlado: o DOM gerencia o valor — acesso via ref
- Preferir controlado: estado é a fonte da verdade, fácil de validar e resetar
- **Código**: formulário de inscrição na newsletter — `email` controlado com `useState`

#### Formulários não controlados e `useRef`
- `useRef`: referência a um nó do DOM — persiste entre renders sem causar re-render
- `<input ref={inputRef} />` → `inputRef.current.value`
- Quando faz sentido: integração com bibliotecas DOM, foco programático, formulários muito simples
- **Código**: foco automático no campo de busca ao abrir o modal de busca

#### `onSubmit` e `preventDefault`
- `onSubmit` no `<form>`, não no botão
- `event.preventDefault()` para não recarregar a página
- Ler os valores do estado (controlado) ou via `FormData` (não controlado)
- **Código**: formulário de contato com `onSubmit` que lê os campos e simula envio

---

## Lição 10: Efeitos com `useEffect`

### Seções (H2)

#### Quando `useEffect` é necessário
- Efeitos são operações que saem do ciclo de renderização puro — rede, DOM, timers, subscriptions
- `useEffect` roda após o render — a UI está pintada quando ele executa
- Não use para derivar estado de props — calcule durante o render
- **Código**: carregar artigos do JSON ao montar o componente — o caso mais comum

#### Sintaxe e array de dependências
- `useEffect(() => { ... })`: roda após todo render — raramente o que você quer
- `useEffect(() => { ... }, [])`: roda apenas na montagem — equivalente a `componentDidMount`
- `useEffect(() => { ... }, [dep1, dep2])`: roda quando qualquer dependência muda
- Dependências vazias vs. omitidas: diferença importante — sempre declare o array
- **Código**: `useEffect` para fetch de artigos com `[]` — carregar uma vez ao montar

#### Função de cleanup
- O retorno de `useEffect` é uma função de cleanup — roda antes do próximo efeito ou desmontagem
- Necessário para: cancelar fetches, limpar timers, desinscrever de eventos
- `AbortController` para cancelar fetch quando o componente desmonta
- **Código**: fetch com cleanup usando `AbortController` no `ArticleList`

#### Dependências e o linter
- O ESLint (com plugin React) avisa quando dependências estão faltando
- Adicionar todas as dependências que o efeito usa — não suprimir o warning
- Quando parece que adicionar a dependência cria loop: o problema geralmente é estrutural
- **Código**: `useEffect` com dependência `query` para buscar artigos filtrados ao digitar

---

## Lição 11: Compartilhando estado entre componentes

### Seções (H2)

#### Lifting state up
- Quando dois componentes precisam do mesmo estado: elevar para o pai comum
- O pai gerencia o estado; passa para os filhos via props
- Filhos comunicam mudanças ao pai via callbacks (funções passadas como props)
- **Código**: `LikeButton` que precisa saber se o artigo está curtido — elevar `curtidos` para `ArticlePage`

#### Prop drilling
- O estado elevado às vezes precisa passar por componentes intermediários que não o usam
- Isso é prop drilling — válido para 2–3 níveis, começa a doer em 4+
- Sinal de que Context pode ajudar — mas não todo prop drilling exige Context
- **Código**: passar `tema` do `App` → `Header` → `ThemeToggle` — mostra o caminho

#### Callbacks como props
- `onCurtir: (id: string) => void`: componente filho avisa o pai que algo aconteceu
- O pai decide o que fazer com a informação
- Padrão: estado no pai, evento no filho, callback como ponte
- **Código**: `ArticleCard` com `onCurtir` → `ArticleList` repassa → `ArticlePage` gerencia o estado

#### Quando o estado está no lugar errado
- Sinais: props sendo passadas por muitos níveis sem uso intermediário
- Sinais: dois componentes distantes na árvore precisam do mesmo estado
- Solução: elevar mais, ou usar Context
- **Código**: identificar no blog onde o estado de tema está mal posicionado

---

## Lição 12: Context API

### Seções (H2)

#### O que é Context
- Context permite compartilhar um valor com toda a subárvore sem passar props manualmente
- Não substitui estado — armazena no estado (`useState`), distribui via Context
- Casos ideais: tema, idioma, usuário autenticado, preferências globais
- **Código**: mover o estado de tema do `App` para um `TemaContext`

#### Criar e usar Context
- `createContext(valorPadrão)`: cria o contexto
- `<Context.Provider value={valor}>`: disponibiliza para os descendentes
- `useContext(Context)`: consome o valor no componente
- **Código**: `TemaContext.tsx` com `createContext`, `TemaProvider` e `useTema` custom hook

#### Custom hook para Context
- Extrair o `useContext` em um custom hook: `export function useTema() { return useContext(TemaContext) }`
- Adicionar verificação: se `useTema` for chamado fora do Provider, lançar erro descritivo
- **Código**: `useTema()` retornando `{ tema, alternarTema }` — interface limpa para os consumidores

#### Quando não usar Context
- Context faz todos os consumidores re-renderizarem quando o valor muda
- Para estado que muda frequentemente (ex: posição do mouse), pode ser caro
- Alternativas: composition, prop drilling intencional, bibliotecas de estado (Zustand)
- **Código**: refatorar para ver qual estado realmente precisa de Context no blog

---

## Lição 13: Buscando dados

### Seções (H2)

#### `useEffect` + `fetch` — o padrão básico
- Estado de loading, erro e dados: o trio necessário para qualquer fetch
- `const [artigos, setArtigos] = useState<Artigo[]>([])`
- `const [carregando, setCarregando] = useState(true)`
- `const [erro, setErro] = useState<string | null>(null)`
- **Código**: hook `useArtigos()` com os três estados e fetch com `try/catch/finally`

#### Race conditions
- Se o componente re-renderiza enquanto o fetch ainda está pendente, podem chegar dados desatualizados
- Solução com `AbortController`: cancelar o fetch anterior quando o efeito reexecuta
- **Código**: search input que busca ao digitar — sem cleanup (bug) vs. com cleanup (correto)

#### Custom hook para fetch
- Extrair a lógica de fetch em um `useFetch<T>(url)` reutilizável
- Retorna `{ dados, carregando, erro }` — pode ser usado em qualquer componente
- **Código**: `useFetch.ts` genérico + uso em `ArticleList` e `ArticlePage`

#### Visão geral de TanStack Query
- Para aplicações reais, `useEffect + fetch` não escala: sem cache, sem revalidação, sem deduplicação
- TanStack Query (React Query) resolve isso com `useQuery()`
- **Código**: mesmo fetch do blog com `useQuery` — comparar com a versão manual

---

## Lição 14: Componente prático — o blog completo

### Seções (H2)

#### O que vai ser construído
- `HomePage`: lista de artigos com busca e filtro por tag
- `ArticlePage`: artigo completo com like, barra de progresso e artigos relacionados
- Ambas as páginas reutilizam os mesmos componentes: `ArticleCard`, `Header`, `Footer`
- **Código**: diagrama da árvore de componentes do blog

#### Estado global vs. local
- `tema`: global — Context
- `curtidos`: global — Context ou localStorage no raiz
- `busca`: local — `HomePage`
- `artigos`: local (ou fetched) — `HomePage` e `ArticlePage`
- **Código**: mapa de onde cada estado vive na árvore

#### Filtro e busca de artigos
- Input controlado para query de busca
- `artigos.filter()` computado a partir do estado — sem `useEffect`
- Tags como filtro ativo — array de tags selecionadas no estado
- **Código**: `HomePage` com filtro funcional por texto e por tag

#### Artigo completo
- Props: receber `slug` do artigo (ou de um roteador)
- Fetch do artigo por `id`/`slug`
- Barra de progresso: `useEffect` com listener de scroll
- Botão de curtir com estado persistido
- **Código**: `ArticlePage` completo — o componente mais complexo do módulo

---

## Lição 15: Roteamento com React Router

### Seções (H2)

#### Por que roteamento existe em SPAs
- Sites multipage tradicionais: cada URL é um arquivo HTML separado no servidor
- SPAs: um único HTML, JavaScript gerencia a navegação; sem Router, URL não muda e botão voltar quebra
- React Router intercepta cliques em links, atualiza a URL com a History API e renderiza o componente certo
- **Código**: SPA sem router (navegação por estado, URL estática) vs. com React Router (URL muda, histórico funciona)

#### Instalação e configuração
- `npm install react-router-dom`
- API moderna: `createBrowserRouter` + `RouterProvider` (v6.4+) — configuração declarativa fora da árvore
- `BrowserRouter`/`Routes`/`Route`: API clássica — mais simples de ler, menos poder
- **Código**: `main.tsx` com `createBrowserRouter` mapeando `/` → `HomePage` e `/artigos/:slug` → `ArticlePage`

#### Definindo rotas
- Cada rota: `{ path: string, element: JSX.Element }`
- `:slug`, `:id` — segmentos dinâmicos; `*` — wildcard para 404
- Rotas aninhadas com `children` — para layouts compartilhados
- **Código**: `router.tsx` completo com rotas do blog + rota de fallback `PaginaNaoEncontrada`

#### Navegação com Link e NavLink
- `<Link to="/artigos/css-em-geral">`: sem reload; gera `<a>` mas intercepta o clique
- `<NavLink>`: variante com classe `active` automática — útil em menus
- `end` prop em NavLink: ativa somente na rota exata, não em sub-rotas
- **Código**: `ArticleCard` com `Link` e `Header` com `NavLink` aplicando classe active

#### Parâmetros de URL com useParams
- `/artigos/:slug` → `const { slug } = useParams<{ slug: string }>()`
- `useParams` retorna um objeto com todos os parâmetros da rota atual
- Integrar com `useArtigo(slug!)` — buscar o artigo correto pelo slug da URL
- **Código**: `ArticlePage` atualizado — sem receber `slug` como prop, lendo da URL via `useParams`

#### Navegação programática com useNavigate
- `const navigate = useNavigate()` — retorna função para navegar em código
- `navigate("/artigos/css-em-geral")` — navegar para rota; `navigate(-1)` — voltar
- Casos de uso: após submit de formulário, login bem-sucedido, redirecionamento condicional
- **Código**: campo de busca que navega para `/?busca=termo` ao submeter

---

## Lição 16: Resumo do módulo

### Seções (H2)

#### O blog React completo
- Revisitar a árvore de componentes
- O que React tornou mais fácil vs. o que a versão DOM pura fazia melhor
- Quando React faz sentido e quando não faz
- **Código**: diagrama de componentes com props e estado anotados

#### Checklist React
- Componentes pequenos com uma responsabilidade
- Estado no nível certo — não mais acima do necessário
- Dependências do `useEffect` honestas
- Keys estáveis em listas
- Props tipadas com TypeScript
- **Código**: checklist comentado em `App.tsx`

#### O que vem a seguir
- Os componentes do blog foram testados manualmente — e se alguém quebrar o `LikeButton`?
- O módulo de testes vai cobrir: testar `formatarData`, testar o `ArticleCard`, testar o fluxo de curtir
