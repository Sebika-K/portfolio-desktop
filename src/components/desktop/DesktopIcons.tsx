import { useState } from "react";
import { sections, type SectionId } from "../../data/sections";

type DesktopIconsProps = {
  onOpenSection: (sectionId: SectionId) => void;
  isMobile: boolean;
};

// The icons that sit directly on the desktop wallpaper, in a column on the
// left, like files on a Mac or PC desktop.
//
// One click (or tap) opens an app. Real desktops use double-click, but
// this is a website: visitors expect one click, and many would think a
// double-click-only icon is broken. The icon also stays highlighted, like
// a selected file, until you click empty wallpaper.
// Keyboard users get this for free: Enter or Space on a focused <button>
// counts as a click.
export default function DesktopIcons({
  onOpenSection,
  isMobile,
}: DesktopIconsProps) {
  // Which icon is highlighted right now (null = none).
  const [selectedId, setSelectedId] = useState<SectionId | null>(null);

  return (
    <>
      {/* Invisible layer covering the whole desktop: clicking empty
          wallpaper clears the selection, like on a real computer. */}
      <div
        className="absolute inset-0"
        onClick={() => setSelectedId(null)}
        aria-hidden="true"
      />

      {/* The column stops above the taskbar (bottom-16) and, when it runs
          out of room, wraps into a second column (flex-col + flex-wrap),
          like icons on a real desktop. Phones have no taskbar → bottom-4. */}
      <nav
        aria-label="Desktop"
        className={`absolute left-6 top-14 flex flex-col flex-wrap content-start gap-x-2 gap-y-3 ${
          isMobile ? "bottom-4" : "bottom-16"
        }`}
      >
        {sections.map((item) => {
          const isSelected = selectedId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedId(item.id);
                onOpenSection(item.id);
              }}
              className="group flex w-28 flex-col items-center gap-1 rounded-lg p-1 outline-none select-none"
            >
              {/* Icon picture: soft see-through box behind it when selected */}
              <span
                className={`rounded-lg p-1 transition ${
                  isSelected ? "bg-white/40" : "group-hover:bg-white/20"
                }`}
              >
                <img
                  src={item.icon}
                  alt=""
                  className="h-14 w-14 object-contain drop-shadow-sm transition group-hover:scale-105"
                  draggable={false}
                />
              </span>

              {/* Label: highlighted pill when selected, like macOS */}
              <span
                className={`rounded px-1.5 py-0.5 text-center text-xs font-medium leading-tight break-words ${
                  isSelected ? "bg-accent text-on-accent" : "text-text"
                } group-focus-visible:ring-2 group-focus-visible:ring-accent`}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
