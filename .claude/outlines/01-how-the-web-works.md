# Outline — Módulo 01: Como a web funciona

**Fio condutor**: O blog `artigo.dev` é o exemplo concreto de cada conceito. "Quando você digita artigo.dev e pressiona Enter..." — o módulo não constrói nada, só constrói o modelo mental que os próximos módulos pressupõem.

---

## Lição 1: Como a web funciona

### Seções (H2)

#### O caminho de uma URL
- O que acontece nos segundos entre pressionar Enter e ver a página
- Os personagens: navegador, DNS, servidor, HTML/CSS/JS
- A sequência completa em ordem: DNS → TCP → TLS → HTTP request → HTTP response → parsing → rendering
- Por que entender esse caminho muda como você vai escrever código
- **Código**: diagrama ASCII da sequência + curl mostrando headers reais de uma requisição

#### DNS — do nome ao endereço
- Computadores usam IPs; pessoas usam nomes — o DNS é a ponte
- O que acontece nos bastidores quando o navegador precisa de um IP
- Resolver, hierarquia, cache — em alto nível (detalhes na lição 2)
- **Código**: `dig artigo.dev +short` — mostrar que resolve para um IP

#### HTTP — a conversa
- O protocolo que define como cliente e servidor se comunicam
- Requisição tem método, caminho e headers; resposta tem status, headers e corpo
- 200 significa sucesso; 404 significa não encontrado — e por que importa
- **Código**: requisição HTTP bruta (GET /) e resposta com status 200 e HTML

#### Como o navegador monta a página
- O HTML recebido é texto — o navegador precisa interpretar e renderizar
- A sequência: parse HTML → DOM, parse CSS → CSSOM, render tree, layout, paint
- Por que JS pode bloquear a renderização e o que defer resolve
- **Código**: diagrama ASCII do pipeline de renderização

#### Cliente vs. servidor — a fronteira
- Cliente é quem pede (navegador); servidor é quem responde
- O que roda no navegador (HTML, CSS, JS) vs. o que roda no servidor
- Essa divisão aparece em todo o curso — estabelecer o vocabulário aqui
- **Código**: nenhum — explicação com diagrama

---

## Lição 2: DNS — do nome ao endereço

### Seções (H2)

#### O que é um endereço IP
- Todo dispositivo na internet tem um endereço numérico único
- IPv4 (quatro octetos separados por ponto) vs. IPv6 (hexadecimal)
- Por que IPv6 existe: esgotamento de endereços IPv4
- **Código**: exemplos de IPv4 e IPv6 — sem lógica, só ilustração

#### A hierarquia do DNS
- DNS não é um servidor único — é um sistema distribuído em três camadas
- Root servers → servidores de TLD (`.com`, `.br`) → servidor autoritativo do domínio
- Cada camada conhece apenas o próximo passo — por que é assim (escala)
- **Código**: diagrama ASCII da hierarquia com o caminho de `artigo.dev`

#### O resolver e o processo de resolução
- O resolver é o intermediário entre seu computador e a hierarquia
- Passo a passo: computador → resolver → root → TLD → autoritativo → resposta
- Esse caminho inteiro acontece em dezenas de milissegundos
- **Código**: diagrama ASCII do fluxo de consulta passo a passo

#### Cache e TTL
- Se a hierarquia fosse consultada sempre, a internet seria lenta
- TTL (Time To Live): prazo de validade de uma resposta DNS
- Camadas de cache: navegador → sistema operacional → resolver → servidores intermediários
- O custo do cache: mudança de IP pode demorar a propagar
- **Código**: output de `dig artigo.dev` mostrando TTL e resposta em cache

#### Registros DNS
- Um domínio tem múltiplos registros para fins diferentes
- A (IPv4), AAAA (IPv6), CNAME (alias), MX (email), TXT (verificações), NS (quem gerencia)
- Quando você compra um domínio, ganha o direito de gerenciar esses registros
- **Código**: tabela de registros + exemplo de zona DNS real em formato de texto

---

## Lição 3: HTTP — pedido e resposta

### Seções (H2)

#### O que é HTTP e o modelo requisição-resposta
- HTTP define o formato das mensagens trocadas entre cliente e servidor
- Stateless: cada requisição é independente — o servidor não lembra de você
- Por que stateless existe e como sessões e cookies compensam isso
- **Código**: requisição GET ao artigo do blog e resposta com HTML

