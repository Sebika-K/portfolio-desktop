export type Project = {
  id: string
  title: string
  description: string
  githubUrl: string
  liveUrl?: string
  image?: string
  tags?: string[]
}

export const projects: Project[] = [
  {
    id: "scholargraph",
    title: "ScholarGraph",
    description:
      "A research visualization platform that lets users explore relationships between papers, authors, and topics through an interactive graph-based interface.",
    githubUrl: "https://github.com/tiloschankarki/ScholarGraph/tree/seb-setup",
    tags: ["React", "TypeScript", "Tailwind", "Data Visualization"],
  },
  {
    id: "didi",
    title: "DIDI (दिदी) — AI-Powered Wellness App",
    description:
      "A mobile-first wellness app designed to give Nepali women a safe, culturally sensitive space to reflect, express themselves, and receive personalized AI support.",
    githubUrl: "https://github.com/Sebika-K/NLNhackathon",
    tags: ["Mobile-First", "AI", "Wellness", "Hackathon"],
  },
  {
    id: "booth-buddy",
    title: "Booth Buddy",
    description:
      "A booth management app with login and event-focused workflows, designed to make booth organization and user interaction feel simple and intuitive.",
    githubUrl: "https://github.com/livlaurel/Booth-Buddy",
    tags: ["React", "Firebase", "Authentication", "UI Design"],
  },
  {
    id: "coffee-dunk",
    title: "CoffeeDunk",
    description:
      "A social café discovery app where users can share coffee photos, leave ratings and captions for specific cafés, and help others decide where to go based on real customer experiences.",
    githubUrl: "https://github.com/Sebika-K/coffee-dunk",
    tags: ["Flask", "Firebase", "Social App", "Product Design"],
  },
]