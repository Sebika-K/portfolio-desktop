import type { ExperienceItem } from "../../data/experience"

type ExperienceCardProps = {
  experience: ExperienceItem
}

export default function ExperienceCard({
  experience,
}: ExperienceCardProps) {
  return (
    <article className="rounded-2xl border border-neutral-300 bg-white/70 p-5 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-neutral-800">
            {experience.company}
          </h3>
          <p className="text-sm font-semibold text-[#EF8E39]">
            {experience.role}
          </p>
        </div>

        <p className="text-sm text-neutral-500">{experience.period}</p>
      </div>

      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
        {experience.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}