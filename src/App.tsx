import { useEffect, useState, type CSSProperties } from "react";
import HomeDesktop from "./components/desktop/HomeDesktop";
import WindowShell from "./components/desktop/WindowShell";
import MobilePanel from "./components/mobile/MobilePanel";
import AboutContent from "./components/sections/AboutContent";
import ContactContent from "./components/sections/ContactContent";
import ExperienceContent from "./components/sections/ExperienceContent";
import ProjectsContent from "./components/sections/ProjectsContent";
import SkillsContent from "./components/sections/SkillsContent";
import ThemeToggle from "./components/ui/ThemeToggle";
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
  const [windows, setWindows] = useState<{ id: SectionId; zIndex: number }[]>(
    [],
  );
  const [isDark, setIsDark] = useState(false);

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
          w.id === sectionId ? { ...w, zIndex: maxZ + 1 } : w,
        );
      }

      const maxZ = Math.max(...prev.map((w) => w.zIndex), 0);
      return [...prev, { id: sectionId, zIndex: maxZ + 1 }];
    });
  };

  const handleCloseWindow = (sectionId: SectionId) => {
    setWindows((prev) => prev.filter((w) => w.id !== sectionId));
  };

  const handleCloseMobilePanel = () => {
    setMobileSection(null);
  };

  const bringToFront = (sectionId: SectionId) => {
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), 0);
      return prev.map((w) =>
        w.id === sectionId ? { ...w, zIndex: maxZ + 1 } : w,
      );
    });
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
        {/* Dark/light toggle, pinned to the top-left corner of the screen */}
        <div className="fixed top-4 left-4 z-[1000]">
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <HomeDesktop onOpenSection={handleOpenSection} />
        </div>

        <AnimatePresence>
          {!isMobile &&
            windows.map((win) => (
              <WindowShell
                key={win.id}
                title={sections.find((s) => s.id === win.id)?.title || ""}
                onClose={() => handleCloseWindow(win.id)}
                zIndex={win.zIndex}
                onFocus={() => bringToFront(win.id)}
                scale={scale}
              >
                {renderContent(win.id)}
              </WindowShell>
            ))}
        </AnimatePresence>

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
      </div>
    </main>
  );
}
