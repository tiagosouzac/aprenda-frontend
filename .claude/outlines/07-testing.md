# Outline — Módulo 07: Testes — Qualidade

**Fio condutor**: Testar o blog React do módulo anterior. Começar pelas funções puras de `utils.ts`, subir para componentes com Testing Library, depois testar o fluxo de curtir como integração, e terminar com um teste E2E do fluxo principal.

**Estado final**: Suite de testes para o blog: unitários para `utils.ts`, testes de componente para `ArticleCard` e `LikeButton`, teste de integração para a `HomePage` com filtro, e um teste E2E que abre o blog, lê um artigo e curte.

---

## Lição 1: Por que escrever testes

### Seções (H2)

#### O que testes realmente resolvem
- Confiança para mudar código — refatorar `formatarData` sem medo de quebrar algo silenciosamente
- Regressão: uma mudança em `utils.ts` que quebra o filtro da `HomePage` — o teste avisa antes de chegar à produção
- Documentação executável: um teste bem nomeado mostra o comportamento esperado
- **Código**: cenário concreto — mudar a lógica de `calcularTempoLeitura` e ver o teste falhar com mensagem clara

#### O que testes não resolvem
- Lógica de negócio errada: se o requisito está errado, o teste do requisito errado passa
- Bugs que você não imaginou testar — cobertura não é garantia
- Bugs de UI pixel-perfect — testes não veem o visual
- **Código**: nenhum — lista clara dos limites

#### O custo de não testar
- Medo de mudar código antigo — "não sei o que vai quebrar"
- Regressões em produção — funcionalidades que funcionavam param de funcionar
- Ciclo lento de debug — descobrir um bug via usuário, não via teste
- **Código**: nenhum — comparação do ciclo com e sem testes

---

## Lição 2: Tipos de teste

### Seções (H2)

#### A pirâmide de testes
- Unitário: testa uma função ou componente isolado — rápido, barato, muitos
- Integração: testa múltiplas peças juntas — velocidade e custo intermediários
- E2E (End-to-End): testa o fluxo completo no navegador real — lento, caro, poucos
- A pirâmide: muitos unitários, alguns de integração, poucos E2E — por custo e velocidade
- **Código**: diagrama da pirâmide com exemplos de cada camada para o blog

#### Unitário — o que e quando
- Funções puras: `formatarData`, `calcularTempoLeitura`, `gerarSlug`, `truncar`
- Lógica de transformação: filtrar artigos, ordenar por data
- Regras de negócio isoladas: "artigo é novo se publicado há menos de 7 dias"
- **Código**: teste de `formatarData` com dois casos — data futura e data passada

#### Integração — o que e quando
- Componente + estado: `LikeButton` que atualiza o contador e salva em `localStorage`
- Componente + fetch: `ArticleList` que mostra loading, exibe artigos, e trata erro
- Formulário + validação: `NewsletterForm` que bloqueia envio com email inválido
- **Código**: teste de integração do `LikeButton` — clicar, verificar contagem, verificar `localStorage`

#### E2E — o que e quando
- Fluxos críticos: abrir o blog, ler um artigo, curtir, verificar que persiste após reload
- Não testar tudo com E2E — é caro; cobrir os fluxos que travam o negócio
- **Código**: descrição em português do fluxo E2E antes de ver o código

---

## Lição 3: Vitest — primeiros testes

### Seções (H2)

#### Instalação e configuração
- `npm install -D vitest`: instalar como devDependency
- Adicionar `"test": "vitest"` no `package.json`
- Vitest usa a mesma configuração do Vite — praticamente zero configuração
- `vitest.config.ts` quando precisar customizar (ex: setup file, coverage)
- **Código**: `package.json` com o script de test + `vitest.config.ts` mínimo

#### Estrutura de um arquivo de teste
- Arquivos: `nome.test.ts` ou `nome.spec.ts` — junto ao arquivo testado ou em `__tests__/`
- `describe("nome do grupo", () => { ... })`: agrupa testes relacionados
- `test("o que deve acontecer", () => { ... })` ou `it(...)`: um teste individual
- `expect(valor).matcher(esperado)`: a asserção
- **Código**: primeiro teste de `utils.test.ts` — `formatarData` retorna string no formato correto

