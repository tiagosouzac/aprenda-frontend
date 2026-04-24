# Design System

Design tokens, utility classes, and visual patterns established on the homepage.
All lesson pages should inherit these to stay cohesive.

## Fonts

Loaded via Google Fonts in `src/layouts/Layout.astro`.

| Role | Family | How to use |
|---|---|---|
| Display / body | Bricolage Grotesque | `.font-display` or `var(--font-sans)` — titles, paragraphs |
| Editorial italic | Instrument Serif | `.eyebrow` or `var(--font-serif)` — eyebrow labels, accent words in titles |
| Mono | JetBrains Mono | `.mono` or `var(--font-mono)` — code, metadata labels, numeric markers |

Never swap in Inter, Roboto, or system fonts — the trio above is the identity.

## Color tokens

Defined in `@theme` inside `src/styles/global.css`.

### Base palette

- `--color-canvas` — light background (#ffffff)
- `--color-ink` — primary text (#0a0a0b)
- `--color-night` / `--color-night-2` / `--color-night-3` — dark section backgrounds
- `--color-bone` — warm light neutral (#f4f2ed)
- `--color-mute` — secondary text on light (#6b6b72)
- `--color-line` / `--color-line-dark` — borders on light / dark

### Module accent colors

Each lesson page should use its module's canonical color for hero accents (eyebrow dot, small markers, links). **Do not invent new colors per page** — pick the one that matches the route.

| Route | Token | Hex |
|---|---|---|
| `/how-the-web-works` | `--color-web` | #4c6ef5 |
| `/html` | `--color-html` | #e4572e |
| `/css` | `--color-css` | #2563eb |
| `/javascript` | `--color-js` | #f0db4f |
| `/typescript` | `--color-ts` | #3178c6 |
| `/react` | `--color-react` | #61dafb |
| `/testing` | `--color-test` | #22c55e |
| `/next-steps` | `--color-next` | #c084fc |

## Utility classes

Defined in `src/styles/global.css`.

- `.font-display` — Bricolage Grotesque with `opsz` 96 and tight letter-spacing; use on large titles
- `.eyebrow` — Instrument Serif italic; use on small editorial labels above titles
- `.mono` — JetBrains Mono with stylistic sets enabled; use on code-like metadata
- `.grid-lines` — subtle white grid background; use on dark sections as decoration
- `.grid-lines-light` — subtle black grid background; use on light sections
- `.noise` — film-grain overlay (place inside a `relative` parent with `absolute inset-0`)
- `.rise` + `.rise-1` … `.rise-5` — staggered entrance fade-up; apply to 3–5 items of an above-the-fold stack to reveal them sequentially on load

## Visual patterns

### Eyebrow

Three pieces joined by a short divider line. Sits above every major title.

```astro
<div class="flex items-center gap-3 mb-8">
  <span class="mono text-[11px] tracking-[0.18em] uppercase text-white/50">/ rótulo</span>
  <span class="h-px w-10 bg-white/20"></span>
  <span class="eyebrow text-white/70 text-[15px]">subtítulo editorial</span>
</div>
```

On light sections, swap `white/X` for `text-mute`, `bg-line`, `text-ink`.
**Each eyebrow must earn its space** — see `copy-voice.md`.

### Display title with serif accent

One word in italic serif breaks the sans block and gives the title character.

```astro
<h1
  class="font-display text-[clamp(3rem,9.2vw,8.5rem)] leading-[0.92] font-medium tracking-[-0.04em]"
  style="font-variation-settings: 'opsz' 96, 'wdth' 100;"
>
  Aprenda
  <span class="font-serif italic font-normal" style="font-family: var(--font-serif);">frontend</span>,
  do começo ao React.
</h1>
```

Put the serif accent on the most editorial word (category, domain, verb) — never on a technical term like `HTML` or `React`.

### Mono chips

Small capsules for status, count, metadata. Live over any background with a subtle ring + backdrop-blur.

```astro
<span class="rounded-md bg-black/30 backdrop-blur px-2 py-1 mono text-[10.5px] text-white/85 ring-1 ring-white/15">
  status: descritivo
</span>
```

### Dark ↔ light section rhythm

The home alternates: light (Hero) → dark (Modules) → light (StartCTA) → dark (Footer). Lesson pages don't need the full alternation, but **hero is light and any "call-to-action / closing" band should be light too**, creating a visual frame around the darker reading content if the lesson uses a dark reading area.

### Animations

- **Entrance**: use `.rise` with numbered delays (`.rise-1` through `.rise-5`) on the top of the page — max 5 staggered items
- **Thematic illustrations**: prefer loop animations that narrate what the module teaches (see homepage module visuals). Avoid purely decorative motion
- **Micro-interactions**: underline swap on hover, translate-x on arrow icons, scale on pill buttons

## Lesson reading prose

`.lesson-prose` is the typographic container for body copy on lesson pages, defined in `src/styles/global.css`. It styles:

- Body paragraphs (max-width 62ch, line-height 1.72)
- Ordered lists with mono `01 02 …` markers (decimal-leading-zero)
- Unordered lists with `◦` bullet
- Inline `<code>` with subtle gray background
- `<em>` rendered in Instrument Serif italic
- Links with a soft underline that darkens on hover
- `<h3>` in display font, smaller than the section `<h2>`

`LessonSection` already wraps its slot in `.lesson-prose`. Apply it manually only on the introduction block above the first `LessonSection`.

## Lesson page composition (3-column)

Lesson pages render in three columns at xl+ (1280px+):

| Column | Width | Content |
|---|---|---|
| Left | 220px | `Sidebar.astro` — full course tree from `course.ts`, sticky, current module/lesson highlighted |
| Center | up to 720px | `Breadcrumb`, hero, lesson body, `LessonNav` (prev/next) |
| Right | 200px | `Toc.astro` — h2 titles of current page, sticky, scroll-spy |

- At lg (1024–1279px), the TOC column drops; sidebar + content remain
- Below lg, both side columns are hidden; content takes full width with prose maxing at 62ch

`LessonLayout.astro` orchestrates this — pages don't deal with the grid directly.

## Where the rules live

- Tokens, keyframes, utility classes (`.font-display`, `.eyebrow`, `.mono`, `.lesson-prose`, etc.): `src/styles/global.css`
- Course structure (modules + lessons): `src/data/course.ts`
- Site shell (nav, footer): `src/layouts/Layout.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`
- Lesson chrome: `src/layouts/LessonLayout.astro`, `src/components/Sidebar.astro`, `src/components/Toc.astro`, `src/components/Breadcrumb.astro`, `src/components/LessonNav.astro`, `src/components/LessonSection.astro`, `src/components/CodeBlock.astro`
- Homepage sections (reference implementations of the visual language): `src/components/Hero.astro`, `src/components/ModulesSection.astro`, `src/components/StartCTA.astro`
