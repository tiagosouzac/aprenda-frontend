# Outline — Módulo 03: CSS — Aparência

**Fio condutor**: Estilizar `artigo.html` do módulo anterior. O arquivo `estilos.css` cresce a cada lição — ao final, o blog tem tipografia cuidadosa, layout de três colunas, responsividade e suporte a tema escuro via custom properties.

**Estado final**: `artigo.html` linkado a `estilos.css` com layout legível em qualquer tamanho de tela.

---

## Lição 1: CSS em geral

### Seções (H2)

#### O que é CSS e por que existe
- CSS (Cascading Style Sheets) controla a aparência — separado do conteúdo por design
- Antes do CSS, aparência era misturada no HTML com atributos como `bgcolor` e `font`
- Separar aparência de estrutura: um CSS para vários documentos, um documento com vários CSS
- A "cascata" do nome significa que múltiplas regras podem se aplicar ao mesmo elemento — e há regras para resolver conflitos
- **Código**: a mesma página `artigo.html` sem CSS (texto puro) e com um CSS mínimo aplicado

#### A anatomia de uma regra CSS
- Regra CSS: seletor + bloco de declarações
- Seletor: aponta para quais elementos a regra se aplica
- Declaração: `propriedade: valor;` — sempre com ponto e vírgula
- Múltiplas declarações no mesmo bloco, múltiplos seletores separados por vírgula
- Comentários: `/* assim */`
- **Código**: regra CSS anotada com nome de cada parte + variações (múltiplas declarações, múltiplos seletores)

#### Como conectar CSS ao HTML
- Inline (`style=""`): aplicado diretamente no elemento — última opção, mais difícil de manter
- Interno (`<style>` no `<head>`): CSS no próprio HTML — útil para páginas únicas ou testes rápidos
- Externo (`<link rel="stylesheet" href="estilos.css">`): arquivo separado — o padrão para projetos reais
- Ordem de carregamento: o `<link>` vai no `<head>` para que o CSS esteja pronto antes do `<body>` ser renderizado
- **Código**: criar `estilos.css` e linkar em `artigo.html`. Primeiras regras: `body { font-family: sans-serif; }` e `* { box-sizing: border-box; }`

#### A cascata em resumo
- Quando duas regras se aplicam ao mesmo elemento, uma precisa ganhar
- Três fatores decidem: origem (navegador, autor, inline), especificidade e ordem de declaração
- Detalhes na lição 3 — por agora, entender que CSS é hierárquico e intencional
- **Código**: exemplo simples de conflito de regras — mostrar qual ganha e por quê

---

## Lição 2: Seletores

### Seções (H2)

#### Seletores básicos
- Tag: `p` seleciona todos os parágrafos — útil para estilos globais
- Classe: `.nome-da-classe` — o seletor mais usado, pode repetir
- ID: `#nome-do-id` — único na página, especificidade alta, use com parcimônia
- Universal: `*` — seleciona tudo; útil em resets mas caro em performance se abusado
- **Código**: aplicar estilos base ao artigo por tag (`h1`, `p`), por classe (`.artigo-meta`) e por id (`#conteudo-principal`)

#### Seletores de atributo
- `[atributo]`: tem o atributo, qualquer valor — `[required]`, `[disabled]`
- `[atributo="valor"]`: valor exato — `[type="email"]`
- `[atributo^="valor"]`: começa com — `[href^="https"]` para links externos
- `[atributo$="valor"]`: termina com — `[href$=".pdf"]` para links de PDF
- **Código**: estilizar links externos diferente dos internos no artigo

#### Combinadores
- Descendente (`nav a`): qualquer `a` dentro de `nav`, em qualquer profundidade
- Filho direto (`nav > a`): apenas `a` que são filhos imediatos de `nav`
- Irmão adjacente (`h2 + p`): o `p` imediatamente após um `h2`
- Irmão geral (`h2 ~ p`): todos os `p` que são irmãos de `h2` (depois dele)
- Por que a distinção importa: precisão sem id ou classe
- **Código**: estilizar o primeiro parágrafo de cada seção do artigo com `h2 + p`

