import type { Project } from "../../data/projects"
import { GitHubIcon } from "./SocialLinks"

type ProjectCardProps = {
  project: Project
}

// How many tech chips fit on a card before we show "+N" instead.
const MAX_CHIPS = 4

// One project in the grid: kind, title, one-line tagline, a few tech chips,
// and links along the bottom. Styled like ExperienceCard so the windows match.
export default function ProjectCard({ project }: ProjectCardProps) {
  const shownTech = project.tech.slice(0, MAX_CHIPS)
  const hiddenCount = project.tech.length - shownTech.length

  return (
    // flex-col + h-full: every card in a row stretches to the same height,
    // and mt-auto on the footer pins the links to the bottom edge.
    <article className="flex h-full flex-col rounded-2xl border border-line bg-card/80 p-5 shadow-sm">
      <p className="font-mono text-[11px] uppercase tracking-wider text-text-faint">
        {project.kind}
      </p>
      <h3 className="mt-1 text-lg font-bold text-text-strong">{project.title}</h3>
      <p className="mt-2 text-sm leading-6 text-text-muted">{project.tagline}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
        {shownTech.map((t) => (
          <li
            key={t}
            className="rounded-md border border-line bg-cream px-2 py-0.5 font-mono text-[11px] text-text"
          >
            {t}
          </li>
        ))}
        {hiddenCount > 0 && (
          <li className="px-1 py-0.5 font-mono text-[11px] text-text-faint">
            +{hiddenCount}
          </li>
        )}
      </ul>

      <div className="mt-auto flex items-center gap-4 pt-5 text-sm font-semibold">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-text-strong transition hover:text-accent"
        >
          <GitHubIcon size={15} />
          Code
        </a>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-text-strong transition hover:text-accent"
          >
            Demo ↗
          </a>
        )}
      </div>
    </article>
  )
}