#### Matchers essenciais
- `.toBe(valor)`: igualdade estrita (`===`)
- `.toEqual(objeto)`: igualdade profunda — para objetos e arrays
- `.toBeTruthy()`, `.toBeFalsy()`: verificar truthiness
- `.toContain(item)`: array contém o item / string contém a substring
- `.toThrow()`: função lança erro
- `.toBeNull()`, `.toBeUndefined()`: verificações específicas de null/undefined
- **Código**: testes para `gerarSlug` cobrindo casos normais, acentos e espaços

#### Rodar os testes
- `npm test`: rodar uma vez
- `npm test -- --watch`: modo interativo — re-roda ao salvar
- `npm test -- --coverage`: relatório de cobertura
- **Código**: output do terminal com testes passando e falhando

---

## Lição 4: Estruturando testes

### Seções (H2)

#### Arrange, Act, Assert (AAA)
- **Arrange**: preparar o cenário — criar dados, mockar dependências
- **Act**: executar a ação testada — chamar a função, simular o clique
- **Assert**: verificar o resultado — o que deveria ter acontecido?
- Manter a separação visual com comentários ou linhas em branco
- **Código**: teste de `calcularTempoLeitura` com as três fases claramente separadas

#### Nomear testes que descrevem comportamento
- Nome ruim: `"test formatarData"` — o que ela deve fazer?
- Nome bom: `"formatarData retorna 'há 3 dias' para data de 3 dias atrás"`
- `describe` com o nome da função; `test` com o comportamento esperado
- `it` lê como frase: `it("retorna null quando o array está vazio", ...)`
- **Código**: arquivo de testes com nomenclatura boa vs. nomenclatura ruim — comparação lado a lado

#### Casos a cobrir
- Caso feliz (happy path): entrada válida, comportamento esperado
- Caso limite (edge case): zero, vazio, máximo, mínimo
- Caso de erro: entrada inválida, o que deve acontecer?
- **Código**: testes de `truncar(texto, limite)` — texto curto, texto no limite, texto maior, texto vazio

#### `beforeEach`, `afterEach` e setup
- `beforeEach(() => { ... })`: código que roda antes de cada teste no `describe`
- `afterEach(() => { ... })`: limpeza após cada teste
- Útil para: resetar mocks, limpar `localStorage`, preparar dados comuns
- **Código**: `beforeEach` que limpa o `localStorage` antes de cada teste de curtida

---

## Lição 5: Testando funções puras

### Seções (H2)

#### Por que funções puras são fáceis de testar
- Mesma entrada → mesma saída, sempre
- Sem efeitos colaterais — não precisa mockar nada
- Rápido de escrever, rápido de rodar
- **Código**: suite de testes para todo `utils.ts` — `formatarData`, `calcularTempoLeitura`, `gerarSlug`, `truncar`

#### Cobrir casos que parecem óbvios
- `calcularTempoLeitura("")`: 0 palavras — o que deve retornar?
- `gerarSlug("  Olá, Mundo!  ")`: espaços, acentos, pontuação
- `truncar("curto", 100)`: texto menor que o limite
- Casos aparentemente óbvios frequentemente revelam comportamentos não especificados
- **Código**: cada caso sendo testado com `expect` e resultado esperado explícito

#### `describe.each` e `test.each` para tabelas de casos
- Testar a mesma função com muitas entradas diferentes sem repetir `test()`
- `test.each([[entrada1, saída1], [entrada2, saída2]])("descrição %s", ...)`
- **Código**: `test.each` para `gerarSlug` com 6 entradas diferentes

---

## Lição 6: Mocks e stubs

### Seções (H2)

#### Quando substituir dependências
- `fetch`: não queremos fazer requisições reais nos testes — lento, instável, dependente de rede
- `localStorage`: pode vazar estado entre testes
- `Date.now()`: testes que dependem do horário atual são frágeis
- Módulos com efeitos colaterais: analytics, logging
- **Código**: teste de `carregarArtigos` — por que precisa mockar `fetch`

#### `vi.fn()` — função mock
- Cria uma função substituta que registra chamadas
- `.mockReturnValue(valor)`: o que a função deve retornar
- `.mockResolvedValue(valor)`: para funções que retornam Promises
- `.mockRejectedValue(erro)`: para simular falha
- `expect(mockFn).toHaveBeenCalledWith(args)`: verificar que foi chamada corretamente
- **Código**: mock de `onCurtir` passado como prop para `LikeButton` — verificar que foi chamada ao clicar

