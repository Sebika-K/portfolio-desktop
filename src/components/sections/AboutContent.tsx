export default function AboutContent() {
  return (
    <div className="space-y-6 text-text-strong">
      {/* Top section */}
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
        {/* Profile Image */}
        <div className="h-28 w-35 overflow-hidden rounded-full border border-accent">
          <img
            src="/profile.jpg"
            alt="Sebika"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Name + Subtitle */}
        <div>
          <h2 className="text-3xl font-bold tracking-wide text-accent md:text-4xl">
            Sebika Khulal
          </h2>

          <p className="mt-2 text-sm leading-6 text-text-muted">
            Software Engineer | Frontend Focus | React, TypeScript |
            Full-Stack (Flask, Node) | Student Ambassador @
            <span className="text-accent"> Adobe</span>
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="space-y-3 text-sm leading-7 text-text md:text-base">
        <p>
          Hi! I am Sebika, a coder, a designer, a thinker. I started with coding,
          and fell in love with learning designs on the way. I am a full stack
          developer who slightly leans more towards the intersection of frontend
          development and design.
        </p>

        <ul className="list-disc space-y-1 pl-5">
          <li>do full stack!</li>
          <li>do front end development</li>
          <li>play around in procreate and figma</li>
          <li>i have fun when i get to see design</li>
          <li>
            I love sun..sky.. a good sunset takes away all my problems (I have a
            sun tattoo lol)
          </li>
        </ul>
      </div>

      {/* Education */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold tracking-wide text-text-strong">
          EDUCATION
        </h3>

        <p className="text-sm text-text">
          Texas State University - San Marcos, TX
        </p>

        <p className="text-sm font-semibold text-text-strong">
          Bachelor of Science in Computer Science with Honors
        </p>

        <p className="text-sm text-text-muted">
          Cumulative GPA: 3.7 | Expected Graduation: December 2026
        </p>
      </div>

      {/* Mini Goals */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold tracking-wide text-text-strong">
          MINI GOALS
        </h3>

        <ul className="text-sm text-text">
          <li>Hike to Yosemite</li>
          <li>Watch more sunsets</li>
          <li>See Aurora</li>
          <li>
            see lands and lands of wildflowers.. so far that I cannot see the end
            of it
          </li>
        </ul>
      </div>

      {/* Fun elements */}
      <div className="flex justify-end gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-outline">
          <img
            src="/avatar.png"
            alt="avatar"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="text-3xl">🐸</div>
      </div>
    </div>
  )
}