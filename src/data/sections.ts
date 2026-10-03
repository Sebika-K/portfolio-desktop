export const sections = [
  { id: "about", title: "About Me", icon: "/icons/about-icon.png" },
  { id: "experience", title: "Experience", icon: "/icons/experience.svg" },
  { id: "projects", title: "Projects", icon: "/icons/projects.svg" },
  { id: "skills", title: "My Specs", icon: "/icons/skills.svg" },
  { id: "resume", title: "Resume", icon: "/icons/resume.svg" },
  { id: "contact", title: "Contact", icon: "/icons/contact.svg" },
  { id: "terminal", title: "Terminal", icon: "/icons/terminal.svg" },
  { id: "guestbook", title: "Guestbook", icon: "/icons/guestbook.svg" },
  {
    id: "about-site",
    title: "about-this-site.txt",
    icon: "/icons/textfile.svg",
  },
] as const

export type SectionId = (typeof sections)[number]["id"]