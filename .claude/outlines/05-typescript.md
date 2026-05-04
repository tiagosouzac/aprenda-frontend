# Outline — Módulo 05: TypeScript — Tipos

**Fio condutor**: Converter os módulos JavaScript do blog (`utils.js`, `api.js`, `ui.js`, `main.js`) para TypeScript. O blog não muda visualmente — o que muda é que erros de tipo são detectados antes de rodar o código. Ao final, o projeto usa `.ts` no lugar de `.js` e o compilador aponta problemas antes do navegador.

**Estado final**: Os quatro módulos do blog tipados. Interfaces para `Artigo`, `Autor` e `Tag`. Erros que antes só apareceriam em runtime agora são detectados no editor.

---

## Lição 1: TypeScript em geral

### Seções (H2)

#### O problema que TypeScript resolve
- JavaScript não sabe o tipo de nada em tempo de compilação — só descobre em runtime
- Erros clássicos: chamar `.toLowerCase()` num valor que pode ser `null`; acessar `artigo.titulo` quando `artigo` é `undefined`
- TypeScript adiciona um sistema de tipos estático — o compilador analisa o código antes de rodar
- **Código**: exemplo com o blog — função `formatarData(date)` chamada com `undefined` — JS silencia, TS aponta o erro

#### O que TS é e o que não é
- TypeScript é um superset de JavaScript — todo JS válido é TS válido
- TS não roda no navegador — é compilado para JS
- Os tipos existem apenas em tempo de desenvolvimento — somem no output
- TS não torna o código mais lento em runtime; o output é JS puro
- **Código**: arquivo `.ts` simples → output `.js` gerado pelo compilador — ver que os tipos desaparecem

#### O que TS resolve e o que não resolve
- Resolve: erros de tipo antes de executar, autocompletar preciso, refactor seguro, documentação viva
- Não resolve: lógica errada, bugs de negócio, erros de runtime vindos de dados externos (APIs)
- TS em runtime: os tipos são apagados — um JSON da API pode chegar com formato inesperado e TS não vai pegar
- **Código**: nenhum — lista clara dos dois lados

---

## Lição 2: Configurando TypeScript

### Seções (H2)

#### Instalação e primeiros passos
- `npm install -D typescript`: instalar como devDependency
- `npx tsc --init`: gerar `tsconfig.json` com configurações comentadas
- `npx tsc`: compilar — gera `.js` para cada `.ts`
- `npx tsc --watch`: recompilar ao salvar
- **Código**: output de `npx tsc --init` e a estrutura do `tsconfig.json` gerado

#### `tsconfig.json` essencial
- `target`: para qual versão de JS compilar — `ES2020` cobre todos os browsers modernos
- `module`: sistema de módulos — `ES2020` para ESM nativo no browser
- `outDir`: pasta de saída dos `.js` — `./dist`
- `rootDir`: pasta raiz dos `.ts` — `./src`
- `strict`: habilita todas as verificações rigorosas — sempre `true`
- `noEmitOnError`: não gera `.js` se tiver erro de tipo — recomendado
- **Código**: `tsconfig.json` mínimo para o projeto do blog

#### `strict` mode
- `strict: true` habilita um conjunto de verificações que individualmente seriam: `strictNullChecks`, `strictFunctionTypes`, `noImplicitAny`, e outros
- `strictNullChecks`: `null` e `undefined` não são atribuíveis a qualquer tipo — o mais impactante
- `noImplicitAny`: variáveis sem tipo anotado e sem inferência viram erro (não `any` silencioso)
- Sempre ativar `strict: true` em projetos novos
- **Código**: mesmo código — sem `strict` (sem erros) vs. com `strict` (erros revelados)

#### Integração com VS Code
- VS Code usa o TypeScript Language Server internamente — funciona sem configuração
- Com `tsconfig.json` na raiz, o editor entende o projeto
- Sublinhas vermelhas = erros de tipo em tempo real
- Hover sobre variável mostra o tipo inferido
- **Código**: nenhum — lista de atalhos úteis no VS Code com TS (hover, ir para definição, rename symbol)

---

## Lição 3: Tipos básicos

### Seções (H2)

