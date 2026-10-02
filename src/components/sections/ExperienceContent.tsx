import ExperienceCard from "../ui/ExperienceCard"
import { experiences } from "../../data/experience"

// The Experience window: a vertical timeline, newest role at the top.
export default function ExperienceContent() {
  return (
    <div className="space-y-6 text-text">
      <div>
        <h2 className="text-3xl font-bold text-accent">Experience</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted">
          Where I’ve shipped code: ML training infrastructure, LLM-powered apps,
          and full-stack web work.
        </p>
      </div>

      {/* The timeline: a thin line down the left (border-l), and each role
          gets a dot sitting on that line, next to its card. */}
      <ol className="relative ml-2 space-y-6 border-l-2 border-line pl-6">
        {experiences.map((experience) => (
          <li key={experience.id} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-[33px] top-6 h-4 w-4 rounded-full border-2 border-window ${
                experience.current ? "bg-accent" : "bg-line-strong"
              }`}
            />
            <ExperienceCard experience={experience} />
          </li>
        ))}
      </ol>
    </div>
  )
}