#### Pseudo-classes
- Estado de interação: `:hover`, `:focus`, `:active`
- Estado de link: `:visited`, `:link`
- Estrutural: `:first-child`, `:last-child`, `:nth-child(n)`, `:only-child`
- Negação e seleção: `:not(seletor)`, `:is(a, b, c)`, `:where(a, b, c)`
- Formulário: `:valid`, `:invalid`, `:required`, `:disabled`, `:checked`
- **Código**: hover nos links do nav + estilizar linhas ímpares de uma lista com `:nth-child(odd)`

#### Pseudo-elementos
- `::before` e `::after`: inserem conteúdo visual antes/depois do elemento (precisam de `content`)
- `::placeholder`: estiliza o placeholder de inputs
- `::selection`: cor do texto selecionado pelo usuário
- `::first-line`: apenas a primeira linha do parágrafo
- `::marker`: o marcador de lista (`li::marker`)
- **Código**: adicionar ícone de citação antes de `<blockquote>` com `::before` + `content: '"'`

---

## Lição 3: Especificidade e cascata

### Seções (H2)

#### O que é a cascata
- CSS usa três camadas em ordem crescente de prioridade: estilos do navegador → estilos do autor → estilos inline
- Dentro de cada camada, a especificidade decide qual regra ganha
- Se especificidade for igual, a última declaração na ordem do código vence
- **Código**: demonstrar os três níveis com o mesmo elemento sendo estilizado de fontes diferentes

#### Calculando especificidade
- IDs têm peso mais alto que classes, que têm peso mais alto que tags
- Contagem em três colunas: [IDs] [classes + atributos + pseudo-classes] [tags + pseudo-elementos]
- Exemplos: `p` = 0,0,1 — `.artigo` = 0,1,0 — `#conteudo` = 1,0,0 — `#conteudo .artigo p` = 1,1,1
- Inline style ganha de tudo (exceto `!important`)
- **Código**: comparar cinco seletores, calcular especificidade de cada um, prever qual ganha

#### Herança
- Algumas propriedades são herdadas pelos filhos por padrão: `color`, `font-family`, `font-size`, `line-height`, `letter-spacing`
- Outras não herdam: `margin`, `padding`, `border`, `background`, `width`, `display`
- `inherit`: força herança de uma propriedade que não herda por padrão
- `initial`: redefine para o valor inicial da especificação
- `unset`: herda se a propriedade é herdável, `initial` se não for
- **Código**: demonstrar herança de `color` e `font-family` no artigo; forçar `inherit` em `border`

#### Por que `!important` é sintoma de problema
- `!important` sobrescreve qualquer especificidade — ganha de tudo
- Quando você usa em um lugar, precisa usar em outro para sobrescrever — escala mal
- Caso legítimo: utilitários de acessibilidade (`.visually-hidden`), overrides de CSS de terceiros
- A solução quase sempre é estruturar os seletores melhor
- **Código**: refatorar um uso desnecessário de `!important` ajustando a especificidade

---

## Lição 4: Modelo de caixa

### Seções (H2)

#### Todo elemento é uma caixa
- O modelo de caixa descreve como o espaço de cada elemento é calculado
- Quatro camadas de dentro para fora: content → padding → border → margin
- Content: o espaço do conteúdo em si (texto, imagem)
- Padding: espaço interno entre conteúdo e borda
- Border: a borda em si (largura, estilo, cor)
- Margin: espaço externo entre a borda e outros elementos
- **Código**: `<div>` com cores de fundo diferentes em cada camada para visualizar o modelo

#### `box-sizing`
- `content-box` (padrão): `width` define só o conteúdo — padding e border aumentam o tamanho total
- `border-box`: `width` inclui conteúdo + padding + border — mais intuitivo
- Reset universal: `*, *::before, *::after { box-sizing: border-box; }` — praticamente todo projeto usa isso
- **Código**: o mesmo elemento com `width: 300px` nas duas versões de `box-sizing` — ver a diferença

#### Margin collapsing
- Quando dois elementos verticais se encontram, suas margens se mesclam — a maior vence
- Situações: irmãos adjacentes, pai sem padding/border e primeiro filho
- Margin collapsing não acontece com flexbox nem grid
- Como evitar quando indesejado: `overflow: hidden` no pai, `padding: 1px`, usar flexbox/grid
- **Código**: dois parágrafos com `margin-bottom` e `margin-top` — demonstrar o colapso

