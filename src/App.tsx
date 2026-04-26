import { useState } from "react"
import HomeDesktop from "./components/desktop/HomeDesktop"
import WindowShell from "./components/desktop/WindowShell"
import MobilePanel from "./components/mobile/MobilePanel"
import AboutContent from "./components/sections/AboutContent"
import ContactContent from "./components/sections/ContactContent"
import ExperienceContent from "./components/sections/ExperienceContent"
import ProjectsContent from "./components/sections/ProjectsContent"
import SkillsContent from "./components/sections/SkillsContent"
import useIsMobile from "./hooks/useIsMobile"
import { sections, type SectionId } from "./data/sections"
import { AnimatePresence } from "framer-motion"

export default function App() {
  const isMobile = useIsMobile()
  const [mobileSection, setMobileSection] = useState<SectionId | null>(null)
  const [windows, setWindows] = useState<
    { id: SectionId; zIndex: number }[]
  >([])

  const handleOpenSection = (sectionId: SectionId) => {
    if (isMobile) {
      setMobileSection(sectionId)
      return
    }

    setWindows((prev) => {
      const alreadyOpen = prev.find((w) => w.id === sectionId)

      if (alreadyOpen) {
        const maxZ = Math.max(...prev.map((w) => w.zIndex), 0)
        return prev.map((w) =>
          w.id === sectionId ? { ...w, zIndex: maxZ + 1 } : w
        )
      }

      const maxZ = Math.max(...prev.map((w) => w.zIndex), 0)
      return [...prev, { id: sectionId, zIndex: maxZ + 1 }]
    })
  }

  const handleCloseWindow = (sectionId: SectionId) => {
    setWindows((prev) => prev.filter((w) => w.id !== sectionId))
  }

  const handleCloseMobilePanel = () => {
    setMobileSection(null)
  }

  const bringToFront = (sectionId: SectionId) => {
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), 0)
      return prev.map((w) =>
        w.id === sectionId ? { ...w, zIndex: maxZ + 1 } : w
      )
    })
  }

  const renderContent = (sectionId: SectionId) => {
    switch (sectionId) {
      case "about":
        return <AboutContent />
      case "experience":
        return <ExperienceContent />
      case "projects":
        return <ProjectsContent />
      case "skills":
        return <SkillsContent />
      case "contact":
        return <ContactContent />
      default:
        return null
    }
  }

  return (
    <main className="relative h-screen overflow-hidden bg-sky-200">
      <div className="flex h-screen items-center justify-center">
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
    </main>
  )
}