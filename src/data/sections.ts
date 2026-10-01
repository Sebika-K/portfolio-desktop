export const sections = [
  { id: "about", title: "About Me", icon: "/icons/about.png" },
  { id: "experience", title: "Experience", icon: "/icons/experience.png" },
  { id: "projects", title: "Projects", icon: "/icons/projects.png" },
  { id: "skills", title: "Skills & Involvements", icon: "/icons/skills.png" },
  { id: "contact", title: "Contact", icon: "/icons/contact.png" },
  { id: "terminal", title: "Terminal", icon: "/icons/terminal.svg" },
  { id: "paint", title: "Paint", icon: "/icons/paint.svg" },
  {
    id: "about-site",
    title: "about-this-site.txt",
    icon: "/icons/textfile.svg",
  },
] as const

export type SectionId = (typeof sections)[number]["id"]