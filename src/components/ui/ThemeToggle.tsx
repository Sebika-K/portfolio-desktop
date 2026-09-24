type ThemeToggleProps = {
  isDark: boolean;
  onToggle: () => void;
};

// A sun (light mode) or moon (dark mode) button.
// The icons use `currentColor`, so they take the button's text color.
// text-icon is a theme color (see index.css): dark gray in light, white in dark.
export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="rounded-full p-1 text-icon transition hover:scale-110"
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <line x1="12" y1="1.5" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22.5" />
      <line x1="1.5" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22.5" y2="12" />
      <line x1="4.6" y1="4.6" x2="6.3" y2="6.3" />
      <line x1="17.7" y1="17.7" x2="19.4" y2="19.4" />
      <line x1="4.6" y1="19.4" x2="6.3" y2="17.7" />
      <line x1="17.7" y1="6.3" x2="19.4" y2="4.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1z" />
    </svg>
  );
}
