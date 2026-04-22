import { useMemo, useState } from "react"
import HomeDesktop from "./components/desktop/HomeDesktop"
import WindowShell from "./components/desktop/WindowShell"
import AboutContent from "./components/sections/AboutContent"
import ContactContent from "./components/sections/ContactContent"
import ExperienceContent from "./components/sections/ExperienceContent"
import ProjectsContent from "./components/sections/ProjectsContent"
import SkillsContent from "./components/sections/SkillsContent"
import { sections, type SectionId } from "./data/sections"

export default function App() {
  const [openSection, setOpenSection] = useState<SectionId | null>(null)

  const handleOpenSection = (sectionId: SectionId) => {
    setOpenSection(sectionId)
  }

  const handleCloseWindow = () => {
    setOpenSection(null)
  }

  const windowTitle = useMemo(() => {
    return sections.find((section) => section.id === openSection)?.title ?? ""
  }, [openSection])

  const renderContent = () => {
    switch (openSection) {
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

      {openSection && (
        <WindowShell title={windowTitle} onClose={handleCloseWindow}>
          {renderContent()}
        </WindowShell>
      )}
    </main>
  )
}