#### `vi.mock()` — mock de módulo
- Substitui um módulo inteiro nos testes
- `vi.mock('./api', () => ({ carregarArtigos: vi.fn() }))`: substituir o módulo de API
- Configurar o valor de retorno em cada teste
- **Código**: `vi.mock` no módulo de fetch do blog — retornar lista fixa de artigos

#### Os riscos de mockar demais
- Mock demais = testar o mock, não o código
- Se o mock é muito diferente da implementação real, o teste pode passar enquanto o código está quebrado
- Heurística: mockar dependências externas (rede, sistema de arquivos, tempo); não mockar lógica interna
- **Código**: exemplo de teste que passa mas o código está errado — por excesso de mocking

---

## Lição 7: Testando componentes React com Testing Library

### Seções (H2)

#### O que é Testing Library e por que ela
- `@testing-library/react`: renderiza componentes em um ambiente DOM simulado (jsdom)
- Filosofia: testar como o usuário usa, não como o código funciona internamente
- Não testar detalhes de implementação — se mudar o nome de um estado, o teste não deve quebrar
- **Código**: instalar `@testing-library/react` e `@testing-library/user-event` + configurar `vitest.config.ts` com jsdom

#### Renderizar e fazer queries
- `render(<ArticleCard artigo={artigo} />)`: renderiza o componente no DOM de teste
- `screen.getByRole("button", { name: "Curtir" })`: buscar por papel — o mais próximo de como o usuário vê
- `screen.getByText("Meu primeiro projeto web")`: buscar por texto
- `screen.getByLabelText("Email")`: buscar input pelo label — lembra acessibilidade
- `screen.queryBy*`: retorna `null` se não encontrar — para asserções de ausência
- `screen.findBy*`: assíncrono — aguarda o elemento aparecer
- **Código**: teste de `ArticleCard` — verificar que título, autor e tags são renderizados

#### Simular interações com `userEvent`
- `userEvent.click(elemento)`: simula um clique real (inclui hover, focus, etc.)
- `userEvent.type(input, "texto")`: simula digitação
- `userEvent.setup()`: instância de userEvent — preferida sobre funções diretas
- Diferença de `fireEvent`: `userEvent` simula eventos do usuário; `fireEvent` dispara eventos DOM
- **Código**: clicar no botão de curtir — verificar que o ícone muda e o contador incrementa

#### Asserções de acessibilidade
- `expect(botao).toBeDisabled()`: estado do botão
- `expect(input).toHaveValue("texto")`: valor de input
- `expect(elemento).toBeVisible()`: elemento visível
- `expect(elemento).not.toBeInTheDocument()`: elemento ausente
- `@testing-library/jest-dom`: matchers adicionais para DOM
- **Código**: verificar que o `LikeButton` tem `aria-label` e `aria-pressed` corretos

---

## Lição 8: Testes de integração

### Seções (H2)

#### Componente + estado + efeitos
- Integração testa múltiplas peças juntas — mais valor que unitário, mas mais setup
- `ArticleList` com fetch mockado: renderizar → ver loading → ver artigos → ver erro
- **Código**: teste de `ArticleList` com três casos: sucesso, loading, erro

#### Componente + localStorage
- `LikeButton` + `localStorage`: clicar → verificar localStorage → re-montar → verificar que persiste
- `localStorage` em jsdom é uma implementação real — funciona nos testes sem mock
- Limpar com `localStorage.clear()` em `afterEach` para isolar testes
- **Código**: teste de persistência — curtir, desmontar o componente, remontar, verificar estado

#### Formulário + validação
- `NewsletterForm`: digitar email inválido → não pode submeter → mensagem de erro → corrigir → submeter → callback chamado
- Testar o fluxo completo do usuário, não cada passo separado
- **Código**: teste do fluxo completo do formulário de inscrição

#### Quando integração compensa mais
- Um teste de integração que cobre o fluxo inteiro > cinco unitários que cobrem partes
- Componentes com lógica de orquestração: `HomePage` com filtro + busca + fetch
- **Código**: teste de `HomePage` — digitar na busca, verificar que a lista filtra

