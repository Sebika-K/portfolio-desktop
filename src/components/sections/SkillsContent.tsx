import SkillGroupCard from "../ui/SkillGroupCard"
import {
  skillGroups,
  bottomTechIcons,
} from "../../data/skills"

export default function SkillsContent() {
  return (
    <div className="space-y-8 text-text">
      <div>
        <h2 className="text-3xl font-bold text-accent">
          Skills & Involvements
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted">
          A mix of technical tools, creative interests, and communities that
          shape how I build and learn.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group) => (
          <SkillGroupCard
            key={group.title}
            title={group.title}
            items={group.items}
          />
        ))}
      </div>

      {/* Involvements */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-wide text-text-strong">
          Involvements
        </h3>

        <p className="text-sm leading-6 text-text">
          SWE (TXST), Rewriting the Code, IEEE — active member contributing to
          women-in-tech and computer science initiatives
        </p>
      </div>

      {/* Honors */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-wide text-text-strong">
          Honors & Affiliations
        </h3>

        <p className="text-sm leading-6 text-text">
          Adobe Student Ambassador • Dean’s List (7 semesters)
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-panel/70 px-4 py-5">
        <h3 className="text-sm font-bold uppercase tracking-wide text-text-strong">
          Tech I Like Working With
        </h3>

        <div className="mt-4 flex flex-wrap gap-3">
          {bottomTechIcons.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-line bg-card px-4 py-2 text-sm font-medium text-text shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}