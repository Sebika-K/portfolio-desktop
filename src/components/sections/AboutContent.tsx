import { about } from "../../data/about";

// The About Me window. The words come from data/about.ts; this file only
// decides how they look. Uses the theme colors, so it works in dark mode too.

// A small section heading, reused for every section below.
function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-2 font-indie text-xl text-accent">
      {children}
    </h3>
  );
}

export default function AboutContent() {
  return (
    <div className="space-y-7 text-text">
      {/* Header card: photo, name, tagline, badges */}
      <header className="flex flex-col items-center gap-5 rounded-2xl border border-line bg-panel/70 p-5 text-center sm:flex-row sm:text-left">
        {/* TODO: swap in your drawn avatar once it's ready */}
        <img
          src="/profile.jpg"
          alt="Sebika Khulal"
          className="h-28 w-28 shrink-0 rounded-full border-4 border-accent/60 object-cover shadow-md"
        />

        <div>
          <h2 className="text-3xl font-bold text-text-strong">{about.name}</h2>
          <p className="mt-1 font-indie text-lg text-text-muted">{about.tagline}</p>

          <ul className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            {about.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-line bg-cream px-3 py-1 text-xs font-medium text-text"
              >
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Intro */}
      <section className="space-y-3 text-sm leading-7 md:text-base">
        {about.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      {/* Two columns on wide windows, stacked on narrow ones */}
      <div className="grid gap-6 md:grid-cols-2">
        <section>
          <SectionTitle>currently</SectionTitle>
          <ul className="space-y-2 text-sm leading-6">
            {about.currently.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-accent">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionTitle>into</SectionTitle>
          <ul className="space-y-2 text-sm leading-6">
            {about.into.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-accent">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Someday: a little life to-do list */}
      <section>
        <SectionTitle>someday</SectionTitle>
        <ul className="grid gap-2 sm:grid-cols-2">
          {about.someday.map((goal) => (
            <li
              key={goal}
              className="flex items-start gap-2 rounded-xl border border-line bg-card/70 px-3 py-2 text-sm"
            >
              {/* an empty checkbox circle: not done yet! */}
              <span
                aria-hidden="true"
                className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-accent"
              />
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Education, kept short */}
      <section>
        <SectionTitle>school</SectionTitle>
        <p className="text-sm font-semibold text-text-strong">{about.education.degree}</p>
        <p className="text-sm">{about.education.school}</p>
        <p className="text-sm text-text-muted">{about.education.details}</p>
      </section>
    </div>
  );
}
