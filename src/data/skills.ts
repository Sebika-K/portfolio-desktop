// The words in the "My Specs" window: tech stack, communities, honors.
// Every skill here is something used in a job (data/experience.ts) or a
// project (data/projects.ts), so anything listed can be backed up.
// Layout lives in components/sections/SkillsContent.tsx.

export type SkillGroup = {
  title: string
  items: string[]
}

// One line in the Community or Honors list.
export type SpecItem = {
  name: string
  detail?: string // small grey line underneath (optional)
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "PHP"],
  },
  {
    title: "AI & ML",
    items: ["PyTorch", "Transformers", "scikit-learn", "pandas", "NumPy", "Claude API", "Gemini API", "OpenAI API", "Prompt engineering"],
  },
  {
    title: "Backend & data",
    items: ["FastAPI", "Flask", "Node.js", "Express", "Spring Boot", "PostgreSQL", "Supabase", "Firebase", "REST APIs"],
  },
  {
    title: "Frontend & mobile",
    items: ["React", "React Native", "Expo", "Tailwind CSS", "Vite", "Figma"],
  },
  {
    title: "Testing & tools",
    items: ["Docker", "Git & GitHub", "GitHub Actions", "pytest", "Vitest", "JUnit", "Locust", "Prometheus"],
  },
]

export const communities: SpecItem[] = [
  { name: "Society of Women Engineers (SWE)", detail: "Member · Texas State chapter" },
  { name: "Rewriting the Code", detail: "Member · community for women in tech" },
  { name: "IEEE", detail: "Member" },
]

export const honors: SpecItem[] = [
  { name: "B.S. Computer Science with Honors", detail: "Texas State University · 2026" },
  { name: "Dean’s List × 8" },
  { name: "Adobe Student Ambassador" },
]
