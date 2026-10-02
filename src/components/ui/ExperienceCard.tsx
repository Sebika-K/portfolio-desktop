import type { ExperienceItem } from "../../data/experience"

type ExperienceCardProps = {
  experience: ExperienceItem
}

// One job on the timeline: title + dates on top, a one-line summary,
// the bullet points, then the tech used as small "code-style" chips.
export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="rounded-2xl border border-line bg-card/80 p-5 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-strong">{experience.role}</h3>
          <p className="text-sm font-semibold text-accent">
            {experience.company}
            <span className="font-normal text-text-faint"> · {experience.type}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 sm:flex-col sm:items-end">
          {/* font-mono = code-style font, for a technical look */}
          <p className="font-mono text-xs text-text-faint">{experience.period}</p>
          {experience.current && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-on-accent">
              now
            </span>
          )}
        </div>
      </div>

      <p className="mt-3 text-sm italic text-text-muted">{experience.summary}</p>

      <ul className="mt-3 space-y-2 text-sm leading-6 text-text">
        {experience.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span aria-hidden="true" className="mt-0.5 font-mono text-accent">▹</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
        {experience.tech.map((t) => (
          <li
            key={t}
            className="rounded-md border border-line bg-cream px-2 py-0.5 font-mono text-[11px] text-text"
          >
            {t}
          </li>
        ))}
      </ul>
    </article>
  )
}
