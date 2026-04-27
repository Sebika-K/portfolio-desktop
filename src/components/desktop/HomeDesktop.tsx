import { sections, type SectionId } from "../../data/sections"

type HomeDesktopProps = {
  onOpenSection: (sectionId: SectionId) => void
}

export default function HomeDesktop({ onOpenSection }: HomeDesktopProps) {
  return (
    <div className="w-[837px] h-[501px] rounded-[12px] border border-[#673C33]/25 bg-[#F1F0DD] shadow-xl max-md:w-[92vw] max-md:h-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between rounded-t-[12px] bg-[#CC5500]/80 px-4 py-2 text-m font-semibold text-white">
        <span>:) Home</span>

        <button
          type="button"
          className="rounded bg-white/20 px-2 py-1 text-xs"
        >
          ☀
        </button>
      </div>

      {/* Content */}
      <div className="flex h-[455px] flex-col items-center justify-center gap-9 px-6 py-8 text-center max-md:h-auto max-md:min-h-[520px]">
        {/* Heading */}
        <div>
          <h1 className="text-5xl font-bold text-[#807D7D]">
            Hi! <span className="text-[#EF8E39]">I’m Sebika</span>
          </h1>

          <p className="mt-3 font-indie text-base text-neutral-600">
            Software engineer, designer, and creative builder
          </p>
        </div>

        {/* Icons */}
        <div className="grid grid-cols-3 gap-8 sm:grid-cols-5 sm:gap-12">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenSection(item.id)}
              className="flex flex-col items-center gap-2 rounded-lg p-2 transition hover:scale-105"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-neutral-300 bg-white shadow-sm">
                <img
                  src={item.icon}
                  alt={`${item.title} icon`}
                  className="h-10 w-10 object-contain"
                />
              </div>

              <span className="text-xs font-medium text-neutral-700">
                {item.title}
              </span>
            </button>
          ))}
        </div>

        {/* Socials */}
        <div className="flex gap-6 text-xl text-neutral-700">
          <a href="#">in</a>
          <a href="#">gh</a>
          <a href="#">✉</a>
        </div>
      </div>
    </div>
  )
}