#### Métodos HTTP
- O método indica a intenção — o que você quer fazer com o recurso
- GET (ler), POST (criar), PUT (substituir), PATCH (atualizar parcialmente), DELETE (remover)
- GET é idempotente: fazer duas vezes tem o mesmo efeito que fazer uma
- POST não é: enviar um formulário duas vezes pode criar dois registros
- **Código**: exemplos de GET (buscar artigo), POST (enviar comentário), DELETE (remover rascunho)

#### Headers HTTP
- Headers carregam metadados sobre a requisição ou resposta
- Requisição: `Host`, `User-Agent`, `Accept`, `Authorization`, `Content-Type`
- Resposta: `Content-Type`, `Cache-Control`, `Set-Cookie`, `Location`
- **Código**: requisição com headers comentados + resposta com headers comentados

#### Códigos de status
- Três dígitos que resumem o que aconteceu
- 2xx sucesso: 200 OK, 201 Created, 204 No Content
- 3xx redirecionamento: 301 Moved Permanently, 302 Found, 304 Not Modified
- 4xx erro do cliente: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
- 5xx erro do servidor: 500 Internal Server Error, 503 Service Unavailable
- **Código**: tabela dos mais comuns + onde vê-los (aba Network do devtools)

#### Inspecionando requisições no devtools
- Toda requisição feita pelo navegador aparece na aba Network
- Onde ver: método, URL, status, headers, tempo, tamanho
- Como filtrar por tipo (XHR/Fetch, JS, CSS, Img)
- **Código**: screenshot descrito em texto + exemplo de request/response de API pública

---

## Lição 4: HTTPS — conversa criptografada

### Seções (H2)

#### O que muda com o S
- HTTP transmite dados em texto puro — qualquer roteador no caminho pode ler
- HTTPS criptografa a transmissão — mesmo interceptado, o conteúdo é ilegível
- O cadeado na barra de endereço confirma que a conexão é criptografada
- **Código**: diagrama HTTP (plaintext) vs. HTTPS (ciphertext)

#### TLS em alto nível
- TLS (Transport Layer Security) é o protocolo de criptografia sob o HTTP
- Handshake: cliente e servidor negociam algoritmo e trocam chaves
- Depois do handshake, toda comunicação é criptografada com uma chave de sessão
- Simplificado intencionalmente — o objetivo é o modelo mental, não a criptografia
- **Código**: diagrama simplificado do handshake TLS (3 etapas)

#### Certificados e autoridades certificadoras
- Um certificado é um documento digital assinado que prova a identidade do servidor
- Autoridades Certificadoras (CAs) emitem e assinam certificados — são âncoras de confiança
- Cadeia de confiança: seu sistema operacional confia em algumas CAs; essas CAs assinam os certificados dos sites
- Let's Encrypt tornou certificados gratuitos e automáticos — por que HTTPS está em todo lugar
- **Código**: output de `openssl s_client -connect artigo.dev:443` mostrando o certificado

#### O que HTTPS protege e o que não protege
- Protege: dados em trânsito entre cliente e servidor (senhas, formulários, tokens)
- Não protege: o servidor em si de invasões, dados depois de chegar ao servidor
- Não protege: o fato de que você está acessando o domínio (visível no DNS e SNI)
- HTTPS é necessário mas não suficiente para segurança
- **Código**: nenhum — lista comparativa clara

---

## Lição 5: Cliente e servidor

### Seções (H2)

#### O que é cliente, o que é servidor
- Cliente: quem inicia a conversa, quem faz a requisição
- Servidor: quem escuta, quem responde com um recurso
- Na web, o cliente é quase sempre o navegador
- Um servidor pode ser cliente de outro servidor (APIs que consomem APIs)
- **Código**: diagrama de duas máquinas com seta de requisição e resposta

#### O que roda no cliente
- HTML, CSS e JavaScript baixados pelo navegador rodam na máquina do usuário
- O navegador é o ambiente de execução — cada aba é isolada
- Dados do usuário acessíveis: localStorage, cookies, tela, câmera, geolocalização
- O que não é possível: acessar arquivos do sistema, rodar código no servidor
- **Código**: `typeof window` no navegador vs. no Node — `window` só existe no cliente

#### O que roda no servidor
- Uma máquina acessível pela internet, esperando requisições HTTP
- Qualquer linguagem que consiga responder HTTP: Node.js, Python, Go, Ruby, PHP
- Acesso a banco de dados, sistema de arquivos, variáveis de ambiente, segredos
- O código-fonte nunca chega ao cliente — só a resposta
- **Código**: servidor Node.js mínimo que responde "Olá" a qualquer requisição

