import SkillGroupCard from "../ui/SkillGroupCard"
import LogoLoop from "../ui/LogoLoop"
import TechIcon from "../ui/TechIcon"
import { skillGroups, communities, honors, type SpecItem } from "../../data/skills"
import { techIcons } from "../../data/techIcons"

// Every logo once, for the sliding strip at the bottom. Several skills can
// share a logo (React / React Native), so duplicates are skipped by file name.
const loopItems = Object.entries(techIcons)
  .filter(([, icon], i, all) => all.findIndex(([, other]) => other.file === icon.file) === i)
  .map(([name, icon]) => ({
    key: icon.file,
    node: (
      // title = the name pops up when you hover a logo
      <span title={name} className="group flex text-text-faint">
        <TechIcon icon={icon} size={28} />
      </span>
    ),
  }))

// Small code-style label above each part of the window.
function SectionLabel({ children }: { children: string }) {
  return (
    <h3 className="mb-3 font-mono text-[11px] uppercase tracking-wider text-text-faint">
      {children}
    </h3>
  )
}

// A titled card holding a short list (used for Community and Honors).
function SpecList({ title, items }: { title: string; items: SpecItem[] }) {
  return (
    <section className="rounded-2xl border border-line bg-panel p-4 shadow-sm">
      <SectionLabel>{title}</SectionLabel>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.name} className="flex gap-2">
            <span aria-hidden="true" className="font-mono text-sm text-accent">▹</span>
            <span>
              <span className="block text-sm font-semibold text-text-strong">{item.name}</span>
              {item.detail && (
                <span className="block text-xs text-text-faint">{item.detail}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

// The "My Specs" window: tech stack first, then communities and honors.
export default function SkillsContent() {
  return (
    <div className="space-y-6 text-text">
      <div>
        <h2 className="text-3xl font-bold text-accent">My Specs</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted">
          What I build with, the communities I’ve been part of, and a few things
          I’m proud of.
        </p>
      </div>

      <section>
        <SectionLabel>Tech stack</SectionLabel>
        {/* Two cards per row. With an odd number of groups, the last card
            stretches across the full row so there's no empty hole. */}
        <ul className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group, i) => {
            const isLoneLast = i === skillGroups.length - 1 && skillGroups.length % 2 === 1
            return (
              <li key={group.title} className={isLoneLast ? "sm:col-span-2" : undefined}>
                <SkillGroupCard group={group} />
              </li>
            )
          })}
        </ul>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <SpecList title="Community" items={communities} />
        <SpecList title="Honors" items={honors} />
      </div>

      {/* The sliding logo strip, between two thin lines */}
      <div className="border-y border-line py-4">
        <LogoLoop items={loopItems} />
      </div>
    </div>
  )
}
