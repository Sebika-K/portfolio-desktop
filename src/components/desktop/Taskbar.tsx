import { sections, type SectionId } from "../../data/sections";
import Clock from "./Clock";

type TaskbarProps = {
  // Every open window, in the order it was opened.
  windows: { id: SectionId; minimized: boolean }[];
  // The window currently in front (null if none is showing).
  activeId: SectionId | null;
  onTabClick: (id: SectionId) => void;
};

// The bar along the bottom of the screen with one tab per open window,
// like the Windows taskbar, with the date and time on the right.
export default function Taskbar({ windows, activeId, onTabClick }: TaskbarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[1000] flex h-12 items-center gap-2 bg-menubar px-3 backdrop-blur-md">
      {/* Tabs take all the space they can (flex-1), pushing the clock right */}
      <nav aria-label="Open windows" className="flex min-w-0 flex-1 items-center gap-2">
        {windows.map((win) => {
          const section = sections.find((s) => s.id === win.id);
          if (!section) return null;
          const isActive = win.id === activeId;

          return (
            <button
              key={win.id}
              type="button"
              onClick={() => onTabClick(win.id)}
              // aria-pressed tells screen readers whether this tab's window is the one in front
              aria-pressed={isActive}
              title={win.minimized ? `Restore ${section.title}` : section.title}
              className={`relative flex h-9 max-w-48 items-center gap-2 rounded-lg px-3 text-sm text-text transition ${
                isActive ? "bg-tab-active" : "hover:bg-tab-active/60"
              } ${win.minimized ? "opacity-60" : ""}`}
            >
              <img src={section.icon} alt="" className="h-5 w-5 object-contain" />
              <span className="truncate">{section.title}</span>

              {/* Little line under the tab of the window that's in front */}
              {isActive && (
                <span className="absolute inset-x-3 bottom-0.5 h-0.5 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </nav>

      <Clock variant="stacked" />
    </div>
  );
}
