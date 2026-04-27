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
      {
        slug: "intro",
        title: "Como a web funciona",
        href: "/how-the-web-works",
      },
    ],
  },
  {
    id: "html",
    name: "HTML",
    number: "02",
    label: "Estrutura",
    color: "var(--color-html)",
    rootHref: "/html",
    lessons: [{ slug: "intro", title: "HTML", href: "/html" }],
  },
  {
    id: "css",
    name: "CSS",
    number: "03",
    label: "Aparência",
    color: "var(--color-css)",
    rootHref: "/css",
    lessons: [{ slug: "intro", title: "CSS", href: "/css" }],
  },
  {
    id: "javascript",
    name: "JavaScript",
    number: "04",
    label: "Comportamento",
    color: "var(--color-js)",
    rootHref: "/javascript",
    lessons: [{ slug: "intro", title: "JavaScript", href: "/javascript" }],
  },
  {
    id: "typescript",
    name: "TypeScript",
    number: "05",
    label: "Tipos",
    color: "var(--color-ts)",
    rootHref: "/typescript",
    lessons: [{ slug: "intro", title: "TypeScript", href: "/typescript" }],
  },
  {
    id: "react",
    name: "React",
    number: "06",
    label: "Componentes",
    color: "var(--color-react)",
    rootHref: "/react",
    lessons: [{ slug: "intro", title: "React", href: "/react" }],
  },
  {
    id: "testing",
    name: "Testes",
    number: "07",
    label: "Qualidade",
    color: "var(--color-test)",
    rootHref: "/testing",
    lessons: [
      { slug: "intro", title: "Testes automatizados", href: "/testing" },
    ],
  },
  {
    id: "next-steps",
    name: "Próximos passos",
    number: "08",
    label: "Horizonte",
    color: "var(--color-next)",
    rootHref: "/next-steps",
    lessons: [{ slug: "intro", title: "Próximos passos", href: "/next-steps" }],
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