#### Margens e padding na prática
- Shorthand: `margin: top right bottom left` — no sentido horário
- `margin: 16px auto` — valor igual em cima/baixo, auto nas laterais (centrar bloco)
- `padding: 16px 24px` — 16px vertical, 24px horizontal
- Quando usar margin vs padding: margin separa elementos entre si; padding cria espaço interno
- Margin negativa existe e é útil em casos específicos
- **Código**: estilizar o `<article>` e suas seções com padding e margin adequados para leitura

---

## Lição 5: Display e fluxo normal

### Seções (H2)

#### O fluxo normal
- O fluxo normal é como o navegador posiciona elementos sem CSS especial
- Cada elemento tem um `display` padrão definido pela especificação
- Entender o fluxo normal é pré-requisito para entender Flexbox e Grid
- **Código**: página simples com apenas HTML, sem CSS — mostrar o fluxo padrão

#### `display: block`
- Ocupa toda a largura disponível do pai
- Começa em nova linha; o próximo elemento também começa em nova linha
- Aceita `width`, `height`, `margin` e `padding` em todos os lados
- Exemplos nativos: `<div>`, `<p>`, `<h1>`–`<h6>`, `<section>`, `<article>`
- **Código**: converter um `<span>` em bloco — antes e depois com `display: block`

#### `display: inline`
- Ocupa apenas o espaço do seu conteúdo
- Não quebra a linha — flui com o texto ao redor
- `width` e `height` não têm efeito; `margin` e `padding` verticais não deslocam vizinhos
- Exemplos nativos: `<a>`, `<strong>`, `<em>`, `<code>`, `<span>`
- **Código**: link dentro de um parágrafo — comportamento inline em ação

#### `display: inline-block`
- Híbrido: flui com o texto como inline, mas aceita `width`, `height` e margens verticais
- Uso clássico: botões, tags, chips — elementos que precisam de tamanho mas ficam na linha
- **Código**: criar as tags do artigo (Frontend, HTML, CSS) como `inline-block` com padding e border-radius

#### `display: none`
- Remove o elemento do layout — como se não existisse
- Não acessível: leitores de tela também ignoram
- `visibility: hidden`: esconde visualmente mas mantém o espaço e o acesso ao leitor de tela
- **Código**: botão que alterna `display: none` vs. `visibility: hidden` (usando JS inline para demonstrar)

---

## Lição 6: Posicionamento

### Seções (H2)

#### `position: static` — o padrão
- Todos os elementos começam com `position: static`
- `top`, `right`, `bottom`, `left` e `z-index` não têm efeito
- O elemento segue o fluxo normal
- **Código**: nenhum — ponto de partida para comparar com os outros valores

#### `position: relative`
- Permanece no fluxo — o espaço original é preservado
- `top/right/bottom/left` deslocam o elemento a partir da sua posição original
- Cria um "contexto de posicionamento" para filhos com `position: absolute`
- **Código**: mover a data do artigo levemente com `position: relative; top: 2px`

#### `position: absolute`
- Removido do fluxo — outros elementos ignoram seu espaço
- Posicionado em relação ao ancestral posicionado mais próximo (não `static`)
- Se nenhum ancestral for posicionado, usa o `<html>` como referência
- **Código**: badge "Novo" no canto superior direito de um card de artigo

#### `position: fixed`
- Posicionado em relação à viewport — não à página
- Permanece visível durante o scroll
- Uso clássico: header fixo, botão "voltar ao topo", cookie banner
- **Código**: header do blog com `position: fixed; top: 0` + compensar o espaço com `padding-top` no body

#### `position: sticky`
- Híbrido: `relative` até atingir um limiar de scroll, depois `fixed` no contexto do pai
- Requer ao menos um valor de `top/right/bottom/left`
- Útil para: índice lateral, cabeçalhos de tabela, nav que gruda no topo após scroll
- **Código**: índice de seções do artigo com `position: sticky; top: 24px`

#### `z-index` e stacking context
- `z-index` controla a ordem de empilhamento — quem aparece na frente
- Funciona apenas em elementos posicionados (não `static`)
- Stacking context: cada contexto tem sua própria pilha — `z-index: 9999` dentro de um contexto não vence um `z-index: 1` em outro
- O que cria um stacking context: `position` + qualquer `z-index`, `opacity < 1`, `transform`, `filter`, `will-change`
- **Código**: dropdown do nav com `z-index` correto para aparecer sobre o conteúdo

