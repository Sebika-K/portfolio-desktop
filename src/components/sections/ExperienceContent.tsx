import ExperienceCard from "../ui/ExperienceCard"
import { experiences } from "../../data/experience"

export default function ExperienceContent() {
  return (
    <div className="space-y-6 text-neutral-700">
      <div>
        <h2 className="text-3xl font-bold text-[#EF8E39]">Experience</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
          A few roles where I’ve been able to grow as an engineer, collaborator,
          and builder while working across design, frontend development, and
          student-facing experiences.
        </p>
      </div>

      <div className="space-y-4 rounded-2xl bg-[#efe8d7]/70 p-4 shadow-inner">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  )
}