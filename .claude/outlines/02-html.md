# Outline — Módulo 02: HTML — Estrutura

**Fio condutor**: Construir `artigo.html` — a página de um post do blog — do zero até um documento semântico, acessível e completo. Ao final do módulo, o estudante tem um arquivo HTML que funciona no navegador com estrutura correta, sem uma linha de CSS ou JS.

**O artigo de exemplo**: "Meu primeiro projeto web" — post de um dev documentando o que aprendeu construindo um site simples. Tem título, subtítulos, parágrafos, uma lista de aprendizados, um bloco de código, uma citação, imagem do projeto e um formulário de contato no rodapé.

---

## Lição 1: HTML em geral

### Seções (H2)

#### O que é HTML
- HTML significa HyperText Markup Language — cada palavra importa
- HyperText: texto com links para outros documentos — o que tornou a web navegável
- Markup: você anota pedaços de conteúdo dizendo o que eles são, não como parecem
- Language: tem sintaxe, regras e um vocabulário de elementos definido
- HTML não é uma linguagem de programação — não calcula, não decide, não repete
- **Código**: comparação de texto puro vs. texto marcado com HTML (mesmo conteúdo, com e sem tags)

#### A trinca HTML, CSS e JavaScript
- HTML: estrutura e significado — o conteúdo em si
- CSS: aparência — como o conteúdo é apresentado
- JavaScript: comportamento — o que acontece quando o usuário interage
- HTML funciona sem CSS e sem JS — as outras duas camadas são opcionais
- Por que a separação existe: manutenção, reutilização, especialização
- **Código**: `artigo.html` mínimo que funciona no navegador sem CSS ou JS

#### Como o navegador processa HTML
- O arquivo HTML é texto; o navegador lê e constrói uma estrutura em memória
- Parser lê de cima para baixo, elemento por elemento
- DOM (Document Object Model): a árvore em memória que representa o documento
- JavaScript pode modificar o DOM; o navegador reflete as mudanças na tela
- **Código**: HTML simples + diagrama ASCII do DOM correspondente

#### Por que HTML bem escrito importa
- Acessibilidade: leitores de tela dependem de semântica correta
- SEO: mecanismos de busca entendem melhor o conteúdo marcado corretamente
- Resiliência: se CSS ou JS falhar, a página ainda funciona e é legível
- Manutenibilidade: código que comunica intenção é mais fácil de mudar

---

## Lição 2: Anatomia de um documento

### Seções (H2)

#### A estrutura mínima
- Todo documento HTML começa com `<!DOCTYPE html>` — declara a versão do HTML
- `<html lang="pt-BR">`: raiz do documento; `lang` é importante para leitores de tela e mecanismos de busca
- `<head>`: metadados que o navegador usa mas o usuário não vê diretamente
- `<body>`: tudo que é visível na página vai aqui
- **Código**: estrutura esqueleto de `artigo.html` com os quatro elementos obrigatórios

#### O que vai no `<head>`
- `<meta charset="utf-8">`: define a codificação de caracteres — sem isso, acentos quebram
- `<meta name="viewport" content="width=device-width, initial-scale=1">`: necessário para responsividade
- `<title>`: aparece na aba do navegador e nos resultados de busca
- `<meta name="description">`: resumo do conteúdo para mecanismos de busca e previews de link
- `<link rel="icon">`: favicon — o ícone na aba
- `<link rel="stylesheet">`: onde o CSS será linkado (vazio por enquanto)
- **Código**: `<head>` completo de `artigo.html` com todos os metadados do post

#### Estrutura do `<body>` do artigo
- O `<body>` do artigo vai ter: header do site, conteúdo principal do artigo, rodapé
- Introduzir os elementos semânticos que serão detalhados na lição 7: `<header>`, `<main>`, `<footer>`
- Neste ponto, o foco é a divisão lógica — os elementos serão preenchidos nas lições seguintes
- **Código**: `artigo.html` com `<body>` estruturado com as grandes divisões, ainda vazio por dentro

---

## Lição 3: Tags, elementos e atributos

### Seções (H2)