---

## Lição 7: Flexbox

### Seções (H2)

#### O modelo mental do Flexbox
- Flexbox é para layout em uma dimensão: uma linha ou uma coluna por vez
- `display: flex` no elemento pai — filhos imediatos viram flex items
- Container controla a distribuição; items podem se ajustar individualmente
- Dois eixos: principal (main axis, padrão: horizontal) e cruzado (cross axis, perpendicular)
- **Código**: HTML do header do blog (logo + nav) — ativar `display: flex` e ver o comportamento padrão

#### Direção e quebra
- `flex-direction`: `row` (padrão), `row-reverse`, `column`, `column-reverse` — define o eixo principal
- `flex-wrap`: `nowrap` (padrão — items encolhem), `wrap` (items quebram para próxima linha)
- `flex-flow`: shorthand de `flex-direction flex-wrap`
- **Código**: galeria de cards de artigo com `flex-wrap: wrap` — quebrar em múltiplas linhas

#### Distribuição no eixo principal
- `justify-content`: distribui espaço ao longo do eixo principal
- `flex-start`, `center`, `flex-end`: alinhar o grupo de items
- `space-between`: espaço entre items (sem espaço nas pontas)
- `space-around`: espaço igual ao redor de cada item
- `space-evenly`: espaço igual entre items e nas pontas
- **Código**: header com logo alinhado à esquerda e nav à direita usando `justify-content: space-between`

#### Alinhamento no eixo cruzado
- `align-items`: alinha todos os items no eixo cruzado
- `stretch` (padrão): items se esticam para preencher a altura do container
- `center`: centrado verticalmente (quando `flex-direction: row`)
- `flex-start`, `flex-end`, `baseline`
- `align-self`: sobrescreve `align-items` para um item específico
- `align-content`: quando há múltiplas linhas (`flex-wrap: wrap`) — controla como as linhas se distribuem
- **Código**: metadados do artigo (autor + data + tempo de leitura) centralizados verticalmente com `align-items: center`

#### Tamanho dos flex items
- `flex-grow`: fator de crescimento — como o espaço livre é distribuído
- `flex-shrink`: fator de encolhimento — como items encolhem quando falta espaço
- `flex-basis`: tamanho inicial antes de crescer/encolher — substitui `width` no eixo principal
- `flex: 1` shorthand para `flex: 1 1 0` — grow, shrink, basis
- **Código**: layout de dois painéis no artigo (conteúdo principal flex: 3, sidebar flex: 1)

#### Gap
- `gap: 16px`: espaço entre flex items — substitui margin em ambos os lados
- `row-gap` e `column-gap` separados quando necessário
- **Código**: cards de artigos relacionados na sidebar com `gap: 12px`

---

## Lição 8: Grid

### Seções (H2)

#### O modelo mental do Grid
- Grid é para layout em duas dimensões: linhas e colunas ao mesmo tempo
- `display: grid` no container — filhos diretos são grid items
- Grid cria uma estrutura de trilhas (tracks) — as células são a interseção de linhas e colunas
- Diferença de Flexbox: Grid define a estrutura global; Flexbox, o comportamento de um eixo
- **Código**: estrutura de três colunas para `artigo.html`: sidebar / conteúdo / aside

#### Definindo colunas e linhas
- `grid-template-columns`: define o número e tamanho das colunas
- `grid-template-rows`: define o tamanho das linhas
- Unidade `fr`: fração do espaço disponível — `1fr 2fr` = 1/3 e 2/3
- `repeat(3, 1fr)`: repetir três colunas iguais
- `minmax(200px, 1fr)`: entre 200px e 1fr — responsivo sem media query
- `auto-fill` vs `auto-fit`: diferença no comportamento de colunas implícitas
- **Código**: `grid-template-columns: 220px 1fr 200px` para o layout do artigo

#### Posicionando grid items
- Por padrão, items preenchem a grid da esquerda para a direita
- `grid-column: 1 / 3`: ocupa da linha 1 até a linha 3 (duas colunas)
- `grid-column: span 2`: ocupa duas colunas a partir da posição atual
- `grid-row`: mesmo conceito para linhas
- `-1` como referência à última linha/coluna
- **Código**: fazer o título do artigo ocupar as três colunas

