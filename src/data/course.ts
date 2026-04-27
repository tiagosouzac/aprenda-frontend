export interface Lesson {
  slug: string;
  title: string;
  href: string;
}

export interface CourseModule {
  id: string;
  name: string;
  number: string;
  label: string;
  color: string;
  rootHref: string;
  lessons: Lesson[];
}

export const course: CourseModule[] = [
  {
    id: "web",
    name: "Web",
    number: "01",
    label: "Fundamentos",
    color: "var(--color-web)",
    rootHref: "/how-the-web-works",
    lessons: [
      { slug: "introducao", title: "Como a web funciona", href: "/how-the-web-works/introducao" },
      { slug: "dns", title: "DNS — do nome ao endereço", href: "/how-the-web-works/dns" },
      { slug: "http", title: "HTTP — pedido e resposta", href: "/how-the-web-works/http" },
      { slug: "https", title: "HTTPS — conversa criptografada", href: "/how-the-web-works/https" },
      { slug: "cliente-servidor", title: "Cliente e servidor", href: "/how-the-web-works/cliente-servidor" },
      { slug: "renderizacao", title: "Como o navegador renderiza", href: "/how-the-web-works/renderizacao" },
      { slug: "hospedagem", title: "Hospedagem e domínios", href: "/how-the-web-works/hospedagem" },
      { slug: "resumo", title: "Resumo do módulo", href: "/how-the-web-works/resumo" },
    ],
  },
  {
    id: "html",
    name: "HTML",
    number: "02",
    label: "Estrutura",
    color: "var(--color-html)",
    rootHref: "/html",
    lessons: [
      { slug: "introducao", title: "HTML em geral", href: "/html/introducao" },
      { slug: "anatomia-documento", title: "Anatomia de um documento", href: "/html/anatomia-documento" },
      { slug: "tags", title: "Tags, elementos e atributos", href: "/html/tags" },
      { slug: "texto", title: "Texto e conteúdo", href: "/html/texto" },
      { slug: "links", title: "Links", href: "/html/links" },
      { slug: "imagens-midia", title: "Imagens e mídia", href: "/html/imagens-midia" },
      { slug: "semantica", title: "HTML semântico", href: "/html/semantica" },
      { slug: "formularios", title: "Formulários", href: "/html/formularios" },
      { slug: "acessibilidade", title: "Acessibilidade básica", href: "/html/acessibilidade" },
      { slug: "resumo", title: "Resumo do módulo", href: "/html/resumo" },
    ],
  },
  {
    id: "css",
    name: "CSS",
    number: "03",
    label: "Aparência",
    color: "var(--color-css)",
    rootHref: "/css",
    lessons: [
      { slug: "introducao", title: "CSS em geral", href: "/css/introducao" },
      { slug: "seletores", title: "Seletores", href: "/css/seletores" },
      { slug: "cascata", title: "Especificidade e cascata", href: "/css/cascata" },
      { slug: "modelo-de-caixa", title: "Modelo de caixa", href: "/css/modelo-de-caixa" },
      { slug: "display-fluxo", title: "Display e fluxo", href: "/css/display-fluxo" },
      { slug: "posicionamento", title: "Posicionamento", href: "/css/posicionamento" },
      { slug: "flexbox", title: "Flexbox", href: "/css/flexbox" },
      { slug: "grid", title: "Grid", href: "/css/grid" },
      { slug: "tipografia-cores", title: "Tipografia e cores", href: "/css/tipografia-cores" },
      { slug: "responsivo", title: "Design responsivo", href: "/css/responsivo" },
      { slug: "variaveis", title: "Custom properties", href: "/css/variaveis" },
      { slug: "resumo", title: "Resumo do módulo", href: "/css/resumo" },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    number: "04",
    label: "Comportamento",
    color: "var(--color-js)",
    rootHref: "/javascript",
    lessons: [
      { slug: "introducao", title: "JavaScript em geral", href: "/javascript/introducao" },
      { slug: "executando", title: "Como rodar JavaScript", href: "/javascript/executando" },
      { slug: "variaveis-tipos", title: "Variáveis e tipos", href: "/javascript/variaveis-tipos" },
      { slug: "operadores", title: "Operadores e expressões", href: "/javascript/operadores" },
      { slug: "controle-fluxo", title: "Controle de fluxo", href: "/javascript/controle-fluxo" },
      { slug: "funcoes", title: "Funções", href: "/javascript/funcoes" },
      { slug: "arrays", title: "Arrays", href: "/javascript/arrays" },
      { slug: "objetos", title: "Objetos", href: "/javascript/objetos" },
      { slug: "strings", title: "Strings", href: "/javascript/strings" },
      { slug: "dom-selecao", title: "DOM — selecionando elementos", href: "/javascript/dom-selecao" },
      { slug: "dom-manipulacao", title: "DOM — manipulando elementos", href: "/javascript/dom-manipulacao" },
      { slug: "eventos", title: "Eventos", href: "/javascript/eventos" },
      { slug: "promises", title: "Assíncrono — promises", href: "/javascript/promises" },
      { slug: "async-await", title: "Assíncrono — async/await", href: "/javascript/async-await" },
      { slug: "fetch", title: "Fetch — falando com servidores", href: "/javascript/fetch" },
      { slug: "modulos", title: "Módulos", href: "/javascript/modulos" },
      { slug: "resumo", title: "Resumo do módulo", href: "/javascript/resumo" },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    number: "05",
    label: "Tipos",
    color: "var(--color-ts)",
    rootHref: "/typescript",
    lessons: [
      { slug: "introducao", title: "TypeScript em geral", href: "/typescript/introducao" },
      { slug: "configuracao", title: "Configurando TypeScript", href: "/typescript/configuracao" },
      { slug: "tipos-basicos", title: "Tipos básicos", href: "/typescript/tipos-basicos" },
      { slug: "inferencia", title: "Anotações e inferência", href: "/typescript/inferencia" },
      { slug: "funcoes", title: "Funções tipadas", href: "/typescript/funcoes" },
      { slug: "interfaces-tipos", title: "Interfaces e type aliases", href: "/typescript/interfaces-tipos" },
      { slug: "unioes-intersecoes", title: "Union e intersection types", href: "/typescript/unioes-intersecoes" },
      { slug: "generics", title: "Generics", href: "/typescript/generics" },
      { slug: "tipos-utilitarios", title: "Tipos utilitários", href: "/typescript/tipos-utilitarios" },
      { slug: "tipos-avancados", title: "Tipos avançados", href: "/typescript/tipos-avancados" },
      { slug: "projetos-reais", title: "TypeScript em projetos reais", href: "/typescript/projetos-reais" },
      { slug: "resumo", title: "Resumo do módulo", href: "/typescript/resumo" },
    ],
  },
  {
    id: "react",
    name: "React",
    number: "06",
    label: "Componentes",
    color: "var(--color-react)",
    rootHref: "/react",
    lessons: [
      { slug: "introducao", title: "React em geral", href: "/react/introducao" },
      { slug: "configuracao", title: "Configurando um projeto React", href: "/react/configuracao" },
      { slug: "jsx", title: "JSX", href: "/react/jsx" },
      { slug: "componentes", title: "Componentes", href: "/react/componentes" },
      { slug: "props", title: "Props", href: "/react/props" },
      { slug: "tipando-props", title: "Tipando props com TypeScript", href: "/react/tipando-props" },
      { slug: "estado", title: "Estado com useState", href: "/react/estado" },
      { slug: "condicional-listas", title: "Renderização condicional e listas", href: "/react/condicional-listas" },
      { slug: "eventos", title: "Eventos em React", href: "/react/eventos" },
      { slug: "efeitos", title: "Efeitos com useEffect", href: "/react/efeitos" },
      { slug: "compartilhando-estado", title: "Compartilhando estado entre componentes", href: "/react/compartilhando-estado" },
      { slug: "context", title: "Context API", href: "/react/context" },
      { slug: "buscando-dados", title: "Buscando dados", href: "/react/buscando-dados" },
      { slug: "exemplo-pratico", title: "Construindo um componente prático", href: "/react/exemplo-pratico" },
      { slug: "resumo", title: "Resumo do módulo", href: "/react/resumo" },
    ],
  },
  {
    id: "testing",
    name: "Testes",
    number: "07",
    label: "Qualidade",
    color: "var(--color-test)",
    rootHref: "/testing",
    lessons: [
      { slug: "introducao", title: "Por que escrever testes", href: "/testing/introducao" },
      { slug: "tipos-de-teste", title: "Tipos de teste", href: "/testing/tipos-de-teste" },
      { slug: "vitest", title: "Vitest — primeiros testes", href: "/testing/vitest" },
      { slug: "estrutura", title: "Estruturando testes", href: "/testing/estrutura" },
      { slug: "funcoes-puras", title: "Testando funções puras", href: "/testing/funcoes-puras" },
      { slug: "mocks", title: "Mocks e stubs", href: "/testing/mocks" },
      { slug: "testing-library", title: "Testando componentes React com Testing Library", href: "/testing/testing-library" },
      { slug: "integracao", title: "Testes de integração", href: "/testing/integracao" },
      { slug: "playwright", title: "End-to-end com Playwright", href: "/testing/playwright" },
      { slug: "o-que-testar", title: "O que testar e o que não testar", href: "/testing/o-que-testar" },
      { slug: "resumo", title: "Resumo do módulo", href: "/testing/resumo" },
    ],
  },
  {
    id: "next-steps",
    name: "Próximos passos",
    number: "08",
    label: "Horizonte",
    color: "var(--color-next)",
    rootHref: "/next-steps",
    lessons: [
      { slug: "introducao", title: "Recapitulando", href: "/next-steps/introducao" },
      { slug: "frameworks", title: "Frameworks frontend", href: "/next-steps/frameworks" },
      { slug: "outras-bibliotecas", title: "Outras bibliotecas de UI", href: "/next-steps/outras-bibliotecas" },
      { slug: "estilizacao-avancada", title: "Estilização avançada", href: "/next-steps/estilizacao-avancada" },
      { slug: "backend", title: "Backend para devs frontend", href: "/next-steps/backend" },
      { slug: "ferramentas-de-build", title: "Ferramentas de build", href: "/next-steps/ferramentas-de-build" },
      { slug: "lint-formatacao", title: "Linting, formatação e tipagem estrita", href: "/next-steps/lint-formatacao" },
      { slug: "deploy", title: "CI/CD e deploy", href: "/next-steps/deploy" },
      { slug: "performance", title: "Performance", href: "/next-steps/performance" },
      { slug: "recursos", title: "Onde aprender mais", href: "/next-steps/recursos" },
      { slug: "carreira", title: "Caminhos de carreira", href: "/next-steps/carreira" },
    ],
  },
];

export function findLesson(href: string): Lesson | undefined {
  return course.flatMap((m) => m.lessons).find((l) => l.href === href);
}

export function findLessonModule(href: string): CourseModule | undefined {
  return course.find((m) => m.lessons.some((l) => l.href === href));
}

export interface AdjacentLesson {
  lesson: Lesson;
  module: CourseModule;
}

export function findAdjacentLessons(href: string): {
  prev?: AdjacentLesson;
  next?: AdjacentLesson;
} {
  const flat: AdjacentLesson[] = [];
  for (const m of course) {
    for (const l of m.lessons) {
      flat.push({ lesson: l, module: m });
    }
  }
  const idx = flat.findIndex((x) => x.lesson.href === href);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? flat[idx - 1] : undefined,
    next: idx < flat.length - 1 ? flat[idx + 1] : undefined,
  };
}