#### Tag vs. elemento
- Tag é a marcação em si: `<p>`, `</p>` — são sintaxe
- Elemento é a tag mais o conteúdo: `<p>Texto aqui</p>` — é a unidade semântica
- Por que a distinção importa: evitar confusão na leitura de mensagens de erro e documentação
- **Código**: ilustração visual de tag de abertura, conteúdo, tag de fechamento e o elemento completo

#### Tags de fechamento e elementos vazios
- A maioria das tags vem em par: abertura e fechamento
- A barra `/` na tag de fechamento indica o fim do elemento
- Elementos vazios não têm conteúdo e não precisam de fechamento: `<img>`, `<input>`, `<br>`, `<hr>`, `<meta>`, `<link>`
- **Código**: exemplos de elementos com fechamento vs. elementos vazios em contexto de `artigo.html`

#### Atributos
- Atributos ficam na tag de abertura e fornecem informações extras ao elemento
- Sintaxe: `nome="valor"` (aspas duplas, sem espaço em torno do `=`)
- Atributos específicos: `href` em `<a>`, `src` em `<img>`, `type` em `<input>`
- Atributos booleanos: presença significa true — `required`, `disabled`, `checked`
- **Código**: `<a>`, `<img>` e `<input>` com seus atributos típicos no contexto do artigo

#### Atributos globais
- Funcionam em qualquer elemento HTML
- `id`: identificador único na página — uma âncora, um alvo de CSS ou JS
- `class`: agrupa elementos para estilização — pode ser repetido
- `data-*`: dados customizados acessíveis via JavaScript
- `hidden`: esconde o elemento sem CSS
- `tabindex`: controla a ordem de foco pelo teclado
- **Código**: elementos de `artigo.html` com `id` e `class` que serão usados nos módulos de CSS e JS

#### Aninhamento correto
- Elementos podem conter outros elementos — criando a árvore do DOM
- Regra: o que abre por último fecha por primeiro (LIFO)
- Aninhamento incorreto gera comportamento inesperado — o navegador tenta corrigir mas pode errar
- **Código**: aninhamento correto vs. incorreto com o que o navegador realmente constrói em cada caso

---

## Lição 4: Texto e conteúdo

### Seções (H2)

#### Cabeçalhos
- `<h1>` a `<h6>`: hierarquia de títulos, do mais importante ao menos
- Um único `<h1>` por página — o título principal do documento
- A hierarquia deve ser lógica: `<h2>` dentro do `<h1>`, `<h3>` dentro do `<h2>`
- Não pular níveis para efeito visual — use CSS para isso
- **Código**: hierarquia de cabeçalhos do artigo: `<h1>` título, `<h2>` seções, `<h3>` subseções

#### Parágrafos e quebras
- `<p>`: a unidade básica de texto — cada parágrafo em seu próprio elemento
- Nunca use `<br>` para criar espaço entre parágrafos — use CSS
- `<br>` tem uso legítimo em endereços, poesia, onde a quebra de linha é parte do conteúdo
- **Código**: dois parágrafos de `artigo.html` + exemplo de onde `<br>` faz sentido

#### Ênfase e importância
- `<strong>`: importância semântica — leitores de tela enfatizam mais
- `<em>`: ênfase — inflexão de voz, leitores de tela leem diferente
- `<b>` e `<i>`: estilísticos, sem semântica — use apenas quando `<strong>`/`<em>` não se aplicam
- **Código**: parágrafos do artigo usando `<strong>` e `<em>` nos lugares certos

#### Listas
- `<ul>` (unordered list): itens sem ordem definida — marcador padrão é bullet
- `<ol>` (ordered list): itens em sequência — marcador padrão é número
- `<li>`: cada item da lista — funciona em ambas
- `<dl>`, `<dt>`, `<dd>`: lista de definições — termos e suas definições
- **Código**: lista de aprendizados do artigo com `<ul>` + lista de passos com `<ol>`

#### Citações e código
- `<blockquote>`: citação longa, em bloco — com `cite` apontando a fonte
- `<cite>`: título de uma obra — livro, artigo, filme
- `<code>`: trecho de código inline — `const x = 1`
- `<pre>`: texto pré-formatado — mantém espaços e quebras de linha
- `<pre><code>`: bloco de código — a combinação correta para código multi-linha
- `<kbd>`: tecla do teclado — `<kbd>Ctrl</kbd>+<kbd>C</kbd>`
- **Código**: bloco de código de exemplo dentro do artigo + citação de um livro técnico

