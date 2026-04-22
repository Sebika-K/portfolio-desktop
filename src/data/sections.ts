export const sections = [
  { id: "about", title: "About Me" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "skills", title: "Skills & Involvements" },
  { id: "contact", title: "Contact" },
] as const

export type SectionId = (typeof sections)[number]["id"]