#### Tipos primitivos
- `string`, `number`, `boolean` — os mesmos tipos do JS, com anotação explícita
- `null` e `undefined` — com `strict`, precisam ser tratados explicitamente
- `any`: desativa a checagem de tipo — válvula de escape, não uma solução
- `unknown`: como `any` mas seguro — precisa verificar antes de usar
- `never`: tipo de algo que nunca acontece — função que sempre lança erro, loop infinito
- `void`: retorno de função que não retorna nada — diferente de `undefined`
- **Código**: anotações de tipo nas funções de `utils.ts` do blog: `formatarData(date: Date): string`

#### Arrays e tuplas
- `string[]`: array de strings — equivalente a `Array<string>`
- `number[]`: array de números
- Tupla: array com comprimento e tipos fixos — `[string, number]`
- Tuplas nomeadas: `[nome: string, idade: number]` — mais legível
- **Código**: `tags: string[]` no tipo de artigo + tupla para coordenadas (exemplo ilustrativo)

#### Enums — e quando evitar
- `enum Direcao { Norte, Sul, Leste, Oeste }`: grupo de constantes nomeadas
- Compilam para um objeto JS — aumentam o tamanho do bundle
- Alternativa moderna: `as const` com objeto literal — mais leve e sem surpresas
- **Código**: `enum` de status de artigo (Rascunho, Publicado, Arquivado) → versão equivalente com `as const`

---

## Lição 4: Anotações e inferência

### Seções (H2)

#### Quando anotar, quando deixar inferir
- TS infere tipos de declarações com valor: `const x = 42` → `x: number` sem precisar anotar
- Anotar onde a inferência não chega: parâmetros de função, retorno quando ambíguo, variáveis inicializadas sem valor
- A filosofia: "anote nas bordas do sistema (interfaces públicas, parâmetros), infira no meio"
- **Código**: `utils.ts` — identificar onde anotar e onde confiar na inferência

#### Inferência em funções
- Parâmetros: TS não infere — precisam de anotação
- Retorno: TS infere do `return` — anotar é opcional mas recomendado para clareza
- Arrow functions: mesma regra
- **Código**: `calcularTempoLeitura(texto: string): number` — com e sem anotação de retorno

#### Contexto de tipo
- Em callbacks de array (`.map`, `.filter`), TS infere o tipo do parâmetro pelo array
- `artigos.map(artigo => artigo.titulo)` — `artigo` é inferido como `Artigo`
- **Código**: `.map()` com tipo inferido vs. anotado explicitamente — ver que são equivalentes

---

## Lição 5: Funções tipadas

### Seções (H2)

#### Parâmetros e retorno
- `function f(x: string, y: number): boolean { ... }`
- Parâmetros opcionais: `x?: string` — o tipo real é `string | undefined`
- Valores padrão: `x: string = "padrão"` — torna o parâmetro opcional implicitamente
- **Código**: tipar todas as funções de `utils.ts` com parâmetros e retornos corretos

#### Rest e desestruturação tipados
- `function f(...args: string[]): void`
- Desestruturação: `function f({ titulo, autor }: { titulo: string; autor: string }): void`
- Quando a desestruturação fica longa, extrair para uma interface
- **Código**: `function renderizarCard({ titulo, descricao, tags }: Artigo): string`

#### `void` e `never`
- `void`: função que não retorna valor utilizável — pode retornar `undefined` implicitamente
- `never`: função que nunca retorna — lança erro ou entra em loop infinito
- **Código**: `function assertNever(x: never): never { throw new Error("Caso não tratado") }` — para exhaustive checks

#### Tipos de função
- `type Handler = (event: MouseEvent) => void`
- Útil para parâmetros que são funções: `function aoClicar(handler: Handler): void`
- **Código**: tipar o callback do `addEventListener` no `ui.ts`

---

## Lição 6: Interfaces e type aliases

### Seções (H2)

#### `interface` para descrever objetos
- `interface Artigo { titulo: string; autor: Autor; tags: string[]; }`: contrato para a forma do objeto
- Propriedades opcionais: `publishedAt?: Date`
- Propriedades somente leitura: `readonly id: string` — não pode ser reatribuído após criação
- **Código**: `interface Artigo`, `interface Autor`, `interface Tag` para o blog

