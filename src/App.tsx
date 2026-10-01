import { useCallback, useEffect, useState, type CSSProperties } from "react";
import DesktopIcons from "./components/desktop/DesktopIcons";
import WindowShell from "./components/desktop/WindowShell";
import MobilePanel from "./components/mobile/MobilePanel";
import AboutContent from "./components/sections/AboutContent";
import ContactContent from "./components/sections/ContactContent";
import ExperienceContent from "./components/sections/ExperienceContent";
import ProjectsContent from "./components/sections/ProjectsContent";
import SkillsContent from "./components/sections/SkillsContent";
import TopBar from "./components/desktop/TopBar";
import Taskbar from "./components/desktop/Taskbar";
import LockScreen from "./components/lock/LockScreen";
import LoadingScreen from "./components/lock/LoadingScreen";
import useIsMobile from "./hooks/useIsMobile";
import useFitScale from "./hooks/useFitScale";
import { sections, type SectionId } from "./data/sections";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const isMobile = useIsMobile();
  // Desktop: scale everything to fit the screen. Phone: keep the normal size.
  const fitScale = useFitScale();
  const scale = isMobile ? 1 : fitScale;
  const [mobileSection, setMobileSection] = useState<SectionId | null>(null);
  // Every open window: which section, how high it's stacked (zIndex),
  // and whether it's tucked away in the taskbar (minimized).
  const [windows, setWindows] = useState<
    { id: SectionId; zIndex: number; minimized: boolean }[]
  >([]);

  // The window in front = the highest zIndex among windows that are showing.
  const visibleWindows = windows.filter((w) => !w.minimized);
  const activeId =
    visibleWindows.length > 0
      ? visibleWindows.reduce((top, w) => (w.zIndex > top.zIndex ? w : top)).id
      : null;
  const [isDark, setIsDark] = useState(false);

  // Where the visitor is: on the lock screen, watching it load, or on the desktop.
  const [screen, setScreen] = useState<"locked" | "loading" | "desktop">(
    "locked",
  );
  const LOADING_MS = 1200; // how long the loading screen shows

  // useCallback keeps the same function between renders, so the lock
  // screen's keyboard listener isn't removed and re-added every second.
  const handleEnter = useCallback(() => {
    setScreen((current) => (current === "locked" ? "loading" : current));
  }, []);

  // When loading starts, switch to the desktop after LOADING_MS.
  useEffect(() => {
    if (screen !== "loading") return;
    const id = setTimeout(() => setScreen("desktop"), LOADING_MS);
    return () => clearTimeout(id);
  }, [screen]);

  // Put a "dark" class on <html> whenever dark mode is on.
  // index.css uses that class to swap every theme color at once.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);


  const handleOpenSection = (sectionId: SectionId) => {
    if (isMobile) {
      setMobileSection(sectionId);
      return;
    }

    setWindows((prev) => {
      const alreadyOpen = prev.find((w) => w.id === sectionId);

      if (alreadyOpen) {
        const maxZ = Math.max(...prev.map((w) => w.zIndex), 0);
        return prev.map((w) =>
          w.id === sectionId ? { ...w, zIndex: maxZ + 1, minimized: false } : w,
        );
      }

      const maxZ = Math.max(...prev.map((w) => w.zIndex), 0);
      return [...prev, { id: sectionId, zIndex: maxZ + 1, minimized: false }];
    });
  };

  const handleCloseWindow = (sectionId: SectionId) => {
    setWindows((prev) => prev.filter((w) => w.id !== sectionId));
  };

  const handleCloseMobilePanel = () => {
    setMobileSection(null);
  };

  // Puts a window on top of the others (and un-minimizes it if needed).
  const bringToFront = (sectionId: SectionId) => {
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), 0);
      return prev.map((w) =>
        w.id === sectionId ? { ...w, zIndex: maxZ + 1, minimized: false } : w,
      );
    });
  };

  const minimizeWindow = (sectionId: SectionId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === sectionId ? { ...w, minimized: true } : w)),
    );
  };

  // Clicking a taskbar tab works like on a real computer:
  //   minimized window      → restore it
  //   the window in front   → minimize it
  //   a window behind others → bring it to the front
  const handleTaskbarClick = (sectionId: SectionId) => {
    const win = windows.find((w) => w.id === sectionId);
    if (!win) return;

    if (win.minimized) bringToFront(sectionId);
    else if (sectionId === activeId) minimizeWindow(sectionId);
    else bringToFront(sectionId);
  };

  const renderContent = (sectionId: SectionId) => {
    switch (sectionId) {
      case "about":
        return <AboutContent />;
      case "experience":
        return <ExperienceContent />;
      case "projects":
        return <ProjectsContent />;
      case "skills":
        return <SkillsContent />;
      case "contact":
        return <ContactContent />;
      default:
        return null;
    }
  };

  return (
    <main className="relative h-screen overflow-hidden bg-page transition-colors">
      {/* The "stage": everything on the desktop lives inside this box.
          It is made 1/scale times the screen size, then shrunk/grown by
          `scale`, so it always exactly covers the screen. Everything inside
          grows or shrinks together, like zooming a picture. */}
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: `calc(100vw / ${scale})`,
          height: `calc(100vh / ${scale})`,
          transform: `scale(${scale})`,
          // Shared with CSS (index.css uses it to keep scrollbars thin).
          "--scale": scale,
        } as CSSProperties}
      >
        {/* Menu bar across the top: name, links, theme toggle, clock */}
        <TopBar isDark={isDark} onToggleDark={() => setIsDark(!isDark)} />

        {/* Icons sitting on the wallpaper (the old Home window is gone) */}
        <DesktopIcons onOpenSection={handleOpenSection} isMobile={isMobile} />

        <AnimatePresence>
          {!isMobile &&
            windows.map((win) => (
              <WindowShell
                key={win.id}
                title={sections.find((s) => s.id === win.id)?.title || ""}
                onClose={() => handleCloseWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                minimized={win.minimized}
                zIndex={win.zIndex}
                onFocus={() => bringToFront(win.id)}
                scale={scale}
              >
                {renderContent(win.id)}
              </WindowShell>
            ))}
        </AnimatePresence>

        {/* Taskbar along the bottom (desktop only; phones use the slide-up panel) */}
        {!isMobile && (
          <Taskbar
            windows={windows}
            activeId={activeId}
            onTabClick={handleTaskbarClick}
          />
        )}

        <AnimatePresence>
          {isMobile && mobileSection && (
            <MobilePanel
              title={sections.find((s) => s.id === mobileSection)?.title || ""}
              onClose={handleCloseMobilePanel}
            >
              {renderContent(mobileSection)}
            </MobilePanel>
          )}
        </AnimatePresence>

        {/* Lock screen and loading screen sit on top of the desktop.
            AnimatePresence lets each one play its fade-out before it's removed. */}
        <AnimatePresence>
          {screen === "locked" && (
            <LockScreen key="lock" onEnter={handleEnter} />
          )}
          {screen === "loading" && (
            <LoadingScreen key="loading" duration={LOADING_MS} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
