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
      "Open apps by double-clicking icons, drag windows around, minimize them to the taskbar, and poke around: some things are hidden.",
    ],
  },
  {
    heading: "Built with",
    bullets: [
      "React 19 + TypeScript: the whole interface, as reusable components",
      "Vite: dev server and build tool",
      "Tailwind CSS v4: styling, with named theme colors for light & dark mode",
      "Framer Motion: window, lock screen and loading animations",
      "react-rnd: dragging and resizing windows",
      "Web3Forms: lets the contact form send real emails without a server",
    ],
  },
  {
    heading: "How it works",
    bullets: [
      "Fit-to-screen scaling: the desktop is designed at one size and scaled to fit any screen or zoom level",
      "Window manager: App.tsx tracks every open window's stacking order and minimized state",
      "Terminal: commands are a plain function separate from the UI (try `help`)",
      "Dark mode: one class on <html> swaps every theme color at once",
    ],
  },
  {
    heading: "Art",
    // TODO: describe your artwork (e.g. which pieces you drew, and in what app)
    lines: ["Illustrations and icons: coming soon, hand-drawn."],
  },
];
