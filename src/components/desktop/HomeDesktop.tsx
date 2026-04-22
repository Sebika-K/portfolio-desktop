import { sections, type SectionId } from "../../data/sections"

type HomeDesktopProps = {
  onOpenSection: (sectionId: SectionId) => void
}

export default function HomeDesktop({ onOpenSection }: HomeDesktopProps) {
  return (
    <div className="w-[90%] max-w-5xl rounded-2xl border-2 border-neutral-800 bg-[#f6f1de] shadow-xl">
      <div className="flex items-center justify-between rounded-t-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white">
        <span>:) Home</span>
        <button
          type="button"
          className="rounded bg-white/20 px-2 py-1 text-xs"
        >
          ☀
        </button>
      </div>

      <div className="flex min-h-[520px] flex-col items-center justify-center gap-10 px-6 py-10 text-center">
        <div>
          <h1 className="text-5xl font-bold text-neutral-700 sm:text-6xl">
            Hi! <span className="text-orange-500">I’m Sebika</span>
          </h1>
          <p className="mt-3 text-lg text-neutral-600">
            Software engineer, designer, and creative builder
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 sm:grid-cols-5">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenSection(item.id)}
              className="flex flex-col items-center gap-2 rounded-lg p-2 transition hover:scale-105"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-neutral-300 bg-white text-2xl shadow-sm">
                📁
              </div>
              <span className="text-sm font-medium text-neutral-700">
                {item.title}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-6 text-2xl text-neutral-700">
          <a href="#">in</a>
          <a href="#">gh</a>
          <a href="#">✉</a>
        </div>
      </div>
    </div>
  )
}