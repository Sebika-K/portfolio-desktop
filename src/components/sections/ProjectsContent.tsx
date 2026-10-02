import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import ProjectDetail from "../ui/ProjectDetail"
import { projects } from "../../data/projects"

// The Projects window, laid out like Finder: a list of projects on the left,
// and everything about the selected one on the right.
// On phones (below md) the list becomes a row of pills above the details.
export default function ProjectsContent() {
  // Which project is open. Starts on the first one (VoltStream).
  const [selectedId, setSelectedId] = useState(projects[0].id)
  const selected = projects.find((p) => p.id === selectedId) ?? projects[0]

  // When you pick another project, jump the details back to the top.
  const detailRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    detailRef.current?.scrollTo({ top: 0 })
  }, [selectedId])

  // Finder-style keyboard control: ↑/↓ move through the list.
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
    event.preventDefault()
    const index = projects.findIndex((p) => p.id === selectedId)
    const next = event.key === "ArrowDown" ? index + 1 : index - 1
    // % wraps around: past the last goes back to the first, and vice versa.
    setSelectedId(projects[(next + projects.length) % projects.length].id)
  }

  return (
    <div className="text-text md:grid md:h-full md:grid-cols-[210px_minmax(0,1fr)]">
      {/* Sidebar (desktop window only) */}
      <nav
        aria-label="Projects"
        className="hidden overflow-y-auto border-r border-line bg-panel p-3 md:block"
      >
        <p className="px-2 pb-2 font-mono text-[11px] uppercase tracking-wider text-text-faint">
          {projects.length} projects
        </p>
        <ul className="space-y-1" onKeyDown={handleKeyDown}>
          {projects.map((project) => {
            const isSelected = project.id === selectedId
            return (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(project.id)}
                  aria-current={isSelected ? "true" : undefined}
                  className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 text-left transition ${
                    isSelected ? "bg-card shadow-sm" : "hover:bg-card/50"
                  }`}
                >
                  {/* Same folder icon as the desktop, so it feels like browsing files */}
                  <img src="/icons/projects.svg" alt="" className="h-6 w-6 shrink-0" />
                  <span className="min-w-0">
                    <span
                      className={`block text-sm font-semibold leading-tight ${
                        isSelected ? "text-accent" : "text-text-strong"
                      }`}
                    >
                      {project.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] text-text-faint">
                      {project.kind}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Phone version of the list: one sideways-scrolling row of pills */}
      <ul className="mb-5 flex gap-2 overflow-x-auto pb-1 md:hidden" aria-label="Projects">
        {projects.map((project) => {
          const isSelected = project.id === selectedId
          return (
            <li key={project.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setSelectedId(project.id)}
                aria-current={isSelected ? "true" : undefined}
                className={`rounded-full border px-3 py-1 text-sm font-semibold ${
                  isSelected
                    ? "border-accent bg-accent text-on-accent"
                    : "border-line bg-card text-text-strong"
                }`}
              >
                {project.title}
              </button>
            </li>
          )
        })}
      </ul>

      {/* Details of the selected project. Scrolls on its own, so the
          sidebar stays put while you read. */}
      <div ref={detailRef} className="md:overflow-y-auto md:px-7 md:py-6">
        <ProjectDetail project={selected} />
      </div>
    </div>
  )
}
