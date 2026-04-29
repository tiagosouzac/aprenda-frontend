export interface ModuleCard {
  title: string;
  description: string;
  visualBg: string;
  visualInk: string;
}

export interface CourseModuleMeta {
  slug: string;
  name: string;
  number: string;
  label: string;
  color: string;
  firstLessonSlug: string;
  card: ModuleCard;
}

export const modules: CourseModuleMeta[] = [
  {
    slug: "how-the-web-works",
    name: "Web",
    number: "01",
    label: "Fundamentos",
    color: "var(--color-web)",
    firstLessonSlug: "introducao",
    card: {
      title: "Como a web realmente funciona",
      description:
        "O que acontece entre digitar uma URL e ver a página carregar. DNS, HTTP, headers, status codes e o pipeline de renderização do navegador.",
      visualBg: "linear-gradient(135deg,#1a2550 0%,#2a3a7a 55%,#4c6ef5 100%)",
      visualInk: "#e6ecff",
    },
  },
  {
    slug: "html",
    name: "HTML",
    number: "02",
    label: "Estrutura",
    color: "var(--color-html)",
    firstLessonSlug: "introducao",
    card: {
      title: "HTML como fundação semântica",
      description:
        "Estrutura de documentos, elementos semânticos, formulários e acessibilidade. A camada que define o que o conteúdo é — antes de qualquer estilo.",
      visualBg: "linear-gradient(140deg,#c53e1d 0%,#e4572e 60%,#ff8a5c 100%)",
      visualInk: "#fff3ec",
    },
  },
  {
    slug: "css",
    name: "CSS",
    number: "03",
    label: "Aparência",
    color: "var(--color-css)",
    firstLessonSlug: "introducao",
    card: {
      title: "CSS, do box model ao Grid",
      description:
        "Seletores, especificidade, fluxo, flexbox, grid e design responsivo. Como o navegador decide onde cada pixel aparece na tela.",
      visualBg: "linear-gradient(120deg,#1e3a8a 0%,#2563eb 50%,#ec4899 100%)",
      visualInk: "#eef3ff",
    },
  },
  {
    slug: "javascript",
    name: "JavaScript",
    number: "04",
    label: "Comportamento",
    color: "var(--color-js)",
    firstLessonSlug: "introducao",
    card: {
      title: "JavaScript, a linguagem da web",
      description:
        "Variáveis, funções, DOM, eventos e async/await. Do console do navegador até requisições HTTP com fetch.",
      visualBg: "linear-gradient(145deg,#b89f1e 0%,#e8c72a 45%,#f7e27a 100%)",
      visualInk: "#1a1600",
    },
  },
  {
    slug: "typescript",
    name: "TypeScript",
    number: "05",
    label: "Tipos",
    color: "var(--color-ts)",
    firstLessonSlug: "introducao",
    card: {
      title: "TypeScript na prática",
      description:
        "Por que tipos importam. Interfaces, type aliases, genéricos e o modo strict — detectando erros antes mesmo de rodar o código.",
      visualBg: "linear-gradient(150deg,#14306b 0%,#2a52be 55%,#6b9dff 100%)",
      visualInk: "#e6efff",
    },
  },
  {
    slug: "react",
    name: "React",
    number: "06",
    label: "Componentes",
    color: "var(--color-react)",
    firstLessonSlug: "introducao",
    card: {
      title: "React com TypeScript",
      description:
        "JSX, componentes de função, props tipadas, estado com useState e efeitos com useEffect. Construindo uma app pequena do início ao fim.",
      visualBg: "linear-gradient(135deg,#0b4a5a 0%,#0ea5c7 55%,#61dafb 100%)",
      visualInk: "#e6fbff",
    },
  },
  {
    slug: "testing",
    name: "Testes",
    number: "07",
    label: "Qualidade",
    color: "var(--color-test)",
    firstLessonSlug: "introducao",
    card: {
      title: "Testes automatizados",
      description:
        "Por que testes existem, o que realmente vale testar e como escrever testes com Vitest, Testing Library e uma pitada de Playwright.",
      visualBg: "linear-gradient(135deg,#0f3d22 0%,#16a34a 55%,#86efac 100%)",
      visualInk: "#e8ffef",
    },
  },
  {
    slug: "next-steps",
    name: "Próximos passos",
    number: "08",
    label: "Horizonte",
    color: "var(--color-next)",
    firstLessonSlug: "introducao",
    card: {
      title: "Próximos passos no frontend",
      description:
        "Um recap do que foi coberto e um panorama do que vem depois: frameworks, full-stack, ferramentas e comunidades para continuar aprendendo.",
      visualBg: "linear-gradient(130deg,#2e0a5c 0%,#7c3aed 50%,#f472b6 100%)",
      visualInk: "#f8ecff",
    },
  },
];

export function rootHref(slug: string): string {
  return `/${slug}`;
}

export function findModule(slug: string): CourseModuleMeta | undefined {
  return modules.find((m) => m.slug === slug);
}

export const moduleRedirects: Record<string, string> = Object.fromEntries(
  modules.map((m) => [`/${m.slug}`, `/${m.slug}/${m.firstLessonSlug}`]),
);