#### A fronteira: a requisição HTTP
- A única forma de cliente e servidor se comunicarem é via HTTP
- Dados sensíveis ficam no servidor; o cliente recebe apenas o necessário
- APIs REST, GraphQL, WebSockets — todas variações do mesmo modelo
- O curso inteiro vive no cliente; o servidor é o outro lado da requisição fetch
- **Código**: diagrama mostrando onde cada tecnologia do curso vive

---

## Lição 6: Como o navegador renderiza

### Seções (H2)

#### Do HTML ao DOM
- O navegador recebe HTML como texto — precisa transformar em estrutura
- Parser lê de cima para baixo, cria nós para cada elemento
- DOM (Document Object Model): árvore em memória que representa o documento
- O DOM é dinâmico — JavaScript pode modificá-lo; o navegador reflete as mudanças
- **Código**: HTML simples + representação da árvore DOM equivalente

#### Do CSS ao CSSOM
- CSS também é texto; o navegador precisa parsear e organizar as regras
- CSSOM (CSS Object Model): estrutura análoga ao DOM para estilos
- CSS bloqueia renderização — o navegador não pinta nada antes de ter o CSSOM
- Por isso `<link rel="stylesheet">` vai no `<head>`, não no final do body
- **Código**: regras CSS simples + ilustração de como o CSSOM organiza as regras

#### Render tree, layout e paint
- Render tree: DOM + CSSOM combinados, contendo apenas elementos visíveis
- Elementos com `display: none` não entram na render tree
- Layout (reflow): calcular posição e tamanho de cada elemento na tela
- Paint: converter layout em pixels, camada por camada
- **Código**: diagrama das cinco etapas — DOM → CSSOM → Render tree → Layout → Paint

#### Onde JavaScript entra no pipeline
- Scripts bloqueiam o parser — o navegador para de ler HTML até o script terminar
- `defer`: baixa em paralelo, executa depois que o HTML foi todo parseado
- `async`: baixa em paralelo, executa assim que termina (ordem não garantida)
- Modificar DOM com JS pode causar reflow — por que certas operações são caras
- **Código**: três versões de `<script>`: sem atributo, defer, async — com diagrama de timeline

---

## Lição 7: Hospedagem e domínios

### Seções (H2)

#### O que é hospedagem web
- Hospedagem é o serviço que mantém os arquivos do site acessíveis 24h
- Estática: serve arquivos prontos (HTML, CSS, JS, imagens) — simples e barato
- Dinâmica: servidor processa requisições e gera respostas em tempo real
- CDN (Content Delivery Network): cópias dos arquivos em servidores no mundo todo
- **Código**: diagrama de usuário → CDN node → origem

#### Domínios e registradores
- Um domínio é o "endereço nominal" que aponta para um servidor
- Registradores: empresas que vendem o direito de uso de um domínio (Namecheap, Cloudflare)
- TLDs: `.com`, `.io`, `.dev`, `.com.br` — diferenças e quando escolher cada um
- Diferença entre registrar o domínio e configurar o DNS — são serviços separados
- **Código**: nenhum — tabela comparativa de TLDs e custos típicos

#### Apontar um domínio para um servidor
- Registro A: domínio → IP do servidor
- Registro CNAME: `www` → domínio raiz (ou serviço de hosting)
- Propagação de DNS: mudanças levam minutos a horas para se espalharem globalmente
- **Código**: exemplo de zona DNS configurando `artigo.dev` para um servidor

#### Hospedagem moderna para frontend
- Vercel, Netlify, Cloudflare Pages: deploy automático a partir de um repositório Git
- Push para main → build automático → site atualizado
- Previews por branch: cada PR ganha uma URL temporária
- Por que esse modelo substituiu FTP para a maioria dos projetos frontend
- **Código**: arquivo `vercel.json` mínimo + `netlify.toml` mínimo

---

## Lição 8: Resumo do módulo

### Seções (H2)

#### O caminho completo, revisitado
- Reconstruir a timeline de `artigo.dev` de ponta a ponta com o vocabulário acumulado
- Cada etapa agora tem nome, papel e link para a lição correspondente
- **Código**: diagrama completo anotado com termos do módulo

#### Vocabulário essencial
- Glossário rápido: DNS, IP, TCP, TLS, HTTP, HTTPS, cliente, servidor, DOM, CDN
- Cada termo em uma linha — referência para os próximos módulos
- **Código**: nenhum

#### O que esperar dos próximos módulos
- HTML: construir a estrutura de `artigo.html`
- CSS: estilizar com `estilos.css`
- JavaScript: adicionar comportamento com `script.js`
- A sequência de módulos replica o que o navegador faz: estrutura → estilo → comportamento
- **Código**: nenhum