#### `type` aliases
- `type ID = string`: nome para um tipo — pode ser primitivo, union, intersection
- `type Slug = string`: semântica melhor que `string` puro em certos contextos
- `type ArticleStatus = "rascunho" | "publicado" | "arquivado"`: union de literais
- **Código**: `type ArticleStatus` e `type ReadingTime = { minutos: number; palavras: number }`

#### Diferenças práticas
- `interface`: pode ser extendida com `extends`; pode ser "aberta" (declaração merging)
- `type`: mais flexível — union, intersection, mapped types; não pode ser reaberta
- Heurística: `interface` para formas de objetos públicas; `type` para unions, aliases e transformações
- **Código**: refatorar `interface Artigo` para usar `extends` de `interface ConteudoBase`

#### Extensão e composição
- `interface ArtigoCompleto extends Artigo { comentarios: Comentario[] }`
- Intersection com `type`: `type ArtigoComMetadados = Artigo & { metadados: Metadados }`
- **Código**: modelar a resposta completa da API do blog com interfaces compostas

---

## Lição 7: Union e intersection types

### Seções (H2)

#### Union types (`A | B`)
- `string | number`: aceita qualquer dos dois tipos
- `Artigo | null`: permite null (necessário com `strict`)
- String literal unions: `"claro" | "escuro"` — conjunto fechado de valores
- **Código**: `type Tema = "claro" | "escuro"` — tipar o toggle de tema do blog

#### Narrowing
- Union precisa ser "narrowed" antes de usar propriedades específicas
- `typeof x === "string"`: type guard para primitivos
- `x instanceof Date`: type guard para classes
- `"titulo" in obj`: verificar propriedade — narrowing para objetos
- `if (artigo !== null)`: narrowing de null
- **Código**: função que aceita `string | Date` para a data — narrowing antes de formatar

#### Discriminated unions
- Union de objetos com uma propriedade discriminante — `type` ou `kind`
- TS usa o valor da propriedade para narrowing automático
- Padrão para modelar estados: `type Estado = { status: "carregando" } | { status: "sucesso"; dados: Artigo[] } | { status: "erro"; mensagem: string }`
- **Código**: tipar o estado de carregamento dos artigos com discriminated union

#### Intersection types (`A & B`)
- Combina os tipos — o resultado deve satisfazer ambos
- `Artigo & { destacado: boolean }`: artigo com propriedade extra
- Diferente de `extends`: `&` funciona com qualquer tipo, não só interfaces
- **Código**: criar `type ArtigoDestacado = Artigo & { posicao: number }`

---

## Lição 8: Generics

### Seções (H2)

#### Por que generics existem
- Sem generics: uma função para `number[]`, outra para `string[]` — código duplicado
- Com generics: uma função que funciona para qualquer tipo, mantendo a tipagem
- `<T>` é o parâmetro de tipo — como um parâmetro normal, mas para tipos
- **Código**: `function primeiro<T>(array: T[]): T | undefined` — o mesmo código serve para qualquer array

#### Sintaxe básica
- `function f<T>(arg: T): T`: parâmetro de tipo `T`
- TS infere `T` do argumento na maioria dos casos — não precisa passar `<string>` explicitamente
- Múltiplos parâmetros: `<T, U>`, `<K, V>`
- **Código**: `function buscarPorId<T extends { id: string }>(lista: T[], id: string): T | undefined`

#### Restrições com `extends`
- `<T extends string>`: T deve ser assignable a string — `string` e literal types
- `<T extends { id: string }>`: T deve ter pelo menos a propriedade `id`
- Restrições permitem acessar propriedades do tipo restrição
- **Código**: tipar o `localStorage` do blog de forma genérica: `function lerStorage<T>(chave: string): T | null`

#### Generics em tipos e interfaces
- `interface Resposta<T> { dados: T; erro: string | null; carregando: boolean }`
- `type Opcional<T> = T | null | undefined`
- **Código**: `interface RespostaAPI<T>` para tipar todas as chamadas `fetch` do `api.ts`

---

## Lição 9: Tipos utilitários

### Seções (H2)

