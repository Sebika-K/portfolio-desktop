import { useEffect, useRef, useState } from "react";

type PowerMenuProps = {
  onSleep: () => void;
  onRestart: () => void;
};

// The ⏻ power button at the left end of the taskbar, like the Start button
// on Windows. Clicking it opens a small menu just above it.
export default function PowerMenu({ onSleep, onRestart }: PowerMenuProps) {
  const [open, setOpen] = useState(false);
  // Refs point at real elements on the page, so we can check
  // "was this click inside the menu?" and move keyboard focus.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // While the menu is open: close it on a click anywhere outside it,
  // or when Escape is pressed (then focus goes back to the ⏻ button).
  useEffect(() => {
    if (!open) return;
    const handlePointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("pointerdown", handlePointer);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("pointerdown", handlePointer);
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  // The menu's options. Shut down comes in the next step.
  const options = [
    { label: "Sleep", hint: "Lock the screen, keep windows", action: onSleep },
    { label: "Restart", hint: "Close everything and boot again", action: onRestart },
  ];

  return (
    <div ref={wrapperRef} className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        // Tells screen readers this button opens a menu, and whether it's open.
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Power"
        title="Power"
        className={`flex h-9 w-9 items-center justify-center rounded-lg text-icon transition ${
          open ? "bg-tab-active" : "hover:bg-tab-active/60"
        }`}
      >
        <PowerIcon />
      </button>

      {open && (
        // bottom-full: the menu sits directly above the button.
        <div
          role="menu"
          aria-label="Power options"
          className="absolute bottom-full left-0 mb-2 w-60 overflow-hidden rounded-xl border border-window-border bg-window p-1 shadow-xl"
        >
          {options.map((option) => (
            <button
              key={option.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                option.action();
              }}
              className="flex w-full flex-col rounded-lg px-3 py-2 text-left text-text transition hover:bg-accent hover:text-on-accent focus-visible:bg-accent focus-visible:text-on-accent focus-visible:outline-none"
            >
              <span className="text-sm font-semibold">{option.label}</span>
              <span className="text-xs opacity-80">{option.hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// The ⏻ symbol, drawn as an SVG instead of typed as a character: the ⏻
// character is missing from many fonts (some computers would show an empty
// box). currentColor makes it follow the theme, like your top bar icons.
function PowerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 3v9" />
      <path d="M6.3 6.3a8 8 0 1 0 11.4 0" />
    </svg>
  );
}