#### Grid template areas
- `grid-template-areas`: define o layout como um "mapa" ASCII de áreas nomeadas
- Cada área tem um nome; cells repetidos formam uma área maior
- `.` representa uma célula vazia
- `grid-area` no item associa o item a uma área nomeada
- **Código**: layout completo do artigo com `header`, `sidebar`, `main`, `aside`, `footer`

#### Grid implícito
- Itens que excedem a grid definida vão para o grid implícito
- `grid-auto-rows`: altura padrão das linhas implícitas
- `grid-auto-columns`: largura padrão das colunas implícitas
- `grid-auto-flow`: `row` (padrão) ou `column`
- **Código**: grade de cards de artigos na home que cresce automaticamente

#### Quando Grid, quando Flexbox
- Grid: quando você precisa controlar linhas e colunas ao mesmo tempo (layout de página)
- Flexbox: quando os itens se organizam em uma dimensão (componentes, listas)
- Podem ser aninhados: Grid para o layout geral, Flexbox para componentes internos
- **Código**: comparar implementar o mesmo componente de card em Grid e em Flexbox — mostrar qual é mais natural

---

## Lição 9: Tipografia e cores

### Seções (H2)

#### Fontes e `font-family`
- `font-family`: lista de famílias em ordem de prioridade — fallback ao final
- Stack segura: `system-ui, -apple-system, sans-serif` — usa a fonte do sistema
- Web fonts: `@font-face` para fontes customizadas ou Google Fonts via `<link>`
- `font-weight`: 100 a 900 (nem toda fonte tem todas as variações)
- `font-style`: `normal`, `italic`, `oblique`
- **Código**: adicionar Google Fonts ao blog (uma serifada para títulos, uma sans para corpo) + stack de fallback

#### Tamanho e espaçamento
- `font-size`: tamanho do texto — `px`, `rem`, `em`
- `line-height`: espaço entre linhas — sem unidade é relativo ao `font-size` (`1.6` é comum para leitura)
- `letter-spacing`: espaço entre letras — em `em` para ser proporcional
- `word-spacing`: espaço entre palavras
- **Código**: escala tipográfica para o artigo: `h1` 2.5rem, `h2` 1.75rem, body 1rem, line-height 1.7

#### Unidades de medida
- `px`: pixels fixos — previsível, não escala com preferências do usuário
- `rem`: relativo ao `font-size` do elemento raiz (`html`) — escala com preferências do usuário
- `em`: relativo ao `font-size` do elemento pai — útil para `padding` e `margin` de componentes
- `%`: relativo ao pai — largura relativa, mais contextual
- `ch`: largura do caractere "0" — útil para `max-width: 65ch` (linha de texto ideal)
- **Código**: converter os tamanhos do blog de `px` para `rem`; usar `ch` para o `max-width` do corpo do artigo

#### Formatos de cor
- Hex: `#ff5733` — compacto, familiar — `#f53` é shorthand
- `rgb(255, 87, 51)` e `rgba(255, 87, 51, 0.5)` — com canal alfa
- `hsl(11, 100%, 60%)`: matiz, saturação, luminosidade — mais intuitivo para variações
- `oklch(65% 0.2 30)`: perceptualmente uniforme — o padrão moderno para design tokens
- `currentColor`: herda a cor do texto — útil para bordas e ícones SVG
- **Código**: paleta de cores do blog definida em `hsl` + uso de `currentColor` em bordas

---

## Lição 10: Design responsivo

### Seções (H2)

#### Mobile-first como filosofia
- Projetar para tela pequena primeiro, adicionar complexidade para telas maiores
- Por que: a tela pequena tem restrições — resolver as restrições antes de adicionar
- Performance: regras base chegam a todos; media queries são adicionais
- Implicação em CSS: começar com layout simples (coluna única), expandir com `min-width`
- **Código**: `estilos.css` do artigo reestruturado de mobile-first — layout linear para mobile

