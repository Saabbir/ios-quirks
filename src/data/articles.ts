export interface Article {
  slug: string;
  emoji: string;
  title: string;
  description: string;
  browser: 'All iOS Browsers' | 'iOS Safari';
  published: string;
}

const allArticles: Article[] = [
  {
    slug: '100vh-dynamic-url-bar',
    emoji: '📐',
    title: '100vh and the Dynamic URL Bar',
    description: 'Elements sized to 100vh overflow the visible screen when the browser URL bar is visible on page load.',
    browser: 'All iOS Browsers',
    published: '2026-07-24',
  },
  {
    slug: 'overflow-hidden-body-scroll',
    emoji: '🔒',
    title: 'overflow: hidden Doesn\'t Lock Body Scroll',
    description: 'Background content remains scrollable beneath modals and drawers — CSS alone can\'t stop it on iOS.',
    browser: 'All iOS Browsers',
    published: '2026-07-24',
  },
  {
    slug: 'input-zoom-on-focus',
    emoji: '🔍',
    title: 'Auto-Zoom on Input Focus',
    description: 'iOS automatically zooms in when a form input with font-size < 16px is focused.',
    browser: 'All iOS Browsers',
    published: '2026-07-24',
  },
  {
    slug: 'position-fixed-virtual-keyboard',
    emoji: '⌨️',
    title: 'position: fixed Breaks with Virtual Keyboard',
    description: 'Fixed elements shift up with the keyboard instead of anchoring to the visible bottom.',
    browser: 'All iOS Browsers',
    published: '2026-07-24',
  },
  {
    slug: 'tap-highlight-color',
    emoji: '✨',
    title: 'Unwanted Tap Highlight Flash',
    description: 'Tapping interactive elements shows a translucent grey flash that breaks custom designs.',
    browser: 'All iOS Browsers',
    published: '2026-07-24',
  },
  {
    slug: 'video-autoplay',
    emoji: '▶️',
    title: 'Video Autoplay Restrictions',
    description: 'iOS blocks video autoplay unless the video is muted and marked as inline. Audio never autoplays.',
    browser: 'All iOS Browsers',
    published: '2026-07-24',
  },
  {
    slug: 'video-stuck-on-poster',
    emoji: '🎞️',
    title: 'Lazy Video Stuck on the Poster',
    description: 'A preload="none" video started with play() can silently never load — unpaused, readyState 0, no request.',
    browser: 'All iOS Browsers',
    published: '2026-11-03',
  },
  {
    slug: 'safe-area-insets',
    emoji: '📱',
    title: 'Safe Area Insets (Notch & Home Bar)',
    description: 'Content can be hidden behind the Dynamic Island or home indicator on modern iPhones.',
    browser: 'All iOS Browsers',
    published: '2026-07-24',
  },
  {
    slug: 'overscroll-rubber-band',
    emoji: '🏀',
    title: 'Rubber-Band Scroll Leaking to the Page',
    description: 'iOS\'s rubber-band overscroll effect can pull the entire page from inside a scroll container.',
    browser: 'All iOS Browsers',
    published: '2026-07-24',
  },
  {
    slug: 'momentum-scrolling',
    emoji: '💨',
    title: 'Sluggish Scroll in Overflow Containers',
    description: 'Scrollable divs feel choppy on older iOS because momentum scrolling isn\'t applied by default.',
    browser: 'All iOS Browsers',
    published: '2026-07-24',
  },
  {
    slug: 'date-input-quirks',
    emoji: '📅',
    title: '<input type="date"> Inconsistencies',
    description: 'Date inputs render as an unstyleable native drum-picker wheel. Chrome on iOS uses a different UI.',
    browser: 'iOS Safari',
    published: '2026-07-24',
  },
];

export const articles = [...allArticles].sort((a, b) =>
  b.published.localeCompare(a.published)
);

export function formatPublished(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getAdjacentArticles(slug: string) {
  const index = articles.findIndex((article) => article.slug === slug);
  return {
    prev: index > 0 ? articles[index - 1] : undefined,
    next: index >= 0 && index < articles.length - 1 ? articles[index + 1] : undefined,
  };
}
