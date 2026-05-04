# Outline — Módulo 04: JavaScript — Comportamento

**Fio condutor**: Adicionar `script.js` ao blog construído nos módulos anteriores. Funcionalidades construídas progressivamente ao longo do módulo:
1. Toggle de tema claro/escuro (lições 2–6: variáveis, DOM, eventos)
2. Botão de curtir com contagem persistida em localStorage (lições 7–12: arrays, objetos, eventos)
3. Barra de progresso de leitura (lição 12: scroll events)
4. Carregamento dinâmico de lista de artigos a partir de JSON (lições 13–15: async, fetch)
5. Organização em módulos (lição 16)

**Estado final**: `artigo.html` com comportamento real — tema, curtidas, progresso de leitura e lista de artigos carregada da "API".

---

## Lição 1: JavaScript em geral

### Seções (H2)

#### O que é JavaScript
- A única linguagem de programação nativa dos navegadores — não é opcional
- Linguagem de programação de verdade: controle de fluxo, estruturas de dados, funções, estado
- Ao contrário de HTML e CSS, JS executa — e a ordem de execução importa
- O mesmo código pode se comportar diferente dependendo do estado atual
- **Código**: comparação em três colunas — o que HTML, CSS e JS fazem ao mesmo elemento

#### Onde JavaScript roda
- Navegador: todo site que você visita executa JS no seu computador — é o ambiente principal deste módulo
- Node.js: JS fora do navegador — servidor, linha de comando, scripts de build — mesma linguagem, APIs diferentes
- Deno, Bun: alternativas mais recentes ao Node.js
- A distinção importa: `window`, `document`, `fetch` existem no navegador; `fs`, `path` existem no Node
- **Código**: `typeof window` no navegador vs. no Node.js — outputs diferentes com a mesma linha

#### Breve história — por que JS é assim
- Criado em 10 dias em 1995 para o Netscape — as decisões de design daqueles 10 dias ainda nos afetam
- Padronizado como ECMAScript; ES6/ES2015 foi a modernização mais significativa
- "Sem quebrar a web": JS não pode remover funcionalidades antigas — razão de algumas quirks
- Por que isso interessa: explica `var`, `==`, `typeof null === "object"` — heranças que ainda aparecem
- **Código**: nenhum — linha do tempo simplificada (ES5 2009, ES6 2015, ESM)

#### O que JS pode fazer no blog
- Responder ao clique no botão de tema → alterar a classe no `<html>`
- Contar curtidas → persistir em `localStorage` → exibir o número
- Calcular o progresso de leitura → mover a barra conforme o usuário rola
- Buscar lista de artigos de um JSON → inserir os cards no DOM
- Cada uma dessas funcionalidades será construída ao longo do módulo
- **Código**: esboço comentado de `script.js` — quatro seções com nomes das funcionalidades a construir

---

## Lição 2: Como executar JavaScript

### Seções (H2)

#### O console do navegador
- Abrir com F12 ou Cmd+Option+J — é um ambiente de execução real
- `console.log()`: exibir valores para depuração — o mais usado
- `console.error()`, `console.warn()`, `console.table()`: variações úteis
- O console como REPL: expressar e avaliar instantaneamente
- **Código**: primeiros comandos no console — `1 + 1`, `"Olá"`, `document.title`

#### A tag `<script>`
- `<script src="script.js"></script>`: carrega um arquivo JS externo
- Posicionamento no HTML importa: scripts no `<head>` bloqueiam o parser
- `defer`: baixa em paralelo com o HTML; executa após o HTML estar completamente parseado — o mais comum
- `async`: baixa em paralelo; executa imediatamente quando pronto — ordem não garantida; raramente é o que você quer
- `type="module"`: habilita ES modules — `import`/`export`, escopo de módulo, strict mode por padrão
- **Código**: linkar `script.js` em `artigo.html` com `defer`. Adicionar `console.log("script carregado")` para confirmar.

#### Arquivo JS externo vs. inline
- Externo: separação de responsabilidades, cache, reutilização — o padrão
- Inline `<script>`: casos específicos — analytics, scripts de inicialização críticos
- JS no HTML com `onclick="..."`: evitar — mistura comportamento com estrutura
- **Código**: mover um `onclick` inline para um `addEventListener` no `script.js`

