import { useState } from "react"
import HomeDesktop from "./components/desktop/HomeDesktop"
import WindowShell from "./components/desktop/WindowShell"
import AboutContent from "./components/sections/AboutContent"
import type { SectionId } from "./data/sections"

export default function App() {
  const [openSection, setOpenSection] = useState<SectionId | null>(null)

  const handleOpenSection = (sectionId: SectionId) => {
    setOpenSection(sectionId)
  }

  const handleCloseWindow = () => {
    setOpenSection(null)
  }

  return (
    <main className="relative min-h-screen bg-sky-200">
      <div className="flex min-h-screen items-center justify-center">
        <HomeDesktop onOpenSection={handleOpenSection} />
      </div>

      {openSection === "about" && (
        <WindowShell title="About Me" onClose={handleCloseWindow}>
          <AboutContent />
        </WindowShell>
      )}
    </main>
  )
}