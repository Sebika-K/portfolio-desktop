// Which logo goes with which skill name (names must match data/skills.ts).
// Logos are from Simple Icons (simpleicons.org, free to use, CC0) and live in
// public/icons/tech/<file>.svg. `color` is the brand color shown on hover.
// Brands whose color is near-black (GitHub, Express, Java…) have no color:
// on hover they use the normal text color, so they stay visible in dark mode.
// Skills without an entry (SQL, REST APIs…) simply show no logo.

export type TechIconInfo = {
  file: string
  color?: string
}

export const techIcons: Record<string, TechIconInfo> = {
  "Python": { file: "python", color: "#3776AB" },
  "TypeScript": { file: "typescript", color: "#3178C6" },
  "JavaScript": { file: "javascript", color: "#F7DF1E" },
  "Java": { file: "openjdk" },
  "PHP": { file: "php", color: "#777BB4" },
  "PyTorch": { file: "pytorch", color: "#EE4C2C" },
  "Transformers": { file: "huggingface", color: "#FFD21E" },
  "scikit-learn": { file: "scikitlearn", color: "#F7931E" },
  "pandas": { file: "pandas" },
  "NumPy": { file: "numpy" },
  "Claude API": { file: "claude", color: "#D97757" },
  "Gemini API": { file: "googlegemini", color: "#8E75B2" },
  "FastAPI": { file: "fastapi", color: "#009688" },
  "Flask": { file: "flask", color: "#3BABC3" },
  "Node.js": { file: "nodedotjs", color: "#5FA04E" },
  "Express": { file: "express" },
  "Spring Boot": { file: "springboot", color: "#6DB33F" },
  "PostgreSQL": { file: "postgresql", color: "#4169E1" },
  "Supabase": { file: "supabase", color: "#3FCF8E" },
  "Firebase": { file: "firebase", color: "#DD2C00" },
  "React": { file: "react", color: "#61DAFB" },
  "React Native": { file: "react", color: "#61DAFB" },
  "Expo": { file: "expo" },
  "Tailwind CSS": { file: "tailwindcss", color: "#06B6D4" },
  "Vite": { file: "vite", color: "#9135FF" },
  "Figma": { file: "figma", color: "#F24E1E" },
  "Docker": { file: "docker", color: "#2496ED" },
  "Git & GitHub": { file: "github" },
  "GitHub Actions": { file: "githubactions", color: "#2088FF" },
  "pytest": { file: "pytest", color: "#0A9EDC" },
  "Vitest": { file: "vitest", color: "#00FF74" },
  "JUnit": { file: "junit5", color: "#25A162" },
  "Locust": { file: "locust", color: "#B8EE4B" },
  "Prometheus": { file: "prometheus", color: "#E6522C" },
}
