// The text inside the about-this-site.txt app.
// Edit freely: each block is a heading plus a few lines (or bullet points).

export type TextBlock = {
  heading: string;
  lines?: string[]; // normal paragraphs
  bullets?: string[]; // bullet-point list
};

export const aboutSite: TextBlock[] = [
  {
    heading: "SebikaOS",
    lines: [
      "A desktop simulation that doubles as my portfolio.",
      "Double-click icons to open apps, drag windows around, tuck them into the taskbar, and use the ⏻ button to sleep, restart or shut down. Poke around: some things are hidden (the Terminal is a good place to start).",
    ],
  },
  {
    heading: "Built with",
    bullets: [
      "React 19 + TypeScript: the whole interface, as reusable components",
      "Vite: dev server and build tool",
      "Tailwind CSS v4: styling, with named theme colors for light & dark mode",
      "Framer Motion: window, lock screen, loading and shutdown animations",
      "react-rnd: dragging and resizing windows",
      "Supabase (Postgres + Storage): the guestbook's database and doodle images",
      "Web3Forms: lets the contact form send real emails without a server",
      "Vercel: hosting; every push to main redeploys the site automatically",
      "GitHub Actions: a scheduled job that keeps the database awake",
    ],
  },
  {
    heading: "How it works",
    bullets: [
      "Fit-to-screen scaling: the desktop is designed at 1200 × 720 and scaled to fit any screen or zoom level",
      "Window manager: App.tsx tracks every open window's stacking order and minimized state",
      "Power states: one value decides what's on screen (locked, loading, desktop or off). Sleep keeps the desktop on the page but hidden, so windows stay exactly where you left them",
      "Guestbook: doodles are drawn on a canvas and uploaded to Supabase Storage. Every entry starts unapproved, and database security rules (row-level security) only let visitors read approved, wall-safe columns, so private notes never leave the database",
      "Keeping it awake: free Supabase projects pause after a week of no activity, so a GitHub Action pings the database every 3 days",
      "Sharp resume: the PDF viewer is counter-scaled against the desktop's zoom, so it draws at the screen's real resolution instead of being stretched",
      "Tech logos: each logo is a single SVG used as a CSS mask, so it can be grey or its brand color without extra image files",
      "Terminal: commands are a plain function separate from the UI (try `help`)",
      "Dark mode: one class on <html> swaps every theme color at once",
      "Accessibility: icons and menus work from the keyboard, and the clouds and logo strip hold still if your system asks for reduced motion",
    ],
  },
  {
    heading: "Art",
    lines: [
      "The clouds drifting across the sky and the “Dreamers unite” drawing on the Contact page are hand-drawn by me in Procreate.",
      "The icons are placeholders for now; my own set is on the way.",
    ],
  },
];
