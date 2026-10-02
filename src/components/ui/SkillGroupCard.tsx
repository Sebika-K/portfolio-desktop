import type { SkillGroup } from "../../data/skills"
import { techIcons } from "../../data/techIcons"
import TechIcon from "./TechIcon"

type SkillGroupCardProps = {
  group: SkillGroup
}

// One group of skills (e.g. "AI & ML") as a card of chips.
// Each chip shows the tech's logo (if it has one) in grey; hovering the chip
// (`group`) lights the logo up in its brand color.
export default function SkillGroupCard({ group }: SkillGroupCardProps) {
  return (
    <article className="h-full rounded-2xl border border-line bg-panel p-4 shadow-sm">
      <h4 className="font-mono text-[11px] uppercase tracking-wider text-text-faint">
        {group.title}
      </h4>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {group.items.map((item) => {
          const icon = techIcons[item]
          return (
            <li
              key={item}
              className="group flex items-center gap-1.5 rounded-md border border-line bg-cream px-2 py-1 font-mono text-[11px] text-text transition-colors hover:border-line-strong"
            >
              {icon && (
                <span className="text-text-faint">
                  <TechIcon icon={icon} size={13} />
                </span>
              )}
              {item}
            </li>
          )
        })}
      </ul>
    </article>
  )
}
