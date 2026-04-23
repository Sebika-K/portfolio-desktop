export type ExperienceItem = {
  id: string
  company: string
  role: string
  period: string
  bullets: string[]
}

export const experiences: ExperienceItem[] = [
  {
    id: "aunt-marys-storybook",
    company: "AuntMary’s Storybook",
    role: "Volunteer Front-End Engineer",
    period: "Jan 2025 – Present",
    bullets: [
      "Built modular React components for page redesigns, improving UI consistency and reusability across the platform.",
      "Collaborated in a team Git workflow with structured code reviews, branch management, and version control best practices.",
      "Improved user experience and visual polish by simplifying directory layouts and refining frontend interactions.",
    ],
  },
  {
    id: "adobe",
    company: "Adobe",
    role: "Student Ambassador",
    period: "2024 – Present",
    bullets: [
      "Represent Adobe on campus by promoting creative tools, events, and student-focused opportunities.",
      "Helped connect students with design and technology resources while strengthening communication and community engagement skills.",
    ],
  },
  {
    id: "physics-lab",
    company: "Texas State University",
    role: "Instruction Assistant — Physics Lab",
    period: "2025 – Present",
    bullets: [
      "Supported students during lab sessions by guiding experiments, answering questions, and helping explain core concepts.",
      "Strengthened teaching, communication, and problem-solving skills through hands-on support in a technical learning environment.",
    ],
  },
  {
    id: "devin",
    company: "Devin",
    role: "Software Engineer Intern",
    period: "Nov 2025 – Feb 2026",
    bullets: [
      "Built Python-based MVP chatbot applications integrating LLM APIs, with validation and error handling to improve reliability.",
      "Designed persona-driven prompt logic and translated product requirements into implementable, testable system behavior.",
      "Owned end-to-end feature delivery across Agile sprints, integrating a Flask backend with a web frontend, debugging API failures, and iterating on conversational behavior based on testing feedback.",
    ],
  },
]