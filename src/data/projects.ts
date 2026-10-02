// Projects, in the order they appear (strongest first).
// The sidebar lists each project by title + kind; picking one shows
// everything else (media, description, highlights, tech, links) on the right.
// Layout lives in components/sections/ProjectsContent.tsx.

// A screenshot or video shown in the project's media strip.
// Files live in public/projects/<project id>/.
export type ProjectMedia = {
  type: "image" | "video"
  src: string
  caption: string // shown under it, and read out by screen readers
}

export type Project = {
  id: string
  title: string
  kind: "Personal project" | "Hackathon" | "Team project"
  tagline: string // one line under the title: what it is
  description: string // 2–3 sentences: how it works
  highlights: string[] // bullets: what's impressive about it
  tech: string[] // shown as small code-style chips
  githubUrl: string
  demoUrl?: string // live site or demo video, if there is one
  media?: ProjectMedia[] // no media = the strip is simply left out
}

export const projects: Project[] = [
  {
    id: "voltstream",
    title: "VoltStream",
    kind: "Personal project",
    tagline:
      "Real-time monitoring and battery-life prediction for a simulated fleet of 100 smart batteries.",
    description:
      "A fleet of batteries (homes, solar setups, businesses) needs to be watched live: which ones are charging, which are about to run out, and which have stopped reporting. VoltStream does that end to end. A Python simulator streams readings from 100 batteries into a FastAPI backend and PostgreSQL, and a React dashboard updates itself with fleet stats, each battery's history, depletion predictions and alerts. It's built the way a small production service would be, with every performance claim backed by a measurement anyone can reproduce.",
    highlights: [
      "A live fleet dashboard (online and offline counts, charging vs. discharging, average charge, available energy, active alerts) that updates on its own through Server-Sent Events, no refresh needed.",
      "Every battery has its own page with its current state, recent history, and a prediction of when it will reach critical charge.",
      "Five automatic alert types. In the demo, stopping the simulator flags every silent battery as offline, and a single bad reading sets off low-charge, voltage and rapid-discharge alerts within seconds. Repeats are grouped into one ongoing alert per battery.",
      "Load testing exposed a race condition in alert creation; replacing it with a single atomic database upsert raised throughput 2–2.5× and cut median latency by 33–69%.",
      "Compared Random Forest, gradient boosting and linear regression against a physics baseline on 1.1M rows of telemetry. The baseline won, so it's what serves live predictions.",
      "355 tests run against a real PostgreSQL database. Deliberately shutting down the database and backend uncovered two deadlocks, both fixed.",
    ],
    tech: ["Python", "FastAPI", "PostgreSQL", "React", "TypeScript", "scikit-learn", "Docker", "Locust", "Prometheus"],
    githubUrl: "https://github.com/Sebika-K/voltstream",
    media: [
      { type: "video", src: "/projects/voltstream/demo.mp4", caption: "Demo: the live fleet, a battery's prediction, batteries going offline, and a bad reading setting off alerts" },
      { type: "image", src: "/projects/voltstream/dashboard.webp", caption: "Live fleet dashboard" },
      { type: "image", src: "/projects/voltstream/battery.webp", caption: "Battery page with its depletion prediction" },
      { type: "image", src: "/projects/voltstream/offline-alerts.webp", caption: "Simulator stopped: every battery flagged offline" },
      { type: "image", src: "/projects/voltstream/critical-alerts.webp", caption: "One bad reading, three critical alerts" },
    ],
  },
  {
    id: "coffee-dunk",
    title: "CoffeeDunk",
    kind: "Personal project",
    tagline:
      "A cozy, friends-only coffee journal: log every cup, see what friends are drinking, and find cafés worth the trip.",
    description:
      "A mobile app for logging coffees with a photo, rating and tasting notes, shared only with accepted friends. A Flask API on Google Cloud Run keeps the Google Places key off the phone and powers café search, recommendations, and anonymous “what to order here” picks.",
    highlights: [
      "Café discovery by city or “Near me”, ranked by a fair top-rated score, with hours, directions and the drinks people rate highest at each café.",
      "Privacy enforced on the server with Firestore security rules: posts are readable only by their owner and accepted friends, and only the poster sees who liked a post.",
      "A personal coffee diary with stats like cafés tried, most-ordered drink and favourite tasting note.",
      "Release-ready: report and block, Terms of Use, privacy policy, password reset and in-app account deletion.",
    ],
    tech: ["TypeScript", "React Native", "Expo", "Firebase", "Flask", "Cloud Run", "Google Places API"],
    githubUrl: "https://github.com/Sebika-K/coffee-dunk",
    media: [
      { type: "video", src: "/projects/coffee-dunk/demo.mp4", caption: "Demo: feed, likes, café search and posting" },
      { type: "image", src: "/projects/coffee-dunk/login.webp", caption: "Log in, with hand-drawn coffee beans" },
      { type: "image", src: "/projects/coffee-dunk/feed.webp", caption: "Friends' coffee feed" },
      { type: "image", src: "/projects/coffee-dunk/discover.webp", caption: "Discover cafés" },
      { type: "image", src: "/projects/coffee-dunk/cafe.webp", caption: "Café page with what to order" },
      { type: "image", src: "/projects/coffee-dunk/profile.webp", caption: "Profile and coffee diary" },
      { type: "image", src: "/projects/coffee-dunk/new-post.webp", caption: "Logging a coffee" },
    ],
  },
  {
    id: "didi",
    title: "DIDI (दिदी)",
    kind: "Hackathon",
    tagline:
      "A safe space for Nepali women to name what they feel, hear from women who've felt the same, and help their families understand.",
    description:
      "Many Nepali women carry their worries in silence: there's little room to say what they feel, and few places to hear from others who have been through the same thing. DIDI (“older sister”) is a gentle companion that gives them that space, written in a mix of Nepali and English with the culture built in: in-laws, family roles, and the expectations no one says out loud. It also has a side for family members, so the people closest to her can learn how to support her.",
    highlights: [
      "A daily check-in in a few taps: how she feels inside (sad, anxious, numb, hopeful…) and where in her body she feels pain.",
      "Sapana Space (“this place is yours alone”): she picks her dreams, like dance, music, writing or gardening, or writes her heart out, and DIDI replies with a warm, personal suggestion that connects her mood to what she loves, generated with Claude and Gemini.",
      "Success Katha: stories from women who felt the same, tagged by emotion and perspective (buhari, cheli, ama). She can save the ones that give her hope and share her own story anonymously.",
      "Pariwaar ko Saath, for family: a week view of her moods, a gentle summary from DIDI, simple ways to help (take a walk together, play music she loves, acknowledge her effort), and context on burdens women often carry silently, like laaj (shame).",
      "A TypeScript and Express API on Vercel with Supabase for accounts and data; it flags when three or more of her last five check-ins were low.",
    ],
    tech: ["React Native", "Expo", "TypeScript", "Express", "Supabase", "Claude API", "Gemini", "Vercel"],
    githubUrl: "https://github.com/Sebika-K/NLNhackathon",
    media: [
      { type: "video", src: "/projects/didi/walkthrough.mp4", caption: "Walkthrough: check-in, Sapana Space, stories and the family view" },
      { type: "image", src: "/projects/didi/home.webp", caption: "“Namaste, I'm here for you”: for herself, or for someone she loves" },
      { type: "image", src: "/projects/didi/checkin.webp", caption: "Daily check-in: feelings and body" },
      { type: "image", src: "/projects/didi/sapana.webp", caption: "Sapana Space: her dreams, in her words" },
      { type: "image", src: "/projects/didi/suggestion.webp", caption: "DIDI's personal suggestion" },
      { type: "image", src: "/projects/didi/story.webp", caption: "A Success Katha: Sasural ma pehilo barsa" },
      { type: "image", src: "/projects/didi/family.webp", caption: "Pariwaar ko Saath: how family can help" },
    ],
  },
  {
    id: "prompt-injection-tester",
    title: "LLM Prompt Injection Tester",
    kind: "Team project",
    tagline:
      "A testing tool that measures how easily popular AI models can be tricked by prompt injection attacks.",
    description:
      "Apps built on large language models can be hijacked when someone hides instructions inside ordinary-looking input. This web tool runs known prompt injection attacks against OpenAI's GPT, Google's Gemini and xAI's Grok, checks each response to see whether the model was fooled, and charts how vulnerable each one is. Built by a five-person team for CS 4371, grounded in published research on prompt injection.",
    highlights: [
      "Three attack techniques from the research: hiding a command inside a harmless task (like translation), using separators to fake a new system instruction, and burying commands inside a debugging request.",
      "One adapter per model (GPT-3.5 Turbo, Gemini Pro, Grok 3) behind a shared interface, so every attack runs the same way against every model, and a new model can be added without touching the tests.",
      "Each response is checked automatically to decide whether the attack worked, and each model's success rate is shown as a bar chart.",
      "Results export to CSV, so a test run can be reproduced and analyzed later.",
      "A defenses guide covering input validation, context boundaries, safer system prompts and output filtering, with links to the research papers behind the attacks.",
    ],
    tech: ["React", "TypeScript", "Vite", "Tailwind", "Recharts", "OpenAI API", "Gemini API", "xAI API"],
    githubUrl: "https://github.com/abhetu/LLM-Prompt-Injection-Tester",
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    kind: "Personal project",
    tagline: "A production-style task and project management REST API in Java.",
    description:
      "A Spring Boot backend for creating, filtering and organizing tasks inside projects, built to practice clean layered architecture: controllers, services, repositories and DTOs, each with one job.",
    highlights: [
      "Filter tasks by status, priority and project; tasks link automatically to the project they belong to.",
      "Validation and business rules (no due dates in the past, overdue tasks can't be marked done), with clear JSON errors from one global exception handler.",
      "Unit tested with JUnit 5 and Mockito, with a continuous-integration build on GitHub Actions.",
    ],
    tech: ["Java 17", "Spring Boot", "Spring Data JPA", "H2", "Gradle", "JUnit 5", "Mockito"],
    githubUrl: "https://github.com/Sebika-K/TaskFlow",
  },
  {
    id: "scholargraph",
    title: "ScholarGraph",
    kind: "Hackathon",
    tagline: "A knowledge graph of research papers, with authenticity verified on the blockchain.",
    description:
      "Connects authors, papers, publishers, topics and datasets in an interactive Neo4j graph, and stores a hash of each paper's DOI on the Polygon blockchain so anyone can check that a paper is genuine. Built by a two-person team.",
    highlights: [
      "Seeded Neo4j with 200+ real papers from the Crossref API, linking authors, publishers, topics, datasets and citations.",
      "Deployed a Solidity smart contract on Polygon's Amoy testnet; a verification endpoint checks any paper against the chain.",
      "An interactive graph view for exploring how researchers and institutions are connected.",
    ],
    tech: ["React", "D3.js", "Node.js", "Express", "Neo4j", "Solidity", "Hardhat", "Polygon"],
    githubUrl: "https://github.com/tiloschankarki/ScholarGraph/tree/seb-setup",
  },
  {
    id: "booth-buddy",
    title: "Booth Buddy",
    kind: "Team project",
    tagline: "A web photo booth that turns your webcam into a classic four-photo strip.",
    description:
      "Brings the fun of a film photo booth to the browser: insert a (virtual) coin, pose for four shots, add filters, then download the strip or save it to your profile. A React front end handles the camera, and a Flask backend does the image processing. Built as a team for a software engineering course.",
    highlights: [
      "Four-shot capture sequence: a 3-second countdown and flash before each photo, with frames grabbed from the webcam through a hidden canvas.",
      "Flask and Pillow backend that applies filters (grayscale, sepia, brightness, contrast, blur, sharpen) and stitches the four frames into one vertical strip.",
      "Guest mode to try it instantly, or sign in with Firebase Auth to save strips to a profile stored in Supabase.",
      "146 passing Vitest tests covering rendering, login and signup, user interactions, state changes and edge cases.",
      "Planned with a state diagram and class diagram, and built through pull requests on a shared GitHub repo.",
    ],
    tech: ["React", "TypeScript", "Tailwind", "Flask", "Pillow", "Firebase", "Supabase", "Vitest"],
    githubUrl: "https://github.com/livlaurel/Booth-Buddy",
    media: [
      { type: "video", src: "/projects/booth-buddy/walkthrough.mp4", caption: "Walkthrough: taking a strip and adding a filter" },
      { type: "image", src: "/projects/booth-buddy/landing.webp", caption: "Landing page" },
      { type: "image", src: "/projects/booth-buddy/booth.webp", caption: "The booth: camera, controls and strip preview" },
      { type: "image", src: "/projects/booth-buddy/login.webp", caption: "Login" },
      { type: "image", src: "/projects/booth-buddy/state-diagram.webp", caption: "State diagram used to plan the app's flow" },
      { type: "image", src: "/projects/booth-buddy/tests.webp", caption: "146 of 146 Vitest tests passing" },
    ],
  },
]
