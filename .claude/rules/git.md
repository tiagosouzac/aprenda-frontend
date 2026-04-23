# Git Conventions

## Commit messages

Format: `<type>(<scope>): <short description in English>`

Types:
- `feat` — new page or major new content section
- `fix` — correction to content, code example, or bug in site behavior
- `refactor` — restructuring without content change
- `style` — CSS or visual changes
- `chore` — tooling, config, dependencies

Scope is the route or component affected: `html`, `css`, `react`, `nav`, `layout`, `home`

Examples:
```
feat(html): add semantic elements section
fix(javascript): correct async/await code example
style(layout): improve mobile nav spacing
chore: upgrade astro to v6.3
```

## Branches

- `main` — always deployable
- Feature branches: `feat/<scope>-<short-description>` (e.g., `feat/react-hooks-section`)
- Fix branches: `fix/<scope>-<short-description>`

## Scope of commits

- One logical change per commit — do not bundle a new page with unrelated CSS fixes
- Content changes (new lesson text) and structural changes (new component) in separate commits