---

## Lição 5: Links

### Seções (H2)

#### A âncora `<a>` e o atributo `href`
- `<a href="...">`: o elemento de link — a base do HyperText
- `href` aceita URL absoluta (`https://...`) ou relativa (`/sobre`, `./imagem.jpg`)
- Link sem `href` é um placeholder — sem comportamento de link
- O conteúdo do `<a>` é o texto clicável (ou imagem)
- **Código**: links de navegação do header do blog — Home, Sobre, Artigos

#### URLs relativas vs. absolutas
- Absoluta: inclui protocolo e domínio — funciona de qualquer lugar
- Relativa: relativa ao documento atual — mais portátil, útil para arquivos do mesmo site
- `./arquivo.html` (mesmo diretório), `../outro/arquivo.html` (subir um nível), `/raiz/arquivo.html` (a partir da raiz do site)
- **Código**: o mesmo link escrito das três formas, com quando usar cada uma

#### Links para âncoras na mesma página
- `href="#id-do-elemento"`: scroll para o elemento com aquele `id`
- Útil para índices, "voltar ao topo", navegação interna em artigos longos
- O elemento-alvo precisa ter um `id`
- **Código**: índice de seções no topo do artigo, com links `#secao-1`, `#secao-2` etc.

#### Abrir em nova aba — e quando não fazer
- `target="_blank"`: abre link em nova aba
- Sempre acompanhar com `rel="noopener noreferrer"` — segurança contra tab-napping
- Quando usar: links para fora do site, arquivos para download
- Quando não usar: navegação interna — o usuário decide onde abrir
- **Código**: link externo no artigo (referência bibliográfica) com `target` e `rel`

#### Links acessíveis
- O texto do link deve descrever o destino — "clique aqui" não diz nada fora de contexto
- Leitores de tela podem listar todos os links da página — textos vagos são inúteis
- Quando o contexto visual não é suficiente, use `aria-label`
- **Código**: lista de links ruins vs. lista equivalente com texto descritivo

---

## Lição 6: Imagens e mídia

### Seções (H2)

#### A tag `<img>` e seus atributos essenciais
- `<img src="..." alt="...">`: elemento vazio que incorpora uma imagem
- `src`: caminho para o arquivo — relativo ou absoluto
- `alt`: texto alternativo — obrigatório; descreve a imagem para quem não pode vê-la
- Quando a imagem é decorativa, `alt=""` (vazio) instrui o leitor de tela a ignorar
- **Código**: imagem de capa do artigo com `alt` descritivo + avatar do autor com `alt`

#### Dimensões e performance
- Sempre declare `width` e `height` — evita layout shift enquanto a imagem carrega
- `loading="lazy"`: adia o carregamento de imagens fora da tela — melhor performance
- `loading="eager"` (padrão): carrega imediatamente — use na imagem hero, acima da dobra
- **Código**: imagem de capa com `width`, `height`, `loading="eager"` e imagens do conteúdo com `loading="lazy"`

#### Formatos modernos
- JPEG: fotos — bom para gradientes e fotografia
- PNG: transparência, ícones, screenshots
- WebP: moderno, melhor compressão que JPEG/PNG para ambos os casos
- AVIF: ainda mais eficiente, suporte mais recente
- SVG: vetorial — perfeito para ícones e ilustrações
- **Código**: comparação de tamanhos para a mesma imagem em formatos diferentes (em comentário)

#### `<picture>` e múltiplas fontes
- `<picture>`: oferece fontes alternativas; o navegador escolhe a melhor
- `<source type="image/avif">`, `<source type="image/webp">`, `<img>` como fallback
- `srcset` e `sizes` em `<img>` para diferentes densidades de tela
- **Código**: imagem de capa do artigo com fallback AVIF → WebP → JPEG

#### Vídeo e áudio
- `<video controls>`: player de vídeo nativo do navegador
- `<audio controls>`: player de áudio nativo
- `poster`: imagem exibida antes do vídeo iniciar
- Múltiplos `<source>` para compatibilidade: MP4, WebM
- `muted` e `autoplay`: se usados juntos, funcionam em mais navegadores
- **Código**: `<video>` com poster, múltiplas fontes e legenda `<track>`

