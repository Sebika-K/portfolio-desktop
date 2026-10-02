// Work experience, newest first. Dates match the resume.
// The layout lives in components/sections/ExperienceContent.tsx.

export type ExperienceItem = {
  id: string
  company: string
  role: string
  type: "Full-time" | "Internship" | "Volunteer" | "Part-time"
  period: string
  current?: boolean // shows a "now" badge
  summary: string // one line: what the work was about
  bullets: string[]
  tech: string[] // shown as small chips
}

export const experiences: ExperienceItem[] = [
  {
    id: "utilyze",
    company: "Utilyze, Inc.",
    role: "Software Engineer",
    type: "Full-time",
    period: "Sep 2026 – Present",
    current: true,
    summary: "ML infrastructure for a transformer model trained on biological data.",
    bullets: [
      "Built reproducible ML training infrastructure in PyTorch, with hashed, tamper-evident checkpoints and full run provenance (seed, data version, config, compute) so any result can be traced and re-run.",
      "Designed leakage-safe data pipelines that validate every dataset against a pre-registered spec and split data by biological replicate, enforced by automated tests.",
      "Developed a model-comparison pipeline that surfaces where models disagree and hands reproducible example sets to downstream interpretability teams.",
    ],
    tech: ["Python", "PyTorch", "Transformers", "Data pipelines", "Automated testing"],
  },
  {
    id: "devin",
    company: "Devin",
    role: "Software Engineer Intern",
    type: "Internship",
    period: "Nov 2025 – Feb 2026",
    summary: "An AI companion app that adapts its personality to each user.",
    bullets: [
      "Built an LLM-powered companion chatbot in Python and Flask, with input validation and error handling so conversations stayed reliable when upstream API calls failed.",
      "Designed and ran trials across multiple AI personas, comparing which performed well with users and iterating on the weak ones until they held up.",
      "Made responses progressively faster and more adaptive, tuning prompts and conversation flow so the companion adjusted to each user over time.",
    ],
    tech: ["Python", "Flask", "LLM APIs", "Prompt engineering", "REST APIs"],
  },
  {
    id: "aunt-marys-storybook",
    company: "AuntMary’s Storybook",
    role: "Software Engineer",
    type: "Volunteer",
    period: "Feb 2026 – Jul 2026",
    summary:
      "The internal platform behind a nonprofit that records incarcerated parents reading stories to their children: facilities, participants, caregivers, recording sessions and audio review.",
    bullets: [
      "Redesigned and rebuilt 10+ core pages of a legacy PHP platform from Figma designs, including the facility, prisoner and caregiver directories, record-creation forms, and recording-session pages.",
      "Owned the recording-session and caregiver features, from linking incarcerated parents to the children and caregivers who receive their recordings to the review step that approves each recording before it's sent.",
      "Turned dense, table-heavy legacy screens into scannable layouts with status badges, filters, pagination and mobile-friendly views, so volunteers could tell what each page does and move through the site easily.",
      "Resolved assigned GitHub issues across several parts of the codebase, fixing bugs and keeping pages wired correctly to backend data, in a Dockerized environment with pull requests and code reviews.",
    ],
    tech: ["PHP", "Docker", "Git", "Figma"],
  },
  {
    id: "physics-ia",
    company: "Texas State University",
    role: "Physics Instructional Assistant",
    type: "Part-time",
    period: "Aug 2023 – May 2026",
    summary: "Three years teaching physics labs while studying CS.",
    bullets: [
      "Taught and mentored 40+ students per semester, turning complex quantitative models into clear visual explanations.",
      "Applied computational and data-driven analysis methods to improve lab efficiency.",
    ],
    tech: ["Data analysis", "Technical communication", "Mentoring"],
  },
]
