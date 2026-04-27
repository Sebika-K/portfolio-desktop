export const sections = [
  { id: "about", title: "About Me", icon: "/icons/about.png" },
  { id: "experience", title: "Experience", icon: "/icons/experience.png" },
  { id: "projects", title: "Projects", icon: "/icons/projects.png" },
  { id: "skills", title: "Skills & Involvements", icon: "/icons/skills.png" },
  { id: "contact", title: "Contact", icon: "/icons/contact.png" },
] as const

export type SectionId = (typeof sections)[number]["id"]