---

## Lição 7: HTML semântico

### Seções (H2)

#### Por que semântica importa
- Semântica é o significado por trás da marcação — não apenas o visual
- `<div>` e `<span>` não dizem nada sobre o papel do conteúdo
- Leitores de tela anunciam o papel dos elementos (`"navegação"`, `"artigo"`, `"rodapé"`)
- O modo de leitura dos navegadores e o Google usam semântica para entender a página
- **Código**: a mesma seção do artigo — versão com `<div>` vs. versão semântica

#### Estrutura de página com `<header>`, `<main>`, `<footer>`
- `<header>`: cabeçalho de página ou de seção — logo, título, navegação principal
- `<main>`: conteúdo principal — único por página, não deve estar dentro de outros landmarks
- `<footer>`: rodapé de página ou de seção — créditos, links secundários, formulário de contato
- **Código**: `artigo.html` com `<header>` (logo + nav), `<main>` (artigo), `<footer>` (contato)

#### Navegação com `<nav>`
- `<nav>`: marca um bloco de links de navegação principal — não toda coleção de links
- Pode aparecer mais de uma vez: navegação principal no header, índice dentro do artigo
- **Código**: `<nav>` no header com links Home/Sobre/Artigos + `<nav>` como índice do artigo

#### Conteúdo com `<article>`, `<section>` e `<aside>`
- `<article>`: conteúdo independente — faz sentido fora do contexto da página (um post, uma notícia)
- `<section>`: agrupamento temático — capítulos, abas, partes relacionadas
- `<aside>`: conteúdo tangencialmente relacionado — barra lateral, nota de rodapé, "leitura relacionada"
- Diferença `<section>` vs. `<article>`: um artigo pode conter sections; sections não são necessariamente artigos
- **Código**: `<article>` envolvendo o post, com `<section>` por capítulo e `<aside>` com artigos relacionados

#### Quando usar `<div>` e `<span>`
- `<div>`: container de bloco sem semântica — use quando nenhum elemento semântico se aplica
- `<span>`: container inline sem semântica — use para estilizar parte de um texto
- Teste: existe um elemento semântico que descreve este papel? Se sim, use ele.
- **Código**: exemplos legítimos de `<div>` e `<span>` + contraexemplos onde deveria haver semântica

---

## Lição 8: Formulários

### Seções (H2)

#### A tag `<form>` e seus atributos
- `<form>`: agrupa controles que o usuário preenche e envia
- `action`: URL para onde os dados são enviados (sem JS, com JS esse atributo é ignorado)
- `method`: `GET` (dados na URL) ou `POST` (dados no corpo da requisição)
- Sem `action` e `method`, formulário submete para a própria página via GET
- **Código**: `<form>` para inscrição na newsletter do blog, com `action` e `method`

#### Inputs e seus tipos
- `<input type="text">`: campo de texto livre
- `<input type="email">`: campo de e-mail — validação nativa no móvel traz teclado correto
- `<input type="password">`: oculta os caracteres
- `<input type="number">`: aceita apenas números
- `<input type="checkbox">`: opção binária — marcada ou não
- `<input type="radio">`: escolha exclusiva em um grupo (`name` igual agrupa)
- `<input type="file">`: upload de arquivo
- `<input type="submit">`: botão de envio (prefira `<button type="submit">`)
- **Código**: formulário de contato completo com vários tipos de input

#### `<label>` e acessibilidade
- Cada input deve ter um `<label>` — identifica o campo para o usuário e para leitores de tela
- Associar por `for`/`id`: `<label for="email">` e `<input id="email">`
- Ou envolver: `<label><input> Texto</label>` — a associação é implícita
- Placeholder não substitui label — some quando o campo é preenchido
- **Código**: inputs do formulário com labels associados corretamente

#### `<select>`, `<textarea>` e `<button>`
- `<select>`: lista suspensa de opções — `<option>` para cada item, `<optgroup>` para grupos
- `<textarea>`: campo de texto multi-linha — `rows` e `cols` definem o tamanho inicial
- `<button type="submit">`: botão de envio — mais flexível que `<input type="submit">`
- `<button type="button">`: botão sem comportamento padrão — controlado por JS
- `<button type="reset">`: limpa o formulário — use com cuidado
- **Código**: formulário de contato com `<select>` de assunto, `<textarea>` de mensagem e `<button>`

