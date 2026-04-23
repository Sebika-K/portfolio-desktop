import type { Project } from "../../data/projects"

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border-2 border-neutral-800 bg-white shadow-md">
      <div className="flex h-44 items-center justify-center border-b-2 border-neutral-200 bg-[#f3ede0] text-center text-neutral-500">
        <span className="px-4 text-sm font-medium">
          Project Preview Coming Soon
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-bold text-neutral-800">{project.title}</h3>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            {project.description}
          </p>
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-300 bg-[#f8f4ea] px-3 py-1 text-xs font-medium text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border-2 border-neutral-800 bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:translate-y-[-1px]"
          >
            GitHub
          </a>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border-2 border-neutral-800 bg-[#f6f1de] px-4 py-2 text-sm font-semibold text-neutral-800 transition hover:translate-y-[-1px]"
            >
              Learn More
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-lg border-2 border-neutral-300 bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-400"
            >
              Learn More
            </button>
          )}
        </div>
      </div>
    </article>
  )
}