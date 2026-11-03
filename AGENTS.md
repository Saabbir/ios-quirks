# AGENTS.md — iOS Quirks Design System & AI Rules

This file is the single source of truth for design tokens, component APIs, and content rules.
AI tools (Claude, Copilot, Cursor, etc.) must read this file before making any changes to this project.

---

## Core Rules

1. **Never add a new CSS custom property** without first checking if an existing token covers the need.
2. **Never use a raw hex colour** in component or page styles — always reference a token (e.g. `var(--accent)`, not `#0A84FF`).
3. **Never add external dependencies** — no CDN links, no npm packages for icons, fonts, or UI. All assets must be self-contained.
4. **Never add a light mode** — this is a dark-only site. Do not add `prefers-color-scheme` media queries or data-theme toggles.
5. **Never use `!important`** except to override third-party styles (e.g. Shiki's `pre` padding).
6. **Always use `white-space: nowrap`** on badge/pill text elements to prevent mid-word wrapping.
7. **Always use `flex-shrink: 0`** on icon SVGs and dot indicators inside flex containers.
8. **Always run `npm run build`** after edits to confirm zero build errors before finishing.

---

## Design Tokens

Defined in `src/styles/global.css`. **These are locked — do not change values without explicit instruction.**

### Colours

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0f0f0f` | Page background |
| `--card` | `#1a1a1a` | Card surfaces, elevated containers |
| `--border` | `#2a2a2a` | All borders and dividers |
| `--text` | `#e8e8e8` | Primary body text |
| `--muted` | `#888` | Secondary text, labels, metadata |
| `--accent` | `#0A84FF` | iOS blue — links, active states, highlights |
| `--accent-hover` | `#3b9eff` | Accent on `:hover` |
| `--code-bg` | `#111` | Code block background |
| `--success` | `#30d158` | Green — supported, positive outcomes |
| `--danger` | `#ff453a` | Red — unsupported, errors, affected badge |
| `--warning` | `#ffd60a` | Yellow — partial support, caution |

### Semantic colour usage

```
Danger  (#ff453a / rgba(255,69,58,…))  → affected-badge, unsupported status, error callouts
Success (#30d158 / rgba(48,209,88,…))  → supported status, "All iOS Browsers" card badge
Accent  (#0A84FF / rgba(10,132,255,…)) → links, "iOS Safari" card badge, code-block dot, hover states
Warning (#ffd60a / rgba(255,214,10,…)) → partial support status
```

Alpha variants follow the pattern `rgba(R,G,B, 0.07–0.12)` for backgrounds and `rgba(R,G,B, 0.2–0.25)` for borders.

---

## Typography

### Font stacks

```css
/* Body / UI */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

/* Monospace — code, labels, badges, version numbers */
font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
```

Always use the monospace stack for: code blocks, inline `<code>`, badge labels, version cells in support tables.

### Type scale

| Role | Size | Weight | Colour |
|---|---|---|---|
| Home hero title | `clamp(2.2rem, 6vw, 3.8rem)` | 800 | white + gradient span |
| Article title (`h1`) | `clamp(1.6rem, 4vw, 2.4rem)` | 700 | `#fff` |
| Section heading (`h2`) | `1.25rem` | 700 | `#fff` |
| Sub-heading (`h3`) | `1.05rem` | 700 | `#ddd` |
| Body prose | `1rem` | 400 | `#ccc` |
| Article summary | `1.05rem` | 400 | `#bbb` |
| Small labels / badges | `0.72rem–0.78rem` | 600 | token colour |
| Inline `<code>` | `0.85em` | 400 | inherited |
| Code blocks | `0.82rem` | 400 | Shiki `github-dark` |

### Line heights

| Context | Value |
|---|---|
| Headings | `1.2` |
| Body prose | `1.75` |
| Article summary | `1.65` |
| Compact UI (badges, labels) | `1.5` |
| Base document | `1.6` |

---

## Layout

### Container widths

| Context | Max-width |
|---|---|
| Site-wide (nav, home grid) | `1100px` |
| Article prose | `72ch` |

### Spacing

| Context | Value |
|---|---|
| Horizontal page padding | `1.5rem` |
| Nav height | `56px` |
| Article hero padding | `3.5rem 1.5rem 3rem` |
| Article body padding | `2.5rem 1.5rem 4rem` |
| Home grid padding | `3rem 1.5rem` |
| Footer margin-top | `5rem` |
| Gap between article cards | `1rem` |
| Gap between block elements | `1.25rem` |

### Border radii

| Context | Value |
|---|---|
| Page-level surfaces, table wrappers | `10px` |
| Cards, code blocks, callout boxes | `8px` |
| Small interactive elements (copy button) | `5px` |
| Pill badges (nav, status, card) | `20px` |
| Article hero affected-badge | `8px` (wraps on mobile — not a pill) |
| iPhone mockup shell | `44px` |
| iPhone Dynamic Island | `20px` |
| iPhone home indicator | `4px` |

---

## Components

### `BaseLayout.astro`

**Props:**
```ts
title: string          // inserted into <title> tag
description?: string   // meta description — defaults to site description
```

Renders a sticky nav (56px, blurred `backdrop-filter`) with `NavSearch`, a `<slot />`, and a footer. Do not add new nav items without updating the `nav-badge` count.

---

### `NavSearch.astro`

Compact navbar search. Empty focus shows the 3 newest articles; typing filters the full list and links to matches. Available on every page via `BaseLayout`.

---

### `ArticleLayout.astro`

**Props:**
```ts
title: string          // article heading displayed in hero and <title>
summary: string        // one-sentence description — shown below title, used as meta description
affectedSince: string  // short version string — shown in the red affected-badge
slug: string           // used to resolve previous/next article links from the shared articles list
```

**`affectedSince` conventions — keep under ~40 characters:**

| Pattern | Example |
|---|---|
| Affects all iOS | `"All iOS versions"` |
| All iOS + fix version | `"All iOS versions · dvh fix: iOS 15.4+"` |
| All iOS + bug reference | `"All iOS versions (WebKit bug #153852)"` |
| Specific iOS range | `"iOS 11+ (iPhone X and later)"` |
| Legacy only | `"Pre-iOS 13 (legacy)"` |
| Safari-specific | `"All iOS Safari versions"` |

Use `·` (U+00B7 middle dot) as separator. Do not include browser names like "(Safari, Chrome, Firefox)" — the card badge on the home page already conveys scope.

---

### `IphoneMockup.astro`

**Props:**
```ts
label?: string   // caption displayed below the phone in monospace muted text
```

**Dimensions:** `200px × 390px`. Shell has `overflow: hidden`.

**Rules:**
- Slot content must use `position: absolute; inset: 0` to fill the screen area
- Do not use `position: fixed` inside the mockup — it is clipped by `overflow: hidden`
- Do not use `<img>` — all visuals must be pure CSS/SVG
- Use `z-index: 1` or higher if content needs to appear above the Dynamic Island (which is `z-index: 10`)
- Screen background defaults to `#111` — override inline on the slot content if needed
- For Before/After pairs: wrap two `<IphoneMockup>` in `display: flex; gap: 1.5rem; flex-wrap: wrap`

**Internal anatomy:**

| Element | Class | Key styles |
|---|---|---|
| Outer wrapper | `.iphone-wrapper` | `inline-flex`, column, `gap: 0.75rem` |
| Phone shell | `.iphone-shell` | `200×390px`, `border-radius: 44px`, `border: 8px solid #333` |
| Dynamic Island | `.iphone-dynamic-island` | `80×22px`, `border-radius: 20px`, `top: 10px`, `z-index: 10` |
| Screen area (slot) | `.iphone-screen` | `position: absolute; inset: 0; overflow: hidden; background: #111` |
| Home indicator | `.iphone-home-indicator` | `100×4px`, `border-radius: 4px`, `bottom: 8px`, `z-index: 10` |
| Label | `.iphone-label` | `0.75rem`, monospace, `var(--muted)`, `max-width: 200px` |

---

### `CodeBlock.astro`

**Props:**
```ts
code: string       // the code string to highlight — required
lang?: string      // Shiki language key — default: 'css'
filename?: string  // overrides the lang label in the header bar
```

Syntax highlighting: Shiki `github-dark` theme. **Do not change the theme.**

Copy button reads `pre.textContent` — no additional JS needed.

**Usage:**
```astro
<CodeBlock lang="css" filename="style.css" code={`
.element {
  height: 100dvh;
}
`} />
```

One `<CodeBlock>` per distinct solution. Do not wrap in extra containers — the component already has `margin: 1.25rem 0`.

---

### `BrowserSupport.astro`

**Props:**
```ts
rows: Array<{
  browser: string              // 'Safari iOS' | 'Chrome iOS' | 'Chrome Android' | 'Firefox' | 'Safari macOS'
  version: string              // 'All' | '15.4+' | '108+' etc.
  supported: boolean | 'partial'
  notes?: string               // one short sentence
}>
```

**Status rendering:**

| Value | Colour | Icon |
|---|---|---|
| `true` | `--success` green | checkmark |
| `false` | `--danger` red | ✕ |
| `'partial'` | `--warning` yellow | — dash |

Status badge has `white-space: nowrap` — text never breaks. Table has `min-width: 480px` with `overflow-x: auto` wrapper.

**Row order:** Safari iOS → Chrome iOS → Chrome Android → Firefox → Safari macOS.

---

### `ResourceList.astro`

**Props:**
```ts
links: Array<{
  title: string        // link text — displayed bold in accent colour
  url: string          // external URL — opens in new tab with rel="noopener noreferrer"
  description?: string // optional one-line description
}>
```

Target: 3–5 links per article. Prefer primary sources (MDN, WebKit bugs, CSS spec, official blog posts).

---

### `ArticleCard.astro`

**Props:**
```ts
article: Article   // from src/data/articles.ts
isNew?: boolean    // shows the New pill on the newest published article
```

Used on the home page Recent and All articles grids.

---

## Home Page Article Card

Each card is defined in the `articles` array in `src/data/articles.ts`. That list also drives previous/next links on article pages. The home page renders a Recent section (newest 3) and an All articles grid from the same array. Navbar search is handled by `NavSearch.astro`:

```ts
{
  slug: string         // matches filename in src/pages/articles/ (without .astro)
  emoji: string        // single emoji icon
  title: string        // must match the ArticleLayout title prop exactly
  description: string  // one-line card teaser (different from the article summary)
  browser: 'All iOS Browsers' | 'iOS Safari'
  published: string    // YYYY-MM-DD — homepage sorts newest first and shows this date
}
```

**Badge colours:**

| `browser` | Class | Colour |
|---|---|---|
| `'All iOS Browsers'` | `.card-badge--all` | `--success` green |
| `'iOS Safari'` | `.card-badge--safari` | `--accent` blue |

Use `'iOS Safari'` only when the quirk is specific to Safari's implementation and demonstrably does not affect Chrome on iOS in the same way.

---

## Callout Boxes

Two semantic callout patterns used inside article `<style>` blocks (not global components):

```css
/* Error / warning callout */
.callout {
  background: rgba(255, 69, 58, 0.07);
  border: 1px solid rgba(255, 69, 58, 0.2);
  border-radius: 8px;
  padding: 1rem 1.2rem;
  font-size: 0.875rem;
  color: #ccc;
  margin: 1rem 0;
  line-height: 1.6;
}
.callout strong { color: #fff; }

/* Info / tip callout */
.tip {
  background: rgba(10, 132, 255, 0.07);
  border: 1px solid rgba(10, 132, 255, 0.2);
  border-radius: 8px;
  padding: 1rem 1.2rem;
  font-size: 0.875rem;
  color: #ccc;
  margin: 1rem 0;
  line-height: 1.6;
}
.tip strong { color: var(--accent); }
```

---

## Article Structure

Every article must include all five sections **in this order**:

```
1. <h2>The Problem</h2>
   - Include at least one <IphoneMockup> visual
   - Describe what the user sees and when it happens

2. <h2>Root Cause</h2>
   - Explain the technical reason — WebKit behaviour, iOS system policy, etc.
   - Reference bug reports or specs where relevant

3. <h2>The Fix</h2>  (or <h2>Fix 1 — Name</h2>, <h2>Fix 2 — Name</h2> for multiple)
   - One <CodeBlock> per distinct solution
   - Copy-paste ready — no placeholders

4. <h2>Browser Support</h2>
   - <BrowserSupport rows={browserRows} />

5. <h2>Further Reading</h2>
   - <ResourceList links={resources} />
```

---

## Content Tone

- Write for experienced web developers — no hand-holding on basic concepts
- Lead with the observable symptom, then root cause, then fix
- Short declarative sentences
- Avoid: "It's worth noting that…", "Simply…", "Just…", "Easy…"
- Use `<strong>` to highlight key terms on first mention only

---

## File Naming

| Type | Convention | Example |
|---|---|---|
| Article pages | `kebab-case.astro` | `100vh-dynamic-url-bar.astro` |
| Components | `PascalCase.astro` | `IphoneMockup.astro` |
| Layouts | `PascalCase.astro` | `ArticleLayout.astro` |
| Styles | `kebab-case.css` | `global.css` |

---

## What NOT to Do

- Do not add a new CSS custom property — use existing tokens
- Do not hardcode hex colours in component or page styles
- Do not use `position: fixed` inside `<IphoneMockup>`
- Do not use `<img>` for mockup visuals
- Do not add npm packages without explicit instruction
- Do not add a light mode or `prefers-color-scheme` query
- Do not change the Shiki theme from `github-dark`
- Do not change design token values in `global.css`
- Do not add external font or icon library links
- Do not use `!important` outside of the Shiki override pattern in `CodeBlock.astro`