---

## Lição 3: Variáveis e tipos

### Seções (H2)

#### Declarar variáveis: `const`, `let` e `var`
- `const`: padrão — declara e atribui de uma vez; não pode ser reatribuído
- `let`: quando o valor precisa ser reatribuído depois — `let contador = 0; contador++`
- `var`: legado — escopo de função, não de bloco; içamento (hoisting); não usar
- Por que `const` por padrão: comunica intenção — "esse valor não vai mudar"; o compilador pode otimizar
- **Código**: declarar as variáveis de estado do blog: `const botaoTema`, `let curtidasContagem`, `const artigos`

#### Tipos primitivos
- `string`: texto — aspas simples, duplas ou backtick (template literal)
- `number`: inteiros e decimais no mesmo tipo — `42`, `3.14`, `NaN`, `Infinity`
- `boolean`: `true` ou `false` — resultado de comparações
- `null`: ausência intencional de valor — você atribui null explicitamente
- `undefined`: variável declarada mas não atribuída; parâmetro não passado; propriedade inexistente
- `symbol`: identificador único — raramente usado diretamente
- `bigint`: inteiros arbitrariamente grandes — `9007199254740991n`
- **Código**: variáveis tipadas para dados de um artigo: `title` (string), `likes` (number), `published` (boolean), `publishedAt` (null se rascunho)

#### `typeof` e coerção
- `typeof valor`: retorna o tipo como string — `"string"`, `"number"`, `"boolean"`, `"undefined"`, `"object"`, `"function"`
- `typeof null === "object"`: o bug histórico mais famoso — null não é objeto
- Coerção implícita: JS converte tipos automaticamente em comparações e operações
- `"5" + 3 === "53"` — string concatenation; `"5" - 3 === 2` — coerção numérica
- `===` compara valor e tipo; `==` permite coerção — sempre use `===`
- **Código**: série de expressões com coerção — prever o resultado antes de ver; entender o porquê

---

## Lição 4: Operadores e expressões

### Seções (H2)

#### Operadores aritméticos
- `+`, `-`, `*`, `/`, `%` (módulo/resto), `**` (potenciação)
- `%` é útil para verificar par/ímpar, limitar índices
- `++` e `--` existem mas preferir `+= 1` — mais explícito
- **Código**: calcular tempo de leitura do artigo: `Math.ceil(palavras / 200)` palavras por minuto

#### Operadores de comparação
- `===` e `!==`: igualdade e diferença estrita — valor e tipo
- `<`, `>`, `<=`, `>=`: comparação de ordem
- Comparar strings: ordem lexicográfica — `"b" > "a"` é `true`
- **Código**: verificar se um artigo é recente (publicado nos últimos 7 dias) usando comparação de datas

#### Operadores lógicos
- `&&` (AND): verdadeiro se ambos forem verdadeiros; retorna o primeiro falsy ou o último operando
- `||` (OR): verdadeiro se ao menos um for verdadeiro; retorna o primeiro truthy ou o último operando
- `!` (NOT): inverte o boolean
- `??` (nullish coalescing): retorna o operando direito somente se o esquerdo for `null` ou `undefined` — diferente de `||`
- Curto-circuito: `a && b` — `b` só é avaliado se `a` for truthy
- **Código**: `const tema = localStorage.getItem("tema") ?? "claro"` — pegar do storage com fallback

#### Operador ternário
- `condição ? valorSeVerdadeiro : valorSeFalso` — expressão, não declaração
- Útil dentro de template literals e atribuições
- Não aninhar ternários — dificulta a leitura
- **Código**: `const icone = curtido ? "❤️" : "🤍"` — ícone do botão de curtir

#### Atribuição composta
- `+=`, `-=`, `*=`, `/=`: operar e atribuir de uma vez
- `??=`: atribuir somente se o valor atual for `null` ou `undefined`
- `||=`: atribuir somente se o valor atual for falsy
- **Código**: incrementar o contador de curtidas — `curtidasContagem += 1`

---

## Lição 5: Controle de fluxo

### Seções (H2)

