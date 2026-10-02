import type { Project } from "../../data/projects"
import MediaStrip from "./MediaStrip"
import { GitHubIcon } from "./SocialLinks"

type ProjectDetailProps = {
  project: Project
}

// Small code-style label used above each part of the page.
function SectionLabel({ children }: { children: string }) {
  return (
    <h4 className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-faint">
      {children}
    </h4>
  )
}

// Everything about one project: header + links, media, story, highlights, tech.
export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-faint">
            {project.kind}
          </p>
          <h3 className="mt-1 text-2xl font-bold text-text-strong">{project.title}</h3>
          <p className="mt-1 max-w-xl text-sm leading-6 text-text-muted">{project.tagline}</p>
        </div>

        <div className="flex shrink-0 gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-line bg-card px-3 py-1.5 text-sm font-semibold text-text-strong transition hover:border-accent hover:text-accent"
          >
            <GitHubIcon size={14} />
            Code
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-on-accent transition hover:opacity-90"
            >
              Demo ↗
            </a>
          )}
        </div>
      </header>

      {project.media && project.media.length > 0 && <MediaStrip media={project.media} />}

      <section>
        <SectionLabel>About</SectionLabel>
        <p className="text-sm leading-6 text-text">{project.description}</p>
      </section>

      <section>
        <SectionLabel>Highlights</SectionLabel>
        <ul className="space-y-2 text-sm leading-6 text-text">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span aria-hidden="true" className="mt-0.5 font-mono text-accent">▹</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionLabel>Built with</SectionLabel>
        <ul className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md border border-line bg-cream px-2 py-0.5 font-mono text-[11px] text-text"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
