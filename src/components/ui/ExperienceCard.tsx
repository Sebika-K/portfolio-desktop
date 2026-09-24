import type { ExperienceItem } from "../../data/experience"

type ExperienceCardProps = {
  experience: ExperienceItem
}

export default function ExperienceCard({
  experience,
}: ExperienceCardProps) {
  return (
    <article className="rounded-2xl border border-line bg-card/70 p-5 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-strong">
            {experience.company}
          </h3>
          <p className="text-sm font-semibold text-accent">
            {experience.role}
          </p>
        </div>

        <p className="text-sm text-text-faint">{experience.period}</p>
      </div>

      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-text">
        {experience.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}