# iOS Quirks

A developer reference site documenting common iOS browser quirks — explained with visual mockups, root cause analysis, and copy-paste-ready fixes.

Every browser on iOS (Safari, Chrome, Firefox, Edge) is forced by Apple to use WebKit as its rendering engine. That means these quirks affect **all iOS browsers**, not just Safari. Each article makes the scope clear.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Astro 7](https://astro.build) | Static site generator — zero client JS by default |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility classes via `@tailwindcss/vite` |
| [Shiki](https://shiki.style) | Syntax highlighting via Astro's built-in `Code` component |

No external CDN dependencies. All assets are self-contained. Output is pure static HTML in `dist/`.

---

## Getting Started

```bash
npm install
npm run dev       # → localhost:4321
npm run build     # → dist/
npm run preview   # → preview the build locally
```

---

## Project Structure

```
ios-quirks/
├── src/
│   ├── styles/
│   │   └── global.css              # Design tokens (CSS custom properties) + base reset
│   ├── layouts/
│   │   ├── BaseLayout.astro        # HTML shell: sticky nav, footer, head meta
│   │   └── ArticleLayout.astro    # Article wrapper: hero, back link, prose container
│   ├── components/
│   │   ├── IphoneMockup.astro     # CSS-only iPhone silhouette with slot for screen content
│   │   ├── CodeBlock.astro        # Shiki-highlighted code with copy-to-clipboard button
│   │   ├── BrowserSupport.astro   # Scrollable browser support table
│   │   └── ResourceList.astro     # Card-style external link list
│   └── pages/
│       ├── index.astro             # Home page — article card grid
│       └── articles/               # One .astro file per quirk
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs
├── AGENTS.md                       # AI tool rules, design tokens, component API
└── README.md
```

---

## Adding a New Article

1. **Create** `src/pages/articles/<slug>.astro` using the structure below
2. **Register** it in the `articles` array in `src/data/articles.ts`

### Minimal article template

```astro
---
import ArticleLayout from '../../layouts/ArticleLayout.astro';
import IphoneMockup from '../../components/IphoneMockup.astro';
import CodeBlock from '../../components/CodeBlock.astro';
import BrowserSupport from '../../components/BrowserSupport.astro';
import ResourceList from '../../components/ResourceList.astro';

const browserRows = [
  { browser: 'Safari iOS', version: 'All', supported: false, notes: '...' },
  { browser: 'Chrome iOS', version: 'All', supported: false, notes: '...' },
];

const resources = [
  { title: 'Link title', url: 'https://...', description: 'One-line description.' },
];
---

<ArticleLayout
  title="Your Article Title"
  summary="One sentence describing the bug and when it happens."
  affectedSince="All iOS versions"
  slug="your-slug"
>
  <h2>The Problem</h2>
  <p>...</p>
  <IphoneMockup label="Visual label">
    <!-- inline CSS mockup of the bug -->
  </IphoneMockup>

  <h2>Root Cause</h2>
  <p>...</p>

  <h2>The Fix</h2>
  <CodeBlock lang="css" filename="style.css" code={`/* fix code here */`} />

  <h2>Browser Support</h2>
  <BrowserSupport rows={browserRows} />

  <h2>Further Reading</h2>
  <ResourceList links={resources} />
</ArticleLayout>
```

### Registering on the home page

Add to the `articles` array in `src/data/articles.ts`:

```js
{
  slug: 'your-slug',
  emoji: '🔧',
  title: 'Your Article Title',
  description: 'One-line card description.',
  browser: 'All iOS Browsers', // or 'iOS Safari'
  published: '2026-11-03',
}
```

---

## Article Content Rules

Each article must include all five sections in order:

| # | Section | Component |
|---|---------|-----------|
| 1 | The Problem | `<IphoneMockup>` visual required |
| 2 | Root Cause | prose only |
| 3 | The Fix | one `<CodeBlock>` per solution |
| 4 | Browser Support | `<BrowserSupport rows={...} />` |
| 5 | Further Reading | `<ResourceList links={...} />` |

See `AGENTS.md` for the complete design token reference, component API, and visual style guide.

---

## Design Principles

- **Dark-only** — no light mode; single cohesive dark theme
- **No external images** — all visuals are pure CSS/SVG inline
- **No icon libraries** — icons are inline `<svg>`
- **No CDN scripts** — fully self-contained, works offline after `npm install`
- **Responsive from 320px** — tables scroll horizontally, content wraps gracefully