#### Media queries
- `@media (min-width: 768px) { }`: aplica regras quando a viewport tem pelo menos 768px
- Breakpoints comuns: 640px (tablet pequeno), 768px (tablet), 1024px (desktop), 1280px (desktop largo)
- `prefers-color-scheme: dark`: responde à preferência do sistema para tema escuro
- `prefers-reduced-motion`: respeita preferência de menos animação
- `print`: estilos específicos para impressão
- **Código**: artigo em coluna única no mobile, layout de duas colunas acima de 1024px

#### Funções CSS para valores fluidos
- `clamp(min, preferido, max)`: valor que varia entre mínimo e máximo com interpolação suave
- `min(a, b)`: o menor dos dois valores — `width: min(100%, 720px)` é igual a `max-width: 720px` + `width: 100%`
- `max(a, b)`: o maior dos dois
- Tipografia fluida: `font-size: clamp(1rem, 2vw + 0.5rem, 1.5rem)` — sem breakpoints
- **Código**: aplicar tipografia fluida nos cabeçalhos do artigo com `clamp()`

#### Viewport units e imagens responsivas
- `vw`, `vh`: porcentagem da largura/altura da viewport
- `dvh` (dynamic viewport height): leva em conta a barra de endereço do mobile
- `max-width: 100%` em imagens: nunca ultrapassa o container
- `object-fit: cover`: recorta a imagem para preencher o container sem distorcer
- `aspect-ratio`: mantém proporção sem JavaScript
- **Código**: imagem de capa do artigo responsiva com `aspect-ratio: 16/9` e `object-fit: cover`

---

## Lição 11: Custom properties (variáveis CSS)

### Seções (H2)

#### O que são custom properties
- Variáveis definidas pelo autor — não confundir com variáveis de pré-processadores (Sass, Less)
- Sintaxe: `--nome-da-variavel: valor` — sempre com `--` no início
- Usadas com `var(--nome)` ou `var(--nome, fallback)`
- São propriedades CSS reais: cascadeiam, são herdadas, podem ser animadas
- **Código**: definir as primeiras variáveis do blog: `--cor-primaria`, `--cor-texto`, `--fonte-base`

#### Escopo e herança
- Definidas em `:root` são globais — disponíveis em qualquer elemento
- Definidas em um seletor específico: disponíveis apenas para aquele elemento e seus descendentes
- Podem ser redefinidas em elementos filhos — a redefinição afeta apenas aquela subárvore
- **Código**: `--destaque` definido com cor diferente dentro de `<aside>` vs. no `:root`

#### Design tokens na prática
- Design tokens: valores de design reutilizáveis — cores, espaçamentos, bordas, fontes
- Centralizar em `:root` significa que mudar um valor atualiza o site inteiro
- Nomenclatura: semântica (`--cor-texto-principal`) é melhor que descritiva (`--cinza-700`)
- **Código**: extrair todas as cores, tamanhos e fontes do `estilos.css` do blog para custom properties em `:root`

#### Temas com custom properties
- Definir valores base em `:root` (tema claro)
- Sobrescrever em `[data-theme="dark"]` ou `@media (prefers-color-scheme: dark)`
- JavaScript pode alternar o atributo `data-theme` no elemento `<html>` — o CSS reage automaticamente
- Por que custom properties são ideais para temas: a variável continua a mesma, só o valor muda
- **Código**: implementar tema claro e escuro no blog usando custom properties + toggle via `data-theme`

---

## Lição 12: Resumo do módulo

### Seções (H2)

#### O `estilos.css` final
- Revisitar o crescimento do arquivo lição a lição
- Reset (`box-sizing`, `margin`, `padding`), variáveis em `:root`, layout de página com Grid, componentes com Flexbox, tipografia e responsividade
- **Código**: `estilos.css` completo comentado por seção

#### Checklist para qualquer folha de estilos
- Reset: `box-sizing: border-box`, `max-width: 100%` em imagens
- Variáveis em `:root` para valores reutilizados
- Mobile-first: estilos base para mobile, media queries `min-width` para telas maiores
- Seletores de baixa especificidade — evitar IDs em CSS
- Flexbox para componentes, Grid para layout de página
- **Código**: checklist como comentários no início do arquivo CSS

#### O que vem a seguir
- O artigo agora tem estrutura e aparência — mas é estático
- JavaScript vai adicionar comportamento: toggle de tema, botão de curtir, carregamento dinâmico de artigos
- Os ids, classes e atributos `data-*` definidos no HTML vão ser usados pelo JS