#### `Partial`, `Required`, `Readonly`
- `Partial<Artigo>`: todas as propriedades se tornam opcionais — útil para updates parciais
- `Required<Artigo>`: todas as propriedades se tornam obrigatórias
- `Readonly<Artigo>`: todas as propriedades se tornam `readonly`
- **Código**: `type RascunhoArtigo = Partial<Artigo>` — artigo em criação onde poucos campos são obrigatórios

#### `Pick` e `Omit`
- `Pick<Artigo, "titulo" | "slug">`: apenas as propriedades listadas
- `Omit<Artigo, "id" | "criadoEm">`: todas as propriedades exceto as listadas
- **Código**: `type CardArtigo = Pick<Artigo, "titulo" | "descricao" | "tags" | "slug">` — dados necessários para o card

#### `Record` e `Extract`/`Exclude`
- `Record<string, Artigo>`: objeto com chaves `string` e valores `Artigo` — mapa/dicionário
- `Record<ArticleStatus, string>`: chaves restritas ao union
- `Extract<"a" | "b" | "c", "a" | "b">` → `"a" | "b"`: interseção de unions
- `Exclude<"a" | "b" | "c", "a">` → `"b" | "c"`: diferença de unions
- **Código**: `Record<ArticleStatus, string>` para mapear status para labels de exibição

#### `ReturnType` e `Parameters`
- `ReturnType<typeof minhaFuncao>`: o tipo de retorno de uma função
- `Parameters<typeof minhaFuncao>`: tupla com os tipos dos parâmetros
- Útil quando você não controla o código que define a função
- **Código**: `type DadosCard = ReturnType<typeof prepararCard>` — derivar tipo do retorno

---

## Lição 10: TypeScript em projetos reais

### Seções (H2)

#### Tipando respostas de API
- `fetch` retorna `Promise<Response>` — `.json()` retorna `Promise<any>`
- Solução: cast com `as` ou função genérica com verificação
- Validação em runtime: bibliotecas como Zod, Valibot — TS não valida dados externos
- **Código**: `async function fetchArtigos(): Promise<Artigo[]>` com cast seguro

#### `as const` e literal types
- `const cores = ["vermelho", "azul"] as const` — tipo é `readonly ["vermelho", "azul"]`, não `string[]`
- Valores são inferidos como literals, não como tipos amplos
- Útil para objetos de configuração que não devem ser alterados
- **Código**: `as const` na configuração de temas do blog

#### Evitando `any`
- `any` desativa toda a checagem — é como não ter TS
- Alternativas: `unknown` (seguro), `never` (impossível), tipos específicos
- `// @ts-expect-error`: quando você sabe mais que o compilador — documente o motivo
- **Código**: refatorar dois usos de `any` no blog para tipos corretos

#### Declarações ambiente (`.d.ts`)
- Arquivos de declaração descrevem tipos para código JS existente
- `@types/package`: pacotes de tipos para bibliotecas populares sem TS
- `declare module "*.svg"` — declarar módulos não-TS (imagens, SVG)
- **Código**: `declare module "*.json"` para importar o `artigos.json` com tipos

---

## Lição 11: Resumo do módulo

### Seções (H2)

#### Os módulos do blog tipados
- `utils.ts`: funções puras com tipos nos parâmetros e retornos
- `api.ts`: `RespostaAPI<T>` genérica, `Artigo[]` tipado
- `ui.ts`: DOM manipulado com tipos corretos (`HTMLElement`, `MouseEvent`)
- `main.ts`: event listeners tipados, estado do tema como `Tema`
- **Código**: diff de `utils.js` → `utils.ts` mostrando o que mudou

#### Checklist TypeScript
- `strict: true` no `tsconfig.json`
- Interfaces para todos os objetos de domínio
- `unknown` em vez de `any` na fronteira com APIs externas
- Validar dados externos em runtime — TS não chega lá
- Preferir inferência onde o tipo é óbvio; anotar nas bordas públicas
- **Código**: checklist comentado no topo de cada módulo

#### O que vem a seguir
- O blog é HTML + CSS + TS — imperativo, baseado em DOM
- React vai mudar o modelo: componentes declarativos, estado que dispara re-renderização
- TypeScript continua — os tipos do blog viram props e hooks tipados