---

## Lição 9: End-to-end com Playwright

### Seções (H2)

#### O que é E2E e quando usar
- E2E roda o navegador real — o mesmo Chrome que o usuário usa
- Testa o sistema inteiro: frontend, fetch, DOM, localStorage
- Lento (segundos por teste) e frágil se mal escrito — use com moderação
- Fluxos que valem E2E: o caminho principal do usuário, fluxos críticos de negócio
- **Código**: lista dos fluxos do blog que merecem E2E vs. os que não merecem

#### Instalação e primeiro teste
- `npm init playwright@latest`: instala Playwright e configura o projeto
- Estrutura: `tests/`, `playwright.config.ts`, `package.json` scripts
- `test("título", async ({ page }) => { ... })`: estrutura de um teste E2E
- `await page.goto("http://localhost:5173")`: navegar para a URL
- **Código**: primeiro teste — abrir o blog e verificar o título da página

#### Seletores e ações
- `page.getByRole("button", { name: "Curtir" })`: preferir papel + nome — robusto a mudanças de CSS
- `page.getByText("Meu primeiro projeto web")`: por texto visível
- `page.getByLabel("Email")`: por label — bom para formulários
- `.click()`, `.fill("texto")`, `.press("Enter")`: ações no elemento
- **Código**: navegar para um artigo, curtir, verificar que o contador incrementou

#### Espera explícita
- Playwright aguarda automaticamente por padrão — não usar `sleep`
- `await expect(elemento).toBeVisible()`: espera que o elemento apareça
- `await page.waitForURL(padrão)`: espera navegação para URL
- **Código**: teste que abre a home, clica em um artigo, espera carregar, verifica conteúdo

#### O fluxo E2E do blog
- Abrir o blog → ver lista de artigos
- Filtrar por tag "CSS" → ver artigos filtrados
- Clicar em um artigo → ler o artigo → curtir
- Recarregar a página → curtida persiste
- **Código**: teste E2E completo do fluxo principal do blog

---

## Lição 10: O que testar e o que não testar

### Seções (H2)

#### Testar comportamento, não implementação
- Mau teste: verificar que `useState` foi chamado com o valor correto
- Bom teste: verificar que a contagem de curtidas incrementou quando o usuário clicou
- Se renomear uma variável de estado quebra o teste, o teste está testando implementação
- **Código**: versão "teste de implementação" vs. "teste de comportamento" do mesmo cenário

#### Sinais de teste frágil
- Teste que usa `data-testid` em vez de papel/texto — frágil a mudanças de HTML
- Teste que depende de CSS classes internas — quebra ao refatorar estilos
- Teste que testa a biblioteca (React, Vitest) e não o seu código
- Teste com muitos mocks — geralmente sinal de código muito acoplado
- **Código**: refatorar um teste frágil para um robusto

#### Cobertura como guia, não meta
- 100% de cobertura não significa 100% correto
- `console.log` pode ter 100% de cobertura — isso não prova que o log é correto
- Usar cobertura para encontrar pontos não testados — não como KPI
- O que realmente importa: os casos críticos do negócio têm testes?
- **Código**: relatório de cobertura do blog — identificar o que falta

---

## Lição 11: Resumo do módulo

### Seções (H2)

#### A suite de testes do blog
- Unitários: `utils.test.ts` com 15+ testes das funções puras
- Componentes: `ArticleCard.test.tsx`, `LikeButton.test.tsx`
- Integração: `ArticleList.test.tsx`, `HomePage.test.tsx`
- E2E: `blog.spec.ts` com o fluxo principal
- **Código**: `npm test` rodando a suite completa — output com todos os testes passando

#### Checklist de testes
- Pirâmide saudável: muitos unitários, alguns de integração, poucos E2E
- Nomear testes como comportamento esperado
- Limpar efeitos colaterais (localStorage, mocks) entre testes
- Testar acessibilidade nos componentes (roles, labels)
- **Código**: checklist nos arquivos de teste como comentários

#### O que vem a seguir
- O blog está completo: HTML, CSS, JS, TS, React, testes
- O módulo de Próximos Passos mostra para onde ir — deploy, frameworks, backend, carreira
