import HomeDesktop from "./components/desktop/HomeDesktop"
import type { SectionId } from "./data/sections"

export default function App() {
  const handleOpenSection = (sectionId: SectionId) => {
    console.log("Open section:", sectionId)
  }

  return (
    <main className="min-h-screen bg-sky-200">
      <div className="flex min-h-screen items-center justify-center">
        <HomeDesktop onOpenSection={handleOpenSection} />
      </div>
    </main>
  )
}