#### Truthy e falsy
- Valores falsy: `false`, `0`, `""`, `null`, `undefined`, `NaN` — os únicos
- Todo o resto é truthy — incluindo `[]`, `{}`, `"0"`
- Operadores lógicos e `if` usam esse conceito — vale conhecer os casos
- **Código**: lista dos valores falsy + teste de cada um no console

#### `if`, `else if`, `else`
- Executar código diferente baseado em uma condição
- Blocos com `{}` mesmo para linha única — consistência
- Aninhamento: pode ficar confuso rapidamente — preferir retorno antecipado
- **Código**: condicional para exibir badge "Novo" se o artigo tem menos de 7 dias

#### `switch`
- Mais limpo que uma cadeia longa de `if/else if` para o mesmo valor
- `break` obrigatório — sem ele, o código cai no próximo case (fall-through)
- `default`: caso nenhum case combine
- Quando usar: quando o mesmo valor é comparado com constantes conhecidas
- **Código**: switch no tipo de notificação do blog — "erro", "sucesso", "aviso"

#### `for` clássico
- `for (let i = 0; i < array.length; i++)`: útil quando o índice importa
- Prefer `for...of` para a maioria dos casos — mais legível
- **Código**: apenas para contrastar — criar índice de seções do artigo usando o índice

#### `for...of` — o padrão moderno
- Itera sobre qualquer iterável: arrays, strings, NodeLists, Maps, Sets
- Não dá acesso ao índice por padrão — se precisar: `for (const [i, item] of array.entries())`
- **Código**: iterar sobre as tags do artigo para construir o HTML de cada tag

#### `while` e `break`/`continue`
- `while (condição)`: executa enquanto a condição for verdadeira — cuidado com loop infinito
- `break`: interrompe o loop imediatamente
- `continue`: pula para a próxima iteração
- **Código**: buscar o primeiro artigo relacionado que ainda não foi curtido

---

## Lição 6: Funções

### Seções (H2)

