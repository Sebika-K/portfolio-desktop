import SkillGroupCard from "../ui/SkillGroupCard"
import {
  skillGroups,
  bottomTechIcons,
} from "../../data/skills"

export default function SkillsContent() {
  return (
    <div className="space-y-8 text-neutral-700">
      <div>
        <h2 className="text-3xl font-bold text-orange-500">
          Skills & Involvements
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
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
        <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900">
          Involvements
        </h3>

        <p className="text-sm leading-6 text-neutral-700">
          SWE (TXST), Rewriting the Code, IEEE — active member contributing to
          women-in-tech and computer science initiatives
        </p>
      </div>

      {/* Honors */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900">
          Honors & Affiliations
        </h3>

        <p className="text-sm leading-6 text-neutral-700">
          Adobe Student Ambassador • Dean’s List (7 semesters)
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-300 bg-[#efe8d7]/70 px-4 py-5">
        <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900">
          Tech I Like Working With
        </h3>

        <div className="mt-4 flex flex-wrap gap-3">
          {bottomTechIcons.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}