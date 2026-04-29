import { getCollection, type CollectionEntry } from "astro:content";
import { modules, type CourseModuleMeta } from "./modules";

export interface LessonHero {
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  href: string;
  order: number;
  hero?: LessonHero;
  quiz?: QuizQuestion[];
  comingSoon?: boolean;
  entry: CollectionEntry<"lessons">;
}

export interface CourseModule extends CourseModuleMeta {
  rootHref: string;
  lessons: Lesson[];
}

export interface AdjacentLesson {
  lesson: Lesson;
  module: CourseModule;
}

function parseEntryId(id: string): { moduleSlug: string; lessonSlug: string; filenameOrder: number | null } {
  const parts = id.split("/");
  const moduleSlug = parts[0];
  const filename = parts[parts.length - 1];
  const match = filename.match(/^(\d+)-(.+)$/);
  if (match) {
    return { moduleSlug, lessonSlug: match[2], filenameOrder: Number(match[1]) };
  }
  return { moduleSlug, lessonSlug: filename, filenameOrder: null };
}

function entryToLesson(entry: CollectionEntry<"lessons">, moduleSlug: string): Lesson {
  const { lessonSlug, filenameOrder } = parseEntryId(entry.id);
  const order = entry.data.order ?? filenameOrder ?? 999;
  return {
    slug: lessonSlug,
    title: entry.data.title,
    description: entry.data.description,
    href: `/${moduleSlug}/${lessonSlug}`,
    order,
    hero: entry.data.hero,
    quiz: entry.data.quiz,
    comingSoon: entry.data.comingSoon,
    entry,
  };
}

let cached: CourseModule[] | null = null;

export async function getCourseModules(): Promise<CourseModule[]> {
  if (cached) return cached;
  const entries = await getCollection("lessons");
  const byModule = new Map<string, Lesson[]>();
  for (const entry of entries) {
    const { moduleSlug } = parseEntryId(entry.id);
    const lesson = entryToLesson(entry, moduleSlug);
    const list = byModule.get(moduleSlug) ?? [];
    list.push(lesson);
    byModule.set(moduleSlug, list);
  }
  cached = modules.map((meta) => {
    const lessons = (byModule.get(meta.slug) ?? []).sort((a, b) => a.order - b.order);
    return { ...meta, rootHref: `/${meta.slug}`, lessons };
  });
  return cached;
}

export async function findLesson(href: string): Promise<Lesson | undefined> {
  const course = await getCourseModules();
  for (const m of course) {
    const found = m.lessons.find((l) => l.href === href);
    if (found) return found;
  }
  return undefined;
}

export async function findLessonModule(href: string): Promise<CourseModule | undefined> {
  const course = await getCourseModules();
  return course.find((m) => m.lessons.some((l) => l.href === href));
}

export async function findAdjacentLessons(
  href: string,
): Promise<{ prev?: AdjacentLesson; next?: AdjacentLesson }> {
  const course = await getCourseModules();
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