#### Por que funções existem
- DRY (Don't Repeat Yourself): extrair código repetido em uma função nomeada
- Abstração: dar um nome a uma operação — o chamador não precisa saber como funciona
- Testabilidade: funções puras são fáceis de testar
- **Código**: código duplicado para formatar data → extraído para `formatarData(date)`

#### Declaração de função
- `function nome(parametros) { return valor; }`: hoisted — pode chamar antes de declarar
- Sem `return`: a função retorna `undefined`
- **Código**: `function calcularTempoLeitura(texto) { ... }` — declarada antes do uso no arquivo

#### Expressão de função e arrow function
- `const nome = function(params) { ... }`: não hoisted — não pode chamar antes de declarar
- Arrow function: `const nome = (params) => expressão` — mais concisa
- Arrow com `{}`: precisa de `return` explícito; arrow sem `{}`: retorno implícito da expressão
- Arrow não tem `this` próprio — herda do contexto léxico (importante para callbacks)
- **Código**: `const formatarData = (date) => new Intl.DateTimeFormat("pt-BR").format(date)`

#### Parâmetros
- Parâmetros padrão: `function f(x = 10)` — usado quando o argumento não é passado
- Rest parameters: `function f(...args)` — agrupa argumentos extras em um array
- Desestruturação nos parâmetros: `function f({ titulo, autor })` — desestrutura o objeto passado
- **Código**: `function gerarSlug(titulo = "sem-titulo") { ... }`

#### Escopo léxico
- Uma função tem acesso a variáveis do escopo em que foi definida (não em que foi chamada)
- `const`, `let` são escopados por bloco — `{}`
- `var` é escopado por função — razão de evitar
- **Código**: demostrar `const` em bloco vs. `var` em bloco — saída diferente

#### Closures
- Uma função "lembra" o escopo onde foi criada, mesmo após a função externa ter retornado
- Aparece em: event listeners, setTimeout, funções fábrica
- **Código**: `function criarContador() { let n = 0; return () => ++n; }` — contador independente para cada artigo curtido

---

## Lição 7: Arrays

### Seções (H2)

#### Criar e acessar
- `[]` literal com vírgulas entre itens
- Acesso por índice: `array[0]` — zero-indexed
- `array.length`: número de itens
- Arrays podem conter qualquer tipo — inclusive outros arrays e objetos
- **Código**: array de artigos do blog como objetos: `[{ titulo: "...", tags: [...] }, ...]`

#### Métodos imutáveis — não alteram o original
- `map(fn)`: transforma cada item — retorna novo array de mesmo tamanho
- `filter(fn)`: mantém itens que passam no teste — retorna novo array menor ou igual
- `find(fn)`: retorna o primeiro item que passa — ou `undefined`
- `findIndex(fn)`: como `find`, mas retorna o índice
- `some(fn)`: `true` se ao menos um item passar
- `every(fn)`: `true` se todos passarem
- `reduce(fn, inicial)`: acumula todos os itens em um único valor
- `includes(valor)`: `true` se o valor existe no array
- `slice(início, fim)`: cópia de uma parte do array
- **Código**: `artigos.filter(a => a.tags.includes("CSS")).map(a => a.titulo)`

#### Métodos mutáveis — alteram o original
- `push(item)`: adiciona ao final — retorna o novo `length`
- `pop()`: remove do final — retorna o item removido
- `unshift(item)`: adiciona ao início
- `shift()`: remove do início
- `splice(índice, quantidade, ...novos)`: remove/insere na posição — o mais cirúrgico
- `sort(fn)`: ordena in place — com função de comparação para ordem previsível
- `reverse()`: inverte in place
- **Código**: manter uma lista de artigos curtidos: `push` ao curtir, `splice` ao descurtir

#### Spread e desestruturação
- `[...array, novoItem]`: adicionar sem mutation — retorna novo array
- `const [primeiro, segundo, ...resto] = array`: desestruturar posições
- `const [, segundo]` — ignorar o primeiro com vírgula
- **Código**: adicionar curtida sem mutar: `const atualizado = [...curtidos, novoId]`

---

## Lição 8: Objetos

### Seções (H2)

#### Criar e acessar propriedades
- `{ chave: valor }` — literal de objeto
- Property shorthand: se a variável tem o mesmo nome que a chave: `{ titulo }` em vez de `{ titulo: titulo }`
- Acesso por ponto: `artigo.titulo`
- Acesso por colchete: `artigo["titulo"]` — necessário para chaves dinâmicas
- Optional chaining: `artigo?.autor?.nome` — seguro para objetos possivelmente `null`/`undefined`
- **Código**: objeto representando um artigo do blog com todas as propriedades

#### Desestruturação
- `const { titulo, autor } = artigo` — extrair propriedades em variáveis
- Renomear: `const { titulo: tituloDoArtigo } = artigo`
- Valor padrão: `const { curtidas = 0 } = artigo` — se `curtidas` for `undefined`
- Desestruturação aninhada: `const { autor: { nome } } = artigo`
- **Código**: desestruturar os dados do artigo para usar no template

#### Spread e imutabilidade
- `{ ...objeto, novaChave: valor }`: copiar e sobrescrever/adicionar — o original não é afetado
- Merge de objetos: `{ ...padroes, ...config }` — `config` sobrescreve `padroes`
- Cópia rasa (shallow): objetos aninhados não são copiados — ainda compartilham referência
- **Código**: atualizar curtidas imutavelmente: `const atualizado = { ...artigo, curtidas: artigo.curtidas + 1 }`

#### Iterar sobre objetos
- `Object.keys(obj)`: array das chaves
- `Object.values(obj)`: array dos valores
- `Object.entries(obj)`: array de `[chave, valor]`
- `for...in`: itera chaves — inclui chaves herdadas; preferir `Object.keys()` com `for...of`
- **Código**: transformar um objeto de configurações em um array de labels para exibir

#### Referência vs. valor
- Primitivos são copiados por valor: `const b = a` — mudança em `b` não afeta `a`
- Objetos e arrays são copiados por referência: `const b = a` — `b` e `a` apontam para o mesmo objeto
- Por isso `===` em objetos compara referências, não conteúdo
- **Código**: demonstrar o problema da referência compartilhada + solução com spread

---

## Lição 9: Strings

### Seções (H2)

#### Template literals
- Backticks: `` `Olá, ${nome}!` `` — interpolação de expressões
- Multi-linha: quebra de linha dentro do backtick é literal
- Tagged templates: função que processa o template — raro, mas vale conhecer o conceito
- **Código**: gerar o HTML de um card de artigo com template literal

#### Métodos essenciais
- `.length`: número de caracteres
- `.toUpperCase()`, `.toLowerCase()`: converter case
- `.trim()`, `.trimStart()`, `.trimEnd()`: remover espaços nas bordas
- `.includes(sub)`: verificar se contém — retorna boolean
- `.startsWith(pre)`, `.endsWith(suf)`: verificar início/fim
- `.indexOf(sub)`, `.lastIndexOf(sub)`: posição — ou -1 se não encontrar
- `.slice(início, fim)`: recortar uma parte — índices negativos contam do final
- `.split(separador)`: dividir em array — `" ".split(",")` → array
- `.replace(de, para)`, `.replaceAll(de, para)`: substituir ocorrências
- `.padStart(n, char)`, `.padEnd(n, char)`: preencher para atingir comprimento
- **Código**: `gerarSlug("Meu Primeiro Projeto Web")` → `"meu-primeiro-projeto-web"` usando `toLowerCase`, `trim`, `replace`

#### Strings como arrays
- Acesso por índice: `str[0]`
- `for...of` para iterar caracteres
- Strings são imutáveis: não se pode atribuir em `str[0] = 'x'`
- `Array.from("texto")`: converter string em array de caracteres
- **Código**: truncar a descrição do artigo em 160 caracteres com elipsis

---

## Lição 10: DOM — selecionando elementos

### Seções (H2)

#### O que é o DOM
- Document Object Model: representação em árvore do HTML, acessível via JavaScript
- `document` é o ponto de entrada — objeto global disponível no navegador
- Modificar o DOM → navegador atualiza a tela automaticamente
- O DOM é dinâmico: pode ser diferente do HTML original se JS o modificou
- **Código**: abrir `document` no console — explorar a estrutura de `artigo.html`

#### Selecionar elementos
- `document.querySelector(seletor)`: primeiro elemento que corresponde — `null` se não encontrar
- `document.querySelectorAll(seletor)`: NodeList com todos os correspondentes
- `document.getElementById(id)`: por id — mais rápido, mas menos flexível
- `document.getElementsByClassName(classe)`: HTMLCollection viva — atualiza automaticamente
- **Código**: selecionar os elementos do blog que serão manipulados: `#botao-tema`, `.contagem-curtidas`, `[data-artigo-id]`

#### Navegar pela árvore
- `.parentElement`: o elemento pai imediato
- `.children`: HTMLCollection dos filhos diretos
- `.firstElementChild`, `.lastElementChild`: primeiro e último filho
- `.nextElementSibling`, `.previousElementSibling`: irmão adjacente
- `.closest(seletor)`: ancestral mais próximo que corresponde — útil em event delegation
- **Código**: a partir do botão de curtir, navegar até o container do artigo com `.closest("[data-artigo-id]")`

#### NodeList vs. Array
- `querySelectorAll` retorna NodeList — parece array mas não é
- Tem `.forEach()` mas não tem `.map()`, `.filter()`, `.reduce()`
- Converter: `[...nodelist]` ou `Array.from(nodelist)`
- `getElementsByClassName` retorna HTMLCollection — viva (atualiza com o DOM); também não é Array
- **Código**: selecionar todos os `[data-tag]` do artigo e converter para array para filtrar

---

## Lição 11: DOM — manipulando elementos

### Seções (H2)

#### Ler e alterar conteúdo
- `.textContent`: texto puro — seguro, sem interpretar HTML
- `.innerHTML`: conteúdo HTML — poderoso mas perigoso se dados vierem do usuário (XSS)
- `.value`: valor de inputs, selects, textareas
- Quando usar `innerHTML`: conteúdo gerado internamente, sem dados do usuário
- **Código**: atualizar a contagem de curtidas com `.textContent`; inserir lista de artigos com `.innerHTML`

#### Atributos
- `.getAttribute(nome)`: ler um atributo
- `.setAttribute(nome, valor)`: definir um atributo
- `.removeAttribute(nome)`: remover
- `.hasAttribute(nome)`: verificar se existe
- Propriedades diretas: `el.href`, `el.src`, `el.disabled` — mais conveniente para atributos comuns
- `data-*` via `.dataset`: `el.dataset.artigoId` acessa `data-artigo-id`
- **Código**: ler `data-artigo-id` do botão de curtir para saber qual artigo salvar

#### Classes
- `.classList.add("nome")`: adicionar classe
- `.classList.remove("nome")`: remover classe
- `.classList.toggle("nome")`: adicionar se não tem, remover se tem — perfeito para toggles
- `.classList.contains("nome")`: verificar se tem a classe — retorna boolean
- `.classList.replace("antiga", "nova")`: substituir
- **Código**: implementar o toggle de tema — `.classList.toggle("dark")` no `<html>`

#### Criar e inserir elementos
- `document.createElement("tag")`: cria um novo elemento (não está no DOM ainda)
- `.appendChild(filho)`: inserir no final do elemento
- `.prepend(filho)`: inserir no início
- `.append(filho)`: como `appendChild` mas aceita texto e múltiplos argumentos
- `.insertAdjacentElement(posição, elemento)`: posições: `beforebegin`, `afterbegin`, `beforeend`, `afterend`
- `innerHTML` como atalho para estruturas maiores — com cuidado
- **Código**: criar e inserir um card de artigo dinamicamente na lista da home

#### Remover elementos
- `el.remove()`: remove o elemento do DOM
- `pai.removeChild(filho)`: versão mais antiga — equivalente
- **Código**: remover um card de artigo da lista ao arquivá-lo

---

## Lição 12: Eventos

### Seções (H2)

#### O que é um evento
- Eventos são sinais de que algo aconteceu — clique, digitação, scroll, carregamento da página
- O navegador emite o evento; o JS pode "ouvir" e reagir
- Tipos: de usuário (click, keydown, input, scroll), de ciclo de vida (load, DOMContentLoaded), sintéticos (custom events)
- **Código**: lista dos eventos que vamos usar no blog e para quê cada um serve

#### `addEventListener`
- `element.addEventListener(tipo, handler)`: registrar uma função para responder ao evento
- O handler recebe o objeto `Event` como argumento automaticamente
- `removeEventListener`: remover — precisa da mesma referência de função
- Por que `addEventListener` em vez de `onclick`: múltiplos handlers, remoção, mais controle
- **Código**: `botaoTema.addEventListener("click", alternarTema)` — associar o toggle de tema

#### O objeto `Event`
- `event.target`: o elemento que originou o evento — onde o usuário clicou de fato
- `event.currentTarget`: o elemento onde o listener está registrado
- `event.type`: `"click"`, `"keydown"`, etc.
- `event.preventDefault()`: impedir o comportamento padrão — não seguir link, não submeter formulário
- `event.stopPropagation()`: impedir o bubble — o evento para aqui
- **Código**: `event.preventDefault()` no formulário de inscrição da newsletter + ler `event.target.value`

#### Propagação — bubbling e capturing
- Bubble (padrão): o evento sobe do elemento alvo até o `document`
- Capturing: o evento desce antes de subir — `addEventListener("click", fn, true)`
- Por isso um clique num elemento filho também dispara o listener do pai
- **Código**: demonstrar com dois elementos aninhados — ver a ordem dos logs

#### Delegação de eventos
- Registrar um listener no pai e verificar `event.target` — mais eficiente que N listeners
- `event.target.closest(seletor)`: verifica se o clique foi em (ou dentro de) um elemento específico
- Essencial para elementos criados dinamicamente — não existiam quando os listeners foram registrados
- **Código**: listener único no container de artigos para curtir qualquer card — `event.target.closest("[data-artigo-id]")`

#### Implementando as funcionalidades
- **Toggle de tema**: clique no botão → `.classList.toggle("dark")` no `<html>` → salvar em `localStorage`
- **Botão de curtir**: clique → incrementar contador → salvar ids curtidos em `localStorage` → atualizar ícone e número
- **Barra de progresso de leitura**: `scroll` no `window` → calcular `scrollY / (scrollHeight - innerHeight)` → atualizar `width` da barra
- **Código**: implementação completa das três funcionalidades

---

## Lição 13: Promises

### Seções (H2)

#### Por que código assíncrono existe
- JS é single-threaded: executa uma coisa por vez
- Operações de I/O (rede, arquivo, timer) demoram — bloquear esperaria congela a UI
- Assíncrono: iniciar a operação, continuar executando, reagir quando terminar
- **Código**: analogia: `setTimeout(() => console.log("depois"), 1000)` vs. código síncrono — ver a ordem de execução

#### Callbacks e o problema
- Callback: função passada como argumento para ser chamada depois
- Funcionou por anos — ainda existe em APIs como `setTimeout`, `addEventListener`
- Callback hell: callbacks aninhados para operações dependentes → pirâmide da morte
- **Código**: buscar lista de artigos → buscar tags de cada artigo → buscar autor de cada artigo — versão com callbacks aninhados

#### O que é uma Promise
- Objeto que representa uma operação assíncrona que vai completar (ou falhar) no futuro
- Três estados: pending (esperando), fulfilled (resolvida com valor), rejected (rejeitada com erro)
- Uma vez resolvida ou rejeitada, o estado não muda
- **Código**: criar uma Promise manualmente: `new Promise((resolve, reject) => { ... })`

#### `.then()`, `.catch()`, `.finally()`
- `.then(fn)`: handler para quando a Promise resolve — recebe o valor
- `.catch(fn)`: handler para quando a Promise rejeita — recebe o erro
- `.finally(fn)`: executa sempre, independente do resultado — limpeza
- Chaining: `.then()` retorna uma Promise — pode encadear
- **Código**: `buscarArtigos().then(artigos => exibirArtigos(artigos)).catch(err => exibirErro(err))`

#### `Promise.all()` e `Promise.allSettled()`
- `Promise.all([p1, p2, p3])`: aguarda todas — rejeita se qualquer uma rejeitar
- `Promise.allSettled([p1, p2])`: aguarda todas — resultado de cada uma, independente de erro
- `Promise.race([p1, p2])`: resolve/rejeita com a primeira que se resolver
- **Código**: carregar metadados do artigo (tags + autor) em paralelo com `Promise.all`

---

## Lição 14: Async/await

### Seções (H2)

#### A sintaxe `async`/`await`
- `async function`: a função sempre retorna uma Promise
- `await expressão`: pausa a execução até a Promise resolver — retorna o valor
- `await` só pode ser usado dentro de funções `async` (ou em top-level de módulo)
- **Código**: converter o exemplo de `.then()` da lição anterior para `async/await`

#### Tratamento de erros com `try`/`catch`
- Erros em `await` se comportam como erros síncronos — capturáveis com `try/catch`
- Sempre tratar erros — Promise rejeitada sem `.catch()` ou `try/catch` gera unhandled rejection
- `finally`: para limpeza que deve sempre rodar — ex: esconder loading spinner
- **Código**: `buscarArtigos` com `try/catch/finally` — loading state, erro, sucesso

#### Paralelo vs. sequencial
- `await a(); await b()`: sequencial — `b` espera `a` terminar
- `await Promise.all([a(), b()])`: paralelo — ambos iniciam ao mesmo tempo
- Erro clássico: `await` dentro de `for` → loop sequencial sem querer
- **Código**: carregar três endpoints em paralelo vs. sequencial — comparar o tempo total

#### Funções `async` no contexto do blog
- `async function carregarArtigos()`: buscar JSON da "API"
- `async function salvarCurtida(id)`: persistir curtida (simulado)
- O JS do blog inteiro vai usar `async/await` para operações de rede
- **Código**: esqueleto do `script.js` com as funções assíncronas nomeadas

---

## Lição 15: Fetch — falando com servidores

### Seções (H2)

#### O que é `fetch`
- API do navegador para fazer requisições HTTP — substitui `XMLHttpRequest`
- Retorna uma Promise que resolve com um objeto `Response`
- Disponível no browser e no Node.js (v18+)
- **Código**: `fetch("/artigos.json")` — ver no Network tab do devtools

#### Uma requisição GET básica
- `fetch(url)` → Promise de Response
- `response.ok`: `true` se status 2xx
- `response.status`: o código de status numérico
- `response.json()`: outro Promise — parsear o corpo como JSON
- `response.text()`: corpo como string
- Dois awaits: um para a resposta, outro para o corpo
- **Código**: `const artigos = await (await fetch("/artigos.json")).json()`

#### Verificar erros HTTP
- `fetch` só rejeita em erros de rede — não em 4xx/5xx
- Verificar `response.ok` manualmente e lançar erro
- **Código**: `if (!response.ok) throw new Error(`Erro ${response.status}`)` dentro do try

#### Enviar dados com POST
- Segundo argumento de `fetch`: objeto de opções — `method`, `headers`, `body`
- `body: JSON.stringify(dados)` e `Content-Type: application/json` no header
- **Código**: `fetch("/inscricao", { method: "POST", headers: {...}, body: JSON.stringify({ email }) })`

#### Implementando o carregamento de artigos
- Criar `artigos.json` na pasta pública com array de artigos
- `async function carregarArtigos()`: fetch → parse → renderizar cards no DOM
- Estado de carregamento: mostrar skeleton ou spinner enquanto aguarda
- Estado de erro: mensagem amigável se o fetch falhar
- **Código**: implementação completa com loading state, tratamento de erro e inserção no DOM

---

## Lição 16: Módulos

### Seções (H2)

#### O problema sem módulos
- Todos os scripts compartilham o escopo global — colisão de nomes
- Ordem de carregamento importa e é frágil
- Difícil saber de onde cada função veio
- **Código**: demonstrar colisão de nomes globais com dois scripts que declaram a mesma variável

#### ES Modules (ESM)
- `type="module"` no `<script>`: habilita o sistema de módulos
- Cada arquivo tem seu próprio escopo — nada vaza para o global
- Strict mode ativado automaticamente
- Suportado nativamente em todos os navegadores modernos
- **Código**: converter `<script src="script.js">` para `<script type="module" src="script.js">`

#### Export
- Named export: `export const x` ou `export function f` — pode exportar múltiplos
- Default export: `export default valor` — um por arquivo
- Exportar no final: `export { x, f }` — lista de exports
- **Código**: `utils.js` com exports nomeados: `export function formatarData`, `export function gerarSlug`, `export function calcularTempoLeitura`

#### Import
- Named: `import { formatarData, gerarSlug } from './utils.js'`
- Default: `import minhaFuncao from './modulo.js'`
- Renomear: `import { formatarData as formatar } from './utils.js'`
- Importar tudo: `import * as utils from './utils.js'` — usar como `utils.formatarData()`
- **Código**: `main.js` importando de `utils.js`, `api.js` e `ui.js`

#### Organizar o blog em módulos
- `utils.js`: funções puras — `formatarData`, `calcularTempoLeitura`, `gerarSlug`, `truncar`
- `api.js`: funções de rede — `carregarArtigos`, `registrarCurtida`
- `ui.js`: manipulação de DOM — `renderizarCard`, `atualizarContador`, `alternarTema`
- `main.js`: ponto de entrada — importa e orquestra; registra os event listeners
- **Código**: `script.js` atual refatorado nos quatro módulos

---

## Lição 17: Resumo do módulo

### Seções (H2)

#### O `script.js` final, modularizado
- Revisitar o que foi construído em cada lição
- Mostrar como os módulos se conectam
- O blog agora tem: toggle de tema persistido, curtidas persistidas, barra de progresso, lista dinâmica de artigos
- **Código**: diagrama de dependências entre `main.js`, `utils.js`, `api.js`, `ui.js`

#### Checklist JavaScript
- `const` por padrão, `let` somente quando reatribuição é necessária
- `===` em todas as comparações
- Tratar todos os casos assíncronos com `try/catch`
- Event delegation para listas de elementos
- Dados do usuário nunca em `innerHTML` — usar `textContent`
- **Código**: checklist comentado no topo de `main.js`

#### O que vem a seguir
- O blog funciona mas o JavaScript não tem tipos — erros só aparecem em runtime
- TypeScript vai adicionar tipos ao `script.js` — detectar erros antes de rodar
- Os conceitos do módulo continuam: só a sintaxe ganha anotações de tipo
