# Copy Voice

Rules for all user-facing text on the site. Each rule includes the reason so you can judge edge cases.

## Core principle

The site is a **course index and learning material** — not a product page.
Every word must do one of two things:

- **Describe** a concept, module, or step accurately, OR
- **Navigate** the reader somewhere specific

If a sentence doesn't do one of those, cut it.

## Rules

### 1. No marketing negations

Phrases like "sem anúncios", "sem atalhos", "sem receita de bolo", "sem magia" are shortcuts to position the product against alternatives. Advertising absence is still marketing.

- ❌ "Código aberto, sem anúncios, sem newsletter"
- ✅ "Curso introdutório de desenvolvimento frontend, em português"

- ❌ "Texto, exemplos e código — sem atalhos"
- ✅ "Texto, exemplos e código passo a passo"

**Why:** the course's substance already proves these things; stating them sounds defensive and promotional.

### 2. No opinionated framing

Avoid adjectives and qualifiers that claim superiority or pass judgment:

- ❌ "do jeito certo" — implies other ways are wrong
- ❌ "que importam" — implies others don't
- ❌ "mapa honesto" — implies others are dishonest
- ❌ "que valem seu tempo" — subjective

Use neutral, descriptive language. Let opinion emerge from the content, not the label.

### 3. No conversion CTAs

The site doesn't sell anything. Buttons and links should be **directional** (go to this specific place), not **persuasive** (convince me to act).

- ✅ `começar pelo módulo 01` — concrete destination
- ✅ `conheça os módulos` — scroll anchor
- ✅ `próxima aula →` — sequential link
- ❌ "Comece agora!", "Transforme sua carreira!", "Não perca tempo!"

### 4. No redundancy

Every label, eyebrow, heading, and paragraph must add information the reader didn't already get from a nearby element. If two elements say the same thing, cut the weaker one.

Real example we hit: "oito módulos" appeared in hero eyebrow + hero subtitle + modules section eyebrow. Kept only in the subtitle (where it pairs with the structural explanation). Elsewhere it's either implied or replaced with something higher-value.

### 5. Specific over vague

If a word can be replaced with a more concrete one without losing meaning, do it.

- ❌ "requisições reais com fetch" — "reais" in contrast with what?
- ✅ "requisições HTTP com fetch"

- ❌ "em produção" (confusing for beginners)
- ✅ "na prática"

- ❌ "difícil de quebrar"
- ✅ "detectando erros antes mesmo de rodar o código"

### 6. Each eyebrow must earn its space

Eyebrows are small but occupy visual real estate above headings. Apply the test: **does this tell me something the title doesn't?**

- ❌ `curso · v1` above `Aprenda frontend` — "curso" is obvious; "v1" is jargon
- ✅ `/ índice` above `Um módulo de cada vez` — the `/ índice` signals "this is navigation metadata"

When an eyebrow can't earn its space, delete it rather than fill it.

## Tone

- **Editorial but technical** — italic serif + mono-spaced metadata say "we're serious about the craft"
- **Second-person implicit** — speak to a reader (not "users"), but don't overuse "você"
- **Calm and neutral** — no exclamation points, no hype, no hedging words (`muito`, `super`, `na verdade`)
- **Direct** — short sentences. Lead with the concept, not the setup.

## When in doubt

Ask the two-part test for every piece of text:

1. *Does this describe, or does it navigate?* (If neither, cut.)
2. *Would a reader lose information if I removed this?* (If no, cut.)