#### Validação nativa
- `required`: campo obrigatório — navegador bloqueia envio se vazio
- `type="email"`: valida formato de e-mail
- `minlength`, `maxlength`: comprimento mínimo/máximo de texto
- `pattern`: expressão regular para validação customizada
- `min`, `max`: para `type="number"` ou `type="date"`
- Estilização com `:valid` e `:invalid` (CSS) para feedback visual
- **Código**: formulário com validação nativa em cada campo relevante

---

## Lição 9: Acessibilidade básica

### Seções (H2)

#### O que é acessibilidade e por que importa
- Acessibilidade significa que qualquer pessoa consegue usar o site — independente de limitação
- ~15-20% da população tem alguma deficiência; muitas são invisíveis ou situacionais
- Problemas de acessibilidade também afetam: usuários de teclado, conexão lenta, SEO
- HTML semântico já resolve grande parte — acessibilidade começa pela marcação correta
- **Código**: nenhum — lista de perfis de usuário que se beneficiam de acessibilidade

#### `alt` em imagens
- Imagens informativas precisam de `alt` que descreva o conteúdo e o contexto
- Imagens decorativas devem ter `alt=""` — leitores de tela as ignoram
- `alt` ruim: "imagem", "foto", "screenshot" — não acrescenta informação
- `alt` bom: descreve o que está sendo mostrado e por que importa naquele contexto
- **Código**: três imagens de `artigo.html` com `alt` bom vs. versão ruim comentada

#### Labels e formulários acessíveis
- Todo input precisa de um label visível e associado
- Mensagens de erro devem estar associadas ao input com `aria-describedby`
- `aria-required="true"` reforça o `required` para tecnologias assistivas
- Foco deve ser visível — nunca use `outline: none` sem alternativa
- **Código**: formulário de contato revisado com labels, aria e foco visível

#### Foco e navegação por teclado
- Toda funcionalidade deve ser acessível apenas com teclado (Tab, Enter, Espaço, setas)
- Tab percorre elementos focáveis; Shift+Tab volta
- Ordem de foco deve seguir a ordem visual — `tabindex` só quando necessário
- Elementos interativos: `<a>`, `<button>`, `<input>`, `<select>`, `<textarea>` já são focáveis nativamente
- **Código**: auditoria de `artigo.html` — testar com Tab puro sem mouse

#### Quando usar ARIA
- ARIA (Accessible Rich Internet Applications): atributos para casos que HTML não cobre
- ARIA não substitui HTML semântico — é complemento para casos específicos
- `aria-label`: nome acessível quando o texto visível não é suficiente
- `aria-describedby`: associa um texto de descrição a um elemento
- `role`: define o papel quando HTML nativo não tem o elemento certo
- Regra: primeiro HTML semântico, ARIA só quando o HTML não chega lá
- **Código**: botão de fechar modal (`×`) com `aria-label="Fechar"` + nav com `aria-label="Principal"`

---

## Lição 10: Resumo do módulo

### Seções (H2)

#### O arquivo `artigo.html` completo
- Revisitar o que foi construído lição a lição
- Mostrar o documento final — com estrutura semântica, formulário, imagens e links
- O que o navegador exibe sem CSS: feio mas funcional — estrutura clara
- **Código**: `artigo.html` completo e anotado

#### Checklist para qualquer página HTML
- `<!DOCTYPE html>`, `<html lang="pt-BR">`, `charset`, `viewport`, `title`, `description`
- Um único `<h1>`, hierarquia de cabeçalhos lógica
- Semântica: `<main>`, `<header>`, `<nav>`, `<footer>`, `<article>`, `<section>` onde cabem
- Toda imagem com `alt` descritivo ou `alt=""` se decorativa
- Todo input com `<label>` associado
- Navegação por teclado funcional
- **Código**: checklist como comentários HTML no documento

#### O que vem a seguir
- `artigo.html` funciona mas é texto puro com estilos padrão do navegador
- CSS vai dar cor, tipografia, layout e a identidade visual do blog
- Tudo que foi escrito aqui — ids, classes, estrutura semântica — vai ser usado pelo CSS
